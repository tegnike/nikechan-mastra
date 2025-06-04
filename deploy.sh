#!/bin/bash

# Mastra Production Deploy Script
echo "🚀 Starting deployment..."

# Exit on any error
set -e

# 1. Git pull latest changes
echo "📦 Pulling latest changes from Git..."
if ! git pull origin main; then
    echo "❌ Git pull failed!"
    exit 1
fi

# 2. Install/Update dependencies
echo "📋 Installing/updating dependencies..."
if ! npm install; then
    echo "❌ npm install failed!"
    exit 1
fi

# 3. Check if PM2 process is running
if pm2 list | grep -q "mastra-production.*online"; then
    echo "🔄 Reloading PM2 process (zero downtime)..."
    if ! pm2 reload mastra-production; then
        echo "❌ PM2 reload failed!"
        exit 1
    fi
else
    echo "🆕 Starting PM2 process..."
    if ! pm2 start ./mastra-start.js --name mastra-production; then
        echo "❌ PM2 start failed!"
        exit 1
    fi
fi

# 4. Save PM2 configuration
echo "💾 Saving PM2 configuration..."
pm2 save

# 5. Show status
echo "✅ Deployment completed successfully!"
echo "📊 Current status:"
pm2 status
echo "📝 Recent logs:"
pm2 logs mastra-production --lines 5 