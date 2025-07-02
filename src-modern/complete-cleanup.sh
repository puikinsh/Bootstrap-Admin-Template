#!/bin/bash

# Complete cleanup script to remove all inline styles from HTML files

cd "/Users/silkalns/Library/Mobile Documents/com~apple~CloudDocs/DevProject/Bootstrap-Admin-Template/src-modern"

echo "Starting complete cleanup of inline styles..."

for file in calendar.html files.html help.html messages.html orders.html products.html reports.html security.html settings.html; do
    echo "Processing $file..."
    
    # Create backup
    cp "$file" "${file}.backup"
    
    # Find the line number where <style> starts
    style_start=$(grep -n "<!-- Custom Styles" "$file" | cut -d: -f1)
    
    if [[ -n "$style_start" ]]; then
        # Find the line number where </style> ends
        style_end=$(grep -n "</style>" "$file" | cut -d: -f1)
        
        if [[ -n "$style_end" ]]; then
            echo "  Removing lines $style_start to $style_end"
            
            # Remove the entire style block
            sed -i "${style_start},${style_end}d" "$file"
            
            echo "  ✓ Cleaned $file"
        else
            echo "  ⚠ Could not find </style> in $file"
        fi
    else
        echo "  ⚠ No style block found in $file"
    fi
done

echo "Complete cleanup finished!"