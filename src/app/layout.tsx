import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from '@/app/context/LanguageContext'
import { Topbar } from "./components/Topbar";
import { getSession } from "@/lib/session";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Griô",
  description: "Preserve what time takes away",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const user = await getSession()

  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider>
          <Topbar user={user} />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
