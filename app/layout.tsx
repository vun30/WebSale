import type { Metadata } from "next";
import Image from "next/image";
import { Quicksand } from "next/font/google";
import Link from "next/link";
import Script from "next/script";
import "./globals.css";
import Footer from "./components/Footer";
import MobileNav from "./components/MobileNav";
import TestDrivePopup from "./components/TestDrivePopup";
import FloatingContact from "./components/FloatingContact";

const quicksand = Quicksand({
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hyundaigialaiofficial.com.vn"),
  title: {
    default: "Hyundai Gia Lai | Đại lý Hyundai chính hãng tại Gia Lai",
    template: "%s | Hyundai Gia Lai",
  },
  description:
    "Hyundai Gia Lai - Đại lý Hyundai chính hãng. Cập nhật giá xe Hyundai mới nhất, đăng ký lái thử, khuyến mãi và dịch vụ hậu mãi chính hãng.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "Hyundai Gia Lai",
    url: "/",
    title: "Hyundai Gia Lai | Đại lý Hyundai chính hãng tại Gia Lai",
    description:
      "Khám phá các dòng xe Hyundai, đăng ký lái thử và nhận tư vấn tại Hyundai Gia Lai.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hyundai Gia Lai | Đại lý Hyundai chính hãng tại Gia Lai",
    description:
      "Khám phá các dòng xe Hyundai, đăng ký lái thử và nhận tư vấn tại Hyundai Gia Lai.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const navItems = [
  { label: "Trang chủ", href: "/" },
  { label: "Giới thiệu", href: "/gioi-thieu" },
  { label: "Sản phẩm", href: "/san-pham" },
  { label: "Tin tức", href: "/tin-tuc" },
  { label: "Đăng ký lái thử", href: "/dang-ky-lai-thu" },
  { label: "Liên hệ", href: "/lien-he" },
] as const;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WFT6TB96');`}
        </Script>
        {/* End Google Tag Manager */}
      </head>
      <body
        className={`${quicksand.className} bg-white text-zinc-900 antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AutoDealer",
              name: "Hyundai Gia Lai",
              url: "https://www.hyundaigialaiofficial.com.vn",
              image:
                "https://www.hyundaigialaiofficial.com.vn/logo/huyndai_logo.png",
              telephone: "+84-981-543-342",
              address: {
                "@type": "PostalAddress",
                streetAddress: "278 Lê Duẩn, Phường An Phú",
                addressLocality: "Pleiku",
                addressRegion: "Gia Lai",
                addressCountry: "VN",
              },
              sameAs: [],
            }),
          }}
        />
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WFT6TB96"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <header className="relative border-b border-zinc-200 bg-zinc-100">
          <div className="mx-auto flex h-[64px] w-full max-w-[1280px] items-center justify-between px-4 sm:h-[72px] sm:px-6">
            {" "}
            <Link
              href="/"
              className="flex shrink-0 items-center"
              aria-label="Về trang chủ"
            >
              <Image
                src="/logo/huyndai_logo.png"
                alt="Hyundai TC Motor"
                width={200}
                height={36}
                sizes="200px"
                className="h-11 w-auto object-contain"
                priority
              />
            </Link>
            <nav aria-label="Main navigation" className="hidden lg:block">
              <ul className="flex items-center gap-5 text-[15px] font-medium text-zinc-700">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="transition-colors hover:text-zinc-400"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="hidden text-xl font-extrabold text-blue-900 xl:block">
              Hyundai Gia Lai
            </div>
            <MobileNav items={navItems} />
          </div>
        </header>

        <TestDrivePopup />
        <FloatingContact />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
