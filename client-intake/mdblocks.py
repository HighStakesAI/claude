#!/usr/bin/env python3
"""Block parser for the subset of Markdown the intake form uses.

Shared by build-docx.py and build-html.py so the two renderers cannot drift.
Yields tuples:

    ('h1',      text)
    ('h2',      text)
    ('rule',)
    ('quote',   text)                  guidance note
    ('bullets', [item, ...])
    ('box',     tall: bool)            empty answer box
    ('table',   [[cell, ...], ...])    first row is the header
    ('para',    text)

Inline `**bold**` and `*italic*` are left in the text for the renderer.
"""
import re

BULLET = re.compile(r'- (?!--)')


def _split_row(line):
    return [c.strip() for c in line.strip().strip('|').split('|')]


def _is_divider(line):
    return bool(re.fullmatch(r'\|[\s:|-]+\|', line.strip())) and '-' in line


def parse(text):
    lines = text.split('\n')
    i = 0
    while i < len(lines):
        line = lines[i]
        stripped = line.strip()

        if not stripped:
            i += 1
            continue

        if stripped.startswith('# '):
            yield ('h1', stripped[2:])
            i += 1
            continue

        if stripped.startswith('## '):
            yield ('h2', stripped[3:])
            i += 1
            continue

        if re.fullmatch(r'-{3,}', stripped):
            # A rule immediately before a section heading is redundant: the
            # heading draws its own.
            nxt = next((l.strip() for l in lines[i + 1:] if l.strip()), '')
            if not nxt.startswith('## '):
                yield ('rule',)
            i += 1
            continue

        if stripped.startswith('>'):
            buf = []
            while i < len(lines) and lines[i].strip().startswith('>'):
                buf.append(lines[i].strip().lstrip('>').strip())
                i += 1
            yield ('quote', ' '.join(buf))
            continue

        if BULLET.match(stripped):
            items = []
            while i < len(lines) and BULLET.match(lines[i].strip()):
                buf = [lines[i].strip()[2:]]
                i += 1
                while (i < len(lines) and lines[i].startswith('  ')
                       and lines[i].strip()
                       and not lines[i].strip().startswith(('-', '|', '>'))):
                    buf.append(lines[i].strip())
                    i += 1
                items.append(' '.join(buf))
            yield ('bullets', items)
            continue

        if stripped.startswith('|'):
            block = []
            while i < len(lines) and lines[i].strip().startswith('|'):
                block.append(lines[i].strip())
                i += 1
            rows = [_split_row(r) for r in block if not _is_divider(r)]
            if not rows:
                continue
            if len(rows[0]) == 1 and all(not c for row in rows for c in row):
                yield ('box', len(rows) > 2)
            else:
                yield ('table', rows)
            continue

        buf = []
        while (i < len(lines) and lines[i].strip()
               and not lines[i].strip().startswith(('#', '>', '|'))
               and not BULLET.match(lines[i].strip())
               and not re.fullmatch(r'-{3,}', lines[i].strip())):
            buf.append(lines[i].strip())
            i += 1
        yield ('para', ' '.join(buf))
