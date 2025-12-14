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
