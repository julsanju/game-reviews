# 🧪 Probar los Endpoints de las 3 Colecciones

## 🚀 Antes de Empezar

1. Asegúrate de que MongoDB esté corriendo
2. Ejecuta el seed: `npm run seed`
3. Inicia la aplicación: `npm run dev`
4. La aplicación estará en: `http://localhost:3000`

---

## 👥 Probar Endpoints de USUARIOS

### 1. Listar todos los usuarios
```bash
curl http://localhost:3000/api/users
```

**Respuesta esperada:**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "...",
      "nombre": "Carlos Gamer",
      "email": "carlos.gamer@example.com",
      "avatar": "...",
      "biografia": "...",
      "totalReseñas": 0,
      "puntuacionPromedio": 0,
      ...
    }
  ]
}
```

### 2. Crear un nuevo usuario
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Test Usuario",
    "email": "test@example.com",
    "biografia": "Usuario de prueba"
  }'
```

### 3. Obtener un usuario específico
```bash
# Primero obtén un ID de la lista de usuarios
# Luego reemplaza [ID_DEL_USUARIO] con el ID real
curl http://localhost:3000/api/users/[ID_DEL_USUARIO]
```

### 4. Actualizar un usuario
```bash
curl -X PUT http://localhost:3000/api/users/[ID_DEL_USUARIO] \
  -H "Content-Type: application/json" \
  -d '{
    "biografia": "Biografía actualizada"
  }'
```

### 5. Eliminar un usuario
```bash
curl -X DELETE http://localhost:3000/api/users/[ID_DEL_USUARIO]
```

---

## 📁 Probar Endpoints de CATEGORÍAS

### 1. Listar todas las categorías
```bash
curl http://localhost:3000/api/categories
```

**Respuesta esperada:**
```json
{
  "success": true,
  "count": 8,
  "data": [
    {
      "_id": "...",
      "nombre": "Acción",
      "descripcion": "...",
      "icono": "⚔️",
      "color": "#ef4444",
      "totalJuegos": 0,
      "activa": true,
      "orden": 1,
      ...
    }
  ]
}
```

### 2. Listar solo categorías activas
```bash
curl http://localhost:3000/api/categories?activa=true
```

### 3. Ordenar por nombre
```bash
curl "http://localhost:3000/api/categories?sortBy=nombre&order=asc"
```

### 4. Crear una nueva categoría
```bash
curl -X POST http://localhost:3000/api/categories \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Puzzle",
    "descripcion": "Juegos de rompecabezas y lógica",
    "icono": "🧩",
    "color": "#22c55e",
    "orden": 9
  }'
```

### 5. Obtener una categoría específica
```bash
curl http://localhost:3000/api/categories/[ID_DE_LA_CATEGORIA]
```

### 6. Actualizar una categoría
```bash
curl -X PUT http://localhost:3000/api/categories/[ID_DE_LA_CATEGORIA] \
  -H "Content-Type: application/json" \
  -d '{
    "descripcion": "Nueva descripción actualizada"
  }'
```

### 7. Eliminar una categoría
```bash
curl -X DELETE http://localhost:3000/api/categories/[ID_DE_LA_CATEGORIA]
```

---

## 📝 Probar Endpoints de RESEÑAS

### 1. Listar todas las reseñas
```bash
curl http://localhost:3000/api/reviews
```

### 2. Filtrar reseñas por categoría
```bash
curl "http://localhost:3000/api/reviews?categoria=RPG"
```

### 3. Filtrar por puntuación mínima
```bash
curl "http://localhost:3000/api/reviews?minScore=9"
```

### 4. Ordenar por puntuación
```bash
curl "http://localhost:3000/api/reviews?sortBy=puntuacion&order=desc"
```

### 5. Crear una nueva reseña
```bash
curl -X POST http://localhost:3000/api/reviews \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Mi Juego Favorito",
    "categoria": "RPG",
    "puntuacion": 10,
    "resumen": "Este juego es increíble, lo recomiendo totalmente",
    "autor": "Test Usuario",
    "plataforma": "PC",
    "año": 2024
  }'
```

### 6. Obtener una reseña específica
```bash
curl http://localhost:3000/api/reviews/[ID_DE_LA_RESEÑA]
```

