"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { GENRES } from "@/lib/tmdb";

export function GenreDropdown() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const selectGenre = (id: number) => {
    setOpen(false);
    router.push(`/genres?genreIds=${id}`);
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="flex h-9 items-center gap-2 rounded-md border px-3 text-sm font-medium"
      >
        <ChevronDown
          className={`size-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
        Genre
      </button>

      {open && (
        <div className="absolute left-0 top-11 z-50 w-[580px] max-w-[90vw] rounded-lg border bg-background p-5 shadow-lg">
          <h3 className="text-2xl font-semibold tracking-tight">Genres</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            See lists of movies by genre
          </p>

          <div className="mt-4 flex flex-wrap gap-3 border-t pt-4">
            {GENRES.map((genre) => (
              <button
                key={genre.id}
                type="button"
                onClick={() => selectGenre(genre.id)}
                className="flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold hover:bg-secondary"
              >
                {genre.name}
                <ChevronRight className="size-3.5" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
