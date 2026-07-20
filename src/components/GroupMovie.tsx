import MovieCard from "./MovieCard";
import type { movieType } from "@/app/page";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
export const GroupMovie = ({ title }: { title: string }) => {
  const router = useRouter();
  const [movies, setMovies] = useState<movieType[]>([]);
  const pushToSeeMore = () => {
    router.push(title);
  };
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${title}?language=en-US&page=1`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NzA3NmFmYTA4NDE3MDU4ZDc3N2VmZmUxZGIwZmZlYyIsIm5iZiI6MTc3OTI1NDczMi41NTgsInN1YiI6IjZhMGQ0NWNjMmM1NTk4ZmY4MTViZDNjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E5kk_kSFXvEc_eBnNUXl4kSWgBhYohoNw96Om1upV08",
          },
        },
      )
      .then((reponse) => {
        setMovies(reponse.data.results);
      });
  }, [title]);
  console.log(movies);
  return (
    <div className="w-full flex flex-col gap-[52px]">
      <div className="flex flex-col gap-[32px]">
        <div className="w-full flex justify-between px-[50px]">
          <p className="text-[24px] uppercase tracking-tight font-black">
            {title}
          </p>
          <p>
            <button type="button" className="flex" onClick={pushToSeeMore}>
              See more <ChevronRight />
            </button>
          </p>
        </div>

        <div className="grid grid-cols-4 gap-[32px] justify-items-center ">
          {movies.map((movie) => {
            return <MovieCard key={movie.id} movie={movie} />;
          })}
        </div>
      </div>
    </div>
  );
};
