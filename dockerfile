# Seleccionar la imagen base
FROM node:18-alpine

# Establecer el directorio de trabajo
WORKDIR /node/scraper-frontend

# Copiar los archivos del proyecto al contenedor
COPY . .

COPY package*.json ./

# Instalar las dependencias
RUN npm i

# Compilar la aplicación
RUN npm run build

# Exponer el puerto 3000
EXPOSE 3000

# Iniciar la aplicación
CMD ["npm", "start"]