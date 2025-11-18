# 🚀 Guía de Despliegue en Vercel

## ✅ Paso 1: Código en GitHub (COMPLETADO)

Ya has hecho commit de todos los cambios.

## 🔗 Paso 2: Conectar Repositorio a GitHub

Ejecuta estos comandos (reemplaza TU-USUARIO con tu usuario de GitHub):

```bash
git remote add origin https://github.com/TU-USUARIO/game-reviews.git
git branch -M main
git push -u origin main
```

## ☁️ Paso 3: Configurar MongoDB Atlas (IMPORTANTE)

⚠️ **Vercel NO puede ejecutar MongoDB local**. Necesitas MongoDB Atlas (gratis).

### Crear MongoDB Atlas:

1. Ve a: https://www.mongodb.com/cloud/atlas/register
2. Crea cuenta gratuita
3. Crea cluster M0 (gratis)
4. Ve a "Database Access" → Crea un usuario
5. Ve a "Network Access" → Permite "0.0.0.0/0"
6. Click "Connect" → "Connect your application"
7. Copia el connection string:
   ```
   mongodb+srv://usuario:password@cluster0.xxxxx.mongodb.net/game-reviews?retryWrites=true&w=majority
   ```

### Poblar la base de datos:

```bash
# Actualiza tu .env.local con el Atlas URI
echo "MONGODB_URI=tu-atlas-connection-string-aqui" > .env.local

# Ejecuta el seed
npm run seed
```

## 🚀 Paso 4: Desplegar en Vercel

### Opción A: Desde el navegador (Recomendado)

1. Ve a: https://vercel.com/new
2. Importa tu repositorio de GitHub
3. **Environment Variables**:
   - Click "Add Environment Variable"
   - Name: `MONGODB_URI`
   - Value: Tu connection string de Atlas
4. Click "Deploy"
5. ¡Espera 1-2 minutos!

### Opción B: Desde terminal

```bash
# Instalar Vercel CLI
npm i -g vercel

# Iniciar sesión
vercel login

# Desplegar
vercel

# Agregar variable de entorno
vercel env add MONGODB_URI production
# Pega tu connection string cuando te lo pida

# Desplegar a producción
vercel --prod
```

## 🔍 Verificar Despliegue

1. Abre tu URL de Vercel: `https://game-reviews-xxxxx.vercel.app`
2. Deberías ver tus 9 reseñas
3. Prueba:
   - ✅ Buscar juegos
   - ✅ Filtrar por categoría
   - ✅ Agregar nueva reseña

## ⚠️ Solución de Problemas

### Error: Cannot connect to MongoDB
- Ve a Vercel → Settings → Environment Variables
- Verifica que `MONGODB_URI` esté correcta
- Redeploya: Deployments → ... → Redeploy

### Error: No data showing
- Verifica que ejecutaste `npm run seed` con el Atlas URI
- Revisa MongoDB Atlas → Browse Collections

## 🎯 Checklist Final

```
☐ Código en GitHub
☐ MongoDB Atlas configurado
☐ Seed ejecutado en Atlas
☐ Variable MONGODB_URI en Vercel
☐ Deploy exitoso
☐ App funcionando en producción
```

---

¡Tu app estará disponible 24/7 en todo el mundo! 🌍✨

