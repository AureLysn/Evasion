---
id: meta.oeuvre-moc
type: info
scope: global
lane: personal
canon_layer: user_canon
status: active
aliases: ["oeuvre moc", "01 oeuvre moc", "ban do 05 evasion", "fiction moc", "muc luc truyen", "fiction studio map"]
related: ["[[_VAULT-MOC]]", "[[04-lanes]]", "[[05-visibility]]", "[[07-state]]", "[[chapter-writing-rules-audit-20261011]]", "[[project-session-starters]]", "[[session-handbook]]", "[[_FANDOM-MOC]]", "[[_FOLKLORE-MOC]]", "[[_PRINCIPLE-MOC]]", "[[_TAXONOMY-MOC]]", "[[_RESEARCHER-MOC]]", "[[_SI_OC-MOC]]"]
always_load: false
tags: [d/doc, k/moc]
last_updated: 2026-11-13
---

# `05_Evasion/01_Oeuvre/` — Fiction Studio Map of Content

> **Role:** Fiction studio, shared lore database, and literary craft workspace in **AureLysn Vault**.
> **Lane & Visibility Contract:** Governed by [[04-lanes]], [[05-visibility]], and [[07-state]]. Project-level fiction notes carry `lane: personal` and are indexed in Root 2 (`--include-fiction`); cross-vault MOCs and craft audits (`lane: shared`) provide structural navigation without leaking `personal` story content into `work` deliverables.
---

## 1. Phân khu Dữ liệu Dùng chung (`Database/`)

Dữ liệu lore, canon nguyên tác và quy tắc dùng chung giữa các tác phẩm, được tái sử dụng để tránh trùng lặp:

| Phân khu | MOC điều hướng | Cấu trúc chuẩn & Tài nguyên chính |
|---|---|---|
| **Fandom Canon** | [[_FANDOM-MOC]] | 8 vũ trụ: [[_KHR-MOC\|KHR]], [[_BNHA-MOC\|BNHA]], [[_BSD-MOC\|BSD]], [[_JJK-MOC\|JJK]], [[_Fate-MOC\|Fate]], [[_HSR-MOC\|HSR]], [[_CONAN-MOC\|CONAN]], [[_DC-MOC\|DC]]. Chuẩn hóa theo 9 thư mục: `characters`, `Arcs`, `locations`, `organizations`, `Power_System`, `Items`, `Worldbuilding`, `Timeline`, `Lore`; `BSD`, `JJK` và `KHR` có thêm `sources`. |
| **Folklore & Thần thoại** | [[_FOLKLORE-MOC]] | Dân gian & Shinto: [[kamikakushi]], [[kitsune-phan-loai]], [[kitsune-no-yomeiri]], [[nghi-le-cuoi-shinto]] và canh giờ Ấn Độ [[yama-canh-gio-an-do]]. |
| **Quy tắc & Kỹ thuật viết** | [[_PRINCIPLE-MOC]] | Luật cấm & sở thích ([[forbidden-patterns]], [[preferences]]), quy ước tên & mã ([[naming]], [[quy-uoc-ma-project]]), đại từ [[pronouns]], dấu câu [[punctuation]], kỹ thuật [[continuity]], [[dialogue]], [[pacing]], [[prose]]. |
| **Thể loại & Tropes** | [[_TAXONOMY-MOC]] | 12 thể loại văn học mạng ([[abo-omegaverse]], [[crossover-fusion-tong-man]], [[he-thong-van]], [[quan-anh-the-reaction-fic]], [[vo-han-luu]],...) và tropes ([[soulmate-au-trope]]). |
| **Nghiên cứu & Nguồn** | [[_RESEARCHER-MOC]] | Phương pháp tra cứu fandom [[KHR-Research-Method]], danh mục raw [[Nguon-Truy-Cap-Duoc]] và danh sách tìm kiếm đa ngữ [[KHR_Multilingual_Search_List]]. |
| **Giả thuyết của Aurel** | [[_THEORY-MOC]] | Headcanon và giả thuyết dùng chung nhiều project, tách khỏi kho canon *(Aurel 22/11/2026)*: [[gia-thuyet-khr-cua-aurel]] |
| **Nguyên mẫu SI / OC** | [[_SI_OC-MOC]] | Hồ sơ nhân vật gốc / SI OC: [[05_Evasion/01_Oeuvre/Database/SI_OC/Dao_si/thien-su|thien-su]] (Thiên sư bị trục xuất, 16 tuổi, nghiên cứu cấm thuật). |

