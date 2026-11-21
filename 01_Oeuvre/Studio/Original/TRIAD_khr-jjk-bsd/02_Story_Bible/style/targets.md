---
id: style.TRIAD.targets
type: style
scope: project
lane: personal
project: TRIAD
canon_layer: fic_explicit
status: draft
strength: target
aliases: ["targets TRIAD", "chi tieu van phong TRIAD", "so can cham TRIAD", "word count band TRIAD"]
related: ["[[05_Evasion/01_Oeuvre/Studio/Original/TRIAD_khr-jjk-bsd/02_Story_Bible/style/signature|signature]]", "[[05_Evasion/01_Oeuvre/Studio/Original/TRIAD_khr-jjk-bsd/02_Story_Bible/style/hard-rules|hard-rules]]", "[[quyet-dinh-dau-cau]]"]
source:
  type: user_input
  ref: "Dat tu so do chuong-01-aurel-viet-lai.md (3349 tu) ngay 12/09/2026. N=1 chuong nen khoang dat rong co y."
authority: user
confidence: 0.5
always_load: false
tags: [d/fanfic, k/rule, p/personal]
last_updated: 2026-11-21
---

# Chỉ tiêu — con số cần chạm · **v1**

> Lệch thì **báo số, không nhét chữ**. Ép chỉ số bằng cách rắc thêm phẩy là làm hỏng văn để làm
> đẹp bảng.
>
> ⚠️ **Đặt từ 1 chương** (`N = 3349 từ`). Khoảng cố tình để **rộng** — siết lại sau chương 2–3.

| Chỉ số | Chương 1 | Chỉ tiêu v1 | Ghi chú |
|---|---|---|---|
| Số từ / chương | 3.349 | **2.000–3.500** | Aurel 12/09/2026 — nới trần, không dời tâm |
| Đoạn — trung bình | 63,1 | **45–75 từ** | |
| Câu — trung vị | 30,5 | **20–35 từ** | |
| Phẩy / câu — trung bình | 2,52 | **≥ 1,8** | chữ ký chính — [[05_Evasion/01_Oeuvre/Studio/Original/TRIAD_khr-jjk-bsd/02_Story_Bible/style/signature\|signature]] §1 |
| Câu ≤5 từ | 1,0 % | **≤ 10 %** | đây là **trần**, không phải sàn — nhịp chặt là giọng bản AI |
| **Thoại** | 20,8 % (đoạn có thoại) ❌ | **≥ 38 %** | Nguyên văn hợp đồng tông [[tong-va-cach-ke]] `[A]`, Aurel giữ lại 12/09 ([[quyet-dinh-dau-cau]]). ⚠️ Hợp đồng **không nói % gì** — xem ghi chú dưới bảng |
| Ngắt cảnh `---` / chương | 7 | **≥ 4** | cấu trúc montage nhiều tuyến |

> ⚠️ **"Thoại ≥ 38 %" chưa có định nghĩa cách đo.** Hợp đồng không nói đó là % số đoạn có thoại
> hay % số từ nằm trong thoại — hai cách cho hai con số rất khác. **Chưa tự định nghĩa**; chốt khi
> có chương đầu tiên thực sự nhiều hội thoại (chương 2 hoặc 8), để chọn bằng số thật chứ không
> chọn định nghĩa nào cho con số dễ nhìn. [[quyet-dinh-dau-cau]] § Một điểm chưa rõ.
>
> Chương 1 dưới sàn (20,8 %) — **ngoại lệ có lý do**, không phải nợ: đó là chương montage gần như
> không có hội thoại qua lại.

## Không đặt chỉ tiêu mật độ thuật ngữ ở sân sàng lọc

Đo chương 1: `phó bản` **0** · `chủ thần` **0** · `sân sàng lọc` **0**. Từ vựng thực có:
`tháp` 4 · `thông báo` 6 · `năng lượng` 3.

Bằng 0 là **đúng thiết kế** — chương 1 là "thông báo cụt, không ai biết chuyện gì", hệ thống chưa
tự xưng tên. Đặt chỉ tiêu mật độ ở đây sẽ ép nhân vật dùng từ họ chưa được biết.

Đặt chỉ tiêu này **từ phó bản 1 thật** trở đi. Lúc đó ghi danh sách từ khoá trong backtick kèm chữ
"chia" để `style_metrics.py` tự nhận, và ngưỡng dạng `≥ N/1000`.

## Cảnh báo khi đọc kết quả

- **Một từ khoá gánh phần lớn mật độ** → gần như chắc chắn nó khớp bên trong tên nhân vật. Đọc
  `term_hits` từng từ, không đọc mỗi tổng.
- **Bản nháp ngắn đều đặn** → thiếu ngân sách từ cho từng cảnh trong kế hoạch chương.
- **Đoạn trung bình trôi lên qua từng chương** → văn đang đặc lại; báo trước khi nó thành chuẩn mới.

## Lệnh đo

```bash
python 01_Origine/04_Tools/VaultTool/scripts/style_metrics.py --root "D:/AureLysn" --project TRIAD <duong-dan-chuong>
```

> `style_metrics.py` đếm **cả khối ghi chú** trong file, không chỉ văn xuôi — nên con số nó in ra
> lệch nhẹ so với bảng trên (3.346 vs 3.349). Bảng trên đo từ `# Chương 1` trở đi.
