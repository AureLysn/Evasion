---
id: moc.EMB.sources
type: info
scope: project
lane: personal
project: EMB
canon_layer: user_canon
status: active
aliases: ["nguon EMB", "sources EMB", "nguon so cap", "danh sach nguon", "so dang ky nguon", "checklist trich xuat", "sources/_MOC", "EMB/sources/_MOC"]
related: ["[[EMB]]", "[[Uu-Tien-Nguon]]", "[[fic-part1]]", "[[fic-part2]]", "[[ao3-comments]]", "[[ao3-tra-loi-tac-gia]]", "[[author-notes]]", "[[ao3-tags]]"]
always_load: false
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-11-21
---

# Nguồn EMB — sổ đăng ký

> **Nguồn sơ cấp** = thứ tác giả thật sự viết ra. **Dẫn xuất** = kết luận ai đó rút ra từ nguồn. Chỉ nguồn sơ cấp mới là dữ kiện.
>
> 🔴 **Đăng ký lại 15/09/2026** trong lượt làm lại từ nguồn. Mọi con số dưới đây đo lại trực tiếp trên file thô ngày đó *(executed)*. Bảng cũ 22/08 trỏ vào `personal-archive/fiction/…` — đường dẫn đó **không còn tồn tại**.

## 1. Nguồn sơ cấp

| Nguồn | Note | `source.type` | `canon_layer` |
|---|---|---|---|
| Fic gốc Part 1 — *Local Mafia Boss Blames…* | [[fic-part1]] | `fic_text` | `fic_explicit` |
| Fic gốc Part 2 — *Ex-Mafia Boss Spends…* | [[fic-part2]] | `fic_text` | `fic_explicit` |
| Chapter Notes · End Notes · chú thích | [[author-notes]] | `author_comment` | `author_confirmed` |
| Tag AO3 của tác giả | [[ao3-tags]] | `author_comment` | `author_confirmed` |
| Hai file comment AO3 *(một bộ)* | [[ao3-comments]] | `author_comment` | `author_confirmed` |
| Bản trích 24 reply của tác giả | [[ao3-tra-loi-tac-gia]] | `author_comment` | `author_confirmed` |
| Tài liệu giả thuyết của Aurel | [[gia-thuyet-aurel]] · [[gia-thuyet-aurel-2]] | `user_input` | `branch_locked` · `user_canon` |

### File thô — hai bản, SHA-256 khớp nhau

Bản trong vault chép **nguyên byte** từ kho ngày 15/09/2026; `.gitattributes` đặt `* -text` nên git không đổi byte. Bản trong kho: store `personal-bulk`, thư mục `03_Fandom/[KHR] Katekyo Hitman Reborn/AI_Continue/[EMB] Ex-Mafia Boss Done With Life. Life Not Done With Ex-Mafia Boss/`.

> **12/11/2026:** bản từng nằm trong vault (`sources/raw/`) đã chuyển ra kho, store `personal-bulk`, thư mục `fiction-sources/EMB/raw/` — xem thẻ [[EMB-raw]]. Năm file và SHA-256 dưới đây không đổi.

| Tệp trong `personal-bulk:fiction-sources/EMB/raw/` | Bytes | SHA-256 |
|---|---|---|
| `original-fic/Local_Mafia_Boss_Blames.html` | 142.717 | `ba1d8012180e8f32a6e23c5edcc975f5f2f722ccd3fb12edfc890e073fd1ac09` |
| `original-fic/Ex-Mafia_Boss_Spends.html` | 171.453 | `87def62d455c2aa5de1a4fe9086cd5e0449ed4714376825c2d3a2cd0ae1d0dbc` |
| `ao3/AO3-author-replies.md` | 9.466 | `f0daa4d6f8b8b5733ee52fa20bb4090deab9a834091bd43860d75e57a9b735bd` |
| `ao3/AO3-comments-Part1-BabyArc.txt` | 31.512 | `1fa1f51309fe191928e3ba1ac7bd745c7cf9df4f1ff545d85a83150a2571cf67` |
| `ao3/AO3-comments-Part2-BratArc.txt` | 82.344 | `90246251bd7ac138ffb9cbe4724f5e7d26f93a6f33a3739d8f1c46f848200a89` |

Tổng **437.492 bytes**. Kiểm lại: `sha256sum` từng file rồi so bảng này.

### Số đo 15/09/2026

| | Part 1 | Part 2 |
|---|---|---|
| Chương | 4/4, hoàn — Ch4 là thông báo arc | 2/?, dở |
| Xuất bản | 2023-04-18 → hoàn 2024-07-28 | 2024-07-28 → cập nhật cuối 2024-12-02 |
| Số từ AO3 tự báo | 18.661 | 21.259 |
| Số từ thân chương *(đếm khối `userstuff`)* | Ch1 4.538 · Ch2 7.125 · Ch3 6.939 · Ch4 59 = **18.661** | Ch1 8.193 · Ch2 12.905 = **21.098** |
| Dòng chú thích `[n]` | 0 | 69 |
| Reply của tác giả | 9 | 15 |

