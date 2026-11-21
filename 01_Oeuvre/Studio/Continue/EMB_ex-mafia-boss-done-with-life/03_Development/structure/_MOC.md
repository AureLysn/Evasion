---
id: moc.EMB.structure
type: info
scope: project
lane: personal
project: EMB
canon_layer: user_canon
status: active
aliases: ["ket cau", "structure", "trope va nhip", "tang giua van phong va dan y"]
related: ["[[EMB]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/EMB_ex-mafia-boss-done-with-life/03_Development/structure/tropes|tropes]]", "[[rhythm]]", "[[character-arcs]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/EMB_ex-mafia-boss-done-with-life/02_Story_Bible/style/EMB-STYLE-MOC|style]]"]
always_load: false
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-11-21
---

# MOC — EMB / structure

`style/` đo **câu chữ**. Thư mục này đọc **kết cấu** — tầng nằm giữa văn phong và dàn ý, và là tầng quyết định dàn ý đi đúng hướng hay không.

> 🔁 **Làm lại 17/09/2026 từ nguồn thô** (analyze-tropes). Ba note dưới đều viết lại tại chỗ; hai kết luận cũ bị gỡ, ghi rõ trong từng note.

- [[05_Evasion/01_Oeuvre/Studio/Continue/EMB_ex-mafia-boss-done-with-life/03_Development/structure/tropes|tropes]] — **diff tag hai phần** *(8 giữ · chủ đề dời từ gia đình sang thị trấn)*; **4 quan hệ có tag chưa lên trang** *(Xanxus, Fon, Reborn, Shouichi)*; sáu chỗ tác giả bẻ; Chekhov
- [[rhythm]] — độ dài chương; hook gieo tăng 2·1·2·4·**6**; **13 thay đổi trạng thái / 37.621 từ**; mẫu **nạp → xả** ở cả hai arc
- [[character-arcs]] — thay đổi của nhân vật **nằm ngoài trang** *(8 trên trang · 9 khoảng trống)*; hành động lớn **kể bằng hai mép** 4/4; Tsuna đổi vị thế, không đổi giọng
- [[trope-fandom]] — bảng fanon KHR của Aurel, đối chiếu với fic gốc

## Bốn kết luận dùng được ngay

1. **Chương viết tiếp không nên dưới ~10.000 từ** ngay sau điểm dừng — chương đăng cuối dài 10.826
2. **Mỗi chương hỏi: vén ra ai là ai, và đặt khoảnh khắc quyết định nào lên trang.** Thay đổi dài thì để ngoài trang, báo lại bằng biên niên hoặc bảng kiểm
3. **Leo thang là chính sách công bố** — thông báo arc ở P1 Ch4
4. **Trả lời tag**: bốn quan hệ đã hứa mà chưa viết

## Công cụ

```bash
python 01_Origine/04_Tools/VaultTool/hook_ledger.py --project 05_Evasion/01_Oeuvre/Studio/Continue/EMB_ex-mafia-boss-done-with-life   # chay tu goc vault
```

Đọc frontmatter `introduced` / `payoff` của note hook và `part`/`chapter` của note chapter_summary, rồi báo khoảng gieo→trả. Exit `2` nghĩa là có hook trỏ tới chương không có note tóm tắt — sửa trước khi tin bất kỳ con số nhịp nào.

⚠️ Công cụ **không lọc `status`**: nếu sau này có chương chưa duyệt nằm trong project, con số *"mở N chương"* sẽ bị cộng thêm. Xem [[rhythm]].

## Chưa dựng

Cấu trúc cảnh và luật chuyển POV.
