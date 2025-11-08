#!/bin/bash
set -e

cd /Users/crayandre/Desktop/Development/zkScoreFireBase/standalone-web-app

echo "🔧 Setting up Git config..."
# Remove any existing .git to start fresh
rm -rf .git

# Initialize new git repo with correct author
git init
git config user.email "crayandre@users.noreply.github.com"
git config user.name "crayandre"
git add .
git commit -m "Deploy to Vercel" --allow-empty

echo "🚀 Deploying to Vercel..."
vercel --prod --yes --name standalone-web-app

echo "✅ Deployment complete!"


