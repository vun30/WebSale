"use client";

import Link from "next/link";

export default function FloatingContact() {
  return (
    <>
      <div className="fixed bottom-4 left-3 z-50 flex flex-col gap-2">
        <a
          href="tel:0981543342"
          className="inline-flex items-center gap-2 rounded-full bg-blue-900 px-3 py-2 text-sm font-bold text-white shadow-lg transition hover:bg-blue-800"
          aria-label="Gọi 0981 543 342"
        >
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 fill-current"
              aria-hidden="true"
            >
              <path d="M6.62 10.79a15.46 15.46 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.32.56 3.57.56a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.3 21 3 13.7 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.19 2.45.56 3.57a1 1 0 0 1-.24 1.02l-2.2 2.2Z" />
            </svg>
          </span>
          <span>0981 543 342</span>
        </a>

        <Link
          href="/dang-ky-lai-thu"
          className="inline-flex items-center gap-2 rounded-full bg-pink-600 px-3 py-2 text-sm font-bold text-white shadow-lg transition hover:bg-pink-700"
          aria-label="Đăng ký tư vấn"
        >
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 fill-current"
              aria-hidden="true"
            >
              <path d="M3 17.25V21h3.75l11-11-3.75-3.75-11 11Zm17.71-10.04a1 1 0 0 0 0-1.41l-2.5-2.5a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.99-1.67Z" />
            </svg>
          </span>
          <span>ĐĂNG KÝ TƯ VẤN</span>
        </Link>
      </div>

      <a
        href="https://zalo.me/0981543342"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-3 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-sky-100 text-xs font-bold text-sky-700 shadow-lg ring-2 ring-white transition hover:bg-sky-200"
        aria-label="Chat Zalo"
      >
        Zalo
      </a>
    </>
  );
}
