"use client";

import { motion } from "framer-motion";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemePreferenceForm } from "@/components/sections/theme-preference-form";

const milestoneChecks = [
  "Next.js 14 App Router initialized",
  "Luxury color system + reusable UI kit",
  "Framer Motion page + component animations",
  "Theme preferences API with Prisma persistence"
];

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="mx-auto grid max-w-7xl gap-4 md:grid-cols-[260px,1fr]"
    >
      <Sidebar />
      <section>
        <Topbar />
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Milestone 0 Readiness</CardTitle>
            </CardHeader>
            <CardContent>
              {milestoneChecks.length === 0 ? (
                <p className="text-sm text-textMuted">No setup tasks yet. Start initialization workflow.</p>
              ) : (
                <ul className="space-y-2 text-sm text-textMuted">
                  {milestoneChecks.map((check) => (
                    <li key={check} className="rounded-md border border-royalBlue/30 bg-royalBlue/10 px-3 py-2">
                      {check}
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
          <ThemePreferenceForm />
        </div>
      </section>
    </motion.div>
  );
}
