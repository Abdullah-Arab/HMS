# Dockerfile for Angular Frontend with Node.js

# Stage 1: Build Angular App
FROM node:22 as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code
COPY . .

# Build the Angular app
RUN npm run build --prod

# Stage 2: Serve with Node.js
FROM node:22

# Set working directory
WORKDIR /app

# Copy built Angular app from the build stage
COPY --from=build /app/dist /app/dist

# Copy the Node.js server file
COPY server.ts /app/server.ts

# Install Express
RUN npm install express

# Expose the port
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]
