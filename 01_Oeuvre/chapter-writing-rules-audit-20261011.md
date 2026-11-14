---
id: info.chapter-writing-rules-audit-20261011
type: info
scope: global
lane: personal
canon_layer: user_canon
status: active
aliases: ["chapter writing rules audit 20261011", "quet chuong luat moi", "ra soat chuong final voi rules writing", "ke hoach sua chuong 11-10", "tag thoai moi luot", "thoai tag moi luot kho doc"]
related: ["[[_OEUVRE-MOC]]", "[[_VAULT-MOC]]", "[[_KNOWLEDGE-MOC]]", "[[05-visibility]]", "[[07-state]]", "[[09-gates]]", "[[pre-handoff-verification-checklist]]", "[[one-point-of-view-per-scene]]", "[[said-and-action-beats]]", "[[resist-the-urge-to-explain]]", "[[scene-must-turn]]", "[[scene-goal-conflict-outcome]]", "[[vary-sentence-length]]", "[[show-and-tell-balance]]"]
source:
  type: measured
  ref: "Aurel 2026-10-11: cross-project audit of committed (final) and draft chapters/outlines against the 11 writing rules in 01_Origine/02_Knowledge/; 8 read-only Sonnet low passes."
authority: ai
confidence: 0.7
always_load: false
tags: [d/doc, k/note]
last_updated: 2026-11-08
---

# Chapter Audit Against Curated Writing Rules (2026-10-11)

**Scope:** `PPCT` ch16–42 (27 `final` chapters in Chinese), `TDTB` ch16–18 (3 `final` chapters), followed by drafts and outlines of `UNTCH`, `CLS`, `TRIAD`, `PPCT` arc 7, and `TDTB`.
> **Measurement caveat:** Sentence, dialogue-tag, and short-paragraph counts below were produced by read-only agent scripts during the audit pass and must be re-verified with `01_Origine/04_Tools/VaultTool/` (`style_metrics`) before executing prose edits.

---

## 1. Round 1 Results — Committed (`final`) Chapters

No committed chapter triggered a severe structural failure. Aurel approved the following revision priority order on 2026-10-11, mapped to the authoritative writing rules in `01_Origine/02_Knowledge/` ([[_KNOWLEDGE-MOC]]):

1. **Unmarked mid-scene POV shifts ([[one-point-of-view-per-scene]])** — `PPCT` ch16, 17, 19, 25, 27 (borderline: ch31, 32, 33). *Fix:* Insert explicit location-header scene breaks or strip non-POV interiority.
2. **Paragraph-closing summary sentences that re-explain what was just shown ([[resist-the-urge-to-explain]], [[show-and-tell-balance]])** — `PPCT` ch16, 21, 22, 25, 27, 31, 35–42; `TDTB` ch16–18. *Fix:* Cut one redundant closing sentence per flagged paragraph without adding replacement text.
3. **Dialogue re-explaining facts the POV character and reader already know ([[resist-the-urge-to-explain]])** — Dazai re-explaining established mechanics to Tsuna: heavy in `PPCT` ch19, 22, 24, 26, 28; light in ch30, 33, 38, 40, 42. The *"crippled magus still holding Command Spells"* beat repeats across ch19 → 22 → 24 → 26.
4. **Scenes whose value charge does not turn ([[scene-must-turn]])** — `PPCT` ch28 scene 2 (weakest), second half of ch30, game scene in ch32, scene 1 of ch38. *(Note: ch20 and ch26 operate as intentional Mode B transition scenes and require no edit.)*
5. **Dialogue tags on every consecutive turn ([[said-and-action-beats]])** — Continuous *"Tsuna said / Dazai said"* chains. **Flagged by Aurel on 2026-10-11 as high-priority reading friction.** Agent measurement found speech tags on `23%–60%` of dialogue paragraphs across `PPCT` ch29–42 (compared to `17.2%` in the original author's corpus), with near `0%` untagged two-speaker exchanges; most pronounced in ch28, 30, 34, 37, 38, 40, 42.

**Known deviations intentionally left untouched or pending Aurel's decision:**
- Higher density of short sentences in `PPCT` ch35–42 ([[vary-sentence-length]]) — intentionally re-targeted in `targets.md` on 2026-09-30.
- **Pending Aurel:** Sentence cadence in `TDTB` ch16–18 runs shorter than the original author's baseline without a documented rationale in `style/`; the internal thought *"nobody will pick me anyway"* repeats 4 times.

---

## 2. Round 2 Results — Drafts and Outlines

- **`UNTCH` `omake-01` (draft):** Single-sentence paragraphs reach `50.3%` vs `19.6%` in the original corpus (hard style miss); straight quotes `"` used instead of curly quotes; 3 redundant paragraph-closing summary lines. No consecutive dialogue-tag chaining.
- **`UNTCH` outlines (13 files):** Missing explicit `Goal / Opposition / Outcome` and `Value (start → end)` fields ([[scene-goal-conflict-outcome]], [[scene-must-turn]]); `xem-ch09` uses Mashirao POV while narrating adult meta-awareness; `xem-ch08` leaks Byakuran's internal thoughts inside Keigo POV ([[05-visibility]]); `ch130` (DNA) and `ch131` (Wreath's name) are marked unblocked despite having unresolved blockers.
- **`CLS` `ch01` (draft):** Minor — 5 over-explained lines and one passage where Welt over-explains the projection frame. `CLS` scene cards lack `Goal / Opposition` and `Value` columns; scenes `2.04`, `4.05`, `5.05`, and `8.04` do not turn; `"Skott"` and `"dying of old age in bed"` lack retention hooks.
- **`TRIAD` `ch1`, `ch2` (draft):** `ch2` contains ~6 instances of the *"the kind of person who + explanation"* tell; Aurel's draft contains accidental keyboard input noise on lines 61–62; two versions of `ch2` overlap by ~85% with conflicting countdown timers (`6 days` vs `5 days 8 hours`).
- **`PPCT` Arc 7 (`de-xuat-arc-7-v2-huong-1.md`):** Missing `Goal / Value` columns; ch45–47 repeat the same *"Tsuna does nothing"* turn pattern; 3 instances of Dazai re-explaining prior events.
- **`TDTB` (`chia-arc-huong-b-tdtb.md` §1):** Contradicts locked decision `qd-tsuna-tren-show-thu-dong-tdtb` (2026-10-03), which rejected *"Tsuna actively tries to get eliminated"* as out-of-character.

