"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icons/icon";
import { cn } from "@/lib/utils";
import { LiquidGlassFilter, useLiquidGlass } from "./liquid-glass";
import { Wordmark } from "./mark";

const links = [
  { href: "#work", id: "work", label: "Work" },
  { href: "#services", id: "services", label: "Services" },
  { href: "#process", id: "process", label: "Process" },
  { href: "#faq", id: "faq", label: "FAQ" },
];

const ease = [0.23, 1, 0.32, 1] as const;

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const seen = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => seen.set(e.target.id, e.isIntersecting));
        setActive(ids.find((id) => seen.get(id)) ?? null);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

const sectionIds = [...links.map((l) => l.id), "contact"];

/** Which ground is under the pill: sections marked data-nav-tone="dark" switch the glass to its dark tint. */
function useNavTone() {
  const [tone, setTone] = useState<"light" | "dark">("light");
  useEffect(() => {
    let observer: IntersectionObserver | undefined;
    const under = new Set<Element>();
    const setup = () => {
      observer?.disconnect();
      under.clear();
      const line = 48; // vertical centre of the pill
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => (e.isIntersecting ? under.add(e.target) : under.delete(e.target)));
          setTone(under.size ? "dark" : "light");
        },
        { rootMargin: `-${line}px 0px -${Math.max(window.innerHeight - line - 1, 0)}px 0px` },
      );
      document.querySelectorAll('[data-nav-tone="dark"]').forEach((el) => observer?.observe(el));
    };
    setup();
    window.addEventListener("resize", setup);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", setup);
    };
  }, []);
  return tone;
}

export function Nav() {
  const active = useActiveSection(sectionIds);
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const glassMap = useLiquidGlass(navRef);
  const sectionTone = useNavTone();
  const dark = sectionTone === "dark" && !open;
  const menuButton = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.documentElement.style.overflow = "hidden";
    // The open menu is the only thing that can take focus: the page behind it goes inert.
    const behind = document.querySelectorAll("main, footer");
    behind.forEach((el) => el.setAttribute("inert", ""));
    window.addEventListener("keydown", onKey);
    firstLink.current?.focus();
    return () => {
      document.documentElement.style.overflow = "";
      behind.forEach((el) => el.removeAttribute("inert"));
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 md:pt-6">
      {glassMap && <LiquidGlassFilter map={glassMap} />}
      <nav
        ref={navRef}
        aria-label="Main"
        data-tone={dark ? "dark" : "light"}
        className={cn(
          "liquid-glass relative z-10 flex w-full max-w-md items-center justify-between gap-2 rounded-full py-1.5 pr-1.5 pl-4 transition-[color] duration-300 md:w-max md:max-w-none md:gap-6",
          glassMap && "lg-refract",
          dark ? "text-on-night" : "text-ink",
        )}
      >
        <span aria-hidden="true" className="lg-layer lg-backdrop" />
        <span aria-hidden="true" className="lg-layer lg-tint" />
        <span aria-hidden="true" className="lg-layer lg-shine" />

        <a href="#top" className="relative rounded-full py-1.5" aria-label="Ruhi IT Hub, back to top">
          <Wordmark tone={dark ? "night" : "ink"} />
        </a>

        <ul className="relative hidden items-center md:flex">
          {links.map((link) => {
            const isActive = active === link.id;
            return (
              <li key={link.id} className="relative">
                <a
                  href={link.href}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "relative z-10 block rounded-full px-4 py-2 text-sm font-semibold transition-[color,background-color] duration-200",
                    isActive && "underline decoration-2 underline-offset-[6px]",
                    isActive && (dark ? "decoration-brass-bright" : "decoration-brass"),
                    !isActive && (dark ? "hover:bg-white/10" : "hover:bg-white/45"),
                  )}
                >
                  {link.label}
                </a>
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className={cn(
                      "absolute inset-0 rounded-full transition-[background-color,box-shadow] duration-300",
                      dark
                        ? "bg-white/12 shadow-[inset_0_1px_0_rgb(255_255_255/0.22)]"
                        : "bg-white/60 shadow-[inset_0_1px_0_rgb(255_255_255/0.95),0_1px_3px_rgb(30_26_17/0.14)]",
                    )}
                    transition={{ type: "spring", duration: 0.4, bounce: 0 }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        <a
          href="#contact"
          className={cn(
            "relative hidden items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold [text-shadow:none] transition-[background-color,color,scale] duration-150 ease-out active:scale-[0.97] md:inline-flex",
            dark ? "bg-paper text-ink hover:bg-paper/90" : "bg-ink text-paper hover:bg-ink/85",
          )}
        >
          Start a project
          <Icon name="arrow-right-up" className="size-4 [&_path]:stroke-2" />
        </a>

        <button
          ref={menuButton}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className={cn(
            "relative grid size-11 place-items-center rounded-full transition-[background-color,color,scale] duration-150 ease-out active:scale-[0.97] md:hidden",
            dark ? "bg-paper text-ink" : "bg-ink text-paper",
          )}
        >
          <span
            className={cn(
              "absolute h-[1.5px] w-4 rounded-full bg-current transition-transform duration-250 ease-[cubic-bezier(0.77,0,0.175,1)]",
              open ? "translate-y-0 rotate-45" : "-translate-y-[3.5px]",
            )}
          />
          <span
            className={cn(
              "absolute h-[1.5px] w-4 rounded-full bg-current transition-transform duration-250 ease-[cubic-bezier(0.77,0,0.175,1)]",
              open ? "translate-y-0 -rotate-45" : "translate-y-[3.5px]",
            )}
          />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease }}
            className="fixed inset-0 bg-paper/85 backdrop-blur-2xl md:hidden"
          >
            <nav aria-label="Mobile" className="flex h-full flex-col justify-between px-6 pt-32 pb-10">
              <ul className="flex flex-col gap-2">
                {[...links, { href: "#contact", id: "contact", label: "Contact" }].map((link, i) => (
                  <li key={link.id} className="overflow-hidden">
                    <motion.a
                      ref={i === 0 ? firstLink : undefined}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      initial={{ transform: "translateY(100%)", opacity: 0 }}
                      animate={{ transform: "translateY(0%)", opacity: 1 }}
                      transition={{ duration: 0.35, ease, delay: 0.04 + i * 0.04 }}
                      className="block py-1 font-display text-5xl text-ink"
                    >
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
              <motion.a
                href="mailto:info@ruhiithub.com"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, ease, delay: 0.2 }}
                className="text-base font-semibold text-ink-soft"
              >
                info@ruhiithub.com
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
