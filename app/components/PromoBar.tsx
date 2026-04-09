export default function PromoBar() {
  return (
    <section className="w-full bg-blue-950">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-4 px-4 py-3 sm:px-6 md:flex-row md:items-center md:justify-between md:gap-6">
        <div className="w-full text-white">
          <div className="text-sm font-bold uppercase tracking-wide md:text-xs md:font-semibold">
            Hỗ trợ mua xe Hyundai trả góp đến 85%
          </div>
          <div className="text-sm font-semibold uppercase tracking-wide opacity-90 md:text-[11px]">
            Lãi suất thấp - Thủ tục nhanh chóng
          </div>
        </div>

        <a
          href="tel:0981543342"
          className="mx-auto inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-slate-900 md:mx-0"
          aria-label="Gọi 0981 543 342"
        >
          <span className="inline-flex h-5 w-5 items-center justify-center text-red-600">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 fill-current"
              aria-hidden="true"
            >
              <path d="M6.62 10.79a15.46 15.46 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.32.56 3.57.56a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.3 21 3 13.7 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.19 2.45.56 3.57a1 1 0 0 1-.24 1.02l-2.2 2.2Z" />
            </svg>
          </span>
          <span className="whitespace-nowrap">0981 543 342</span>
        </a>
      </div>
    </section>
  );
}

