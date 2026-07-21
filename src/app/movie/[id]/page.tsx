"use client";

import { ChevronRight, Play, Star, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Footer } from "@/components/Footer";
import MovieCard from "@/components/MovieCard";
import Nav from "@/components/Nav";
import { img, type movieType, tmdb } from "@/lib/tmdb";

export type MovieDetail = {
  backdrop_path: string | null;
  genres: { id: number; name: string }[];
  id: number;
  original_title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  runtime: number;
  title: string;
  vote_average: number;
  vote_count: number;
};

type CastMember = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
};

type CrewMember = { id: number; name: string; job: string };

const formatRuntime = (minutes?: number) => {
  if (!minutes) return "—";
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
};

const formatVotes = (count?: number) => {
  if (!count) return "0";
  return count >= 1000 ? `${(count / 1000).toFixed(0)}k` : String(count);
};

const MovieDetailPage = () => {
  const params = useParams<{ id: string }>();

  const [movie, setMovie] = useState<MovieDetail>();
  const [similarMovies, setSimilarMovies] = useState<movieType[]>([]);
  const [director, setDirector] = useState("");
  const [writers, setWriters] = useState<string[]>([]);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    if (!params.id) return;

    tmdb
      .get(`/movie/${params.id}`)
      .then((res) => setMovie(res.data))
      .catch((error) => console.error("Кино татахад алдаа гарлаа:", error));

    tmdb.get(`/movie/${params.id}/credits`).then((res) => {
      const crew: CrewMember[] = res.data.crew;
      const castList: CastMember[] = res.data.cast;

      setDirector(crew.find((member) => member.job === "Director")?.name ?? "");
      setWriters(
        crew
          .filter(
            (member) => member.job === "Screenplay" || member.job === "Writer",
          )
          .map((member) => member.name),
      );
      setCast(castList.slice(0, 5));
    });

    tmdb.get(`/movie/${params.id}/videos`).then((res) => {
      const trailer = res.data.results.find(
        (video: { type: string; site: string; key: string }) =>
          video.type === "Trailer" && video.site === "YouTube",
      );
      setTrailerKey(trailer?.key ?? null);
    });

    tmdb
      .get(`/movie/${params.id}/similar`)
      .then((res) => setSimilarMovies(res.data.results.slice(0, 5)))
      .catch(() => setSimilarMovies([]));
  }, [params.id]);

  const poster = img(movie?.poster_path, "w500");
  const backdrop = img(movie?.backdrop_path, "original");

  return (
    <div className="flex min-h-screen flex-col">
      <Nav />

      <main className="mx-auto flex w-full max-w-[1080px] flex-1 flex-col gap-8 px-5 py-8">
        {/* Гарчиг + үнэлгээ */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              {movie?.title ?? "…"}
            </h1>
            <p className="mt-1 text-sm">
              {movie?.release_date} · PG · {formatRuntime(movie?.runtime)}
            </p>
          </div>

          <div className="shrink-0 text-right">
            <p className="text-xs">Rating</p>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="size-6 fill-yellow-400 stroke-yellow-400" />
              <span className="text-base font-semibold text-foreground">
                {movie?.vote_average?.toFixed(1)}
              </span>
              /10
            </p>
            <p className="text-xs text-muted-foreground">
              {formatVotes(movie?.vote_count)}
            </p>
          </div>
        </div>

        {/* Poster + backdrop */}
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="relative aspect-[2/3] w-full shrink-0 overflow-hidden rounded bg-muted md:h-[428px] md:w-[290px]">
            {poster && (
              <Image
                src={poster}
                alt={movie?.title ?? "poster"}
                fill
                sizes="290px"
                className="object-cover"
                priority
              />
            )}
          </div>

          <div
            className="relative h-[240px] w-full overflow-hidden rounded bg-muted bg-cover bg-center md:h-[428px]"
            style={{
              backgroundImage: backdrop ? `url(${backdrop})` : undefined,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            {trailerKey && (
              <button
                type="button"
                onClick={() => setShowTrailer(true)}
                className="absolute bottom-6 left-6 flex items-center gap-3 text-white"
              >
                <span className="flex size-11 items-center justify-center rounded-full bg-white text-black">
                  <Play className="size-4 fill-current" />
                </span>
                <span className="text-sm font-medium">Play trailer</span>
              </button>
            )}
          </div>
        </div>

        {/* Genre badges */}
        <div className="flex flex-wrap items-center gap-3">
          {movie?.genres?.map((genre) => (
            <Link
              key={genre.id}
              href={`/genres?genreIds=${genre.id}`}
              className="rounded-full border px-2.5 py-0.5 text-xs font-semibold hover:bg-secondary"
            >
              {genre.name}
            </Link>
          ))}
        </div>

        <p className="text-sm leading-6">{movie?.overview}</p>

        {/* Director / Writers / Stars */}
        <div className="flex flex-col">
          <div className="flex gap-8 border-y py-3 text-sm">
            <p className="w-[64px] shrink-0 font-bold">Director</p>
            <p>{director || "—"}</p>
          </div>

          <div className="flex gap-8 border-b py-3 text-sm">
            <p className="w-[64px] shrink-0 font-bold">Writers</p>
            <p>{writers.length > 0 ? writers.join(" · ") : "—"}</p>
          </div>

          <div className="flex gap-8 border-b py-3 text-sm">
            <p className="w-[64px] shrink-0 font-bold">Stars</p>
            <p>{cast.map((actor) => actor.name).join(" · ") || "—"}</p>
          </div>
        </div>

        {/* More like this */}
        {similarMovies.length > 0 && (
          <section className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold tracking-tight">
                More like this
              </h2>
              <Link
                href="/popular"
                className="flex items-center gap-1 text-sm hover:underline"
              >
                See more
                <ChevronRight className="size-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
              {similarMovies.map((film) => (
                <MovieCard key={film.id} movie={film} />
              ))}
            </div>
          </section>
        )}
      </main>

      {showTrailer && trailerKey && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Trailer хаах"
            onClick={() => setShowTrailer(false)}
            className="absolute inset-0 cursor-default bg-black/85"
          />

          <div className="relative aspect-video w-full max-w-5xl">
            <button
              type="button"
              aria-label="Trailer хаах"
              onClick={() => setShowTrailer(false)}
              className="absolute -top-11 right-0 flex size-9 items-center justify-center rounded-full text-white hover:bg-white/10"
            >
              <X className="size-6" />
            </button>

            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title="Trailer"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="size-full rounded-lg"
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default MovieDetailPage;
