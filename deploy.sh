#!/bin/bash

# Production deployment script for Malfoy

echo "Starting deployment for Malfoy (https://malfoy.yashprojects.online)"

# 1. Set environment variables
echo "Setting up environment variables..."
export DATABASE_URL="postgresql://neondb_owner:npg_Qhnv9WSDl2fj@ep-muddy-voice-a494z8vq-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require"
export NEXTAUTH_URL="https://malfoy.yashprojects.online"
export NEXT_PUBLIC_API_URL="https://malfoy.yashprojects.online"

# 2. Install dependencies
echo "Installing dependencies..."
pnpm install

# 3. Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# 4. Build the application
echo "Building application..."
pnpm build

# 5. Start the application using PM2 (if not already running)
echo "Starting application with PM2..."
if pm2 list | grep -q "malfoy"; then
  echo "Restarting existing PM2 process..."
  pm2 restart malfoy
else
  echo "Creating new PM2 process..."
  pm2 start npm --name "malfoy" -- start
fi

echo "Deployment completed successfully!"
echo "The application is now running at https://malfoy.yashprojects.online" 