#!/usr/bin/env python3

import os
import re

def clean_html_file(filepath):
    """Remove inline style blocks from HTML file"""
    print(f"Processing {filepath}...")
    
    # Read the file
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Pattern to match style blocks (including the comment before it)
    # This pattern looks for: comment line + <style> + content + </style>
    pattern = r'(\s*)<!-- Custom Styles[^>]*-->\s*<style>.*?</style>\s*'
    
    # Remove the style block
    cleaned_content = re.sub(pattern, '', content, flags=re.DOTALL)
    
    # Write back to file
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(cleaned_content)
    
    print(f"  ✓ Cleaned {filepath}")

def main():
    """Clean all HTML files with inline styles"""
    files_to_clean = [
        'calendar.html',
        'files.html', 
        'help.html',
        'messages.html',
        'orders.html',
        'products.html',
        'reports.html',
        'security.html',
        'settings.html'
    ]
    
    print("Starting comprehensive cleanup of inline styles...")
    
    for filename in files_to_clean:
        if os.path.exists(filename):
            clean_html_file(filename)
        else:
            print(f"  ⚠ File {filename} not found")
    
    print("Cleanup completed!")

if __name__ == "__main__":
    main()