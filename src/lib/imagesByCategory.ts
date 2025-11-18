// Pool de múltiples imágenes por categoría - cada juego tendrá una imagen diferente
export const imagePoolByCategory: Record<string, string[]> = {
  // RPG - Fantasía épica, dragones, caballeros, magia
  'RPG': [
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&h=600&fit=crop&q=80', // Dragón
    'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&h=600&fit=crop&q=80', // Caballero medieval
    'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800&h=600&fit=crop&q=80', // Castillo
    'https://images.unsplash.com/photo-1451847251646-8a6c0dd1510c?w=800&h=600&fit=crop&q=80', // Magia/fantasía
    'https://images.unsplash.com/photo-1563089145-599997674d42?w=800&h=600&fit=crop&q=80', // Espada medieval
  ],
  
  // Acción - Cyberpunk, neón, futurista, combate
  'Acción': [
    'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&h=600&fit=crop&q=80', // Neón cyberpunk
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop&q=80', // Tecnología futurista
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop&q=80', // Ciudad nocturna
    'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&h=600&fit=crop&q=80', // Acción urbana
    'https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?w=800&h=600&fit=crop&q=80', // Luces de neón
  ],
  
  // Estrategia - Guerra, táctica, batallas, ajedrez
  'Estrategia': [
    'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=800&h=600&fit=crop&q=80', // Batalla táctica
    'https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=800&h=600&fit=crop&q=80', // Mapa estratégico
    'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800&h=600&fit=crop&q=80', // Tablero ajedrez
    'https://images.unsplash.com/photo-1529055997299-4a6f00b37c3b?w=800&h=600&fit=crop&q=80', // Guerra medieval
    'https://images.unsplash.com/photo-1606324815029-d76c65ba8e24?w=800&h=600&fit=crop&q=80', // Estrategia militar
  ],
  
  // Aventura - Naturaleza, exploración, paisajes, montañas
  'Aventura': [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&q=80', // Montañas épicas
    'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop&q=80', // Ruinas antiguas
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop&q=80', // Bosque misterioso
    'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop&q=80', // Océano exploración
    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=600&fit=crop&q=80', // Lago y montañas
  ],
  
  // Terror - Oscuridad, misterio, suspenso, horror
  'Terror': [
    'https://images.unsplash.com/photo-1509043759401-136742328bb3?w=800&h=600&fit=crop&q=80', // Oscuridad atmosférica
    'https://images.unsplash.com/photo-1603513492128-ba7bc9b3e143?w=800&h=600&fit=crop&q=80', // Casa embrujada
    'https://images.unsplash.com/photo-1544306094-e2dcf9479da3?w=800&h=600&fit=crop&q=80', // Bosque tenebroso
    'https://images.unsplash.com/photo-1551847527-c7d3c4339adc?w=800&h=600&fit=crop&q=80', // Abandono inquietante
    'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=800&h=600&fit=crop&q=80', // Niebla misteriosa
  ],
  
  // Racing - Carros deportivos, velocidad, pistas
  'Racing': [
    'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&h=600&fit=crop&q=80', // Auto deportivo rojo
    'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop&q=80', // McLaren velocidad
    'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop&q=80', // Ferrari rojo
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop&q=80', // BMW deportivo
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop&q=80', // Porsche clásico
  ],
  
  // Deportes - Fútbol, baloncesto, estadios, atletas
  'Deportes': [
    'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=600&fit=crop&q=80', // Estadio fútbol
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=600&fit=crop&q=80', // Baloncesto cancha
    'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&h=600&fit=crop&q=80', // Fútbol americano
    'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=800&h=600&fit=crop&q=80', // Tenis profesional
    'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&h=600&fit=crop&q=80', // Gimnasio deportivo
  ],
  
  // Puzzle - Abstracto, colores, mental, rompecabezas
  'Puzzle': [
    'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&h=600&fit=crop&q=80', // Rompecabezas abstracto
    'https://images.unsplash.com/photo-1560762484-813fc97650a0?w=800&h=600&fit=crop&q=80', // Cubos coloridos
    'https://images.unsplash.com/photo-1515705576963-95cad62945b6?w=800&h=600&fit=crop&q=80', // Cubo Rubik
    'https://images.unsplash.com/photo-1587731556938-38755b4803a6?w=800&h=600&fit=crop&q=80', // Tetris visual
    'https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=800&h=600&fit=crop&q=80', // Patrón geométrico
  ],
  
  // Indie - Arte único, creativo, pixel art, estilo artístico
  'Indie': [
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop&q=80', // Arte urbano
    'https://images.unsplash.com/photo-1561998338-13ad7883b20f?w=800&h=600&fit=crop&q=80', // Pixel art style
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&q=80', // Arte retro
    'https://images.unsplash.com/photo-1618172193622-ae2d025f4032?w=800&h=600&fit=crop&q=80', // Estilo único
    'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=600&fit=crop&q=80', // Creativo artístico
  ],
};

// Función helper para obtener una imagen aleatoria según la categoría
export function getImageByCategory(categoria: string): string {
  const images = imagePoolByCategory[categoria] || imagePoolByCategory['Acción'];
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
}

// Función para obtener una imagen específica por categoría e índice
export function getImageByCategoryAndIndex(categoria: string, index: number): string {
  const images = imagePoolByCategory[categoria] || imagePoolByCategory['Acción'];
  return images[index % images.length];
}

