# API para Crear Outfits y Closet

 Este es un proyecto de una API REST que estoy haciendo con Node.js y TypeScript. Sirve para gestionar prendas de vestir (como un armario virtual) y para crear combinaciones de outfits. 

Por ahora todo funciona guardando los datos en la memoria RAM 
## Cómo hacerlo funcionar
Primero clona el proyecto, entra a la carpeta y sigue estos pasos:

1. Instalar todos los paquetes que se necesitan:
```bash
npm install
```

2. Correr el servidor en modo desarrollo para probarlo:
```bash
npm run dev
```

## Rutas del proyecto (Endpoints)

### Las que ya funcionan (en memoria):
* `POST /api/v1/clothing` -> Para registrar una prenda nueva.
* `GET /api/v1/clothing` -> Trae toda la lista de ropa. Se le puede pasar `?category=superior` para filtrar por tipo de prenda.
* `GET /api/v1/clothing/:id` -> Muestra el detalle de una sola prenda usando su ID.
* `DELETE /api/v1/clothing/:id` -> Para borrar una prenda del armario.
* `POST /api/v1/outfits` -> Para guardar una nueva combinación de outfit.

### Las que solo dejé documentadas (falta programar la lógica):
* `PUT /api/v1/outfits/:id` -> Para editar un outfit que ya exista.
