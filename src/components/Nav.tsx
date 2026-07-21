"use client";

import { Film } from "lucide-react";
import Link from "next/link";

import { GenreDropdown } from "./GenreDropdown";
import { Searchbar } from "./Searchbar";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

function Nav() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-[1440px] items-center justify-between gap-4 px-5">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 text-[#4338CA]"
        >
          <Film className="size-5" />
          <span className="text-base font-bold italic">Movie Z</span>
        </Link>

        <div className="flex flex-1 items-center justify-center gap-3">
          <div className="hidden sm:block">
            <GenreDropdown />
          </div>
          <Searchbar />
        </div>

        <AnimatedThemeToggler className="flex size-9 shrink-0 items-center justify-center rounded-md border [&_svg]:size-4" />
      </div>
    </header>
  );
}

export default Nav;
