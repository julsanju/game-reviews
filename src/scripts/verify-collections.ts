import connectDB from '@/lib/mongodb';
import Review from '@/models/Review';
import User from '@/models/User';
import Category from '@/models/Category';
import mongoose from 'mongoose';

async function verifyCollections() {
  try {
    console.log('🔍 Verificando colecciones de MongoDB...\n');

    await connectDB();

    // Obtener todas las colecciones de la base de datos
    const collections = await mongoose.connection.db?.listCollections().toArray();
    console.log('📦 Colecciones encontradas en la base de datos:');
    collections?.forEach((col) => {
      console.log(`   - ${col.name}`);
    });
    console.log();

    // Verificar colección de Usuarios
    console.log('👥 USUARIOS (users):');
    console.log('=====================================');
    const userCount = await User.countDocuments();
    console.log(`Total de usuarios: ${userCount}`);
    if (userCount > 0) {
      const sampleUsers = await User.find().limit(3).select('nombre email totalReseñas');
      console.log('Ejemplos:');
      sampleUsers.forEach((user) => {
        console.log(`  • ${user.nombre} (${user.email}) - ${user.totalReseñas} reseñas`);
      });
    } else {
      console.log('⚠️  No hay usuarios en la base de datos');
    }
    console.log();

    // Verificar colección de Categorías
    console.log('📁 CATEGORÍAS (categories):');
    console.log('=====================================');
    const categoryCount = await Category.countDocuments();
    console.log(`Total de categorías: ${categoryCount}`);
    if (categoryCount > 0) {
      const sampleCategories = await Category.find().sort({ orden: 1 }).limit(5).select('nombre icono activa');
      console.log('Ejemplos:');
      sampleCategories.forEach((cat) => {
        const status = cat.activa ? '✓' : '✗';
        console.log(`  ${status} ${cat.icono} ${cat.nombre}`);
      });
    } else {
      console.log('⚠️  No hay categorías en la base de datos');
    }
    console.log();

    // Verificar colección de Reseñas
    console.log('📝 RESEÑAS (reviews):');
    console.log('=====================================');
    const reviewCount = await Review.countDocuments();
    console.log(`Total de reseñas: ${reviewCount}`);
    if (reviewCount > 0) {
      const sampleReviews = await Review.find().limit(3).select('titulo categoria puntuacion autor');
      console.log('Ejemplos:');
      sampleReviews.forEach((review) => {
        console.log(`  • "${review.titulo}" [${review.categoria}] - ⭐ ${review.puntuacion}/10 por ${review.autor}`);
      });
      
      // Estadísticas adicionales
      console.log('\nEstadísticas:');
      const categories = await Review.distinct('categoria');
      console.log(`  Categorías únicas: ${categories.length}`);
      const avgScore = await Review.aggregate([
        { $group: { _id: null, avgPuntuacion: { $avg: '$puntuacion' } } }
      ]);
      if (avgScore.length > 0) {
        console.log(`  Puntuación promedio: ${avgScore[0].avgPuntuacion.toFixed(2)}/10`);
      }
    } else {
      console.log('⚠️  No hay reseñas en la base de datos');
    }
    console.log();

    // Resumen final
    console.log('📊 RESUMEN:');
    console.log('=====================================');
    const totalDocs = userCount + categoryCount + reviewCount;
    console.log(`✅ Total de documentos: ${totalDocs}`);
    console.log(`   👥 Usuarios: ${userCount}`);
    console.log(`   📁 Categorías: ${categoryCount}`);
    console.log(`   📝 Reseñas: ${reviewCount}`);
    console.log('=====================================');
    
    if (userCount >= 1 && categoryCount >= 1 && reviewCount >= 1) {
      console.log('\n✨ ¡Excelente! Tienes al menos 3 colecciones con datos.');
    } else {
      console.log('\n⚠️  Ejecuta "npm run seed" para poblar las colecciones.');
    }
    console.log();

    process.exit(0);
  } catch (error) {
    console.error('❌ Error al verificar colecciones:', error);
    process.exit(1);
  }
}

verifyCollections();

