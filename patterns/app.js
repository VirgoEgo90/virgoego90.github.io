// Neon Sankofa Pattern Lab — seamless tile generator (original motifs)
(function(){
const PALETTES={
 "Night & Gold":["#070709","#d4a017","#e8c547","#22222c","#9a7b2a"],
 "Indigo & Chrome":["#1a2870","#c5c8d0","#7b93ff","#0b1033","#8b90a0"],
 "Adire Indigo":["#0f1a4a","#e9e4d4","#3a56b0","#081032","#b9c3e6"],
 "Strip-Weave Heat":["#141010","#e0a526","#2f7a3d","#b8352a","#1f2a7a"],
 "Solar Rust":["#1b0f0a","#c8612b","#f0b45a","#5a2a17","#f3ead7"],
 "Orbit Teal":["#061418","#18a3a0","#e8c547","#0d2d33","#c5c8d0"],
 "Violet Signal":["#0d0716","#8a5cf6","#f472b6","#1e1033","#e8c547"],
 "Bone & Ink":["#f3ead7","#101014","#9a7b2a","#d9cdb3","#2a3f8f"]
};
const MOTIFS={
 "Resist Grid (adire-inspired)":resist,
 "Strip Weave (kente-inspired)":weave,
 "Circuit Path":circuit,
 "Star Chart":stars,
 "Chevron Pulse":chevron,
 "Mark Field (mudcloth-inspired)":marks,
 "Orbit Rings":orbits
};
const $=id=>document.getElementById(id);
const cv=$("tile"),pv=$("preview");
let seed=Math.floor(Math.random()*1e6);
function rng(s){return function(){s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function fill(sel,obj){Object.keys(obj).forEach(k=>{const o=document.createElement("option");o.textContent=k;sel.appendChild(o)})}
fill($("motif"),MOTIFS);fill($("palette"),PALETTES);
const params=new URLSearchParams(location.search);
if(params.get("m")&&MOTIFS[params.get("m")])$("motif").value=params.get("m");
if(params.get("p")&&PALETTES[params.get("p")])$("palette").value=params.get("p");
if(params.get("s"))seed=parseInt(params.get("s"),10)||seed;
if(params.get("d"))$("density").value=params.get("d");
function state(){return{m:$("motif").value,p:$("palette").value,d:+$("density").value,w:+$("weight").value,s:seed}}
function draw(ctx,S,st){
 const pal=PALETTES[st.p],r=rng(st.s);ctx.save();ctx.fillStyle=pal[0];ctx.fillRect(0,0,S,S);
 MOTIFS[st.m](ctx,S,pal,r,st.d,st.w);ctx.restore();
}
// helper: draw shape wrapped on torus so tile is seamless
function wrap(ctx,S,x,y,rad,fn){for(const dx of[-S,0,S])for(const dy of[-S,0,S]){if(x+dx+rad<0||x+dx-rad>S||y+dy+rad<0||y+dy-rad>S)continue;fn(x+dx,y+dy)}}
function resist(ctx,S,pal,r,d,w){
 const n=2+d,c=S/n;ctx.lineWidth=w*S/400;
 for(let i=0;i<n;i++)for(let j=0;j<n;j++){
  const x=i*c,y=j*c,k=(i+j)%2,cx=x+c/2,cy=y+c/2;ctx.strokeStyle=pal[1];ctx.fillStyle=pal[k?4:1];
  const t=Math.floor(r()*4);
  if(t===0){for(let q=1;q<=3;q++){ctx.beginPath();ctx.arc(cx,cy,c*q/8,0,7);ctx.stroke()}}
  else if(t===1){for(let q=0;q<5;q++){ctx.beginPath();ctx.moveTo(x+c*.15,y+c*(.2+q*.15));ctx.lineTo(x+c*.85,y+c*(.2+q*.15));ctx.stroke()}}
  else if(t===2){ctx.globalAlpha=.85;for(let a=0;a<3;a++)for(let b=0;b<3;b++){ctx.beginPath();ctx.arc(x+c*(.25+a*.25),y+c*(.25+b*.25),c*.06,0,7);ctx.fill()}ctx.globalAlpha=1}
  else{ctx.beginPath();ctx.moveTo(x+c*.2,y+c*.2);ctx.lineTo(x+c*.8,y+c*.8);ctx.moveTo(x+c*.8,y+c*.2);ctx.lineTo(x+c*.2,y+c*.8);ctx.stroke()}
  ctx.globalAlpha=.25;ctx.strokeRect(x,y,c,c);ctx.globalAlpha=1;
 }}
function weave(ctx,S,pal,r,d,w){
 const n=2+Math.floor(d/2),bh=S/n;
 for(let j=0;j<n;j++){const blocks=2+Math.floor(r()*3)+Math.floor(d/3),bw=S/blocks;
  for(let i=0;i<blocks;i++){const base=pal[1+Math.floor(r()*4)];ctx.fillStyle=base;ctx.fillRect(i*bw,j*bh,bw,bh);
   const pat=Math.floor(r()*3);ctx.fillStyle=pal[0];
   const stripes=3+Math.floor(r()*4);
   for(let s=0;s<stripes;s++){const sw=bh/(stripes*2)*(w/3);
    if(pat===0)ctx.fillRect(i*bw,j*bh+(s*2+.5)*bh/(stripes*2),bw,sw);
    else if(pat===1)ctx.fillRect(i*bw+(s*2+.5)*bw/(stripes*2),j*bh,sw*bw/bh,bh);
    else{ctx.fillRect(i*bw+bw*.3,j*bh+(s*2+.5)*bh/(stripes*2),bw*.4,sw)}}
  }}}
function circuit(ctx,S,pal,r,d,w){
 const n=4+d*2,c=S/n;ctx.lineCap="round";ctx.lineWidth=w*S/500;
 for(let k=0;k<n*2;k++){let x=Math.floor(r()*n),y=Math.floor(r()*n);ctx.strokeStyle=pal[1+Math.floor(r()*3)];ctx.fillStyle=ctx.strokeStyle;
  const steps=3+Math.floor(r()*6);
  // avoid seams: redraw as segments
  ctx.beginPath();
  let px=null,py=null;x=Math.floor(r()*n);y=Math.floor(r()*n);
  for(let s=0;s<steps;s++){const dir=Math.floor(r()*4);const nx=x+[1,-1,0,0][dir],ny=y+[0,0,1,-1][dir];
   wrap(ctx,S,(x+.5)*c,(y+.5)*c,c*1.5,(ax,ay)=>{ctx.moveTo(ax,ay);ctx.lineTo(ax+(nx-x)*c,ay+(ny-y)*c)});x=(nx+n)%n;y=(ny+n)%n}
  ctx.stroke();
  wrap(ctx,S,(x+.5)*c,(y+.5)*c,c,(ax,ay)=>{ctx.beginPath();ctx.arc(ax,ay,c*.18,0,7);ctx.fill()});
 }}
function stars(ctx,S,pal,r,d,w){
 const g=ctx.createRadialGradient(S*.3,S*.3,0,S*.3,S*.3,S);g.addColorStop(0,pal[3]);g.addColorStop(1,pal[0]);ctx.fillStyle=pal[0];ctx.fillRect(0,0,S,S);
 const pts=[];const n=30+d*25;
 for(let i=0;i<n;i++){const x=r()*S,y=r()*S,s=(r()**3)*S/60*w/3+S/500;pts.push([x,y]);ctx.fillStyle=pal[1+Math.floor(r()*4)];
  wrap(ctx,S,x,y,s*3,(ax,ay)=>{ctx.beginPath();ctx.arc(ax,ay,s,0,7);ctx.fill();if(s>S/150){ctx.globalAlpha=.4;ctx.fillRect(ax-s*3,ay-s*.15,s*6,s*.3);ctx.fillRect(ax-s*.15,ay-s*3,s*.3,s*6);ctx.globalAlpha=1}})}
 ctx.strokeStyle=pal[2];ctx.globalAlpha=.35;ctx.lineWidth=S/900*w;
 for(let i=0;i<pts.length-1;i+=3){const a=pts[i],b=pts[i+1];if(Math.hypot(a[0]-b[0],a[1]-b[1])<S/3){wrap(ctx,S,a[0],a[1],S/3,(ax,ay)=>{ctx.beginPath();ctx.moveTo(ax,ay);ctx.lineTo(ax+b[0]-a[0],ay+b[1]-a[1]);ctx.stroke()})}}
 ctx.globalAlpha=1;}
function chevron(ctx,S,pal,r,d,w){
 const n=2+d,h=S/n;const cols=[pal[1],pal[2],pal[3],pal[4]];
 for(let j=0;j<n;j++){ctx.fillStyle=cols[j%cols.length];const k=2*Math.max(1,Math.round(n/2));const pw=S/k;
  ctx.beginPath();for(let i=0;i<=k;i++){const x=i*pw,y=j*h+(i%2?h*.15:h*.15+h*.35*(w/3));ctx.lineTo(x,y)}
  for(let i=k;i>=0;i--){const x=i*pw,y=j*h+(i%2?h*.15:h*.15+h*.35*(w/3))+h*.35;ctx.lineTo(x,y)}ctx.closePath();ctx.fill();
  ctx.fillStyle=pal[0];for(let i=0;i<k;i+=1){ctx.beginPath();ctx.arc(i*pw+pw/2,j*h+h*.85,h*.05,0,7);ctx.fill()}}}
function marks(ctx,S,pal,r,d,w){
 const n=3+d,c=S/n;ctx.fillStyle=pal[0];ctx.fillRect(0,0,S,S);ctx.strokeStyle=pal[1];ctx.fillStyle=pal[1];ctx.lineWidth=w*S/450;ctx.lineCap="round";
 for(let i=0;i<n;i++)for(let j=0;j<n;j++){const x=i*c,y=j*c,t=(i*7+j*3+Math.floor(r()*3))%6;ctx.beginPath();
  if(t===0){for(let q=0;q<4;q++){ctx.moveTo(x+c*(.2+q*.2),y+c*.2);ctx.lineTo(x+c*(.2+q*.2),y+c*.8)}}
  else if(t===1){ctx.moveTo(x+c*.15,y+c*.5);for(let q=0;q<6;q++)ctx.lineTo(x+c*(.15+q*.14),y+c*(q%2?.3:.7))}
  else if(t===2){for(let a=0;a<4;a++)for(let b=0;b<4;b++){ctx.moveTo(x+c*(.2+a*.2)+c*.03,y+c*(.2+b*.2));ctx.arc(x+c*(.2+a*.2),y+c*(.2+b*.2),c*.03,0,7)}}
  else if(t===3){ctx.rect(x+c*.25,y+c*.25,c*.5,c*.5);ctx.moveTo(x+c*.5,y+c*.25);ctx.lineTo(x+c*.5,y+c*.75)}
  else if(t===4){ctx.moveTo(x+c*.2,y+c*.2);ctx.lineTo(x+c*.8,y+c*.8);ctx.moveTo(x+c*.5,y+c*.2);ctx.lineTo(x+c*.8,y+c*.5)}
  else{ctx.moveTo(x+c*.2,y+c*.35);ctx.lineTo(x+c*.8,y+c*.35);ctx.moveTo(x+c*.2,y+c*.65);ctx.lineTo(x+c*.8,y+c*.65)}
  ctx.stroke()}}
function orbits(ctx,S,pal,r,d,w){
 const n=6+d*4;ctx.lineWidth=w*S/700;
 for(let i=0;i<n;i++){const x=r()*S,y=r()*S,R=S*(.05+r()*.18);ctx.strokeStyle=pal[1+Math.floor(r()*4)];
  wrap(ctx,S,x,y,R,(ax,ay)=>{ctx.beginPath();ctx.ellipse(ax,ay,R,R*.38,r()*0+i,0,7);ctx.stroke();ctx.fillStyle=ctx.strokeStyle;ctx.beginPath();ctx.arc(ax+R*Math.cos(i),ay+R*.38*Math.sin(i),S/180*w,0,7);ctx.fill()})}}
function render(){const st=state();const ctx=cv.getContext("2d");draw(ctx,cv.width,st);
 const p=pv.getContext("2d");p.fillStyle=p.createPattern(cv,"repeat");const sc=+$("zoom").value/100;p.save();p.setTransform(sc,0,0,sc,0,0);p.fillRect(0,0,pv.width/sc,pv.height/sc);p.restore();
 const ch=$("chips");ch.innerHTML="";PALETTES[st.p].forEach(h=>{const s=document.createElement("button");s.className="chip";s.style.background=h;s.title="Copy "+h;s.setAttribute("aria-label","Copy "+h);s.onclick=()=>copy(h);ch.appendChild(s)});
 $("hexes").textContent=PALETTES[st.p].join("  ");
 const q=new URLSearchParams({m:st.m,p:st.p,s:st.s,d:st.d});history.replaceState(null,"","?"+q.toString());}
function toast(t){const e=$("toast");e.textContent=t;e.hidden=false;clearTimeout(e._t);e._t=setTimeout(()=>e.hidden=true,1600)}
function copy(t){navigator.clipboard&&navigator.clipboard.writeText(t).then(()=>toast("Copied "+t.slice(0,40)),()=>toast(t))}
function dl(c,name){c.toBlob(b=>{const a=document.createElement("a");a.href=URL.createObjectURL(b);a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),2000)},"image/png")}
function slug(){const st=state();return("neon-sankofa-"+st.m.split(" (")[0]+"-"+st.p+"-"+st.s).toLowerCase().replace(/[^a-z0-9]+/g,"-")}
function exportSize(w,h,label){const t=document.createElement("canvas");t.width=1024;t.height=1024;draw(t.getContext("2d"),1024,state());
 if(!w){dl(t,slug()+"-tile-1024.png");return}
 const o=document.createElement("canvas");o.width=w;o.height=h;const c=o.getContext("2d");c.fillStyle=c.createPattern(t,"repeat");const sc=(+$("zoom").value/100)*(Math.max(w,h)/1600);c.setTransform(sc,0,0,sc,0,0);c.fillRect(0,0,w/sc,h/sc);c.setTransform(1,0,0,1,0,0);
 c.font=`600 ${Math.round(w/90)}px Sora, sans-serif`;c.fillStyle="rgba(243,234,215,.55)";c.textAlign="right";c.fillText("Neon Sankofa Pattern Lab",w-w/40,h-w/40);dl(o,slug()+"-"+label+".png")}
["motif","palette","density","weight","zoom"].forEach(id=>$(id).addEventListener("input",render));
$("shuffle").onclick=()=>{seed=Math.floor(Math.random()*1e6);render()};
$("surprise").onclick=()=>{const m=Object.keys(MOTIFS),p=Object.keys(PALETTES);$("motif").value=m[Math.floor(Math.random()*m.length)];$("palette").value=p[Math.floor(Math.random()*p.length)];seed=Math.floor(Math.random()*1e6);render()};
$("dl-tile").onclick=()=>exportSize(0,0,"tile");
$("dl-phone").onclick=()=>exportSize(1290,2796,"phone");
$("dl-desk").onclick=()=>exportSize(2560,1440,"desktop");
$("copy-link").onclick=()=>copy(location.href);
$("copy-hex").onclick=()=>copy(PALETTES[state().p].join(", "));
window.__pl={render,state};
render();
})();
