import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

type RequestBody = {
  phone?: string;
  name?: string;
  carModel?: string;
  note?: string;
};

function sanitize(input: string) {
  return input.replace(/[<>]/g, "").trim();
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RequestBody;
    const phone = sanitize(body.phone ?? "");
    const name = sanitize(body.name ?? "");
    const carModel = sanitize(body.carModel ?? "");
    const note = sanitize(body.note ?? "");

    if (!phone || !name || !carModel) {
      return NextResponse.json(
        { message: "Vui lòng nhập đủ số điện thoại, tên và mẫu xe." },
        { status: 400 }
      );
    }

    const senderEmail = process.env.TESTDRIVE_SENDER_EMAIL ?? "anhp76613@gmail.com";
    const senderPassword = process.env.TESTDRIVE_SENDER_APP_PASSWORD ?? "";
    const recipientEmail =
      process.env.TESTDRIVE_RECIPIENT_EMAIL ?? "hyundaigialaiofficial@gmail.com";

    if (!senderPassword) {
      return NextResponse.json(
        {
          message:
            "Chưa cấu hình TESTDRIVE_SENDER_APP_PASSWORD trên server.",
        },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: senderEmail,
        pass: senderPassword,
      },
    });

    await transporter.sendMail({
      from: `"Hyundai Gia Lai Website" <${senderEmail}>`,
      to: recipientEmail,
      replyTo: senderEmail,
      subject: `Đăng ký lái thử mới - ${carModel}`,
      text: [
        "Có khách hàng mới đăng ký lái thử:",
        `- Họ tên: ${name}`,
        `- Số điện thoại: ${phone}`,
        `- Mẫu xe quan tâm: ${carModel}`,
        `- Ghi chú: ${note || "Không có"}`,
      ].join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="margin: 0 0 12px;">Đăng ký lái thử mới</h2>
          <p><strong>Họ tên:</strong> ${name}</p>
          <p><strong>Số điện thoại:</strong> ${phone}</p>
          <p><strong>Mẫu xe quan tâm:</strong> ${carModel}</p>
          <p><strong>Ghi chú:</strong> ${note || "Không có"}</p>
        </div>
      `,
    });

    return NextResponse.json({ message: "Gửi yêu cầu thành công." });
  } catch {
    return NextResponse.json(
      { message: "Không thể gửi yêu cầu. Vui lòng thử lại." },
      { status: 500 }
    );
  }
}
