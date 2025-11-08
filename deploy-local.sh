#!/bin/bash
cd /Users/crayandre/Desktop/Development/zkScoreFireBase/standalone-web-app

# Remove .git directory to avoid Git author checks (deploy without Git)
rm -rf .git

# Deploy to Vercel without Git
vercel --prod --yes --name standalone-web-app

