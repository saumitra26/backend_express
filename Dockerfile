# Development
FROM base AS development
RUN npm ci
COPY . .
RUN chown -R node:node /app
USER node
EXPOSE 9000
CMD ["npm", "run", "dev"]

# Production
FROM base AS production
RUN npm ci --omit=dev
COPY . .
RUN chown -R node:node /app
USER node
EXPOSE 9000
CMD ["npm", "start"]