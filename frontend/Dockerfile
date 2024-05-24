# Usa una imagen oficial de Node.js para construir la aplicación
FROM node:14 as build

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia el package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el resto del código de la aplicación al directorio de trabajo
COPY . .

# Construye la aplicación para producción
RUN npm run build

# Usa una imagen oficial de Nginx para servir la aplicación
FROM nginx:alpine

# Copia los archivos de construcción al directorio predeterminado de Nginx
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Expone el puerto en el que la aplicación escucha
EXPOSE 80

# Define el comando para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]