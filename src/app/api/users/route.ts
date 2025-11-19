import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

// GET - Obtener todos los usuarios
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const sortBy = searchParams.get('sortBy') || 'fechaRegistro';
    const order = searchParams.get('order') === 'asc' ? 1 : -1;

    const users = await User.find()
      .sort({ [sortBy]: order })
      .limit(limit);

    return NextResponse.json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Error al obtener los usuarios',
      },
      { status: 500 }
    );
  }
}

// POST - Crear un nuevo usuario
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const user = await User.create(body);

    return NextResponse.json(
      {
        success: true,
        data: user,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error al crear usuario:', error);

    // Manejar errores de validación de Mongoose
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        {
          success: false,
          error: 'Error de validación',
          details: messages,
        },
        { status: 400 }
      );
    }

    // Manejar error de duplicado (email único)
    if (error.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          error: 'El email ya está registrado',
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Error al crear el usuario',
      },
      { status: 500 }
    );
  }
}

