---
id: note.CLS-arc2.ch08-review
type: note
scope: project
lane: personal
project: CLS
canon_layer: planned
status: active
aliases: ["review ch08 arc 2 CLS", "soat ch08 arc 2 CLS", "soat dan y ch08 arc 2 CLS"]
related: ["[[ch08-plan-a2]]", "[[jason-da-chet-va-song-lai]]"]
source:
  type: inference
  ref: "review-plan 30/10/2026 do PHIEN DIEU PHOI tu lam (Aurel 30/10: khong chay tac nhan) - KHONG doc lap: cung phien da lap dan y. Da chay: plan_gate (exit 0), context_resolver --role planner (chay SAU khi lap dan y), vault_doctor --zone (0 loi); doc lai plan-continuation SKILL.md, tropes.md bang vi tri, questions/ (q-arc-2-3-ban-2-viec-mo), bon luat chung 01_Origine/02_Knowledge/Curated_Notes/writing."
authority: ai
confidence: 0.5
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-10-30
---

# Soát ch08 arc 2 — 30/10/2026

> ⚠️ **Không độc lập.** Skill `review-plan` đòi một agent khác *(xuong-kiem)* soát; Aurel 30/10 bảo phiên này không chạy tác nhân, nên chính phiên lập dàn ý tự soát. Bảng dưới đọc lại từ file, không từ trí nhớ, nhưng người soát và người lập là một.

## Soát dàn ý *(review-plan, 30/10)*

### Danh sách việc của `plan-continuation`

