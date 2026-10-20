"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useEffect, useState } from "react";

function UkFlag() {
  return <svg className="language-flag" viewBox="0 0 60 30" role="img" aria-label="United Kingdom flag"><path fill="#012169" d="M0 0h60v30H0z"/><path stroke="#fff" strokeWidth="6" d="m0 0 60 30M60 0 0 30"/><path stroke="#c8102e" strokeWidth="2.5" d="m0 0 60 30M60 0 0 30"/><path stroke="#fff" strokeWidth="10" d="M30 0v30M0 15h60"/><path stroke="#c8102e" strokeWidth="5" d="M30 0v30M0 15h60"/></svg>;
}

function HongKongFlag() {
  return <svg className="language-flag" viewBox="0 0 900 600" role="img" aria-label="Hong Kong SAR flag">
    <path fill="#ee1c25" d="M0 0h900v600H0z" />
    <defs>
      <g id="hong-kong-flag-flower">
        <path fill="#fff" d="M492.936022 125.19583a27.917245 27.917245 0 0 0-14.901582 41.791893 45.171052 45.171052 0 0 1-20.289932 66.204239 38.650583 38.650583 0 0 0-10.816469 64.313021 68.374981 68.374981 0 0 1-17.067835-93.913589 15.809868 15.809868 0 0 1-1.109109-1.047777 69.880683 69.880683 0 0 0 16.754434 95.793146 90.342104 90.342104 0 0 1 47.430493-173.140933" />
        <path d="m451.979333 181.099409-27.564739 12.021638 29.366483 6.476437-19.951229-22.500734 2.915284 29.930515" />
      </g>
    </defs>
    <use href="#hong-kong-flag-flower" />
    <use href="#hong-kong-flag-flower" transform="rotate(72 450 300)" />
    <use href="#hong-kong-flag-flower" transform="rotate(216 450 300)" />
    <use href="#hong-kong-flag-flower" transform="rotate(144 450 300)" />
    <use href="#hong-kong-flag-flower" transform="rotate(288 450 300)" />
  </svg>;
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
  const sectionBase = chinese ? "/zh-hk/" : "/";
  return <header className="site-header">
    <a className="site-brand" href={chinese ? "/zh-hk/" : "/"}>Chavez Poon<span>.</span></a>
    <button className="mobile-menu-toggle" type="button" aria-label={menuOpen ? (chinese ? "關閉導覽選單" : "Close navigation menu") : (chinese ? "開啟導覽選單" : "Open navigation menu")} aria-expanded={menuOpen} aria-controls="site-navigation" onClick={() => setMenuOpen(open => !open)}>
      <span /><span /><span />
    </button>
    <nav className={`desktop-nav${menuOpen ? " is-open" : ""}`} id="site-navigation" aria-label={chinese ? "主導覽" : "Main navigation"}>
      <a href={`${sectionBase}#about`} onClick={() => setMenuOpen(false)}>{t.about}</a>
      <a href={`${sectionBase}#work`} onClick={() => setMenuOpen(false)}>{t.work}</a>
      <a href={`${sectionBase}#writing`} onClick={() => setMenuOpen(false)}>{t.writing}</a>
      <a href={`${sectionBase}#contact`} onClick={() => setMenuOpen(false)}>{t.contact}</a>
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
  return <><SiteHeader chinese={chinese} />{children}<SiteFooter chinese={chinese} /></>;
}
