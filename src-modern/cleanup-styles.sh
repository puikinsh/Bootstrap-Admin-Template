#!/bin/bash

# Script to remove inline styles and add CSS classes to HTML files

# Files and their corresponding CSS classes
files=("products.html" "orders.html" "reports.html" "messages.html" "calendar.html" "files.html" "analytics.html" "settings.html" "security.html" "help.html")
classes=("product-management" "order-management" "reports-page" "messages-page" "calendar-page" "files-page" "analytics-page" "settings-page" "security-page" "help-page")

for i in "${!files[@]}"; do
    file="${files[$i]}"
    class="${classes[$i]}"
    echo "Processing $file with class $class..."
    
    if [[ ! -f "$file" ]]; then
        echo "  ⚠ File $file not found"
        continue
    fi
    
    # Find the style block start and end
    start_line=$(grep -n "<!-- Custom Styles" "$file" | cut -d: -f1)
    end_line=$(grep -n "</style>" "$file" | cut -d: -f1)
    
    if [[ -n "$start_line" && -n "$end_line" ]]; then
        echo "  Removing style block from line $start_line to $end_line"
        
        # Create backup
        cp "$file" "${file}.bak"
        
        # Remove the style block
        sed -i "${start_line},${end_line}d" "$file"
        
        # Add the CSS class to body tag
        page_name="${file%%.html}"
        sed -i "s/<body data-page=\"[^\"]*\"/<body data-page=\"$page_name\" class=\"$class\"/" "$file"
        
        echo "  ✓ Completed $file"
    else
        echo "  ⚠ Could not find style block in $file"
    fi
done

echo "All files processed!"