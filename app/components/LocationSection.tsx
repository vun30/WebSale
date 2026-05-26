import Link from "next/link";
import PictureCarousel from "./PictureCarousel";

type LocationSectionProps = {
  address: string;
  images: string[];
};

export default function LocationSection({ address, images }: LocationSectionProps) {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;

  return (
    <section className="w-full bg-zinc-100">
      <div className="mx-auto w-full max-w-[1280px] px-4 pt-8 sm:px-6 sm:pt-10">
        <h2 className="text-2xl font-extrabold text-zinc-900">Vị trí showroom</h2>
        <p className="mt-2 text-sm text-zinc-600">
          {address}{" "}
          <Link href="/lien-he" className="font-semibold text-blue-800 hover:underline">
            Xem trang liên hệ đầy đủ
          </Link>
        </p>
      </div>
      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-4 px-4 pb-8 sm:gap-6 sm:px-6 sm:pb-10 md:grid-cols-2">
        <div className="overflow-hidden rounded-xl bg-white shadow-sm">
          <iframe
            title={`Bản đồ: ${address}`}
            src={mapSrc}
            className="h-[260px] w-full sm:h-[320px] md:h-[360px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="overflow-hidden rounded-xl bg-white shadow-sm">
          <div className="relative h-[260px] w-full sm:h-[320px] md:h-[360px]">
            <PictureCarousel images={images} alt={address} />
          </div>
        </div>
      </div>
    </section>
  );
}

