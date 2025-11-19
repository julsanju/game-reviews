import { reviews } from '@/data/reviews';
import { users } from '@/data/users';
import { categories } from '@/data/categories';
import connectDB from '@/lib/mongodb';
import Review from '@/models/Review';
import User from '@/models/User';
import Category from '@/models/Category';

async function seed() {
  try {
    console.log('🌱 Iniciando seed de la base de datos...\n');

    await connectDB();

    // ===== LIMPIAR TODAS LAS COLECCIONES =====
    console.log('🗑️  Limpiando colecciones...');
    await Review.deleteMany({});
    await User.deleteMany({});
    await Category.deleteMany({});
    console.log('✅ Colecciones limpiadas\n');

    // ===== INSERTAR USUARIOS =====
    console.log('👥 Insertando usuarios...');
    const insertedUsers = await User.insertMany(users);
    console.log(`✅ ${insertedUsers.length} usuarios insertados`);
    console.log('   Usuarios:', insertedUsers.map(u => u.nombre).join(', '));
    console.log();

    // ===== INSERTAR CATEGORÍAS =====
    console.log('📁 Insertando categorías...');
    const insertedCategories = await Category.insertMany(categories);
    console.log(`✅ ${insertedCategories.length} categorías insertadas`);
    console.log('   Categorías:', insertedCategories.map(c => c.nombre).join(', '));
    console.log();

    // ===== INSERTAR RESEÑAS =====
    console.log('📝 Insertando reseñas...');
    const insertedReviews = await Review.insertMany(
      reviews.map((review) => ({
        titulo: review.titulo,
        categoria: review.categoria,
        puntuacion: review.puntuacion,
        resumen: review.resumen,
        autor: review.autor,
        plataforma: review.plataforma,
        año: review.año,
        imagen: review.imagen,
        fecha: new Date(review.fecha),
      }))
    );
    console.log(`✅ ${insertedReviews.length} reseñas insertadas`);
    console.log();

    // ===== ESTADÍSTICAS FINALES =====
    console.log('📊 RESUMEN FINAL:');
    console.log('=====================================');
    const totalUsers = await User.countDocuments();
    const totalCategories = await Category.countDocuments();
    const totalReviews = await Review.countDocuments();
    
    console.log(`👥 Total Usuarios: ${totalUsers}`);
    console.log(`📁 Total Categorías: ${totalCategories}`);
    console.log(`📝 Total Reseñas: ${totalReviews}`);
    console.log('=====================================');
    console.log('\n✨ Seed completado exitosamente!\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error en el seed:', error);
    process.exit(1);
  }
}

seed();



