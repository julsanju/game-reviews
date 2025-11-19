# 📚 Documentación de Colecciones MongoDB

Este proyecto utiliza **3 colecciones** en MongoDB para gestionar reseñas de videojuegos:

## 🎯 Colecciones Implementadas

### 1. 📝 Reviews (Reseñas)
**Colección:** `reviews`  
**Modelo:** `src/models/Review.ts`

Almacena las reseñas de videojuegos realizadas por los usuarios.

**Campos:**
- `titulo`: Nombre del juego (requerido)
- `categoria`: Categoría del juego (requerido)
- `puntuacion`: Calificación de 1-10 (requerido)
- `resumen`: Descripción de la reseña (requerido)
- `autor`: Nombre del autor (opcional, default: "Anónimo")
- `plataforma`: Plataforma del juego (opcional)
- `año`: Año de lanzamiento (opcional)
- `imagen`: URL de la imagen (opcional)
- `fecha`: Fecha de creación (auto-generado)

**Endpoints:**
- `GET /api/reviews` - Obtener todas las reseñas
- `POST /api/reviews` - Crear una reseña
- `GET /api/reviews/[id]` - Obtener una reseña específica
- `PUT /api/reviews/[id]` - Actualizar una reseña
- `DELETE /api/reviews/[id]` - Eliminar una reseña

---

### 2. 👥 Users (Usuarios)
**Colección:** `users`  
**Modelo:** `src/models/User.ts`

Gestiona los usuarios/autores que crean las reseñas.

**Campos:**
- `nombre`: Nombre del usuario (requerido, min 3 caracteres)
- `email`: Email único (requerido, validado)
- `avatar`: URL del avatar (opcional, genera uno por defecto)
- `biografia`: Descripción del usuario (opcional, max 500 caracteres)
- `fechaRegistro`: Fecha de registro (auto-generado)
- `totalReseñas`: Contador de reseñas (default: 0)
- `puntuacionPromedio`: Promedio de puntuaciones (0-10)

**Endpoints:**
- `GET /api/users` - Obtener todos los usuarios
- `POST /api/users` - Crear un usuario
- `GET /api/users/[id]` - Obtener un usuario específico
- `PUT /api/users/[id]` - Actualizar un usuario
- `DELETE /api/users/[id]` - Eliminar un usuario

---

### 3. 📁 Categories (Categorías)
**Colección:** `categories`  
**Modelo:** `src/models/Category.ts`

Organiza las categorías de videojuegos disponibles.

**Campos:**
- `nombre`: Nombre de la categoría (requerido, único)
- `descripcion`: Descripción de la categoría (requerido, max 300 caracteres)
- `icono`: Emoji o icono (opcional, default: 🎮)
- `color`: Color hexadecimal (opcional, default: #6366f1)
- `totalJuegos`: Contador de juegos (default: 0)
- `activa`: Si la categoría está activa (default: true)
- `orden`: Orden de visualización (default: 0)

**Endpoints:**
- `GET /api/categories` - Obtener todas las categorías
- `POST /api/categories` - Crear una categoría
- `GET /api/categories/[id]` - Obtener una categoría específica
- `PUT /api/categories/[id]` - Actualizar una categoría
- `DELETE /api/categories/[id]` - Eliminar una categoría

---

## 🚀 Uso del Seed

Para poblar las 3 colecciones con datos de ejemplo:

```bash
npm run seed
```

Este comando:
1. Limpia todas las colecciones existentes
2. Inserta 5 usuarios de ejemplo
3. Inserta 8 categorías de ejemplo
4. Inserta las reseñas de ejemplo
5. Muestra un resumen de los datos insertados

---

## 📊 Verificar las Colecciones en MongoDB

### Opción 1: MongoDB Compass
1. Abre MongoDB Compass
2. Conecta a tu base de datos
3. Verás las 3 colecciones: `reviews`, `users`, `categories`

### Opción 2: Línea de comandos
```bash
mongosh mongodb://localhost:27017/game-reviews

# Ver todas las colecciones
show collections

# Contar documentos en cada colección
db.reviews.countDocuments()
db.users.countDocuments()
db.categories.countDocuments()

# Ver documentos de ejemplo
db.users.find().pretty()
db.categories.find().pretty()
db.reviews.find().limit(3).pretty()
```

---

## 🧪 Probar los Endpoints

### Ejemplo: Obtener usuarios
```bash
curl http://localhost:3000/api/users
```

### Ejemplo: Crear un usuario
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Nuevo Usuario",
    "email": "nuevo@example.com",
    "biografia": "Amante de los videojuegos"
  }'
```

### Ejemplo: Obtener categorías activas
```bash
curl http://localhost:3000/api/categories?activa=true
```

---

## ✅ Verificación de Requisitos

✔️ **Mínimo 3 colecciones implementadas:**
1. Reviews (Reseñas)
2. Users (Usuarios)
3. Categories (Categorías)

✔️ **Características adicionales:**
- Validación de datos con Mongoose
- Índices para búsquedas optimizadas
- Manejo de errores completo
- API RESTful para cada colección
- Datos de ejemplo con el seed

---

## 📝 Notas Importantes

1. Cada colección tiene su propio modelo con validaciones
2. Los endpoints siguen el patrón RESTful estándar
3. Las relaciones entre colecciones pueden implementarse usando referencias (ObjectId)
4. Los índices están optimizados para consultas frecuentes
5. El seed incluye datos realistas de ejemplo para desarrollo y pruebas

