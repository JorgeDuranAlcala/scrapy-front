# Build stage
FROM node:18-alpine as builder
WORKDIR /node/scraper-frontend

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

# Run stage
FROM node:18-alpine as runner
WORKDIR /node/scraper-frontend

COPY --from=builder /node/scraper-frontend/package.json .
COPY --from=builder /node/scraper-frontend/yarn.lock .
COPY --from=builder /node/scraper-frontend/next.config.js .
COPY --from=builder /node/scraper-frontend/public ./public
COPY --from=builder /node/scraper-frontend/.next/standalone ./
COPY --from=builder /node/scraper-frontend/.next/static ./.next/static

ENV NEXT_TELEMETRY_DISABLED 1

# Exponer el puerto 3000
EXPOSE 3000

# Iniciar la aplicación
CMD ["node", "server.js"]
