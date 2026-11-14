---
id: review.TDTB.ch16-review
type: info
scope: branch
lane: personal
project: TDTB
branch: aurel-main
arc: dan-y-ch16-ch19-tdtb
chapter: 16
canon_layer: user_canon
status: superseded
superseded_by: "[[04_Manuscript/chapters/arc-1/ch16/ch16-the-lam-lai]]"
superseded_at: 2026-10-03
aliases: ["review ch16 TDTB", "soat ch16 TDTB", "check-continuity ch16 TDTB", "check-style ch16 TDTB"]
related: ["[[04_Manuscript/chapters/arc-1/ch16/ch16-chapter]]", "[[04_Manuscript/chapters/arc-1/ch16/ch16-plan]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/TDTB_thap-dai-muc-trang-b/06_Alternate_Versions/branches/aurel-main|aurel-main]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/TDTB_thap-dai-muc-trang-b/02_Story_Bible/style/hard-rules|hard-rules]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/TDTB_thap-dai-muc-trang-b/02_Story_Bible/style/targets|targets]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/TDTB_thap-dai-muc-trang-b/02_Story_Bible/style/signature|signature]]", "[[05_Evasion/01_Oeuvre/Studio/Continue/TDTB_thap-dai-muc-trang-b/02_Story_Bible/style/ai-tells|ai-tells]]"]
source:
  type: inference
  ref: "check-continuity Mode 1, 30/09/2026, tren ban nhap ch16. Doi lai nguyen van zh ch4, ch5, ch11, ch12-13 (qua canon note), ch15 tu zip trong store personal-bulk."
authority: ai
confidence: 0.6
always_load: false
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-10-03
---

# Soát chương 16 — 《装B的第十六天》

> 🔁 **Bị thay 03/10/2026** → [[04_Manuscript/chapters/arc-1/ch16/ch16-the-lam-lai]]: ch16 viết lại theo [[dan-y-ch16-ch18-lam-lai-tdtb]]. Giữ làm lịch sử.

> Chỉ đọc, không sửa. Quyết định sửa hay giữ thuộc về Aurel.
> ✅ **Aurel 30/09 (finalize-chapter, "Theo đề xuất"):** sửa M1 (bỏ 宿主), L1 ("离别人都远"), S3 (一点 11→7, 小声 4→2), S4 (bỏ một chuỗi liệt kê, đổi câu 滤镜); giữ S1, S2. Sau sửa: 2.957 chữ · thoại 14,8 % · ai_tells exit 1 (project_12 ×2) · pov_leak 5/5 exit 0. Chương `final`, delta committed.
> ⚠️ **Người soát, người viết và planner là một, trong cùng một phiên.** Thẻ cảnh **đã** qua plan-reviewer (30/09); bản nháp thì chưa
> có người soát độc lập.

## Cổng máy

| Lệnh | Kết quả |
|---|---|
| `pov_leak_check` × 5 cảnh | exit **0** — nhưng **không có `leak_terms`** ở note bí mật nào, nên công cụ không dò được gì (L29) |
| Grep tay theo khối POV | **0**. Đã grep: Omega · 系统 · 积分 · 任务 (khối Yamamoto, Kenichi) · 百合 · 血 · 饮料 · 下药 · 鹿野雪 (khối Tsuna) · 0038 · 前世 · 十代目 · S级 · A级 · mùa (春 夏 秋 冬 雨 月) · 「『』 · 深吸一口气 · 心中一 · 眸. `我` ngoài ngoặc = 0 |
| `ai_tells_check --project TDTB` | exit 1 — chỉ `project_12` ×2 (6,8/10k, trần 11) |
| `vault_doctor --zone TDTB` | 0 lỗi |

## Tám nhóm

