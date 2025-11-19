import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Review from '@/models/Review';
import { getImageByCategory } from '@/lib/imagesByCategory';

// PUT - Actualizar una reseña
export async function PUT(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    await connectDB();
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

    // Actualizar la reseña
    const updatedReview = await Review.findByIdAndUpdate(
      params.id,
      {
        titulo,
        categoria,
        puntuacion: score,
        resumen,
        autor: autor || 'Anónimo',
        plataforma: plataforma || 'Sin especificar',
        año: año || new Date().getFullYear(),
        imagen: reviewImage,
      },
      { new: true } // Retorna el documento actualizado
    );

    if (!updatedReview) {
      return NextResponse.json(
        { message: 'Reseña no encontrada' },
        { status: 404 }
      );
    }

    const formattedReview = {
      id: String(updatedReview._id),
      titulo: updatedReview.titulo,
      categoria: updatedReview.categoria,
      puntuacion: updatedReview.puntuacion,
      resumen: updatedReview.resumen,
      autor: updatedReview.autor,
      plataforma: updatedReview.plataforma,
      fecha: updatedReview.fecha.toISOString(),
      año: updatedReview.año,
      imagen: updatedReview.imagen,
    };

    return NextResponse.json(
      { review: formattedReview, message: 'Reseña actualizada exitosamente' },
      { status: 200 }
    );
  } catch (err) {
    console.error('❌ Error actualizando reseña:', err);
    return NextResponse.json(
      { message: 'Error al actualizar la reseña' },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar una reseña
export async function DELETE(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    await connectDB();

    const deletedReview = await Review.findByIdAndDelete(params.id);

    if (!deletedReview) {
      return NextResponse.json(
        { message: 'Reseña no encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Reseña eliminada exitosamente' },
      { status: 200 }
    );
  } catch (err) {
    console.error('❌ Error eliminando reseña:', err);
    return NextResponse.json(
      { message: 'Error al eliminar la reseña' },
      { status: 500 }
    );
  }
}

