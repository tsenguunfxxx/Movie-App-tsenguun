"use client";

import { ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import { Footer } from "@/components/Footer";
import { MoviePagination } from "@/components/MoviePagination";
import Nav from "@/components/Nav";
import { GENRES, img, type MoviesResponse, tmdb } from "@/lib/tmdb";

const SearchResults = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query") ?? "";

  const [page, setPage] = useState(1);
  const [data, setData] = useState<MoviesResponse | null>(null);
  const [loading, setLoading] = useState(true);

  // Хайлтын үг солигдвол эхний хуудас руу буцна (render үед тохируулна).
  const [prevQuery, setPrevQuery] = useState(query);
  if (prevQuery !== query) {
    setPrevQuery(query);
    setPage(1);
  }

  useEffect(() => {
    if (!query) {
      setData(null);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    tmdb
      .get("/search/movie", { params: { query, page } })
      .then((response) => {
        if (!cancelled) setData(response.data);
      })
      .catch((error) => console.error("Хайхад алдаа гарлаа:", error))
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [query, page]);

  const results = data?.results ?? [];
  const totalPages = Math.min(data?.total_pages ?? 1, 500);

  return (
    <div className="flex min-h-screen flex-col">
      <Nav />

      <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col gap-8 px-5 py-8 md:px-20">
        <h1 className="text-2xl font-semibold tracking-tight">Search results</h1>

        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="flex flex-1 flex-col gap-8">
            <p className="text-xl font-semibold">
              {loading
                ? `Searching “${query}”…`
                : `${data?.total_results ?? 0} results for “${query}”`}
            </p>

            {loading ? (
              <div className="flex flex-col gap-8">
                {[0, 1, 2, 3].map((key) => (
                  <div key={key} className="flex gap-6">
                    <div className="h-[148px] w-[100px] shrink-0 animate-pulse rounded bg-muted" />
                    <div className="flex w-full max-w-[560px] flex-col gap-2 py-1">
                      <div className="h-6 w-1/2 animate-pulse rounded bg-muted" />
                      <div className="h-4 w-1/4 animate-pulse rounded bg-muted" />
                      <div className="h-12 w-full animate-pulse rounded bg-muted" />
                    </div>
                  </div>
                ))}
              </div>
            ) : results.length === 0 ? (
              <div className="flex h-40 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
                No results found.
              </div>
            ) : (
              <div className="flex flex-col gap-8">
                {results.map((movie) => {
                  const poster = img(movie.poster_path, "w185");

                  return (
                    <Link
                      key={movie.id}
                      href={`/movie/${movie.id}`}
                      className="flex gap-6 hover:opacity-90"
                    >
                      <div className="relative h-[148px] w-[100px] shrink-0 overflow-hidden rounded bg-muted">
                        {poster && (
                          <Image
                            src={poster}
                            alt={movie.title}
                            fill
                            sizes="100px"
                            className="object-cover"
                          />
                        )}
                      </div>

                      <div className="flex flex-col justify-between py-1">
                        <div className="flex flex-col gap-1">
                          <p className="text-xl font-semibold leading-tight">
                            {movie.title}
                          </p>
                          <p className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Star className="size-4 fill-yellow-400 stroke-yellow-400" />
                            <span className="text-sm font-medium text-foreground">
                              {movie.vote_average?.toFixed(1)}
                            </span>
                            /10
                          </p>
                          <p className="line-clamp-3 max-w-[560px] text-sm text-muted-foreground">
                            {movie.overview}
                          </p>
                        </div>

                        <p className="text-sm">
                          {movie.release_date?.slice(0, 4)}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}

            <MoviePagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>

          <aside className="w-full shrink-0 border-t pt-6 lg:w-[390px] lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <h2 className="text-2xl font-semibold tracking-tight">
              Search by genre
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              See lists of movies by genre
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              {GENRES.map((genre) => (
                <button
                  key={genre.id}
                  type="button"
                  onClick={() => router.push(`/genres?genreIds=${genre.id}`)}
                  className="flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold hover:bg-secondary"
                >
                  {genre.name}
                  <ChevronRight className="size-3.5" />
                </button>
              ))}
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-10 text-sm">Loading...</div>}>
      <SearchResults />
    </Suspense>
  );
}
