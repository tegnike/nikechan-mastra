#!/bin/bash

# Mastra Production Deploy Script
echo "🚀 Starting deployment..."

# 1. Git pull latest changes
echo "📦 Pulling latest changes from Git..."
git pull origin main

# 2. Install/Update dependencies if package.json changed
if git diff --name-only HEAD~1 HEAD | grep -q "package.json\|package-lock.json"; then
    echo "📋 Package files changed, updating dependencies..."
    npm ci --production
fi

# 3. Check if PM2 process is running
if pm2 list | grep -q "mastra-production.*online"; then
    echo "🔄 Reloading PM2 process (zero downtime)..."
    pm2 reload mastra-production
else
    echo "🆕 Starting PM2 process..."
    pm2 start ./mastra-start.js --name mastra-production
fi

# 4. Save PM2 configuration
pm2 save

# 5. Show status
echo "✅ Deployment completed!"
pm2 status
pm2 logs mastra-production --lines 5 