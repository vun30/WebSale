import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          background:
            "linear-gradient(135deg, rgb(9,46,89) 0%, rgb(20,82,170) 55%, rgb(39,120,255) 100%)",
          color: "white",
          padding: "72px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ fontSize: 62, fontWeight: 800, lineHeight: 1.1 }}>
          Hyundai Gia Lai
        </div>
        <div style={{ marginTop: 20, fontSize: 36, fontWeight: 600 }}>
          Đại lý Hyundai chính hãng tại Gia Lai
        </div>
        <div style={{ marginTop: 28, fontSize: 28, opacity: 0.95 }}>
          Giá xe • Lái thử • Dịch vụ hậu mãi
        </div>
      </div>
    ),
    size,
  );
}

