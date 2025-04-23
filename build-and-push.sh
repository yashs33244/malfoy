#!/bin/bash

# Exit on any error
set -e

# Build the Docker image with the latest tag
echo "Building Docker image..."
docker build -t yashs3324/malfoy:latest --platform linux/amd64 .

# Push the image to Docker Hub
echo "Pushing image to Docker Hub..."
docker push yashs3324/malfoy:latest

echo "Done! Image has been built and pushed to Docker Hub." 