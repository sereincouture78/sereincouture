import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FABRIXLY',
  description: 'Luxury AI-driven fashion marketplace',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-appBg text-textPrimary">{children}</body>
    </html>
  );
}