| Nhóm | Kết quả |
|---|---|
| Timeline | ✅ Đêm S1 → sáng S2; *"今天是第一集的第二天"* khớp [[qd-moi-tap-hai-ngay-tdtb]]. *"装了四年beta"* khớp phân hoá 15 tuổi, nay 19 ([[05_Evasion/01_Oeuvre/Studio/Continue/TDTB_thap-dai-muc-trang-b/03_Development/timeline/master\|master]]) |
| Ranh giới hiểu biết | ✅ Yamamoto coi Tsuna là beta (*"是beta的味道"*); Kenichi coi Tsuna là beta (*"一个beta嘉宾"*); Tsuna không biết bị bỏ thuốc (*"大概是喝错了什么东西吧"*). Không ai ngoài người mang ký ức nghĩ tới tương lai kia |
| Trạng thái nhân vật | ✅ Thuốc: *"上节目之前喝得干干净净"* khớp [[qd-thuoc-da-mua-lai-truoc-show-tdtb]]. 225 → 37 khớp C1 |
| Luật thế giới | ⚠️ **M1** bên dưới (giọng hệ thống). ABO: beta có mùi, beta ngửi được mùi alpha — khớp [[abo-the-gioi-tdtb]] luật 2, 9 |
| Quan hệ / xưng hô | ✅ Yamamoto gọi *"阿纲"*; Tsuna nghĩ *"山本"* ([[tsuna--yamamoto-tdtb]] `addressing`). Kenichi nghĩ *"圭介"* — trong đầu, không phải lời gọi |
| Canon | ✅ *"初中的时候，他们只同班了一年……他好像从来没有认真地看过那时候的阿纲"* khớp [[tsuna-yamamoto-cung-lop-so-trung-tdtb]] (*"trên cơ bản chưa từng nói chuyện qua"*) |
| Hợp đồng nhánh `forbid` | ✅ Không cảnh thân mật; lý do Yamamoto quý Tsuna có trên trang; không chi tiết mùa; Tsuna không nghĩ tới kiếp trước |
| Rò kế hoạch | ✅ Beat sau cùng (Kenichi thấy) không bị báo trước: Tsuna nghĩ *"应该没有人看见吧？"* — trớ trêu, không rò. *"回去以后得想办法多攒一点了"* = `foreshadow: hint` của cảnh 01, đúng mức. *"后门的事，已经不急了"* = `state` của cảnh 05, chưa hành động |

## Phát hiện

### M1 · world-rule · medium — hệ thống của Tsuna nói bằng từ của 0038

- **Chương, dòng 39:** *"“强效信息素抑制剂生效中。宿主当前信息素检测结果：beta。”"*
- **Nguồn:** hệ thống của Tsuna gọi cậu là **你**: ch4.60 *"“你的积分剩余225分，距离目标值还有775分，请继续努力。”"*. **宿主** là từ của
  0038: ch11.16 *"“宿主‘鹿野雪’注意，宿主‘鹿野雪’注意！”"*.
- **Note:** [[phan-biet-cung-ten-tdtb]] mục B — *"🔴 hai hệ thống khác nhau"*; [[qd-hai-he-thong-khong-lien-quan-tdtb]].
- **Vì sao đáng sửa:** người đọc nhận ra 0038 qua chữ 宿主. Cho hệ thống của Tsuna dùng cùng chữ làm mờ ranh giới hai hệ thống.
- **Hướng:** bỏ 宿主, ví dụ *"“强效信息素抑制剂生效中。当前信息素检测结果：beta。”"*.

### L1 · canon · low — *"最里面"* là thêm

- **Chương, dòng 145:** *"走廊左边最里面的那扇门"*.
- **Nguồn:** ch15.18 *"纲吉的房间在二楼的左边"*; 15.47 *"离别人的房间比较远"*. Không nói "trong cùng". Thẻ 05 đã sửa theo plan-reviewer
  L1 thành "bên trái… xa các phòng khác".
- **Hướng:** *"走廊左边、离别的房间都远的那扇门"*, hoặc giữ nếu Aurel chấp nhận chi tiết mới (không mâu thuẫn, chỉ là thêm).

### L2 · knowledge · low — Kenichi nhớ cảnh tiệc nướng

- **Chương, dòng 155:** *"铃木健一想起昨天烤肉的时候，鹿野雪围着山本武转来转去的殷勤样子，还有圭介那张黑得快要滴水的脸。"*
- **Nguồn:** ch14.10 là POV/góc Kesuke; Kenichi không được nêu tên ở ch11–14. Mọi khách đều ở tiệc (14.1) → **suy luận**, thẻ 05 đã ghi.
- Không phải lỗi; ghi để biết đây là dữ kiện mới đi vào canon khi chốt.

### Không chắc — không nâng thành phát hiện

- Dòng 91, Yamamoto: *"还替他把这件事捂得严严实实"*. Anh nửa mê, chỉ **suy ra** được là không ai tới. Đọc như suy nghĩ của anh thì ổn.
- Dòng 85, *"说好的滤镜呢，全掉光了好吗"* vọng lại ch15.58 *"滤镜都会掉光了"*. Là giọng Tsuna, nhưng lặp ý — để `check-style`.

## Kết luận check-continuity

**0 high · 1 medium · 2 low.** Không có gì chặn chốt chương ngoài quyết định của Aurel về M1.

---

# check-style — Mode 1

