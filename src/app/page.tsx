"use client";

import { useEffect, useMemo, useState } from "react";
import type { Review, ReviewCategory } from "@/data/reviews";

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className="w-5 h-5 fill-pink-500"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
};

const GameCard = ({ review, rank }: { review: Review; rank?: number }) => {
  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
      <div className="relative h-64 overflow-hidden">
        <img
          src={review.imagen}
          alt={review.titulo}
          className="w-full h-full object-cover"
        />
        {rank && (
          <div className="absolute top-4 left-4 w-14 h-14 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
            #{rank}
          </div>
        )}
        <div className="absolute top-4 right-4">
          <span className="px-4 py-1.5 rounded-full bg-indigo-600 text-white text-sm font-medium shadow-lg">
            {review.categoria}
          </span>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-1">
          {review.titulo}
        </h3>
        <p className="text-sm text-gray-600 mb-3">{review.año}</p>
        <p className="text-sm text-gray-700 mb-4 flex-grow line-clamp-2">
          {review.resumen}
        </p>
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <StarRating rating={review.puntuacion} />
          <span className="text-2xl font-bold text-indigo-600">
            {review.puntuacion}
          </span>
        </div>
      </div>
    </article>
  );
};

type ReviewFormState = {
  nombre: string;
  juego: string;
  categoria: string;
  puntuacion: number;
  resena: string;
};

