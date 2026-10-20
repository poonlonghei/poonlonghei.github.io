"use client";

import { useEffect, useState } from "react";

export function SiteHeader({ chinese = false }: { chinese?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  if (!chinese) {
    return <header className="english-header">
      <a className="english-brand" href="/" aria-label="Chavez Poon home"><span>C</span><i aria-hidden="true">P</i></a>
      <nav className={`english-nav${menuOpen ? " is-open" : ""}`} id="site-navigation" aria-label="Main navigation">
        <a href="/">Home</a>
        <a href="/resume/">Curriculum Vitae</a>
        <a href="/portfolio/">Portfolio</a>
        <a href="/blog/">Blog</a>
        <a className="english-nav-contact" href="/#contact">Get in touch <span aria-hidden="true">↗</span></a>
      </nav>
      <button className="english-menu-toggle" type="button" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen} aria-controls="site-navigation" onClick={() => setMenuOpen(open => !open)}>
        <span /><span />
      </button>
    </header>;
  }
}

export function SiteFooter({ chinese = false }: { chinese?: boolean }) {
  const [time, setTime] = useState("--:--:--");
  useEffect(() => {
    const update = () => setTime(new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true }).format(new Date()));
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);
  if (!chinese) {
    return <footer className="english-footer">
      <a className="english-footer-name" href="/">Copyright © {new Date().getFullYear()} Chavez Poon</a>
      <span>Ex umbris et imaginibus in veritatem.</span>
      <div className="english-footer-links">
        <a href="https://www.youtube.com/@cyrillusmariae" target="_blank" rel="noopener noreferrer">YouTube ↗</a>
        <a href="https://poonlonghei.substack.com" target="_blank" rel="noopener noreferrer">Substack ↗</a>
        <a href="mailto:cyrillusmariae@outlook.com">Email ↗</a>
      </div>
    </footer>;
  }
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return <div className="english-shell">
    <div className="english-main">
      <SiteHeader />
      <div className="english-content">{children}</div>
      <SiteFooter />
    </div>
  </div>;
}