### Template-Level Fix for Outlines
Because the standard outline template across all 4 projects previously lacked `Goal – Opposition – Outcome` ([[scene-goal-conflict-outcome]]) and `Value (start → end)` ([[scene-must-turn]]) columns, updating the shared scene-card/outline template in `01_Origine/04_Tools/Templates/writing/` is far cheaper and more durable than retrofitting old cards one by one.

---

## 3. Tooling Gaps Identified (`01_Origine/04_Tools/VaultTool/`)

| Tool / Area | Finding |
|---|---|
| `chapter_gate` | Refuses to run when `02_Story_Bible/style/ai-tells.md` lacks a `gate:` YAML block (`PPCT` and `CLS` currently lack this block). |
| `ai_tells_check` | Skips the default 13 Vietnamese/English regex patterns on Chinese text and only evaluates project-specific `extra_constructs`. Flagged hard errors on `PPCT` ch16–28 and ch30. |
| `pov_leak_check` | Cannot evaluate multi-scene chapter files unless each scene declares its own `pov:` header. |
| **Candidate new check script** | **Dialogue-tag density & consecutive-tagged-turn counter** ([[said-and-action-beats]]): deterministic, zero token cost, and directly enforces the `≤ 35%` tag ratio and `≤ 2` consecutive tagged turns threshold. |
| **Invocation rule** | Never invoke VaultTool scripts with `python -I` (isolated mode strips the script directory from `sys.path`); always run from the vault root `D:\AureLysn`. |

---

## 4. Six-Point Revision Protocol for Committed (`final`) Chapters

Governed by [[07-state]] (*Rewriting a chapter that is already committed*):

| Pattern | Measurement Method | Pass Threshold |
|---|---|---|
| **Dialogue tags on every turn** ([[said-and-action-beats]]) | Dialogue-tag counter script | Consecutive tagged turns `≤ 2`; overall tagged dialogue ratio `≤ 35%` (corpus baseline `17.2%`, range `8%–35%`); untagged exchanges used once two voices are established |
| **Unmarked mid-scene POV shift** ([[one-point-of-view-per-scene]]) | Inspect flagged interiority transitions | Explicit location-header scene break added, or non-POV internal thought removed |
| **Redundant closing summary sentence** ([[resist-the-urge-to-explain]]) | Inspect exact flagged sentence | Sentence deleted with zero loss of story information; no new filler added |
| **Dazai re-explaining known facts** ([[resist-the-urge-to-explain]]) | Grep Command Spell / Kayneth / Lancer across ch19, 22, 24, 26 | Each mechanic explained in full **at most once**; later callbacks limited to `≤ 1` sentence |
| **Non-turning scene** ([[scene-must-turn]]) | Write explicit `Value: start → end` line | Polarity shifts by scene end; if static, compress or merge without inventing new plot events |

### Mandatory Checklist for Every `final` Chapter Edit (Missing One = Incomplete)
1. **Archive the prior version first** with `status: archived` and a distinct archive ID (`Invariant 3`); update `last_updated` on the active file.
2. **Zero new plot facts, names, or events.** Only trim, merge, strip redundant tags, or insert scene-break headers. Total character count of the chapter **must not increase**.
3. **`delta.yaml` remains unchanged.** If any edit would alter story state, stop and ask Aurel.
4. **Other `final` chapters remain untouched** as stable continuity anchors.
5. **`vault_doctor --include-fiction` exits with `0` errors**, and `git diff --ignore-cr-at-eol --stat` touches only the targeted chapter files.
6. **Aurel reviews the `git diff`**, not the entire chapter from scratch (modeled on `PPCT` ch28, completed 2026-10-11).

**Execution order (cheapest → most complex):** Step 0 measurement script → dialogue tags (`PPCT` ch28 done; next: ch30, 34, 37, 38, 40, 42) → POV scene breaks (ch16, 17, 19, 25, 27) → redundant closing sentences → Dazai re-explanations (ch19, 22, 24, 26) → non-turning scenes (ch30, 32, 38) → hook/status cleanup.

---

## 5. Aurel's Process Design Notes (2026-10-11)

- **Distinguishing "State-Locked" from "Aurel-Approved Final Prose":** Currently `status: final` is applied as soon as a chapter's continuity state is committed, even though Aurel still performs post-commit reading passes and requests prose revisions. A future refinement to [[07-state]] and the `finalize-chapter` workflow should separate *"continuity state locked"* from *"final prose approved by Aurel after review."*
- **Separating the Translation/Writing Workbench (`Verba`) from the Reading Library (`05_Evasion/02_Library/`):** The translation/writing subsystem serves active drafting, whereas finished reading belongs in a dedicated reading library interface being designed in parallel.
