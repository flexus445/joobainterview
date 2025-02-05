# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /frontend

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the frontend code
COPY . .

ENV NODE_ENV=development

# Expose port for React development server (default is 3000)
EXPOSE 3000

# Run frontend in development mode
CMD ["npm", "start"]
