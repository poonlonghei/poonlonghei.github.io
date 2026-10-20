"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useEffect, useState } from "react";
import { BootScreen } from "@/components/boot-screen";

function UkFlag() {
  return <svg className="language-flag" viewBox="0 0 60 30" role="img" aria-label="United Kingdom flag"><path fill="#012169" d="M0 0h60v30H0z"/><path stroke="#fff" strokeWidth="6" d="m0 0 60 30M60 0 0 30"/><path stroke="#c8102e" strokeWidth="2.5" d="m0 0 60 30M60 0 0 30"/><path stroke="#fff" strokeWidth="10" d="M30 0v30M0 15h60"/><path stroke="#c8102e" strokeWidth="5" d="M30 0v30M0 15h60"/></svg>;
}

function HongKongFlag() {
  return <svg className="language-flag" viewBox="0 0 60 40" role="img" aria-label="Hong Kong flag"><path fill="#de2910" d="M0 0h60v40H0z"/><g fill="#fff" transform="translate(30 20)"><path d="M0-11c5-2 8 2 5 6-1 2-3 3-5 5-2-2-4-3-5-5-3-4 0-8 5-6Z" transform="rotate(0)"/><path d="M0-11c5-2 8 2 5 6-1 2-3 3-5 5-2-2-4-3-5-5-3-4 0-8 5-6Z" transform="rotate(72)"/><path d="M0-11c5-2 8 2 5 6-1 2-3 3-5 5-2-2-4-3-5-5-3-4 0-8 5-6Z" transform="rotate(144)"/><path d="M0-11c5-2 8 2 5 6-1 2-3 3-5 5-2-2-4-3-5-5-3-4 0-8 5-6Z" transform="rotate(216)"/><path d="M0-11c5-2 8 2 5 6-1 2-3 3-5 5-2-2-4-3-5-5-3-4 0-8 5-6Z" transform="rotate(288)"/><circle r="2.2" fill="#de2910"/></g></svg>;
}

export function LanguageMenu({ chinese = false }: { chinese?: boolean }) {
  return <DropdownMenu.Root>
    <DropdownMenu.Trigger className="language-trigger" aria-label={chinese ? "選擇語言" : "Choose language"}>
      <svg className="language-globe" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.35 2.35 3.45 5.4 3.45 9S14.35 18.65 12 21c-2.35-2.35-3.45-5.4-3.45-9S9.65 5.35 12 3Z"/></svg>
    </DropdownMenu.Trigger>
    <DropdownMenu.Portal><DropdownMenu.Content className="language-menu" align="end" sideOffset={10}>
      <DropdownMenu.Item asChild><a href="/" aria-current={!chinese ? "page" : undefined}><span className="language-option-label"><UkFlag />English</span><span>EN</span></a></DropdownMenu.Item>
      <DropdownMenu.Item asChild><a href="/zh-hk/" aria-current={chinese ? "page" : undefined}><span className="language-option-label"><HongKongFlag />繁體中文（香港）</span><span>繁</span></a></DropdownMenu.Item>
    </DropdownMenu.Content></DropdownMenu.Portal>
  </DropdownMenu.Root>;
}

export function SiteHeader({ chinese = false }: { chinese?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = chinese
    ? { about: "關於我", work: "作品", writing: "文章", contact: "聯絡" }
    : { about: "About", work: "Work", writing: "Writing", contact: "Contact" };
  return <header className="site-header">
    <a className="site-brand" href={chinese ? "/zh-hk/" : "/"}>Chavez Poon<span>.</span></a>
    <button className="mobile-menu-toggle" type="button" aria-label={menuOpen ? (chinese ? "關閉導覽選單" : "Close navigation menu") : (chinese ? "開啟導覽選單" : "Open navigation menu")} aria-expanded={menuOpen} aria-controls="site-navigation" onClick={() => setMenuOpen(open => !open)}>
      <span /><span /><span />
    </button>
    <nav className={`desktop-nav${menuOpen ? " is-open" : ""}`} id="site-navigation" aria-label={chinese ? "主導覽" : "Main navigation"}>
      <a href={chinese ? "/zh-hk/#about" : "/#about"} onClick={() => setMenuOpen(false)}>{t.about}</a>
      <a href={chinese ? "/zh-hk/#work" : "/#work"} onClick={() => setMenuOpen(false)}>{t.work}</a>
      <a href={chinese ? "/zh-hk/#writing" : "/#writing"} onClick={() => setMenuOpen(false)}>{t.writing}</a>
      <a href={chinese ? "/zh-hk/#contact" : "/#contact"} onClick={() => setMenuOpen(false)}>{t.contact}</a>
    </nav>
    <LanguageMenu chinese={chinese} />
  </header>;
}

export function SiteFooter({ chinese = false }: { chinese?: boolean }) {
  const [time, setTime] = useState("--:--:--");
  useEffect(() => {
    const update = () => setTime(new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true }).format(new Date()));
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);
  return <footer className="site-footer"><span>© {new Date().getFullYear()} Chavez Poon</span><span>{chinese ? "願天主受讚美" : "Dixi, et salvavi animam meam!"}</span><span><span className="footer-time-label">LOCAL TIME</span> {time}</span></footer>;
}

export function PageShell({ children, chinese = false }: { children: React.ReactNode; chinese?: boolean }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const sections = document.querySelectorAll("main > section");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    sections.forEach(section => {
      section.classList.add("fade-section");
      observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);
  return <><BootScreen chinese={chinese} /><SiteHeader chinese={chinese} />{children}<SiteFooter chinese={chinese} /></>;
}
