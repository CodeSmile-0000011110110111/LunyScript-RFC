#!/usr/bin/env python3
"""
Reorder content within each tab:
1. Lines of code
2. Concepts needed
3. Code block
"""

import re

def reorder_tab_content(content):
    """Reorder content within each tab-content div"""

    # Pattern to match tab-content divs with their content
    pattern = r'(<div class="tab-content[^"]*" markdown="1">)\s*(.*?)\s*(</div>)'

    def fix_tab(match):
        opening = match.group(1)
        body = match.group(2)
        closing = match.group(3)

        # Extract components
        # Lines of code pattern
        loc_match = re.search(r'\*\*Lines of code:\*\* (.+?)(?=\n|$)', body)
        # Concepts needed pattern
        concepts_match = re.search(r'\*\*Concepts needed:\*\* (.+?)(?=\n|$)', body, re.DOTALL)
        # Code block (everything from ``` to ```)
        code_match = re.search(r'(```[\s\S]+?```)', body)

        if not (loc_match and concepts_match and code_match):
            return match.group(0)  # Return original if can't parse

        # Rebuild in correct order
        new_body = f"\n**Lines of code:** {loc_match.group(1)}\n\n"
        new_body += f"**Concepts needed:** {concepts_match.group(1).strip()}\n\n"
        new_body += f"{code_match.group(1)}\n"

        return f"{opening}\n{new_body}\n{closing}"

    return re.sub(pattern, fix_tab, content, flags=re.DOTALL)

def main():
    input_file = 'docs/CodeComparison.md'

    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()

    result = reorder_tab_content(content)

    with open(input_file, 'w', encoding='utf-8') as f:
        f.write(result)

    print('Reordered tab content: LOC, concepts, code block')

if __name__ == '__main__':
    main()
