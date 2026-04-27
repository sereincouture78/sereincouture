"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { themePreferenceSchema, type ThemePreferenceInput } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function ThemePreferenceForm() {
  const form = useForm<ThemePreferenceInput>({
    resolver: zodResolver(themePreferenceSchema),
    defaultValues: {
      userEmail: "store@fabrixly.com",
      reducedMotion: false,
      preferredTheme: "DARK_LUXE"
    }
  });

  const onSubmit = form.handleSubmit(async (values) => {
    const res = await fetch("/api/theme-preferences", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });

    if (!res.ok) {
      toast.error("Failed to save preferences");
      return;
    }

    toast.success("Theme preference saved");
  });

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <Card>
        <CardHeader>
          <CardTitle>Theme & Motion Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-textMuted">User Email</label>
              <Input type="email" {...form.register("userEmail")} />
              {form.formState.errors.userEmail ? (
                <p className="text-xs text-red-400">{form.formState.errors.userEmail.message}</p>
              ) : null}
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" {...form.register("reducedMotion")} />
              <label className="text-sm text-textMuted">Enable reduced motion</label>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-textMuted">Theme Style</label>
              <select
                className="h-10 w-full rounded-md border border-royalBlue/40 bg-bgPrimary px-3 text-textPrimary"
                {...form.register("preferredTheme")}
              >
                <option value="DARK_LUXE">Dark Luxe</option>
                <option value="DARK_CONTRAST">Dark Contrast</option>
              </select>
            </div>
            <Button type="submit" variant="gold" className="w-full">Save Preferences</Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
