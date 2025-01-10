# Dockerfile for Angular Frontend with PM2

# Stage 1: Build Angular App
FROM node:22 as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code
COPY . .

# Build the Angular app
RUN npm run build --prod

# Stage 2: Serve with PM2
FROM node:16

# Install PM2 globally
RUN npm install -g pm2

# Set the working directory
WORKDIR /app

# Copy built Angular app from the build stage
COPY --from=build /app/dist/[Frontend] /app/dist

# Expose the port
EXPOSE 3000

# Start PM2 to serve the app
CMD ["pm2", "serve", "/app/dist", "3000", "--spa"]
