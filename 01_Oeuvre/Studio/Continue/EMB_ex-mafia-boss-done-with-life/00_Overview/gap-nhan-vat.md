---
id: info.EMB.gap-nhan-vat
type: info
scope: project
lane: personal
project: EMB
canon_layer: planned
status: open
aliases: ["gap nhan vat", "nhan vat con thieu", "lo hong extract-entities", "loi dung doc som", "kiem ke nhan vat", "ai chua co note"]
related: ["[[EMB]]", "[[tomoko]]", "[[nagi]]", "[[fact-bang-tinh-hinh-ke-hoach]]", "[[p2-ch2]]", "[[tai-trong-context]]"]
source:
  type: measured
  ref: "Found during the verify step of batch 8b: vault_doctor reported the broken link [[tomoko]], as the note describes; source block added 2026-11-13 from the note's own text"
authority: ai
confidence: null   # was 1.0 — authority: ai khong duoc 1.0. Bo thay vi bia so khac (principles.md nguyen ly 3)
always_load: false
tags: [d/fanfic, k/note, p/personal]
legacy_tags: [system, gap, measured, dot8b]
last_updated: 2026-10-01
---

# Lỗ hổng nhân vật — **phát hiện khi chạy verify của đợt 8b**

> Cái này không nằm trong kế hoạch đợt 8b. Nó lộ ra vì `vault_doctor` báo một wikilink gãy: `[[tomoko]]`.

## Một link gãy dẫn tới đâu

`vault_doctor --root` *(quét toàn vault, không giới hạn project)* báo `broken_link: tomoko`. Hai note trỏ tới bà: [[05_Evasion/01_Oeuvre/Studio/Continue/EMB_ex-mafia-boss-done-with-life/03_Development/timeline/master|master]] và [[indra]].

Truy ngược thì ra: **Irie Tomoko là POV của trọn vẹn P2 Ch1** — và không có note.

⚠️ Bài học vận hành: **chạy `vault_doctor` có `--project` sẽ không bắt được link gãy.** Script tự tắt kiểm tra đó khi quét một project, vì link trỏ ra ngoài phạm vi sẽ báo nhầm. Phải chạy **cả hai chế độ**.

## Đã tìm thấy gì

| Ai | Vấn đề | Đã xử lý |
|---|---|---|
| **Irie Tomoko** | POV trọn P2 Ch1 · mắt xích nhân quả Estraneo · nguồn tin của Indra ở P1 Ch3 | ✅ [[tomoko]] |
| **Nagi** | POV một đoạn dài P2 Ch2 · **là Chrome**, xác nhận trong văn bản · người được Tsuna cứu | ✅ [[nagi]] |
| **Đoạn kiểm kê kế hoạch** | 🔴 **đoạn quan trọng nhất fic** — vault chỉ rút được một câu | ✅ [[fact-bang-tinh-hinh-ke-hoach]] |
| **Fūta** | có tên trong văn bản; hook đang mở. ⚠️ việc cậu bé **là** đứa trẻ Saint-Exavier là **suy luận mạnh**, không phải câu chữ | ✅ [[hook-dua-tre-saint-exavier]] |
| Cha mẹ Nagi | bí mật chặn giọng, chưa có note | ✅ [[nagi-khong-biet-chuyen-cha-me]] ⛔ |
| **Mukuro** | được cứu ở Estraneo, đang học với Kawahira | ✅ [[mukuro]] |
| **Ayame** | `Ketsueki`, hầu cận Musashi | ✅ [[ayame]] |
| **Kazuki** | `Chiyu`, người làm vườn — **và là người dựng khiên Flame vàng** ở cảnh mở P2 Ch2 | ✅ [[kazuki]] |
| **Masatsugu · Akiko · Shouichi** | nhà Irie. Shouichi có trong tag AO3 chưa lên hình | 🟡 ghi trong [[tomoko]], chưa tách note |

## 🔴 Sửa lại cách mô tả lỗi — nó tệ hơn "bỏ sót"

Bản nháp đầu của note này viết như thể vault **không biết** những nhân vật đó tồn tại. Sai.

[[Characters/_MOC|MOC Characters]] đã có sẵn một mục **"Chưa dựng note"** liệt kê đúng: `Nagi` · `Ayame` · `Kazuki` · `Irie Tomoko` · `Irie Shoichi` · `Irie Masatsugu` · `Irie Akiko`.

Nghĩa là danh sách **được ghi từ đợt 3**, rồi **nằm yên qua đợt 4, 5, 6, 7, 8** trong khi vault chuyển sang phân tích trope, chốt 18 câu hỏi, và dựng dàn ý arc.

⚠️ **Lỗi thật: dựng kế hoạch trên một hồ sơ nhân vật mà chính hồ sơ đó tự khai là chưa xong.** Không phải lỗi nhận thức — lỗi ưu tiên.

