/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";

export default function Footer() {
  const [carModel, setCarModel] = useState("Grand i10 Sedan");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const carOptions = [
    "Accent",
    "Creta",
    "Custin",
    "Elantra",
    "Grand i10 Sedan",
    "Grand i10 Hatchback",
    "IONIQ 5",
    "Palisade",
    "Santa Fe",
    "Stargazer X",
    "Tucson",
    "Venue",
  ];

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setSuccess(false);

    try {
      const response = await fetch("/api/test-drive", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, name, carModel }),
      });

      const data = (await response.json()) as { message?: string };
      if (!response.ok) {
        throw new Error(data.message ?? "Không thể gửi yêu cầu.");
      }

      setSuccess(true);
      setMessage("Gửi yêu cầu thành công, tư vấn viên sẽ liên hệ sớm.");
      setName("");
      setPhone("");
    } catch (error) {
      const err = error as Error;
      setSuccess(false);
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="mt-10 w-full bg-[#0b3a67] text-white">
      <section className="relative overflow-hidden border-b border-white/15">
        <img
          src="/slides/Website-HTV (1).png"
          alt="Đăng ký tư vấn"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/55" />

        <div className="relative mx-auto w-full max-w-[1280px] px-4 py-8 sm:px-6">
          <h3 className="mx-auto max-w-[760px] text-center text-lg font-extrabold tracking-wide text-white sm:text-2xl">
            ĐỂ LẠI THÔNG TIN, CHÚNG TÔI SẼ GỌI TƯ VẤN NGAY
          </h3>

          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-4 flex w-full max-w-[920px] flex-col gap-2 rounded-2xl bg-white/95 p-3 sm:flex-row sm:items-center sm:rounded-full sm:p-2"
          >
            <select
              value={carModel}
              onChange={(e) => setCarModel(e.target.value)}
              className="h-11 w-full flex-1 rounded-xl border border-zinc-200 bg-white px-4 text-sm text-zinc-700 outline-none sm:rounded-full"
              required
            >
              {carOptions.map((car) => (
                <option key={car} value={car}>
                  {car}
                </option>
              ))}
            </select>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Họ tên"
              className="h-11 w-full flex-1 rounded-xl border border-zinc-200 bg-white px-4 text-sm text-zinc-700 outline-none sm:rounded-full"
              required
            />

            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Số điện thoại"
              className="h-11 w-full flex-1 rounded-xl border border-zinc-200 bg-white px-4 text-sm text-zinc-700 outline-none sm:rounded-full"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="h-11 w-full rounded-xl bg-orange-500 px-7 text-sm font-extrabold text-white transition hover:bg-orange-600 disabled:opacity-70 sm:w-auto sm:rounded-full"
            >
              {loading ? "ĐANG GỬI..." : "GỬI"}
            </button>
          </form>

          {message && (
            <p
              className={`mx-auto mt-3 w-fit rounded-md px-3 py-1.5 text-sm font-semibold ${
                success
                  ? "bg-emerald-500/20 text-emerald-200"
                  : "bg-red-500/20 text-red-200"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </section>

      <div className="mx-auto w-full max-w-[1280px] px-4 py-10 sm:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/logo/logo_footer.png"
                alt="Hyundai | TC Motor"
                width={220}
                height={48}
                className="h-10 w-auto object-contain"
              />
            </div>

            <div className="mt-4 text-sm leading-relaxed text-white/90">
              <div className="font-semibold">
                Hyundai Gia Lai - Showroom Hyundai Tại Gia Lai.
              </div>
              <div>Showroom: 278 Lê Duẩn, Phường An Phú, Gia Lai.</div>
            </div>
          </div>

          <div>
            <div className="text-sm font-extrabold uppercase tracking-wide">
              Hỗ trợ khách hàng
            </div>
            <div className="mt-4 space-y-2 text-sm text-white/90">
              <div>
                <span className="font-semibold text-white">Hotline:</span>{" "}
                0981543342
              </div>
              <div>
                <span className="font-semibold text-white">Email:</span>{" "}
                hyundaigialaiofficial@gmail.com
              </div>
              <div>
                <span className="font-semibold text-white">Website:</span>{" "}
                hyundaigialaiofficial.com.vn
              </div>
            </div>
          </div>

          <div className="md:justify-self-end">
            <div className="text-sm font-extrabold uppercase tracking-wide">
              Follow
            </div>
            <div className="mt-4 flex items-center gap-3">
              <a
                href="#"
                aria-label="Email"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              >
                @
              </a>
              <a
                href="tel:0981543342"
                aria-label="Gọi điện"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              >
                ☎
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              >
                f
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/15 pt-6">
          <div className="flex flex-col gap-4 text-xs text-white/75 md:flex-row md:items-center md:justify-between">
            <nav
              aria-label="Footer links"
              className="flex flex-wrap gap-x-6 gap-y-2"
            >
              <a href="#" className="uppercase tracking-wide hover:text-white">
                Trang chủ
              </a>
              <a href="#" className="uppercase tracking-wide hover:text-white">
                Chính sách bảo mật
              </a>
              <a href="#" className="uppercase tracking-wide hover:text-white">
                Liên hệ
              </a>
            </nav>

            <div className="text-left md:text-center">
              Copyright © {new Date().getFullYear()}{" "}
              hyundaigialaiofficial.com.vn
            </div>

            <div className="text-left md:text-right">
              Hyundai Gia Lai - Gia Lai
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

