#!/usr/bin/env python3
"""
Reorder tabs and fix formatting in CodeComparison.md
"""

import re

def reorder_tabs_and_fix_formatting(content):
    """
    1. Reorder tabs: LunyScript, GDScript, Godot C#, Unity C#
    2. Fix formatting: Lines of code first (with line break), then Concepts needed
    """

    # Pattern to match entire tab groups
    pattern = r'<div class="code-tabs" data-group="(\w+)">\s*<div class="tab-buttons">\s*<button class="tab-button active">LunyScript</button>\s*<button class="tab-button">Unity C#</button>\s*<button class="tab-button">Godot C#</button>\s*<button class="tab-button">GDScript</button>\s*</div>(.*?)</div>\s*\n'

    def replace_tab_group(match):
        group_name = match.group(1)
        all_content = match.group(2)

        # Extract all four tab contents
        tab_pattern = r'<div class="tab-content(.*?)" markdown="1">\s*(.*?)\s*</div>'
        tabs = list(re.finditer(tab_pattern, all_content, re.DOTALL))

        if len(tabs) != 4:
            return match.group(0)  # Return original if not 4 tabs

        # Current order: LunyScript, Unity C#, Godot C#, GDScript (indices 0, 1, 2, 3)
        # New order: LunyScript, GDScript, Godot C#, Unity C# (indices 0, 3, 2, 1)
        reordered = [tabs[0], tabs[3], tabs[2], tabs[1]]

        # Fix formatting in each tab content
        def fix_formatting(tab_content):
            # Pattern: **Concepts needed:** ... **Lines of code:** ...
            # Replace with: **Lines of code:** ...\n**Concepts needed:** ...
            pattern = r'\*\*Concepts needed:\*\* (.*?)\s*\*\*Lines of code:\*\* (\d+\+?)'
            replacement = r'**Lines of code:** \2\n\n**Concepts needed:** \1'
            return re.sub(pattern, replacement, tab_content, flags=re.DOTALL)

        # Build new HTML
        html = f'<div class="code-tabs" data-group="{group_name}">\n'
        html += '<div class="tab-buttons">\n'
        html += '<button class="tab-button active">LunyScript</button>\n'
        html += '<button class="tab-button">GDScript</button>\n'
        html += '<button class="tab-button">Godot C#</button>\n'
        html += '<button class="tab-button">Unity C#</button>\n'
        html += '</div>\n'

        for i, tab in enumerate(reordered):
            active_class = tab.group(1)  # Will be ' active' for first tab or ''
            tab_body = fix_formatting(tab.group(2))
            html += f'<div class="tab-content{active_class}" markdown="1">\n\n{tab_body}\n\n</div>\n'

        html += '</div>\n\n'

        return html

    result = re.sub(pattern, replace_tab_group, content, flags=re.DOTALL)

    return result

def main():
    input_file = 'docs/CodeComparison.md'

    # Read input
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Process
    converted = reorder_tabs_and_fix_formatting(content)

    # Write output
    with open(input_file, 'w', encoding='utf-8') as f:
        f.write(converted)

    print(f'Reordered tabs and fixed formatting in {input_file}')

if __name__ == '__main__':
    main()