| Việc | Kết quả | Bằng chứng |
|---|---|---|
| `plan_gate.py --project CLS` | ran | exit 0 |
| Đọc hooks/ | ran | h-nguoi-ta-ve-duoc, h-nguoi-do trích trong dàn ý; h-cho-trong-phan-dien ở mục Cấm |
| Đọc questions/ | ran *(lúc soát)* | q-arc-2-3-ban-2-viec-mo: các câu có `needed_before` ch08 *(#7)* đã trả 25/10 |
| Đọc decisions/ | ran | `arc-2-chot-25-10`, `20261027-dazai-khong-cham-bay-cyrene`, `arc-1-chot-sau-plan-reviewer` dòng 9 trong bảng Nguồn khoá |
| `timeline/master.md` | cannot tell | project **không có** thư mục `timeline/` |
| Branch contract / drop-point | không áp | `origin: original` *(plan_gate)* |
| `structure/tropes.md` | ran *(lúc soát)* | T9b *(tránh Dazai làm tâm vạn nhân mê)*: dàn ý không cho ai ngưỡng mộ hắn; Evernight ngang tầm |
| Bốn luật chung | ran *(lúc soát)* | bảng 「Đi qua các luật cấu trúc」 có giá trị đầu → cuối mỗi cảnh; chương kết mở |
| `context_resolver --role planner` | ran **muộn** | chạy sau khi lập dàn ý *(exit 1 — cảnh báo ngân sách)* |
| 3–5 beat, hook, bí mật cấm, ngân sách cảnh | ran | dàn ý mục Beat *(5)*, Hook, Bí mật CẤM, bảng Thẻ cảnh |
| Thẻ có `pov`, `characters`, `required_hooks`, `forbidden_secrets` | ran | 6/6 thẻ |
| Câu chưa quyết → `question` có `needed_before` | ran | không có câu mới chặn ch08; các đề xuất ghi 「Đề xuất cần Aurel xem」 |
| `vault_doctor --zone` | ran | 0 lỗi |

### Lỗi

**0 nặng, 4 vừa, 3 nhẹ.**

| # | Mức | Ở đâu | Vấn đề | Hướng sửa |
|---|---|---|---|---|
| V1 | vừa | thẻ 8.06 khối C bước 7 | Hắn hỏi lại 杰森 câu cũ 「人，回得来」 — người trên phim nhắc lại lời 杰森 như biết vì sao 杰森 tin thế; ngầm chỉ về [[jason-da-chet-va-song-lai]] *(hook phải 「đọc như tính lì, không như lời thú nhận」)* | Gắn chữ 「回得来」 vào chuyện **March vừa về**: hắn kể một câu về người tự làm mất mình rồi tìm lại; 杰森 đáp 「回得来就行」 |
| V2 | vừa | thẻ 8.04 bước 4 | 丹枫 tả 「tóc dài, sừng」 — **từ trí nhớ**, không có nguồn trong vault *(Đ2 dàn ý arc: không tả theo trí nhớ)* | Bỏ ngoại hình; không gọi tên trên phim; Dan Heng trong phòng nói một chữ |
| V3 | vừa | dàn ý mục Thẻ cảnh | 9 nhiệm vụ + 2 nhịp riêng trong 6.900 chữ: mỗi thẻ 5–6 khối ⇒ dễ thành tóm tắt | Giữ; người viết ưu tiên 8.01, 8.05, 8.06; Gods chỉ một câu |
| V4 | vừa | thẻ 8.03 khối B bước 3 | Dòng chữ trên tường 「trước khi toa rơi」 — không có mốc canon *(ch07 chỉ dùng dòng chữ có nguồn)* | Bỏ dòng chữ; báo thời điểm bằng hình *(chưa có toa trên trời; March vô hình còn đi trong chợ)* |
| N1 | nhẹ | thẻ 8.02 nhịp phòng 1 | Ghi chú cử chỉ Black Swan lộn xộn *(「quạt?」 [thiếu])* | Chốt: cô ngả lưng ra, một câu |
| N2 | nhẹ | thẻ 8.05 bước 7 | Máy ảnh 「góc trầy」 tự thêm | Chỉ 「相机」, không chi tiết |
| N3 | nhẹ | thẻ 8.05 nhịp phòng 2 | Phainon 「nắm tay rồi mở」 gần cử chỉ ch05 | Đổi: anh ngồi thẳng lưng, không tựa |

**Chờ Aurel** *(không chặn)*: Đ-1 (a) hộp đen *(đã áp)*, Đ-2 cách bắt tay, Đ-5 câu của 「người đó」, Đ-7 ai cầm kiếm, Đ-8 tên Trung chưa có, Đ-9 ngoại hình Evernight.

## Soát mạch bản nháp *(check-continuity, 30/10 — phiên tự soát, không độc lập)*

**1 nặng, 2 vừa, 4 nhẹ.** Bản nháp 5.809 chữ Hán; `pov_leak_check` 6 thẻ exit 0; `ai_tells` 0; chữ cấm 0; khối phim dài nhất 647 chữ Hán *(8.03, dưới 700 — B8)*.

| # | Mức | Ở đâu | Lỗi | Trích hai phía | Hướng sửa |
|---|---|---|---|---|---|
| H1 | nặng | 8.01 khối C | Cyrene **đứng cạnh** Stelle rồi biến mất — nhưng cuối ch07 cô vừa nói sẽ rời Stelle 「vào một vòng rất dài」 *(nhốt Zandar)* | ch07: 「人家要暂时离开你一会儿，去一个很长很长的圈子里。」 · ch08: 「墙上，昔涟就在星身边，刚开口」 | Cyrene chỉ còn **giọng từ xa**, bị cắt |
| V1 | vừa | 8.01 mở chương | Stelle còn đứng trước Hysilens gật đầu — ch07 kết bằng Stelle **quay lưng đi sâu vào 涡心**; Hysilens **đã** cất tờ giấy | ch07: 「星背过身，朝涡心深处走去。」 · 「她把纸收好」 · ch08: 「海瑟音把那张纸折成小小一方，收进袖子里。星朝她点了一下头」 | Stelle dừng ở chỗ sâu, quay lại gật đầu từ xa; bỏ việc cất giấy |
| V2 | vừa | 8.03 khối C | 「墙上回到了现在。昔涟蹲在…」 — không nói Cyrene đang ở **trong ký ức của Stelle** *(canon nhóm C #11)*; sau H1 dễ đọc là cô đã về | — | Thêm 「星的记忆深处」 |
| N1 | nhẹ | 8.03 | 「账也没结」 rồi 「桌上多压着几枚钱」 | — | Bỏ 「账也没结」 |
| N2 | nhẹ | 8.01 phòng | Screwllum 「补充：这座城里，并非所有感知都失灵…」 — giải thích không nguồn | — | Bỏ câu 「补充」 |
| N3 | nhẹ | 8.04, 8.05 | 「这副担子」 lặp hai lần *(thú khổng lồ; Black Swan)* | — | Đổi lời thú: 「这份重量」 |
| N4 | nhẹ | 8.06 | 「走吧，到夜的另一头去。」 sát nghĩa từng chữ câu canon tiếng Anh *(B1)* | — | Diễn lại: 「天总会亮的。我们走到它亮的那一边去。」 |

## Soát mạch độc lập *(30/10 chiều — `xuong-kiem` Sonnet · high, sau khi chương đã final tạm gắn)*

**0 nặng, 1 vừa, 7 nhẹ.** `pov_leak_check` 6/6 exit 0; leak_terms 0; chốt Aurel giữ đủ; mối nối ch07→ch08, ch03/ch05→ch08 khớp.

| # | Mức | Lỗi | Đã làm |
|---|---|---|---|
| V1 | vừa | B1: sáu câu là bản dịch sát câu canon tiếng Anh *(「这份重量…」「一个都不落下」「这副担子太重…」「我们凭什么…」「三条，两对，一张A」「拍下来」)* | **Chờ phiên có TextMap** — TR-021 |
| N1 | nhẹ | B2: câu Screwllum không nhãn phòng | Thêm 「屋里」 |
| N2 | nhẹ | Họ 「没有人/谁也」 bốn lần, hai câu cuối chương | **Aurel quyết** *(mức target)* |
| N3 | nhẹ | B9: 「靠垫」 phòng nói mà phim chưa tả | Thêm gối trên phim |
| N4 | nhẹ | 「圆滚滚」 cho Mem; Terravox tả như thú bốn chân — nguồn: 巨龙 | Chờ đọc lại *(TR-021)* |
| N5 | nhẹ, nghi | Hắn biết March 「vừa tìm lại」 không có cảnh | Aurel quyết |
| N6 | nhẹ, nghi | ch05 hắn đi theo Lygus; ch08 lại ở sạp cũ | Aurel quyết |
| N7 | nhẹ | Bảng tên: 金血 [thiếu] — đã có 净世金血; 忆庭/园子 | Cập nhật bảng tên |

Sau sửa: 5.853 chữ Hán; `ai_tells` 0; `pov_leak_check` 6/6 exit 0.
