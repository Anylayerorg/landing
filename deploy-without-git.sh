#!/bin/bash

# Deploy standalone-web-app to Vercel without Git
# This script copies files to a temp directory and deploys from there

SOURCE_DIR="/Users/crayandre/Desktop/Development/zkScoreFireBase/standalone-web-app"
TEMP_DIR="/tmp/zkscore-standalone-deploy-$$"

echo "📦 Copying files to temporary directory (without Git)..."
rm -rf "$TEMP_DIR"
mkdir -p "$TEMP_DIR"

# Copy all files except .git
cd "$SOURCE_DIR"
find . -not -path '*/\.*' -not -name '.git' -not -name '.gitignore' | while read file; do
    if [ -f "$file" ]; then
        mkdir -p "$TEMP_DIR/$(dirname "$file")"
        cp "$file" "$TEMP_DIR/$file"
    elif [ -d "$file" ] && [ "$file" != "." ]; then
        mkdir -p "$TEMP_DIR/$file"
    fi
done

# Copy hidden files except .git
cp .gitignore "$TEMP_DIR/" 2>/dev/null || true
cp .vercelignore "$TEMP_DIR/" 2>/dev/null || true

echo "🚀 Deploying from temporary directory..."
cd "$TEMP_DIR"

# Deploy to Vercel
vercel --prod --yes --name standalone-web-app

# Cleanup
echo "🧹 Cleaning up..."
rm -rf "$TEMP_DIR"

echo "✅ Deployment complete!"


