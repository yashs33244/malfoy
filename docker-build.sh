#!/bin/bash

# Docker build and push script for Malfoy

echo "Building and pushing Docker image for Malfoy (https://malfoy.yashprojects.online)"

# Build the Docker image
echo "Building Docker image: yashs3324/malfoy:latest"
docker build -t yashs3324/malfoy:latest .

# Push the image to Docker Hub
echo "Pushing image to Docker Hub"
docker push yashs3324/malfoy:latest

echo "Image build and push completed successfully!" 