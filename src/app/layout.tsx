import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tech Blog",
  description: "Tech blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${inter.className} min-h-screen bg-slate-50 text-slate-900`}
      >
        <header className="border-b bg-white sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-8 h-16 flex items-center justify-between">
            <Link href="/" className="font-bold text-xl tracking-tight">
              Tech Blog
            </Link>
          </div>
        </header>

        <div className="pt-8 pb-20">{children}</div>
      </body>
    </html>
  );
}
