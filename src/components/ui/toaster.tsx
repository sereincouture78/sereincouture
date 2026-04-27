"use client";

import { Toaster } from "sonner";

export function AppToaster() {
  return (
    <Toaster
      richColors
      theme="dark"
      toastOptions={{
        style: {
          background: "#0E1629",
          color: "#F5F7FF",
          border: "1px solid rgba(212,175,55,0.25)"
        }
      }}
    />
  );
}
