// CURSOR GLOW - Centered on cursor
const glow = document.querySelector(".cursor-glow");
if (glow) {
  window.addEventListener("mousemove", e => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
    glow.style.transform = "translate(-50%, -50%)"; // Centers the glow
  });
}

// SCROLL REVEAL
const obs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll("section").forEach(section => obs.observe(section));

// PARTICLES BACKGROUND
const bg = document.getElementById("bg-particles");
if (bg) {
  const ctx = bg.getContext("2d");
  
  function resize() {
    bg.width = innerWidth;
    bg.height = innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const dots = Array.from({ length: 90 }, () => ({
    x: Math.random() * bg.width,
    y: Math.random() * bg.height,
    r: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 0.4,
    dy: (Math.random() - 0.5) * 0.4
  }));

  function animate() {
    ctx.clearRect(0, 0, bg.width, bg.height);
    ctx.fillStyle = "rgba(56,189,248,.55)";

    dots.forEach(dot => {
      dot.x += dot.dx;
      dot.y += dot.dy;

      if (dot.x < 0 || dot.x > bg.width) dot.dx *= -1;
      if (dot.y < 0 || dot.y > bg.height) dot.dy *= -1;

      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }
  animate();
}

// WORD STAGGER DELAY
document.querySelectorAll(".dyn-sub").forEach(block => {
  block.querySelectorAll(".word").forEach((word, i) => {
    word.style.animationDelay = `${i * 0.12}s`;
  });
});

// NUMBER COUNTERS
const counters = document.querySelectorAll(".counter");
const speed = 30;

counters.forEach(counter => {
  const update = () => {
    const target = +counter.dataset.target;
    const current = +counter.innerText;
    const inc = Math.ceil(target / speed);

    if (current < target) {
      counter.innerText = current + inc;
      setTimeout(update, 40);
    } else {
      counter.innerText = target;
      counter.classList.add("glow");
    }
  };
  update();
});


// GLASS EFFECT - Cursor follow spotlight (only once!)
document.querySelectorAll(".glass").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--y", `${e.clientY - rect.top}px`);
  });

  // Optional: reset on mouse leave for cleaner look
  card.addEventListener("mouseleave", () => {
    card.style.setProperty("--x", "50%");
    card.style.setProperty("--y", "50%");
  });
});

// RIPPLE EFFECT ON CLICK (only once!)
document.querySelectorAll(".clickable").forEach(card => {
  card.addEventListener("click", e => {
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    const rect = card.getBoundingClientRect();
    ripple.style.left = `${e.clientX - rect.left}px`;
    ripple.style.top = `${e.clientY - rect.top}px`;
    card.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// HERO TYPING EFFECT (Home page only)
const typed = document.getElementById("typed");
if (typed) {
  const lines = [
    "Competitive Programmer",
    "C++ | Data Structures & Algorithms",
    "Learning AI / ML",
    "Building strong fundamentals"
  ];


  let lineIndex = 0, charIndex = 0, isDeleting = false;

  function type() {
    const currentLine = lines[lineIndex];
    typed.textContent = currentLine.slice(0, charIndex);

    if (!isDeleting) {
      charIndex++;
      if (charIndex > currentLine.length) {
        isDeleting = true;
        setTimeout(type, 1500); // Pause at end
        return;
      }
    } else {
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        lineIndex = (lineIndex + 1) % lines.length;
      }
    }

    setTimeout(type, isDeleting ? 45 : 85);
  }
  type();
}

// MUSIC TOGGLE & RESUME ON TAB FOCUS
const bgm = document.getElementById("bgm");
const musicBtn = document.getElementById("musicBtn");

if (bgm && musicBtn) {
  let isPlaying = false;

  function updateButton() {
    if (bgm.paused) {
      musicBtn.textContent = "▶ music";
      musicBtn.style.opacity = "0.6";
    } else {
      musicBtn.textContent = "⏸ music";
      musicBtn.style.opacity = "1";
    }
    isPlaying = !bgm.paused;
  }

  musicBtn.addEventListener("click", () => {
    if (bgm.paused) {
      bgm.play().catch(err => {
        console.log("Playback prevented:", err);
        alert("Browser blocked audio. Click the music button again.");
      });
    } else {
      bgm.pause();
    }
    updateButton();
  });

  // Resume when tab becomes visible again
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && isPlaying && bgm.paused) {
      bgm.play().catch(() => {});
    }
    updateButton();
  });

  // Try to auto-play after first user click anywhere (unlocks audio)
  document.body.addEventListener("click", () => {
    if (bgm.paused && !isPlaying) {
      bgm.play().then(() => {
        isPlaying = true;
        updateButton();
      }).catch(() => {});
    }
  }, { once: true });

  updateButton(); // Initial state
}

