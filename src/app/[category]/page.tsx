"use client";

import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Footer } from "@/components/Footer";
import MovieCard from "@/components/MovieCard";
import { MoviePagination } from "@/components/MoviePagination";
import Nav from "@/components/Nav";
import {
  CATEGORY_LABELS,
  type MoviesResponse,
  tmdb,
} from "@/lib/tmdb";

const CategoryPage = () => {
  const params = useParams<{ category: string }>();
  const category = params.category;

  const [page, setPage] = useState(1);
  const [data, setData] = useState<MoviesResponse | null>(null);

  useEffect(() => {
    if (!CATEGORY_LABELS[category]) return;

    let cancelled = false;

    tmdb
      .get(`/movie/${category}`, { params: { page } })
      .then((response) => {
        if (!cancelled) setData(response.data);
      })
      .catch((error) => console.error("Кино татахад алдаа гарлаа:", error));

    return () => {
      cancelled = true;
    };
  }, [page, category]);

  if (!CATEGORY_LABELS[category]) notFound();

  // TMDB нь 500-аас цаашгүй хуудас өгдөг.
  const totalPages = Math.min(data?.total_pages ?? 1, 500);

  return (
    <div className="flex min-h-screen flex-col">
      <Nav />

      <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col gap-8 px-5 py-8 md:px-20">
        <h1 className="text-2xl font-semibold tracking-tight">
          {CATEGORY_LABELS[category]}
        </h1>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {data?.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        <MoviePagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </main>

      <Footer />
    </div>
  );
};

export default CategoryPage;
