import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Category from '@/models/Category';

// GET - Obtener todas las categorías
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const activa = searchParams.get('activa');
    const sortBy = searchParams.get('sortBy') || 'orden';
    const order = searchParams.get('order') === 'desc' ? -1 : 1;

    // Construir el filtro
    const filter: any = {};
    if (activa !== null && activa !== undefined) {
      filter.activa = activa === 'true';
    }

    const categories = await Category.find(filter).sort({ [sortBy]: order });

    return NextResponse.json({
      success: true,
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Error al obtener las categorías',
      },
      { status: 500 }
    );
  }
}

// POST - Crear una nueva categoría
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const category = await Category.create(body);

    return NextResponse.json(
      {
        success: true,
        data: category,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error al crear categoría:', error);

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

    // Manejar error de duplicado (nombre único)
    if (error.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          error: 'Ya existe una categoría con ese nombre',
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Error al crear la categoría',
      },
      { status: 500 }
    );
  }
}

