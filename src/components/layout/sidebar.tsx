"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useUiStore } from "@/store/ui-store";
import { Button } from "@/components/ui/button";

const nav = [
  { href: "/", label: "Overview" },
  { href: "/api/theme-preferences", label: "Theme API" }
];

export function Sidebar() {
  const { sidebarOpen, toggleSidebar } = useUiStore();

  return (
    <>
      <Button className="md:hidden" variant="ghost" onClick={toggleSidebar}>
        Menu
      </Button>
      <motion.aside
        animate={{ x: sidebarOpen ? 0 : -8, opacity: 1 }}
        className="w-full max-w-[260px] rounded-2xl border border-royalBlue/35 bg-cardPrimary p-5 md:block"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-gold">Fabrixly</p>
        <ul className="mt-6 space-y-2">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block rounded-md px-3 py-2 text-sm text-textMuted transition hover:bg-royalBlue/30 hover:text-textPrimary"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </motion.aside>
    </>
  );
}
