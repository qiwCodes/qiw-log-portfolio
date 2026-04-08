export function BackgroundLayer() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 min-h-screen bg-center bg-cover"
        style={{
          backgroundImage:
            "radial-gradient(120% 100% at 15% 10%, rgba(255,255,255,0.16), transparent 55%), radial-gradient(90% 80% at 85% 12%, rgba(255,255,255,0.12), transparent 58%), radial-gradient(90% 100% at 55% 95%, rgba(255,255,255,0.10), transparent 62%), linear-gradient(180deg, color-mix(in srgb, var(--bg) 96%, #000 4%) 0%, color-mix(in srgb, var(--surface) 88%, var(--bg) 12%) 55%, var(--bg) 100%)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </div>
  );
}
