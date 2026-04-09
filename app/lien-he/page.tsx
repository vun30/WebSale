import Link from "next/link";

export const metadata = {
  title: "Liên hệ | Hyundai Gia Lai",
  description: "Thông tin liên hệ Hyundai Gia Lai",
};

export default function Page() {
  const phoneDisplay = "0981 543 342";
  const phoneRaw = "0981543342";
  const mapUrl = "https://maps.google.com/?q=278+Le+Duan,+An+Phu,+Gia+Lai";

  return (
    <section className="w-full bg-zinc-100 pb-12">
      <div className="relative isolate min-h-[540px] overflow-hidden md:min-h-[560px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/picture/131064365_167173115100176_7217870890377009066_n.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-slate-900/55" />

        <div className="relative mx-auto w-full max-w-[1280px] px-4 pt-6 sm:px-6 sm:pt-8">
          <div className="text-sm text-white/85">
            <Link href="/" className="hover:text-white">
              Trang chủ
            </Link>{" "}
            <span className="px-1">›</span>
            <span className="font-semibold text-white">Liên hệ</span>
          </div>
        </div>

        <div className="relative mx-auto flex min-h-[540px] w-full max-w-[1280px] items-start px-4 pb-16 pt-20 sm:px-6 md:min-h-[560px] md:pb-40 md:pt-24">
          <div className="max-w-[580px] text-white">
            <div className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
              Showroom chính hãng • Gia Lai
            </div>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              HYUNDAI GIA LAI
            </h1>

            <p className="mt-4 text-base leading-relaxed text-white/90">
              Showroom Hyundai tại Gia Lai - tư vấn, báo giá, lái thử.
              <br />
              278 Lê Duẩn, Phường An Phú, Gia Lai.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={`tel:${phoneRaw}`}
                className="inline-flex items-center rounded-full bg-blue-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-800"
              >
                Gọi {phoneDisplay}
              </a>
              <a
                href={mapUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full bg-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/30"
              >
                Xem đường đi
              </a>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-6 grid w-full max-w-[1280px] grid-cols-1 gap-4 px-4 sm:px-6 md:absolute md:bottom-6 md:left-0 md:right-0 md:z-20 md:mt-0 md:grid-cols-3">
            <article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-200">
              <p className="text-sm text-zinc-500">Hotline</p>
              <a
                href={`tel:${phoneRaw}`}
                className="mt-1 block text-2xl font-bold text-zinc-900"
              >
                {phoneDisplay}
              </a>
            </article>

            <article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-200">
              <p className="text-sm text-zinc-500">Địa chỉ</p>
              <p className="mt-1 text-lg font-bold text-zinc-900">
                278 Lê Duẩn, Phường An Phú, Gia Lai.
              </p>
            </article>

            <article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-200">
              <p className="text-sm text-zinc-500">Giờ làm việc</p>
              <p className="mt-1 text-lg font-bold text-zinc-900">
                8:00-18:00 (T2-CN)
              </p>
            </article>
        </div>
      </div>

      <div className="mx-auto mt-4 grid w-full max-w-[1280px] grid-cols-1 gap-4 px-4 sm:px-6 md:mt-8 md:grid-cols-3">
        <article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-200">
          <p className="text-sm font-semibold text-zinc-700">Dịch vụ nổi bật</p>
          <p className="mt-2 text-sm text-zinc-600">
            Tư vấn mua xe, đăng ký lái thử và báo giá nhanh trong ngày.
          </p>
        </article>
        <article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-200">
          <p className="text-sm font-semibold text-zinc-700">Hậu mãi chính hãng</p>
          <p className="mt-2 text-sm text-zinc-600">
            Bảo dưỡng định kỳ, phụ tùng chính hãng và nhắc lịch tự động.
          </p>
        </article>
        <article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-200">
          <p className="text-sm font-semibold text-zinc-700">Hỗ trợ tài chính</p>
          <p className="mt-2 text-sm text-zinc-600">
            Hợp tác nhiều ngân hàng, linh hoạt trả góp theo nhu cầu.
          </p>
        </article>
      </div>

      <div className="mx-auto mt-6 w-full max-w-[1280px] px-4 sm:px-6">
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-zinc-200">
          <iframe
            title="Bản đồ Hyundai Gia Lai"
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              "278 Lê Duẩn, An Phú, Pleiku, Gia Lai 600000, Việt Nam"
            )}&output=embed`}
            className="h-[300px] w-full md:h-[360px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
