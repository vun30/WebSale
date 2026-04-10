import type { Metadata } from "next";
import TestDriveClient from "./TestDriveClient";

export const metadata: Metadata = {
  title: "Đăng ký lái thử",
  description:
    "Đăng ký lái thử xe Hyundai tại Hyundai Gia Lai. Để lại thông tin để nhận tư vấn và lịch lái thử nhanh chóng.",
  alternates: {
    canonical: "/dang-ky-lai-thu",
  },
  openGraph: {
    title: "Đăng ký lái thử xe Hyundai | Hyundai Gia Lai",
    description:
      "Đăng ký lái thử xe Hyundai tại Hyundai Gia Lai và nhận tư vấn nhanh từ đội ngũ chuyên viên.",
    url: "/dang-ky-lai-thu",
  },
};

export default function TestDrivePage() {
  return <TestDriveClient />;
}
