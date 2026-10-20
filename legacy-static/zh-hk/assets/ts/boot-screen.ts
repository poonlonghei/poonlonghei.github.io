interface BootWindow extends Window {
  ClientDetection?: {
    detect?: () => string;
    detectWithVersion?: () => Promise<string>;
  };
  sizeBootTerminal?: (log: HTMLElement, ready: HTMLElement, steps: string[][], prompt: string, includeConsent?: boolean, includeProgress?: boolean) => void;
}

(() => {
const bootWindow = window as BootWindow;
const bootScreen = document.querySelector<HTMLElement>(".boot-screen");
const bootLog = document.getElementById("boot-log");
const bootReady = document.getElementById("boot-ready");
const pageContent = document.querySelector<HTMLElement>(".page");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const pageName = document.body.dataset.page || "index.html";
const navigation = performance.getEntriesByType("navigation")[0];
const isReload = navigation?.type === "reload";
const isFirstMainVisit = (() => {
  if (pageName !== "zh-hk/index.html" || navigation?.type !== "navigate" || (navigation.redirectCount || 0) > 0) return false;
  try {
    if (document.referrer && new URL(document.referrer).origin === window.location.origin) return false;
    const key = "chavezpoon-zh-hk-boot-choice-v1";
    if (window.sessionStorage.getItem(key)) return false;
    window.sessionStorage.setItem(key, "shown");
  } catch { /* Continue if this browser blocks session storage. */ }
  return true;
})();
const isMobileView = window.matchMedia("(max-width: 760px)").matches;
const shouldAskBootChoice = isFirstMainVisit && !isMobileView;
if (isMobileView) document.getElementById("boot-consent-input")?.removeAttribute("autofocus");

const pageBoot: Record<string, { command: string; prompt: string; steps: string[][] }> = {
  "index.html": {
    command: "./boot",
    prompt: "chavez:~$ ",
    steps: [
      ["./boot", "[  OK  ]  Website started"],
      [`systemctl ${isReload ? "restart" : "start"} www.chavezpoon.com`, `[  OK  ]  ${isReload ? "Reloading" : "Starting up"} main page`],
      ["connect-hosting www.chavezpoon.com", "[  OK  ]  Web hosting connection established"],
      ["detect-client --device --os --browser", "[  OK  ]  已偵測到用戶端"],
      [`${isReload ? "reload" : "open"} --page ${pageName}`, `[  OK  ]  ${isReload ? "Reloaded" : "Opened"} ${pageName}`],
      ["start-particles", "[  OK  ]  Particle field started"],
      ["load-about", "[  OK  ]  About section loaded"],
      ["open-resume", "[  OK  ]  Resume page connected"]
    ]
  },
  "portfolio.html": {
    command: "./boot-portfolio", prompt: "chavez:~/portfolio$ ", steps: [
      ["./boot-portfolio", "[  OK  ]  Portfolio environment initialized"],
      [`systemctl ${isReload ? "restart" : "start"} www.chavezpoon.com`, `[  OK  ]  ${isReload ? "Reloading" : "Starting up"} website`],
      ["connect-hosting www.chavezpoon.com", "[  OK  ]  Web hosting connection established"],
      ["detect-client --device --os --browser", "[  OK  ]  已偵測到用戶端"],
      [`${isReload ? "reload" : "open"} --page ${pageName}`, `[  OK  ]  ${isReload ? "Reloaded" : "Opened"} ${pageName}`],
      ["load portfolio --all", "[  OK  ]  Projects and works loaded"],
      ["connect-profile", "[  OK  ]  Chavez Poon profile connected"]
    ]
  },
  "gallery.html": {
    command: "./boot-gallery", prompt: "chavez:~/gallery$ ", steps: [
      ["./boot-gallery", "[  OK  ]  Gallery environment initialized"],
      [`systemctl ${isReload ? "restart" : "start"} www.chavezpoon.com/gallery`, `[  OK  ]  ${isReload ? "Reloading" : "Starting up"} photo gallery`],
      ["connect-hosting www.chavezpoon.com", "[  OK  ]  Web hosting connection established"],
      ["detect-client --device --os --browser", "[  OK  ]  已偵測到用戶端"],
      [`${isReload ? "reload" : "open"} --page ${pageName}`, `[  OK  ]  ${isReload ? "Reloaded" : "Opened"} ${pageName}`],
      ["load gallery --photos", "[  OK  ]  Photo collection loaded"],
      ["await gallery-upload", "[  OK  ]  Gallery ready for photographs"]
    ]
  },
  "resume.html": {
    command: "./boot-resume", prompt: "chavez:~/resume$ ", steps: [
      ["./boot-resume", "[  OK  ]  Resume environment initialized"],
      [`systemctl ${isReload ? "restart" : "start"} www.chavezpoon.com`, `[  OK  ]  ${isReload ? "Reloading" : "Starting up"} website`],
      ["connect-hosting www.chavezpoon.com", "[  OK  ]  Web hosting connection established"],
      ["detect-client --device --os --browser", "[  OK  ]  已偵測到用戶端"],
      [`${isReload ? "reload" : "open"} --page ${pageName}`, `[  OK  ]  ${isReload ? "Reloaded" : "Opened"} ${pageName}`],
      ["load professional-profile", "[  OK  ]  Profile loaded"],
      ["load experience --all", "[  OK  ]  Experience and service records loaded"]
    ]
  },
  "blog/index.html": {
    command: "./boot-blog", prompt: "chavez:~/blog$ ", steps: [
      ["./boot-blog", "[  OK  ]  Blog environment initialized"],
      [`systemctl ${isReload ? "restart" : "start"} www.chavezpoon.com/blog`, `[  OK  ]  ${isReload ? "Reloading" : "Starting up"} blog`],
      ["connect-hosting www.chavezpoon.com", "[  OK  ]  Web hosting connection established"],
      ["detect-client --device --os --browser", "[  OK  ]  已偵測到用戶端"],
      [`${isReload ? "reload" : "open"} --page ${pageName}`, `[  OK  ]  ${isReload ? "Reloaded" : "Opened"} ${pageName}`],
      ["load blog --posts", "[  OK  ]  Blog page initialized"],
      ["await new posts", "[  OK  ]  Blog is ready for new writing"]
    ]
  },
  "posts/new-website.html": {
    command: "./boot-post", prompt: "chavez:~/posts$ ", steps: [
      ["./boot-post", "[  OK  ]  Post environment initialized"],
      [`systemctl ${isReload ? "restart" : "start"} www.chavezpoon.com/blog`, `[  OK  ]  ${isReload ? "Reloading" : "Starting up"} blog post`],
      ["connect-hosting www.chavezpoon.com", "[  OK  ]  Web hosting connection established"],
      ["detect-client --device --os --browser", "[  OK  ]  已偵測到用戶端"],
      [`${isReload ? "reload" : "open"} --page ${pageName}`, `[  OK  ]  ${isReload ? "Reloaded" : "Opened"} ${pageName}`],
      ["load post new-website", "[  OK  ]  New Website post loaded"],
      ["calculate reading-time", "[  OK  ]  Estimated reading time: 3 minutes"]
    ]
  },
  "zh-hk/index.html": {
    command: "./boot-zh-hk", prompt: "chavez:~/zh-hk$ ", steps: [
      ["./boot-zh-hk", "[  OK  ]  正在啟動繁體中文網站"],
      [`systemctl ${isReload ? "restart" : "start"} www.chavezpoon.com/zh-hk`, `[  OK  ]  ${isReload ? "正在重新載入" : "正在啟動"}香港繁體中文頁面`],
      ["connect-hosting www.chavezpoon.com", "[  OK  ]  已連接網站主機"],
      ["detect-client --device --os --browser", "[  OK  ]  正在識別裝置及瀏覽器"],
      [`${isReload ? "reload" : "open"} --page ${pageName}`, `[  OK  ]  ${isReload ? "已重新載入" : "已開啟"}繁體中文頁面`],
      ["load construction-page", "[  OK  ]  網站建設中頁面已就緒"]
    ]
  }
};

const completeBoot = (): void => {
  document.documentElement.classList.remove("booting");
  pageContent?.classList.add("is-ready");
  document.dispatchEvent(new Event("site:boot-complete"));
};

const requestBootChoice = (): Promise<boolean> => new Promise(resolve => {
  const form = document.getElementById("boot-consent") as HTMLFormElement | null;
  const input = document.getElementById("boot-consent-input") as HTMLInputElement | null;
  const feedback = document.getElementById("boot-consent-feedback");
  if (!form || !input || !feedback) return resolve(true);
  form.hidden = false;
  bootScreen?.setAttribute("aria-hidden", "false");
  bootScreen?.setAttribute("role", "dialog");
  bootScreen?.setAttribute("aria-modal", "true");
  bootScreen?.setAttribute("aria-labelledby", "boot-consent-question");
  bootScreen?.querySelector(".boot-output")?.classList.add("has-consent");
  const focusInput = (): void => {
    input.focus({ preventScroll: true });
    const output = bootScreen?.querySelector<HTMLElement>(".boot-output");
    if (output) output.scrollTop = output.scrollHeight;
  };
  window.requestAnimationFrame(focusInput);
  input.addEventListener("input", () => {
    const choice = input.value.trim().toLowerCase();
    if (choice === "y") {
      input.disabled = true;
      feedback.textContent = "[  OK  ]  已確認啟動";
      bootScreen?.setAttribute("aria-hidden", "true");
      bootScreen?.removeAttribute("role");
      bootScreen?.removeAttribute("aria-modal");
      window.setTimeout(() => resolve(true), 250);
    } else if (choice === "n") {
      input.disabled = true;
      feedback.textContent = "網站即將於短時間內關閉……";
      window.setTimeout(() => {
        window.close();
        window.setTimeout(() => {
          if (!window.closed) {
            feedback.textContent = "瀏覽器未能自動關閉此分頁，請手動關閉，或輸入 y 繼續。";
            input.disabled = false;
            input.value = "";
            focusInput();
          }
        }, 250);
      }, 1200);
    } else if (choice) {
      feedback.textContent = "[ ERROR ] 指令無效，請再試一次。";
      input.value = "";
    }
  });
  form.addEventListener("submit", event => event.preventDefault());
});

const runStartupProgress = async (): Promise<void> => {
  const progress = document.getElementById("boot-progress");
  const track = progress?.querySelector<HTMLElement>(".boot-progress-track");
  const fill = document.getElementById("boot-progress-fill") as HTMLElement | null;
  const valueLabel = document.getElementById("boot-progress-value");
  if (!progress || !track || !fill || !valueLabel) return;
  progress.hidden = false;
  const output = bootScreen?.querySelector<HTMLElement>(".boot-output");
  const update = (value: number): void => {
    fill.style.width = `${value}%`;
    valueLabel.textContent = `${value}%`;
    track.setAttribute("aria-valuenow", String(value));
    if (output) output.scrollTop = output.scrollHeight;
  };
  update(0);
  if (reducedMotion) { update(100); return; }
  await new Promise<void>(resolve => window.setTimeout(resolve, 160));
  for (let value = 1; value <= 100; value++) {
    update(value);
    await new Promise<void>(resolve => window.setTimeout(resolve, 16));
  }
  await new Promise<void>(resolve => window.setTimeout(resolve, 60));
};

if (!bootScreen || !bootLog || !bootReady) {
  completeBoot();
} else {
  const config = pageBoot[pageName] ?? pageBoot["index.html"];
  const clientFallback = (): string => {
    try { return bootWindow.ClientDetection?.detect?.() || "Device · OS · browser details unavailable"; }
    catch { return "Device · OS · browser details unavailable"; }
  };
  const clientDetails = async (): Promise<string> => {
    try {
      if (bootWindow.ClientDetection?.detectWithVersion) return await bootWindow.ClientDetection.detectWithVersion();
    } catch { /* Use the basic client information when detailed detection is unavailable. */ }
    return clientFallback();
  };
  config.steps = config.steps.map(([command, response]) => command.startsWith("detect-client")
    ? [command, `[  OK  ]  已偵測到用戶端： ${clientFallback()}`]
    : [command, response]);
  bootWindow.sizeBootTerminal?.(bootLog, bootReady, config.steps, config.prompt, shouldAskBootChoice, isFirstMainVisit);
  const pause = (milliseconds: number): Promise<void> => new Promise(resolve => window.setTimeout(resolve, reducedMotion ? 0 : milliseconds));
  const typeText = async (element: HTMLElement, text: string, speed: number): Promise<void> => {
    element.classList.add("boot-typing");
    for (const character of text) {
      element.textContent += character;
      await pause(speed);
    }
    element.classList.remove("boot-typing");
  };
  const runBoot = async (): Promise<void> => {
    for (const [command, response] of config.steps) {
      const line = document.createElement("p");
      line.className = "boot-entry boot-command";
      const prompt = document.createElement("span");
      prompt.className = "boot-prompt";
      prompt.textContent = config.prompt;
      const typedText = document.createElement("span");
      line.append(prompt, typedText);
      bootLog.append(line);
      await typeText(typedText, command, reducedMotion ? 0 : 32);

      const resolvedResponse = command.startsWith("detect-client")
        ? `[  OK  ]  已偵測到用戶端： ${await clientDetails()}`
        : response;
      await pause(140);
      const result = document.createElement("p");
      result.className = "boot-entry boot-response";
      const status = document.createElement("span");
      status.className = "boot-ok";
      const responseText = document.createElement("span");
      result.append(status, responseText);
      bootLog.append(result);
      await typeText(status, resolvedResponse.slice(0, 8), reducedMotion ? 0 : 18);
      await typeText(responseText, resolvedResponse.slice(8), reducedMotion ? 0 : 18);
      await pause(180);
    }
    if (shouldAskBootChoice) {
      const approved = await requestBootChoice();
      if (!approved) return;
    }
    if (isFirstMainVisit) {
      await runStartupProgress();
    }
    bootReady.classList.add("is-visible");
    await pause(650);
    bootScreen.classList.add("is-done");
    await pause(500);
    completeBoot();
  };
  void runBoot();
}
})();