Và cái giá cụ thể: [[khung-sau-arc]] được viết mà **không biết** Fūta đang được lùng tìm, mẹ Takeshi đang được canh, Lavinia đã thất bại, và Nagi đã ở trong nhà. Arc 3 trong khung đó mô tả *"sửa bi kịch của những gia đình khác"* như việc **sắp bắt đầu**, trong khi văn bản cho thấy nó **đã chạy được một đoạn**.

## Lỗi thật là gì — **không phải "bỏ sót nhân vật"**

Đoạn ở P2 Ch1 dòng 726–790 chứa: danh sách người đã cứu · Fūta · mẹ Takeshi · Lavinia · Hayato · Lambo và I-pin · **ba lý do đầy đủ vì sao Tsuna không chọn lại Guardian** · ngoại lệ Kyouya và lý do · Indra tuyên bố ở lại · **và luận đề nói bằng chính lời tác giả**.

Vault đã rút **một câu** từ đoạn đó: *"five hundred and sixty seven"*.

Vì sao? Vì đợt trước đọc tới **kết thúc cảnh Estraneo** — crater, hồ sơ, Bermuda — rồi coi như xong chương. Bảng kiểm kê nằm **hai mươi dòng sau đó**.

🔴 **Đây là lần thứ tư cùng một lỗi:**

| Đợt | Dừng ở đâu | Bỏ lỡ gì |
|---|---|---|
| 2 | thứ tự đăng | toàn cảnh tương lai cuối P1 Ch3 |
| 3 | comment trước thân truyện | chú thích 55 |
| 3–6 | dòng 817 của P1 Ch2 | **lời giải của chính tác giả cho lời tiên tri** |
| **1–8** | **hết cảnh Estraneo, P2 Ch1** | **bảng kiểm kê + luận đề** |

Bốn lần, cùng một hình dạng: **dừng ở chỗ trông như kết thúc, trong khi cái quan trọng nhất nằm ngay sau.**

## Đề xuất sửa vào skill, không phải sửa vào vault

Vault sửa xong thì lần sau vẫn lặp. Chỗ cần sửa là `extract-entities`:

1. **Bắt buộc đọc hết file**, và **báo cáo số dòng đã đọc / tổng số dòng**. Nếu hai số không bằng nhau, gate không cho qua
2. **Bước kiểm kê POV**: liệt kê mọi đoạn mở sau ≥4 dòng trắng, gán POV cho từng đoạn. Đối chiếu với trường `pov` của chapter_summary — lệch là lỗi
3. **Quét tên riêng có bước lọc hai lớp.** ⚠️ Trong fic này lớp lọc là **bắt buộc**: quét thô cho ra 14 "nhân vật thiếu", nhưng `Mikoto` là hậu tố tên thần *(Kagutsuchi-no-Mikoto)*, `Getsufuji`/`Chiyu`/`Ketsueki` là tên bảy ngọn lửa, `Seiran` và `Ruriko` là **tên trang trọng của người đã có note**. Thật ra thiếu **6**, không phải 14
4. **Mục "Chưa dựng note" trong MOC phải là một gate, không phải một ghi chú.** Nếu MOC còn mục đó, `plan-continuation` **không được chạy**
5. **`vault_doctor` phải chạy cả hai chế độ** — có và không có `--project`
6. **Grep cả End Notes, không chỉ thân truyện.** [[kazuki]] chỉ được giải thích trong End Notes.

⚠️ **Và một lỗi nữa của chính mình:** bản nháp đầu note này ghi Kazuki là *"chưa rõ là ai"*. Sai — [[p2-ch2]] **đã ghi đúng từ đợt 3**: *"Kazuki là người làm vườn nhà Sawada, thuộc Chiyu — chính là người dựng khiên vàng"*. Mình không đọc chapter_summary trước khi tuyên bố có lỗ hổng. **Cùng đúng một hình dạng lỗi đang bàn ở note này.**

⚠️ Điểm 3 cũng là lỗi mình **vừa mắc trong chính đợt này**: bản nháp đầu ghi *"14 nhân vật thiếu note"*. Sai. Đúng là **6**, sau khi lọc.

## Chưa làm

- Tách note cho **nhà Irie** — Masatsugu, Akiko, và đặc biệt **Shouichi** *(có trong tag AO3 chưa lên hình)*
- Rà lại `pov` của **bốn chapter_summary còn lại** — mới sửa P2 Ch2
- Đọc lại **P1 Ch1–Ch3 và P2 Ch1 từ đầu đến cuối**, không dừng ở chỗ trông như hết cảnh. Đây là việc bắt buộc trước khi duyệt [[khung-sau-arc]]
