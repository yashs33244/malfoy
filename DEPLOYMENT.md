# Malfoy Deployment Guide

This guide provides instructions for deploying the Malfoy application to production at https://malfoy.yashprojects.online.

## Prerequisites

- Node.js v18+ and npm/pnpm installed
- PM2 process manager (`npm install -g pm2`)
- Nginx web server
- SSL certificate for domain (Let's Encrypt recommended)
- PostgreSQL database (using Neon.tech)

## Deployment Steps

### 1. Server Setup

Ensure your server has the following:

- Node.js and npm/pnpm installed
- Nginx installed and running
- PM2 installed globally: `npm install -g pm2`

### 2. Clone the Repository

```bash
git clone [your-repo-url] malfoy
cd malfoy
```

### 3. Environment Variables

Create production environment variables:

```bash
cp .env.production .env
```

Make sure the following environment variables are set correctly:
- `DATABASE_URL`: Your Neon PostgreSQL connection string
- `NEXTAUTH_URL`: https://malfoy.yashprojects.online
- `NEXT_PUBLIC_API_URL`: https://malfoy.yashprojects.online
- `JWT_SECRET`: A secure random string
- Email configuration settings

### 4. Configure Nginx

Copy the provided Nginx configuration:

```bash
sudo cp nginx.conf /etc/nginx/sites-available/malfoy
sudo ln -s /etc/nginx/sites-available/malfoy /etc/nginx/sites-enabled/
```

Update paths in nginx.conf to match your actual deployment directory.

### 5. Set Up SSL with Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d malfoy.yashprojects.online
```

### 6. Run the Deployment Script

```bash
./deploy.sh
```

This script will:
- Install dependencies
- Generate Prisma client
- Build the application
- Start or restart the application with PM2

### 7. Verify Deployment

Visit https://malfoy.yashprojects.online to verify the deployment.

## Automatic Deployment (Optional)

You can set up GitHub Actions for automatic deployment. An example workflow:

```yaml
name: Deploy to Production

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: SSH and deploy
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd /path/to/malfoy
            git pull
            ./deploy.sh
```

## Troubleshooting

If you encounter any issues:

1. Check application logs: `pm2 logs malfoy`
2. Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`
3. Verify environment variables are set correctly
4. Ensure database connection is working

## Maintenance

- Monitor the application: `pm2 monit`
- Restart application: `pm2 restart malfoy`
- Update application: Pull latest code and run `./deploy.sh` 