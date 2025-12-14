// CURSOR GLOW
const glow = document.querySelector(".cursor-glow");
if (glow) {
  window.addEventListener("mousemove", e => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  });
}

// SECTION REVEAL
const obs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
}, { threshold: 0.2 });
document.querySelectorAll("section").forEach(sec => obs.observe(sec));

// PARTICLES
const bg = document.getElementById("bg-particles");
if (bg) {
  const ctx = bg.getContext("2d");
  function resize() { bg.width = innerWidth; bg.height = innerHeight; }
  resize(); window.addEventListener("resize", resize);
  const dots = Array.from({length:90},()=>({
    x:Math.random()*bg.width,
    y:Math.random()*bg.height,
    r:Math.random()*2+1,
    dx:(Math.random()-0.5)*0.4,
    dy:(Math.random()-0.5)*0.4
  }));
  function animate() {
    ctx.clearRect(0,0,bg.width,bg.height);
    ctx.fillStyle = "rgba(56,189,248,.55)";
    dots.forEach(dot=>{
      dot.x+=dot.dx; dot.y+=dot.dy;
      if(dot.x<0||dot.x>bg.width) dot.dx*=-1;
      if(dot.y<0||dot.y>bg.height) dot.dy*=-1;
      ctx.beginPath(); ctx.arc(dot.x,dot.y,dot.r,0,2*Math.PI); ctx.fill();
    });
    requestAnimationFrame(animate);
  }
  animate();
}

// WORD STAGGER
document.querySelectorAll(".dyn-sub").forEach(block=>{
  block.querySelectorAll(".word").forEach((word,i)=>{
    word.style.animationDelay = `${i*0.12}s`;
  });
});

// GLASS EFFECT FOLLOW
document.querySelectorAll(".glass").forEach(card=>{
  card.addEventListener("mousemove",e=>{
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--x",`${e.clientX-rect.left}px`);
    card.style.setProperty("--y",`${e.clientY-rect.top}px`);
  });
  card.addEventListener("mouseleave",()=>{
    card.style.setProperty("--x","50%");
    card.style.setProperty("--y","50%");
  });
});

// RIPPLE CLICK
document.querySelectorAll(".clickable").forEach(card=>{
  card.addEventListener("click", e=>{
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    const rect = card.getBoundingClientRect();
    ripple.style.left = `${e.clientX-rect.left}px`;
    ripple.style.top = `${e.clientY-rect.top}px`;
    card.appendChild(ripple);
    setTimeout(()=>ripple.remove(),600);
  });
});

// HERO TYPING
const typed = document.getElementById("typed");
if(typed){
  const lines=[
    "Competitive Programmer",
    "C++ | Data Structures & Algorithms",
    "Learning AI / ML",
    "Building strong fundamentals"
  ];
  let li=0,ci=0,del=false;
  function type(){
    const current = lines[li];
    typed.textContent = current.slice(0,ci);
    if(!del){ ci++; if(ci>current.length){ del=true; setTimeout(type,1500); return;} }
    else { ci--; if(ci===0){ del=false; li=(li+1)%lines.length;} }
    setTimeout(type, del?45:85);
  }
  type();
}

// MUSIC
const bgm = document.getElementById("bgm");
const musicBtn = document.getElementById("musicBtn");
if(bgm && musicBtn){
  let isPlaying=false;
  function updateBtn(){
    if(bgm.paused){ musicBtn.textContent="▶ music"; musicBtn.style.opacity="0.6"; }
    else { musicBtn.textContent="⏸ music"; musicBtn.style.opacity="1"; }
    isPlaying = !bgm.paused;
  }
  musicBtn.addEventListener("click", ()=>{
    if(bgm.paused) bgm.play().catch(()=>{});
    else bgm.pause();
    updateBtn();
  });
  document.addEventListener("visibilitychange", ()=>{
    if(!document.hidden && isPlaying && bgm.paused) bgm.play().catch(()=>{});
    updateBtn();
  });
  document.body.addEventListener("click", ()=>{
    if(bgm.paused && !isPlaying) bgm.play().then(()=>{ isPlaying=true; updateBtn(); }).catch(()=>{});
  },{once:true});
  updateBtn();
}

