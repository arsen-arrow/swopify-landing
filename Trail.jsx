/* The trail between the hero and the camera story: one line that draws itself
   down the page with a few short points hung on it. No cards, no numbering. */

const TR_CSS=`
@keyframes trPing{0%{opacity:.5;transform:translate(-50%,-50%) scale(1)}100%{opacity:0;transform:translate(-50%,-50%) scale(2.1)}}
.tr-pt{cursor:default}
.tr-pt:hover .tr-sub{color:var(--text-body)}
@media (prefers-reduced-motion:reduce){.tr-ping{animation:none!important;opacity:0!important}}
`;

const PTS=[
  {a:'Що маєш — те й ',w:'валюта',b:'',sub:'Ціни немає. Замість неї — список того, що хочеш натомість.'},
  {a:'Половина шафи — ',w:'чиясь мрія',b:'',sub:'Те, що тобі вже не треба, комусь треба дуже.'},
  {a:'Без грошей. ',w:'Взагалі',b:'',sub:'Ні цінників, ні комісій, ні торгів.'},
  {a:'Обмін ',w:'не зірветься',b:'',sub:'Посилка розблокується тільки коли обидва відправили своє.'}
];
const ROT=[-1.7,1.5,-1.1,1.9];

const trCl=(v,a,b)=>Math.min(b,Math.max(a,v));
const trSm=t=>t*t*(3-2*t);

/* Catmull-Rom through the waypoints → one smooth line, so the road bends
   instead of stepping between points. */
function trPath(pts,k=0.9){
  let d='M'+pts[0].x.toFixed(1)+' '+pts[0].y.toFixed(1);
  for(let i=0;i<pts.length-1;i++){
    const p0=pts[i-1]||pts[i],p1=pts[i],p2=pts[i+1],p3=pts[i+2]||pts[i+1];
    const c1x=p1.x+(p2.x-p0.x)/6*k,c1y=p1.y+(p2.y-p0.y)/6*k;
    const c2x=p2.x-(p3.x-p1.x)/6*k,c2y=p2.y-(p3.y-p1.y)/6*k;
    d+='C'+c1x.toFixed(1)+' '+c1y.toFixed(1)+' '+c2x.toFixed(1)+' '+c2y.toFixed(1)+' '+p2.x.toFixed(1)+' '+p2.y.toFixed(1);
  }
  return d;
}

function trLayout(W){
  const narrow=W<820;
  const gap=narrow?250:298;
  const top=narrow?110:140;
  const H=top+(PTS.length-1)*gap+(narrow?190:230);
  const cx=W/2;
  const nodes=PTS.map((_,i)=>({
    x:narrow?(30+(i%2?14:0)):(cx+(i%2?134:-134)),
    y:top+i*gap,
    dir:narrow?1:(i%2?-1:1)
  }));
  const way=[{x:narrow?26:cx-14,y:0},...nodes.map(n=>({x:n.x,y:n.y})),{x:narrow?40:cx+14,y:H-52}];
  const ex=way[way.length-1].x,ey=way[way.length-1].y;
  /* dots that pick the road up right under the hero's arrow */
  const lead=Array.from({length:4},(_,i)=>{const t=i/3;return {x:(narrow?26:cx)+(way[0].x-(narrow?26:cx))*t,y:-52+i*14,r:1.9+t*0.9,o:.3+t*.3};});
  /* the road doesn't stop at the section edge — a few faint dots keep going,
     out of the section and down toward the camera in the story below */
  const tail=Array.from({length:8},(_,i)=>{const t=(i+1)/8;return {x:ex+(narrow?W*0.34:W*0.13)*t,y:ey+26+i*36,r:4.2-2.2*t,o:0.46*(1-t*0.8)};});
  return {narrow,H,cx,nodes,tail,lead,d:trPath(way),ex,ey,
    fs:narrow?25:Math.round(trCl(W*0.0325,29,39))};
}

