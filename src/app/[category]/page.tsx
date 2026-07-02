"use client";

import MovieCard from "@/components/MovieCard";
import type { movieType } from "@/app/page";
import { useEffect, useState } from "react";
import axios from "axios";
import { ChevronRight } from "lucide-react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useParams } from "next/navigation";
import Nav from "@/components/Nav";

type MoviesResponse = {
  results: movieType[];
  total_pages: number;
};

const Upcoming = () => {
  const params = useParams();
  const [page, setPage] = useState(1);

  const [movies, setMovies] = useState<MoviesResponse>({
    results: [],
    total_pages: 0,
  });

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${params.category}?language=en-US&page=${page}`,
        {
          headers: {
            Authorization: `Bearer YOUR_TOKEN`,
          },
        },
      )
      .then((response) => {
        setMovies(response.data);
      });
  }, [page, params.category]);

  return (
    <div className="w-full flex flex-col gap-[52px]">
      <Nav />

      <div className="flex flex-col gap-[32px]">
        <div className="w-full flex justify-between px-[50px]">
          <p className="text-[24px] uppercase tracking-tight font-black">
            {params.category}
          </p>

          <button type="button" className="flex items-center">
            See more <ChevronRight />
          </button>
        </div>

        <div className="grid grid-cols-5 gap-[32px] justify-items-center">
          {movies.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => page > 1 && setPage(page - 1)}
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={() => setPage(Math.max(page - 1, 1))}
            >
              {Math.max(page - 1, 1)}
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationLink href="#" isActive>
              {page}
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={() => setPage(Math.min(page + 1, movies.total_pages))}
            >
              {Math.min(page + 1, movies.total_pages)}
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={() => setPage(movies.total_pages)}
            >
              {movies.total_pages}
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => page < movies.total_pages && setPage(page + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Upcoming;
//  <PaginationLink onClick={nextPage} href="#" isActive={page === 1}>
//               1
//             </PaginationLink>
//           </PaginationItem>
//           <PaginationItem>
//             <PaginationLink onClick={nextPage} href="#" isActive={page === 2}>
//               2
//             </PaginationLink>
//           </PaginationItem>
//           <PaginationItem>
//             <PaginationLink onClick={nextPage} href="#" isActive={page === 3}>
//               3
//             </PaginationLink>
//   );
//  {Array.from({ length: movies?.total_pages }).map((_, index) => {
//               return (
//                 <PaginationItem className="flex" key={index + Math.random()}>
//                   <PaginationLink
//                     onClick={() => setPage(index + 1)}
//                     href="#"
//                     isActive={page === 1}
//                   >
//                     {index + 1}
// })}
