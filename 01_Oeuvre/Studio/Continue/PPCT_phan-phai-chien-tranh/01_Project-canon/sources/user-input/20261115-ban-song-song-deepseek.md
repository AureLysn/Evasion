---
id: source.PPCT.20261115-ban-song-song-deepseek
type: source
scope: project
lane: personal
project: PPCT
canon_layer: user_canon
status: active
aliases: ["ban song song deepseek PPCT", "bản song song DeepSeek PPCT", "PPCT rewrite 20261115", "nhanh deepseek-20261115"]
related: ["[[PPCT]]", "[[arc-1-vuong-yen-ha-man]]"]
source:
  type: user_input
  ref: "Aurel, Claude Code 15/11/2026 — lệnh và ba câu trả lời AskUserQuestion, chép nguyên văn"
authority: user
confidence: 1.0
always_load: false
tags: [d/fanfic, k/note, p/personal]
last_updated: 2026-11-15
---

# Bản song song DeepSeek — quyết định Aurel 15/11/2026

## Lệnh, nguyên văn

> cho deepseek viết lại các chương viết tiếp của ppct, đánh giấu bản này như là một bản song song khác không xóa bản cũ

## Ba câu trả lời, nguyên văn

| Câu hỏi | Aurel chọn |
|---|---|
| Phạm vi trước | "Arc 1 trước (Recommended)" — ch16–ch18, xem chất lượng rồi mới chạy arc 2–6 |
| DeepSeek viết dựa trên gì | "Dàn ý + thẻ cảnh cũ (Recommended)" — giữ cốt truyện đã duyệt (chNN-plan + scenes/), DeepSeek viết văn mới, không nhìn văn bản final cũ |
| Quy trình kiểm | "Đủ ba model (Recommended)" — DeepSeek viết → Claude kiểm → GPT đọc beta → Claude kiểm cuối (skill `viet-ba-model`) |

## Cách đánh dấu bản song song (Claude áp dụng)

- Bản cũ (`chNN-chapter.md`, `status: final`, `branch: aurel-main`) **không sửa, không xoá**.
- Bản mới nằm trong `04_Manuscript/chapters/<arc>/chNN/rewrite-20261115/`, frontmatter `branch: deepseek-20261115`, `canon_layer: planned`, `status: draft`.
- Bản mới là continuity riêng (AGENTS §1.7): không chạy `state_apply`, không đổi `delta.yaml` / timeline / tracker của nhánh `aurel-main`.
