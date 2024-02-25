import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { DeviceProvider } from "@/components/device-provider";
import { SettingsProvider } from "@/components/core/wrappers/settings-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: "Lythar",
  description: "Lythar dashboard",
  manifest: "/manifest.json",
  applicationName: "Lythar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("min-h-[svh] font-sans antialiased", inter.variable)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SettingsProvider>
            <DeviceProvider>{children}</DeviceProvider>
          </SettingsProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
