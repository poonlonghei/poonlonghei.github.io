(function () {
  const clientNavigator: any = navigator;
  const clientWindow = window as any;
  function getPlatform() {
    return clientNavigator.userAgentData?.platform || clientNavigator.platform || "";
  }

  function getDevice(userAgent) {
    const tablet = /ipad|tablet|playbook|silk/i.test(userAgent)
      || (/android/i.test(userAgent) && !/mobile/i.test(userAgent))
      || (/macintosh/i.test(userAgent) && clientNavigator.maxTouchPoints > 1);
    const mobile = !tablet && (clientNavigator.userAgentData?.mobile
      || /iphone|ipod|android.*mobile|windows phone|mobile/i.test(userAgent));
    return tablet ? "Tablet" : mobile ? "Mobile" : "Desktop";
  }

  function getOS(userAgent, platformHint) {
    const os = /android/i.test(userAgent) ? "Android"
      : /iphone|ipod/i.test(userAgent) ? "iOS"
      : (/ipad/i.test(userAgent) || (/macintosh/i.test(userAgent) && clientNavigator.maxTouchPoints > 1)) ? "iPadOS"
      : /windows nt|win32|win64/i.test(`${userAgent} ${platformHint}`) ? "Windows"
      : /cros/i.test(userAgent) ? "ChromeOS"
      : /macintosh|mac os x|macos/i.test(`${userAgent} ${platformHint}`) ? "macOS"
      : /linux|x11/i.test(`${userAgent} ${platformHint}`) ? "Linux"
      : /android/i.test(platformHint) ? "Android"
      : /ios|iphone|ipad/i.test(platformHint) ? "iOS"
      : /windows/i.test(platformHint) ? "Windows"
      : /chrome.?os/i.test(platformHint) ? "ChromeOS"
      : /mac/i.test(platformHint) ? "macOS"
      : "Unknown OS";
    return os;
  }

  function getUserAgentOSVersion(userAgent, os) {
    let match;
    if (os === "Windows" && (match = userAgent.match(/Windows NT ([\d.]+)/i))) {
      return match[1] === "10.0" ? "10/11 (NT 10.0)" : `NT ${match[1]}`;
    }
    if (os === "ChromeOS" && (match = userAgent.match(/CrOS [^ ]+ ([\d.]+)/i))) return match[1];
    if (os === "Android" && (match = userAgent.match(/Android ([\d.]+)/i))) return match[1];
    if ((os === "iOS" || os === "iPadOS") && (match = userAgent.match(/OS ([\d_]+) like Mac OS X/i))) {
      return match[1].replace(/_/g, ".");
    }
    if (os === "macOS" && (match = userAgent.match(/Mac OS X ([\d._]+)/i))) {
      return match[1].replace(/_/g, ".");
    }
    return "version unavailable";
  }

  function formatOS(os, version) {
    if (os === "Windows") {
      return version === "version unavailable"
        ? "Windows (version and edition unavailable)"
        : `Windows ${version} · edition unavailable`;
    }
    if (os === "macOS") {
      const major = Number.parseInt(version.split(".")[0], 10);
      const macOSNames = {
        10: "",
        11: "Big Sur",
        12: "Monterey",
        13: "Ventura",
        14: "Sonoma",
        15: "Sequoia",
        26: "Tahoe",
        27: "Golden Gate"
      };
      const legacyNames = {
        "10.15": "Catalina",
        "10.14": "Mojave",
        "10.13": "High Sierra",
        "10.12": "Sierra",
        "10.11": "El Capitan",
        "10.10": "Yosemite",
        "10.9": "Mavericks",
        "10.8": "Mountain Lion",
        "10.7": "Lion",
        "10.6": "Snow Leopard",
        "10.5": "Leopard",
        "10.4": "Tiger",
        "10.3": "Panther",
        "10.2": "Jaguar",
        "10.1": "Puma",
        "10.0": "Cheetah"
      };
      const name = major === 10
        ? legacyNames[version.split(".").slice(0, 2).join(".")]
        : macOSNames[major];
      return `macOS ${version}${name ? ` ${name}` : ""}`;
    }
    if (os === "Linux") {
      return version === "version unavailable"
        ? "Linux (distribution/version unavailable)"
        : `Linux ${version} (distribution unavailable)`;
    }
    return `${os} ${version}`;
  }

  function getBrowser(userAgent) {
    const brands = clientNavigator.userAgentData?.brands?.map(brand => brand.brand).join(" ") || "";
    return /edg(e|a|ios)?\//i.test(userAgent) || /microsoft edge/i.test(brands) ? "Microsoft Edge"
      : /opr\/|opera mini|opera mobi|opios\//i.test(userAgent) || /opera/i.test(brands) ? "Opera"
      : /samsungbrowser\//i.test(userAgent) ? "Samsung Internet"
      : /firefox|fxios\//i.test(userAgent) ? "Firefox"
      : /crios\//i.test(userAgent) ? "Chrome"
      : /chrome\//i.test(userAgent) ? "Chrome"
      : /safari\//i.test(userAgent) ? "Safari"
      : "Unknown browser";
  }

  function detect() {
    const userAgent = clientNavigator.userAgent || "";
    const os = getOS(userAgent, getPlatform());
    const osVersion = getUserAgentOSVersion(userAgent, os);
    return `${getDevice(userAgent)} · ${formatOS(os, osVersion)} · ${getBrowser(userAgent)}`;
  }

  async function detectWithVersion() {
    const userAgent = clientNavigator.userAgent || "";
    const platform = getPlatform();
    const os = getOS(userAgent, platform);
    let osVersion = getUserAgentOSVersion(userAgent, os);

    if (clientNavigator.userAgentData?.getHighEntropyValues) {
      try {
        const details = await clientNavigator.userAgentData.getHighEntropyValues(["platformVersion"]);
        if (details.platformVersion) {
          if (os === "Windows") {
            const platformMajor = Number.parseInt(details.platformVersion.split(".")[0], 10);
            osVersion = platformMajor >= 13 ? "11" : "10";
          } else {
            osVersion = details.platformVersion;
          }
        }
      } catch {
        // Fall back to the version exposed in the user-agent string.
      }
    }

    return `${getDevice(userAgent)} · ${formatOS(os, osVersion)} · ${getBrowser(userAgent)}`;
  }

  clientWindow.ClientDetection = { detect, detectWithVersion };
})();
