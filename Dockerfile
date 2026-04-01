# Use official Node.js LTS image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Build the React app
RUN npm run build

# Install lightweight server to serve the build
RUN npm install -g serve

# Expose port 3000
EXPOSE 3000

# Run the site
CMD ["serve", "-s", "build", "-l", "3000"]
