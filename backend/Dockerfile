# Usa una imagen oficial de Node.js como imagen base
FROM node:14

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia el package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el resto del código de la aplicación al directorio de trabajo
COPY . .

# Expone el puerto en el que la aplicación escucha
EXPOSE 5000

# Define el comando para ejecutar la aplicación
CMD ["node", "index.js"]