### 7. Actualizar una reseña
```bash
curl -X PUT http://localhost:3000/api/reviews/[ID_DE_LA_RESEÑA] \
  -H "Content-Type: application/json" \
  -d '{
    "puntuacion": 9.5,
    "resumen": "Resumen actualizado"
  }'
```

### 8. Eliminar una reseña
```bash
curl -X DELETE http://localhost:3000/api/reviews/[ID_DE_LA_RESEÑA]
```

---

## 🌐 Probar en el Navegador

También puedes probar los endpoints GET directamente en tu navegador:

### Usuarios
- http://localhost:3000/api/users
- http://localhost:3000/api/users?limit=3
- http://localhost:3000/api/users?sortBy=nombre&order=asc

### Categorías
- http://localhost:3000/api/categories
- http://localhost:3000/api/categories?activa=true
- http://localhost:3000/api/categories?sortBy=orden&order=asc

### Reseñas
- http://localhost:3000/api/reviews
- http://localhost:3000/api/reviews?categoria=RPG
- http://localhost:3000/api/reviews?minScore=9

---

## 🧪 Usando Postman o Thunder Client

Si prefieres una interfaz gráfica:

1. **Instala Thunder Client** (extensión de VS Code) o **Postman**

2. **Importa estas colecciones:**

### Colección de Usuarios
- GET: `http://localhost:3000/api/users`
- POST: `http://localhost:3000/api/users` (con body JSON)
- GET: `http://localhost:3000/api/users/:id`
- PUT: `http://localhost:3000/api/users/:id` (con body JSON)
- DELETE: `http://localhost:3000/api/users/:id`

### Colección de Categorías
- GET: `http://localhost:3000/api/categories`
- POST: `http://localhost:3000/api/categories` (con body JSON)
- GET: `http://localhost:3000/api/categories/:id`
- PUT: `http://localhost:3000/api/categories/:id` (con body JSON)
- DELETE: `http://localhost:3000/api/categories/:id`

### Colección de Reseñas
- GET: `http://localhost:3000/api/reviews`
- POST: `http://localhost:3000/api/reviews` (con body JSON)
- GET: `http://localhost:3000/api/reviews/:id`
- PUT: `http://localhost:3000/api/reviews/:id` (con body JSON)
- DELETE: `http://localhost:3000/api/reviews/:id`

---

## ✅ Checklist de Pruebas

- [ ] Listar todos los usuarios
- [ ] Crear un nuevo usuario
- [ ] Obtener un usuario específico
- [ ] Actualizar un usuario
- [ ] Eliminar un usuario
- [ ] Listar todas las categorías
- [ ] Crear una nueva categoría
- [ ] Filtrar categorías activas
- [ ] Actualizar una categoría
- [ ] Eliminar una categoría
- [ ] Listar todas las reseñas
- [ ] Filtrar reseñas por categoría
- [ ] Crear una nueva reseña
- [ ] Actualizar una reseña
- [ ] Eliminar una reseña

---

## 🐛 Solución de Problemas

### Error: "Cannot connect to MongoDB"
- Verifica que MongoDB esté corriendo
- Revisa tu archivo `.env.local`
- Confirma la conexión con: `npm run verify`

### Error: "Validation Error"
- Revisa que los datos enviados cumplan las validaciones
- Email debe ser único y válido
- Nombres de categorías deben ser únicos
- Puntuaciones deben estar entre 1-10

### Error 404 - "Not Found"
- Verifica que el ID sea válido (24 caracteres hexadecimales)
- Confirma que el documento existe en la base de datos

### Error 500 - "Internal Server Error"
- Revisa los logs de la aplicación (`npm run dev`)
- Verifica la conexión a MongoDB
- Confirma que las colecciones existan

---

## 📊 Verificar Datos en MongoDB

Después de probar los endpoints, verifica los cambios:

```bash
# Ver el estado de las colecciones
npm run verify

# O conecta con mongosh
mongosh mongodb://localhost:27017/game-reviews

# Ver usuarios
db.users.find().pretty()

# Ver categorías
db.categories.find().pretty()

# Ver reseñas
db.reviews.find().pretty()
```

---

¡Listo para probar las 3 colecciones! 🚀

