import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Review from '@/models/Review';
import { reviews as fallbackReviews } from '@/data/reviews';
import { getImageByCategory } from '@/lib/imagesByCategory';
import type { Review as ReviewType } from '@/data/reviews';

// Almacenamiento temporal en memoria (se reinicia al reiniciar el servidor)
// eslint-disable-next-line prefer-const
let inMemoryReviews: ReviewType[] = [...fallbackReviews];
let useMongoDB = false;

export async function GET() {
  try {
    await connectDB();
    useMongoDB = true;

    // Obtener todas las reseñas ordenadas por fecha (más recientes primero)
    const reviews = await Review.find({}).sort({ fecha: -1 }).lean();

    // Si no hay reseñas en MongoDB, usar los datos en memoria
    if (reviews.length === 0) {
      console.log('⚠️  No hay reseñas en MongoDB, usando datos en memoria');
      const allCategories = new Set(inMemoryReviews.map(r => r.categoria));
      
      return NextResponse.json({
        reviews: inMemoryReviews,
        categories: Array.from(allCategories).sort(),
      });
    }

    // Obtener categorías únicas
    const categories = await Review.distinct('categoria');

    // Transformar las reseñas para que coincidan con el formato del frontend
    const formattedReviews = reviews.map((review) => ({
      id: review._id.toString(),
      titulo: review.titulo,
      categoria: review.categoria,
      puntuacion: review.puntuacion,
      resumen: review.resumen,
      autor: review.autor,
      plataforma: review.plataforma,
      fecha: review.fecha.toISOString(),
      año: review.año,
      imagen: review.imagen,
    }));

    return NextResponse.json({
      reviews: formattedReviews,
      categories: categories.sort(),
    });
  } catch {
    console.error('❌ MongoDB no disponible, usando almacenamiento en memoria');
    useMongoDB = false;
    
    // Si falla la conexión a MongoDB, usar datos en memoria
    const allCategories = new Set(inMemoryReviews.map(r => r.categoria));

    return NextResponse.json({
      reviews: inMemoryReviews,
      categories: Array.from(allCategories).sort(),
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { titulo, categoria, puntuacion, resumen, autor, plataforma, año, imagen } = body;

    // Validaciones
    if (!titulo || !categoria || !puntuacion || !resumen) {
      return NextResponse.json(
        { message: 'Faltan campos obligatorios' },
        { status: 400 }
      );
    }

    const score = Number(puntuacion);
    if (Number.isNaN(score) || score < 1 || score > 10) {
      return NextResponse.json(
        { message: 'La puntuación debe estar entre 1 y 10' },
        { status: 400 }
      );
    }

    // Si no se proporciona imagen, usar una imagen temática según la categoría
    const reviewImage = imagen || getImageByCategory(categoria);

    // Intentar guardar en MongoDB
    if (useMongoDB) {
      try {
        await connectDB();
        
        const newReview = await Review.create({
          titulo,
          categoria,
          puntuacion: score,
          resumen,
          autor: autor || 'Anónimo',
          plataforma: plataforma || 'Sin especificar',
          año: año || new Date().getFullYear(),
          imagen: reviewImage,
        });

        const categories = await Review.distinct('categoria');

        const formattedReview = {
          id: newReview._id.toString(),
          titulo: newReview.titulo,
          categoria: newReview.categoria,
          puntuacion: newReview.puntuacion,
          resumen: newReview.resumen,
          autor: newReview.autor,
          plataforma: newReview.plataforma,
          fecha: newReview.fecha.toISOString(),
          año: newReview.año,
          imagen: newReview.imagen,
        };

        return NextResponse.json(
          {
            review: formattedReview,
            categories: categories.sort(),
          },
          { status: 201 }
        );
      } catch (mongoError) {
        console.error('❌ Error con MongoDB, guardando en memoria:', mongoError);
        useMongoDB = false;
      }
    }

    // Si MongoDB no está disponible, guardar en memoria
    const newReview: ReviewType = {
      id: `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      titulo,
      categoria,
      puntuacion: score,
      resumen,
      autor: autor || 'Anónimo',
      plataforma: plataforma || 'Sin especificar',
      fecha: new Date().toISOString(),
      año: año || new Date().getFullYear(),
      imagen: reviewImage,
    };

    // Agregar al inicio del array
    inMemoryReviews.unshift(newReview);

    // Obtener categorías únicas
    const allCategories = new Set(inMemoryReviews.map(r => r.categoria));

    console.log('✅ Reseña guardada en memoria:', newReview.titulo);

    return NextResponse.json(
      {
        review: newReview,
        categories: Array.from(allCategories).sort(),
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('❌ Error creando reseña:', err);
    return NextResponse.json(
      { message: 'Error al crear la reseña' },
      { status: 500 }
    );
  }
}
