import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Movie Z",
  description: "Кино хайх, trailer үзэх, санал болгосон кинонуудыг үзэх апп.",
};

// Хуудас ачаалахаас өмнө сонгосон theme-г сэргээнэ (dark mode refresh дээр алдагдахгүй).
const themeScript = `
try {
  if (localStorage.getItem("theme") === "dark") document.documentElement.classList.add("dark");
} catch (e) {}
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="mn"
      suppressHydrationWarning
      className={cn("h-full antialiased font-sans", inter.variable)}
    >
      <head>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: theme flash-ээс сэргийлэх inline script */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
