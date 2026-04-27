import { z } from "zod";

export const themePreferenceSchema = z.object({
  userEmail: z.string().email(),
  reducedMotion: z.boolean(),
  preferredTheme: z.enum(["DARK_LUXE", "DARK_CONTRAST"])
});

export type ThemePreferenceInput = z.infer<typeof themePreferenceSchema>;