## 2. Chỗ lệch tìm được khi đo lại

| Ở đâu | Ghi | Đo được | Xử lý |
|---|---|---|---|
| `chapters/_MOC.md` và frontmatter `p2-ch1` · `p2-ch2` | 8.717 · 10.919 từ | 8.193 · 12.905 | sửa khi trích lại tóm tắt chương |
| [[fic-part2]] | 55 chú thích | 69 dòng `[n]` | kiểm khi trích [[author-notes]] |
| [[ao3-comments]] | tên tác giả `Whymystwedolife` | `Whymustwedolife` | lỗi gõ, không đổi dữ kiện |
| [[q-thu-tu-p2]] | reply "Kawahira phải, Indra trái" | **không có** trong 24 reply | đọc hai file comment gốc ở `extract-entities`; không có thì hỏi Aurel |

## 3. Dẫn xuất — KHÔNG phải nguồn

Chỉ dùng **đối chứng** sau mỗi giai đoạn: khớp thì tăng `confidence`, thiếu thì quay lại tìm, khác thì điều tra. Không chép vào note mới. Chỉ ở kho, **không** chép vào vault.

| Trong kho `personal-bulk`, cùng thư mục EMB | Bytes | SHA-256 | Là gì |
|---|---|---|---|
| `sources/knowledge-data/TRITHUC-KOHAKU.md` | 84.984 | `d8156f6f9cd71c1c261e4a6469a5e198688cf3e834639982544381175b54a870` | hồ sơ tri thức lượt AI cũ |
| `sources/knowledge-data/HOSO-KOHAKU.md` | 44.921 | `cf372e999d0817976862054c82f6de8cf693e937c0474ff7cd6495aee17cd32b` | hồ sơ nhân vật lượt AI cũ |
| `sources/knowledge-data/DANY-KOHAKU.md` | 46.318 | `67fcb4f41099da834ed041542953e45ef2f1f201445eb6aa79b0f27fd21fe9c0` | dàn ý v3, đã sửa 09/09 — xem dany-v2-vs-v3 |

`Ho_so_truyen_ExMafiaBoss.md` từng được liệt kê ở đây — **không tìm thấy** trong kho EMB ngày 15/09.

## 4. Checklist trích xuất — đợt làm lại 15/09/2026

Mọi ô để trống. Checklist cũ trong từng note nguồn là **lịch sử ngày 15/08**, không phải trạng thái hiện tại.

Part 2 dài ~21.000 từ, nên trích **theo chương** để có điểm dừng kiểm được.

✅ = đã thành note · 📝 = **đã ghi vào sổ khẳng định** của chương, chờ lượt viết lại entity sau **P2 Ch2** · ⬜ = chưa làm. Văn phong thuộc bước `analyze-style`.

| Nguồn | Nhân vật | Sự kiện | Quan hệ | Luật thế giới | Hook | Bí mật | Văn phong |
|---|---|---|---|---|---|---|---|
| Part 1 Ch1 — [[20260915-p1-ch1]] | 📝 | ✅ | 📝 | 📝 | 📝 | 📝 | ⬜ |
| Part 1 Ch2 — [[20260915-p1-ch2]] | 📝 | ✅ | 📝 | 📝 | 📝 | 📝 | ⬜ |
| Part 1 Ch3 — [[20260915-p1-ch3]] | 📝 | ✅ | 📝 | 📝 | 📝 | 📝 | ⬜ |
| Part 2 Ch1 — [[20260916-p2-ch1]] | 📝 | ✅ | 📝 | 📝 | 📝 | 📝 | ⬜ |
| Part 2 Ch2 — [[20260916-p2-ch2]] | 📝 | ✅ | 📝 | 📝 | 📝 | 📝 | ⬜ |
| [[author-notes]] | 📝 | — | — | 📝 | 📝 | 📝 | — |
| [[ao3-tags]] | ⬜ | — | ⬜ | — | ⬜ | — | — |
| [[ao3-comments]] + [[ao3-tra-loi-tac-gia]] | 📝 | — | 📝 | 📝 | 📝 | 📝 | — |

⚠️ **Sau khi trích xong nhóm comment tác giả → chạy `check-conflicts`.** Tầng `author_confirmed` đứng trên mọi suy luận; lần trước bốn reply đã lật bốn tiền đề.

Thứ tự thắng khi mâu thuẫn: [[Uu-Tien-Nguon]].
