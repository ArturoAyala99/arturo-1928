# Snail Racing App

## Instrucciones para ejecutar la aplicación

### Requisitos previos
- Node.js 20 o superior.
- npm 9 o superior.

### Instalación y ejecución
1. Clonar el repositorio:
```bash
git clone https://github.com/<usuario>/<repo>.git
cd <repo>
```
2. En una terminal nos ubicamos en la carpeta Backend, instalamos dependencias y ejecutamos la aplicación:
```bash
cd backend
npm install
npm run dev
```
3. En otra terminal diferente nos ubicamos en la carpeta Frontend e instalamos dependencias:
```bash
cd frontend
npm install
```
4. El frontend requiere un archivo .env en la carpeta frontend/ con la URL del backend. Contenido del .env: 
    - VITE_API_URL=http://localhost:3000
5. Ejecutamos la aplicación del frontend:
```bash
npm run dev
```
6. El backend no requiere variables de entorno para funcionar en desarrollo (usa el puerto 3000 por defecto).
7. Una vez que tenemos las 2 terminales en ejecución, nos vamos a http://localhost:5173/ y ahí podremos ver la aplicación.

Nota: Ambos proyectos (backend y frontend) deben estar ejecutándose al mismo tiempo

## Instrucciones para ejecutar las pruebas

1. En una terminal nos ubicamos en la carpeta Backend y ejecutamos pruebas:
```bash
cd backend
npm test
```
2. En otra terminal nos ubicamos en la carpeta Frontend y ejecutamos pruebas:
```bash
cd frontend
npm test
```