/* Бокова навігація: краплі, що перетікають одна в одну.
   Один blob на пружині ганяє по рейці; SVG goo-фільтр зливає його з точками,
   тому перехід читається як рідина, а не як стрибок. */
const SN_SECTIONS=[['hero','Початок'],['trail','Шлях'],['story','Історія'],['steps','Як це працює'],['cta','Викласти річ'],['cats','Що міняють']];
const SN_GAP=30, SN_W=34;
/* Точки завжди непрозорі — goo-фільтр рубає все, що нижче альфа-порогу,
   тому «згасання» робимо кольором, а не opacity. */
const mix=k=>{const a=[0xD9,0xA0,0xF8],b=[0x8E,0x26,0xE2];return 'rgb('+a.map((c,i)=>Math.round(c+(b[i]-c)*k)).join(',')+')';};
const SN_CSS='.sn{position:fixed;right:18px;top:50%;transform:translateY(-50%);z-index:34;pointer-events:none}.sn-goo{position:relative;width:'+SN_W+'px;filter:url(#sn-goo)}.sn-dot{position:absolute;left:50%;width:9px;height:9px;margin:-4.5px 0 0 -4.5px;border-radius:50%;background:#D9A0F8;will-change:transform,background-color}.sn-blob{position:absolute;left:50%;width:13px;height:13px;margin:-6.5px 0 0 -6.5px;border-radius:7px;background:var(--violet-600);will-change:transform}.sn-hit{position:absolute;left:0;width:'+SN_W+'px;height:'+SN_GAP+'px;padding:0;border:0;background:none;cursor:pointer;pointer-events:auto;-webkit-tap-highlight-color:transparent}.sn-lab{position:absolute;right:100%;top:50%;margin-right:2px;transform:translate(6px,-50%) scale(.94);transform-origin:100% 50%;white-space:nowrap;font:700 13px/1 var(--font-display);letter-spacing:var(--ls-display);color:var(--violet-800);background:rgba(255,255,255,.62);backdrop-filter:blur(18px) saturate(180%);-webkit-backdrop-filter:blur(18px) saturate(180%);border:1px solid rgba(255,255,255,.7);box-shadow:0 6px 20px -10px rgba(38,12,70,.5);border-radius:16px;padding:7px 12px;opacity:0;pointer-events:none;transition:opacity .22s var(--ease-out),transform .34s var(--ease-spring)}.sn-hit:hover .sn-lab,.sn-hit:focus-visible .sn-lab{opacity:1;transform:translate(0,-50%) scale(1)}.sn-hit:focus-visible{outline:none}@media (max-width:900px){.sn{display:none}}@media (prefers-reduced-motion:reduce){.sn-blob{transition:none}}';

function SideNav(){
  const goo=React.useRef(null), blob=React.useRef(null), dots=React.useRef([]);
  const [act,setAct]=React.useState(0);
  React.useEffect(()=>{
    const n=SN_SECTIONS.length;
    const yOf=i=>i*SN_GAP+SN_GAP/2;
    let target=yOf(0), y=target, v=0, raf=0, cur=0;
    const still=window.matchMedia&&window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    const spy=()=>{
      const mid=window.scrollY+window.innerHeight*0.38;
      let idx=0;
      SN_SECTIONS.forEach(([id],i)=>{const el=document.getElementById(id);if(el&&el.getBoundingClientRect().top+window.scrollY<=mid)idx=i;});
      if(idx!==cur){cur=idx;target=yOf(idx);setAct(idx);}
    };
    const tick=()=>{
      if(still){y=target;v=0;} else {v=(v+(target-y)*0.155)*0.78;y+=v;}
      const a=Math.min(1,Math.abs(v)/9);
      const sy=1+a*1.5, sx=1-a*0.34;
      if(blob.current)blob.current.style.transform='translate3d(0,'+(y-SN_GAP/2).toFixed(2)+'px,0) scale('+sx.toFixed(3)+','+sy.toFixed(3)+')';
      dots.current.forEach((d,i)=>{
        if(!d)return;
        const k=Math.max(0,1-Math.abs(yOf(i)-y)/(SN_GAP*1.15));
        d.style.transform='scale('+(1+k*0.72).toFixed(3)+')';
        d.style.backgroundColor=mix(k);
      });
      raf=requestAnimationFrame(tick);
    };
    spy();y=target;
    raf=requestAnimationFrame(tick);
    window.addEventListener('scroll',spy,{passive:true});
    window.addEventListener('resize',spy);
    return()=>{cancelAnimationFrame(raf);window.removeEventListener('scroll',spy);window.removeEventListener('resize',spy);};
  },[]);
  const go=id=>{
    const el=document.getElementById(id);if(!el)return;
    const to=el.getBoundingClientRect().top+window.scrollY-(id==='hero'?0:40);
    window.scrollTo({top:Math.max(0,to),behavior:'smooth'});
  };
  return (
    <nav className="sn" aria-label="Розділи сторінки">
      <style>{SN_CSS}</style>
      <svg width="0" height="0" aria-hidden="true" style={{position:'absolute'}}>
        <filter id="sn-goo"><feGaussianBlur in="SourceGraphic" stdDeviation="2.6" result="b"/><feColorMatrix in="b" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 17 -6.5"/></filter>
      </svg>
      <div className="sn-goo" ref={goo} style={{height:SN_SECTIONS.length*SN_GAP}} aria-hidden="true">
        {SN_SECTIONS.map(([id],i)=><span key={id} className="sn-dot" ref={el=>dots.current[i]=el} style={{top:i*SN_GAP+SN_GAP/2,transform:act===i?'scale(1.72)':'none',background:act===i?'#8E26E2':undefined}}/>)}
        <span className="sn-blob" ref={blob} style={{top:SN_GAP/2}}/>
      </div>
      <div style={{position:'absolute',inset:0}}>
        {SN_SECTIONS.map(([id,label],i)=>(
          <button key={id} className="sn-hit" style={{top:i*SN_GAP}} onClick={()=>go(id)} aria-label={label} aria-current={act===i?'true':undefined}>
            <span className="sn-lab">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
Object.assign(window,{SideNav});
