
    const articleUrl = window.location.href;
    const articleTitle = document.querySelector("h1").textContent.trim();
    const encodedUrl = encodeURIComponent(articleUrl);
    const encodedTitle = encodeURIComponent(articleTitle);
    document.querySelector('[data-share="facebook"]').href =
      `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    document.querySelector('[data-share="x"]').href =
      `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
    document.querySelector('[data-share="threads"]').href =
      `https://www.threads.com/intent/post?text=${encodedTitle}&url=${encodedUrl}`;

    const categoryButtons = document.querySelectorAll(".category-filter");
    const workCards = document.querySelectorAll(".work-card");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    categoryButtons.forEach(button => {
      button.addEventListener("click", () => {
        const selectedCategory = button.dataset.filter;
        categoryButtons.forEach(item => item.setAttribute("aria-pressed", String(item === button)));
        workCards.forEach(card => {
          const categories = card.dataset.categories?.split(" ") || [];
          card.hidden = !categories.includes(selectedCategory);
          if (!card.hidden && !prefersReducedMotion) {
            card.getAnimations().forEach(animation => animation.cancel());
            card.animate(
              [
                { opacity: 0, transform: "translateY(14px) scale(.985)" },
                { opacity: 1, transform: "translateY(0) scale(1)" }
              ],
              { duration: 380, delay: 65, easing: "cubic-bezier(.2, .75, .25, 1)", fill: "both" }
            );
          }
        });
      });
    });

    // Match the other pages' drifting white particles and click bursts.
    (() => {
      const canvas = document.getElementById("particles");
      const context = canvas.getContext("2d");
      const motionReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!context || motionReduced) return;

      let width = 0;
      let height = 0;
      let particles = [];
      let burstParticles = [];
      let animationFrame = 0;
      let shootingStars = [];
      let nebulaStars = [];
      let nebulaTime = 0;
      const pointer = { x: -1000, y: -1000, vx: 0, vy: 0, active: false };
      const particleCount = () => Math.min(420, Math.floor((width * height) / 3000));

      function resize() {
        const ratio = Math.min(window.devicePixelRatio || 1, 2);
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = Math.floor(width * ratio);
        canvas.height = Math.floor(height * ratio);
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
        particles = Array.from({ length: particleCount() }, () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 1.1,
          vy: (Math.random() - 0.5) * 1.1,
          radius: Math.random() * 1.7 + 0.6,
          phase: Math.random() * Math.PI * 2,
          drift: Math.random() * 0.025 + 0.012,
          twinkle: Math.random() * Math.PI * 2
        }));
        nebulaStars = Array.from({ length: Math.max(28, Math.min(100, Math.floor(width * height / 9000))) }, () => ({
          position: Math.random(),
          offset: (Math.random() - 0.5) * 0.9,
          phase: Math.random() * Math.PI * 2,
          radius: Math.random() * 1.1 + 0.35
        }));
      }

      function draw() {
        context.clearRect(0, 0, width, height);
        nebulaTime += 0.002;
        const nebulaRadius = Math.max(width, height) * 0.82;
        context.save();
        context.globalCompositeOperation = "screen";
        context.translate(width * 0.5 + Math.sin(nebulaTime) * 12, height * 0.52 + Math.cos(nebulaTime * 0.7) * 8);
        context.rotate(-0.42 + Math.sin(nebulaTime * 0.3) * 0.012);
        context.scale(1, 0.28);
        const nebula = context.createRadialGradient(0, 0, nebulaRadius * 0.04, 0, 0, nebulaRadius);
        nebula.addColorStop(0, "rgba(137, 119, 190, 0.11)");
        nebula.addColorStop(0.36, "rgba(84, 111, 171, 0.065)");
        nebula.addColorStop(0.72, "rgba(70, 73, 139, 0.025)");
        nebula.addColorStop(1, "rgba(56, 68, 110, 0)");
        context.fillStyle = nebula;
        context.fillRect(-nebulaRadius, -nebulaRadius, nebulaRadius * 2, nebulaRadius * 2);
        context.restore();
        for (const star of nebulaStars) {
          star.phase += 0.004;
          const x = star.position * width + Math.sin(star.phase) * 3;
          const y = height * (0.77 - star.position * 0.52) + star.offset * Math.min(width, height) * 0.45;
          const shimmer = (Math.sin(star.phase * 1.7) + 1) / 2;
          context.beginPath();
          context.arc(x, y, star.radius, 0, Math.PI * 2);
          context.fillStyle = `rgba(204, 211, 255, ${0.12 + shimmer * 0.3})`;
          context.fill();
        }
        if (Math.random() < 0.018 && shootingStars.length < 3) {
          const speed = Math.random() * 5 + 7;
          shootingStars.push({ x: width * (0.35 + Math.random() * 0.65), y: Math.random() * height * 0.55, vx: -speed, vy: speed * 0.48, length: Math.random() * 55 + 55, life: 1 });
        }
        shootingStars = shootingStars.filter(star => star.life > 0 && star.x > -120 && star.y < height + 120);
        for (const star of shootingStars) {
          star.x += star.vx;
          star.y += star.vy;
          star.life -= 0.025;
          const speed = Math.hypot(star.vx, star.vy);
          const tailX = star.x - star.vx * star.length / speed;
          const tailY = star.y - star.vy * star.length / speed;
          const trail = context.createLinearGradient(tailX, tailY, star.x, star.y);
          trail.addColorStop(0, "rgba(255,255,255,0)");
          trail.addColorStop(1, `rgba(255,255,255,${Math.max(0, star.life) * 0.8})`);
          context.save();
          context.strokeStyle = trail;
          context.lineWidth = 1.5;
          context.beginPath();
          context.moveTo(tailX, tailY);
          context.lineTo(star.x, star.y);
          context.stroke();
          context.beginPath();
          context.arc(star.x, star.y, 1.8, 0, Math.PI * 2);
          context.fillStyle = `rgba(255,255,255,${Math.max(0, star.life)})`;
          context.fill();
          context.restore();
        }
        for (const p of particles) {
          p.phase += p.drift;
          p.twinkle += 0.025;
          p.vx += Math.sin(p.phase) * 0.006;
          p.vy += Math.cos(p.phase * 0.8) * 0.006;

          if (pointer.active) {
            const dx = p.x - pointer.x;
            const dy = p.y - pointer.y;
            const distance = Math.hypot(dx, dy);
            if (distance < 150 && distance > 0) {
              const influence = 1 - distance / 150;
              const force = influence * 0.075;
              p.vx += (dx / distance) * force - pointer.vx * influence * 0.014 - (dy / distance) * force * 0.35;
              p.vy += (dy / distance) * force - pointer.vy * influence * 0.014 + (dx / distance) * force * 0.35;
            }
          }

          p.vx *= 0.99;
          p.vy *= 0.99;
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < -4) p.x = width + 4;
          if (p.x > width + 4) p.x = -4;
          if (p.y < -4) p.y = height + 4;
          if (p.y > height + 4) p.y = -4;

          const shimmer = (Math.sin(p.twinkle) + 1) / 2;
          context.beginPath();
          context.arc(p.x, p.y, p.radius * (0.85 + shimmer * 0.25), 0, Math.PI * 2);
          context.fillStyle = `rgba(255, 255, 255, ${0.18 + shimmer * 0.46})`;
          context.fill();
        }

        burstParticles = burstParticles.filter(p => p.life > 0);
        for (const p of burstParticles) {
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.985;
          p.vy *= 0.985;
          p.life -= 0.014;
          context.beginPath();
          context.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          context.fillStyle = `rgba(255, 255, 255, ${Math.max(0, p.life) * 0.8})`;
          context.fill();
        }

        animationFrame = requestAnimationFrame(draw);
      }

      function burst(event) {
        const x = event.clientX;
        const y = event.clientY;
        for (const p of particles) {
          const dx = p.x - x;
          const dy = p.y - y;
          const distance = Math.hypot(dx, dy);
          if (distance < 190 && distance > 0) {
            const force = (1 - distance / 190) * 2.4;
            p.vx += (dx / distance) * force;
            p.vy += (dy / distance) * force;
          }
        }

        for (let i = 0; i < 26; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 3.2 + 1.2;
          burstParticles.push({
            x,
            y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            radius: Math.random() * 1.8 + 0.7,
            life: 1
          });
        }
        if (burstParticles.length > 160) burstParticles.splice(0, burstParticles.length - 160);
      }

      window.addEventListener("pointermove", event => {
        const previousX = pointer.x;
        const previousY = pointer.y;
        pointer.x = event.clientX;
        pointer.y = event.clientY;
        pointer.vx = pointer.active ? pointer.x - previousX : 0;
        pointer.vy = pointer.active ? pointer.y - previousY : 0;
        pointer.active = true;
      });
      window.addEventListener("pointerout", event => {
        if (!event.relatedTarget) pointer.active = false;
      });
      document.addEventListener("pointerdown", burst);
      window.addEventListener("resize", resize);
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) cancelAnimationFrame(animationFrame);
        else draw();
      });

      resize();
      draw();
    })();