import axios from "axios";

const TOKEN =
  process.env.NEXT_PUBLIC_TMDB_TOKEN ??
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NzA3NmFmYTA4NDE3MDU4ZDc3N2VmZmUxZGIwZmZlYyIsIm5iZiI6MTc3OTI1NDczMi41NTgsInN1YiI6IjZhMGQ0NWNjMmM1NTk4ZmY4MTViZDNjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E5kk_kSFXvEc_eBnNUXl4kSWgBhYohoNw96Om1upV08";

export const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: { Authorization: `Bearer ${TOKEN}` },
  params: { language: "en-US" },
});

const IMAGE_BASE = "https://image.tmdb.org/t/p";

export const img = (path: string | null | undefined, size = "w500") =>
  path ? `${IMAGE_BASE}/${size}${path}` : null;

export type movieType = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type MoviesResponse = {
  page: number;
  results: movieType[];
  total_pages: number;
  total_results: number;
};

export type Genre = { id: number; name: string };

/** TMDB-ийн албан ёсны genre жагсаалт (design дээрх chip-үүд). */
export const GENRES: Genre[] = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Sci-Fi" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

export const CATEGORY_LABELS: Record<string, string> = {
  upcoming: "Upcoming",
  popular: "Popular",
  top_rated: "Top Rated",
  now_playing: "Now Playing",
};
