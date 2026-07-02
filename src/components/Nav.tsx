// "use client";
// import Image from "next/image";
// import { ChevronDown } from "lucide-react";
// import { Search } from "lucide-react";
// import { Moon } from "lucide-react";
// import { Button } from "./ui/button";
// import Link from "next/link";
// import { useRouter, useSearchParams } from "next/navigation";
// import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
// import { useState } from "react";
// function Nav() {
//   const searchParams = useSearchParams();
//   const search = searchParams.get("name");
//   const router = useRouter();
//   const [value, setValue] = useState();
//   const handleChange = (e) => {};
//   const { value } = e.target;
//   setValue(value);
//   const handleClick = () => {
//     router.push(`/new-search?name=${value}`);
//   };
//   return (
//     <div className=" flex justify-between w-full p-5">
//       <div className="flex items-center gap-1">
//         <Image src="/film.svg" alt="film" width={20} height={20} />

//         <div className="text-[#4338CA] text-[16px]">
//           <Link href="/">Movie Z</Link>
//         </div>
//       </div>
//       <div className="flex items-center gap-3">
//         <button className="flex items-center gap-2 px-4 py-2   border rounded-lg text-[14px]">
//           <ChevronDown className="w-4 h-4 rounded-md " />
//           Genre
//         </button>
//         <div>
//           Search:{search}
//           <input type="text" onChange={handleChange} />
//           <button onClick={handleClick}>Search</button>
//           {/* <Search className="text-gray-400 w-[15px] h-[15px] " />
//           <input
//             type="search"
//             placeholder="Search... "
//             className="focus:outline-none focus:border-transparent w-[379px]"
//           /> */}
//         </div>
//       </div>

//       <Button className="w-[36px] h-[36px] border rounded-[10px] flex items-center justify-center ">
//         <AnimatedThemeToggler />
//       </Button>
//     </div>
//   );
// }
// export default Nav;
"use client";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { useState } from "react";

function Nav() {
  const searchParams = useSearchParams();
  const search = searchParams.get("name");
  const router = useRouter();
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClick = () => {
    router.push(`/new-search?name=${value}`);
  };

  return (
    <div className="flex justify-between w-full p-5">
      <div className="flex items-center gap-1">
        <Image src="/film.svg" alt="film" width={20} height={20} />
        <div className="text-[#4338CA] text-[16px]">
          <Link href="/">Movie Z</Link>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-[14px]">
          <ChevronDown className="w-4 h-4 rounded-md" />
          Genre
        </button>
        <div className="flex gap-2">
          Search: {search}
          <input type="text" onChange={handleChange} className="border-2" />
          <button className="border-2" onClick={handleClick}>
            Search
          </button>
        </div>
      </div>
      <Button className="w-[36px] h-[36px] border rounded-[10px] flex items-center justify-center">
        <AnimatedThemeToggler />
      </Button>
    </div>
  );
}

export default Nav;
