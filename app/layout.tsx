import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TradeLab | Trading Performance & Analysis",
  description:
    "Journal your trades, analyze your performance, backtest strategies and improve your trading psychology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
} 