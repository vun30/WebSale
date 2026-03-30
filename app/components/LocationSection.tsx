import PictureCarousel from "./PictureCarousel";

type LocationSectionProps = {
  address: string;
  images: string[];
};

export default function LocationSection({ address, images }: LocationSectionProps) {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;

  return (
    <section className="w-full bg-zinc-100">
      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-6 px-6 py-10 md:grid-cols-2">
        <div className="overflow-hidden rounded-xl bg-white shadow-sm">
          <iframe
            title={`Bản đồ: ${address}`}
            src={mapSrc}
            className="h-[320px] w-full md:h-[360px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="overflow-hidden rounded-xl bg-white shadow-sm">
          <div className="relative h-[320px] w-full md:h-[360px]">
            <PictureCarousel images={images} alt={address} />
          </div>
        </div>
      </div>
    </section>
  );
}

