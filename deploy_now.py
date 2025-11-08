#!/usr/bin/env python3
import subprocess
import os
import sys

os.chdir("/Users/crayandre/Desktop/Development/zkScoreFireBase/standalone-web-app")

# Use shell=False and provide command as list
result = subprocess.run(
    ["vercel", "--prod", "--yes", "--name", "standalone-web-app"],
    cwd="/Users/crayandre/Desktop/Development/zkScoreFireBase/standalone-web-app"
)

sys.exit(result.returncode)


