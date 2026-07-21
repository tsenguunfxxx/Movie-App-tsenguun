import { Film, Mail, Phone } from "lucide-react";

const SOCIALS = ["Facebook", "Instagram", "Twitter", "Youtube"];

export function Footer() {
  return (
    <footer className="mt-14 w-full bg-[#4338CA] text-white">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-10 px-5 py-10 md:flex-row md:justify-between md:py-16">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Film className="size-5" />
            <span className="text-base font-bold italic">Movie Z</span>
          </div>
          <p className="text-xs text-white/80">
            © 2024 Movie Z. All Rights Reserved.
          </p>
        </div>

        <div className="flex flex-col gap-10 sm:flex-row sm:gap-24">
          <div className="flex flex-col gap-5">
            <p className="text-sm">Contact Information</p>

            <div className="flex items-center gap-3">
              <Mail className="size-4 shrink-0" />
              <div className="text-xs">
                <p className="font-semibold">Email:</p>
                <p className="text-white/80">tsenguunzx@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="size-4 shrink-0" />
              <div className="text-xs">
                <p className="font-semibold">Phone:</p>
                <p className="text-white/80">+976 85129161</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <p className="text-sm">Follow us</p>
            <div className="flex flex-wrap gap-3 text-xs text-white/90">
              {SOCIALS.map((social) => (
                <span key={social}>{social}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
