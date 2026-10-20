"use client";

import { useEffect, useState } from "react";

type Line = { command: string; response: string };

function getClientLabel() {
  const ua = navigator.userAgent;
  const browser = /Edg\//.test(ua) ? "Microsoft Edge" : /OPR\//.test(ua) ? "Opera" : /Firefox\//.test(ua) ? "Firefox" : /Chrome\//.test(ua) ? "Chrome" : /Safari\//.test(ua) ? "Safari" : "Browser";
  const os = /Windows NT 10/.test(ua) ? "Windows" : /Mac OS X/.test(ua) ? "macOS" : /Android/.test(ua) ? "Android" : /iPhone|iPad/.test(ua) ? "iOS" : /Linux/.test(ua) ? "Linux" : "device";
  return `${os} · ${browser}`;
}

export function BootScreen({ chinese = false }: { chinese?: boolean }) {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [lines, setLines] = useState<Line[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const storageKey = "chavez-poon-boot-complete";
    if (sessionStorage.getItem(storageKey)) return;
    setVisible(true);
    const commandLines: Line[] = [
      { command: "systemctl start www.chavezpoon.com", response: chinese ? "正在啟動個人網站服務……" : "Starting personal website service…" },
      { command: "networkctl status hosting", response: chinese ? "已連接網站主機。" : "Web host connection established." },
      { command: "client-detect --summary", response: `${chinese ? "用戶端：" : "Client detected: "}${getClientLabel()}` },
      { command: "mount /site/content", response: chinese ? "已載入網站內容與媒體。" : "Website content and media loaded." }
    ];
    setLines(commandLines);
    window.setTimeout(startProgress, 800);

    function startProgress() {
      let value = 0;
      const timer = window.setInterval(() => {
        value = Math.min(100, value + Math.ceil(Math.random() * 12));
        setProgress(value);
        if (value >= 100) {
          window.clearInterval(timer);
          window.setTimeout(() => {
            setReady(true);
            window.setTimeout(() => {
              sessionStorage.setItem(storageKey, "true");
              setVisible(false);
            }, 500);
          }, 350);
        }
      }, 110);
    }

    return undefined;
  }, [chinese]);

  if (!visible) return null;
  return <div className="boot-screen" role="dialog" aria-modal="true" aria-label={chinese ? "網站啟動畫面" : "Website startup screen"}>
    <div className="boot-window"><div className="boot-titlebar"><span className="boot-led" /> tty1 — www.chavezpoon.com</div><div className="boot-content">
      <p className="boot-heading">[ OK ] {chinese ? "網站系統啟動" : "WEBSITE SYSTEM STARTUP"}</p>
      <div className="boot-lines">{lines.map(line => <div className="boot-line" key={line.command}><p><span>chavez:~$</span> {line.command}</p><small>{line.response}</small></div>)}</div>
      {!ready && <div className="boot-startup"><div className="boot-progress-line"><span>{chinese ? "正在啟動" : "Starting up"}</span><span>{progress}%</span></div><div className="boot-progress-track"><span style={{ width: `${progress}%` }} /></div></div>}
      {ready && <p className="boot-ready">{chinese ? "系統就緒。歡迎。" : "System ready. Welcome."}<span /></p>}
    </div></div>
  </div>;
}
