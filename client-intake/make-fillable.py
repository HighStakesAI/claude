#!/usr/bin/env python3
"""Derive the client-facing fillable form from the master source.

Google Drive's Markdown import drops task-list checkboxes (`- [ ]` becomes a
plain bullet) but keeps tables and the ☐ glyph. So the fillable layout uses
the same pattern the original High Stakes onboarding brief used, and that
clients actually completed: a question, then an empty table cell to type in.

Run:  python3 make-fillable.py
In:   Universal-Client-Intake-Form.md          (source of truth — edit this)
Out:  Universal-Client-Intake-Form.fillable.md (never edit by hand)
"""
import re
import sys

SRC = 'Universal-Client-Intake-Form.md'
OUT = 'Universal-Client-Intake-Form.fillable.md'

# An empty two-cell table. Markdown needs a delimiter row, so the smallest
# table Docs will build is header + one row — which lands as a roomy answer box.
BOX = ['|  |', '|---|', '|  |']

BLANKS = re.compile(r'[ \t]*\$?_{6,}%?[ \t]*$')

# Structured sub-lists that read better as labelled tables than as bullets
# with trailing underscores. Replaced verbatim, then asserted.
BLOCKS = [
    # 4.7 lead routing
    ("""- ☐ Email to: ______________________
- ☐ SMS to: ______________________
- ☐ CRM — which one: ______________________ (GoHighLevel, Jobber, Housecall Pro, ServiceTitan, none)
- ☐ Phone call / call forwarding to: ______________________""",
     """| Send leads to | Tick | Exact destination |
|---|---|---|
| Email | ☐ |  |
| Text message | ☐ |  |
| CRM (GoHighLevel, Jobber, Housecall Pro, ServiceTitan…) | ☐ |  |
| Phone call / forwarding | ☐ |  |"""),
    # 9.5 domain
    ("""- Domain name: ______________________
- Where is it registered? ☐ GoDaddy ☐ Namecheap ☐ Google/Squarespace ☐ Wix
  ☐ Network Solutions ☐ Cloudflare ☐ Don't know ☐ Other: __________
- Do you have login access to the registrar? ☐ Yes ☐ No ☐ My old web guy has it
- Who is the registrant of record (the legal owner of the domain)? __________""",
     """| Question | Your answer |
|---|---|
| Domain name |  |
| Where is it registered? (GoDaddy, Namecheap, Google/Squarespace, Wix, Network Solutions, Cloudflare, don't know…) |  |
| Do you have login access to the registrar? (yes / no / my old web guy has it) |  |
| Who is the registrant of record — the legal owner of the domain? |  |"""),
    # 9.9 business email
    ("""- Your business email addresses: ______________________
- Who provides that email? ☐ Google Workspace ☐ Microsoft 365 ☐ The web host
  ☐ Gmail/Yahoo free account ☐ Don't know""",
     """| Question | Your answer |
|---|---|
| Your business email addresses |  |
| Who provides that email? (Google Workspace, Microsoft 365, the web host, free Gmail/Yahoo, don't know) |  |"""),
    # 12.4 ad accounts
    ("""- ☐ Google Ads — account ID: __________
- ☐ Meta Business Manager — ID: __________
- ☐ Meta Pixel installed? ☐ Yes ☐ No ☐ Don't know""",
     """| Account | Have it? | ID / notes |
|---|---|---|
| Google Ads | ☐ |  |
| Meta Business Manager | ☐ |  |
| Meta Pixel installed | ☐ |  |"""),
    # 13.6 / 13.8 contact rows
    ("""**13.6 Who approves website copy and design?** **[REQUIRED TO START]**

Name: __________ Email: __________ Phone: __________""",
     """**13.6 Who approves website copy and design?** **[REQUIRED TO START]**

| Name | Email | Phone |
|---|---|---|
|  |  |  |"""),
    ("""**13.8 Backup contact if the primary is unreachable**

Name: __________ Email: __________ Phone: __________""",
     """**13.8 Backup contact if the primary is unreachable**

| Name | Email | Phone |
|---|---|---|
|  |  |  |"""),
    # sign-off
    ("""Name: ______________________  Title: ______________________

Date: ______________________""",
     """| Name | Title | Date |
|---|---|---|
|  |  |  |"""),
]

COVER = """> **This copy belongs to one business.** Anything you type is visible only to you
> and to High Stakes AI — no other client can see this document.

| Prepared for | Date sent | Please return by |
|---|---|---|
|  |  |  |
"""

# The master tells clients to type on blank lines; the fillable version has boxes.
FILL_OLD = "- Type your answers directly under each question, in the blank line or box."
FILL_NEW = ("- Click inside the grey box under each question and type. "
            "Boxes grow as you write, so answer at whatever length you like.")


def main():
    try:
        text = open(SRC, encoding='utf-8').read()
    except FileNotFoundError:
        sys.exit(f'{SRC} not found — run this from the client-intake directory.')

    for old, new in BLOCKS:
        if old not in text:
            sys.exit(f'source block not found, master has drifted:\n{old[:70]}…')
        text = text.replace(old, new, 1)

    if FILL_OLD not in text:
        sys.exit('fill-in instruction line not found, master has drifted')
    text = text.replace(FILL_OLD, FILL_NEW, 1)

    lines = text.split('\n')
    out, boxes, i = [], 0, 0
    while i < len(lines):
        line = lines[i]

        # "Answer: ____" (plus any bare underscore continuation lines) -> one box
        if re.fullmatch(r'Answer: _+', line):
            while i + 1 < len(lines) and re.fullmatch(r'_+', lines[i + 1]):
                i += 1
            out.append('')
            out.extend(BOX)
            boxes += 1
            i += 1
            continue

        # A prompt ending in blanks, e.g. "**4.1 Main public phone number** ____".
        # Checkbox option rows keep their inline blanks: the client types over them
        # in place, and a box per option would bury the question.
        if '☐' not in line and not line.startswith(('-', '|', '>')) and BLANKS.search(line):
            stripped = BLANKS.sub('', line).rstrip()
            if stripped:
                out.append(stripped)
                out.append('')
                out.extend(BOX)
                boxes += 1
                i += 1
                continue

        out.append(line)
        i += 1

    text = '\n'.join(out)

    # Drop the cover block in after the subtitle, above the instructions.
    anchor = 'Version 2.0 — supersedes the "Client Onboarding Brief" used through September 2026.'
    if anchor not in text:
        sys.exit('version line not found, master has drifted')
    text = text.replace(anchor, anchor + '\n\n' + COVER, 1)

    text = re.sub(r'\n{3,}', '\n\n', text)
    open(OUT, 'w', encoding='utf-8').write(text)

    leftover = [l for l in text.split('\n')
                if BLANKS.search(l) and '☐' not in l and not l.startswith(('-', '|'))]
    print(f'wrote {OUT}: {boxes} answer boxes, {len(BLOCKS)} blocks converted to tables')
    if leftover:
        print('unconverted prompts still ending in blanks:')
        for l in leftover:
            print('   ', l)


if __name__ == '__main__':
    main()
