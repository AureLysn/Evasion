---
id: subsystem.pilot.readme
type: info
scope: global
lane: personal
status: active
aliases: ["Pilot Userscript Hub", "AureLysn Pilot Scripts", "Pilot Documentation", "Userscript Ecosystem", "subsystem.pilot.readme", "pilot-readme"]
related: ["[[_EVASION-MOC]]", "[[_VAULT-MOC]]", "[[naming-conventions]]"]
always_load: false
tags: [d/doc, k/subsystem, p/personal]
last_updated: 2026-11-09
---

# Pilot — Phân hệ Userscript Tải truyện, Đọc sách & Xử lý Văn bản AureLysn

Phân hệ **Pilot** (`05_Evasion/03_Subsystems/Pilot/`) là hệ sinh thái userscript (Tampermonkey / Violentmonkey) thuần nội bộ của AureLysn, phục vụ cào dữ liệu, xuất file EPUB/TXT/MD chuẩn hóa, biên tập bộ tên nhân vật Hán - Việt, dịch thuật nhanh qua Trạm Dịch (Nexus), và đọc truyện tự động (TTS Reader) trên các nền tảng văn học mạng phổ biến.

Hệ thống được thiết kế theo nguyên tắc: **100% tự chủ, không phụ thuộc thư viện thứ ba (zero third-party dependencies), đồng bộ hóa giao diện và cấu trúc đặt tên theo mốc chuẩn duy nhất.**

---

## 1. Cấu trúc Thư mục Chuẩn hóa (Directory Layout)

Toàn bộ phân hệ Pilot được phân loại vào 4 nhóm thư mục được đánh số thứ tự:

```text
05_Evasion/03_Subsystems/Pilot/
├── 00_Shared/                  # Các module dùng chung (UI Dock/Hub, EPUB 3 Engine, Sync helper)
│   ├── ui-kit.js               # Aurel Dock, Aurel Hub, Toast notification & Theme engine
│   ├── epub.js                 # Bộ tạo EPUB 3 thuần JS (Pure JS Zip + CRC32, không cần jszip)
│   └── sync.js                 # Script hỗ trợ đồng bộ Node.js (tùy chọn)
├── 01_Downloaders/             # 7 userscripts cào và xuất sách điện tử
│   ├── ao3-downloader.user.js
│   ├── ffn-downloader.user.js
│   ├── jjwxc-downloader.user.js
│   ├── lofter-downloader.user.js
│   ├── stv-downloader.user.js
│   ├── wattpad-downloader.user.js
│   └── wikicv-downloader.user.js
├── 02_Readers/                 # Hệ sinh thái đọc tự động (TTS Reader)
│   ├── core.js                 # Lõi đọc Web Speech API, highlight câu, điều khiển phím tắt
│   ├── build.js                # Trình đóng gói TTS Node.js (tùy chọn)
│   ├── sites/                  # 6 site adapter kết nối bộ bóc tách DOM
│   │   ├── ao3.js
│   │   ├── ffn.js
│   │   ├── lofter.js
│   │   ├── stv.js
│   │   ├── wattpad.js
│   │   └── wikicv.js
│   └── dist/                   # 6 userscript thành phẩm độc lập đã biên dịch
│       ├── tts-reader-ao3.user.js
│       ├── tts-reader-ffn.user.js
│       ├── tts-reader-lofter.user.js
│       ├── tts-reader-stv.user.js
│       ├── tts-reader-wattpad.user.js
│       └── tts-reader-wikicv.user.js
├── 03_Tools/                   # 5 công cụ hỗ trợ dịch thuật, biên tập và sao lưu thư viện
│   ├── lofter-comments.user.js # Dịch bình luận Lofter qua Trạm Dịch / Google
│   ├── stv-names.user.js       # Quản lý bộ tên Hán - Việt trực tiếp trên STV
│   ├── tm-translate.user.js    # Thanh công cụ dịch nhanh nổi trên mọi trang web
│   ├── wikicv-library.user.js  # Sao lưu thư viện cá nhân Wikicv về máy
│   └── wikicv-name-desk.user.js# Bàn làm việc lọc & chuẩn hóa Name Desk 3 cột
├── build_pilot.ps1             # Công cụ tự động hóa toàn năng (PowerShell Native)
├── build_pilot.py              # Công cụ tự động hóa toàn năng (Python 3)
└── README.md                   # Tài liệu hướng dẫn này
```

---

## 2. Bảng Danh mục 18 Userscript Chuẩn hóa

### A. Nhóm Tải truyện (`01_Downloaders/`)

Mọi script tải truyện đều tích hợp **Aurel Hub** (tab Download, vị trí slot 20), hỗ trợ tạo bìa tự động, trích xuất mục lục và đóng gói EPUB 3 hợp chuẩn:

