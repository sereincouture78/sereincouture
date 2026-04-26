import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-4xl font-bold">FABRIXLY</h1>
      <p className="mt-4 text-textMuted">Luxury fashion marketplace with AI, automation, and multi-vendor commerce.</p>
      <div className="mt-8 flex gap-4">
        <Link className="rounded-lg bg-royalBlue px-4 py-2" href="/marketplace">Explore Marketplace</Link>
        <Link className="rounded-lg border border-gold px-4 py-2" href="/admin">Admin Dashboard</Link>
      </div>
    </main>
  );
}
