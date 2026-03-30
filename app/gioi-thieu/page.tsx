import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Giới thiệu | Hyundai Gia Lai",
  description: "Giới thiệu về Hyundai Gia Lai",
};

export default function Page() {
  return (
    <section className="w-full">
      <div className="mx-auto w-full max-w-[1280px] px-6 py-10">
        <div className="text-sm text-zinc-500">
          <Link href="/" className="hover:text-zinc-700">
            Trang chủ
          </Link>{" "}
          <span className="px-1">›</span>
          <span className="font-medium text-zinc-700">Giới thiệu</span>
        </div>

        <div className="mt-8 grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blue-700">
              About us
            </div>
            <h1 className="mt-4 text-5xl font-extrabold leading-tight text-slate-900">
              Giới thiệu Hyundai Gia Lai
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-600">
              Đại lý ủy quyền Hyundai Thành Công – đồng hành cùng khách hàng từ
              tư vấn chọn xe, đăng ký, bảo hiểm đến bảo dưỡng chính hãng.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#"
                className="inline-flex items-center justify-center rounded-xl bg-blue-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-950"
              >
                Đăng ký lái thử
              </a>
              <a
                href="tel:0981543342"
                className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-5 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50"
              >
                Liên hệ ngay
              </a>
            </div>

            <div className="mt-7 grid grid-cols-1 gap-2 text-sm text-zinc-600 sm:grid-cols-2">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                  ✓
                </span>
                Báo giá minh bạch
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                  ✓
                </span>
                Giao xe nhanh
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                  ✓
                </span>
                Bảo dưỡng chính hãng
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                  ✓
                </span>
                Hỗ trợ tài chính
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-zinc-200">
            <Image
              src="/gioithieu/hyundai-gia-lai-2625320j32787.webp"
              alt="Hyundai Gia Lai"
              width={1600}
              height={900}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-auto w-full bg-white object-contain"
              priority
            />
            <div className="flex items-center justify-between gap-4 border-t border-zinc-200 px-4 py-3 text-sm text-zinc-600">
              <div className="flex items-center gap-2">
                <span className="text-amber-600">★</span>
                <span className="font-semibold text-zinc-800">4.8/5</span>
                <span>dịch vụ hậu mãi</span>
              </div>
              <a
                href="tel:0981543342"
                className="inline-flex items-center gap-2 rounded-lg bg-zinc-50 px-3 py-2 font-semibold text-zinc-800 hover:bg-zinc-100"
              >
                ☎ 0981 543 342
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-4">
          {[
            { value: "10+", label: "Mẫu xe trưng bày" },
            { value: "3.000+", label: "Khách hàng phục vụ / năm" },
            { value: "12", label: "Bay/đặt lịch dịch vụ" },
            { value: "5 năm", label: "Bảo hành chính hãng" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl bg-white px-6 py-5 text-center shadow-sm ring-1 ring-zinc-200"
            >
              <div className="text-3xl font-extrabold text-slate-900">
                {item.value}
              </div>
              <div className="mt-1 text-sm font-semibold text-zinc-600">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full bg-slate-50">
        <div className="mx-auto w-full max-w-[1280px] px-6 py-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900">
                Tầm nhìn & cam kết
              </h2>
              <p className="mt-3 text-base leading-relaxed text-zinc-600">
                Hyundai Gia Lai hướng đến trải nghiệm liền mạch: tư vấn đúng nhu
                cầu, thủ tục nhanh, bàn giao thuận tiện và chế độ hậu mãi rõ
                ràng.
              </p>

              <div className="mt-6 space-y-3 text-sm text-zinc-700">
                {[
                  "Quy trình 5 bước: tư vấn → lái thử → hợp đồng → đăng ký → giao xe.",
                  "Dịch vụ nhắc lịch bảo dưỡng – chi phí minh bạch.",
                  "Hỗ trợ tài chính đa ngân hàng, duyệt nhanh.",
                ].map((t) => (
                  <div key={t} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                      ✓
                    </span>
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-zinc-200">
              <Image
                src="/gioithieu/131064365_167173115100176_7217870890377009066_n.jpg"
                alt="Không gian trưng bày"
                width={1600}
                height={900}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-auto w-full bg-white object-contain"
              />
              <div className="px-4 py-3 text-center text-sm text-zinc-600">
                Không gian trưng bày rộng, nhiều phiên bản & màu sắc.
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-zinc-200">
              <Image
                src="/gioithieu/dai-ly-xe-hyundai-gia-lai-showroomxe-com-vn.jpg"
                alt="Xưởng dịch vụ"
                width={1600}
                height={900}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-auto w-full bg-white object-contain"
              />
            </div>

            <div>
              <h2 className="text-3xl font-extrabold text-slate-900">
                Dịch vụ sau bán hàng
              </h2>
              <p className="mt-3 text-base leading-relaxed text-zinc-600">
                Đội ngũ cố vấn – kỹ thuật viên được đào tạo bài bản, cập nhật kỹ
                thuật mới. Minh bạch vật tư, chăm sóc chi tiết từng hạng mục.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  { title: "Bảo dưỡng định kỳ", icon: "🛠" },
                  { title: "Bảo hành điện tử", icon: "🛡" },
                  { title: "Phụ tùng chính hãng", icon: "🚗" },
                  { title: "Cứu hộ & hỗ trợ", icon: "☎" },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl bg-white px-5 py-4 shadow-sm ring-1 ring-zinc-200"
                  >
                    <div className="text-lg">{item.icon}</div>
                    <div className="mt-2 text-sm font-bold text-slate-900">
                      {item.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

