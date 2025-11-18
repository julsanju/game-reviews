import { reviews } from '@/data/reviews';
import connectDB from '@/lib/mongodb';
import Review from '@/models/Review';

async function seed() {
  try {
    console.log('🌱 Iniciando seed de la base de datos...');

    await connectDB();

    // Limpiar la colección existente
    await Review.deleteMany({});
    console.log('🗑️  Colección limpiada');

    // Insertar las reseñas de ejemplo
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

    console.log(`✅ ${insertedReviews.length} reseñas insertadas exitosamente`);

    // Mostrar las categorías únicas
    const categories = await Review.distinct('categoria');
    console.log('📁 Categorías disponibles:', categories.sort());

    process.exit(0);
  } catch (error) {
    console.error('❌ Error en el seed:', error);
    process.exit(1);
  }
}

seed();


