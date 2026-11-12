// Small progressive enhancements. The page is complete without this file (menu is <details>, all text is in the HTML).

// Mobile menu: close after choosing a question, and on Escape.
const menu = document.querySelector<HTMLDetailsElement>("details.menu");
menu?.querySelectorAll<HTMLAnchorElement>("a[href^='#']").forEach((a) => a.addEventListener("click", (e) => {
  e.preventDefault();
  menu.open = false;
  const target = document.querySelector(a.getAttribute("href")!);
  // wait one frame so the page can scroll again after the menu lock is released
  requestAnimationFrame(() => { target?.scrollIntoView(); history.replaceState(null, "", a.getAttribute("href")); });
}));
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && menu?.open) { menu.open = false; menu.querySelector("summary")?.focus(); } });
window.matchMedia("(min-width: 1100px)").addEventListener("change", (m) => { if (m.matches && menu) menu.open = false; });

// Package tabs: Реабілітація / Догляд (only the line about classes changes).
const pkg = document.querySelector<HTMLElement>("[data-pkg]");
if (pkg) {
  const tabs = Array.from(pkg.querySelectorAll<HTMLButtonElement>("[role=tab]"));
  const select = (tab: HTMLButtonElement, focus = false) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute("aria-controls")!)?.classList.toggle("is-active", on);
    });
    if (focus) tab.focus();
  };
  tabs.forEach((t, i) => {
    t.addEventListener("click", () => select(t));
    t.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") { e.preventDefault(); select(tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length], true); }
    });
  });
}

// Sticky call bar on phones: appears once the first screen has been scrolled past.
const bar = document.querySelector<HTMLElement>(".sticky-bar");
const band = document.querySelector<HTMLElement>(".hero__band");
if (bar && band && "IntersectionObserver" in window) {
  new IntersectionObserver(([e]) => bar.classList.toggle("is-on", !e.isIntersecting), { threshold: 0 }).observe(band);
} else bar?.classList.add("is-on");

// Rail of questions (desktop): highlights the block in the middle of the screen.
const rail = document.querySelector<HTMLElement>(".rail");
const sections = Array.from(document.querySelectorAll<HTMLElement>("section[id]")).filter((s) => rail?.querySelector(`[data-rail="${s.id}"]`));
if (rail && sections.length && "IntersectionObserver" in window) {
  const dark = new Set(["prices", "contacts"]);
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      rail.classList.add("is-on");
      rail.classList.toggle("on-dark", dark.has(e.target.id));
      rail.querySelectorAll("a").forEach((a) => {
        const cur = a.dataset.rail === e.target.id;
        a.classList.toggle("is-current", cur);
        if (cur) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
      });
    }
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach((s) => io.observe(s));
  const hero = document.getElementById("hero");
  if (hero) new IntersectionObserver(([e]) => { if (e.isIntersecting) rail.classList.remove("is-on"); }, { rootMargin: "-45% 0px -50% 0px" }).observe(hero);
}
