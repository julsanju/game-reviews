import mongoose, { Document, Schema } from 'mongoose';

export interface IReview extends Document {
  titulo: string;
  categoria: string;
  puntuacion: number;
  resumen: string;
  autor: string;
  plataforma: string;
  año: number;
  imagen: string;
  fecha: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    titulo: {
      type: String,
      required: [true, 'El título es obligatorio'],
      trim: true,
    },
    categoria: {
      type: String,
      required: [true, 'La categoría es obligatoria'],
      trim: true,
    },
    puntuacion: {
      type: Number,
      required: [true, 'La puntuación es obligatoria'],
      min: [1, 'La puntuación mínima es 1'],
      max: [10, 'La puntuación máxima es 10'],
    },
    resumen: {
      type: String,
      required: [true, 'El resumen es obligatorio'],
      trim: true,
    },
    autor: {
      type: String,
      default: 'Anónimo',
      trim: true,
    },
    plataforma: {
      type: String,
      default: 'Sin especificar',
      trim: true,
    },
    año: {
      type: Number,
      default: () => new Date().getFullYear(),
    },
    imagen: {
      type: String,
      required: false,
    },
    fecha: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Índices para búsquedas más rápidas
ReviewSchema.index({ categoria: 1 });
ReviewSchema.index({ puntuacion: -1 });
ReviewSchema.index({ fecha: -1 });

// Evitar la redefinición del modelo en hot-reload (desarrollo)
const Review = mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);

export default Review;

