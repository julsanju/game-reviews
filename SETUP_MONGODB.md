# 🎮 Configuración de MongoDB para Game Reviews

Esta guía te ayudará a configurar MongoDB para tu aplicación de reseñas de videojuegos.

## 📋 Requisitos Previos

- Node.js instalado
- MongoDB instalado localmente O cuenta en MongoDB Atlas

---

## Opción 1: MongoDB Local

### 1. Instalar MongoDB

#### En macOS (usando Homebrew):
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

#### En Windows:
Descarga e instala desde: https://www.mongodb.com/try/download/community

#### En Linux (Ubuntu/Debian):
```bash
sudo apt-get install -y mongodb
sudo systemctl start mongodb
```

### 2. Verificar que MongoDB está corriendo
```bash
mongosh
```

Si se conecta exitosamente, MongoDB está funcionando.

### 3. Crear el archivo .env.local
Crea un archivo `.env.local` en la raíz del proyecto con:

```env
MONGODB_URI=mongodb://localhost:27017/game-reviews
```

---

## Opción 2: MongoDB Atlas (Cloud)

### 1. Crear una cuenta en MongoDB Atlas
Ve a: https://www.mongodb.com/cloud/atlas/register

### 2. Crear un Cluster gratuito
- Haz clic en "Build a Database"
- Selecciona la opción FREE (M0)
- Elige una región cercana a ti
- Haz clic en "Create"

### 3. Configurar el acceso
- **Database Access**: Crea un usuario con contraseña
  - Username: `gamereviews`
  - Password: (genera una contraseña segura)
  
- **Network Access**: Agrega tu IP
  - Haz clic en "Add IP Address"
  - Selecciona "Allow Access from Anywhere" (0.0.0.0/0)

### 4. Obtener la cadena de conexión
- Ve a "Database" > "Connect"
- Selecciona "Connect your application"
- Copia la cadena de conexión

### 5. Crear el archivo .env.local
Crea un archivo `.env.local` en la raíz del proyecto:

```env
MONGODB_URI=mongodb+srv://<usuario>:<password>@cluster0.xxxxx.mongodb.net/game-reviews?retryWrites=true&w=majority
```

**Importante**: Reemplaza `<usuario>`, `<password>` y la URL con tus credenciales.

---

## 🌱 Poblar la Base de Datos

Una vez configurado MongoDB, ejecuta el script de seed para agregar datos de ejemplo:

```bash
npm run seed
```

Deberías ver:
```
🌱 Iniciando seed de la base de datos...
🗑️  Colección limpiada
✅ 9 reseñas insertadas exitosamente
📁 Categorías disponibles: [ 'Acción', 'Aventura', 'Estrategia', 'RPG', 'Racing', 'Terror' ]
```

---

## 🚀 Ejecutar la Aplicación

```bash
npm run dev
```

La aplicación estará disponible en: http://localhost:3000

---

## 🔍 Verificar la Conexión

Si todo está configurado correctamente, deberías ver en la consola:
```
✅ Conectado a MongoDB
```

---

## ⚠️ Solución de Problemas

### Error: "MongooseError: The `uri` parameter to `openUri()` must be a string"
- Verifica que el archivo `.env.local` existe y tiene la variable `MONGODB_URI`
- Reinicia el servidor de desarrollo

### Error: "MongoNetworkError: failed to connect to server"
- **MongoDB Local**: Verifica que MongoDB está corriendo con `brew services list` o `systemctl status mongodb`
- **MongoDB Atlas**: Verifica que tu IP está en la lista de Network Access

### Error: "Authentication failed"
- **MongoDB Atlas**: Verifica que el usuario y contraseña en la cadena de conexión son correctos

---

## 📊 Características de MongoDB

La aplicación utiliza MongoDB con Mongoose para:

✅ **Almacenamiento persistente** de reseñas  
✅ **Búsquedas optimizadas** con índices  
✅ **Validación de datos** a nivel de esquema  
✅ **Categorías dinámicas** basadas en las reseñas existentes  
✅ **Timestamps automáticos** (createdAt, updatedAt)

---

## 🎯 Próximos Pasos

Una vez que la aplicación esté corriendo con MongoDB:

1. ✅ Prueba el formulario "Deja tu Reseña"
2. ✅ Las reseñas se guardarán permanentemente
3. ✅ Puedes reiniciar el servidor sin perder datos
4. ✅ Filtra por categorías
5. ✅ Busca juegos por nombre

---

## 📝 Notas Adicionales

- El archivo `.env.local` está en `.gitignore` por seguridad
- Nunca compartas tu cadena de conexión de MongoDB Atlas públicamente
- Para producción, considera usar variables de entorno en tu plataforma de hosting (Vercel, Netlify, etc.)

---

¡Disfruta tu aplicación de reseñas de videojuegos! 🎮✨



