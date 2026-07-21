"use client";

import { ChevronRight, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import { Footer } from "@/components/Footer";
import MovieCard from "@/components/MovieCard";
import { MoviePagination } from "@/components/MoviePagination";
import Nav from "@/components/Nav";
import { GENRES, type MoviesResponse, tmdb } from "@/lib/tmdb";

const GenreFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedIds = (searchParams.get("genreIds") ?? "")
    .split(",")
    .filter(Boolean)
    .map(Number);

  const [page, setPage] = useState(1);
  const [data, setData] = useState<MoviesResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const genreIdsKey = selectedIds.join(",");

  // Genre сонголт солигдвол эхний хуудас руу буцна.
  const [prevGenreIds, setPrevGenreIds] = useState(genreIdsKey);
  if (prevGenreIds !== genreIdsKey) {
    setPrevGenreIds(genreIdsKey);
    setPage(1);
  }

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    tmdb
      .get("/discover/movie", {
        params: {
          with_genres: genreIdsKey || undefined,
          page,
          sort_by: "popularity.desc",
        },
      })
      .then((response) => {
        if (!cancelled) setData(response.data);
      })
      .catch((error) => console.error("Genre татахад алдаа гарлаа:", error))
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [genreIdsKey, page]);

  const toggleGenre = (id: number) => {
    const next = selectedIds.includes(id)
      ? selectedIds.filter((current) => current !== id)
      : [...selectedIds, id];

    router.push(next.length ? `/genres?genreIds=${next.join(",")}` : "/genres");
  };

  const selectedNames = GENRES.filter((genre) =>
    selectedIds.includes(genre.id),
  ).map((genre) => genre.name);

  const totalPages = Math.min(data?.total_pages ?? 1, 500);

  return (
    <div className="flex min-h-screen flex-col">
      <Nav />

      <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col gap-8 px-5 py-8 md:px-20">
        <h1 className="text-3xl font-semibold tracking-tight">Search filter</h1>

        <div className="flex flex-col gap-8 lg:flex-row">
          <aside className="w-full shrink-0 lg:w-[390px]">
            <h2 className="text-2xl font-semibold tracking-tight">Genres</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              See lists of movies by genre
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              {GENRES.map((genre) => {
                const active = selectedIds.includes(genre.id);

                return (
                  <button
                    key={genre.id}
                    type="button"
                    onClick={() => toggleGenre(genre.id)}
                    className={`flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold transition ${
                      active
                        ? "bg-foreground text-background"
                        : "hover:bg-secondary"
                    }`}
                  >
                    {genre.name}
                    {active ? (
                      <X className="size-3.5" />
                    ) : (
                      <ChevronRight className="size-3.5" />
                    )}
                  </button>
                );
              })}
            </div>
          </aside>

          <div className="flex flex-1 flex-col gap-8 lg:border-l lg:pl-8">
            <p className="text-xl font-semibold">
              {loading ? "Loading…" : `${data?.total_results ?? 0} titles`}
              {selectedNames.length > 0 && ` in “${selectedNames.join(", ")}”`}
            </p>

            {loading ? (
              <div className="grid grid-cols-2 gap-8 md:grid-cols-3 xl:grid-cols-4">
                {[0, 1, 2, 3, 4, 5, 6, 7].map((key) => (
                  <div
                    key={key}
                    className="aspect-[2/3] w-full animate-pulse rounded-lg bg-muted"
                  />
                ))}
              </div>
            ) : data?.results.length === 0 ? (
              <div className="flex h-40 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
                No results found.
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-8 md:grid-cols-3 xl:grid-cols-4">
                {data?.results.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            )}

            <MoviePagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default function GenresPage() {
  return (
    <Suspense fallback={<div className="p-10 text-sm">Loading...</div>}>
      <GenreFilter />
    </Suspense>
  );
}
