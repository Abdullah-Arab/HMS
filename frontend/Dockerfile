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

# Install required Node.js modules
RUN npm install express ts-node typescript

# Expose the port
EXPOSE 3456

# Start the server
CMD ["npx", "ts-node", "server.ts"]
