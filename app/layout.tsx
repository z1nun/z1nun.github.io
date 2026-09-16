import type { Metadata, Viewport } from "next";
import "./globals.css";
import PasswordGate from "@/components/PasswordGate";
import KakaoEscape from "@/components/KakaoEscape";

export const metadata: Metadata = {
  title: "계획 🗂",
  description: "여행·데이트 계획 모음",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <KakaoEscape />
        <PasswordGate>{children}</PasswordGate>
      </body>
    </html>
  );
}
