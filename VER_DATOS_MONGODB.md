# 🔍 Guía para Ver Datos en MongoDB

## Método 1: MongoDB Compass (GUI - Más Fácil) ⭐

### Instalación
```bash
# macOS
brew install --cask mongodb-compass

# Windows/Linux: https://www.mongodb.com/try/download/compass
```

### Conexión
1. Abre MongoDB Compass
2. En "New Connection" pega tu URI:
   - **Local**: `mongodb://localhost:27017`
   - **Atlas**: Tu string de conexión completo
3. Click en "Connect"
4. Navega: `game-reviews` → `reviews`

---

## Método 2: MongoDB Shell (Terminal)

### Conectar
```bash
# MongoDB Local
mongosh

# MongoDB Atlas
mongosh "tu-connection-string-aqui"
```

### Comandos Básicos
```javascript
// Seleccionar base de datos
use game-reviews

// Ver todas las reseñas
db.reviews.find().pretty()

// Contar reseñas
db.reviews.countDocuments()

// Ver una reseña
db.reviews.findOne()

// Buscar por categoría
db.reviews.find({ category: "Acción" })

// Ver categorías disponibles
db.reviews.distinct("category")

// Top 5 reseñas
db.reviews.find().sort({ rating: -1 }).limit(5)

// Buscar por nombre
db.reviews.find({ gameName: /Zelda/i })

// Reseñas con rating > 4
db.reviews.find({ rating: { $gte: 4 } })

// Solo mostrar ciertos campos
db.reviews.find({}, { 
  gameName: 1, 
  rating: 1, 
  category: 1, 
  _id: 0 
})

// Salir
exit
```

---

## Método 3: MongoDB Atlas (Cloud)

Si usas Atlas:
1. Ve a https://cloud.mongodb.com
2. Login
3. Selecciona tu cluster
4. Click "Browse Collections"
5. Navega a `game-reviews` → `reviews`

---

## Método 4: VS Code Extension

1. Instala "MongoDB for VS Code"
2. Click en el ícono de MongoDB en la barra lateral
3. Agrega tu conexión
4. Explora visualmente tus datos

---

## 🔥 Comandos Avanzados

```javascript
// Buscar juegos de acción con rating alto
db.reviews.find({ 
  category: "Acción", 
  rating: { $gte: 4.5 } 
})

// Agregar una nueva reseña
db.reviews.insertOne({
  gameName: "Super Mario Odyssey",
  category: "Aventura",
  rating: 5,
  reviewText: "¡Un juego increíble!",
  reviewerName: "Mario Fan",
  platform: "Nintendo Switch"
})

// Actualizar una reseña
db.reviews.updateOne(
  { gameName: "Zelda: Breath of the Wild" },
  { $set: { rating: 5 } }
)

// Eliminar una reseña
db.reviews.deleteOne({ gameName: "Nombre del juego" })

// Ver estadísticas
db.reviews.aggregate([
  {
    $group: {
      _id: "$category",
      count: { $sum: 1 },
      avgRating: { $avg: "$rating" }
    }
  },
  { $sort: { avgRating: -1 } }
])
```

---

## 📱 Mi Recomendación

Para principiantes: **MongoDB Compass** 🎯
- Interfaz visual intuitiva
- No necesitas memorizar comandos
- Puedes editar datos fácilmente

Para desarrolladores: **mongosh + VS Code Extension** 💻
- Rápido y potente
- Ideal para scripting
- Integrado en tu flujo de trabajo

---

## 🆘 Solución de Problemas

### No puedo conectar con mongosh
```bash
# Verifica que MongoDB está corriendo
brew services list | grep mongodb

# Reinicia MongoDB si es necesario
brew services restart mongodb-community
```

### No veo datos en Compass
1. Verifica que ejecutaste `npm run seed`
2. Confirma que estás conectado a la base de datos correcta
3. Refresca la vista (F5)

### Error de autenticación en Atlas
- Verifica usuario y password en la connection string
- Asegúrate de que tu IP está en Network Access

---

¡Explora tus datos! 🎮✨

