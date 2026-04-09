"use client";

import { FormEvent, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

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

export default function TestDrivePopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [carModel, setCarModel] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  if (!open || pathname === "/dang-ky-lai-thu") return null;

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
      setMessage("Đăng ký thành công, tư vấn viên sẽ liên hệ trong ít phút.");
      setPhone("");
      setName("");
      setCarModel("");
    } catch (error) {
      const err = error as Error;
      setSuccess(false);
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-slate-950/60 p-4">
      <div className="relative w-full max-w-[560px] rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-zinc-200 sm:p-8">
        <button
          type="button"
          aria-label="Đóng"
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 transition hover:bg-zinc-200"
        >
          ✕
        </button>

        <div className="flex justify-center">
          <Image
            src="/logo/huyndai_logo.png"
            alt="Hyundai TC Motor"
            width={230}
            height={42}
            className="h-9 w-auto object-contain sm:h-10"
            style={{ width: "auto", height: "auto" }}
            priority
          />
        </div>

        <h2 className="text-center text-2xl font-extrabold text-slate-900">
          BÁO GIÁ LĂN BÁNH & LÁI THỬ XE
        </h2>
        <p className="mt-2 text-center text-zinc-600">
          Nhập thông tin, tư vấn viên sẽ liên hệ trong 5–10 phút.
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-3">
          <div>
            <label className="mb-1 block text-sm font-semibold text-zinc-700">
              Số điện thoại
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="09xx xxx xxx"
              className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-base outline-none ring-blue-600/25 transition focus:border-blue-600 focus:ring-4"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-zinc-700">
              Tên khách hàng
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nguyễn Văn A"
              className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-base outline-none ring-blue-600/25 transition focus:border-blue-600 focus:ring-4"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-zinc-700">
              Xe muốn mua
            </label>
            <select
              value={carModel}
              onChange={(e) => setCarModel(e.target.value)}
              className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-base outline-none ring-blue-600/25 transition focus:border-blue-600 focus:ring-4"
              required
            >
              <option value="">Chọn mẫu xe</option>
              {carOptions.map((car) => (
                <option key={car} value={car}>
                  {car}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-xl bg-blue-800 px-4 py-3 text-lg font-bold text-white transition hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "ĐANG GỬI..." : "GỬI YÊU CẦU NGAY"}
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 rounded-lg px-4 py-2 text-sm font-medium ${
              success
                ? "bg-emerald-50 text-emerald-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
