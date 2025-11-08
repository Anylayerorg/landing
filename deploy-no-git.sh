#!/bin/bash
cd /Users/crayandre/Desktop/Development/zkScoreFireBase/standalone-web-app

# Remove any existing .git directory to avoid Git author checks
rm -rf .git

# Deploy without Git
vercel --prod --yes --name standalone-web-app --no-git 2>&1 || vercel --prod --yes --name standalone-web-app 2>&1


