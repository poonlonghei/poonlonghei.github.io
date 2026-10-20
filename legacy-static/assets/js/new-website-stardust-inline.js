    (() => {
      const canvas = document.getElementById("cursor-stardust");
      const context = canvas && canvas.getContext("2d");
      const desktop = window.matchMedia("(min-width: 768px) and (hover: hover) and (pointer: fine)").matches;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!context || !desktop || reducedMotion) return;
      let width = 0, height = 0, dust = [];
      function resize() {
        const ratio = Math.min(window.devicePixelRatio || 1, 2);
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = Math.floor(width * ratio);
        canvas.height = Math.floor(height * ratio);
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
      }
      function draw() {
        context.clearRect(0, 0, width, height);
        dust = dust.filter(p => p.life > 0);
        for (const p of dust) {
          p.x += p.vx; p.y += p.vy;
          p.vx *= 0.97; p.vy *= 0.97; p.life -= 0.025;
          context.beginPath();
          context.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          context.fillStyle = `rgba(225, 235, 255, ${Math.max(0, p.life) * 0.78})`;
          context.fill();
          if (p.sparkle) {
            context.beginPath();
            context.moveTo(p.x - 5, p.y); context.lineTo(p.x + 5, p.y);
            context.moveTo(p.x, p.y - 5); context.lineTo(p.x, p.y + 5);
            context.strokeStyle = `rgba(235, 242, 255, ${Math.max(0, p.life) * 0.55})`;
            context.lineWidth = 0.8;
            context.stroke();
          }
        }
        requestAnimationFrame(draw);
      }
      window.addEventListener("pointermove", event => {
        if (event.pointerType !== "mouse") return;
        for (let i = 0; i < 3; i++) dust.push({
          x: event.clientX + (Math.random() - 0.5) * 8,
          y: event.clientY + (Math.random() - 0.5) * 8,
          vx: (Math.random() - 0.5) * 1.2 - event.movementX * 0.025,
          vy: (Math.random() - 0.5) * 1.2 - event.movementY * 0.025,
          radius: Math.random() * 3 + 1.5,
          life: 1,
          sparkle: Math.random() < 0.28
        });
        if (dust.length > 240) dust.splice(0, dust.length - 240);
      }, { passive: true });
      window.addEventListener("resize", resize);
      resize();
      draw();
    })();