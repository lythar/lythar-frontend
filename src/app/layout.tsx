import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { DeviceProvider } from "@/components/device-match-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Lythar",
  description: "Lythar dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn("min-h-screen font-sans antialiased", inter.variable)}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <DeviceProvider>{children}</DeviceProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
