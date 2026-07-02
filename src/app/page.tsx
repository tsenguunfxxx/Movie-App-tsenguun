"use client";

import { Suspense } from "react";
import { Feature } from "@/components/Feature";
import { Footer } from "@/components/Footer";
import Nav from "@/components/Nav";
import { GroupMovie } from "@/components/GroupMovie";

export interface movieType {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export default function Home() {
  return (
    <div className="flex flex-col justify-center">
      <Suspense fallback={<div>Loading...</div>}>
        <Nav />
      </Suspense>

      <Feature />

      <div className="w-full flex flex-col gap-[32px] px-15">
        <GroupMovie title="upcoming" />
        <GroupMovie title="top_rated" />
        <GroupMovie title="popular" />
      </div>

      <Footer />
    </div>
  );
}
