// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";

// import axios from "axios";
// import { CardContent } from "@/components/ui/card";
// import Image from "next/image";
// import { Play, Star } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import Nav from "@/components/Nav";
// export type MovieDetail = {
//   adult: boolean;
//   backdrop_path: string;
//   rating: number | string;

//   belongs_to_collection: {
//     id: number;
//     name: string;
//     poster_path: string;
//     backdrop_path: string;
//   } | null;

//   budget: number;

//   genres: {
//     id: number;
//     name: string;
//   }[];

//   homepage: string;
//   id: number;
//   imdb_id: string;

//   origin_country: string[];

//   original_language: string;
//   original_title: string;

//   overview: string;
//   popularity: number;

//   poster_path: string;

//   production_companies: {
//     id: number;
//     logo_path: string | null;
//     name: string;
//     origin_country: string;
//   }[];

//   production_countries: {
//     iso_3166_1: string;
//     name: string;
//   }[];

//   release_date: string;
//   revenue: number;
//   runtime: number;

//   softcore: boolean;

//   spoken_languages: {
//     english_name: string;
//     iso_639_1: string;
//     name: string;
//   }[];

//   status: string;
//   tagline: string;
//   title: string;

//   video: boolean;

//   vote_average: number;
//   vote_count: number;
//   name: "Actor Name";
//   character: "Role";
// };

// const Demo = () => {
//   const params = useParams();
//   console.log(params, "kkkkkk");
//   const [movie, setMovie] = useState<MovieDetail>();

//   useEffect(() => {
//     axios
//       .get(` https://api.themoviedb.org/3/movie/${params.id}`, {
//         headers: {
//           Authorization:
//             "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NzA3NmFmYTA4NDE3MDU4ZDc3N2VmZmUxZGIwZmZlYyIsIm5iZiI6MTc3OTI1NDczMi41NTgsInN1YiI6IjZhMGQ0NWNjMmM1NTk4ZmY4MTViZDNjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E5kk_kSFXvEc_eBnNUXl4kSWgBhYohoNw96Om1upV08",
//         },
//       })
//       .then((reponse) => {
//         setMovie(reponse.data);
//       });
//   }, [params.id]);
//   axios.get(``);

//   console.log(movie?.genres);
//   return (
//     <div className="flex flex-col gap-[10px] ">
//       <div>
//         <Nav></Nav>
//       </div>
//       <div className="w-full flex flex-col items-center justify-center gap-[10px]">
//         <div className="w-[1080px] h-[72px] flex justify-between">
//           <div>
//             <p className="text-[36px] uppercase tracking-tight font-black">
//               {movie?.title}
//             </p>
//             <h1>
//               {movie?.release_date} · PG · {movie?.runtime} Min
//             </h1>
//           </div>
//           <p className=" flex gap-1 text-gray-400">
//             <Star fill="yellow" stroke="yellow" />
//             <span className="text-black">{movie?.vote_average}</span>
//             /10
//           </p>
//         </div>
//         <div className="w-[1080px] h-[428px] flex gap-[32px]">
//           <CardContent className="w-[280px] px-0 ">
//             <Image
//               src={`https://image.tmdb.org/t/p/w300${movie?.poster_path}`}
//               alt="card-image"
//               width={290}
//               height={428}
//               className="h-[428px] w-full object-contain object-fill"
//             />
//           </CardContent>

//           <div
//             className="  w-[760px]  h-[428px] bg-cover bg-center bg-no-repeat relative pt-[364px] pr-[562px] pb-[24px] pl-[24px] "
//             style={{
//               backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})`,
//             }}
//           >
//             <div className="absolute inset-0 bg-black/30" />

//             <div className="relative z-10 flex h-full max-w-[1200px] flex-col justify-center  text-white ">
//               <div className="mt-4 flex items-center gap-2"> </div>

//               <Button className="mt-6 w-fit bg-white text-black hover:bg-white/90 rounded-full w-[40px] h-[40px] py-2 px-4 mt-[0px]">
//                 <Play size={16} />
//               </Button>
//             </div>
//           </div>
//         </div>
//         <div className="flex flex-col gap-3">
//           <div className="flex  w-[423px] h-[20px items-center gap-[12px]">
//             <h1 className="border  py-[2px] px-[10px] rounded-full items-center justify-center">
//               {movie?.original_title}
//             </h1>
//             {movie?.genres?.map((genre) => (
//               <p
//                 key={genre.id}
//                 className="border py-[2px] px-[10px] rounded-full flex items-center justify-center"
//               >
//                 {genre.name}
//               </p>
//             ))}
//           </div>
//           <p className=" max-w-[1080px]    ">{movie?.overview}</p>
//           <div className="flex flex-col text-16px   tracking-tight font-black gap-[20px] w-[1080px] h-[271px]">
//             <p>Director</p>
//             <p>Writers</p>
//             <p>Stars</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Demo;
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Play, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Nav from "@/components/Nav";

