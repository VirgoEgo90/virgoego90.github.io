// Neon Sankofa Look Namer — original word banks, no trademarks
(function(){
const W={
 cosmic:["Orbit","Nebula","Zenith","Meridian","Solstice","Equinox","Parallax","Comet","Eclipse","Quasar","Halo","Aurora","Star-Map","Ion","Pulsar","Lumen","Vector","Apogee"],
 earth:["Clay","Baobab","Delta","Savanna","Harmattan","Ochre","Basalt","River","Laterite","Rainline","Dune","Indigo Vat","Red Earth","Monsoon","Root","Shoreline"],
 metal:["Gold","Chrome","Brass","Copper","Titanium","Mercury","Silver","Bronze","Gilt","Alloy","Ingot","Filament"],
 color:["Midnight","Indigo","Saffron","Cobalt","Ember","Onyx","Amber","Teal","Violet","Bone","Rust","Ink","Jade","Night"],
 motion:["Signal","Frequency","Transmission","Drift","Pulse","Ascent","Current","Rhythm","Echo","Cadence","Voltage","Tide","Procession","Return","Lift","Groove"],
 time:["Ancestral","Future","Tomorrow","Homecoming","Second Sunrise","Year Zero","Next Century","Memory","Archive","Long Now","After Hours","Last Light"],
 form:["Column","Arc","Fold","Seam","Drape","Panel","Pleat","Line","Cut","Silhouette","Shell","Volume","Contour","Frame"],
 people:["Navigator","Oracle","Architect","Courier","Keeper","Cartographer","Pilot","Weaver","Envoy","Signalman","Griot","Dreamer","Messenger","Engineer"],
 place:["Station","Port","Quarter","Embassy","Atelier","Observatory","Market","Terminal","Garden","Archive","Harbor","Studio","Citadel"]
};
const PATTERNS={
 collection:[["color","&","metal"],["time","motion"],["cosmic","form"],["earth","to","cosmic"],["The","people","Edit"],["metal","motion"],["time","place"],["color","cosmic"]],
 look:[["The","form","in","color"],["metal","form"],["color","motion"],["people","No.","#"],["earth","form"],["cosmic","Cut"],["Look","#",":","color","form"]],
 brand:[["color","place"],["metal","&","earth"],["cosmic","Atelier"],["House of","cosmic"],["earth","+","metal"],["people","Studio"],["motion","Supply"]],
 character:[["people","of the","place"],["The","color","people"],["cosmic","people"],["people","color","-","#"]],
 palette:[["color","&","metal"],["earth","color"],["cosmic","Glow"],["color","motion"]]
};
const SIL=["column jumpsuit","wide-leg one-piece","utility boilersuit","cropped jacket + high-waist trouser","long duster over a bodysuit","asymmetric wrap dress","structured shoulder blazer dress","tapered cargo set","knit set with a long coat","pleated maxi skirt + fitted top"];
const TEX=["matte wool","liquid satin","indigo resist-dyed cotton","metallic jacquard","ribbed knit","technical nylon","raw denim","brushed velvet","crisp poplin","strip-woven cotton panel"];
const ACC=["one sculptural gold cuff","stacked chrome rings","a geometric metal belt","cowrie-detail earrings","architectural ankle boots","a chrome-accent sneaker","a structured crossbody","a wrapped head scarf","oversized gold hoops","a single statement collar"];
const PAL={"Night & Gold":["#070709","#d4a017","#e8c547"],"Indigo & Chrome":["#1a2870","#c5c8d0","#7b93ff"],"Solar Rust":["#1b0f0a","#c8612b","#f0b45a"],"Orbit Teal":["#061418","#18a3a0","#e8c547"],"Violet Signal":["#0d0716","#8a5cf6","#f472b6"],"Bone & Ink":["#f3ead7","#101014","#9a7b2a"]};
const $=id=>document.getElementById(id);
const pick=a=>a[Math.floor(Math.random()*a.length)];
function name(kind,mood){const pat=pick(PATTERNS[kind]);
 return pat.map(t=>{if(t==="#")return String(Math.floor(Math.random()*90)+10);if(W[t]){if(mood!=="any"&&Math.random()<.55&&["cosmic","earth","metal"].includes(t))return pick(W[mood]);return pick(W[t])}return t}).join(" ").replace(/ - /g,"-").replace(/ :/g,":").replace(/ No\. /,"No. ").replace(/\s+/g," ").trim()}
function brief(){const p=pick(Object.keys(PAL));return{sil:pick(SIL),tex:pick(TEX),acc:pick(ACC),pal:p,hex:PAL[p]}}
function toast(t){const e=$("toast");e.textContent=t;e.hidden=false;clearTimeout(e._t);e._t=setTimeout(()=>e.hidden=true,1600)}
function copy(t){navigator.clipboard&&navigator.clipboard.writeText(t).then(()=>toast("Copied"),()=>toast(t))}
const saved=JSON.parse(localStorage.getItem("ns-names")||"[]");
function renderSaved(){const ul=$("saved");ul.innerHTML="";saved.forEach((s,i)=>{const li=document.createElement("li");li.textContent=s+" ";const x=document.createElement("button");x.className="btn";x.textContent="remove";x.style.padding="2px 10px";x.onclick=()=>{saved.splice(i,1);store()};li.appendChild(x);ul.appendChild(li)});$("saved-wrap").hidden=!saved.length}
function store(){localStorage.setItem("ns-names",JSON.stringify(saved));renderSaved()}
function gen(){const kind=$("kind").value,mood=$("mood").value,out=$("out");out.innerHTML="";const seen=new Set();let tries=0;
 while(seen.size<8&&tries++<80)seen.add(name(kind,mood));
 [...seen].forEach(n=>{const b=brief();const d=document.createElement("div");d.className="card";
  const pq=encodeURIComponent(b.pal);
  d.innerHTML=`<h3 style="margin-top:0">${n.replace(/</g,"")}</h3><p class="muted" style="margin:.2em 0 .6em">${/^[aeiou]/i.test(b.sil)?"An":"A"} ${b.sil} in ${b.tex}, finished with ${b.acc}.</p><div class="chips">${b.hex.map(h=>`<span class="chip" style="background:${h}" title="${h}"></span>`).join("")}<span class="mono muted" style="margin-left:6px">${b.pal}</span></div><div class="row"><button class="btn" data-c>Copy</button><button class="btn" data-s>Save</button><a class="btn" href="https://virgoego90.github.io/patterns/?p=${pq}">Pattern for it</a></div>`;
  d.querySelector("[data-c]").onclick=()=>copy(`${n} — ${b.sil} in ${b.tex}, ${b.acc}. Palette: ${b.pal} (${b.hex.join(", ")})`);
  d.querySelector("[data-s]").onclick=()=>{if(!saved.includes(n)){saved.unshift(n);saved.splice(30);store();toast("Saved")}};
  out.appendChild(d)})}
$("go").onclick=gen;$("kind").onchange=gen;$("mood").onchange=gen;
$("copy-all").onclick=()=>copy(saved.join("\n"));
renderSaved();gen();window.__nm={gen};
})();
