"""Kệ Sách — the files that let the BROWSER read text out of comic pages (OCR), fetched once on request and served from this machine.

Nothing here runs OCR. The reader's page uses PaddleOCR through onnxruntime-web (WebAssembly), the same stack as Aurel's TM Translate userscript:
the page images never leave the machine; only the text lines that were read are sent on to Tram Dich for translation.
The server's job is to bring four things to data/ocr/ and serve them under /ocr/, because a web page cannot fetch the GitHub model file itself (no CORS):
  - eSearch-OCR 8.4.4 (UMD)      unpkg      sha256 pinned (the same pin as the userscript's @require)
  - onnxruntime-web 1.18.0       unpkg      sha256 pinned (ort.wasm.min.js and the one .wasm used with a single thread)
  - the PaddleOCR "ch" models    GitHub release of xushengfeng/eSearch-OCR 4.0.0, zip sha256 pinned; det / rec models and the dictionary are extracted
Every file is checked against its pin before it is kept; a mismatch deletes it. Downloading happens only when the user presses the button.
The Chinese + English recognition model is what is installed; Japanese or Korean pages need other models and are not covered.
"""
import hashlib
import io
import threading
import urllib.request
import zipfile
from pathlib import Path

UNPKG_ESEARCH = "https://unpkg.com/@oovz/esearch-ocr@8.4.4/dist/eSearchOCR.umd.js"
UNPKG_ORT = "https://unpkg.com/onnxruntime-web@1.18.0/dist/"
MODEL_ZIP = "https://github.com/xushengfeng/eSearch-OCR/releases/download/4.0.0/ch.zip"

DOWNLOADS = [
    {"name": "eSearchOCR.umd.js", "url": UNPKG_ESEARCH, "sha256": "1dcd4425b875ebdefff972658447cff24926306cac2c3fa440ecc2f29110274d", "size": 27429},
    {"name": "ort.wasm.min.js", "url": UNPKG_ORT + "ort.wasm.min.js", "sha256": "90533a3fd7006df7f897c0d63c468996da5c8e430e39964d92ebe586c4996614", "size": 142930},
    {"name": "ort-wasm-simd.wasm", "url": UNPKG_ORT + "ort-wasm-simd.wasm", "sha256": "f533b5f21790563d7556c611c3835ac65848ee326da2689aac54ed7d9cc8c6a4", "size": 10595041},
]
MODEL = {"name": "ch.zip", "url": MODEL_ZIP, "sha256": "57c3345ab7f30fce0363505bd6b6be9c25f45a72e0e95d533122fe21241351f4", "size": 14365264,
         "members": {"ppocr_det.onnx": "5e7b06f5391ceda129ae89b3e2f878bd4e39c3a124146d8bbf7ca18ae9aa1ab8",
                     "ppocr_rec.onnx": "8a3ea65009fd529688f316bf29b1b517b33b1dd23facae6e3270f509895b1600",
                     "ppocr_keys_v1.txt": "28b2362ad4ab2dc38769aa72feb535e3a9ddb3fd2a7585a05920e6393b1dc7f7"}}
SERVED = [d["name"] for d in DOWNLOADS] + list(MODEL["members"])
TYPES = {".js": "text/javascript", ".wasm": "application/wasm", ".onnx": "application/octet-stream", ".txt": "text/plain; charset=utf-8"}
MAX_BYTES = 40_000_000
TOTAL = sum(d["size"] for d in DOWNLOADS) + MODEL["size"]


class OcrAssets:
    def __init__(self, folder):
        self.folder = Path(folder)
        self.state = {"running": False, "done_bytes": 0, "total_bytes": TOTAL, "error": "", "step": ""}
        self._t = None
        self._lock = threading.Lock()

    def _ok(self, name, sha):
        f = self.folder / name
        try:
            return f.is_file() and hashlib.sha256(f.read_bytes()).hexdigest() == sha
        except OSError:
            return False

    def files(self):
        pins = {d["name"]: d["sha256"] for d in DOWNLOADS}
        pins.update(MODEL["members"])
        return [{"name": n, "ok": self._ok(n, pins[n]), "size": (self.folder / n).stat().st_size if (self.folder / n).is_file() else 0} for n in SERVED]

    def status(self):
        fs = self.files()
        return {**self.state, "ready": all(f["ok"] for f in fs), "files": fs, "sources": [d["url"] for d in DOWNLOADS] + [MODEL["url"]], "total_bytes": TOTAL}

    def path_of(self, name):
        """Absolute path of a served file, or None. Only the names above are ever served."""
        return (self.folder / name) if name in SERVED and (self.folder / name).is_file() else None

    # ---- download ----
    def start(self):
        with self._lock:
            if self._t and self._t.is_alive():
                return False
            self.state = {"running": True, "done_bytes": 0, "total_bytes": TOTAL, "error": "", "step": ""}
            self._t = threading.Thread(target=self._run, daemon=True)
            self._t.start()
            return True

    def _fetch(self, url, sha, limit):
        req = urllib.request.Request(url, headers={"User-Agent": "KeSach/ocr-setup"})
        buf = io.BytesIO()
        with urllib.request.urlopen(req, timeout=120) as r:
            while True:
                chunk = r.read(256 * 1024)
                if not chunk:
                    break
                buf.write(chunk)
                self.state["done_bytes"] += len(chunk)
                if buf.tell() > limit:
                    raise RuntimeError("Tệp lớn hơn dự kiến, bỏ")
        data = buf.getvalue()
        if hashlib.sha256(data).hexdigest() != sha:
            raise RuntimeError("Mã sha256 không khớp với mã đã ghim, đã bỏ tệp này (nguồn bị đổi?)")
        return data

    def _run(self):
        try:
            self.folder.mkdir(parents=True, exist_ok=True)
            for d in DOWNLOADS:
                if self._ok(d["name"], d["sha256"]):
                    self.state["done_bytes"] += d["size"]
                    continue
                self.state["step"] = d["name"]
                data = self._fetch(d["url"], d["sha256"], MAX_BYTES)
                (self.folder / (d["name"] + ".part")).write_bytes(data)
                (self.folder / (d["name"] + ".part")).replace(self.folder / d["name"])
            if not all(self._ok(n, s) for n, s in MODEL["members"].items()):
                self.state["step"] = MODEL["name"]
                data = self._fetch(MODEL["url"], MODEL["sha256"], MAX_BYTES)
                with zipfile.ZipFile(io.BytesIO(data)) as z:
                    for n, sha in MODEL["members"].items():
                        part = z.read(n)
                        if hashlib.sha256(part).hexdigest() != sha:
                            raise RuntimeError(f"{n}: sha256 không khớp")
                        (self.folder / (n + ".part")).write_bytes(part)
                        (self.folder / (n + ".part")).replace(self.folder / n)
            else:
                self.state["done_bytes"] += MODEL["size"]
        except Exception as e:   # noqa: BLE001 - the user reads this message
            self.state["error"] = f"{type(e).__name__}: {e}"
        finally:
            self.state["running"] = False
            self.state["step"] = ""
