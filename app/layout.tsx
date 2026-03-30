import type { Metadata } from "next";
import Image from "next/image";
import { Quicksand } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import Footer from "./components/Footer";

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
  { label: "Đăng ký lái thử", href: "#" },
  { label: "Liên hệ", href: "#" },
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
        <header className="border-b border-zinc-200 bg-zinc-100">
          <div className="mx-auto flex h-[72px] w-full max-w-[1280px] items-center justify-between px-6">
            <div className="flex items-center">
              <Image
                src="/logo/huyndai_logo.png"
                alt="Hyundai TC Motor"
                width={260}
                height={48}
                className="h-12 w-auto object-contain"
                priority
              />
            </div>

            <nav aria-label="Main navigation">
              <ul className="flex items-center font-bold text-zinc-700 gap-8 text-[15px] font-medium text-zinc-500">
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

            <div className="text-xl font-bold text-blue-900">
              Hyundai Gia Lai
            </div>
          </div>
        </header>

        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
