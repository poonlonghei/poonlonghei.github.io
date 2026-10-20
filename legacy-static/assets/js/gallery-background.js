(() => {
  const canvas = document.getElementById("particles");
  const context = canvas?.getContext("2d");
  if (!canvas || !context || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let width = 0;
  let height = 0;
  let stars = [];
  let bursts = [];
  let frame = 0;

  const resize = () => {
    const ratio = Math.min(devicePixelRatio || 1, 2);
    width = innerWidth;
    height = innerHeight;
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    stars = Array.from({ length: Math.min(260, Math.floor(width * height / 4200)) }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.4 + .25,
      alpha: Math.random() * .65 + .2,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * .0008 + .0002,
      drift: Math.random() * .18 + .035
    }));
  };

  const draw = time => {
    context.clearRect(0, 0, width, height);
    for (const star of stars) {
      star.y -= star.drift;
      if (star.y < -2) { star.y = height + 2; star.x = Math.random() * width; }
      const shimmer = .55 + Math.sin(time * star.speed + star.phase) * .35;
      context.beginPath();
      context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      context.fillStyle = `rgba(255,255,255,${star.alpha * shimmer})`;
      context.fill();
    }

    bursts = bursts.filter(particle => particle.life > 0);
    for (const particle of bursts) {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vx *= .985;
      particle.vy *= .985;
      particle.life -= .018;
      context.beginPath();
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      context.fillStyle = `rgba(255,255,255,${particle.life * .8})`;
      context.fill();
    }
    frame = requestAnimationFrame(draw);
  };

  document.addEventListener("click", event => {
    for (let index = 0; index < 12; index += 1) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 2 + .5;
      bursts.push({
        x: event.clientX,
        y: event.clientY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: Math.random() * 1.7 + .5,
        life: 1
      });
    }
  });
  addEventListener("resize", resize, { passive: true });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) cancelAnimationFrame(frame);
    else frame = requestAnimationFrame(draw);
  });
  resize();
  frame = requestAnimationFrame(draw);
})();
