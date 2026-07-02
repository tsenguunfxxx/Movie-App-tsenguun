"use client";

import { Suspense } from "react";
import { Feature } from "@/components/Feature";
import { Footer } from "@/components/Footer";
import Nav from "@/components/Nav";
import { GroupMovie } from "@/components/GroupMovie";

// ...interface movieType

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
