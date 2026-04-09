"use client";

import Link from "next/link";
import { useState } from "react";

type NavItem = {
  label: string;
  href: string;
};

type MobileNavProps = {
  items: readonly NavItem[];
};

export default function MobileNav({ items }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label={open ? "Đóng menu" : "Mở menu"}
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-zinc-200 bg-white text-zinc-700"
      >
        {open ? "✕" : "☰"}
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full z-50 border-b border-zinc-200 bg-white shadow-md">
          <nav aria-label="Mobile navigation" className="mx-auto w-full max-w-[1280px] px-4 py-3">
            <ul className="space-y-1">
              {items.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-100"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
