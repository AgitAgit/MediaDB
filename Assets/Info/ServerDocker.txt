FROM node:18-alpine

# Set the working directory inside the 'server' folder
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (if present) into the container's working directory
COPY ./Server/package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application files from the 'server' folder into the container
COPY ./Server/. .

# Expose the port (use 8080 for Cloud Run)
EXPOSE 8080

# Start the Node.js app (assuming your start script is defined in package.json)
CMD [ "npm", "start" ]