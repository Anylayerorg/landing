#!/usr/bin/env python3
import subprocess
import os
import sys

standalone_dir = "/Users/crayandre/Desktop/Development/zkScoreFireBase/standalone-web-app"

print(f"Changing to directory: {standalone_dir}")
os.chdir(standalone_dir)

# Check if Vercel CLI is installed
print("Checking if Vercel CLI is installed...")
try:
    result = subprocess.run(["vercel", "--version"], capture_output=True, text=True)
    print(f"Vercel CLI version: {result.stdout.strip()}")
except FileNotFoundError:
    print("Vercel CLI not found. Installing globally...")
    subprocess.run(["npm", "install", "-g", "vercel"], check=True)

# Deploy to Vercel
print("\n🚀 Deploying to Vercel (production)...")
print("Project name: standalone-web-app")
print("\nNote: You may need to authenticate with Vercel if not already logged in.")
print("Run 'vercel login' if prompted.\n")

try:
    # Deploy to production
    subprocess.run([
        "vercel", 
        "--prod", 
        "--yes",
        "--name", 
        "standalone-web-app"
    ], check=True)
    print("\n✅ Successfully deployed to Vercel!")
except subprocess.CalledProcessError as e:
    print(f"\n❌ Deployment failed: {e}")
    print("\nTrying alternative deployment method...")
    # Try without --name flag (let Vercel prompt)
    subprocess.run(["vercel", "--prod"], check=True)


