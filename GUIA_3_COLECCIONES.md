# 🎯 Guía: Implementación de 3 Colecciones MongoDB

## ✅ ¿Qué se implementó?

Tu aplicación ahora utiliza **3 colecciones de MongoDB**:

1. **👥 Users** (Usuarios) - Gestión de usuarios/autores
2. **📁 Categories** (Categorías) - Organización de categorías de juegos
3. **📝 Reviews** (Reseñas) - Reseñas de videojuegos (ya existía)

---

## 📁 Archivos Creados

### Modelos
```
src/models/
  ├── User.ts          ← NUEVO: Modelo de usuarios
  ├── Category.ts      ← NUEVO: Modelo de categorías
  └── Review.ts        ← EXISTENTE (ya estaba)
```

### API Endpoints
```
src/app/api/
  ├── users/
  │   ├── route.ts           ← NUEVO: GET y POST usuarios
  │   └── [id]/route.ts      ← NUEVO: GET, PUT, DELETE usuario
  ├── categories/
  │   ├── route.ts           ← NUEVO: GET y POST categorías
  │   └── [id]/route.ts      ← NUEVO: GET, PUT, DELETE categoría
  └── reviews/               ← EXISTENTE
      ├── route.ts
      └── [id]/route.ts
```

### Datos de Ejemplo
```
src/data/
  ├── users.ts         ← NUEVO: 5 usuarios de ejemplo
  ├── categories.ts    ← NUEVO: 8 categorías de ejemplo
  └── reviews.ts       ← EXISTENTE
```

### Scripts
```
src/scripts/
  ├── seed.ts                  ← ACTUALIZADO: Ahora pobla las 3 colecciones
  └── verify-collections.ts    ← NUEVO: Script para verificar colecciones
```

---

## 🚀 Paso a Paso: Cómo Usar

### 1️⃣ Poblar las 3 Colecciones

Ejecuta el script de seed para insertar datos en las 3 colecciones:

```bash
npm run seed
```

**Salida esperada:**
```
🌱 Iniciando seed de la base de datos...

🗑️  Limpiando colecciones...
✅ Colecciones limpiadas

👥 Insertando usuarios...
✅ 5 usuarios insertados
   Usuarios: Carlos Gamer, María López, Juan Pérez, Ana García, Diego Ramírez

📁 Insertando categorías...
✅ 8 categorías insertadas
   Categorías: Acción, Aventura, RPG, Estrategia, Deportes, Terror, Plataformas, Simulación

📝 Insertando reseñas...
✅ X reseñas insertadas

📊 RESUMEN FINAL:
=====================================
👥 Total Usuarios: 5
📁 Total Categorías: 8
📝 Total Reseñas: X
=====================================

✨ Seed completado exitosamente!
```

### 2️⃣ Verificar las Colecciones

Ejecuta el script de verificación para confirmar que las 3 colecciones existen:

```bash
npm run verify
```

**Salida esperada:**
```
🔍 Verificando colecciones de MongoDB...

📦 Colecciones encontradas en la base de datos:
   - users
   - categories
   - reviews

👥 USUARIOS (users):
=====================================
Total de usuarios: 5
Ejemplos:
  • Carlos Gamer (carlos.gamer@example.com) - 0 reseñas
  • María López (maria.lopez@example.com) - 0 reseñas
  • Juan Pérez (juan.perez@example.com) - 0 reseñas

📁 CATEGORÍAS (categories):
=====================================
Total de categorías: 8
Ejemplos:
  ✓ ⚔️ Acción
  ✓ 🗺️ Aventura
  ✓ 🎭 RPG
  ✓ ♟️ Estrategia
  ✓ ⚽ Deportes

📝 RESEÑAS (reviews):
=====================================
Total de reseñas: X
...

📊 RESUMEN:
=====================================
✅ Total de documentos: XX
   👥 Usuarios: 5
   📁 Categorías: 8
   📝 Reseñas: X
=====================================

✨ ¡Excelente! Tienes al menos 3 colecciones con datos.
```

### 3️⃣ Probar los Endpoints

Inicia tu aplicación:

```bash
npm run dev
```

Luego prueba los endpoints en tu navegador o con curl:

#### Usuarios
```bash
# Obtener todos los usuarios
curl http://localhost:3000/api/users

# Crear un nuevo usuario
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Nuevo Gamer",
    "email": "nuevo@example.com",
    "biografia": "Fanático de los RPG"
  }'

# Obtener un usuario específico (reemplaza [id])
curl http://localhost:3000/api/users/[id]
```

