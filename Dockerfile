FROM node:22-alpine

WORKDIR /app

# Install all dependencies (including devDependencies) to allow TypeScript build
# npm ci is faster and reproducible; layer is cached when package*.json unchanged
COPY package*.json package-lock.json* ./
RUN npm ci

# Copy sources and build
COPY . .
RUN npm run build

# Run the compiled application
CMD ["node", "dist/index.js"]