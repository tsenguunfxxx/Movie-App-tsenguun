// "use client";
// import { Star } from "lucide-react";
// import { Play } from "lucide-react";
// import axios from "axios";
// import { Button } from "./ui/button";
// type Movie = {
//   id: number;
//   title: string;
//   backdrop_path: string;
//   rating: number | string;
//   backdrop: string;
//   overview: string;
// };

// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import { useState, useEffect } from "react";

// export function Feature() {
//   const [movies, setMovies] = useState<Movie[]>([]);

//   useEffect(() => {
//     axios
//       .get(
//         "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
//         {
//           headers: {
//             Authorization:
//               "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NzA3NmFmYTA4NDE3MDU4ZDc3N2VmZmUxZGIwZmZlYyIsIm5iZiI6MTc3OTI1NDczMi41NTgsInN1YiI6IjZhMGQ0NWNjMmM1NTk4ZmY4MTViZDNjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E5kk_kSFXvEc_eBnNUXl4kSWgBhYohoNw96Om1upV08",
//           },
//         },
//       )
//       .then((reponse) => {
//         setMovies(reponse.data.results);
//       });
//   }, []);

//   return (
//     <div className="w-full flex items-center justify-center">
//       <Carousel className="w-full ">
//         <CarouselContent className="m-0">
//           {movies.map((movie, index: number) => (
//             <CarouselItem
//               key={index}
//               className="flex justify-center items-center pl-0"
//             >
//               <div
//                 className="  w-full  h-[880px] bg-cover bg-center bg-no-repeat relative "
//                 style={{
//                   backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})`,
//                 }}
//               >
//                 <div className="absolute inset-0 bg-black/30" />

//                 <div className="relative z-10 flex h-full max-w-[1200px] flex-col justify-center px-10 text-white md:px-24">
//                   <p className="text-lg">Now Playing:</p>

//                   <h1 className="text-5xl font-bold">{movie.title}</h1>

//                   <div className="mt-4 flex items-center gap-2">
//                     <Star className="fill-yellow-400 text-yellow-400" />
//                     <span className="text-xl">{movie.rating}</span>
//                   </div>

//                   <p className="mt-6 max-w-[360px] text-sm leading-5">
//                     {movie.overview}
//                   </p>

//                   <Button className="mt-6 w-fit bg-white text-black hover:bg-white/90 rounded-lg w-[145px] h-[40px] py-2 px-4">
//                     <Play size={16} />
//                     Watch Trailer
//                   </Button>
//                 </div>
//               </div>
//             </CarouselItem>
//           ))}
//         </CarouselContent>
//         <CarouselPrevious className="absolute left-6  " />
//         <CarouselNext className="absolute right-6   " />
//       </Carousel>
//     </div>
//   );
// }
// "use client";
// import { Star, Play, X } from "lucide-react";
// import axios from "axios";
// import { Button } from "./ui/button";

// type Movie = {
//   id: number;
//   title: string;
//   backdrop_path: string;
//   rating: number | string;
//   backdrop: string;
//   overview: string;
// };

// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import { useState, useEffect } from "react";

// export function Feature() {
//   const [movies, setMovies] = useState<Movie[]>([]);
//   const [trailerKey, setTrailerKey] = useState<string | null>(null);
//   const [loadingId, setLoadingId] = useState<number | null>(null);

//   useEffect(() => {
//     axios
//       .get(
//         "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
//         {
//           headers: {
//             Authorization:
//               "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NzA3NmFmYTA4NDE3MDU4ZDc3N2VmZmUxZGIwZmZlYyIsIm5iZiI6MTc3OTI1NDczMi41NTgsInN1YiI6IjZhMGQ0NWNjMmM1NTk4ZmY4MTViZDNjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E5kk_kSFXvEc_eBnNUXl4kSWgBhYohoNw96Om1upV08",
//           },
//         },
//       )
//       .then((response) => {
//         setMovies(response.data.results);
//       });
//   }, []);

//   const handleWatchTrailer = async (movieId: number) => {
//     setLoadingId(movieId);
//     try {
//       const response = await axios.get(
//         `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
//         {
//           headers: {
//             Authorization:
//               "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NzA3NmFmYTA4NDE3MDU4ZDc3N2VmZmUxZGIwZmZlYyIsIm5iZiI6MTc3OTI1NDczMi41NTgsInN1YiI6IjZhMGQ0NWNjMmM1NTk4ZmY4MTViZDNjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E5kk_kSFXvEc_eBnNUXl4kSWgBhYohoNw96Om1upV08",
//           },
//         },
//       );
//       const videos = response.data.results;
//       const trailer = videos.find(
//         (v: { type: string; site: string; key: string }) =>
//           v.type === "Trailer" && v.site === "YouTube",
//       );
//       if (trailer) {
//         setTrailerKey(trailer.key);
//       } else {
//         alert("Trailer олдсонгүй.");
//       }
//     } catch {
//       alert("Trailer ачаалахад алдаа гарлаа.");
//     } finally {
//       setLoadingId(null);
//     }
//   };

//   const closeModal = () => setTrailerKey(null);

//   return (
//     <div className="w-full flex items-center justify-center">
//       {/* Trailer Modal */}
//       {trailerKey && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
//           onClick={closeModal}
//         >
//           <div
//             className="relative w-full max-w-4xl aspect-video mx-4"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               onClick={closeModal}
//               className="absolute -top-10 right-0 text-white hover:text-gray-300 transition"
//             >
//               <X size={32} />
//             </button>
//             <iframe
//               className="w-full h-full rounded-xl"
//               src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
//               allow="autoplay; encrypted-media"
//               allowFullScreen
//             />
//           </div>
//         </div>
//       )}

