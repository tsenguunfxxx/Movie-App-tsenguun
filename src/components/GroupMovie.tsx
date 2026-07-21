"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import MovieCard from "./MovieCard";
import { CATEGORY_LABELS, type movieType, tmdb } from "@/lib/tmdb";

export const GroupMovie = ({ title }: { title: string }) => {
  const [movies, setMovies] = useState<movieType[]>([]);

  useEffect(() => {
    let cancelled = false;

    tmdb
      .get(`/movie/${title}`, { params: { page: 1 } })
      .then((response) => {
        if (!cancelled) setMovies(response.data.results.slice(0, 10));
      })
      .catch((error) => {
        console.error(`${title} татахад алдаа гарлаа:`, error);
      });

    return () => {
      cancelled = true;
    };
  }, [title]);

  return (
    <section className="flex w-full flex-col gap-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">
          {CATEGORY_LABELS[title] ?? title}
        </h2>

        <Link
          href={`/${title}`}
          className="flex items-center gap-1 text-sm hover:underline"
        >
          See more
          <ChevronRight className="size-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};
