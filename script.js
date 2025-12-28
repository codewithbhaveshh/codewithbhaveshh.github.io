/* ================= CURSOR ================= */
const glow = document.querySelector(".cursor-glow");
if (glow) {
  window.addEventListener("mousemove", e => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  });
}

/* ================= SECTION REVEAL ================= */
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => e.isIntersecting && e.target.classList.add("show"));
}, { threshold: .2 });

document.querySelectorAll("section").forEach(s => obs.observe(s));

/* ================= PARTICLES ================= */
const bg = document.getElementById("bg-particles");
if (bg) {
  const ctx = bg.getContext("2d");
  function resize(){ bg.width=innerWidth; bg.height=innerHeight; }
  resize(); addEventListener("resize",resize);

  const dots = Array.from({length:90},()=>({
    x:Math.random()*bg.width,
    y:Math.random()*bg.height,
    r:Math.random()*2+1,
    dx:(Math.random()-.5)*.4,
    dy:(Math.random()-.5)*.4
  }));

  function animate(){
    ctx.clearRect(0,0,bg.width,bg.height);
    ctx.fillStyle="rgba(56,189,248,.55)";
    dots.forEach(d=>{
      d.x+=d.dx; d.y+=d.dy;
      if(d.x<0||d.x>bg.width) d.dx*=-1;
      if(d.y<0||d.y>bg.height) d.dy*=-1;
      ctx.beginPath();
      ctx.arc(d.x,d.y,d.r,0,2*Math.PI);
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }
  animate();
}

/* ================= HERO TYPING ================= */
const typed = document.getElementById("typed");
if (typed){
  const lines = [
    "Competitive Programmer",
    "C++ | DSA",
    "Learning AI / ML",
    "Building strong fundamentals"
  ];
  let i=0,j=0,del=false;

  function type(){
    typed.textContent = lines[i].slice(0,j);

    if(!del){
      if(j++ === lines[i].length){ del=true; return setTimeout(type,1200);}
    } else {
      if(--j===0){ del=false; i=(i+1)%lines.length;}
    }
    setTimeout(type, del?40:80);
  }
  type();
}

/* ================= MUSIC ================= */
const bgm=document.getElementById("bgm");
const musicBtn=document.getElementById("musicBtn");
if(bgm && musicBtn){
  function update(){ musicBtn.textContent = bgm.paused?"▶ music":"⏸ music"; }
  musicBtn.onclick=()=>{ bgm.paused?bgm.play():bgm.pause(); update(); };
  update();
}

/* ================= PAGE TRANSITION ================= */
const transition=document.getElementById("page-transition");
if(transition){
  document.querySelectorAll("a").forEach(a=>{
    if(a.target==="_blank") return;
    a.addEventListener("click",e=>{
      e.preventDefault();
      transition.classList.add("active");
      setTimeout(()=>location.href=a.href,400);
    });
  });
  addEventListener("pageshow",()=>transition.classList.remove("active"));
}

/* ================= FAVORITE TOPICS ================= */
const topicsList=document.getElementById("topics-list");
if(topicsList){
  ["Data Structures","Graphs","DP","Greedy","Number Theory"]
  .forEach((t,i)=>{
    const d=document.createElement("div");
    d.textContent=t;
    d.style.transition=".8s"; d.style.opacity="0"; d.style.transform="translateY(20px)";
    topicsList.appendChild(d);
    setTimeout(()=>{d.style.opacity="1"; d.style.transform="translateY(0)"},300+i*200);
  });
}

/* ================= SHOOTING STAR ================= */
function meteor(){
  const m=document.createElement("div");
  m.className="meteor";
  const len=Math.random()*120+80;
  m.style.left=Math.random()*innerWidth+"px";
  m.style.top=Math.random()*innerHeight*.4+"px";
  m.style.height=len+"px";
  document.body.appendChild(m);

  m.animate([
    {transform:"translate(0,0) rotate(30deg)",opacity:1},
    {transform:`translate(${len}px,${innerHeight}px) rotate(30deg)`,opacity:0}
  ],{duration:1600,easing:"linear"});

  setTimeout(()=>m.remove(),1600);
}
setInterval(meteor,3000);
for(let i=0;i<4;i++) setTimeout(meteor,i*800);

/* ================= SHLOKA ================= */
const sh=document.getElementById("shloka-text");
if(sh){
  const s="If you're nothing without the suit, then you shouldn't have it";
  let k=0;
  function type(){
    sh.textContent=s.slice(0,k);
    if(k++<=s.length) setTimeout(type,90);
  }
  setTimeout(type,1800);
}

const sc=document.getElementById("shloka-container");
const sm=document.getElementById("shloka-meaning");
if(sc && sm){
  setTimeout(()=>{
    sc.textContent="साम दानं भेदः दण्डः";
    sc.style.opacity="1";
    sm.textContent="Persuasion → Compromise → Division → Force";
    sm.style.opacity=".8";
  },800);
}
