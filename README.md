# Proyecto Full Stack Node.js/React

## Descripción del Proyecto

Este proyecto es una aplicación Full Stack que incluye un backend desarrollado con Node.js y un frontend desarrollado con React. La aplicación permite la gestión de empleados y solicitudes, con autenticación y autorización basadas en roles utilizando JWT.


## Instalación y Ejecución

### Prerrequisitos

- Docker y Docker Compose instalados
- Node.js y npm instalados (para desarrollo local)

- ### Clonar el Repositorio

- ### Configuración de Variables de Entorno

PORT=5000
DATABASE_URL=postgres://user:password@db:5432/prueba1
JWT_SECRET=mysecretkey

- ### Se debe tener una base de datos llamada prueba1 en PostgreSQL

No es necesario ejecutar el script en la base de datos. Al correr la API por medio del ORM de Sequealize el crea las base de datos.

- ### Para ejecutar Docker se debe realizar con el siguiente comando 
docker-compose up --build


La aplicación estará disponible en:

Backend: http://localhost:5000
Frontend: http://localhost:3000
Base de Datos PostgreSQL: puerto 5432

-### Si se desea ejecutar de manera local se debe seguir los siguientes pasos.

-### Backend

cd backend
npm install
npm start

-### frontend

cd frontend
npm install
npm start

-### Ejecucion de PRUEBAS Backend
cd backend
npm test

-### Ejecucion de PRUEBAS Frontend
cd frontend
npm test



Buenas practicas

El codigo se desarrollo con el modelo vista controlador organizando todo por carpetas en en controladores, rutas, modelos y middlewares para facilitar la mantenibilidad y escalabilidad.

Uso de Async/Await: Para un manejo eficiente de operaciones asincrónicas.

Validación y Saneamiento: Se utilizo un ORM con sequealize para evitar inyecciones sql

Autenticación Segura: Implementación de JWT para la autenticación y manejo de sesiones
