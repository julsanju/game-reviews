// Se permite cualquier categoría; las iniciales sirven como opciones sugeridas.
export type ReviewCategory = string;

export type Review = {
  id: string;
  titulo: string;
  categoria: ReviewCategory;
  puntuacion: number; // 1 a 10
  resumen: string;
  autor: string;
  plataforma: string;
  fecha: string; // ISO string
  año: number;
  imagen: string;
};

export const categorias: ReviewCategory[] = ['Acción', 'RPG', 'Estrategia', 'Aventura', 'Terror', 'Racing'];

export const reviews: Review[] = [
  {
    id: '1',
    titulo: 'Legends of the Dragon Realm',
    categoria: 'RPG',
    puntuacion: 9.5,
    resumen: 'Épica aventura de fantasía medieval con dragones, magia y combates tácticos profundos.',
    autor: 'GameReviews Pro',
    plataforma: 'PC, PS5, Xbox',
    fecha: new Date('2024-01-15').toISOString(),
    año: 2024,
    imagen: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&h=600&fit=crop&q=80', // Dragón
  },
  {
    id: '2',
    titulo: 'Kingdoms of Eternity',
    categoria: 'RPG',
    puntuacion: 9.3,
    resumen: 'MMORPG masivo con clases únicas, crafteo profundo y raids épicas.',
    autor: 'GameReviews Pro',
    plataforma: 'PC',
    fecha: new Date('2024-02-20').toISOString(),
    año: 2024,
    imagen: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&h=600&fit=crop&q=80', // Caballero medieval
  },
  {
    id: '3',
    titulo: 'Cyber Warriors: Neon Strike',
    categoria: 'Acción',
    puntuacion: 9.2,
    resumen: 'Una experiencia cyberpunk de acción frenética en un futuro distópico lleno de neón y tecnología.',
    autor: 'GameReviews Pro',
    plataforma: 'PC, PS5',
    fecha: new Date('2024-03-10').toISOString(),
    año: 2024,
    imagen: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&h=600&fit=crop&q=80', // Neón cyberpunk
  },
  {
    id: '4',
    titulo: 'Mystic Ruins Explorer',
    categoria: 'Aventura',
    puntuacion: 9.0,
    resumen: 'Explora ruinas antiguas y descubre secretos en un mundo abierto lleno de maravillas.',
    autor: 'GameReviews Pro',
    plataforma: 'PC, PS5, Xbox',
    fecha: new Date('2024-04-05').toISOString(),
    año: 2024,
    imagen: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&q=80', // Montañas épicas
  },
  {
    id: '5',
    titulo: 'Total War: Empire Clash',
    categoria: 'Estrategia',
    puntuacion: 8.8,
    resumen: 'Estrategia militar en tiempo real con batallas masivas y gestión de recursos avanzada.',
    autor: 'GameReviews Pro',
    plataforma: 'PC',
    fecha: new Date('2023-11-20').toISOString(),
    año: 2023,
    imagen: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=800&h=600&fit=crop&q=80', // Batalla táctica
  },
  {
    id: '6',
    titulo: 'Neon Assassin Protocol',
    categoria: 'Acción',
    puntuacion: 8.9,
    resumen: 'Sigilo y acción en un mundo futurista donde cada decisión cuenta.',
    autor: 'GameReviews Pro',
    plataforma: 'PC, PS5',
    fecha: new Date('2023-09-15').toISOString(),
    año: 2023,
    imagen: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop&q=80', // Tecnología futurista
  },
  {
    id: '7',
    titulo: 'Velocity X: Street Racing',
    categoria: 'Racing',
    puntuacion: 8.7,
    resumen: 'Carreras callejeras ilegales a alta velocidad en ciudades nocturnas con personalización extrema.',
    autor: 'GameReviews Pro',
    plataforma: 'PC, PS5, Xbox',
    fecha: new Date('2024-05-12').toISOString(),
    año: 2024,
    imagen: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&h=600&fit=crop&q=80', // Auto deportivo rojo
  },
  {
    id: '8',
    titulo: 'Shadows of Fear',
    categoria: 'Terror',
    puntuacion: 8.5,
    resumen: 'Horror psicológico en primera persona con una atmósfera inquietante y sorpresas aterradoras.',
    autor: 'GameReviews Pro',
    plataforma: 'PC, PS5',
    fecha: new Date('2023-10-31').toISOString(),
    año: 2023,
    imagen: 'https://images.unsplash.com/photo-1509043759401-136742328bb3?w=800&h=600&fit=crop&q=80', // Oscuridad atmosférica
  },
  {
    id: '9',
    titulo: "Commander's Tactics",
    categoria: 'Estrategia',
    puntuacion: 8.6,
    resumen: 'Estrategia por turnos con múltiples facciones y decisiones políticas complejas.',
    autor: 'GameReviews Pro',
    plataforma: 'PC',
    fecha: new Date('2023-07-20').toISOString(),
    año: 2023,
    imagen: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=800&h=600&fit=crop&q=80', // Mapa estratégico
  },
];
