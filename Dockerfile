# Use an official Node.js runtime as the base image
FROM node:14

# Install Python
RUN apt-get update && apt-get install -y python3 python3-venv

# Create and set the working directory
WORKDIR /usr/src/app

# Copy the package.json and install Node.js dependencies
COPY package*.json ./Server/package.json
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port (use 8080 for Cloud Run)
EXPOSE 8080

# Start the Node.js app
CMD [ "npm", "start" ]
