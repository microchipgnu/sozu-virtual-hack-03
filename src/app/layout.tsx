import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { headers } from "next/headers";
import ContextProvider from '@/reown/provider';
import '@reown/appkit/react';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AppKit Example App",
  description: "Powered by WalletConnect"
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const cookies = headersList.get('cookie');

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ContextProvider cookies={cookies}>
          {children}
          <div className="fixed bottom-4 right-4 bg-black/80 text-white px-3 py-1.5 rounded-full text-sm">
            Powered by <a href="https://aim.microchipgnu.pt" className="underline">AIM</a>
          </div>
        </ContextProvider>
      </body>
    </html>
  );
}
