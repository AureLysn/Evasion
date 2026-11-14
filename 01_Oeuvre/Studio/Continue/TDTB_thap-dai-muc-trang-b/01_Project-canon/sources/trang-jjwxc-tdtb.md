---
id: source.TDTB.trang-jjwxc-tdtb
type: source
scope: project
lane: personal
project: TDTB
canon_layer: author_confirmed
status: active
aliases: ["trang jjwxc TDTB", "van an TDTB", "文案 十代目每天都在装B", "jjwxc onebook 5231858", "gioi thieu tac gia TDTB"]
related: ["[[05_Evasion/01_Oeuvre/Studio/Continue/TDTB_thap-dai-muc-trang-b/00_Overview/TDTB|TDTB]]", "[[TDTB-MOC]]", "[[ban-convert-tdtb]]"]
source:
  type: author_comment
  ref: "https://www.jjwxc.net/onebook.php?novelid=5231858 — tai nguyen HTML 25/09/2026 (GB18030). 文案 + tag + tien do + danh sach chuong do tac gia 乐博 va nen tang JJWXC dang"
asset:
  store: library
  path_rel: "01_Fandoms/[KHR] Katekyo Hitman Reborn/AI_Continue/[TDTB] Mười đời mắt mỗi ngày đều tại trang B/sources/jjwxc-5231858-onebook-20260925.html"
  format: html
  bytes: 113051
  sha256_16: "8804CE66B9389844"
  seen_at: 2026-09-25
  file_mtime: 2026-09-25
authority: original_author
confidence: 1.0
immutable: true
always_load: false
tags: [d/fanfic, k/source, p/personal]
last_updated: 2026-09-26
---

# Nguồn — trang JJWXC của 《十代目每天都在装B》

> ⚠️ **Bất biến.** Không sửa, không xoá kể cả sau khi trích xuất hết.

## Mô tả

HTML nguyên trang, tải ngày 25/09/2026, mã hoá **GB18030**. Muốn đọc thì dùng
`iconv -f GB18030 -t UTF-8`. Đây là nguồn duy nhất đang có cho: **tên tác giả**, **tiến độ**, và phần
**文案** (giới thiệu do chính tác giả viết).

`source.type: author_comment` vì phần 文案 là lời tác giả nói về truyện của mình, không phải văn
truyện. Ngày tải được ghi vào tên file: trang này còn sống và có thể thay đổi, còn bản trong kho là
ảnh chụp tại một thời điểm.

## Nội dung — tóm tắt, câu chữ chính xác xem trong file HTML

| Mục | Trang ghi |
|---|---|
| Tác giả | **乐博** |
| 文章类型 | 衍生-纯爱-近代现代-东方衍生 · 视角: 主受 |
| 文章进度 | **连载** |
| 全文字数 | 49.475字 |
| 签约状态 | 已签约 |
| Tag | 综漫 · 家教 · 打脸 · 爽文 · 轻松 |
| Nhân vật chính / phụ | 27 / 69, 59, 80, 18, R · khác: **鬼灭等** |
| Ô CP (互动) cạnh 27 | **`??`**: tác giả chưa công bố CP chính |
| 一句话简介 | chơi chữ trên `装B`: "B" vừa là **Beta** (Omega giả làm Beta), vừa là *trang B* (làm màu) |
| Số liệu lúc tải | 374 bình luận · 1.435 lượt lưu |

**Thiết lập tác giả tự khai trong 文案** — tóm lược:

- Thế giới **song song**, **ABO**. Tsuna lớn lên như người thường, **lúc đầu chưa có Người Bảo Hộ**.
- Tsuna, 19 tuổi, giữ một bí mật từ lúc sinh ra: cậu là **Omega**, loại mà thuốc ức chế không có
  tác dụng. Cậu đã giả làm **Beta** thành công.
- Cậu tham gia một **show hẹn hò** vì khoản tiền 50 vạn, định rời đi ngay sau tập đầu. Nhưng khách
  mời mới đến ai cũng chọn cậu, và show lại có rất nhiều khách mời Alpha.
- Ba đoạn thoại ngắn của 59, 69 và 80, rồi một câu của đạo diễn. 59 muốn **đánh thức ký ức** của Tsuna
  (Aurel đã chốt đây là ký ức kiếp trước của chính Tsuna: [[qd-tsuna-nay-la-juudaime-tdtb]]). 69 nói
  cổ phiếu của đài tăng nhờ có mình. 80 nói đối tượng tỏ tình không thể là ai khác ngoài Tsuna. Đạo
  diễn than *"他们给的实在太多了"*: **họ** trả quá nhiều, chủ ngữ số nhiều, không nêu tên.

⚠️ **文案 là lời hứa của tác giả, không phải chuyện đã xảy ra.** Những gì 文案 báo trước mà 15 chương
chưa viết tới (ví dụ việc "họ" trả tiền cho đạo diễn, hay 69 xuất hiện trên show) là **hook**, không
phải sự kiện. `planned` không phải `occurred`, xem bất biến 7 của `AGENTS.md`.

> 🔴 **Đính chính 26/09/2026.** Bản 25/09 ghi *"69 và 80 đang dùng tiền để chen vào show"* và bỏ sót ô
> CP `??`. **Sai cả hai:** câu tiền nong là của **đạo diễn**, chủ ngữ số nhiều không tên; câu của 80 là
> về chuyện tỏ tình. Lần trích xuất đầu phát hiện ra; Aurel đồng ý sửa 26/09.

→ Vì đây là `author_comment`, sau khi trích xuất phải chạy `check-conflicts` để đối chiếu với
những gì 15 chương thực sự viết.

## Phạm vi đã trích xuất — lần 1 xong 25/09/2026

- [x] Luật thế giới (ABO, thế giới song song)
- [x] Hook / lời hứa tác giả — những gì 文案 hứa mà 15 chương chưa viết tới
- [x] Bí mật — thân phận Omega · ký ức của Tsuna
- [x] Danh sách nhân vật theo tag
