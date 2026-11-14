#!/usr/bin/env python3
"""
Pilot Userscripts Toolkit — Build, Sync & Local Distribution Manager
Cross-platform tool to synchronize shared blocks, compile TTS Reader, and serve scripts locally.
Structure: 00_Shared, 01_Downloaders, 02_Readers, 03_Tools.
"""

import sys
import os
import re
from pathlib import Path
from http.server import HTTPServer, SimpleHTTPRequestHandler

SCRIPT_DIR = Path(__file__).resolve().parent
SHARED_DIR = SCRIPT_DIR / "00_Shared"
DL_DIR     = SCRIPT_DIR / "01_Downloaders"
TTS_DIR    = SCRIPT_DIR / "02_Readers"
TOOLS_DIR  = SCRIPT_DIR / "03_Tools"
DIST_DIR   = TTS_DIR / "dist"
SITES_DIR  = TTS_DIR / "sites"

BLOCKS = [
    {
        "src": "ui-kit.js",
        "tag": "aurel-ui-kit",
        "targets": [
            "01_Downloaders/ao3-downloader.user.js",
            "01_Downloaders/ffn-downloader.user.js",
            "01_Downloaders/jjwxc-downloader.user.js",
            "01_Downloaders/lofter-downloader.user.js",
            "01_Downloaders/stv-downloader.user.js",
            "01_Downloaders/wattpad-downloader.user.js",
            "01_Downloaders/wikicv-downloader.user.js",
            "02_Readers/core.js",
            "03_Tools/stv-names.user.js",
            "03_Tools/tm-translate.user.js",
            "03_Tools/wikicv-library.user.js",
            "03_Tools/wikicv-name-desk.user.js",
        ],
    },
    {
        "src": "epub.js",
        "tag": "aurel-epub",
        "targets": [
            "01_Downloaders/ao3-downloader.user.js",
            "01_Downloaders/wattpad-downloader.user.js"
        ],
    },
]


def sync_blocks(check_only: bool = False) -> bool:
    print("\n[PILOT SYNC] Ra soat va dong bo cac khoi dung chung theo cau truc chuan...")
    stale_count = 0

    for blk in BLOCKS:
        src_path = SHARED_DIR / blk["src"]
        open_tag = f"// <{blk['tag']}>"
        close_tag = f"// </{blk['tag']}>"

        if not src_path.exists():
            print(f"Loi: Khong tim thay file nguon {src_path}", file=sys.stderr)
            return False

        kit_text = src_path.read_text(encoding="utf-8").replace("\r\n", "\n")
        kit_lines = kit_text.strip().split("\n")

        for rel_target in blk["targets"]:
            target_path = SCRIPT_DIR / rel_target
            if not target_path.exists():
                print(f"  ! Canh bao: Khong tim thay target {target_path}", file=sys.stderr)
                continue

            content = target_path.read_text(encoding="utf-8").replace("\r\n", "\n")
            lines = content.split("\n")

            start_idx = -1
            end_idx = -1
            for i, line in enumerate(lines):
                if line.strip() == open_tag:
                    start_idx = i
                if line.strip() == close_tag:
                    end_idx = i
                    break

            if start_idx == -1 or end_idx == -1 or end_idx <= start_idx:
                print(f"  ! Canh bao: {rel_target} thieu cap the {open_tag} .. {close_tag}", file=sys.stderr)
                continue

            current_block = lines[start_idx : end_idx + 1]
            if current_block == kit_lines:
                print(f"  = {rel_target} [{blk['tag']}] (dong bo tot)")
            else:
                stale_count += 1
                if check_only:
                    print(f"  ! {rel_target} [{blk['tag']}] (CAN DONG BO)")
                else:
                    new_lines = lines[:start_idx] + kit_lines + lines[end_idx + 1 :]
                    target_path.write_text("\n".join(new_lines), encoding="utf-8")
                    print(f"  + {rel_target} [{blk['tag']}] (DA CAP NHAT)")

    print(f"[PILOT SYNC] Hoan tat. So muc lech: {stale_count}")
    return stale_count == 0


def build_tts():
    print("\n[PILOT BUILD] Bien dich TTS Reader tu 02_Readers/core.js va 02_Readers/sites/*.js...")
    core_file = TTS_DIR / "core.js"
    if not core_file.exists():
        print(f"Loi: Khong tim thay core.js tai {core_file}", file=sys.stderr)
        return False

    DIST_DIR.mkdir(parents=True, exist_ok=True)

    core_raw = core_file.read_text(encoding="utf-8").replace("\r\n", "\n")
    core_clean = re.sub(r"(?s)// ==UserScript==.*?// ==/UserScript==\n?", "", core_raw)
    core_clean = re.sub(r"^\s*\(function\s*\(\)\s*\{", "", core_clean)
    core_clean = re.sub(r"\}\)\(\);\s*$", "", core_clean).strip()

    core_lines = [f"    {line}" if line else "" for line in core_clean.split("\n")]
    core_processed = "\n".join(core_lines)

    v_match = re.search(r"VERSION\s*=\s*['\"]([^'\"]+)['\"]", core_raw)
    version = v_match.group(1) if v_match else "0.3.0"

    old_ffn = DIST_DIR / "tts-reader-fanfiction.user.js"
    if old_ffn.exists():
        old_ffn.unlink()

    for site_file in sorted(SITES_DIR.glob("*.js")):
        site_raw = site_file.read_text(encoding="utf-8").replace("\r\n", "\n")
        header_match = re.search(r"(?s)(// ==UserScript==.*?// ==/UserScript==)", site_raw)
        if not header_match:
            print(f"  ! Canh bao: Thieu header trong {site_file.name}", file=sys.stderr)
            continue

        header = header_match.group(1)
        body = site_raw[header_match.end() :].strip()

        header_processed = header.replace("{{VERSION}}", version)
        body_processed = re.sub(r"(?m)^\s*SITE\s*=", "var SITE =", body)
        site_lines = [f"    {line}" if line else "" for line in body_processed.split("\n")]
        site_block = "\n".join(site_lines)

        output = f"""{header_processed}
// File nay duoc BUILD tu 02_Readers/ (core.js + sites/{site_file.name}). Sua o do roi chay build!

;(function () {{
    'use strict';

{site_block}

{core_processed}
}})();
"""
        dist_name = f"tts-reader-{site_file.stem}.user.js"
        dist_path = DIST_DIR / dist_name
        dist_path.write_text(output, encoding="utf-8")
        size_kb = round(dist_path.stat().st_size / 1024, 1)
        print(f"  + {dist_name} ({size_kb} KB)")

    print("[PILOT BUILD] Hoan tat cac ban build trong 02_Readers/dist/")
    return True


class ScriptHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(SCRIPT_DIR), **kwargs)

    def do_GET(self):
        clean_path = self.path.lstrip("/")
        if not clean_path or clean_path == "index.html":
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.end_headers()

            scripts = sorted(SCRIPT_DIR.glob("**/*.user.js"))
            categories = [
                ("01. Bộ Tải Truyện (01_Downloaders)", "01_Downloaders"),
                ("02. Bộ Đọc TTS Reader (02_Readers)", "02_Readers"),
                ("03. Bộ Công Cụ & Dịch Thuật (03_Tools)", "03_Tools"),
            ]

            cards = ""
            for cat_title, cat_folder in categories:
                cat_scripts = [s for s in scripts if cat_folder in str(s)]
                if cat_scripts:
                    cards += f"<h2>{cat_title}</h2>"
                    for s in cat_scripts:
                        rel = s.relative_to(SCRIPT_DIR).as_posix()
                        size = round(s.stat().st_size / 1024, 1)
                        cards += f"""
                        <div class="card">
                            <div class="info">
                                <div class="title">{s.name} <span class="tag">{size} KB</span></div>
                                <div class="desc">{rel}</div>
                            </div>
                            <a class="btn" href="/{rel}">Cài đặt 1-Click</a>
                        </div>
                        """

            html = f"""<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="utf-8">
    <title>AureLysn Pilot — Userscript Hub</title>
    <style>
        body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0b0b0f; color: #ede6db; padding: 30px; max-width: 960px; margin: 0 auto; }}
        h1 {{ color: #f2a65a; border-bottom: 2px solid #20424a; padding-bottom: 10px; margin-bottom: 6px; }}
        h2 {{ color: #3be6c5; font-size: 18px; margin-top: 26px; margin-bottom: 12px; border-left: 4px solid #3be6c5; padding-left: 10px; }}
        .sub {{ color: #93b2b0; font-size: 14px; margin-bottom: 24px; }}
        .card {{ background: #16323a; border-radius: 8px; padding: 14px 18px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center; border: 1px solid rgba(160,215,208,.12); }}
        .card:hover {{ border-color: rgba(59,230,197,.4); }}
        .info {{ flex: 1; }}
        .title {{ font-weight: bold; font-size: 15px; color: #e8f4f2; }}
        .desc {{ font-size: 12.5px; color: #93b2b0; margin-top: 3px; font-family: monospace; }}
        .btn {{ background: #f2a65a; color: #0b0b0f; font-weight: bold; text-decoration: none; padding: 7px 15px; border-radius: 6px; white-space: nowrap; margin-left: 16px; font-size: 13px; }}
        .btn:hover {{ background: #3be6c5; color: #053a33; }}
        .tag {{ font-size: 11px; background: #20424a; color: #7fe0a8; padding: 2px 7px; border-radius: 4px; margin-left: 8px; font-weight: normal; }}
    </style>
</head>
<body>
    <h1>Pilot — Userscripts Hub</h1>
    <div class="sub">Hệ thống userscript chuẩn hóa cho AureLysn Vault. Bấm <strong>Cài đặt 1-Click</strong> để nạp trực tiếp vào Tampermonkey / Violentmonkey.</div>
    {cards}
</body>
</html>"""
            self.wfile.write(html.encode("utf-8"))
        else:
            super().do_GET()


def main():
    action = sys.argv[1] if len(sys.argv) > 1 else "all"
    if action == "sync":
        sync_blocks(check_only=False)
    elif action == "check":
        sync_blocks(check_only=True)
    elif action == "build":
        build_tts()
    elif action == "all":
        sync_blocks(check_only=False)
        build_tts()
        print("\n[PILOT] Hoàn tất tất cả thao tác build & sync!")
    elif action == "serve":
        port = int(sys.argv[2]) if len(sys.argv) > 2 else 8768
        server = HTTPServer(("127.0.0.1", port), ScriptHandler)
        print(f"\n[PILOT SERVER] Khởi chạy Local Userscript Hub tại http://127.0.0.1:{port}/ ...")
        print("Bấm Ctrl+C để dừng server.\n")
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            server.server_close()
            print("\n[PILOT SERVER] Đã dừng server.")


if __name__ == "__main__":
    main()