---

## 2. Xưởng Tác phẩm (`Studio/`)

### 2.1 Cấu trúc Chuẩn của Xưởng

*MOC con của từng thư mục fandom không bắt buộc:* [[CLAUDE]] §0 cho phép link tới MOC của thư mục khi nó có, và ghi đường dẫn thư mục khi MOC chưa có. Thư mục nào chưa có `_MOC.md` thì MOC của fandom ghi thẳng đường dẫn.

Theo chuẩn kiến trúc tại `00_Oeuvre.outline.md`, `Studio/` được chia thành hai nhánh tác phẩm chính:

#### Nhánh Sáng tác Gốc (`Studio/Original/`)
Mỗi dự án nguyên tác được tổ chức đồng bộ theo 6 phân khu (00 đến 05):
```
<CODE>_<slug>/
├── 00_Overview/              <CODE>-MOC.md, tổng quan
├── 01_Story_Bible/           worldbuilding, characters, magic/tech system, rules, style
├── 02_Development/           structure, arcs, plotlines, timeline, tracker
├── 03_Manuscript/            chapters, scenes, drafts, revisions
├── 04_Management/            inbox, decisions, questions, crosscheck, snapshots
└── 05_Alternate_Versions/    alternate_timelines, what_if_scenarios
```

#### Nhánh Viết tiếp Fandom (`Studio/Continue/` — Nhóm B)
Mỗi dự án viết tiếp đồng nhân được tổ chức đồng bộ theo 7 phân khu (00 đến 06):
```
<CODE>_<slug>/
├── 00_Overview/              <CODE>.md, <CODE>-MOC.md, drop-point.md, PROJECT-RULES.md
├── 01_Project-canon/         source-index.md, sources/ (bất biến), notes/ (phân tích, dịch ngữ)
├── 02_Story_Bible/           characters/, locations/, organizations/, world-rules/, secrets/, style/, themes/, relationships/
├── 03_Development/           structure/, arcs/, plotlines/, timeline/, tracker/ (hooks & foreshadowing)
├── 04_Manuscript/            chapters/, scenes/, drafts/, revisions/
├── 05_Management/            inbox/, decisions/, questions/, crosscheck/, snapshots/, tools/
└── 06_Alternate_Versions/    branches/, alternate_universes/, what_if_scenarios/, alternate_timelines/
```

### 2.2 Danh mục Dự án Viết tiếp Fandom (Nhóm Continue)

| Mã | Thư mục | Tên đầy đủ | Trạng thái | Quy mô trong Vault |
|---|---|---|---|---|
| `BCMF` | `BCMF_bat-coc-mafia-cuu-vot-the-gioi` | Bắt cóc một cái Mafia tới cứu vớt thế giới | `idea` | Chưa có chương chính thức · 206 note |
| `BTWID` | `BTWID_baby-thats-what-i-do` | Baby that's what I do | `draft` | Chưa có chương chính thức · 3 note |
| `CCHT` | `CCHT_cuong-cat-dich-hoanh-tan` | Cương Cát đích Hoành Tân | `draft` | Chưa có chương chính thức · 10 note |
| `DUA` | `DUA_crossover-bnha` | <chưa đặt tên — crossover BNHA> | `idea` | Chưa có chương chính thức · 3 note |
| `EMB` | `EMB_ex-mafia-boss-done-with-life` | Ex-Mafia Boss Done With Life. Life Not Done With Ex-Mafia Boss. | `active` | 11 tóm tắt · 297 note (kèm 143 snapshots) |
| `HNQT` | `HNQT_luan-dan-hac-nguyet-quang-tsuna` | Luận đàn Hắc Nguyệt Quang Cương Cát quân | `idea` | Chưa có chương chính thức · 176 note (kèm 1 snapshots) |
| `PCA` | `PCA_please-come-again` | Please Come Again | `draft` | Chưa có chương chính thức · 3 note |
| `PPCT` | `PPCT_phan-phai-chien-tranh` | Phản phái chiến tranh | `draft` | 27 văn xuôi · 27 dàn ý · 475 note (kèm 47 snapshots) |
| `SORA` | `SORA_chua-dat-ten` | <chưa đặt tên> | `idea` | Chưa có chương chính thức · 3 note |
| `TDTB` | `TDTB_thap-dai-muc-trang-b` | Thập Đại Mục mỗi ngày đều đang trang B | `idea` | 15 tóm tắt · 3 văn xuôi · 6 dàn ý · 275 note (kèm 23 snapshots) |
| `UNTCH` | `UNTCH_untouchable` | Untouchable | `draft` | 1 văn xuôi · 13 dàn ý · 69 note |

