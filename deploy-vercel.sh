#!/bin/bash

# Deploy standalone-web-app to Vercel
# Project name: standalone-web-app

cd "$(dirname "$0")"

echo "🚀 Deploying standalone-web-app to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI is not installed. Installing now..."
    npm install -g vercel
fi

# Deploy to production
echo "📦 Deploying to Vercel..."
vercel --prod --yes --name standalone-web-app

echo "✅ Deployment complete!"