export default function Home() {
  const [categories, setCategories] = useState<ReviewCategory[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filter, setFilter] = useState<string>("Todos");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [formState, setFormState] = useState<ReviewFormState>({
    nombre: "",
    juego: "",
    categoria: "",
    puntuacion: 9.5,
    resena: "",
  });

  useEffect(() => {
    fetch("/api/reviews")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data.reviews ?? []);
        setCategories(data.categories ?? []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo: formState.juego,
          categoria: formState.categoria,
          puntuacion: formState.puntuacion,
          resumen: formState.resena,
          autor: formState.nombre,
          plataforma: "Multiplataforma",
          año: new Date().getFullYear(),
        }),
      });

      if (res.ok) {
        const { review } = await res.json();
        setReviews((prev) => [review, ...prev]);
        setFormState({
          nombre: "",
          juego: "",
          categoria: "",
          puntuacion: 9.5,
          resena: "",
        });
        alert("¡Reseña enviada exitosamente!");
      }
    } catch (error) {
      alert("Error al enviar la reseña");
    } finally {
      setSubmitting(false);
    }
  };

  const filteredReviews = useMemo(() => {
    let filtered = reviews;
    
    if (filter !== "Todos") {
      filtered = filtered.filter((review) => review.categoria === filter);
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((review) =>
        review.titulo.toLowerCase().includes(query) ||
        review.resumen.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }, [filter, reviews, searchQuery]);

  // Contar reseñas por categoría
  const categoryCount = useMemo(() => {
    const counts: Record<string, number> = {};
    reviews.forEach((review) => {
      counts[review.categoria] = (counts[review.categoria] || 0) + 1;
    });
    return counts;
  }, [reviews]);

  const topRated = useMemo(() => {
    return [...filteredReviews]
      .sort((a, b) => b.puntuacion - a.puntuacion)
      .slice(0, 3);
  }, [filteredReviews]);

  const latestReviews = useMemo(() => {
    return [...filteredReviews].slice(0, 4);
  }, [filteredReviews]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 via-pink-300/20 to-blue-400/20">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1920&h=1080&fit=crop')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(8px)",
            }}
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-gray-900">Reseñas de </span>
            <span className="text-indigo-600">Videojuegos</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Descubre las mejores reseñas, puntuaciones y análisis profesionales de los últimos lanzamientos
          </p>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Buscar juegos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none text-gray-900 bg-white/90 backdrop-blur-sm shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Latest Reviews */}
      {!searchQuery && filter === "Todos" && (
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="flex items-center justify-center gap-3 mb-8">
            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-3xl font-bold text-gray-900">Últimas Reseñas</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              <p className="text-gray-600 col-span-full text-center">Cargando reseñas...</p>
            ) : latestReviews.length === 0 ? (
              <p className="text-gray-600 col-span-full text-center">No hay reseñas disponibles</p>
            ) : (
              latestReviews.map((review) => (
                <GameCard key={review.id} review={review} />
              ))
            )}
          </div>
        </section>
      )}

      {/* Active Filters Banner */}
      {(searchQuery || filter !== "Todos") && (
        <section className="max-w-7xl mx-auto px-4 py-4">
          <div className="bg-indigo-50 border-2 border-indigo-200 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <div>
                <p className="text-indigo-900 font-semibold">
                  Filtros activos: {" "}
                  {filter !== "Todos" && <span className="text-indigo-600">Categoría: {filter}</span>}
                  {filter !== "Todos" && searchQuery && " · "}
                  {searchQuery && <span className="text-indigo-600">Búsqueda: "{searchQuery}"</span>}
                </p>
                <p className="text-indigo-700 text-sm">
                  Mostrando {filteredReviews.length} {filteredReviews.length === 1 ? 'resultado' : 'resultados'}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setFilter("Todos");
                setSearchQuery("");
              }}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Limpiar filtros
            </button>
          </div>
        </section>
      )}

      {/* Category Filters */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center gap-3 mb-8">
          <svg className="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <h2 className="text-3xl font-bold text-gray-900">
            {searchQuery || filter !== "Todos" ? "Resultados de Búsqueda" : "Explorar por Categoría"}
          </h2>
        </div>
        
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <button
            onClick={() => setFilter("Todos")}
            className={`px-6 py-2.5 rounded-full font-medium transition-all flex items-center gap-2 ${
              filter === "Todos"
                ? "bg-indigo-600 text-white shadow-lg scale-105"
                : "bg-white text-gray-700 border-2 border-gray-200 hover:border-indigo-300 hover:scale-105"
            }`}
          >
            Todos
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              filter === "Todos" 
                ? "bg-white/20" 
                : "bg-gray-100"
            }`}>
              {reviews.length}
            </span>
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all flex items-center gap-2 ${
                filter === cat
                  ? "bg-indigo-600 text-white shadow-lg scale-105"
                  : "bg-white text-gray-700 border-2 border-gray-200 hover:border-indigo-300 hover:scale-105"
              }`}
            >
              {cat}
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                filter === cat 
                  ? "bg-white/20" 
                  : "bg-gray-100"
              }`}>
                {categoryCount[cat] || 0}
              </span>
            </button>
          ))}
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-100 rounded-full mb-4 animate-pulse">
                <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-600 text-lg">Cargando reseñas...</p>
            </div>
          ) : filteredReviews.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-700 text-xl font-semibold mb-2">
                {searchQuery 
                  ? `No se encontraron resultados para "${searchQuery}"`
                  : filter === "Todos"
                  ? "No hay reseñas disponibles"
                  : `No hay reseñas de ${filter}`
                }
              </p>
              <p className="text-gray-500 text-sm mt-2">
                {searchQuery || filter !== "Todos"
                  ? "Intenta con otra búsqueda o categoría"
                  : "Sé el primero en agregar una reseña"
                }
              </p>
            </div>
          ) : (
            filteredReviews.map((review) => (
              <GameCard key={review.id} review={review} />
            ))
          )}
        </div>
      </section>

      {/* Top Rated */}
      {topRated.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="flex items-center justify-center gap-3 mb-12">
            <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <h2 className="text-3xl font-bold text-gray-900">
              {searchQuery || filter !== "Todos" ? "Mejor Puntuados (Filtrados)" : "Mejor Puntuados"}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topRated.map((review, index) => (
              <GameCard key={review.id} review={review} rank={index + 1} />
            ))}
          </div>
        </section>
      )}

      {/* Review Form */}
      <section className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <h2 className="text-3xl font-bold text-gray-900">Deja tu Reseña</h2>
          </div>

          <form onSubmit={handleSubmitReview} className="space-y-6">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Tu Nombre
              </label>
              <input
                type="text"
                placeholder="Ej: Juan Pérez"
                value={formState.nombre}
                onChange={(e) => setFormState({ ...formState, nombre: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none text-gray-900 transition-colors"
              />
            </div>

            {/* Juego */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Juego
              </label>
              <input
                type="text"
                placeholder="Ej: The Legend of Zelda: Tears of the Kingdom"
                value={formState.juego}
                onChange={(e) => setFormState({ ...formState, juego: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none text-gray-900 transition-colors"
              />
            </div>

            {/* Categoría */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Categoría
              </label>
              <select
                value={formState.categoria}
                onChange={(e) => setFormState({ ...formState, categoria: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none text-gray-900 transition-colors appearance-none bg-white cursor-pointer"
              >
                <option value="">Selecciona una categoría</option>
                <option value="Acción">Acción</option>
                <option value="RPG">RPG</option>
                <option value="Estrategia">Estrategia</option>
                <option value="Aventura">Aventura</option>
                <option value="Terror">Terror</option>
                <option value="Racing">Racing</option>
                <option value="Deportes">Deportes</option>
                <option value="Puzzle">Puzzle</option>
                <option value="Indie">Indie</option>
              </select>
            </div>

            {/* Puntuación */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  Tu Puntuación (1-10)
                </span>
              </label>
              <input
                type="number"
                min="1"
                max="10"
                step="0.1"
                value={formState.puntuacion}
                onChange={(e) => setFormState({ ...formState, puntuacion: parseFloat(e.target.value) })}
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none text-gray-900 transition-colors"
              />
            </div>

            {/* Reseña */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Tu Reseña
              </label>
              <textarea
                placeholder="Escribe tu opinión sobre el juego, qué te gustó, qué no te gustó..."
                value={formState.resena}
                onChange={(e) => setFormState({ ...formState, resena: e.target.value })}
                required
                rows={5}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none text-gray-900 transition-colors resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 rounded-xl bg-indigo-600 text-white font-bold text-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {submitting ? "Enviando..." : "Enviar Reseña"}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2024 GameReviews Pro. Plataforma profesional de reseñas de videojuegos.
          </p>
        </div>
      </footer>
    </div>
  );
}
