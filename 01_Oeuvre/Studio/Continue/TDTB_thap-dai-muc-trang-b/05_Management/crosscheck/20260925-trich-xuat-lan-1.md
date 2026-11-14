---
id: note.TDTB.20260925-trich-xuat-lan-1
type: note
scope: project
lane: personal
project: TDTB
canon_layer: high_confidence_inference
status: active
aliases: ["trich xuat lan 1 TDTB", "trích xuất lần 1", "crosscheck TDTB", "doi chieu van an", "đối chiếu văn án", "extract-entities TDTB 25/09"]
related: ["[[trang-jjwxc-tdtb]]", "[[ban-convert-tdtb]]", "[[thiet-lap-tac-gia-tdtb]]", "[[phan-biet-cung-ten-tdtb]]", "[[q-ten-romaji-chua-chot-tdtb]]"]
source:
  type: measured
  ref: "Trich xuat lan 1 (Mode 1) 25/09/2026: doc toan van ch1-ch15 ban convert (tdtb-src/ch01..ch15.txt, 39.058 tu) + van an JJWXC giai ma GB18030; dem ten bang grep"
authority: ai
confidence: 0.8
always_load: false
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-09-25
---

# Trích xuất lần 1 — 25/09/2026

> ⚠️ `authority: ai`. Đây là **bảng đối chiếu**, không phải bằng chứng. Khi nó đá nhau với [[ban-convert-tdtb]] hay [[trang-jjwxc-tdtb]], nguồn thắng.
>
> Không có hồ sơ cũ cho TDTB. Nên chỉ đối chiếu với **văn án** (文案 + tag + danh sách nhân vật). Cả 16 câu văn án được trích trong note đã được **so khớp từng ký tự** với HTML JJWXC đã giải mã: 16/16 khớp.

## Đối chiếu với văn án

| # | Văn án nói | Văn bản ch1–15 | Mức |
|---|---|---|---|
| 1 | 沢田纲吉，男，19岁 | ch3: *"nam, 19 tuổi"* | ✅ MATCH |
| 2 | 他其实是个Omega，还是个连抑制剂都无效的幽灵Omega | ch4: "U Linh Omega", thuốc thường vô dụng | ✅ MATCH |
| 3 | 出生到现在**只有一个秘密** | Văn bản cho Tsuna **hai** bí mật: Omega và **hệ thống nhiệm vụ** (ch4–8). Văn bản cũng cho cậu phân hoá năm 15, không phải "từ lúc sinh" | 🔴 DIFFERENT (nhẹ, giọng văn án) |
| 4 | 终于成功地伪装成了一个beta | ch4: thuốc cường hiệu từ cửa hàng hệ thống | ✅ MATCH (cơ chế là 🔵 NEW) |
| 5 | 单身直男 | ch5: chưa từng nắm tay con gái. ch10: muốn ghép với nữ Omega | ✅ MATCH |
| 6 | 为了区区五十万登上了恋爱综艺节目 | ch3–4: 50 vạn/tập, để mua game cơ giáp | ✅ MATCH (lý do mua game là 🔵 NEW) |
| 7 | 想好的一集就下车 | ch4, ch9 | ✅ MATCH |
| 8 | 新来的嘉宾个个都选我 | chưa có khách mới | 🟠 MISSING |
| 9 | 为什么这个节目会加那么多alpha嘉宾 | ch9: show chia đều 2A/2B/2O | 🟠 MISSING (không mâu thuẫn, "bình thường") |
| 10 | 59：为了唤醒你的回忆 | ch8–13: Gokudera có ký ức, sang Nhật tìm Tsuna, **chưa gặp**. Ký ức là **của Tsuna tương lai, gửi cho đồng đội**, không phải của Tsuna này | 🟠 MISSING + 🔴 DIFFERENT về cơ chế, xem [[q-tsuna-nay-va-juudaime-tdtb]] |
| 11 | 69：贵电视台的股价 | Mukuro **không xuất hiện** | 🟠 MISSING |
| 12 | 80：告白对象，除了纲吉 | Yamamoto bám Tsuna ch12–15, chưa tỏ tình, chưa là khách mời | 🟠 MISSING (đang dựng) |
| 13 | 导演：他们给的实在太多了 | chưa có | 🟠 MISSING |
| 14 | 平行世界，ABO | ch1–15 | ✅ MATCH |
| 15 | 纲吉作为普通人长大 | ch3 (gia đình bình thường) | ✅ MATCH |
| 16 | 刚开始身边没有守护者 | ch12, ch15 | ✅ MATCH |
| 17 | 配角 18 (Hibari) | không xuất hiện | 🟠 MISSING |
| 18 | 配角 R | ch9, một cảnh | ✅ MATCH |
| 19 | 其它：鬼灭等 | ch4–8: chỉ Muzan + thế giới nhiệm vụ | ✅ MATCH (mỏng) |
| 20 | 主角 27 · 互动 "??" | CP để trống | 🔵 NEW, chưa ghi trong [[trang-jjwxc-tdtb]]. Xem [[q-cp-chinh-tdtb]] |
| 21 | — | **Lộc Dã Tuyết + hệ thống 0038** (nhân vật chiếm nhiều chữ thứ hai sau Tsuna) | 🔵 NEW, văn án không nhắc |
| 22 | — | **Hệ thống nhiệm vụ của Tsuna, trạm trung chuyển, lửa, X-burner** | 🔵 NEW |
| 23 | — | **Game cơ giáp ảo JJ** | 🔵 NEW |
| 24 | — | **Arcobaleno + Verde gửi ký ức** | 🔵 NEW |
| 25 | — | **Hunter × Hunter (Illumi, núi Kukuroo), Naruto (Uchiha)** | 🔵 NEW, nằm trong 等 / 综漫 |
| 26 | — | Show có thêm **Kesuke, Suzuki Kenichi, Thiên Đảo, Yuuko** | 🔵 NEW |

