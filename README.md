# Malfoy

Malfoy is a Next.js application for advanced pricing intelligence and dynamic pricing strategies.

## Docker Setup

This project includes Docker configuration for both production and development environments.

### Prerequisites

- Docker installed on your machine
- Docker Compose installed on your machine

### Running in Production Mode

To run the application in production mode:

```bash
# Build and start the container
docker-compose up -d app

# View logs
docker-compose logs -f app
```

The application will be available at http://localhost:3000

### Running in Development Mode

For development with hot-reloading and other development features:

```bash
# Build and start the development container
docker-compose up -d dev

# View logs
docker-compose logs -f dev
```

The development server will be available at http://localhost:3001

### Stopping the Containers

```bash
# Stop all containers
docker-compose down

# Stop a specific container
docker-compose stop app
docker-compose stop dev
```

### Rebuilding the Containers

If you make changes to the Dockerfile or dependencies:

```bash
# Rebuild a specific service
docker-compose build app
docker-compose build dev

# Rebuild and restart
docker-compose up -d --build app
docker-compose up -d --build dev
```

## Local Development (Without Docker)

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```
