# Set the base image to Node 18
FROM node:16-alpine

# Set the working directory to /app
WORKDIR /app/music-app-nest-back

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Start the application
CMD ["npm", "start"]
