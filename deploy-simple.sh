#!/bin/bash

cd /Users/crayandre/Desktop/Development/zkScoreFireBase/standalone-web-app

# Set Git config to your email to avoid team@zkscore.com error
git config user.email "crayandre@users.noreply.github.com"
git config user.name "crayandre"

# Deploy
vercel --prod --yes --name standalone-web-app