// PAGE TRANSITION
const transition = document.getElementById("page-transition");
if(transition){
  document.querySelectorAll("a").forEach(link=>{
    if(link.target==="_blank") return;
    link.addEventListener("click",e=>{
      e.preventDefault();
      transition.classList.add("active");
      setTimeout(()=>location.href=link.href,400);
    });
  });
  window.addEventListener("pageshow",()=>transition.classList.remove("active"));
}

// FAVORITE TOPICS
const topics = ["Data Structures","Graphs & Trees","Dynamic Programming","Greedy & Binary Search","Number Theory"];
const topicsList = document.getElementById("topics-list");
if(topicsList){
  topics.forEach((t,i)=>{
    const div=document.createElement("div");
    div.textContent=t;
    div.style.opacity="0"; div.style.transform="translateY(20px)";
    div.style.transition="opacity .8s ease, transform .8s ease";
    div.style.margin="12px 0"; div.style.fontSize="1.2rem"; div.style.textShadow="0 0 10px var(--blue)";
    topicsList.appendChild(div);
    setTimeout(()=>{div.style.opacity="1"; div.style.transform="translateY(0)";}, 300+i*200);
  });
}

// SHLOKA
const shlokaContainer = document.getElementById("shloka-container");
const shlokaMeaning = document.getElementById("shloka-meaning");
if(shlokaContainer && shlokaMeaning){
  setTimeout(()=>{
    shlokaContainer.textContent="साम दानं भेदः दण्डः";
    shlokaContainer.style.opacity="1";
    shlokaMeaning.textContent="Persuasion → Compromise → Division → Force";
    shlokaMeaning.style.opacity="0.7";
  },800+topics.length*200);
}
// -------------------- SHOOTING STARS --------------------
function createMeteor() {
  const meteor = document.createElement("div");
  meteor.className = "meteor";

  const startX = Math.random() * window.innerWidth;
  const startY = Math.random() * window.innerHeight * 0.5;
  const length = Math.random() * 150 + 100;
  const duration = Math.random() * 2 + 1;

  meteor.style.left = startX + "px";
  meteor.style.top = startY + "px";
  meteor.style.height = length + "px";
  meteor.style.opacity = "1";
  meteor.style.transform = `rotate(${Math.random() * 45 + 20}deg)`;

  document.body.appendChild(meteor);

  meteor.animate(
    [
      { transform: `translateY(0) translateX(0) rotate(20deg)`, opacity: 1 },
      { transform: `translateY(${window.innerHeight}px) translateX(${length}px) rotate(20deg)`, opacity: 0 }
    ],
    { duration: duration * 1000, easing: "linear" }
  );

  setTimeout(() => meteor.remove(), duration * 1000);
}
setInterval(createMeteor, 3000);
for (let i = 0; i < 5; i++) setTimeout(createMeteor, i * 1000);

document.addEventListener("DOMContentLoaded", () => {

  /* ================= SHOOTING STARS ================= */
  function createMeteor() {
    const meteor = document.createElement("div");
    meteor.className = "meteor";

    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight * 0.4;
    const length = Math.random() * 120 + 80;
    const duration = Math.random() * 1200 + 1200;

    meteor.style.left = startX + "px";
    meteor.style.top = startY + "px";
    meteor.style.height = length + "px";

    document.body.appendChild(meteor);

    let start = null;
    function animate(t) {
      if (!start) start = t;
      const p = (t - start) / duration;

      meteor.style.transform =
        `translate(${p * length}px, ${p * window.innerHeight}px) rotate(30deg)`;
      meteor.style.opacity = String(1 - p);

      if (p < 1) requestAnimationFrame(animate);
      else meteor.remove();
    }

    requestAnimationFrame(animate);
  }

  for (let i = 0; i < 4; i++) setTimeout(createMeteor, i * 800);
  setInterval(createMeteor, 3000);

  /* ================= SHLOKA TYPING ================= */
  const shlokaEl = document.getElementById("shloka-text");
  if (!shlokaEl) return;

  const shloka =
    "ॐ कृष्णाय वासुदेवाय हरये परमात्मने। प्रणतः क्लेशनाशाय गोविंदाय नमो नमः॥";

  let index = 0;

  function typeShloka() {
    shlokaEl.textContent =
      shloka.slice(0, index) + (index % 2 === 0 ? "▌" : "");
    index++;

    if (index <= shloka.length) {
      setTimeout(typeShloka, 110);
    } else {
      setTimeout(() => {
        index = 0;
        typeShloka();
      }, 3500);
    }
  }

  typeShloka();
});