| Tệp Script | Nền tảng hỗ trợ | Tên hiển thị | Tính năng nổi bật |
|---|---|---|---|
| `ao3-downloader.user.js` | Archive of Our Own (`archiveofourown.org`) | AO3 Downloader | Tải toàn bộ work/series ra EPUB/TXT, tùy chọn tải kèm bình luận người đọc. |
| `ffn-downloader.user.js` | FanFiction.Net, FictionPress | FFN Downloader | Tải truyện nhiều chương ra chuẩn EPUB 3, lưu giữ metadata, bìa và định dạng gốc. |
| `jjwxc-downloader.user.js` | Tấn Giang (`jjwxc.net`) | JJWXC Downloader | Tự động cuộn giải mã nội dung động VIP, xử lý font chữ chống copy. |
| `lofter-downloader.user.js` | Lofter (`lofter.com`) | Lofter Downloader | Tải post/tag/collection ra TXT, EPUB hoặc xuất toàn bộ album ảnh ZIP chất lượng cao. |
| `stv-downloader.user.js` | Sáng Tác Việt (`sangtacviet.*`, `14.225.254.182`) | STV Downloader | **Chế độ trích xuất kép**: Tải bản **Convert Việt** hoặc bóc tách trực tiếp **Bản gốc tiếng Trung** từ thuộc tính `t` của thẻ `<i>`. Nhận diện server backend trực tiếp khi web chính bị chặn. |
| `wattpad-downloader.user.js` | Wattpad (`wattpad.com`) | Wattpad Downloader | Tải trọn bộ truyện kèm ảnh minh họa inline nhúng trực tiếp vào EPUB 3. |
| `wikicv-downloader.user.js` | TruyenWikiDich, Wikidich, Dichtienghoa, Koanchay | Wikicv Downloader | Tải toàn bộ tác phẩm trên Wikicv ra file EPUB/TXT offline. Khắc phục sự cố chặn IP Cloudflare qua các tên miền mirror. |

### B. Nhóm Đọc tự động TTS (`02_Readers/dist/`)

Biên dịch tự động từ lõi chung `core.js` + từng adapter riêng biệt trong `sites/`:

| Tệp Thành phẩm (`dist/`) | Adapter Nguồn | Trang hỗ trợ | Phím tắt & Tính năng |
|---|---|---|---|
| `tts-reader-ao3.user.js` | `sites/ao3.js` | AO3 | Đọc trôi chảy từng chương, highlight câu, bỏ qua tags/notes. |
| `tts-reader-ffn.user.js` | `sites/ffn.js` | FanFiction.net | Tự động chuyển chương kế tiếp khi đọc xong, điều khiển bằng `Alt+P`. |
| `tts-reader-lofter.user.js` | `sites/lofter.js` | Lofter | Trích xuất bài viết rich text, lọc bỏ danh sách gợi ý và tag. |
| `tts-reader-stv.user.js` | `sites/stv.js` | Sáng Tác Việt | Nhận diện khung văn bản đọc, lọc quảng cáo, đồng bộ cuộn theo câu. |
| `tts-reader-wattpad.user.js` | `sites/wattpad.js` | Wattpad | Đọc mượt qua từng trang phân đoạn của chương mà không ngắt quãng. |
| `tts-reader-wikicv.user.js` | `sites/wikicv.js` | Wikicv / Wikidich | Trích xuất chuẩn xác bản dịch convert, hỗ trợ giọng đọc Edge/Windows. |

### C. Nhóm Công cụ Hỗ trợ (`03_Tools/`)

| Tệp Script | Nền tảng | Chức năng chính |
|---|---|---|
| `lofter-comments.user.js` | Lofter | Dịch toàn bộ bình luận tiếng Trung sang tiếng Việt qua Trạm Dịch hoặc Google. |
| `stv-names.user.js` | Sáng Tác Việt | Tra cứu, sửa đổi và thay thế bộ tên Hán - Việt trực tiếp trên giao diện truyện. |
| `tm-translate.user.js` | Mọi trang web | Thanh công cụ đa năng dịch nhanh đoạn văn bản bằng DichNgay, DichNhanh, VietPhrase, Google và hỗ trợ OCR. |
| `wikicv-library.user.js` | Wikicv | Xuất và sao lưu toàn bộ danh sách bookmark, tủ truyện cá nhân ra file JSON. |
| `wikicv-name-desk.user.js` | Wikicv | Giao diện bàn làm việc (Desk) 3 cột: duyệt văn bản, lọc thực thể tên tiếng Trung và thêm nghĩa Việt. |

---

