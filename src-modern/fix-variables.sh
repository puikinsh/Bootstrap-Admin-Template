#!/bin/bash

# Fix undefined SCSS variables in page files
cd "/Users/silkalns/Library/Mobile Documents/com~apple~CloudDocs/DevProject/Bootstrap-Admin-Template/src-modern"

for file in styles/scss/pages/*.scss; do
    echo "Fixing variables in $file"
    
    # Remove CSS custom property sections that use undefined variables
    sed -i.bak '/^\/\/ CSS variables for theming/,/^}$/d' "$file"
    sed -i '/^:root {$/,/^}$/d' "$file"
    sed -i '/^\[data-bs-theme="dark"\] {$/,/^}$/d' "$file"
    
    echo "✓ Fixed $file"
done

echo "All variable issues fixed!"