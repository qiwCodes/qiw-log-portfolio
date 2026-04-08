"use client";

type NavItem = {
  label: string;
  targetId: string;
};

type StickyNavbarProps = {
  isLight: boolean;
  items: NavItem[];
  onNavigate: (targetId: string) => void;
};

export function StickyNavbar({ isLight, items, onNavigate }: StickyNavbarProps) {
  return (
    <nav
      className={`fixed left-1/2 top-4 z-[70] w-[min(96vw,980px)] -translate-x-1/2 rounded-full border px-3 py-2 backdrop-blur-md md:px-4 ${
        isLight ? "border-black/20 bg-white/85 text-black" : "border-white/20 bg-black/65 text-white"
      }`}
    >
      <div className="flex flex-wrap items-center justify-center gap-1 md:gap-2">
        {items.map((item) => (
          <button
            key={item.targetId}
            type="button"
            onClick={() => onNavigate(item.targetId)}
            className={`rounded-full px-3 py-2 text-[0.62rem] uppercase tracking-[0.18em] transition md:px-4 ${
              isLight
                ? "hover:bg-black hover:text-white"
                : "hover:bg-white hover:text-black"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