*Bảng viết tay (Aurel, 2026-11-13). Cột cuối đếm ghi chú `.md` của project, không kể `snapshots/`; đo lại 2026-11-13. `project_table.py` in bảng đối chiếu, không ghi vào đây.*

### 2.3 Danh mục Dự án Sáng tác Gốc (Nhóm Original)

| Mã | Thư mục | Tên đầy đủ | Trạng thái | Quy mô trong Vault |
|---|---|---|---|---|
| `CLS` | `CLS_crossover-va-lenh-su` | (chưa đặt tên) — Crossover và Lệnh sứ | `draft` | 28 văn xuôi final (hoàn thành Vòng 1: Arc 1–3, 61k chữ Hán Arc 3) · 492 note (kèm 62 snapshots) |
| `KITIC` | `KITIC_khr-hsr-ki-tich` | (KHRxHSR) Kì tích (Tsuna x Phainon) | `idea` | 3 vignette gốc · 3 note |
| `TRIAD` | `TRIAD_khr-jjk-bsd` | (chưa đặt tên) — KHR x JJK x BSD | `idea` | 5 dàn ý · 63 note |

*Ba project này chuyển từ `Studio/Continue/` sang `Studio/Original/` ngày 2026-11-20 (Aurel). Chúng giữ bố cục 7 phân khu của nhánh Continue (`01_Project-canon/` … `06_Alternate_Versions/`), không theo khung 6 phân khu ở trên, vì công cụ (`state_apply`, `chapter_gate`, `tram_dich_push`) đọc theo bố cục đó.*

### 2.4 Hồ sơ Lịch sử & Bất biến

- **`EMB` = `KOHAKU`:** Đã xác nhận một mã duy nhất là `EMB`. `KOHAKU` là alias cũ. Chi tiết xem [[quy-uoc-ma-project]].
- **`Generation Cross`:** Nguồn sơ cấp gốc (Work ID 8279713 AO3 của Luki) được lưu trữ tại kho `library` (`01_Fandoms/[KHR] Katekyo Hitman Reborn/Novel/ENG/ENG_All27_Generation Cross.html`); chưa có thẻ sidecar. Dự án chờ dựng lại từ bước 0.

---

## 3. Rà soát & Hướng dẫn Vận hành

- [[chapter-writing-rules-audit-20261011]] — Báo cáo rà soát văn phong các chương `final` và `draft` (`PPCT`, `TDTB`, `UNTCH`, `CLS`, `TRIAD`) đối chiếu với 11 luật viết văn tại `01_Origine/02_Knowledge/Curated_Notes/writing/`.
- [[project-session-starters]] (§3) — Trình tự khởi động 10 bước (Step 0–9) chuẩn khi bắt đầu phiên làm việc truyện mới hoặc tiếp tục truyện hiện có.
- [[session-handbook]] (§3) — Cổng kiểm soát hai giai đoạn (`plan_gate` → `review-plan`) trước khi hạ bút viết văn xuôi.
- `01_Origine/04_Tools/VaultTool/` — Bộ công cụ kiểm thử tự động fiction (`chapter_gate`, `style_metrics`, `ai_tells_check`, `pov_leak_check`, `context_resolver`, `state_apply`). Luôn kèm cờ `--include-fiction`.
