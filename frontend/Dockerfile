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

# Copy the built Angular app
COPY --from=build /app/dist /app/dist

# Install express
RUN npm install express

# Copy the server file
COPY server.js /app/server.js

# Expose the port
EXPOSE 3456

# Start the server
CMD ["node", "server.js"]