## 3. Mốc Chuẩn Lưu trữ & Đặt tên Truyện Tải về

Theo quy hoạch hệ thống của Vault AureLysn (`02_Storage/05_Library/` và `05_Evasion/02_Library/` - Kệ Sách), các tác phẩm sau khi tải về được tổ chức theo đúng mốc chuẩn sau:

### 3.1 Cấu trúc Thư mục Kho Sách (`02_Storage/05_Library/`)

```text
02_Storage/05_Library/
├── 00_Information/             # Quy định, chỉ mục thư viện (Library-Rules.md, Library-MOC.md)
├── 01_Fandoms/                 # Các tác phẩm thuộc Fandom đã phân loại
│   └── [CODE] Fandom Name/     # Ví dụ: [KHR] Katekyo Hitman Reborn
│       ├── 00_Information/     # Ghi chú riêng của Fandom
│       ├── 01_Novel/           # Tiểu thuyết chữ
│       │   ├── 01_Pairings/    # Chia theo cặp đôi (1827, 2769, 4827, Other...)
│       │   │   └── <Tên_Bộ_Truyện>/
│       │   └── 02_Crossover/   # Chia theo thế giới giao thoa (AC, BDS, Touken...)
│       │       └── <Tên_Bộ_Truyện>/
│       ├── 02_Doujin/          # Manga, Artbook
│       └── 03_Image/           # Characters, Illustrations, Wallpapers
├── 02_Multi_Fandom/            # Các tác phẩm tổng hợp nhiều fandom / Vô hạn lưu
│   └── <Tên_Bộ_Truyện>/
├── 03_Non_Fandom/              # Tác phẩm nguyên tác (không thuộc fandom fanfiction)
│   └── <Tên_Bộ_Truyện>/
└── 04_Archive/                 # Bản lưu trữ thô (Raw archive)
    └── [CODE] Fandom Name/
        ├── Zh Raw/             # File văn bản tiếng Trung gốc (.txt, .epub)
        └── Eng Raw/            # File tiếng Anh gốc (.epub)
```

### 3.2 Quy ước Đặt tên Tệp Truyện (File Naming Conventions)

1. **Tên Thư mục Bộ truyện:**
   - Cú pháp: `[CODE] Tên Truyện (Tác Giả)` hoặc `Tên Truyện - Tác Giả`
   - Ví dụ: `[KHR] Dong Nhan Vongola - Am Thien`, `Toan Cau Bang Hoai - Thu Vuong`

2. **Tên Tệp Sách Điện tử (.epub / .txt):**
   - Định dạng: `[CODE] Tên Truyện - Tác Giả [Phân Loại].<ext>`
   - Các nhãn phân loại:
     - `[Convert]`: Bản convert Hán-Việt tiêu chuẩn từ Wikicv hoặc STV.
     - `[Gốc Trung]`: Bản văn bản gốc tiếng Trung tải từ STV (qua chế độ `zh`) hoặc JJWXC.
     - `[Dịch]`: Bản đã được biên dịch hoàn chỉnh qua Trạm Dịch hoặc dịch giả.
   - Ví dụ:
     - `[KHR] De Thap Nhat The - Lam Sac [Convert].epub`
     - `[KHR] De Thap Nhat The - Lam Sac [Gốc Trung].epub`

3. **Tên Tệp Chương lẻ (nếu lưu dạng từng file):**
   - Đánh số đệm 3 hoặc 4 chữ số: `Chương 001 - Tiêu Đề.txt` (để sắp xếp số tự nhiên chính xác).

---

## 4. Hướng dẫn Vận hành và Tự động hóa

Hệ sinh thái Pilot trang bị hai bộ điều khiển tự động hóa tương thích 100%: `build_pilot.ps1` (PowerShell Native) và `build_pilot.py` (Python 3):

```powershell
# 1. Kiểm tra tính toàn vẹn và tình trạng đồng bộ của các khối mã
powershell -ExecutionPolicy Bypass -File build_pilot.ps1 -Action check

# 2. Đồng bộ các khối mã dùng chung (ui-kit.js, epub.js) vào các Userscript
powershell -ExecutionPolicy Bypass -File build_pilot.ps1 -Action sync

# 3. Biên dịch lại toàn bộ 6 Userscript TTS Reader vào thư mục 02_Readers/dist/
powershell -ExecutionPolicy Bypass -File build_pilot.ps1 -Action build

# 4. Thực thi toàn bộ (Sync + Build) trong 1 bước duy nhất
powershell -ExecutionPolicy Bypass -File build_pilot.ps1 -Action all

# 5. Khởi chạy Dashboard máy chủ 1-Click cài đặt trực tiếp vào Tampermonkey
powershell -ExecutionPolicy Bypass -File build_pilot.ps1 -Action serve -Port 8768
```

