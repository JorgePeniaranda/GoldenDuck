import type { Metadata } from "next";
import { Poppins as PoppinsFont } from "next/font/google";
import "./globals.css";

const Poppins = PoppinsFont({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GoldenDuck",
  description: "GoldenDuck",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={Poppins.className}>{children}</body>
    </html>
  );
}
