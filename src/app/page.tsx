import { Feature } from "@/components/Feature";
import { Footer } from "@/components/Footer";
import { GroupMovie } from "@/components/GroupMovie";
import Nav from "@/components/Nav";

export type { movieType } from "@/lib/tmdb";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />

      <main className="flex-1">
        <Feature />

        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-13 px-5 py-13 md:px-20">
          <GroupMovie title="upcoming" />
          <GroupMovie title="popular" />
          <GroupMovie title="top_rated" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
