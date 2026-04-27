import type { Metadata } from "next";
import "./globals.css";
import { AppToaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "FABRIXLY",
  description: "Luxury animated marketplace and AI automation platform"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen px-4 py-6 md:px-8">{children}</main>
        <AppToaster />
      </body>
    </html>
  );
}
