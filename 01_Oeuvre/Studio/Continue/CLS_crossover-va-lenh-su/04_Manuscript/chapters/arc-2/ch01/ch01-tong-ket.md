---
id: note.CLS-arc2.ch01-tong-ket
type: info
scope: project
project: CLS
branch: arc-2
lane: personal
canon_layer: user_canon
status: review
aliases: ["tong ket ch01 arc 2 CLS", "tổng kết ch01 arc 2 CLS"]
related: ["[[ch01-plan-a2]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/CLS_crossover-va-lenh-su/04_Manuscript/chapters/arc-2/ch01/ch01-review|ch01-review]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/CLS_crossover-va-lenh-su/04_Manuscript/chapters/arc-2/ch01/ch01-zh-bang-ten|ch01-zh-bang-ten]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/CLS_crossover-va-lenh-su/04_Manuscript/chapters/arc-2/ch08/ch08-tong-ket|ch08-tong-ket]]", "[[tien-do-ba-arc]]", "[[arc-2-chot-25-10]]", "[[h-giong-khong-ten]]", "[[Amphoreus-npc-ngoai-hinh]]"]
source:
  type: inference
  ref: "xuong-lam (summarize-run) 25/10/2026; doc truc tiep ch01-chapter (arc 2), bon the canh a2-ch01-01..04 (qua plan va delta), ch01-review, delta.yaml, ch01-zh-bang-ten, nhat ky giao_viec status, style_metrics; khong tin loi ke cua phien chinh. Tên file trùng arc 1: dẫn bằng alias, không bằng wikilink trần."
authority: ai
confidence: 0.6
always_load: false
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-10-25
---

# Tổng kết ch01 (arc 2, chương đầu) — 第一章 霜