#### Categorías
```bash
# Obtener todas las categorías
curl http://localhost:3000/api/categories

# Obtener solo categorías activas
curl http://localhost:3000/api/categories?activa=true

# Crear una nueva categoría
curl -X POST http://localhost:3000/api/categories \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Puzzle",
    "descripcion": "Juegos de rompecabezas y lógica",
    "icono": "🧩",
    "color": "#22c55e"
  }'
```

#### Reseñas (ya existente)
```bash
# Obtener todas las reseñas
curl http://localhost:3000/api/reviews

# Filtrar por categoría
curl http://localhost:3000/api/reviews?categoria=RPG
```

---

## 🎨 Estructura de las Colecciones

### 👥 Colección: users

```typescript
{
  nombre: string,           // Nombre del usuario (min 3 caracteres)
  email: string,            // Email único (validado)
  avatar?: string,          // URL del avatar (auto-generado si no se provee)
  biografia?: string,       // Biografía (max 500 caracteres)
  fechaRegistro: Date,      // Fecha de registro (auto)
  totalReseñas: number,     // Contador de reseñas (default: 0)
  puntuacionPromedio: number // Promedio 0-10
}
```

**Índices:** email, fechaRegistro, totalReseñas

### 📁 Colección: categories

```typescript
{
  nombre: string,          // Nombre único (min 2 caracteres)
  descripcion: string,     // Descripción (max 300 caracteres)
  icono?: string,          // Emoji (default: 🎮)
  color?: string,          // Color hex (default: #6366f1)
  totalJuegos: number,     // Contador (default: 0)
  activa: boolean,         // Estado activo (default: true)
  orden: number            // Orden de visualización
}
```

**Índices:** nombre, activa+orden, totalJuegos

### 📝 Colección: reviews

```typescript
{
  titulo: string,          // Título del juego
  categoria: string,       // Categoría
  puntuacion: number,      // 1-10
  resumen: string,         // Descripción
  autor: string,           // Nombre del autor
  plataforma: string,      // Plataforma
  año: number,             // Año de lanzamiento
  imagen: string,          // URL de imagen
  fecha: Date              // Fecha de creación
}
```

**Índices:** categoria, puntuacion, fecha

---

## 🔍 Verificar en MongoDB Compass

1. Abre **MongoDB Compass**
2. Conecta a: `mongodb://localhost:27017/game-reviews`
3. Verás las 3 colecciones:
   - ✅ `users` con 5 documentos
   - ✅ `categories` con 8 documentos
   - ✅ `reviews` con X documentos

---

## 📝 Comandos Disponibles

```bash
npm run dev      # Iniciar aplicación en desarrollo
npm run seed     # Poblar las 3 colecciones con datos
npm run verify   # Verificar que las 3 colecciones existen
npm run build    # Compilar para producción
npm run start    # Iniciar en producción
```

---

## ✨ Características Implementadas

✅ 3 colecciones de MongoDB completamente funcionales  
✅ Modelos con validaciones y tipos TypeScript  
✅ API RESTful completa para cada colección  
✅ Datos de ejemplo realistas  
✅ Scripts de seed y verificación  
✅ Índices optimizados para búsquedas  
✅ Manejo de errores robusto  
✅ Documentación completa  

---

## 🎓 Próximos Pasos Sugeridos

1. **Relacionar las colecciones**: 
   - Vincular `reviews.autor` con `users._id`
   - Vincular `reviews.categoria` con `categories._id`
   
2. **Agregar autenticación**:
   - Implementar login/registro de usuarios
   - Proteger endpoints con JWT

3. **Estadísticas avanzadas**:
   - Top usuarios por reseñas
   - Categorías más populares
   - Tendencias de puntuaciones

4. **Frontend mejorado**:
   - Páginas para listar usuarios
   - Páginas para listar categorías
   - Filtros avanzados

---

## ❓ Preguntas Frecuentes

**Q: ¿Cómo sé si tengo 3 colecciones?**  
A: Ejecuta `npm run verify` y verás un resumen completo.

**Q: ¿Los datos de ejemplo se pueden cambiar?**  
A: Sí, edita los archivos en `src/data/` y vuelve a ejecutar `npm run seed`.

**Q: ¿Puedo agregar más campos a los modelos?**  
A: Sí, edita los archivos en `src/models/` y actualiza los tipos TypeScript.

**Q: ¿Cómo elimino todos los datos?**  
A: Ejecuta `npm run seed` que limpia y vuelve a poblar las colecciones.

---

## 📚 Documentación Adicional

- `COLECCIONES.md` - Documentación detallada de las colecciones
- `SETUP_MONGODB.md` - Configuración inicial de MongoDB
- `VER_DATOS_MONGODB.md` - Cómo visualizar datos en MongoDB

---

¡Listo! Ahora tu aplicación tiene **3 colecciones de MongoDB** funcionando perfectamente. 🎉

