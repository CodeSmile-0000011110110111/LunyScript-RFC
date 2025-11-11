#!/usr/bin/env python3
"""
Final fixes for CodeComparison.md:
1. Reorder tabs: LunyScript, GDScript, Godot C#, Unity C#
2. Fix formatting: Lines of code first, concepts second
"""

import re

def process_file(content):
    """Process entire file"""

    # Find all tab groups
    lines = content.split('\n')
    result = []
    i = 0

    while i < len(lines):
        line = lines[i]

        # Check if this is the start of a tab group
        if line.startswith('<div class="code-tabs"'):
            # Process this tab group
            tab_group, end_index = extract_tab_group(lines, i)
            result.append(process_tab_group(tab_group))
            i = end_index + 1
        else:
            result.append(line)
            i += 1

    return '\n'.join(result)

def extract_tab_group(lines, start):
    """Extract entire tab group from lines"""
    end = start
    depth = 0
    group_lines = []

    for j in range(start, len(lines)):
        line = lines[j]
        group_lines.append(line)

        if '<div' in line:
            depth += 1
        if '</div>' in line:
            depth -= 1

        if depth == 0 and j > start:
            end = j
            break

    return group_lines, end

def process_tab_group(group_lines):
    """Process a single tab group"""

    # Find button section and tab content sections
    buttons_start = None
    buttons_end = None
    tabs = []
    current_tab_start = None
    current_tab_lines = []
    depth = 0

    for i, line in enumerate(group_lines):
        if '<div class="tab-buttons">' in line:
            buttons_start = i
        elif buttons_start is not None and buttons_end is None and '</div>' in line:
            buttons_end = i
        elif '<div class="tab-content' in line:
            if current_tab_start is not None:
                tabs.append(current_tab_lines[:])
            current_tab_start = i
            current_tab_lines = [line]
            depth = 1
        elif current_tab_start is not None:
            current_tab_lines.append(line)
            if '<div' in line:
                depth += 1
            if '</div>' in line:
                depth -= 1
                if depth == 0:
                    tabs.append(current_tab_lines)
                    current_tab_start = None
                    current_tab_lines = []

    if len(tabs) != 4:
        return '\n'.join(group_lines)

    # Reorder: LunyScript(0), GDScript(3), Godot C#(2), Unity C#(1)
    reordered_tabs = [tabs[0], tabs[3], tabs[2], tabs[1]]

    # Fix formatting in each tab
    fixed_tabs = [fix_tab_content(tab) for tab in reordered_tabs]

    # Rebuild
    result = [group_lines[0]]  # Opening div
    result.append('<div class="tab-buttons">')
    result.append('<button class="tab-button active">LunyScript</button>')
    result.append('<button class="tab-button">GDScript</button>')
    result.append('<button class="tab-button">Godot C#</button>')
    result.append('<button class="tab-button">Unity C#</button>')
    result.append('</div>')

    for tab in fixed_tabs:
        result.extend(tab)

    result.append('</div>')
    result.append('')

    return '\n'.join(result)

def fix_tab_content(tab_lines):
    """Fix formatting within a tab: LOC first, then concepts"""

    content = '\n'.join(tab_lines)

    # Pattern: **Concepts needed:** ... **Lines of code:** ...
    # Replace with: **Lines of code:** ...\n\n**Concepts needed:** ...
    pattern = r'\*\*Concepts needed:\*\* ([^\*]+)\*\*Lines of code:\*\* (\d+\+?)'
    replacement = r'**Lines of code:** \2\n\n**Concepts needed:** \1'

    content = re.sub(pattern, replacement, content)

    return content.split('\n')

def main():
    input_file = 'docs/CodeComparison.md'

    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()

    result = process_file(content)

    with open(input_file, 'w', encoding='utf-8') as f:
        f.write(result)

    print('Fixed tab order and formatting')

if __name__ == '__main__':
    main()
