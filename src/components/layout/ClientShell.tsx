"use client";

import ScrollSpeedTracker from "./ScrollSpeedTracker";

export default function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollSpeedTracker />
      {children}
    </>
  );
}
