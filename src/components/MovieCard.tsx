import { Star } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import type { movieType } from "@/app/page";
import Link from "next/link";

const MovieCard = ({ movie }: { movie: movieType }) => {
  return (
    <Link href={`/movie/${movie.id}`}>
      <Card className="w-[280px] py-0 rounded-lg">
        <CardContent className="w-[280px] px-0 ">
          <Image
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt="card-image"
            width={280}
            height={340}
            className="h-[340px] w-full     object-contain object-fill"
          />

          <div className="w-[280px] h-[95px] flex flex-col p-2  object-cover  ">
            <p className=" flex items-center gap-1 text-gray-400">
              <Star fill="yellow" stroke="yellow" />
              <span className="text-black">{movie.vote_average}</span>
              /10
            </p>
            <p className="text-[18px]">{movie.title}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MovieCard;
