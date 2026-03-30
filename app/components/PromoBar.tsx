export default function PromoBar() {
  return (
    <section className="w-full bg-blue-950">
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-6 px-6 py-3">
        <div className="text-white">
          <div className="text-xs font-semibold uppercase tracking-wide">
            Hỗ trợ mua xe Hyundai trả góp đến 85%
          </div>
          <div className="text-[11px] font-semibold uppercase tracking-wide opacity-90">
            Lãi suất thấp - Thủ tục nhanh chóng
          </div>
        </div>

        <a
          href="tel:0981543342"
          className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-slate-900"
          aria-label="Gọi 0981 543 342"
        >
          <span className="text-base leading-none">📞</span>
          <span>0981 543 342</span>
        </a>
      </div>
    </section>
  );
}

