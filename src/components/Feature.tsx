"use client";

import { Play, Star, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "./ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { img, type movieType, tmdb } from "@/lib/tmdb";

type Video = { key: string; type: string; site: string };

export function Feature() {
  const [movies, setMovies] = useState<movieType[]>([]);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  useEffect(() => {
    tmdb
      .get("/movie/now_playing", { params: { page: 1 } })
      .then((response) => setMovies(response.data.results.slice(0, 5)))
      .catch((error) => console.error("Кино татахад алдаа гарлаа:", error));
  }, []);

  const handleWatchTrailer = async (movieId: number) => {
    setLoadingId(movieId);

    try {
      const response = await tmdb.get(`/movie/${movieId}/videos`);
      const trailer = response.data.results.find(
        (video: Video) => video.type === "Trailer" && video.site === "YouTube",
      );

      if (!trailer) {
        alert("Trailer олдсонгүй.");
        return;
      }

      setTrailerKey(trailer.key);
    } catch (error) {
      console.error(error);
      alert("Trailer ачаалахад алдаа гарлаа.");
    } finally {
      setLoadingId(null);
    }
  };

  if (movies.length === 0) {
    return <div className="h-[320px] w-full animate-pulse bg-muted md:h-[600px]" />;
  }

  return (
    <section className="w-full overflow-hidden">
      {trailerKey && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Trailer хаах"
            onClick={() => setTrailerKey(null)}
            className="absolute inset-0 cursor-default bg-black/85"
          />

          <div className="relative aspect-video w-full max-w-5xl">
            <button
              type="button"
              onClick={() => setTrailerKey(null)}
              aria-label="Trailer хаах"
              className="absolute -top-11 right-0 flex size-9 items-center justify-center rounded-full text-white hover:bg-white/10"
            >
              <X className="size-6" />
            </button>

            <iframe
              title="Movie trailer"
              className="size-full rounded-lg"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}

      <Carousel opts={{ align: "start", loop: true }} className="relative w-full">
        <CarouselContent className="ml-0">
          {movies.map((movie) => {
            const backdrop = img(movie.backdrop_path, "original");

            return (
              <CarouselItem key={movie.id} className="pl-0">
                <div
                  className="relative h-[320px] w-full bg-cover bg-center sm:h-[420px] md:h-[600px]"
                  style={{
                    backgroundImage: backdrop ? `url(${backdrop})` : undefined,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

                  <div className="relative z-10 mx-auto flex h-full w-full max-w-[1440px] flex-col justify-center px-5 text-white md:px-20">
                    <div className="max-w-[400px]">
                      <p className="text-sm">Now Playing:</p>

                      <h1 className="mt-1 line-clamp-2 text-3xl font-bold leading-tight md:text-4xl">
                        {movie.title}
                      </h1>

                      <p className="mt-1 flex items-center gap-1 text-sm text-white/70">
                        <Star className="size-5 fill-yellow-400 stroke-yellow-400" />
                        <span className="text-lg font-bold text-white">
                          {movie.vote_average?.toFixed(1)}
                        </span>
                        /10
                      </p>

                      <p className="mt-4 line-clamp-4 text-xs leading-4 md:text-sm md:leading-5">
                        {movie.overview}
                      </p>

                      <Button
                        type="button"
                        onClick={() => handleWatchTrailer(movie.id)}
                        disabled={loadingId === movie.id}
                        className="mt-6 h-10 rounded-md bg-white px-4 text-sm text-black hover:bg-white/90"
                      >
                        <Play className="mr-1 size-4 fill-current" />
                        {loadingId === movie.id ? "Ачаалж байна..." : "Watch Trailer"}
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <CarouselPrevious className="absolute left-4 top-1/2 size-9 -translate-y-1/2 border-white/30 bg-black/30 text-white hover:bg-black/60 hover:text-white" />
        <CarouselNext className="absolute right-4 top-1/2 size-9 -translate-y-1/2 border-white/30 bg-black/30 text-white hover:bg-black/60 hover:text-white" />
      </Carousel>
    </section>
  );
}
