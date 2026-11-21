---
id: branch.PPCT.aurel-main
type: branch
scope: branch
lane: personal
project: PPCT
branch: aurel-main
canon_layer: branch_locked
status: active
inherits: [original-fic]
preserve: [characterization, giong-van-tac-gia, phan-biet-cung-ten, thu-tu-su-kien-ch1-15]
allowed_expansion: [new_arc, new_chapter, phien-ngoai, tra-phuc-but-tac-gia-da-neu]
forbid: [overwrite_original_chapters, contradict_fic_explicit, contradict_author_confirmed, dung-de-xuat-ban-thu-nghiem-cu-nhu-su-that, dung-chuong-ch16-42-nhu-su-that]
aliases: ["hop dong nhanh PPCT", "nhanh chinh PPCT", "branch contract PPCT", "aurel-main PPCT"]
related: ["[[PPCT]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/00_Overview/drop-point|drop-point]]", "[[lam-lai-tu-nguon]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/hard-rules|hard-rules]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/01_Project-canon/notes/phan-biet-cung-ten|phan-biet-cung-ten]]"]
source:
  type: user_input
  ref: "AI de xuat khi chay plan-continuation; Aurel duyet 13/09/2026: 'duyet ca 3'"
authority: user
confidence: 1.0
always_load: true
tags: [d/fanfic, k/rule, p/personal]
last_updated: 2026-11-21
---

# Hợp đồng nhánh: aurel-main

> ✅ **Aurel duyệt 13/09/2026.** Writer và Planner **phải** nhận file này trong mọi tác vụ thuộc nhánh. `forbid` là ràng buộc cứng.

## Nhánh này để làm gì

Nhánh chính: viết tiếp 《反派战争》 từ điểm dừng ch15, trung thành với ý đồ tác giả 西州 như văn bản và ghi chú tác giả thể hiện.

## Giữ nguyên

- Tính cách nhân vật như ch1–15 và tiền truyện.
- Giọng văn tác giả — [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/hard-rules|hard-rules]], [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/02_Story_Bible/style/targets|targets]].
- Phân biệt thực thể cùng tên — [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/01_Project-canon/notes/phan-biet-cung-ten|phan-biet-cung-ten]].
- Thứ tự sự kiện ch1–15 — [[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/03_Development/timeline/master|master]].

## Được mở rộng

- Arc, chương, phiên ngoại mới.
- Trả các phục bút tác giả **đã tự nêu** trong ghi chú ([[05_Evasion/01_Oeuvre/Studio/Continue/PPCT_phan-phai-chien-tranh/00_Overview/drop-point|drop-point]] §5).

## Cấm

- Sửa bất cứ gì trong `sources/`.
- Mâu thuẫn fact `fic_explicit` hoặc `author_confirmed`.
- Dùng đề xuất của bản thử nghiệm cũ như sự thật khi chưa có `decision` — [[lam-lai-tu-nguon]].
- **Dùng ch16–ch42 làm sự thật.** Aurel reset PPCT ngày 21/11/2026 về ngay sau trích xuất. 27 chương ấy vẫn nằm trong `04_Manuscript/`, nhưng không còn là canon của nhánh; mọi arc, event, decision và câu hỏi sinh từ chúng đã xóa.

## Chỗ cần Aurel xem kỹ

- **Lệch canon Fate/Zero**: hợp đồng này **không cấm** lệch canon. Theo precedence, `fic_explicit` thắng `official_canon`; tác giả đã lệch nhiều lần (Lancer được giữ sống, thứ tự Vương Yến). Nếu muốn bám canon ở chỗ văn bản im lặng, thêm vào `preserve`.