// PAGE TRANSITION EFFECT
const transition = document.getElementById("page-transition");
if (transition) {
  document.querySelectorAll("a").forEach(link => {
    if (link.target === "_blank") return; // Skip external links

    link.addEventListener("click", e => {
      e.preventDefault();
      transition.classList.add("active");
      setTimeout(() => {
        location.href = link.href;
      }, 400);
    });
  });

  window.addEventListener("pageshow", () => {
    transition.classList.remove("active");
  });
}
// DYNAMIC FAVORITE TOPICS
const topics = [
  "Data Structures",
  "Graphs & Trees",
  "Dynamic Programming",
  "Greedy & Binary Search",
  "Number Theory"
];

const topicsList = document.getElementById("topics-list");
if (topicsList) {
  topics.forEach((topic, i) => {
    const li = document.createElement("div");
    li.textContent = topic;
    li.style.opacity = "0";
    li.style.transform = "translateY(20px)";
    li.style.transition = "opacity .8s ease, transform .8s ease";
    li.style.margin = "12px 0";
    li.style.fontSize = "1.2rem";
    li.style.textShadow = "0 0 10px var(--blue)";
    topicsList.appendChild(li);

    // Staggered reveal on load
    setTimeout(() => {
      li.style.opacity = "1";
      li.style.transform = "translateY(0)";
    }, 300 + i * 200);
  });
}

// SHLOKA REVEAL (appears after topics)
const shlokaContainer = document.getElementById("shloka-container");
const shlokaMeaning = document.getElementById("shloka-meaning");
if (shlokaContainer && shlokaMeaning) {
  setTimeout(() => {
    shlokaContainer.textContent = "साम दानं भेदः दण्डः";
    shlokaContainer.style.opacity = "1";

    shlokaMeaning.textContent = "Persuasion → Compromise → Division → Force";
    shlokaMeaning.style.opacity = "0.7";
  }, 800 + topics.length * 200); // Appears after all topics animate
}
// SHOOTING STARS (Glowing meteors with trails)
const starsContainer = document.getElementById("shooting-stars");
if (starsContainer) {
  function createMeteor() {
    const meteor = document.createElement("div");
    meteor.classList.add("meteor");
    
    const startX = Math.random() * window.innerWidth * 0.5;
    const startY = Math.random() * window.innerHeight * 0.4;
    const angle = Math.random() * 80 + 10; // Varied diagonal
    const length = Math.random() * 400 + 300;
    const duration = Math.random() * 2 + 2;
    
    meteor.style.left = startX + "px";
    meteor.style.top = startY + "px";
    meteor.style.width = length + "px";
    meteor.style.transform = `rotate(${angle}deg)`;
    meteor.style.animationDuration = duration + "s";
    meteor.style.opacity = "1";
    
    starsContainer.appendChild(meteor);
    
    setTimeout(() => meteor.remove(), duration * 1000 + 1000);
  }
  
  setInterval(createMeteor, 4000); // New meteor every 4s
  for (let i = 0; i < 4; i++) setTimeout(createMeteor, i * 1500); // Initial burst
}

// PROFILE PHOTO PARALLAX TILT (Subtle on mouse move)
const heroImg = document.querySelector(".hero-img");
if (heroImg) {
  document.addEventListener("mousemove", e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    heroImg.style.transform = `rotateY(${x}deg) rotateX(${y}deg) translateZ(50px)`;
  });
  document.addEventListener("mouseleave", () => {
    heroImg.style.transform = "rotateY(0) rotateX(0) translateZ(0)";
  });
}
// Force hero reveal on load (fixes typing text visibility on home)
window.addEventListener("load", () => {
  document.querySelectorAll(".hero").forEach(section => {
    section.classList.add("show");
  });
});

// Shooting Stars (same as before)
const starsContainer = document.getElementById("shooting-stars");
if (starsContainer) {
  function createMeteor() {
    const meteor = document.createElement("div");
    meteor.classList.add("meteor");
    
    const startX = Math.random() * window.innerWidth * 0.5;
    const startY = Math.random() * window.innerHeight * 0.4;
    const angle = Math.random() * 80 + 10;
    const length = Math.random() * 400 + 300;
    const duration = Math.random() * 2 + 2;
    
    meteor.style.left = startX + "px";
    meteor.style.top = startY + "px";
    meteor.style.width = length + "px";
    meteor.style.transform = `rotate(${angle}deg)`;
    meteor.style.animationDuration = duration + "s";
    meteor.style.opacity = "1";
    
    starsContainer.appendChild(meteor);
    
    setTimeout(() => meteor.remove(), duration * 1000 + 1000);
  }
  
  setInterval(createMeteor, 4000);
  for (let i = 0; i < 4; i++) setTimeout(createMeteor, i * 1500);
}
