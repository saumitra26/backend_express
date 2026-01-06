# -------- Base image --------
FROM node:20-alpine AS base

WORKDIR /app

# Copy dependency manifests first (better cache)
COPY package*.json ./

# Install only production deps in the image
RUN npm ci --omit=dev

# Copy the rest of the project
COPY . .

# Environment hints
ENV NODE_ENV=production

# Railway injects PORT, but exposing 9000 is fine
EXPOSE 9000

# Start app
CMD ["npm", "start"]