Sau khi chạy lệnh `serve`, truy cập `http://127.0.0.1:8768` trên trình duyệt:
- Bấm vào tên script bất kỳ để Tampermonkey/Violentmonkey tự động mở popup cài đặt hoặc cập nhật phiên bản mới.
- Mỗi khi mã nguồn thay đổi trên máy tính, chỉ cần ấn nút **Cập nhật** trên Dashboard mà không cần mở lại trình soạn thảo Tampermonkey.

---

## 5. Bảng Phím tắt Điều khiển Nhanh

| Phím tắt | Chức năng | Phạm vi hoạt động |
|---|---|---|
| `Alt + P` | Bật / Tạm dừng đọc văn bản tự động (TTS) | Tất cả 6 trang web có cài đặt TTS Reader |
| `Alt + [` / `Alt + ]` | Tua lùi / Tua tiến 1 câu đang đọc | Trình đọc TTS Reader |
| `Alt + -` / `Alt + =` | Giảm / Tăng tốc độ đọc 0.1x | Trình đọc TTS Reader |
| `Esc` | Đóng Aurel Hub hoặc dừng trình đọc TTS | Mọi script có tích hợp UI Kit |
| Click Nút Tròn (Dock) | Thu gọn hoặc mở rộng bảng điều khiển Aurel Hub | Nút trôi ở góc phải màn hình |

---

## 6. Tiêu Chuẩn Giao Diện Bảng Điều Khiển US 1–9 (Audited 2026-11-01)

Theo hồ sơ thiết kế `02_Wireframe userscript.pdf` và kiểm định WCAG 2.2 / `DESIGN.md` (C1–C14):

1. **Kích thước & Bố cục Panel Chung (US 1):**
   - **Chiều rộng chuẩn:** Cố định **300 px** (nới từ 277 px cũ để chữ nội dung đạt 14 px và nhãn đạt 12 px, vùng bấm nút đạt ≥ 28–32 px).
   - **Chiều cao tối đa:** `≤ 720 px`. Cấu trúc 3 tầng: Tay nắm + đầu panel cố định, thân cuộn, chân panel cố định chứa trạng thái và nút chính. Thân panel có `scroll-padding-bottom` bằng chiều cao chân để không che ô nhập đang focus (WCAG 2.4.11).
   - **Thanh Tab 4 Ô Cố Định:** `Đọc` · `Dịch` · `Tải` · `Riêng` ở mọi site. Vị trí các ô không bị dồn khi một site thiếu tính năng (ô thiếu để viền đứt + tooltip giải thích) để giữ nguyên thói quen vị trí bấm của tay.
2. **Kỷ luật Dùng Màu Site (US 8):**
   - Màu nhận diện của từng site (Đỏ sẫm AO3, Chàm FanFiction, Cam Wattpad, Xanh ngọc Lofter, Xanh lá STV, Xanh lơ WikiCV) **chỉ được phép tô ở 3 vị trí**:
     1. Nút đậm chính duy nhất ở chân panel.
     2. Gạch chân của tab đang chọn (nền trung tính).
     3. Thanh tiến độ (tải hoặc đọc).
   - Tuyệt đối không tô màu site lên các nút phụ, đường viền trang trí hay icon linh tinh để tránh gây rối mắt và đảm bảo độ tương phản (≥ 4.5:1 cho chữ và ≥ 3:1 cho viền).
3. **Cơ chế Watchdog Trình Đọc TTS (US 2):**
   - Khắc phục lỗi Chrome tự ngắt Web Speech API sau ~15 giây không báo lỗi: Phân tách văn bản theo từng đoạn độc lập (`Đoạn 12/84`), theo dõi tiến độ từng đoạn và hiển thị cảnh báo viền đứt kèm nút thử lại trực tiếp (`⚠ Giọng dừng · đoạn 37 → Thử lại đoạn`).
4. **Name Desk Cửa Sổ Riêng (US 5):**
   - Đối với Wikicv: Bàn làm việc Name Desk mở thành cửa sổ nổi độc lập rộng **340 px** với bảng 3 cột (Tên Hán, Trạng thái, Sự kiện) để dễ dàng đối chiếu và quản lý hàng trăm tên riêng mà không làm chật panel chính.
5. **Dự phòng Lệnh Tampermonkey (US 7):**
   - Đăng ký sẵn 5 lệnh qua `GM_registerMenuCommand` (Mở panel, Đọc trang này, Tải truyện này, Đặt lại vị trí panel, Bật/tắt script) để cứu hộ khi panel bị CSS của trang che khuất hoặc kéo lạc khỏi màn hình.
