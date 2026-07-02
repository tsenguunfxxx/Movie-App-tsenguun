import { Phone } from "lucide-react";
import { Mail } from "lucide-react";
export function Footer() {
  return (
    <div className="w-Full h-[280px] bg-[#4338CA] flex justify-center items-center text-white">
      <div className="w-[1280px] h-[200px ] flex gap-[120px]">
        <div className="w-[247px] h-[200px]">
          <div className="w-[247px] h-[20px] gap-[12px]">
            {" "}
            <p>Movie Z</p>
            <p className="text-[10px] ">© 2024 Movie Z. All Rights Reserved.</p>
          </div>
        </div>
        <div className="w-[913px] h-[200px] flex justify-end items-start gap-[96px]">
          {" "}
          <div className="w-[174px] h-[200px] flex flex-col gap-[20px]">
            {" "}
            <p>Contact Information</p>
            <div className="w-[174px] h-[40px] flex items-center gap-[12px] ">
              <div>
                <Mail className="w-[15px] h-[15px]"></Mail>
              </div>
              <div>
                <p>Email:</p>
                <p>support@movieZ.com</p>
              </div>
            </div>
            <div className="w-[200px] h-[40px] flex items-center gap-[12px] ">
              <div>
                <Phone className="w-[15px] h-[15px]"></Phone>
              </div>
              <div>
                <p>Phone:</p>
                <p>+976 (11) 123-4567</p>
              </div>
            </div>
          </div>
          <div className="w-[274px] h-[72px]">
            <p>Follow us</p>
            <div className="flex gap-[12px]">
              <p>Facebook</p>
              <p>Instagram</p>
              <p>Twitter</p>
              <p>Youtube</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
