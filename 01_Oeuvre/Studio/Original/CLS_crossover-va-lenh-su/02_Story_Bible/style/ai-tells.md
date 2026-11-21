---
id: style.CLS.ai-tells
type: style
scope: project
project: CLS
lane: personal
canon_layer: project_locked
status: active
strength: target
aliases: ["ai tells CLS", "tat cua may CLS", "tật của máy CLS", "profile ai_tells_check CLS"]
related: ["[[CLS]]", "[[20261004-luat-co-ban-va-san-3000]]", "[[giong-van-pho-thong-khong-nhai-ai]]", "[[05_Evasion/01_Oeuvre/Studio/Original/CLS_crossover-va-lenh-su/02_Story_Bible/style/hard-rules|hard-rules]]", "[[05_Evasion/01_Oeuvre/Studio/Original/CLS_crossover-va-lenh-su/02_Story_Bible/style/targets|targets]]", "[[forbidden-patterns]]"]
source:
  type: user_input
  ref: "Aurel 04/10/2026: 'dung cac luat co ban khi viet de kiem'. Danh sach lay tu Global/personal/forbidden-patterns.md va danh sach tat model dung chung cua sub-vault (AGENTS.md muc 5); cach viet thanh bieu thuc la cua phien. KHONG co tran so — chua co ban nao de do."
authority: user
confidence: 0.7
always_load: false
load_for: [writer, continuity-reviewer]
# Doc boi ai_tells_check.py --project CLS. KHONG co khoi `gate:`: chapter_gate.py can moc do tu nguyen tac, CLS khong nhai ai nen chua co moc — no se dung, exit 2, cho toi khi do ch1.
# Ten construct theo THU TU trong list: project_1, project_2, ... — them thi them o CUOI.
forbid_chars: ['「', '」', '『', '』']
extra_constructs:
  - '[Vv]à đó là lúc|[Đđ]ó là lúc (?:hắn|cậu|cô|anh|ông|họ) (?:hiểu|nhận ra)|(?:chợt|bỗng) (?:hiểu|nhận ra) rằng'
  - 'không phải [^.!?\n]{1,40}, mà là'
  - '(?:^|\n)(?:Một lúc sau|Chẳng bao lâu|Một lúc lâu|Hồi lâu|Trong một khoảnh khắc|Trong giây lát)'
  - 'Không ai nói gì|Không ai lên tiếng|[Ii]m lặng (?:bao trùm|kéo dài|đè nặng)|trong một lúc lâu'
  - 'dường như|như thể|tựa như'
  - 'hít (?:một|vào một) hơi (?:thật )?sâu|thở ra một hơi'
  - 'kho[ée] (?:môi|miệng)|nhếch (?:môi|mép)'
  - 'ánh mắt|đáy mắt'
  - 'khẽ|chậm rãi|nhẹ nhàng'
  - 'một cách [^\s.,!?]+ [^\s.,!?]+'
  - '仿佛|似乎|宛如|如同|犹如'
  - '目光|眸光|眼底|眼神'
  - '嘴角(?:微微)?(?:勾|扬|上扬|扯)'
  - '深吸一口气|长舒一口气|倒吸一口'
  - '不是[^。！？]{1,20}，而是'
  - '一时间|不由得|下意识'
  - '没有人(?:说话|开口)|沉默(?:蔓延|笼罩|持续)'
tags: [d/fanfic, k/rule, p/personal]
last_updated: 2026-10-12
---

# Tật của máy — profile cho `ai_tells_check.py`

> Aurel giao 04/10/2026: kiểm bằng **luật cơ bản khi viết**. File này biến danh sách 「mẫu cần tránh」 dùng chung của sub-vault thành thứ máy đếm được.
> **Chưa có trần số nào** — trần phải đo từ một bản văn thật, mà CLS chưa có. Cho tới khi đo ch1, công cụ chỉ **đếm và báo**; người đọc số là người quyết.

## Mười nhóm đang đếm

| # | Tật | Từ đâu |
|---|---|---|
| 1 | Câu tổng kết cảm xúc cuối đoạn *(「và đó là lúc… hiểu rằng」)* | `Global/personal/forbidden-patterns` #1 |
| 2 | Cặp đối lập sáo *(「không phải X, mà là Y」)* | `forbidden-patterns` #2 |
| 3 | Mở đoạn bằng trạng ngữ thời gian lặp lại | `forbidden-patterns` #5 |
| 4 | 「Không ai nói gì」 và họ hàng của nó | danh sách tật model dùng chung — trước ở `AGENTS.md` sub-vault mục 5, nay không còn văn bản riêng; luật gần nhất là `forbidden-patterns` |
| 5 | So sánh đệm *(dường như, như thể)* | tật model dùng chung |
| 6 | Hít sâu, thở ra | tật model dùng chung |
| 7 | Khoé môi, nhếch mép | tật model dùng chung |
| 8 | Ánh mắt, đáy mắt | tật model dùng chung |
| 9 | Trạng từ đệm *(khẽ, chậm rãi, nhẹ nhàng)* | `forbidden-patterns` #4 — tính từ cảm xúc thay cho hành vi |
| 10 | 「Một cách + tính từ」 | `forbidden-patterns` #4 |

Hai tật trong `forbidden-patterns` **không** viết được thành biểu thức, phải rà bằng mắt: **liệt kê ba vế đều đặn** (#3), và **tính từ cảm xúc thay cho mô tả hành vi** nói chung (#4).

## Ký tự cấm

`「 」 『 』` — ký tự của note trong vault, không phải của văn truyện ([[05_Evasion/01_Oeuvre/Studio/Original/CLS_crossover-va-lenh-su/02_Story_Bible/style/hard-rules|hard-rules]]).

## Việc kế

Sau khi Aurel chỉnh ch1: chạy công cụ trên bản đã chỉnh, lấy **tỉ lệ của chính bản ấy** làm trần cho từng nhóm, rồi ghi vào `targets:` ở frontmatter. Lúc ấy file này mới thành `strength: hard`.
