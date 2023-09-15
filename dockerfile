FROM node:18-alpine as builder
WORKDIR /node/scraper-frontend

COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

# Exponer el puerto 3000
EXPOSE 3000

# Iniciar la aplicación
CMD ["node", "server.js"]
