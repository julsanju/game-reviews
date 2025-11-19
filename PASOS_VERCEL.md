# 🚀 Configurar MongoDB Atlas y Vercel

## Paso 1: Crear MongoDB Atlas (5 minutos)

### 1. Crear cuenta
- Ve a: https://www.mongodb.com/cloud/atlas/register
- Regístrate gratis (con Google o email)

### 2. Crear Cluster GRATIS
1. Click en **"Build a Database"** o **"Create"**
2. Selecciona **"M0 FREE"** (512 MB - gratis para siempre)
3. Elige región: **AWS → N. Virginia (us-east-1)** o la más cercana
4. Nombre del cluster: `game-reviews-cluster` (opcional)
5. Click **"Create Cluster"** (espera 3-5 minutos)

### 3. Configurar Acceso

#### A) Crear usuario de base de datos:
1. En el menú izquierdo: **"Database Access"** (bajo Security)
2. Click **"Add New Database User"**
3. Configura:
   - **Username**: `gamereviews`
   - **Password**: Click "Autogenerate Secure Password"
   - **⚠️ COPIA Y GUARDA LA CONTRASEÑA**
   - **Privileges**: "Read and write to any database"
4. Click **"Add User"**

#### B) Permitir acceso desde Vercel:
1. En el menú izquierdo: **"Network Access"** (bajo Security)
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"**
   - Se agregará: `0.0.0.0/0`
4. Click **"Confirm"**

### 4. Obtener Connection String

1. Ve a **"Database"** en el menú
2. Click **"Connect"** (botón junto a tu cluster)
3. Selecciona **"Connect your application"**
4. Copia el connection string:

```
mongodb+srv://gamereviews:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

5. **Reemplaza `<password>`** con tu contraseña real
6. **Agrega `/game-reviews`** antes del `?`:

```
mongodb+srv://gamereviews:TU_PASSWORD@cluster0.xxxxx.mongodb.net/game-reviews?retryWrites=true&w=majority
```

---

## Paso 2: Configurar Variable en Vercel

1. Ve a tu proyecto en Vercel: https://vercel.com/dashboard
2. Selecciona tu proyecto: **game-reviews**
3. Ve a **"Settings"** → **"Environment Variables"**
4. Click **"Add New"**
5. Configura:
   - **Name**: `MONGODB_URI`
   - **Value**: Tu connection string de Atlas (el de arriba)
   - **Environments**: Marca **Production**, **Preview**, y **Development**
6. Click **"Save"**

---

## Paso 3: Poblar Base de Datos con Datos

### Opción A: Desde tu computadora (Recomendado)

```bash
# 1. Actualiza tu .env.local con el Atlas URI
echo "MONGODB_URI=tu-connection-string-de-atlas-aqui" > .env.local

# 2. Ejecuta el seed
npm run seed

# Deberías ver:
# 🌱 Iniciando seed de la base de datos...
# 🗑️  Colección limpiada
# ✅ 9 reseñas insertadas exitosamente
```

### Opción B: Usando mongosh (alternativa)

```bash
# Conecta a Atlas
mongosh "tu-connection-string-de-atlas"

# Selecciona la base de datos
use game-reviews

# Verifica que esté vacía
db.reviews.find()

# Salir
exit
```

Luego ejecuta el seed desde tu compu (Opción A).

---

## Paso 4: Redeploy en Vercel

Una vez configurada la variable de entorno:

1. Ve a tu proyecto en Vercel
2. Ve a **"Deployments"**
3. Click en los **tres puntos** (...) del último deployment
4. Click **"Redeploy"**
5. Espera 1-2 minutos

---

## Paso 5: Verificar que Funcione

1. Abre tu URL de Vercel: `https://game-reviews-xxxxx.vercel.app`
2. Deberías ver:
   - ✅ 9 reseñas de videojuegos
   - ✅ Buscador funcionando
   - ✅ Filtros por categoría funcionando
   - ✅ Formulario para agregar reseñas

---

## 🔍 Ver los Datos en MongoDB

### Opción 1: MongoDB Atlas Web UI
1. Ve a https://cloud.mongodb.com
2. Click **"Browse Collections"**
3. Navega a `game-reviews` → `reviews`
4. ¡Verás todas tus reseñas!

### Opción 2: MongoDB Compass
1. Abre Compass
2. Pega tu connection string de Atlas
3. Conecta
4. Navega a `game-reviews` → `reviews`

### Opción 3: Studio 3T
1. New Connection → From URI
2. Pega tu connection string
3. Conecta y explora

---

## ⚠️ Solución de Problemas

### No veo datos en la app de Vercel

**Problema**: Variable de entorno no configurada o incorrecta

**Solución**:
1. Vercel → Settings → Environment Variables
2. Verifica que `MONGODB_URI` esté correcta
3. Redeploy

### Error: "Cannot connect to MongoDB"

**Problema**: IP no permitida o connection string incorrecto

**Solución**:
1. MongoDB Atlas → Network Access → Verifica `0.0.0.0/0`
2. Verifica que la password en el connection string sea correcta
3. Verifica que tenga `/game-reviews` antes del `?`

### La base de datos está vacía

**Problema**: No ejecutaste el seed

**Solución**:
```bash
# Actualiza .env.local con Atlas URI
echo "MONGODB_URI=tu-atlas-uri" > .env.local

# Ejecuta seed
npm run seed
```

---

## ✅ Checklist Final

```
☐ MongoDB Atlas creado (M0 gratis)
☐ Usuario de base de datos creado
☐ Network Access configurado (0.0.0.0/0)
☐ Connection string obtenido
☐ Variable MONGODB_URI en Vercel
☐ Seed ejecutado localmente
☐ Redeploy en Vercel
☐ App funcionando con datos
```

---

¡Listo! Tu app estará funcionando con MongoDB en la nube 24/7 🌍✨


