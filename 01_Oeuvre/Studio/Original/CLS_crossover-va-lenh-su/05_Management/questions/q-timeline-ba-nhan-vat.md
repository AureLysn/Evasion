---
id: question.CLS.q-timeline-ba-nhan-vat
type: question
scope: project
project: CLS
lane: personal
canon_layer: planned
status: resolved
needed_before:
  arc: "worldbuild-original"
  chapter: "bat ky canh nao co ba nguoi trong cung mot phong"
decision_owner: user
aliases: ["timeline CLS", "moc canon ba nhan vat", "Tsuna bao nhieu tuoi", "Jason truoc hay sau khi chet", "Akutagawa mocada", "truong sixth field"]
related: ["[[CLS]]", "[[05_Evasion/01_Oeuvre/Studio/Original/CLS_crossover-va-lenh-su/03_Development/structure/premise/premise|premise]]", "[[crossover]]", "[[watch-frame]]"]
source:
  type: inference
  ref: "contracts/crossover.md truong `timeline` con trong tu 13/09/2026; premise.md 14/09 lam no thanh cau hoi chan"
authority: user
confidence: 1.0
always_load: false
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-09-14
---

# Mỗi nhân vật đứng ở mốc nào trong canon của mình?

> ✅ **ĐÃ CHỐT 14/09/2026 — phương án ①, cả ba ở đáy.** Bản đầy đủ: [[moc-thoi-gian-ca-ba-o-day]]. Giữ nguyên văn phần phân tích dưới đây để thấy ba phương án đã được cân thế nào.
>
> 🔴 **Một lập luận trong file này đã bị rút:** phiên làm việc từng cho rằng ① làm động cơ đứng im vì *"cả ba mù ngang nhau"*. **Sai** — ba khuyết tật là **ba năng lực khác nhau**, nên mỗi người vẫn nhìn ra ở hai người kia. Xem [[moc-thoi-gian-ca-ba-o-day]].
>
> Đây là trường `timeline` còn trống của [[crossover]] — một trong sáu trường
> bắt buộc. **Không viết cảnh nào có ba người trong cùng một phòng** cho tới khi chốt.

## 🔴 Vì sao câu này không thể để trống nữa

[[05_Evasion/01_Oeuvre/Studio/Original/CLS_crossover-va-lenh-su/03_Development/structure/premise/premise|premise]] vừa chốt rằng ba người **đã bị xoá theo ba kiểu khác nhau** — và **kiểu xoá nào đã
xảy ra thì phụ thuộc hoàn toàn vào việc họ đứng ở đâu trên dòng thời gian của mình.**

Ví dụ, với Jason: trước hay sau khi chết **quyết định luôn** việc *"người ta giữ đứa trẻ trong
ký ức, không giữ hắn"* **đã xảy ra chưa**. Chọn sai mốc thì khuyết tật của nhân vật không có
nguyên nhân.

## Ba mốc phải chốt

| Nhân vật | Mốc | Điều mốc ấy quyết định |
|---|---|---|
| **Tsuna** | ? | hắn **đã là gia chủ chưa**; đã trải qua bao nhiêu lần tự rút lui |
| **Akutagawa** | ? | **trước hay sau khi rời Port Mafia**; màu sắc đã tắt tới đâu |
| **Jason** | ? | 🔴 **trước hay sau khi chết** — và nếu sau, thì trước hay sau khi trở về |

## Ba hướng, và cái giá của mỗi hướng

| | Cách chọn mốc | Được gì | Mất gì |
|---|---|---|---|
| **①** | **Cả ba ở điểm thấp nhất** của mình | ba khuyết tật đều đang hoạt động hết công suất; động cơ mạnh nhất | dễ thành ba người cùng khổ, giọng một màu |
| **②** | **Lệch pha** — một người vừa qua đáy, một người đang ở đáy, một người sắp tới | 🔴 tự sinh chức năng: người đã qua **nhìn ra** ở người đang ở; khớp thẳng với động cơ ở [[05_Evasion/01_Oeuvre/Studio/Original/CLS_crossover-va-lenh-su/03_Development/structure/premise/premise\|premise]] | phải canh để người 「đã qua」 không thành ông thầy — vi phạm ngưỡng 2 |
| **③** | **Cả ba ở giai đoạn ổn định**, vết thương đã cũ | không khí ấm, hợp mô-típ 「đo bằng đồ vật」 | mất tính cấp bách; kẻ chiếm chỗ khó thành mối đe doạ thật |

📌 **Phiên làm việc nghiêng về ②**, vì nó là cách duy nhất khiến câu *"không ai tự chẩn đoán được
mình, chỉ nhìn ra ở người khác"* có **cơ sở vật chất** chứ không phải một mệnh đề đẹp.
**Nhưng đây là quyết định của Aurel** — [[05_Evasion/01_Oeuvre/Studio/Original/CLS_crossover-va-lenh-su/03_Development/structure/premise/premise|premise]] không chốt hộ.

## Ràng buộc đã có

- [[crossover]] `memory: giữ nguyên` — nhân vật vào phòng với **đầy đủ ký ức tại mốc `timeline`**.
- [[watch-frame]] `memory_retained: true` — xem chuyện tương lai của chính mình **tính là biết
  trước**, và mỗi clip là một lần hé lộ phải khai `known_by`.

⇒ **Hệ quả:** mốc chọn càng sớm thì **lượng biết-trước mà buổi chiếu tạo ra càng lớn**, và càng
nhiều delta phải quản. Đây là chi phí kỹ thuật thật, không phải chuyện thẩm mỹ.
