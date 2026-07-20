"use client";

import { Play, X } from "lucide-react";
import axios from "axios";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Movie = {
  id: number;
  title: string;
  backdrop_path: string;
  vote_average: number;
  overview: string;
};

type Video = {
  key: string;
  type: string;
  site: string;
};

export function Feature() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [translatedOverviews, setTranslatedOverviews] = useState<{
    [key: number]: string;
  }>({});

  const TOKEN =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NzA3NmFmYTA4NDE3MDU4ZDc3N2VmZmUxZGIwZmZlYyIsIm5iZiI6MTc3OTI1NDczMi41NTgsInN1YiI6IjZhMGQ0NWNjMmM1NTk4ZmY4MTViZDNjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E5kk_kSFXvEc_eBnNUXl4kSWgBhYohoNw96Om1upV08";

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
          {
            headers: {
              Authorization: TOKEN,
            },
          },
        );

        setMovies(response.data.results);
      } catch (error) {
        console.error("Кино татахад алдаа гарлаа:", error);
      }
    };

    getMovies();
  }, []);

  const translateText = async (text: string) => {
    try {
      const response = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=mn&dt=t&q=${encodeURIComponent(
          text,
        )}`,
      );

      const data = await response.json();

      return data[0]
        .map((item: [string]) => item[0])
        .join("");
    } catch {
      return text;
    }
  };

  useEffect(() => {
    if (movies.length === 0) return;

    const translateAllMovies = async () => {
      const result: Record<number, string> = {};

      for (const movie of movies) {
        if (movie.overview) {
          result[movie.id] = await translateText(movie.overview);
        }
      }

      setTranslatedOverviews(result);
    };

    translateAllMovies();
  }, [movies]);

  const handleWatchTrailer = async (movieId: number) => {
    setLoadingId(movieId);

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        {
          headers: {
            Authorization: TOKEN,
          },
        },
      );

      const trailer = response.data.results.find(
        (video: Video) =>
          video.type === "Trailer" && video.site === "YouTube",
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

  const closeModal = () => {
    setTrailerKey(null);
  };

  return (
    <section className="w-full overflow-hidden">
      {trailerKey && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-6"
          onClick={closeModal}
        >
          <div
            className="relative aspect-video w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeModal}
              aria-label="Trailer хаах"
              className="absolute -top-10 right-0 flex size-9 items-center justify-center rounded-full text-white transition hover:bg-white/10 sm:-top-12 sm:size-10"
            >
              <X className="size-6 sm:size-7" />
            </button>

            <iframe
              title="Movie trailer"
              className="h-full w-full rounded-lg sm:rounded-xl"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="m-0">
          {movies.map((movie) => (
            <CarouselItem key={movie.id} className="pl-0">
              <div
                className="
                  relative
                  min-h-[520px]
                  w-full
                  bg-cover
                  bg-center
                  sm:min-h-[600px]
                  md:min-h-[700px]
                  lg:min-h-[820px]
                  xl:min-h-[880px]
                "
                style={{
                  backgroundImage: movie.backdrop_path
                    ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
                    : "none",
                }}
              >
                <div className="absolute inset-0 bg-black/45" />

                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/45 to-transparent" />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

                <div
                  className="
                    relative
                    z-10
                    mx-auto
                    flex
                    min-h-[520px]
                    w-full
                    max-w-7xl
                    flex-col
                    justify-end
                    px-4
                    pb-16
                    pt-28
                    text-white
                    sm:min-h-[600px]
                    sm:px-6
                    sm:pb-20
                    md:min-h-[700px]
                    md:justify-center
                    md:px-12
                    md:pb-0
                    md:pt-24
                    lg:min-h-[820px]
                    lg:px-20
                    xl:min-h-[880px]
                  "
                >
                  <div className="max-w-xl lg:max-w-2xl">
                    <p className="mb-2 text-sm font-medium text-white/80 sm:text-base md:text-lg">
                      Now Playing
                    </p>

                    <h1
                      className="
                        line-clamp-2
                        text-3xl
                        font-bold
                        leading-tight
                        sm:text-4xl
                        md:text-5xl
                        lg:text-6xl
                        xl:text-7xl
                      "
                    >
                      {movie.title}
                    </h1>

                    <div className="mt-3 flex items-center gap-2 sm:mt-4">
                      <span className="rounded-md bg-yellow-500 px-2 py-1 text-sm font-semibold text-black sm:text-base">
                        IMDb
                      </span>

                      <span className="text-base font-medium sm:text-lg md:text-xl">
                        {movie.vote_average?.toFixed(1)}
                      </span>
                    </div>

                    <p
                      className="
                        mt-4
                        line-clamp-3
                        max-w-md
                        text-sm
                        leading-6
                        text-white/85
                        sm:mt-5
                        sm:text-base
                        md:line-clamp-4
                        md:max-w-xl
                        md:leading-7
                      "
                    >
                      {translatedOverviews[movie.id] || movie.overview}
                    </p>

                    <Button
                      type="button"
                      onClick={() => handleWatchTrailer(movie.id)}
                      disabled={loadingId === movie.id}
                      className="
                        mt-5
                        h-10
                        w-full
                        rounded-lg
                        bg-white
                        px-4
                        text-sm
                        text-black
                        hover:bg-white/90
                        sm:mt-6
                        sm:w-auto
                        sm:px-6
                        sm:text-base
                      "
                    >
                      <Play className="mr-1 size-4 fill-current sm:size-5" />

                      {loadingId === movie.id
                        ? "Ачаалж байна..."
                        : "Trailer үзэх"}
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious
          className="
            absolute
            left-2
            top-1/2
            hidden
            size-9
            -translate-y-1/2
            border-white/30
            bg-black/30
            text-white
            hover:bg-black/60
            hover:text-white
            sm:flex
            md:left-4
            md:size-10
            lg:left-6
          "
        />

        <CarouselNext
          className="
            absolute
            right-2
            top-1/2
            hidden
            size-9
            -translate-y-1/2
            border-white/30
            bg-black/30
            text-white
            hover:bg-black/60
            hover:text-white
            sm:flex
            md:right-4
            md:size-10
            lg:right-6
          "
        />
      </Carousel>
    </section>
  );
}