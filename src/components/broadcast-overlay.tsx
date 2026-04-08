"use client";

export function BroadcastOverlay() {
  return (
    <>
      <div aria-hidden className="crt-overlay" />
      <div aria-hidden className="grain-overlay" />
      <div aria-hidden className="flicker-overlay" />
    </>
  );
}
