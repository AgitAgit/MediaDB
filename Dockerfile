# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory to /usr/src/app inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json from the client folder to the container
COPY ./client/package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the React application files from the client folder to the container
COPY ./client/. .

# Build the React app for production
RUN npm run build

# Install a simple HTTP server to serve the static files
RUN npm install -g serve

# Expose the port defined by the PORT environment variable
EXPOSE 8080

# Start the server to serve the static files
CMD ["serve", "-s", "build", "-l", "8080"]
