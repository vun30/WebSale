import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-10 w-full bg-[#0b3a67] text-white">
      <div className="mx-auto w-full max-w-[1280px] px-6 py-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/logo/logo_footer.png"
                alt="Hyundai | TC Motor"
                width={220}
                height={48}
                className="h-10 w-auto object-contain"
              />
            </div>

            <div className="mt-4 text-sm leading-relaxed text-white/90">
              <div className="font-semibold">Hyundai Gia Lai - Showroom Hyundai Tại Gia Lai.</div>
              <div>Showroom: 278 Lê Duẩn, Phường An Phú, Gia Lai.</div>
            </div>
          </div>

          <div>
            <div className="text-sm font-extrabold uppercase tracking-wide">Hỗ trợ khách hàng</div>
            <div className="mt-4 space-y-2 text-sm text-white/90">
              <div>
                <span className="font-semibold text-white">Hotline:</span> 0981543342
              </div>
              <div>
                <span className="font-semibold text-white">Email:</span>{" "}
                hyundaigialaiofficial@gmail.com
              </div>
              <div>
                <span className="font-semibold text-white">Website:</span>{" "}
                hyundaigialaiofficial.com.vn
              </div>
            </div>
          </div>

          <div className="md:justify-self-end">
            <div className="text-sm font-extrabold uppercase tracking-wide">Follow</div>
            <div className="mt-4 flex items-center gap-3">
              <a
                href="#"
                aria-label="Email"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              >
                @
              </a>
              <a
                href="tel:0981543342"
                aria-label="Gọi điện"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              >
                ☎
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              >
                f
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/15 pt-6">
          <div className="flex flex-col gap-4 text-xs text-white/75 md:flex-row md:items-center md:justify-between">
            <nav aria-label="Footer links" className="flex flex-wrap gap-x-6 gap-y-2">
              <a href="#" className="uppercase tracking-wide hover:text-white">
                Trang chủ
              </a>
              <a href="#" className="uppercase tracking-wide hover:text-white">
                Chính sách bảo mật
              </a>
              <a href="#" className="uppercase tracking-wide hover:text-white">
                Liên hệ
              </a>
            </nav>

            <div className="text-center md:text-left">
              Copyright © {new Date().getFullYear()} hyundaigialaiofficial.com.vn
            </div>

            <div className="text-right md:text-left">Hyundai Gia Lai - Gia Lai</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

