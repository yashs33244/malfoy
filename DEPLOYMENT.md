# Malfoy Deployment Guide

This guide provides instructions for deploying the Malfoy application to production at https://malfoy.yashprojects.online.

## Deployment Options

You can deploy Malfoy using either Docker or a traditional Node.js setup. Both methods are documented below.

## Option 1: Docker Deployment (Recommended)

### Prerequisites

- Docker and Docker Compose installed on your server
- Domain configured to point to your server
- Docker Hub account (if you plan to push your images)

### Deployment Steps

1. **Prepare the Environment**

   Create the required directories for Nginx and certificates:

   ```bash
   mkdir -p nginx/conf.d nginx/ssl nginx/data/certbot/conf nginx/data/certbot/www
   ```

2. **Build and Push the Docker Image**

   You can use our pre-built image or build your own:

   ```bash
   # Option A: Build your own image
   ./docker-build.sh

   # Option B: Use pre-built image (no action needed)
   ```

3. **Start the Docker Containers**

   ```bash
   docker-compose up -d
   ```

4. **Set Up SSL Certificates**

   If you don't have SSL certificates yet, you can use Certbot with Docker:

   ```bash
   docker run -it --rm \
     -v "$(pwd)/nginx/data/certbot/conf:/etc/letsencrypt" \
     -v "$(pwd)/nginx/data/certbot/www:/var/www/certbot" \
     certbot/certbot certonly --webroot \
     --webroot-path=/var/www/certbot \
     --email yashs3324@gmail.com \
     --agree-tos \
     --no-eff-email \
     -d malfoy.yashprojects.online
   ```

5. **Reload Nginx to Apply SSL**

   ```bash
   docker exec malfoy-nginx nginx -s reload
   ```

6. **Verify Deployment**

   Visit https://malfoy.yashprojects.online to verify the deployment.

## Option 2: Traditional Node.js Deployment

### Prerequisites

- Node.js v18+ and npm/pnpm installed
- PM2 process manager (`npm install -g pm2`)
- Nginx web server
- SSL certificate for domain (Let's Encrypt recommended)
- PostgreSQL database (using Neon.tech)

### Deployment Steps

1. **Server Setup**

   Ensure your server has the following:

   - Node.js and npm/pnpm installed
   - Nginx installed and running
   - PM2 installed globally: `npm install -g pm2`

2. **Clone the Repository**

   ```bash
   git clone [your-repo-url] malfoy
   cd malfoy
   ```

3. **Environment Variables**

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

4. **Configure Nginx**

   Copy the provided Nginx configuration to your server's Nginx configuration directory.

5. **Set Up SSL with Let's Encrypt**

   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d malfoy.yashprojects.online
   ```

6. **Run the Deployment Script**

   ```bash
   ./deploy.sh
   ```

   This script will:
   - Install dependencies
   - Generate Prisma client
   - Build the application
   - Start or restart the application with PM2

7. **Verify Deployment**

   Visit https://malfoy.yashprojects.online to verify the deployment.

## Troubleshooting

If you encounter any issues:

1. **Docker Deployment Issues:**
   - Check container logs: `docker-compose logs -f`
   - Verify the Nginx configuration
   - Check if ports 80 and 443 are open on your server

2. **Traditional Deployment Issues:**
   - Check application logs: `pm2 logs malfoy`
   - Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`
   - Verify environment variables are set correctly

3. **Database Issues:**
   - Ensure the database connection string is correct
   - Verify that the Prisma client was generated properly

## Maintenance

- Restart the application: 
  - Docker: `docker-compose restart`
  - PM2: `pm2 restart malfoy`
- Update the application: 
  - Docker: `./docker-build.sh && docker-compose up -d`
  - Traditional: Pull latest code and run `./deploy.sh` 