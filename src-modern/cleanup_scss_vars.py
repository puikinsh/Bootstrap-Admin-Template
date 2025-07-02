#!/usr/bin/env python3

import os
import re

def clean_scss_file(filepath):
    """Remove CSS custom property sections with undefined variables from SCSS files"""
    print(f"Processing {filepath}...")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove CSS variables sections that contain undefined variables
    # Pattern to match from "// CSS variables" or ":root {" to the end of the file
    patterns_to_remove = [
        r'// CSS variables for theming.*',
        r':root \{[^}]*\}',
        r'\[data-bs-theme="dark"\] \{[^}]*\}',
        r'--[a-zA-Z-]*-bg: #\{\$[a-zA-Z-]*\};',
        r'--[a-zA-Z-]*-text: #\{\$[a-zA-Z-]*\};',
        r'--[a-zA-Z-]*-border: #\{\$[a-zA-Z-]*\};'
    ]
    
    cleaned_content = content
    
    # Remove problematic variable references
    lines = cleaned_content.split('\n')
    filtered_lines = []
    
    skip_until_brace = False
    brace_count = 0
    
    for line in lines:
        # Skip lines with undefined variables
        if any(var in line for var in ['$dark-bg', '$dark-color', '$body-bg', '$border-color', '$card-bg', '$text-muted']):
            # If this line starts a block, skip until the closing brace
            if '{' in line:
                skip_until_brace = True
                brace_count = line.count('{') - line.count('}')
            continue
            
        if skip_until_brace:
            brace_count += line.count('{') - line.count('}')
            if brace_count <= 0:
                skip_until_brace = False
            continue
            
        # Skip CSS custom property sections
        if line.strip().startswith('// CSS variables') or line.strip().startswith(':root {') or line.strip().startswith('[data-bs-theme="dark"] {'):
            skip_until_brace = True
            if '{' in line:
                brace_count = line.count('{') - line.count('}')
            continue
            
        filtered_lines.append(line)
    
    cleaned_content = '\n'.join(filtered_lines)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(cleaned_content)
    
    print(f"  ✓ Cleaned {filepath}")

def main():
    """Clean all SCSS page files"""
    scss_files = [
        'styles/scss/pages/_users.scss',
        'styles/scss/pages/_products.scss', 
        'styles/scss/pages/_orders.scss',
        'styles/scss/pages/_messages.scss',
        'styles/scss/pages/_calendar.scss',
        'styles/scss/pages/_files.scss',
        'styles/scss/pages/_analytics.scss',
        'styles/scss/pages/_settings.scss',
        'styles/scss/pages/_security.scss',
        'styles/scss/pages/_help.scss'
    ]
    
    print("Cleaning SCSS files with undefined variables...")
    
    for filepath in scss_files:
        if os.path.exists(filepath):
            clean_scss_file(filepath)
        else:
            print(f"  ⚠ File {filepath} not found")
    
    print("SCSS cleanup completed!")

if __name__ == "__main__":
    main()