`style_metrics.py --write --json` → exit **0**. `metadata.yaml` đã ghi lại.

| Chỉ số | Chỉ tiêu ([[05_Evasion/01_Oeuvre/Studio/Continue/TDTB_thap-dai-muc-trang-b/02_Story_Bible/style/targets\|targets]]) | Loại | Đo | Kết luận |
|---|---|---|---|---|
| Chữ Hán thân truyện | ≥ 2.200 | sàn | **2.961** | ✅ |
| Thoại `“”` | 15–30 % | dải | **14,8 %** | ⚠️ **S1** — dưới sàn 0,2 điểm |
| Chữ Hán / đoạn | 32–50 | dải | 40,6 | ✅ |
| Đoạn ≥100 chữ | ≤ 9 % | trần | 5,5 % | ✅ |
| Câu ≥50 chữ | ≤ 37 % | trần | 3,3 % | ✅ (xem S2) |
| `？` / 1000 | ≥ 4 | sàn | 8,4 | ✅ |
| `！` / 1000 | 0,5–8,5 | dải | 1,7 | ✅ |
| `……` / 1000 | 0,4–3,5 | dải | 2,4 | ✅ (3,6 ở bản đầu → đã bớt) |
| `——` / 1000 | ≤ 1,5 | trần | 0 | ✅ |
| Dòng `Tên：` + dấu câu | ≥ 1 | sàn | 1 (*"纲吉：……"*) | ✅ |
| Thuật ngữ / 1000 | ≥ 10 | sàn | 14,2 — trải 12 từ, cao nhất 抑制剂 ×7 | ✅ không dồn vào một từ |
| Câu cuối ngắn, móc | có | — | *"“后门的事，”他低声说，“已经不急了。”"* | ✅ |
| Luật cứng: ngôi ba · `我` ngoài ngoặc · ngoặc · 「『』 | hard | hard | 0 vi phạm | ✅ |
| `ai_tells_check` | trần [[05_Evasion/01_Oeuvre/Studio/Continue/TDTB_thap-dai-muc-trang-b/02_Story_Bible/style/ai-tells\|ai-tells]] | hard | exit 1: `project_12` ×2 (6,8/10k < 11) | ✅ |

## Phát hiện văn phong

### S1 · target · thoại 14,8 %
Dưới sàn 0,2 điểm, sau ba lượt thêm thoại (10,5 → 13,2 → 14,4 → 14,8). Không nhồi thêm. **Aurel quyết** giữ hay viết thêm một nhịp thoại.

### S2 · tendency · câu ngắn hơn 乐博 nhiều
Câu trung vị **15** chữ Hán, 乐博 **30** (28–32) ([[05_Evasion/01_Oeuvre/Studio/Continue/TDTB_thap-dai-muc-trang-b/02_Story_Bible/style/signature|signature]]); câu ≥50 chữ 3,3 % so với 23 % của tác giả. Không nằm trong bảng
chỉ tiêu, nhưng là lệch giọng rõ nhất của bản nháp: 乐博 nối mệnh đề bằng dấu phẩy thành câu dài (ví dụ 15.40, 15.64); bản nháp chặt
câu bằng dấu chấm. Hướng, nếu sửa: gộp các cặp câu ngắn liền nhau trong phần kể (cảnh 01, 03, 05), **không** đụng thoại.

### S3 · tendency · lặp từ
*"一点"* ×11 (一点一点 · 一点光 · 一点零头 · 一点没有散干净…), *"小声"* ×4. Đổi ba bốn chỗ là đủ.

### S4 · forbidden-patterns · low
- Câu châm ngôn cuối đoạn, dòng 157: *"有时候，一句话放对了地方，就够了。"* — gần mẫu #1 (câu tổng kết). Trong POV Kenichi nó là **tính
  toán** của anh, nên chấp nhận được; ghi để Aurel xem.
- Liệt kê: dòng 71 *"半夜，山本武，信息素失控，沢田纲吉的房间"* và dòng 151 *"一个顶级alpha，一个世界知名的运动员，穿着昨天的衣服，天刚亮"*
  — hai chuỗi liệt kê cùng khuôn trong một chương (mẫu #3). Giữ một.
- Dòng 85 *"说好的滤镜呢，全掉光了好吗"* lặp ý ch15.58 *"滤镜都会掉光了"* — đổi câu than khác.

## Kết luận check-style

**0 hard.** 1 target lệch nhẹ (S1), 3 tendency / low (S2–S4). Không có gì chặn chốt; S1 và S2 là của Aurel quyết.