function Trail(){
  const inner=React.useRef(null),pathEl=React.useRef(null),headEl=React.useRef(null),arrowEl=React.useRef(null);
  const dots=React.useRef([]),glows=React.useRef([]),txts=React.useRef([]),hls=React.useRef([]);
  const hoverRef=React.useRef(-1);
  const [W,setW]=React.useState(1160);
  const L=React.useMemo(()=>trLayout(W),[W]);

  React.useEffect(()=>{
    const el=inner.current;if(!el)return;
    const ro=new ResizeObserver(es=>{const w=Math.round(es[0].contentRect.width);if(w>0)setW(w);});
    ro.observe(el);
    return()=>ro.disconnect();
  },[]);

  React.useEffect(()=>{
    const pe=pathEl.current,el=inner.current;if(!pe||!el)return;
    const G=trLayout(W);
    const total=pe.getTotalLength();
    /* where each point sits along the line, so a node lights up exactly when
       the drawing tip reaches it */
    const best=G.nodes.map(()=>({d:1e12,l:0}));
    for(let l=0;l<=total;l+=5){
      const pt=pe.getPointAtLength(l);
      G.nodes.forEach((n,i)=>{const dd=(pt.x-n.x)*(pt.x-n.x)+(pt.y-n.y)*(pt.y-n.y);if(dd<best[i].d){best[i].d=dd;best[i].l=l;}});
    }
    const frac=best.map(b=>b.l/total);
    pe.style.strokeDasharray=total.toFixed(1);

    const apply=p=>{
      pe.style.strokeDashoffset=(total*(1-p)).toFixed(1);
      if(headEl.current){
        const hp=pe.getPointAtLength(total*p);
        headEl.current.style.transform='translate3d('+hp.x.toFixed(1)+'px,'+hp.y.toFixed(1)+'px,0) translate(-50%,-50%)';
        headEl.current.style.opacity=(p>0.006&&p<0.994?1:0).toFixed(2);
      }
      if(arrowEl.current)arrowEl.current.style.opacity=trCl((p-0.88)/0.1,0,1).toFixed(3);
      G.nodes.forEach((n,i)=>{
        const a=trSm(trCl((p-frac[i]+0.014)/0.07,0,1));
        const hv=hoverRef.current===i;
        const dot=dots.current[i],gl=glows.current[i],tx=txts.current[i],hl=hls.current[i];
        if(dot){dot.style.opacity=a.toFixed(3);dot.style.transform='translate(-50%,-50%) scale('+((0.2+0.8*a)*(hv?1.42:1)).toFixed(3)+')';}
        if(gl)gl.style.opacity=(Math.sin(a*Math.PI)*0.9+(hv?0.35:0)).toFixed(3);
        if(tx){
          tx.style.opacity=a.toFixed(3);
          tx.style.transform='translateY(-50%) translate3d('+(((1-a)*32*-n.dir)+(hv?n.dir*5:0)).toFixed(1)+'px,0,0) rotate('+(ROT[i]*(0.35+0.65*a)).toFixed(2)+'deg)';
        }
        if(hl)hl.style.transform='scaleX('+trCl((a-0.3)/0.5,0,1).toFixed(3)+')';
      });
    };

    if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion:reduce)').matches){apply(1);return;}
    let raf=0;
    const tick=()=>{
      const r=el.getBoundingClientRect(),vh=window.innerHeight;
      const start=vh*0.80,end=-(r.height-vh*0.42);
      apply(trCl((start-r.top)/Math.max(1,start-end),0,1));
      raf=requestAnimationFrame(tick);
    };
    raf=requestAnimationFrame(tick);
    return()=>cancelAnimationFrame(raf);
  },[W]);

  const head={font:'800 '+L.fs+'px/1.08 var(--font-display)',letterSpacing:'var(--ls-display)',color:'var(--violet-950)',margin:0,transform:'skewX(-8deg)',transformOrigin:'0 100%',textWrap:'pretty'};

  return (
    <section id="trail" style={{position:'relative',zIndex:1,background:'linear-gradient(180deg,#FBF3FE 0%,#FDFAFF 46%,var(--surface-card) 100%)'}}>
      <style>{TR_CSS}</style>
      <div style={{maxWidth:'var(--page-max)',margin:'0 auto',padding:'var(--sp-1) var(--gutter-web) var(--sp-8)'}}>
        <div ref={inner} style={{position:'relative',height:L.H}}>
          <svg width={W} height={L.H} viewBox={'0 0 '+W+' '+L.H} fill="none" aria-hidden="true" style={{position:'absolute',left:0,top:0,overflow:'visible'}}>
            <defs>
              {/* the walked road is dashed too — so it is revealed through a solid
                  mask instead of being drawn with the dash pattern itself */}
              <mask id="trReveal" maskUnits="userSpaceOnUse" x="-40" y="-40" width={W+80} height={L.H+80}>
                <path ref={pathEl} d={L.d} stroke="#fff" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" fill="none" style={{strokeDashoffset:99999}}/>
              </mask>
            </defs>
            <path d={L.d} stroke="var(--violet-200)" strokeWidth="2.4" strokeLinecap="round" strokeDasharray="1 13"/>
            {L.lead.map((t,i)=><circle key={i} cx={t.x} cy={t.y} r={t.r} fill="var(--violet-400)" opacity={t.o}/>)}
            <path d={L.d} stroke="var(--violet-500)" strokeWidth="3.6" strokeLinecap="round" strokeDasharray="2.6 12" mask="url(#trReveal)"/>
            <g ref={arrowEl} style={{opacity:0}}>
              {L.tail.map((t,i)=><circle key={i} cx={t.x} cy={t.y} r={t.r} fill="var(--violet-500)" opacity={t.o}/>)}
              <path d={'M'+(L.ex-13)+' '+(L.ey-14)+'L'+L.ex+' '+L.ey+'L'+(L.ex+13)+' '+(L.ey-14)} stroke="var(--violet-500)" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" opacity=".85"/>
            </g>
          </svg>

          <span ref={headEl} aria-hidden="true" style={{position:'absolute',left:0,top:0,width:16,height:16,borderRadius:'50%',background:'var(--violet-500)',boxShadow:'0 0 0 6px rgba(166,63,233,.16),0 6px 16px rgba(116,24,190,.45)',opacity:0,pointerEvents:'none'}}/>

          {L.nodes.map((n,i)=>{
            const P=PTS[i];
            const w=L.narrow?Math.max(200,W-n.x-46):Math.min(430,W/2-40);
            return (
              <React.Fragment key={P.w}>
                <span ref={e=>glows.current[i]=e} aria-hidden="true" style={{position:'absolute',left:n.x,top:n.y,width:200,height:200,marginLeft:-100,marginTop:-100,borderRadius:'50%',background:'radial-gradient(circle,var(--violet-200),transparent 66%)',opacity:0,pointerEvents:'none'}}/>
                <span ref={e=>dots.current[i]=e} onPointerEnter={()=>hoverRef.current=i} onPointerLeave={()=>{if(hoverRef.current===i)hoverRef.current=-1;}}
                  style={{position:'absolute',left:n.x,top:n.y,width:19,height:19,borderRadius:'50%',background:'var(--violet-600)',border:'4px solid #fff',boxShadow:'0 4px 12px rgba(116,24,190,.4)',opacity:0,transform:'translate(-50%,-50%) scale(.2)',zIndex:2}}/>
                <div ref={e=>txts.current[i]=e} className="tr-pt"
                  onPointerEnter={()=>hoverRef.current=i} onPointerLeave={()=>{if(hoverRef.current===i)hoverRef.current=-1;}}
                  style={{position:'absolute',top:n.y,left:n.dir>0?n.x+(L.narrow?40:58):'auto',right:n.dir>0?'auto':(W-n.x+58),width:w,
                    textAlign:n.dir>0?'left':'right',opacity:0,transform:'translateY(-50%)',transformOrigin:n.dir>0?'0% 50%':'100% 50%',zIndex:1}}>
                  <p style={head}>
                    {P.a}
                    <span style={{position:'relative',display:'inline-block',whiteSpace:'nowrap'}}>
                      <span ref={e=>hls.current[i]=e} aria-hidden="true" style={{position:'absolute',left:'-.1em',right:'-.1em',bottom:'.04em',height:'.42em',background:'var(--violet-200)',borderRadius:2,transform:'scaleX(0)',transformOrigin:'0% 50%'}}/>
                      <span style={{position:'relative',color:'var(--violet-600)'}}>{P.w}</span>
                    </span>
                    {P.b}
                  </p>
                  <p className="tr-sub" style={{font:'var(--fw-regular) 17px/1.5 var(--font-text)',color:'var(--text-muted)',marginTop:12,maxWidth:'31ch',marginLeft:n.dir>0?0:'auto',transition:'color var(--dur-base) var(--ease-standard)'}}>{P.sub}</p>
                </div>
              </React.Fragment>
            );
          })}

          <span style={{position:'absolute',left:L.narrow?L.ex+30:L.ex+34,top:L.ey-30,display:'flex',flexDirection:'column',alignItems:'flex-start',gap:1}}>
            <Note rotate={-5} size={L.narrow?22:27}>усміхнись —</Note>
            <Note rotate={-2} size={L.narrow?19:23} style={{marginLeft:22}}>знімаємо твою першу річ</Note>
          </span>
        </div>
      </div>
    </section>
  );
}

Object.assign(window,{Trail});