## Dấu vết Kimetsu no Yaiba — đo bằng grep toàn văn

| Chương | Có gì |
|---|---|
| ch4 | lựa chọn nhiệm vụ 3: *"Quỷ diệt 2.0"*, *"Muzan lại bắt đầu gây sự"*, *"lên dây cung chi sáu · Ức Cát"* (= 上弦之六) |
| ch5 | hồi tưởng nhiệm vụ lần 1: Tsuna là phụ tá thầy thuốc nhà Muzan, bị Muzan giết. Muzan là *"nữ trang đại lão"*. Vào Gion thời Tokugawa |
| ch6 | "đại phu" (太夫, tayū) = Muzan giả gái: tóc đen xoăn, mắt đỏ thẫm. Ra lệnh giết cả Gion |
| ch7 | *"Nữ trang Muzan"* gọi thẳng. "Quỷ", "Ức Cát", hứa biến thành quỷ |
| ch8 | *"thánh huyết"*, *"Quỷ Hóa"*, mắt kim hồng. Lửa của Tsuna tịnh hoá |
| ch1–3, ch9–15 | **không có gì**. "quỷ" ở ch1, ch11, ch13, ch15 chỉ là thành ngữ (*"quỷ khóc sói gào"*, *"có quỷ"*) |

**Không có**: Tanjirou, Nezuko, Zenitsu, Inosuke, Giyuu, Rengoku, Hashira, Sát Quỷ Đoàn, hơi thở, Nichirin, Tamayo, Douma, Kokushibo, Daki/Gyutaro. Grep 0 kết quả cho mọi biến thể Hán-Việt đã thử.

## Số lượng theo loại

| Loại | Số | Thư mục |
|---|---|---|
| character | 25 | Characters/ |
| rule | 5 | canon/ |
| fact | 8 | canon/ (gồm [[thiet-lap-tac-gia-tdtb]]) |
| info (phân biệt cùng tên) | 1 | canon/ |
| event | 16 | events/ |
| relationship | 15 | relationships/ |
| secret | 7 | secrets/ |
| hook | 23 (8 văn án + 15 văn bản) | hooks/ |
| question | 12 | questions/ |
| location | 8 | locations/ |
| organization | 3 | organizations/ |
| timeline | 1 | Timeline/ |

## Tên chưa ánh xạ được — xem [[q-ten-romaji-chua-chot-tdtb]]

*thành cùng nhau* (họ Kesuke) · *thiên đảo* · *kiện chi lang* · *Bình An Uyển hoảng* · *Ngọc Sinh Viên* · *Angelie tạp* · *Rangu* · *cùng mộc đại lão* (ch6, đồng đội cũ, không rõ là ai) · *chín xuyên Reiko* · *Lâm Thanh cùng* · *Thiên Lan quỳ* · tên show · tên trường · *a bộ* (quản lý đội bóng, Abe?) · *trong ruộng lão đầu* (ch2, có lẽ thầy Tanaka 田中) · *Andrew* (thợ may của Gokudera).

## Chỗ có thể đá note hiện có

- [[ban-convert-tdtb]] lấy *"Kesuke"* làm ví dụ tên Nhật–Hán **bị cắt vụn**. Thật ra **Kesuke là một nhân vật riêng** (khách mời alpha, họ convert là *"thành cùng nhau"*), không phải mảnh của tên khác.
- [[trang-jjwxc-tdtb]] tóm lược *"69 và 80 đang dùng tiền để chen vào show"*. Văn án **không nói 80 trả tiền**. Câu của 80 là về tỏ tình. Câu tiền là của **đạo diễn**, chủ ngữ số nhiều "他们" không nêu tên. Câu 69 nói về **cổ phiếu đài**.
- [[trang-jjwxc-tdtb]] liệt kê *"Nhân vật chính / phụ: 27 / 69, 59, 80, 18, R"*, thiếu ô **互动 "??"**.
- [[05_Evasion/01_Oeuvre/Studio/Continue/TDTB_thap-dai-muc-trang-b/00_Overview/TDTB|TDTB]] ghi *"quỷ diệt"* xuất hiện đúng 1 lần. Đúng với cụm đó, nhưng Kimetsu thật ra chiếm **5 chương** (ch4–8).
