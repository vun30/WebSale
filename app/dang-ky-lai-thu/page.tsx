"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";

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

export default function TestDrivePage() {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [carModel, setCarModel] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setSuccess(false);

    try {
      const response = await fetch("/api/test-drive", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, name, carModel, note }),
      });

      const data = (await response.json()) as { message?: string };
      if (!response.ok) {
        throw new Error(data.message ?? "Không thể gửi yêu cầu.");
      }

      setSuccess(true);
      setMessage(data.message ?? "Đăng ký thành công.");
      setPhone("");
      setName("");
      setCarModel("");
      setNote("");
    } catch (error) {
      const err = error as Error;
      setSuccess(false);
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-[calc(100vh-72px)] overflow-hidden bg-slate-900">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/picture/131064365_167173115100176_7217870890377009066_n.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[1px]" />

      <div className="relative mx-auto flex min-h-[calc(100vh-72px)] w-full max-w-[1280px] items-center justify-center px-4 py-10 sm:px-6">
        <div className="w-full max-w-[560px] rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-white/40 sm:p-8">
          <div className="flex items-center justify-center">
            <Image
              src="/logo/huyndai_logo.png"
              alt="Hyundai TC Motor"
              width={240}
              height={44}
              className="h-10 w-auto object-contain"
              style={{ width: "auto", height: "auto" }}
            />
          </div>

          <h1 className="mt-5 text-center text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Đăng Ký Lái Thử Xe
          </h1>
          <p className="mt-2 text-center text-sm text-zinc-600 sm:text-base">
            Để lại thông tin, tư vấn viên sẽ liên hệ trong 5–10 phút.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">
                Số điện thoại
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="09xx xxx xxx"
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-base outline-none ring-blue-600/30 transition focus:border-blue-600 focus:ring-4"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">
                Tên khách hàng
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nguyễn Văn A"
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-base outline-none ring-blue-600/30 transition focus:border-blue-600 focus:ring-4"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">
                Xe muốn mua
              </label>
              <select
                value={carModel}
                onChange={(e) => setCarModel(e.target.value)}
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-base outline-none ring-blue-600/30 transition focus:border-blue-600 focus:ring-4"
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

            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">
                Ghi chú (tuỳ chọn)
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Thời gian liên hệ phù hợp, phiên bản quan tâm..."
                rows={3}
                className="w-full resize-none rounded-xl border border-zinc-300 px-4 py-3 text-base outline-none ring-blue-600/30 transition focus:border-blue-600 focus:ring-4"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-800 px-5 py-3 text-lg font-bold text-white transition hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Đang gửi..." : "GỬI YÊU CẦU NGAY"}
            </button>
          </form>

          {message && (
            <p
              className={`mt-4 rounded-lg px-4 py-3 text-sm font-medium ${
                success
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {message}
            </p>
          )}

          <p className="mt-4 text-center text-sm text-zinc-500">
            Bằng việc gửi yêu cầu, bạn đồng ý cho phép liên hệ tư vấn qua điện
            thoại/Zalo.
          </p>
        </div>
      </div>
    </section>
  );
}
