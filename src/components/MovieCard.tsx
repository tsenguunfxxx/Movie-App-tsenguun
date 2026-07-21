import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { img, type movieType } from "@/lib/tmdb";

const MovieCard = ({ movie }: { movie: movieType }) => {
  const poster = img(movie.poster_path, "w500");

  return (
    <Link
      href={`/movie/${movie.id}`}
      className="group w-full overflow-hidden rounded-lg bg-secondary transition hover:opacity-90"
    >
      <div className="relative aspect-[2/3] w-full bg-muted">
        {poster ? (
          <Image
            src={poster}
            alt={movie.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
            No image
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1 p-2">
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="size-4 fill-yellow-400 stroke-yellow-400" />
          <span className="text-sm font-medium text-foreground">
            {movie.vote_average?.toFixed(1)}
          </span>
          /10
        </p>
        <p className="line-clamp-2 text-sm leading-tight">{movie.title}</p>
      </div>
    </Link>
  );
};

export default MovieCard;
