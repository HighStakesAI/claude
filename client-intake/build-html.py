#!/usr/bin/env python3
"""Render the fillable form as HTML that Google Drive converts into a Doc.

Drive's Markdown import cannot express table-cell shading, so every answer box
arrived as an unshaded hairline table that clients do not read as "type here".
Drive's HTML import does honour inline CSS, and unlike a .docx it is plain text,
so it can be uploaded straight through the Drive API.

Styling is inline on every element on purpose — Docs' HTML importer is reliable
with inline CSS and inconsistent with stylesheet classes.

Run:  python3 make-fillable.py && python3 build-html.py
In:   Universal-Client-Intake-Form.fillable.md
Out:  Universal-Client-Intake-Form.html
"""
import html
import re
import sys

import mdblocks
import theme

SRC = 'Universal-Client-Intake-Form.fillable.md'
OUT = 'Universal-Client-Intake-Form.html'

INLINE = re.compile(r'(\*\*.+?\*\*|\*[^*\n]+?\*)')
REQUIRED = re.compile(r'(\[REQUIRED TO START[^\]]*\])')

BODY = f"font-family:Arial,sans-serif;font-size:10.5pt;color:#{theme.INK};"
# Kept deliberately terse: these strings repeat on ~400 cells, and Docs
# defaults already give us top alignment. Padding rides on cellpadding.
# Inline CSS on every cell, not legacy bgcolor/border attributes: a probe
# upload confirmed Docs' HTML importer honours inline styles, and an untested
# shortcut that silently drops the shading would defeat the whole point.
# Padding rides on cellpadding; Docs already top-aligns cells.
CELL = f"border:1px solid #{theme.BORDER};"
BOX_TD = f'<td style="{CELL}background-color:#{theme.BOX_FILL}">'
HEAD_TD = f'<td style="{CELL}background-color:#{theme.HEAD_FILL}">'
TABLE = ('border-collapse:collapse;width:100%;margin:2pt 0 8pt 0;" '
         'cellpadding="4" cellspacing="0')
ROW_H = f'<tr style="height:{theme.BOX_IN * 72:.0f}pt">' 


def inline(text):
    """Inline Markdown to HTML, with [REQUIRED TO START] in the brand red."""
    out = []
    for chunk in INLINE.split(text):
        if not chunk:
            continue
        open_tag = close_tag = ''
        if chunk.startswith('**') and chunk.endswith('**'):
            chunk, open_tag, close_tag = chunk[2:-2], '<b>', '</b>'
        elif chunk.startswith('*') and chunk.endswith('*') and len(chunk) > 2:
            chunk, open_tag, close_tag = chunk[1:-1], '<i>', '</i>'
        parts = []
        for part in REQUIRED.split(chunk):
            if not part:
                continue
            escaped = html.escape(part)
            if REQUIRED.fullmatch(part):
                parts.append(
                    f'<span style="color:#{theme.RED};font-weight:bold;">{escaped}</span>')
            else:
                parts.append(escaped)
        out.append(open_tag + ''.join(parts) + close_tag)
    return ''.join(out)


def build(md_path=SRC, out_path=OUT):
    parts = ['<html><head><meta charset="utf-8"></head>',
             f'<body style="{BODY}">']
    stats = {'boxes': 0, 'tables': 0, 'headings': 0}

    for block in mdblocks.parse(open(md_path, encoding='utf-8').read()):
        kind = block[0]

        if kind == 'h1':
            parts.append(
                f'<h1 style="font-size:21pt;margin:0 0 2pt 0;">{inline(block[1])}</h1>')
            stats['headings'] += 1

        elif kind == 'h2':
            parts.append(
                f'<h2 style="font-size:13pt;margin:20pt 0 8pt 0;padding-bottom:3pt;'
                f'border-bottom:2pt solid #{theme.RED};">{inline(block[1])}</h2>')
            stats['headings'] += 1

        elif kind == 'rule':
            parts.append(f'<hr style="border:0;border-top:1px solid #{theme.BORDER};'
                         'margin:8pt 0;">')

        elif kind == 'quote':
            parts.append(
                f'<p style="color:#{theme.MUTED};font-style:italic;'
                f'border-left:3pt solid #{theme.BORDER};padding-left:8pt;'
                f'margin:2pt 0 7pt 0;">{inline(block[1])}</p>')

        elif kind == 'bullets':
            parts.append('<ul style="margin:2pt 0 7pt 0;padding-left:20pt;">')
            for item in block[1]:
                parts.append(f'<li style="margin-bottom:2pt;">{inline(item)}</li>')
            parts.append('</ul>')

        elif kind == 'box':
            height = theme.BOX_TALL_IN if block[1] else theme.BOX_IN
            parts.append(
                f'<table style="{TABLE}">'
                f'<tr style="height:{height * 72:.0f}pt">'
                f'{BOX_TD}&nbsp;</td></tr></table>')
            stats['boxes'] += 1

        elif kind == 'table':
            rows = block[1]
            parts.append(f'<table style="{TABLE}">')
            for r, row in enumerate(rows):
                parts.append('<tr>' if r == 0 else ROW_H)
                td = HEAD_TD if r == 0 else BOX_TD
                for cell in row:
                    body = inline(cell) or '&nbsp;'
                    if r == 0:
                        body = f'<b>{body}</b>'
                    parts.append(f'{td}{body}</td>')
                parts.append('</tr>')
            parts.append('</table>')
            stats['tables'] += 1

        elif kind == 'para':
            text = block[1]
            margin = '8pt 0 4pt 0' if text.startswith('**') else '0 0 7pt 0'
            parts.append(f'<p style="margin:{margin};">{inline(text)}</p>')

    parts.append('</body></html>')
    open(out_path, 'w', encoding='utf-8').write('\n'.join(parts))
    print(f"wrote {out_path}: {stats['boxes']} shaded answer boxes, "
          f"{stats['tables']} data tables, {stats['headings']} headings")
    return stats


if __name__ == '__main__':
    try:
        build()
    except FileNotFoundError:
        sys.exit(f'{SRC} not found — run make-fillable.py first.')
