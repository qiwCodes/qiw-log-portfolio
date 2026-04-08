"use client";

import { AnimatePresence, motion } from "framer-motion";

type MenuItem = {
  label: string;
  targetId: string;
  index: string;
};

type ImmersiveMenuProps = {
  open: boolean;
  isLight: boolean;
  items: MenuItem[];
  onClose: () => void;
  onNavigate: (targetId: string) => void;
};

export function ImmersiveMenu({
  open,
  isLight,
  items,
  onClose,
  onNavigate,
}: ImmersiveMenuProps) {
  return (
    <AnimatePresence>
      {open ? (
        <aside className="fixed inset-0 z-[90]">
          <button
            type="button"
            aria-label="Close menu backdrop"
            onClick={onClose}
            className="absolute inset-0 z-0 bg-black/45 lg:hidden"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className={`relative z-10 ml-auto flex h-full w-full max-w-full flex-col px-4 pb-6 pt-5 sm:max-w-[420px] sm:px-5 sm:pb-8 sm:pt-6 md:max-w-[520px] md:px-8 lg:hidden ${
              isLight ? "bg-white text-black" : "bg-black text-white"
            }`}
          >
            <div className="flex items-center justify-between border-b border-current/25 pb-3 sm:pb-4">
              <p className="meta-label">{isLight ? "Light Broadcast" : "Dark Broadcast"}</p>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className={`group relative z-10 grid h-10 w-10 place-items-center rounded-full border border-current/35 transition-colors active:scale-95 sm:h-11 sm:w-11 ${
                  isLight
                    ? "text-black hover:bg-black hover:text-white"
                    : "text-white hover:bg-white hover:text-black"
                }`}
              >
                <span className="relative block h-4 w-4">
                  <span
                    className={`absolute left-1/2 top-1/2 h-[2px] w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 transition-colors ${
                      isLight ? "bg-black group-hover:bg-white" : "bg-white group-hover:bg-black"
                    }`}
                  />
                  <span
                    className={`absolute left-1/2 top-1/2 h-[2px] w-4 -translate-x-1/2 -translate-y-1/2 -rotate-45 transition-colors ${
                      isLight ? "bg-black group-hover:bg-white" : "bg-white group-hover:bg-black"
                    }`}
                  />
                </span>
              </button>
            </div>

            <nav className="mt-6 flex flex-1 flex-col justify-center gap-2.5 sm:mt-8 sm:gap-3 md:gap-4">
              {items.map((item, idx) => (
                <motion.button
                  key={item.targetId}
                  type="button"
                  onClick={() => onNavigate(item.targetId)}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.42, delay: 0.06 * idx, ease: [0.2, 0.8, 0.2, 1] }}
                  className={`group flex items-end justify-between border-b border-current/18 py-2.5 text-left transition sm:py-3 ${
                    isLight ? "hover:text-black/70" : "hover:text-white/70"
                  }`}
                >
                  <span className="text-4xl leading-none sm:text-5xl md:text-6xl">{item.label}</span>
                  <span className="meta-label pb-1.5 sm:pb-2 transition group-hover:translate-x-1">
                    {item.index}
                  </span>
                </motion.button>
              ))}
            </nav>
          </motion.div>

          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
            className={`hidden h-full w-full flex-col px-10 pb-8 pt-6 lg:flex ${
              isLight ? "bg-white text-black" : "bg-black text-white"
            }`}
          >
            <div className="flex items-center justify-between border-b border-current/25 pb-4">
              <p className="meta-label">{isLight ? "Light Broadcast" : "Dark Broadcast"}</p>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className={`group relative z-10 grid h-11 w-11 place-items-center rounded-full border border-current/35 transition-colors active:scale-95 ${
                  isLight
                    ? "text-black hover:bg-black hover:text-white"
                    : "text-white hover:bg-white hover:text-black"
                }`}
              >
                <span className="relative block h-4 w-4">
                  <span
                    className={`absolute left-1/2 top-1/2 h-[2px] w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 transition-colors ${
                      isLight ? "bg-black group-hover:bg-white" : "bg-white group-hover:bg-black"
                    }`}
                  />
                  <span
                    className={`absolute left-1/2 top-1/2 h-[2px] w-4 -translate-x-1/2 -translate-y-1/2 -rotate-45 transition-colors ${
                      isLight ? "bg-black group-hover:bg-white" : "bg-white group-hover:bg-black"
                    }`}
                  />
                </span>
              </button>
            </div>

            <nav className="mt-8 flex flex-1 flex-col justify-center gap-4">
              {items.map((item, idx) => (
                <motion.button
                  key={`desktop-${item.targetId}`}
                  type="button"
                  onClick={() => onNavigate(item.targetId)}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.42, delay: 0.06 * idx, ease: [0.2, 0.8, 0.2, 1] }}
                  className={`group flex items-end justify-between border-b border-current/18 py-3 text-left transition ${
                    isLight ? "hover:text-black/70" : "hover:text-white/70"
                  }`}
                >
                  <span className="text-8xl leading-none">{item.label}</span>
                  <span className="meta-label pb-2 transition group-hover:translate-x-1">{item.index}</span>
                </motion.button>
              ))}
            </nav>
          </motion.div>
        </aside>
      ) : null}
    </AnimatePresence>
  );
}
