"use client";

import { Search, Star, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { img, type movieType, tmdb } from "@/lib/tmdb";

export function Searchbar() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [results, setResults] = useState<movieType[]>([]);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Debounce — бичих болгонд биш, 400ms завсарлагатай хайна.
  useEffect(() => {
    const query = value.trim();

    if (!query) {
      setResults([]);
      return;
    }

    const timer = setTimeout(() => {
      tmdb
        .get("/search/movie", { params: { query, page: 1 } })
        .then((response) => setResults(response.data.results.slice(0, 5)))
        .catch(() => setResults([]));
    }, 400);

    return () => clearTimeout(timer);
  }, [value]);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  const submit = () => {
    const query = value.trim();
    if (!query) return;
    setOpen(false);
    router.push(`/search?query=${encodeURIComponent(query)}`);
  };

  const showDropdown = open && value.trim().length > 0;

  return (
    <div className="relative w-full max-w-[380px]" ref={wrapperRef}>
      <div className="flex h-9 items-center gap-2 rounded-md border px-3">
        <Search className="size-4 shrink-0 text-muted-foreground" />
        <input
          type="text"
          value={value}
          placeholder="Search..."
          onChange={(event) => setValue(event.target.value)}
          onFocus={() => setOpen(true)}
          onKeyDown={(event) => {
            if (event.key === "Enter") submit();
            if (event.key === "Escape") setOpen(false);
          }}
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
        {value && (
          <button
            type="button"
            aria-label="Цэвэрлэх"
            onClick={() => setValue("")}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {showDropdown && (
        <div className="absolute left-0 top-11 z-50 w-full rounded-lg border bg-background p-3 shadow-lg">
          {results.length === 0 ? (
            <p className="py-4 text-center text-sm text-muted-foreground">
              No results found.
            </p>
          ) : (
            <>
              <div className="flex flex-col">
                {results.map((movie) => {
                  const poster = img(movie.poster_path, "w185");

                  return (
                    <Link
                      key={movie.id}
                      href={`/movie/${movie.id}`}
                      onClick={() => setOpen(false)}
                      className="flex gap-3 rounded-md p-2 hover:bg-secondary"
                    >
                      <div className="relative h-[90px] w-[60px] shrink-0 overflow-hidden rounded bg-muted">
                        {poster && (
                          <Image
                            src={poster}
                            alt={movie.title}
                            fill
                            sizes="60px"
                            className="object-cover"
                          />
                        )}
                      </div>

                      <div className="flex flex-col justify-center gap-1">
                        <p className="text-base font-semibold leading-tight">
                          {movie.title}
                        </p>
                        <p className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Star className="size-3.5 fill-yellow-400 stroke-yellow-400" />
                          <span className="font-medium text-foreground">
                            {movie.vote_average?.toFixed(1)}
                          </span>
                          /10
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {movie.release_date?.slice(0, 4)}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={submit}
                className="mt-2 w-full border-t pt-3 text-left text-sm hover:underline"
              >
                See all results for &ldquo;{value.trim()}&rdquo;
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
