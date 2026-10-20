(function () {
  const sizingWindow = window as any;
  function sizeBootTerminal(bootLog: HTMLElement, bootReady: HTMLElement, bootSteps: string[][], promptText: string, includeConsent = false, includeProgress = includeConsent): void {
    const output = bootLog.closest(".boot-output");
    const kicker = output.querySelector(".boot-kicker");
    const measure = output.cloneNode(false);
    const measureLog = document.createElement("div");
    const measureReady = bootReady.cloneNode(true);
    const consent = document.getElementById("boot-consent");
    const measureConsent = includeConsent && consent ? consent.cloneNode(true) as HTMLElement : null;
    const progress = document.getElementById("boot-progress");
    const measureProgress = includeProgress && progress ? progress.cloneNode(true) as HTMLElement : null;

    measure.removeAttribute("id");
    measureReady.removeAttribute("id");
    if (measureConsent) {
      measureConsent.hidden = false;
      measureConsent.removeAttribute("id");
      measureConsent.querySelector("[autofocus]")?.removeAttribute("autofocus");
    }
    if (measureProgress) {
      measureProgress.hidden = false;
      measureProgress.removeAttribute("id");
      const fill = measureProgress.querySelector<HTMLElement>(".boot-progress-fill");
      const value = measureProgress.querySelector<HTMLElement>("#boot-progress-value");
      if (fill) fill.style.width = "100%";
      if (value) value.textContent = "100%";
    }
    measure.style.cssText += "; position: fixed; inset: 0 auto auto -10000px; width: "
      + output.getBoundingClientRect().width
      + "px; height: auto; min-height: 0; max-height: none; overflow: visible; visibility: hidden;";
    measureLog.removeAttribute("id");

    for (const [command, response] of bootSteps) {
      const measuredResponse = command.startsWith("detect-client")
        ? "[  OK  ]  Client detected: Tablet · Windows 10/11 (NT 10.0) · edition unavailable · Samsung Internet"
        : response;
      const commandLine = document.createElement("p");
      commandLine.className = "boot-entry boot-command";
      const prompt = document.createElement("span");
      prompt.className = "boot-prompt";
      prompt.textContent = promptText;
      const typedCommand = document.createElement("span");
      typedCommand.textContent = command;
      commandLine.append(prompt, typedCommand);

      const responseLine = document.createElement("p");
      responseLine.className = "boot-entry boot-response";
      const status = document.createElement("span");
      status.className = "boot-ok";
      status.textContent = measuredResponse.slice(0, 8);
      const responseText = document.createElement("span");
      responseText.textContent = measuredResponse.slice(8);
      responseLine.append(status, responseText);

      measureLog.append(commandLine, responseLine);
    }

    measureReady.classList.add("is-visible");
    measure.append(kicker.cloneNode(true), measureLog);
    if (measureConsent) measure.append(measureConsent);
    if (measureProgress) measure.append(measureProgress);
    measure.append(measureReady);
    document.body.append(measure);
    output.style.height = `${measure.getBoundingClientRect().height}px`;
    measure.remove();
  }

  sizingWindow.sizeBootTerminal = sizeBootTerminal;
})();
