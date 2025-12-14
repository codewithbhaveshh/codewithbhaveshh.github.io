// CURSOR GLOW
const glow = document.querySelector(".cursor-glow");
if (glow) {
  window.addEventListener("mousemove", e => {
    glow.style.left = e.clientX + "px";
    glow.style.top  = e.clientY + "px";
  });
}

// SCROLL REVEAL
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("show");
  });
}, { threshold: 0.2 });

document.querySelectorAll("section").forEach(s => obs.observe(s));

// PARTICLES
const bg = document.getElementById("bg-particles");
if (bg) {
  const ctx = bg.getContext("2d");

  function resize() {
    bg.width = innerWidth;
    bg.height = innerHeight;
  }
  resize();
  addEventListener("resize", resize);

  const dots = Array.from({ length: 90 }, () => ({
    x: Math.random() * bg.width,
    y: Math.random() * bg.height,
    r: Math.random() * 2 + 1,
    dx: (Math.random() - .5) * .4,
    dy: (Math.random() - .5) * .4
  }));

  (function animate(){
    ctx.clearRect(0,0,bg.width,bg.height);
    ctx.fillStyle = "rgba(56,189,248,.55)";
    dots.forEach(d => {
      d.x += d.dx;
      d.y += d.dy;
      if (d.x < 0 || d.x > bg.width) d.dx *= -1;
      if (d.y < 0 || d.y > bg.height) d.dy *= -1;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(animate);
  })();
}

// GLASS CURSOR FOLLOW
document.querySelectorAll(".glass").forEach(card => {
  card.addEventListener("mousemove", e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty("--x", `${e.clientX - r.left}px`);
    card.style.setProperty("--y", `${e.clientY - r.top}px`);
  });
});

// RIPPLE
document.querySelectorAll(".clickable").forEach(card => {
  card.addEventListener("click", e => {
    const ripple = document.createElement("span");
    ripple.className = "ripple";

    const r = card.getBoundingClientRect();
    ripple.style.left = `${e.clientX - r.left}px`;
    ripple.style.top  = `${e.clientY - r.top}px`;

    card.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});
// GLASS CURSOR FOLLOW (SAFE)
document.querySelectorAll(".glass").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--y", `${e.clientY - rect.top}px`);
  });
});

// RIPPLE
document.querySelectorAll(".clickable").forEach(card => {
  card.addEventListener("click", e => {
    const ripple = document.createElement("span");
    ripple.className = "ripple";

    const rect = card.getBoundingClientRect();
    ripple.style.left = `${e.clientX - rect.left}px`;
    ripple.style.top  = `${e.clientY - rect.top}px`;

    card.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});
// HERO TYPING (HOME ONLY)
const typed = document.getElementById("typed");

if (typed) {
  const lines = [
    "Competitive Programmer",
    "C++ | Data Structures & Algorithms",
    "Learning AI / ML",
    "Building strong fundamentals"
  ];

  let i = 0, j = 0, del = false;

  (function type() {
    typed.textContent = lines[i].slice(0, j);

    if (!del) j++;
    else j--;

    if (j === lines[i].length + 1) del = true;
    if (j === 0 && del) {
      del = false;
      i = (i + 1) % lines.length;
    }

    setTimeout(type, del ? 45 : 85);
  })();
}
// MUSIC TOGGLE
const bgm = document.getElementById("bgm");
const musicBtn = document.getElementById("musicBtn");

if (bgm && musicBtn) {
  let isPlaying = false;

  musicBtn.addEventListener("click", () => {
    if (isPlaying) {
      bgm.pause();
      musicBtn.textContent = "▶ music";
      musicBtn.style.opacity = "0.6";
    } else {
      bgm.play().catch(error => {
        console.log("Playback failed (browser blocked?):", error);
        alert("Browser blocked playback. Try clicking the button again after interacting with the page.");
      });
      musicBtn.textContent = "⏸ music";
      musicBtn.style.opacity = "1";
    }
    isPlaying = !isPlaying;
  });

  // Optional: Try to autoplay after first user interaction anywhere on page
  document.body.addEventListener("click", () => {
    if (!isPlaying) {
      bgm.play().then(() => {
        isPlaying = true;
        musicBtn.textContent = "⏸ music";
        musicBtn.style.opacity = "1";
      }).catch(() => {}); // Silently fail if still blocked
    }
  }, { once: true }); // Only try once
}


// PAGE TRANSITION
const transition = document.getElementById("page-transition");
if (transition) {
  document.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", e => {
      if (link.target === "_blank") return;
      e.preventDefault();
      transition.classList.add("active");
      setTimeout(() => location.href = link.href, 400);
    });
  });
  window.addEventListener("pageshow", () =>
    transition.classList.remove("active")
  );
}
