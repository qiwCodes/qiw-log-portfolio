"use client";

type StickyTopbarProps = {
  isLight: boolean;
  theme: "dark" | "light";
  onToggleTheme: () => void;
  onToggleMenu: () => void;
};

function nowStamp() {
  return new Date().toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function StickyTopbar({
  isLight,
  theme,
  onToggleTheme,
  onToggleMenu,
}: StickyTopbarProps) {
  return (
    <header className="fixed left-0 right-0 top-0 z-[72] px-2 pt-2 sm:px-3 sm:pt-3 md:px-5 md:pt-4">
      <div
        className={`mx-auto flex h-11 w-full max-w-[1100px] items-center justify-between gap-2 rounded-full border px-2.5 sm:h-12 sm:px-3 md:h-14 md:px-4 ${
          isLight ? "border-black/20 bg-white/90 text-black" : "border-white/20 bg-black/72 text-white"
        }`}
      >
        <p className="meta-label text-[0.5rem] sm:text-[0.65rem]">qiw.log / live</p>
        <p className="meta-label hidden md:block">{nowStamp()}</p>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            className={`rounded-full border px-2.5 py-1 text-[0.5rem] tracking-[0.14em] transition sm:px-3 sm:text-[0.58rem] sm:tracking-[0.16em] ${
              isLight
                ? "border-black/30 hover:bg-black hover:text-white"
                : "border-white/30 hover:bg-white hover:text-black"
            }`}
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>
          <button
            type="button"
            onClick={onToggleMenu}
            aria-label="Open navigation menu"
            className={`rounded-full border px-2.5 py-1 text-[0.5rem] tracking-[0.14em] transition sm:px-3 sm:text-[0.58rem] sm:tracking-[0.16em] ${
              isLight
                ? "border-black/30 hover:bg-black hover:text-white"
                : "border-white/30 hover:bg-white hover:text-black"
            }`}
          >
            <span className="relative block h-3.5 w-4 sm:hidden">
              <span className="absolute left-0 top-0 h-[1.5px] w-4 bg-current" />
              <span className="absolute left-0 top-1.5 h-[1.5px] w-4 bg-current" />
              <span className="absolute left-0 top-3 h-[1.5px] w-4 bg-current" />
            </span>
            <span className="hidden text-[0.58rem] tracking-[0.16em] sm:inline">Menu</span>
          </button>
        </div>
      </div>
    </header>
  );
}
