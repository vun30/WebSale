import type { Metadata } from "next";
import Image from "next/image";
import { Quicksand } from "next/font/google";
import Link from "next/link";
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
  title: "Hyundai Gia Lai",
  description: "Website Hyundai Gia Lai",
};

const navItems = [
  { label: "Trang chủ", href: "/" },
  { label: "Giới thiệu", href: "/gioi-thieu" },
  { label: "Sản phẩm", href: "/san-pham" },
  { label: "Tin tức", href: "#" },
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
      <body
        className={`${quicksand.className} bg-white text-zinc-900 antialiased`}
      >
        <header className="relative border-b border-zinc-200 bg-zinc-100">
          <div className="mx-auto flex h-[64px] w-full max-w-[1280px] items-center justify-between px-4 sm:h-[72px] sm:px-6">
            <Link href="/" className="flex items-center" aria-label="Về trang chủ">
              <Image
                src="/logo/huyndai_logo.png"
                alt="Hyundai TC Motor"
                width={260}
                height={48}
                className="h-8 w-auto object-contain sm:h-10 lg:h-12"
                style={{ width: "auto", height: "auto" }}
                priority
              />
            </Link>

            <nav aria-label="Main navigation" className="hidden lg:block">
              <ul className="flex items-center gap-8 text-[15px] font-semibold text-zinc-700">
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

            <div className="hidden text-lg font-bold text-blue-900 xl:block">
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