export type MovieDetail = {
  adult: boolean;
  backdrop_path: string;
  rating: number | string;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  } | null;
  budget: number;
  genres: { id: number; name: string }[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: { iso_3166_1: string; name: string }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

type CastMember = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
};

type CrewMember = {
  id: number;
  name: string;
  job: string;
};
type SimilarMovie = {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
};
const BEARER =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NzA3NmFmYTA4NDE3MDU4ZDc3N2VmZmUxZGIwZmZlYyIsIm5iZiI6MTc3OTI1NDczMi41NTgsInN1YiI6IjZhMGQ0NWNjMmM1NTk4ZmY4MTViZDNjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E5kk_kSFXvEc_eBnNUXl4kSWgBhYohoNw96Om1upV08";

const Demo = () => {
  const params = useParams();
  const [movie, setMovie] = useState<MovieDetail>();
  const [similarMovies, setSimilarMovies] = useState<SimilarMovie[]>([]);
  // Credits
  const [director, setDirector] = useState<string>("");
  const [writers, setWriters] = useState<string[]>([]);
  const [cast, setCast] = useState<CastMember[]>([]);

  // Trailer
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [showTrailer, setShowTrailer] = useState(false);

  const headers = { Authorization: BEARER };
  useEffect(() => {
    if (!params.id) return;

    // 1. Кино мэдээлэл
    axios
      .get(`https://api.themoviedb.org/3/movie/${params.id}`, { headers })
      .then((res) => setMovie(res.data));

    // 2. Credits
    axios
      .get(`https://api.themoviedb.org/3/movie/${params.id}/credits`, {
        headers,
      })
      .then((res) => {
        const crew: CrewMember[] = res.data.crew;
        const castList: CastMember[] = res.data.cast;
        const dir = crew.find((c) => c.job === "Director");
        setDirector(dir?.name ?? "");
        const writerList = crew
          .filter((c) => c.job === "Screenplay" || c.job === "Writer")
          .map((c) => c.name);
        setWriters(writerList);
        setCast(castList.slice(0, 5));
      });

    // 3. Trailer
    axios
      .get(`https://api.themoviedb.org/3/movie/${params.id}/videos`, {
        headers,
      })
      .then((res) => {
        const trailer = res.data.results.find(
          (v: { type: string; site: string; key: string }) =>
            v.type === "Trailer" && v.site === "YouTube",
        );
        if (trailer) setTrailerKey(trailer.key);
      });

    // 4. Similar Movies
    axios
      .get(`https://api.themoviedb.org/3/movie/${params.id}/similar`, {
        headers,
      })
      .then((res) => {
        console.log("Similar movies:", res.data.results);
        setSimilarMovies(res.data.results.slice(0, 8));
      })
      .catch((err) => {
        console.log("Similar movies error:", err);
      });
  }, [params.id]);

  useEffect(() => {
    if (!params.id) return;

    // 1. Кино мэдээлэл
    axios
      .get(`https://api.themoviedb.org/3/movie/${params.id}`, { headers })
      .then((res) => setMovie(res.data));

    // 2. Credits (Director, Writers, Stars)
    axios
      .get(`https://api.themoviedb.org/3/movie/${params.id}/credits`, {
        headers,
      })
      .then((res) => {
        const crew: CrewMember[] = res.data.crew;
        const castList: CastMember[] = res.data.cast;

        // Director
        const dir = crew.find((c) => c.job === "Director");
        setDirector(dir?.name ?? "");

        // Writers (Screenplay / Writer)
        const writerList = crew
          .filter((c) => c.job === "Screenplay" || c.job === "Writer")
          .map((c) => c.name);
        setWriters(writerList);

        // Top 5 cast
        setCast(castList.slice(0, 5));
      });

    // 3. Trailer (YouTube)
    axios
      .get(`https://api.themoviedb.org/3/movie/${params.id}/videos`, {
        headers,
      })
      .then((res) => {
        const trailer = res.data.results.find(
          (v: { type: string; site: string; key: string }) =>
            v.type === "Trailer" && v.site === "YouTube",
        );
        if (trailer) setTrailerKey(trailer.key);
      });
  }, [params.id]);

  return (
    <div className="flex flex-col gap-[10px]">
      <Nav />

      <div className="w-full flex flex-col items-center justify-center gap-[10px]">
        {/* Гарчиг */}
        <div className="w-[1080px] h-[72px] flex justify-between">
          <div>
            <p className="text-[36px] uppercase tracking-tight font-black">
              {movie?.title}
            </p>
            <h1>
              {movie?.release_date} · PG · {movie?.runtime} Min
            </h1>
          </div>
          <p className="flex gap-1 text-gray-400">
            <Star fill="yellow" stroke="yellow" />
            <span className="text-black">{movie?.vote_average}</span>
            /10
          </p>
        </div>

        {/* Poster + Backdrop */}
        <div className="w-[1080px] h-[428px] flex gap-[32px]">
          <CardContent className="w-[280px] px-0">
            <Image
              src={`https://image.tmdb.org/t/p/w300${movie?.poster_path}`}
              alt="poster"
              width={290}
              height={428}
              className="h-[428px] w-full object-contain object-fill"
            />
          </CardContent>

          <div
            className="w-[760px] h-[428px] bg-cover bg-center bg-no-repeat relative"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})`,
            }}
          >
            <div className="absolute inset-0 bg-black/30" />

            {/* Play товч → trailer нээнэ */}
            <div className="relative z-10 flex h-full items-end p-6">
              <Button
                onClick={() => trailerKey && setShowTrailer(true)}
                className="bg-white text-black hover:bg-white/90 rounded-full w-[48px] h-[48px] p-0 flex items-center justify-center"
                title="Watch Trailer"
              >
                <Play size={18} fill="black" />
              </Button>
              {trailerKey && (
                <span className="ml-3 text-white text-sm font-medium  mb-[13px]">
                  Watch Trailer
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Genres + Overview + Credits */}
        <div className="flex flex-col gap-4 w-[1080px]">
          {/* Genre badges */}
          <div className="flex flex-wrap items-center gap-[12px]">
            <h1 className="border py-[2px] px-[10px] rounded-full">
              {movie?.original_title}
            </h1>
            {movie?.genres?.map((genre) => (
              <p
                key={genre.id}
                className="border py-[2px] px-[10px] rounded-full"
              >
                {genre.name}
              </p>
            ))}
          </div>

          {/* Overview */}
          <p className="max-w-[1080px]">{movie?.overview}</p>

          {/* Director / Writers / Stars */}
          <div className="flex flex-col gap-[16px] w-[1080px] border-t pt-4">
            {/* Director */}
            <div className="flex gap-[12px] items-center border-b pb-3">
              <p className="font-black text-[16px] w-[100px] shrink-0">
                Director
              </p>
              <p className="text-gray-700 dark:text-gray-300">{director}</p>
            </div>

            {/* Writers */}
            <div className="flex gap-[12px] items-center border-b pb-3">
              <p className="font-black text-[16px] w-[100px] shrink-0">
                Writers
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                {writers.length > 0 ? writers.join(", ") : "—"}
              </p>
            </div>

            {/* Stars */}
            <div className="flex gap-[12px] items-start">
              <p className="font-black text-[16px] w-[100px] shrink-0 pt-1">
                Stars
              </p>
              <div className="flex flex-wrap gap-3">
                {cast.map((actor) => (
                  <div key={actor.id} className="flex items-center gap-2">
                    {actor.profile_path ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/w45${actor.profile_path}`}
                        alt={actor.name}
                        width={36}
                        height={36}
                        className="rounded-full object-cover w-[36px] h-[36px]"
                      />
                    ) : (
                      <div className="w-[36px] h-[36px] rounded-full bg-gray-300 flex items-center justify-center text-xs">
                        {actor.name[0]}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-semibold leading-tight">
                        {actor.name}
                      </p>
                      <p className="text-xs text-gray-500">{actor.character}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Similar Movies */}
            <div className="flex flex-col gap-4 w-[1080px] mt-6">
              <h2 className="text-[24px] font-black tracking-tight">
                Similar Movies
              </h2>
              <div className="grid grid-cols-4 gap-4">
                {similarMovies.map((film) => (
                  <div key={film.id}>
                    <Link
                      href={`/movie/${film.id}`}
                      className="flex flex-col gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                    >
                      {film.poster_path ? (
                        <Image
                          src={`https://image.tmdb.org/t/p/w300${film.poster_path}`}
                          alt={film.title}
                          width={240}
                          height={360}
                          className="w-full rounded-lg object-cover aspect-[2/3]"
                        />
                      ) : (
                        <div className="w-full aspect-[2/3] bg-gray-200 rounded-lg flex items-center justify-center text-sm text-gray-500">
                          No Image
                        </div>
                      )}
                      <div className="w-[280px] h-[95px] flex flex-col p-2  object-cover ">
                        <p className=" flex items-center gap-1 text-gray-400">
                          <Star fill="yellow" stroke="yellow" />
                          <span className="text-black">
                            {movie?.vote_average}
                          </span>
                          /10
                        </p>
                        <p className="font-semibold text-sm leading-tight line-clamp-1">
                          {film.title}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── TRAILER MODAL ── */}
      {showTrailer && trailerKey && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setShowTrailer(false)}
        >
          <div
            className="relative w-[90%] max-w-[900px] aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Хаах товч */}
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute -top-10 right-0 text-white hover:opacity-70 transition-opacity"
            >
              <X size={28} />
            </button>

            {/* YouTube iframe */}
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title="Trailer"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="w-full h-full rounded-xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Demo;