//       <Carousel className="w-full">
//         <CarouselContent className="m-0">
//           {movies.map((movie, index: number) => (
//             <CarouselItem
//               key={index}
//               className="flex justify-center items-center pl-0"
//             >
//               <div
//                 className="w-full h-[880px] bg-cover bg-center bg-no-repeat relative"
//                 style={{
//                   backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})`,
//                 }}
//               >
//                 <div className="absolute inset-0 bg-black/30" />

//                 <div className="relative z-10 flex h-full max-w-[1200px] flex-col justify-center px-10 text-white md:px-24">
//                   <p className="text-lg">Now Playing:</p>

//                   <h1 className="text-5xl font-bold">{movie.title}</h1>

//                   <div className="mt-4 flex items-center gap-2">
//                     <Star className="fill-yellow-400 text-yellow-400" />
//                     <span className="text-xl">{movie.rating}</span>
//                   </div>

//                   <p className="mt-6 max-w-[360px] text-sm leading-5">
//                     {movie.overview}
//                   </p>

//                   <Button
//                     onClick={() => handleWatchTrailer(movie.id)}
//                     disabled={loadingId === movie.id}
//                     className="mt-6 w-fit bg-white text-black hover:bg-white/90 rounded-lg w-[145px] h-[40px] py-2 px-4"
//                   >
//                     <Play size={16} />
//                     {loadingId === movie.id ? "Loading..." : "Watch Trailer"}
//                   </Button>
//                 </div>
//               </div>
//             </CarouselItem>
//           ))}
//         </CarouselContent>
//         <CarouselPrevious className="absolute left-6" />
//         <CarouselNext className="absolute right-6" />
//       </Carousel>
//     </div>
//   );
// }
"use client";
import { Star, Play, X } from "lucide-react";
import axios from "axios";
import { Button } from "./ui/button";

type Movie = {
  id: number;
  title: string;
  backdrop_path: string;
  vote_average: number;
  overview: string;
};

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState, useEffect } from "react";

export function Feature() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [translatedOverviews, setTranslatedOverviews] = useState<{
    [key: number]: string;
  }>({});

  const TOKEN =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NzA3NmFmYTA4NDE3MDU4ZDc3N2VmZmUxZGIwZmZlYyIsIm5iZiI6MTc3OTI1NDczMi41NTgsInN1YiI6IjZhMGQ0NWNjMmM1NTk4ZmY4MTViZDNjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E5kk_kSFXvEc_eBnNUXl4kSWgBhYohoNw96Om1upV08";

  // MOVIES
  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
        {
          headers: { Authorization: TOKEN },
        },
      )
      .then((response) => {
        setMovies(response.data.results);
      });
  }, []);

  //  TRANSLATE FUNCTION
  const translateText = async (text: string) => {
    try {
      const res = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=mn&dt=t&q=${encodeURIComponent(
          text,
        )}`,
      );
      const data = await res.json();
      return data[0].map((item: any) => item[0]).join("");
    } catch {
      return text;
    }
  };

  // TRANSLATE ALL MOVIES
  useEffect(() => {
    if (movies.length === 0) return;

    const translateAll = async () => {
      const result: { [key: number]: string } = {};

      for (const movie of movies) {
        if (movie.overview) {
          const translated = await translateText(movie.overview);
          result[movie.id] = translated;
        }
      }

      setTranslatedOverviews(result);
    };

    translateAll();
  }, [movies]);

  //  TRAILER
  const handleWatchTrailer = async (movieId: number) => {
    setLoadingId(movieId);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        {
          headers: { Authorization: TOKEN },
        },
      );

      const trailer = response.data.results.find(
        (v: any) => v.type === "Trailer" && v.site === "YouTube",
      );

      if (trailer) {
        setTrailerKey(trailer.key);
      } else {
        alert("Trailer олдсонгүй.");
      }
    } catch {
      alert("Trailer ачаалахад алдаа гарлаа.");
    } finally {
      setLoadingId(null);
    }
  };

  const closeModal = () => setTrailerKey(null);

  return (
    <div className="w-full flex items-center justify-center">
      {trailerKey && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-4xl aspect-video mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute -top-10 right-0 text-white"
            >
              <X size={32} />
            </button>

            <iframe
              className="w-full h-full rounded-xl"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}

      <Carousel className="w-full">
        <CarouselContent className="m-0">
          {movies.map((movie, index) => (
            <CarouselItem key={index} className="pl-0">
              <div
                className="w-full h-[880px] bg-cover bg-center relative"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                }}
              >
                <div className="absolute inset-0 bg-black/30" />

                <div className="relative z-10 flex h-full max-w-[1200px] flex-col justify-center px-10 text-white md:px-24">
                  <p className="text-lg">Now Playing:</p>

                  <h1 className="text-5xl font-bold">{movie.title}</h1>

                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-xl">
                      {movie.vote_average?.toFixed(1)}
                    </span>
                  </div>

                  <p className="mt-6 max-w-[360px] text-sm leading-5">
                    {translatedOverviews[movie.id] || movie.overview}
                  </p>

                  <Button
                    onClick={() => handleWatchTrailer(movie.id)}
                    disabled={loadingId === movie.id}
                    className="mt-6 bg-white text-black hover:bg-white/90 rounded-lg w-[145px] h-[40px]"
                  >
                    <Play size={16} />
                    {loadingId === movie.id
                      ? "Ачаалж байна..."
                      : "Trailer үзэх"}
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute left-6 text-white" />
        <CarouselNext className="absolute right-6 text-white" />
      </Carousel>
    </div>
  );
}
