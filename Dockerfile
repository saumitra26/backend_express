FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./

# Development
FROM base AS development
RUN npm ci
COPY . .
EXPOSE 9000
USER node
CMD ["npm", "run", "dev"]

# Production
FROM base AS production
RUN npm ci --omit=dev
COPY . .
EXPOSE 9000
USER node
CMD ["npm", "start"]