Bản tiếng Trung, `final` 25/10/2026; delta `committed` (snapshot `008-a2-ch01`). POV phòng chiếu của Phainon *(quyết định #1 của [[arc-2-chot-25-10]])*. Chạy tự động trong hàng đợi: `plan` → `plan-review` → `plan-fix` → `plan-approve` *(tự duyệt)* → `write` → `check` → `fix` → `delta` → `commit-approve` *(tự duyệt)* → `apply`.

> **Hai lần tự duyệt nằm trong 「Duyệt sau」** của `giao_viec.py status`, Aurel chưa đánh `seen`: `a2-ch01-plan-approve` (21:14) và `a2-ch01-commit-approve` (21:44). Cả hai ghi: review/sửa 0 lỗi nặng; `plan_gate` qua; `state_apply` dry-run qua, không đụng `secrets/`. Tính cả ch07, ch08, đang có **sáu** điểm dừng máy tự duyệt chờ Aurel.
>
> **18 mục AUREL của delta đang theo MẶC ĐỊNH, chưa ai duyệt** *(Aurel chưa trả lời = chưa áp mặc định)*.
>
> Tên file `ch01-chapter.md` / `ch01-zh-bang-ten.md` trùng arc 1 *(công cụ hàng đợi đòi đúng tên)*; `id` đã khác `CLS-arc2`. Dẫn note arc 2 bằng alias, không bằng `[[05_Evasion/01_Oeuvre/Studio/Continue/CLS_crossover-va-lenh-su/04_Manuscript/chapters/arc-2/ch01/ch01-chapter|ch01-chapter]]` trần.

## Ba phần đã làm

Không chạy mô hình "ba worker rồi hai reviewer" của quy tắc sản xuất truyện; chương đi qua hàng đợi `giao_viec`. Dưới đây là những gì có thật, đọc từ file.

| Worker | Phần | File | Số từ / số note |
|---|---|---|---|
| xuong-lam *(Opus · medium)* | dàn ý + 4 thẻ cảnh | `ch01-plan-a2.md`; `scenes/a2-ch01-01-suong-gia.md`, `-02-toa-roi.md`, `-03-nguoi-toc-trang.md`, `-04-to-vang.md` | 1 + 4 note *(số từ thẻ: not measured)*; `target_words` của dàn ý: 6.000 |
| xuong-lam *(Sonnet · high)* | viết chương *(bốn thẻ cảnh là dàn ý, không phải văn)* | `ch01-chapter.md` | **5.852 chữ Hán** theo `style_metrics` *(đo 25/10 trên bản cuối; sàn `min_cjk` 5.500: đạt, dư 352; thấp hơn `target_words` 6.000 là 148)*; 171 đoạn; 14 dấu `＊＊＊` *(nhịp phòng xen khối phim)*; dòng `em_dash_count` = 0 |
| phiên chính | lập nguồn ngoại hình, sửa dàn ý, sửa chương | `Database/Fandom/HSR/characters/Amphoreus-npc-ngoai-hinh.md` *(ngoài thư mục chương)*; `ch01-plan-a2.md`, thẻ 1.01 / 1.02 / 1.04; `ch01-chapter.md` | 1 note mới |
| xuong-kiem *(Opus · medium)* | soát dàn ý 25/10; soát mạch 25/10 | `ch01-review.md` | 14 + 14 lỗi *(5 vừa + 9 nhẹ; 1 nặng + 4 vừa + 9 nhẹ)* |
| xuong-lam *(Sonnet · medium)* | trích delta | `delta.yaml` | 4 hook, 0 secret đổi, 12 mục nhân vật/khối (10 nhân vật + khối phim canon + bóng lưng); 18 mục AUREL |
| xuong-lam | bảng tên | `ch01-zh-bang-ten.md` | 35 hàng `|` *(gồm tiêu đề và vạch)*; `status: draft` |

*Ghi chú đo:* `style_metrics` cảnh báo "không thấy dòng `go—>`", tức tiêu đề và lời người viết (nếu có) bị đếm chung; 5.852 là số của file, không tách riêng thân truyện.

## Phát hiện — xếp theo mức độ

Mức giữ nguyên như người soát ghi. Trạng thái "đã sửa" là điều review ghi; tôi chỉ đối chiếu mẫu trên thân chương. Số mục: do reviewer 28, do tổng kết này 5.

| Mức | Nguồn | Ở đâu | Vấn đề | Trích / trạng thái |
|---|---|---|---|---|
| **nặng** | soát mạch | H1 | Lời phòng 「他衣服呢」/「他没觉得缺」 chen giữa khối phim, không có `＊＊＊` *(B2)* | Đã sửa. Thân chương: sau `＊＊＊` mở nhịp phòng bằng 「“他衣服呢？”三月七说。」, khối phim kết ở lời Aglaea 「你们要找的东西，也不在这一处。」 |
| vừa | soát mạch | V1 | ch08 Stelle đứng, ch01 lại ngồi | Đã sửa. Thân chương: 「她往前迈了半步」 → 「又退回原处，球棒仍旧横在身前」 → 「她这才坐下」 sau khi Boothill đi |
| vừa | soát mạch | V2 | 「浴池里的水别喝」 ám chỉ người lạ cũng qua lễ tơ vàng *(lấn ch02)* | Đã sửa. Thân chương: 「新来的？……底下那家的蜜饼别买，粘牙。我试过了。」 |
| vừa | soát mạch | V3 | Tiếng 「……迷迷？」 「rất xa」, dễ đọc thành giọng người ở Okhema | Đã sửa. Thân chương: 「很轻，就在耳边，像是隔着一层水」; câu chốt 「车厢里只有两个人，没有谁张过嘴。」 |
| vừa | soát mạch | V4 | Tên file trùng arc 1 | **Giữ tên** *(công cụ hàng đợi đòi đúng tên; `id` đã khác)* |
| nhẹ | soát mạch | N1 | Black Swan nhìn lại, có thể hé Đêm Dài | Đã bỏ vế 「现在才想起来…」; thân chương còn 「原来我提这件事的时候，是这副表情。」 |
| nhẹ | soát mạch | N2, N3, N6, N7, N8 | 「没有人接话」 *(N2)*; khăn chưa lên phim *(N3)*; 「一个陌生的姑娘」 lệch POV *(N6)*; lời Aglaea sát canon *(N7)*; 「垂眼看了看」 *(N8)* | Đã sửa; lời Aglaea hiện là 「尼卡多利的一道影子」 và 「偏了偏头，像在听地上将散未散的黑影」 |
| nhẹ | soát mạch | N4 | Vết nứt kính Welt: chương 「眼镜上有一道细细的裂」, ch08 viết 「镜框边上」 | **Giữ — chờ Aurel** *(AUREL 17, không chặn)* |
| nhẹ | soát mạch | N5 | Stelle không phản ứng ở câu cuối *(sau 「谁？」)* | Giữ — lựa chọn B4 của thẻ cảnh |
| nhẹ | soát mạch | N9 | Cuốn sổ của bóng lưng *(thiết kế Đ1)* | **Giữ — chờ Aurel** *(AUREL 13, không chặn)*; thân chương: 「腋下夹着一本软皮册子，封面磨得发白，上面一个字也没有」 |
| vừa | soát dàn ý | B8, + 4 mục khác | Năm lỗi vừa: nhịp phòng tách hai khối phim ở 1.02 *(B8)*; cần nguồn ngoại hình; giọng lạ dời ra bậc đá ngoài cung; bảng Hé lộ ở 1.02; bảng 「Phainon biết gì」 theo nhóm C hoặc ghi thiếu | Đã sửa theo `plan-fix`; `review` chỉ liệt kê gộp, không đánh số từng lỗi *(tôi không có bản liệt kê riêng để đối chiếu từng cái)* |
| nhẹ | soát dàn ý | 9 mục | Chín lỗi nhẹ | `ch01-review.md` không liệt kê từng mục; tôi không có chi tiết để trích. Ghi: *not itemized* |
| nhẹ | tổng kết | Cảnh phòng, đầu 1.02 | 「这是他在这一段里说的第一句话」 *(Dan Heng: 「落地比我记得的响」)* đứng ngay sau khối phim mà Dan Heng đã nói chuyện hai lần trước đó: 「算临时住所。」 và 「可以。如果它还有墙的话。」 | Có thể hiểu "đoạn" = nhịp phòng *(trong phòng anh im lặng suốt)*, nhưng câu đọc lên dễ thành lệch. Không đề nghị sửa; để Aurel nhìn |
| nhẹ | tổng kết | Cuối chương | Dan Heng 「站得笔直」 lúc đầu rồi 「往前走了两步……站住了」; cuối chương lại 「坐直了，脊背离开了椅背」 mà không có chỗ nào cho thấy anh ngồi xuống | Không nặng *(người đọc tự hiểu anh ngồi lúc Himeko nói 「坐下再说」)*; ghi để Aurel biết |
| nhẹ | tổng kết | `ch01-zh-bang-ten.md` | Bảng có hàng **火种**, ghi 「phiên đặt, CHƯA CHẮC」, nhưng thân chương **không có** chữ 火种 *(đếm: 0)* | Delta AUREL 14 đã ghi "có thể bỏ". Chưa bỏ, vì tôi không sửa. Ngoài ra bảng tên vẫn `status: draft` |
| nhẹ | tổng kết | `delta.yaml`, đầu file | Phần chú thích đầu file còn ghi 「proposed」 và 「ch01-chapter.md dang status: draft」 trong khi `status: committed` và chương `final` | Chỉ là dòng chú thích; không ảnh hưởng nội dung đã áp *(giống ch08 arc 1)* |
| nhẹ | tổng kết | `ch01-chapter.md`, `source.ref` | Ref còn câu 「Chua qua xuong-kiem check-continuity」 trong khi đã qua *(câu "Sua 25/10 (fix…)" nối ngay sau)* | Chỉ là chú thích nguồn; không đổi thân chương |
| nhẹ | tổng kết | gate | `chapter_gate` vẫn bị waive vì TR-017 *(`style/ai-tells.md` chưa có khối `gate:`)* | Không có số đo trọn bộ chỉ tiêu; chưa quyết mốc |

Không còn lỗi nặng nào mở: H1 đã sửa và tôi thấy chỗ sửa trong thân chương. Tôi không kiểm lại từng dòng cách sửa ngoài mẫu ở trên, không chạy lại `pov_leak_check`. Tôi `grep` thân chương với các chữ cấm trong dòng chú thích delta *(令使 · 阿哈 · 众神 · 候选 · Nihilux · IPC · 杰森 · 不死途 · 太宰 …)*: **0 kết quả**.

## Mối nối giữa các phần

- **ch08 (arc 1) → ch01:** ổn. Boothill 「出去问个人。这边你们自己看着办。」 rời phòng; sương trên tường; Stelle đứng rồi ngồi *(V1 đã sửa)*. Không nêu tên ai, không nêu Jason hay IPC.
- **Mở chương (sương) → khối phim 1 (đoàn tàu chọn Amphoreus):** ổn. 「他坐下去。墙亮了。」 → 「星穹列车的客车厢里……」.
- **Khối phim 1 → toa rơi:** ổn. 「她从袖口取出一面巴掌大的圆镜」 *(Black Swan)* → 「备用方案：拆下一节车厢」 → 「车厢从列车上脱钩的时候」. Chỉ Stelle và Dan Heng xuống; March ở phòng nghỉ.
- **Toa rơi → nhịp 「落地比我记得的响」:** lệch nhẹ *(xem bảng)*. Cạnh nhau: 「“可以。”丹恒说。“如果它还有墙的话。”」 và 「“落地比我记得的响。”丹恒说。 / 这是他在这一段里说的第一句话。」 — chỉ ổn nếu "đoạn" là nhịp phòng.
- **Toa rơi → bóng lưng Okhema:** ổn. 「同一时刻，奥赫玛」; ngọn lửa 「往城外很远的地方坠下去」 khớp với cú rơi vừa chiếu. Phòng: 「我不认识。起码，我没见过这个人。」; Stelle và Dan Heng lắc đầu.
- **Bóng lưng → thần điện / Tribbie:** ổn. Không giữ bóng lưng làm khoảng nối; "镜头先离开了他" rồi nhịp phòng, rồi 「神庙里光线很暗」.
- **Thần điện → nhịp phòng 「我那会儿有这么吵吗」:** ổn. Gậy bị lõm → 「棒身上那道凹痕朝着他」 → Phainon cúi chào; Dan Heng không cười, Stelle liếc, Phainon không hỏi *(đúng POV: anh không biết ý nghĩa cái liếc)*.
- **Nhịp phòng → Okhema / Mydei / Castorice / Aglaea:** ổn. Mydei 「入侵者。报上名来。」; Castorice 「保持五步的距离」; Aglaea chỉ nói về "một đạo bóng của Nikador". Rồi **H1 đã sửa**: nhịp phòng về lại bằng 「他衣服呢？」.
- **Aglaea → tơ vàng → nhịp phòng 「我记得这个约定」:** ổn. Stelle nói 「好」 trên phim; ở phòng chỉ một câu 「我记得这个约定。」 và March 「没有追问」.
- **Tơ vàng → bậc đá / giọng lạ → nhịp cuối:** ổn. 「新来的？……我试过了。」 Stelle quay 「谁？」, Dan Heng ở chân bậc chỉ gọi 「星。」; trong phòng, Dan Heng 「坐直了」, Himeko hạ chén. Phainon: 「他不知道这两个人听见了什么」. **Không** viết hai giọng là một *(đối chiếu `h-giong-khong-ten`: chỉ cử chỉ, không tên, không 「黑泥」 hay 「小鸟」)*.
- **Cả chương → ngưỡng giữ bí mật:** thân chương không có tên, mặt, tóc, tay đút túi của bóng lưng; không nhắc Jason, Ashveil, IPC, Cyrene, Khaslana, Đêm Dài, cái chết của Aglaea. Không chốt câu trả lời cho "Phainon sau 3.7". Đối chiếu bằng đọc tay và `grep`, không chạy lại `pov_leak_check`.
- **Cả chương → quyết định đã chốt** [[arc-2-chot-25-10]]: #1 POV phòng Phainon: ổn; #6 Dazai ở Okhema khi toa rơi, không ngồi toa: ổn *(chỉ bóng lưng)*; #9 bỏ C6, ngoại hình tả theo nguồn ngoài: ổn *(tả trong chương theo [[Amphoreus-npc-ngoai-hinh]])*.
- Còn **một** mối lệch nhẹ *(「第一句话」)* và **một** khoảng trống nhẹ *(Dan Heng ngồi lúc nào)*; không có seam lệch nặng.

## Hook

*(Đọc `status:` trong `delta.yaml`, không phải do tôi quyết.)*

| Hook | Trạng thái | Ghi chú |
|---|---|---|
| `h-giong-khong-ten` | `open` | Gieo lại: giọng lười, vừa nhai vừa nói, chỉ Stelle nghe; payoff giữ ch02. Đề xuất thêm một dòng "Tiến độ" |
| `h-nguoi-ta-ve-duoc` | `open` | Không chạm *(chỉ câu Boothill rời đi)* |
| `h-nguoi-do` | `open` | Không chạm |
| `h-ipc-muon-jason` | `proposed` | Không chạm |

## Cần Aurel quyết

1. **18 mục AUREL của delta đang theo MẶC ĐỊNH, chưa ai duyệt.** Nhóm cần nhìn trước: (3) bóng lưng ở Okhema có gắn với secret `giong-khong-ten-la-dazai` hay không *(mặc định: không)*; (13) cuốn sổ trong thiết kế Đ1 *(N9)*, giữ hay bỏ; (16) tiếng 「……迷迷？」 là giọng ai, có phải giọng ở bậc đá không *(chương cố ý không trả lời)*; (15) Phainon sau 3.7 *(thiếu canon chính thức, chương chỉ viết "không biết mình tới bằng cách nào")*; (17) vết nứt kính Welt *(N4)*; (1) đổi payoff của `h-giong-khong-ten`; (10) đổi status dàn ý arc 2 *(đang `proposed`)*; (11)(12) có tạo note nhân vật cho Phainon, Black Swan, Screwllum và sáu nhân vật canon trên phim không; (6)(7)(8) có tạo ba note quan hệ không; (18) dấu sương/gương, chỉ làm lối vào, không tạo hook.
2. **Hai lần tự duyệt** (`a2-ch01-plan-approve`, `a2-ch01-commit-approve`) chờ Aurel xem rồi đánh `seen`, cùng bốn của ch07, ch08.
3. **Tên đối chiếu `Name HSR - Tổng.csv`** *(A4)*: các tên đánh dấu 「phiên đặt」 trong bảng tên ch01 chưa có nguồn *(小白 diễn ý TextMap cn, 天外, 火种, 着陆舱, 卧厢)*; chữ 火种 không có trong thân chương, bỏ khỏi bảng hay giữ.
4. **「第一句话」 của Dan Heng**: để, hay đổi cho khỏi đọc thành lệch với 「算临时住所」 *(không chặn)*.
5. **`chapter_gate`** vẫn bị waive (TR-017): mốc `gate:` cho CLS chưa quyết.

## Còn là sổ sách tay (chưa ghi)

- Chưa có note nhân vật cho Phainon, Black Swan, Screwllum, Pom-Pom, Tribbie, Aglaea, Mydei, Castorice, Mem.
- Bảng tên `ch01-zh-bang-ten.md` vẫn `draft`; Trạm Dịch chưa đẩy ch01 arc 2.
- Dòng "Tiến độ" của `h-giong-khong-ten` cho ch01 arc 2 *(delta ghi, `status` giữ `open`)*: kiểm xem phiên chính đã ghi vào hook chưa.
