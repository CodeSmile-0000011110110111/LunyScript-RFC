#!/usr/bin/env python3
"""
Convert Jekyll tabs syntax to HTML tabs for GitHub Pages compatibility.
NO INDENTATION for Kramdown to parse correctly.
"""

import re

def convert_tabs_to_html(content):
    """Convert {% tabs %} syntax to HTML tabs."""

    # Pattern to match entire tab groups
    pattern = r'{%\s*tabs\s+(\w+)\s*%}(.*?){%\s*endtabs\s*%}'

    def replace_tab_group(match):
        group_name = match.group(1)
        tab_content = match.group(2)

        # Extract individual tabs
        tab_pattern = r'{%\s*tab\s+\w+\s+(.*?)\s*%}(.*?){%\s*endtab\s*%}'
        tabs = list(re.finditer(tab_pattern, tab_content, re.DOTALL))

        if not tabs:
            return match.group(0)  # Return original if no tabs found

        # Build HTML with NO INDENTATION (Kramdown treats indented HTML as code)
        html = '\n<div class="code-tabs" data-group="' + group_name + '">\n'
        html += '<div class="tab-buttons">\n'

        # Add tab buttons
        for i, tab in enumerate(tabs):
            tab_label = tab.group(1)
            active_class = 'tab-button active' if i == 0 else 'tab-button'
            html += f'<button class="{active_class}">{tab_label}</button>\n'

        html += '</div>\n\n'

        # Add tab contents - markdown="1" tells Kramdown to process markdown inside
        for i, tab in enumerate(tabs):
            tab_body = tab.group(2).strip()
            active_class = ' active' if i == 0 else ''
            html += f'<div class="tab-content{active_class}" markdown="1">\n\n{tab_body}\n\n</div>\n\n'

        html += '</div>\n\n'

        return html

    # Replace all tab groups
    result = re.sub(pattern, replace_tab_group, content, flags=re.DOTALL)

    return result

def main():
    input_file = 'docs/CodeComparison.md'
    output_file = 'docs/CodeComparison.md'

    # Read input
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Convert
    converted = convert_tabs_to_html(content)

    # Write output
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(converted)

    print(f'Converted tabs in {input_file}')
    print(f'Output written to {output_file}')

if __name__ == '__main__':
    main()
