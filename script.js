// CURSOR GLOW
const glow=document.querySelector(".cursor-glow");
window.addEventListener("mousemove",e=>{
  glow.style.left=e.clientX+"px";
  glow.style.top=e.clientY+"px";
});

// SCROLL ANIMATION
const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting) e.target.classList.add("show");
  });
},{threshold:0.2});
document.querySelectorAll("section").forEach(s=>obs.observe(s));

// TYPING (ONLY ON HOME)
const typed=document.getElementById("typed");
if(typed){
  const roles=[
    "Competitive Programmer",
    "C++ Problem Solver",
    "Codeforces Regular",
    "AI / ML Explorer"
  ];
  let i=0,j=0,del=false;
  (function type(){
    if(!del && j<=roles[i].length) typed.textContent=roles[i].slice(0,j++);
    else if(del && j>=0) typed.textContent=roles[i].slice(0,j--);
    if(j===roles[i].length+1) del=true;
    if(j===0 && del){del=false;i=(i+1)%roles.length;}
    setTimeout(type,del?50:90);
  })();
}

// BACKGROUND PARTICLES
const bg=document.getElementById("bg-particles");
if(bg){
  const ctx=bg.getContext("2d");
  function resize(){
    bg.width=innerWidth;
    bg.height=innerHeight;
  }
  resize(); addEventListener("resize",resize);

  const dots=[...Array(90)].map(()=>({
    x:Math.random()*bg.width,
    y:Math.random()*bg.height,
    r:Math.random()*2+1,
    dx:(Math.random()-.5)*.4,
    dy:(Math.random()-.5)*.4
  }));

  (function animate(){
    ctx.clearRect(0,0,bg.width,bg.height);
    ctx.fillStyle="rgba(56,189,248,.55)";
    dots.forEach(d=>{
      d.x+=d.dx; d.y+=d.dy;
      if(d.x<0||d.x>bg.width) d.dx*=-1;
      if(d.y<0||d.y>bg.height) d.dy*=-1;
      ctx.beginPath();
      ctx.arc(d.x,d.y,d.r,0,Math.PI*2);
      ctx.fill();
    });
    requestAnimationFrame(animate);
  })();
}

// PAGE TRANSITION
const transition=document.getElementById("page-transition");
document.querySelectorAll("a").forEach(link=>{
  link.addEventListener("click",e=>{
    if(link.target==="_blank") return;
    e.preventDefault();
    transition.classList.add("active");
    setTimeout(()=>window.location.href=link.href,400);
  });
});
window.addEventListener("pageshow",()=>transition.classList.remove("active"));

