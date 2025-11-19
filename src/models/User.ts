import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  nombre: string;
  email: string;
  avatar?: string;
  biografia?: string;
  fechaRegistro: Date;
  totalReseñas: number;
  puntuacionPromedio: number;
}

const UserSchema = new Schema<IUser>(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      trim: true,
      minlength: [3, 'El nombre debe tener al menos 3 caracteres'],
    },
    email: {
      type: String,
      required: [true, 'El email es obligatorio'],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Por favor ingrese un email válido',
      ],
    },
    avatar: {
      type: String,
      default: 'https://api.dicebear.com/7.x/avataaars/svg?seed=default',
    },
    biografia: {
      type: String,
      trim: true,
      maxlength: [500, 'La biografía no puede exceder 500 caracteres'],
    },
    fechaRegistro: {
      type: Date,
      default: Date.now,
    },
    totalReseñas: {
      type: Number,
      default: 0,
      min: [0, 'El total de reseñas no puede ser negativo'],
    },
    puntuacionPromedio: {
      type: Number,
      default: 0,
      min: [0, 'La puntuación promedio no puede ser negativa'],
      max: [10, 'La puntuación promedio no puede exceder 10'],
    },
  },
  {
    timestamps: true,
  }
);

// Índices para búsquedas más rápidas
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ fechaRegistro: -1 });
UserSchema.index({ totalReseñas: -1 });

// Evitar la redefinición del modelo en hot-reload (desarrollo)
const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;

