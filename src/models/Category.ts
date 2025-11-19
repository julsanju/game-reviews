import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
  nombre: string;
  descripcion: string;
  icono?: string;
  color?: string;
  totalJuegos: number;
  activa: boolean;
  orden: number;
}

const CategorySchema = new Schema<ICategory>(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre de la categoría es obligatorio'],
      trim: true,
      minlength: [2, 'El nombre debe tener al menos 2 caracteres'],
    },
    descripcion: {
      type: String,
      required: [true, 'La descripción es obligatoria'],
      trim: true,
      maxlength: [300, 'La descripción no puede exceder 300 caracteres'],
    },
    icono: {
      type: String,
      default: '🎮',
    },
    color: {
      type: String,
      default: '#6366f1',
      match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Por favor ingrese un color hexadecimal válido'],
    },
    totalJuegos: {
      type: Number,
      default: 0,
      min: [0, 'El total de juegos no puede ser negativo'],
    },
    activa: {
      type: Boolean,
      default: true,
    },
    orden: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Índices para búsquedas más rápidas
CategorySchema.index({ nombre: 1 }, { unique: true });
CategorySchema.index({ activa: 1, orden: 1 });
CategorySchema.index({ totalJuegos: -1 });

// Evitar la redefinición del modelo en hot-reload (desarrollo)
const Category = mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);

export default Category;

