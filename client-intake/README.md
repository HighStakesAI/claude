# Client intake

The form every incoming High Stakes AI client fills out, covering website, Google
Business Profile and SEO.

| File | What it is |
|---|---|
| `Universal-Client-Intake-Form.md` | **Source of truth.** Edit this one. |
| `make-fillable.py` | Derives the client-facing version. Run after any edit. |
| `Universal-Client-Intake-Form.fillable.md` | Generated — do not edit by hand. |
| `HOW-TO-SEND.md` | Internal runbook: copying, folders, sharing, follow-up. |
| `INTERNAL-gap-analysis-and-sources.md` | Why each section exists, with sources. |

```
python3 make-fillable.py
```

The script fails loudly if the master has drifted from the blocks it rewrites, so a
broken build means "update the script," not "ignore it."

## Why two versions

Google Drive's Markdown import drops task-list checkboxes (`- [ ]` imports as a plain
bullet, box and all) but keeps tables and the `☐` glyph. The fillable version therefore
replaces every `Answer: ____` blank with an empty table cell — the same pattern the
original 2026 onboarding brief used, and the one clients actually completed. The master
stays readable as plain Markdown.

Table header cells must not use `**bold**`: Drive imports the asterisks literally.

## Live in Drive

`My Drive → 00 — High Stakes AI Templates`

- **TEMPLATE — Client Intake (fillable · make a copy per client)** — never shared with a
  client directly; copied per client.
- **MASTER — High Stakes AI Universal Client Intake (v2.0)** — reading copy of the
  master text.
- **HOW TO SEND — new client intake in 4 steps (internal)**
- **INTERNAL — Intake form: what changed and why (v2.0)**

Keep the Drive template and `Universal-Client-Intake-Form.md` in step: edit the Markdown,
regenerate, then re-upload. Nothing syncs automatically.
