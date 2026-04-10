type ServiceItem = {
  title: string;
  description: string;
  icon: "shield" | "loan" | "parts" | "repair" | "maintenance" | "warranty";
};

const services: ServiceItem[] = [
  {
    title: "Bảo hiểm của Hyundai",
    description:
      "Sản phẩm dành riêng cho khách hàng Hyundai, với dịch vụ 1 cửa về Bảo hiểm, quy trình xử lý chất lượng cao, nhanh chóng.",
    icon: "shield",
  },
  {
    title: "Hỗ trợ vay lên đến 85%",
    description:
      "Các sản phẩm vay mua xe Hyundai đáp ứng đa dạng các nhu cầu tài chính của khách hàng.",
    icon: "loan",
  },
  {
    title: "Phụ tùng & Phụ kiện",
    description:
      "Tất cả các phụ tùng, phụ kiện chính hãng, được nhập khẩu từ Hàn Quốc và các nước trong khu vực.",
    icon: "parts",
  },
  {
    title: "Dịch vụ sửa chữa",
    description:
      "Hyundai cung cấp dịch vụ sửa chữa đối với những hư hỏng do va chạm trong quá trình sử dụng.",
    icon: "repair",
  },
  {
    title: "Dịch vụ bảo dưỡng",
    description:
      "Dịch vụ kiểm tra, bảo dưỡng một cách định kỳ để đảm bảo chiếc xe của Khách hàng luôn được vận hành hiệu quả.",
    icon: "maintenance",
  },
  {
    title: "Chính sách bảo hành",
    description:
      "Chính sách mang lại những sửa chữa cần thiết, sử dụng những phụ tùng mới cho xe của Khách hàng.",
    icon: "warranty",
  },
];

function ServiceIcon({ type }: { type: ServiceItem["icon"] }) {
  const common = "h-12 w-12 text-white";
  if (type === "shield" || type === "warranty") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
        <path
          d="M12 2 4 6v6c0 5 3.4 9.4 8 10 4.6-.6 8-5 8-10V6l-8-4Z"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path d="m8.2 12 2.4 2.5 5.2-5.4" stroke="#ef4444" strokeWidth="2" />
      </svg>
    );
  }
  if (type === "loan") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
        <path d="M3 13h6l3-5 3 8 2-3h4" stroke="currentColor" strokeWidth="1.8" />
        <rect x="2" y="4" width="20" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="7" cy="18" r="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M16.5 18h5" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }
  if (type === "parts" || type === "maintenance") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 4v5M12 15v5M4 12h5M15 12h5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="4.5" cy="12" r="1.2" fill="#ef4444" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
      <path
        d="M15.8 7.2a3.5 3.5 0 0 0-4.9 4.9l-6.7 6.7 2.8 2.8 6.7-6.7a3.5 3.5 0 0 0 4.9-4.9l-2.2 2.2-2.8-2.8 2.2-2.2Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export default function HomeServiceSection() {
  return (
    <section className="bg-[#0b3a67]">
      <div className="mx-auto w-full max-w-[1280px] px-4 py-10 sm:px-6 sm:py-12">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-white/30" />
          <h2 className="text-center text-2xl font-extrabold uppercase tracking-wide text-white sm:text-3xl">
            Khám phá dịch vụ Hyundai
          </h2>
          <div className="h-px flex-1 bg-white/30" />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((item) => (
            <article key={item.title} className="flex gap-4">
              <div className="shrink-0">
                <ServiceIcon type={item.icon} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-white/85">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

