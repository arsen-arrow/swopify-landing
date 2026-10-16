const {Button,HypeButton,Icon,Badge,Logo}=window.SwopifyDesignSystem_ad534d;

/* The exchange `o` set inline in live type: same 792-unit advance as Unbounded's o,
   sitting on the baseline, inheriting font-size and colour. */
function OGlyph(){
  return (
    <span style={{position:'relative',display:'inline-block',width:'.792em',height:0,verticalAlign:'baseline'}}>
      <Logo variant="mark" tone="current" height="0.716em" width="0.772em" style={{display:'block',position:'absolute',left:'0.010em',bottom:'-0.072em'}}/>
    </span>
  );
}

const NAV_CENTER=42, NAV_FS=24;
const REST=[...' до swого по swоє'];
const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
const lerp=(a,b,t)=>a+(b-a)*t;

/* One ticker unit: the word + the brand exchange glyph as separator. */
const TICK_PHRASES=['Гроші — це минуле століття. Твої речі — це нова валюта','Не купуй. Не продавай. Свопай','Баланс на картці 0 ₴? Твоя шафа — це статок','Забудь про цінники. Тут має значення тільки бажання','Ні цін. Ні торгів. Ні комісій. Тільки чистий обмін','Навіщо купувати те, на що ти можеш просто обмінятися?','Ти віддаєш скейт. Хтось віддає AirPods. AI замикає коло','Нобелівська математика ланцюгових обмінів — тепер у твоїй кишені','Просто зроби фото. Решту зробить штучний інтелект','Алгоритм, який знаходить обмін навіть тоді, коли це здається неможливим','Один крок від «лежить без діла» до «вау, це саме те, що я шукав»','Дай нове життя речам, які сумують на поличці','Твій гардероб — це нескінченна гра. Оновлюй його безкоштовно','Міняй вайб, а не гривні','Свопай, поки інші торгуються на базарчиках','Твоя наступна улюблена річ прямо зараз лежить у чиємусь гардеробі','Віддай те, з чого виріс. Забери те, про що мрієш','Твій стаф — твоя валюта','Less money. More value','Свопай легко. Міняй сміливо','Без грошей. Без стресу','Гра у своп починається','Swap the vibe'];
/* Shuffled once per page load, so the ticker reads in a fresh order every visit. */
const TICK_ORDER=(()=>{const a=[...TICK_PHRASES];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;})();
function TickWord({text}){
  return (
    <span style={{display:'flex',alignItems:'center',gap:16,padding:'0 16px',flex:'none',color:'var(--violet-50)',font:`700 15px/1 var(--font-display)`,letterSpacing:'var(--ls-display)'}}>{text}<Icon name="repeat" size={16}/></span>
  );
}
function TickRun(){
  return <span style={{display:'flex',alignItems:'center',flex:'none'}}>{TICK_ORDER.map((t,i)=><TickWord key={i} text={t}/>)}</span>;
}

function Nav(){
  return (
    <header style={{position:'fixed',top:14,left:0,right:0,zIndex:30,display:'flex',justifyContent:'center',pointerEvents:'none'}}>
      <style>{'@keyframes swpTickerRun{from{transform:translate3d(0,0,0)}to{transform:translate3d(-50%,0,0)}}#nav-track{animation:swpTickerRun 200s linear infinite}@media (prefers-reduced-motion:reduce){#nav-track{animation:none}}'}</style>
      <div id="nav-pill" style={{pointerEvents:'all',position:'relative',display:'grid',placeItems:'center',height:56,padding:'0 22px',borderRadius:32,overflow:'hidden',whiteSpace:'nowrap',background:'rgba(255,255,255,0.55)',backdropFilter:'blur(28px) saturate(200%)',WebkitBackdropFilter:'blur(28px) saturate(200%)',border:'1px solid rgba(255,255,255,0.72)',boxShadow:'0 8px 32px rgba(0,0,0,0.13),0 1.5px 6px rgba(0,0,0,0.07),inset 0 1px 0 rgba(255,255,255,0.8)'}}>
        <span id="nav-mark" style={{gridArea:'1/1',font:`700 ${NAV_FS}px/1 var(--font-display)`,letterSpacing:'var(--ls-display)',visibility:'hidden'}}>swopify</span>
        <span id="nav-badge" style={{gridArea:'1/1'}}><Badge tone="brand" icon="sparkles">Без грошей. Взагалі.</Badge></span>
        <div id="nav-ticker" aria-hidden="true" style={{position:'absolute',left:0,right:0,top:0,bottom:0,opacity:0,background:'var(--violet-600)',display:'flex',alignItems:'center',overflow:'hidden',borderRadius:'inherit'}}>
          <div id="nav-track" style={{display:'flex',alignItems:'center',willChange:'transform'}}><TickRun/><TickRun/></div>
        </div>
      </div>
    </header>
  );
}

/* Scroll-timeline CSS is reported as supported in embedded previews where the
   timeline never actually activates, so the choreography is JS-driven always. */
const SCROLL_CSS=false;

function Wordmark(){
  const ph=React.useRef(null), rSw=React.useRef(null), rIj=React.useRef(null), rOp=React.useRef(null), rRest=React.useRef(null);
  const [y,setY]=React.useState(0);
  const [m,setM]=React.useState({anchor:420,vw:typeof window!=='undefined'?window.innerWidth:1280,sw:1.9,ij:1.5,op:3.4,rest:10,pillA:240,pillB:194,vh:800,heroB:900});
  React.useEffect(()=>{
    const measure=()=>{
      const el=ph.current; if(!el) return;
      const r=el.getBoundingClientRect();
      const fs=parseFloat(getComputedStyle(el).fontSize)||68;
      const em=n=>n.current?n.current.getBoundingClientRect().width/fs:0;
      const bw=document.getElementById('nav-badge'), mw=document.getElementById('nav-mark'), pl=document.getElementById('nav-pill');
      const pA=bw?Math.round(bw.getBoundingClientRect().width)+44:240, pB=mw?Math.round(mw.getBoundingClientRect().width)+76:194;
      if(pl){pl.dataset.a=pA;pl.dataset.b=pB;pl.style.width=pA+'px';}
      const hs=document.getElementById('hero');
      setM({anchor:r.top+window.scrollY+r.height/2,vw:window.innerWidth,vh:window.innerHeight,sw:em(rSw),ij:em(rIj),op:em(rOp),rest:em(rRest),
        pillA:pA,pillB:pB,heroB:hs?Math.round(hs.getBoundingClientRect().bottom+window.scrollY):900});
    };
    measure();
    window.addEventListener('resize',measure);
    if(document.fonts&&document.fonts.ready) document.fonts.ready.then(measure);
    let raf=0,last=-1;
    const read=()=>{const v=window.scrollY||document.documentElement.scrollTop||0;if(v!==last){last=v;setY(v);}};
    /* Nav choreography, always JS-driven so phase 1 (pill shrinks around the wordmark)
       and phase 2 (pill spans the page as a ticker ribbon) share one width value. */
    const paintNav=()=>{
      const p=document.getElementById('nav-pill'),b=document.getElementById('nav-badge'),tk=document.getElementById('nav-ticker'),wm=document.getElementById('wm'),hero=document.getElementById('hero');
      if(!p||!b)return;
      const sy=window.scrollY, vh=window.innerHeight;
      const pr=ph.current?ph.current.getBoundingClientRect():null;
      const tr=Math.max(120,(pr?pr.top+sy+pr.height/2:420)-NAV_CENTER);
      const q=clamp((sy/tr-0.1)/0.75,0,1);
      const w1=lerp(parseFloat(p.dataset.a||240),parseFloat(p.dataset.b||194),q);
      b.style.opacity=String(1-clamp(sy/(tr*0.4),0,1));
      let t2=0;
      if(hero){
        const hb=hero.getBoundingClientRect().bottom+sy;
        const start=Math.max(tr+280,hb-vh*0.55);
        t2=clamp((sy-start)/340,0,1);
      }
      const e2=t2*t2*(3-2*t2);
      p.style.width=lerp(w1,Math.max(w1,window.innerWidth-28),e2)+'px';
      p.style.borderRadius=lerp(32,24,e2)+'px';
      p.style.borderColor='rgba(255,255,255,'+lerp(0.72,0.28,e2).toFixed(3)+')';
      if(tk)tk.style.opacity=e2.toFixed(3);
      if(wm){wm.style.opacity=String(1-clamp(t2/0.55,0,1));wm.style.filter=t2?'blur('+(t2*13).toFixed(2)+'px)':'none';}
    };
    if(!SCROLL_CSS){
      const tick=()=>{read();paintNav();raf=requestAnimationFrame(tick);};
      raf=requestAnimationFrame(tick);
      const onScroll=()=>{read();paintNav();};
      window.addEventListener('scroll',onScroll,{passive:true});
      return()=>{cancelAnimationFrame(raf);window.removeEventListener('scroll',onScroll);window.removeEventListener('resize',measure);};
    }
    return()=>{if(raf)cancelAnimationFrame(raf);window.removeEventListener('scroll',read);window.removeEventListener('resize',measure);};
  },[]);
  const heroFs=Math.max(30,Math.min(96,(m.vw-56)/(m.sw+m.ij+m.rest)));
  const travel=Math.max(120,m.anchor-NAV_CENTER);

  React.useEffect(()=>{
    if(!SCROLL_CSS) return;
    let el=document.getElementById('wm-anim');
    if(!el){el=document.createElement('style');el.id='wm-anim';document.head.appendChild(el);}
    const tl='animation-timeline:scroll(root block)';
    /* Phase 2: after the hero leaves, the pill grows to the page edges and the ticker takes over. */
    const s2=Math.round(Math.max(travel+280,(m.heroB||900)-(m.vh||800)*0.55));
    const R=s2+340, full=Math.max(m.pillB,m.vw-28), pc=v=>(v/R*100).toFixed(3)+'%';
    el.textContent=[
      '@keyframes wmShift{from{top:'+m.anchor+'px;font-size:'+heroFs+'px}to{top:'+NAV_CENTER+'px;font-size:'+NAV_FS+'px}}',
      '@keyframes wmRest{from{max-width:'+m.rest+'em}to{max-width:0em}}',
      '@keyframes wmChar{0%{opacity:1;filter:blur(0);transform:translate3d(0,0,0) scale(1)}55%{opacity:.42;filter:blur(5px);transform:translate3d(-.04em,-.16em,0) scale(1.06)}100%{opacity:0;filter:blur(16px);transform:translate3d(-.14em,-.46em,0) scale(1.22)}}',
      '@keyframes wmSlot{from{width:'+m.ij+'em}to{width:'+m.op+'em}}',
      '@keyframes wmOut{to{opacity:0}}',
      '@keyframes wmIn{from{opacity:0}to{opacity:1}}',
      '@keyframes wmBlurOut{to{opacity:0;filter:blur(14px);transform:translate3d(0,-.28em,0) scale(1.18)}}',
      '@keyframes wmBlurIn{from{opacity:0;filter:blur(14px);transform:translate3d(0,.24em,0) scale(.9)}to{opacity:1;filter:blur(0);transform:none}}',
      '@keyframes wmDissolve{to{opacity:0;filter:blur(13px)}}',
      '@keyframes navPill{0%{width:'+m.pillA+'px;border-radius:32px;border-color:rgba(255,255,255,.72)}'+pc(travel*0.1)+'{width:'+m.pillA+'px}'+pc(travel*0.85)+'{width:'+m.pillB+'px}'+pc(s2)+'{width:'+m.pillB+'px;border-radius:32px;border-color:rgba(255,255,255,.72)}100%{width:'+full+'px;border-radius:24px;border-color:rgba(255,255,255,.28)}}',
      '#nav-pill{width:'+m.pillA+'px;animation:navPill linear both;'+tl+';animation-range:0px '+R+'px}',
      '#nav-badge{animation:wmOut linear both;'+tl+';animation-range:0px '+(travel*0.4)+'px}',
      '#nav-ticker{animation:wmIn linear both;'+tl+';animation-range:'+s2+'px '+(s2+300)+'px}',
      '#wm{animation:wmShift linear both,wmDissolve cubic-bezier(.4,0,.7,.4) both;animation-timeline:scroll(root block),scroll(root block);animation-range:0px '+travel+'px,'+s2+'px '+(s2+200)+'px}',
      '#wm-rest{animation:wmRest linear both;'+tl+';animation-range:'+(travel*0.30)+'px '+(travel*0.62)+'px}',
      REST.map((c,i)=>{const k=(REST.length-1-i)/Math.max(1,REST.length-1);return '#wm-c'+i+'{animation:wmChar cubic-bezier(.4,0,.75,.3) both;'+tl+';animation-range:'+(travel*(0.02+0.26*k))+'px '+(travel*(0.02+0.26*k+0.2))+'px}';}).join('\n'),
      '#wm-slot{animation:wmSlot linear both;'+tl+';animation-range:'+(travel*0.16)+'px '+(travel*0.7)+'px}',
      '#wm-ij{animation:wmBlurOut cubic-bezier(.4,0,.7,.4) both;'+tl+';animation-range:'+(travel*0.14)+'px '+(travel*0.5)+'px}',
      '#wm-op{animation:wmBlurIn cubic-bezier(.2,.7,.3,1) both;'+tl+';animation-range:'+(travel*0.36)+'px '+(travel*0.8)+'px}',
      ''
    ].join('\n');
  },[m.anchor,heroFs,travel,m.rest,m.ij,m.op,m.pillA,m.pillB,m.heroB,m.vw,m.vh]);

  const t=clamp(y/travel,0,1);
  const js=!SCROLL_CSS;
  const e=t*t*(3-2*t);
  const mo=js?clamp((t-0.16)/0.54,0,1):0;
  const co=js?t:0;
  const part={display:'inline-block',verticalAlign:'top'};
  return (
    <React.Fragment>
      <div ref={ph} aria-hidden="true" style={{visibility:'hidden',whiteSpace:'nowrap',font:`700 ${heroFs}px/1.05 var(--font-display)`,letterSpacing:'var(--ls-display)'}}>
        <span ref={rSw} style={part}>sw</span><span ref={rIj} style={part}>ій</span><span ref={rOp} style={part}>opify</span><span ref={rRest} style={part}>&nbsp;до swого по swоє</span>
      </div>
      <h1 id="wm" style={{position:'fixed',left:'50%',top:js?Math.max(NAV_CENTER,m.anchor-y):m.anchor,transform:'translate(-50%,-50%)',zIndex:40,whiteSpace:'nowrap',font:`700 ${js?lerp(heroFs,NAV_FS,e):heroFs}px/1.05 var(--font-display)`,letterSpacing:'var(--ls-display)',pointerEvents:'none',margin:0}}>
        <span style={{...part,color:'var(--violet-600)'}}>sw</span>
        <span id="wm-slot" style={{...part,position:'relative',width:`${lerp(m.ij,m.op,mo)}em`,height:'1.05em',color:'var(--violet-600)'}}>
          <span id="wm-ij" style={{position:'absolute',left:0,top:0,opacity:1-mo,filter:mo?`blur(${mo*14}px)`:'none',transform:mo?`translate3d(0,${-0.28*mo}em,0) scale(${1+0.18*mo})`:'none'}}>ій</span>
          <span id="wm-op" style={{position:'absolute',left:0,top:0,opacity:mo,filter:mo<1?`blur(${(1-mo)*14}px)`:'none',transform:mo<1?`translate3d(0,${0.24*(1-mo)}em,0) scale(${0.9+0.1*mo})`:'none'}}><OGlyph/>pify</span>
        </span>
        <span id="wm-rest" style={{...part,overflow:'hidden',maxWidth:`${js?m.rest*(1-clamp((co-0.3)/0.32,0,1)):m.rest}em`,color:'var(--text-strong)',whiteSpace:'pre'}}>
          {REST.map((ch,i)=>{
            const st=0.02+0.26*((REST.length-1-i)/Math.max(1,REST.length-1)), p=js?clamp((co-st)/0.2,0,1):0;
            return <span key={i} id={`wm-c${i}`} style={{display:'inline-block',whiteSpace:'pre',opacity:1-p,filter:p?`blur(${p*16}px)`:'none',transform:p?`translate3d(${-0.14*p}em,${-0.46*p}em,0) scale(${1+0.22*p})`:'none'}}>{ch}</span>;
          })}
        </span>
      </h1>
    </React.Fragment>
  );
}

const WALL_CSS='.wl-row{display:flex;gap:12px;overflow-x:auto;scrollbar-width:none;-ms-overflow-style:none;cursor:grab;touch-action:pan-x;padding:2px 0}.wl-row::-webkit-scrollbar{display:none}.wl-row.wl-drag{cursor:grabbing}.wl-tile{flex:0 0 auto;position:relative;border-radius:14px;overflow:hidden;background:var(--violet-200);box-shadow:0 8px 20px -16px rgba(38,35,87,.8);transition:transform .35s var(--ease-spring)}.wl-row:not(.wl-drag) .wl-tile:hover{transform:translateY(-6px) scale(1.04)}.wl-tile img{width:100%;height:100%;object-fit:cover;display:block;opacity:0;filter:blur(16px);transform:scale(1.08);transition:opacity .8s var(--ease-out),filter 1.1s var(--ease-out),transform 1.1s var(--ease-out)}.wl-tile img.wl-on{opacity:1;filter:blur(0);transform:none}@keyframes wlNudge{0%,100%{transform:translateX(0)}35%{transform:translateX(-5px)}65%{transform:translateX(5px)}}.wl-hint{display:flex;align-items:center;justify-content:center;gap:12px;color:var(--violet-500);opacity:.9}.wl-hint svg{animation:wlNudge 3.4s var(--ease-standard) infinite}.wl-hint b{font:600 23px/1 Caveat,cursive;color:var(--violet-600);font-weight:600}.wl-tile img{transition:opacity .8s var(--ease-out),filter 1.1s var(--ease-out),transform 1.1s var(--ease-out)}.wl-row:not(.wl-drag) .wl-tile:hover img.wl-on{filter:blur(3px) saturate(.9);transform:scale(1.07)}.wl-cap{position:absolute;inset:0;display:flex;align-items:flex-end;padding:10px;border-radius:14px;opacity:0;background:linear-gradient(180deg,rgba(38,35,87,.05) 0%,rgba(56,20,102,.42) 44%,rgba(56,20,102,.82) 100%);transition:opacity .32s var(--ease-standard);pointer-events:none}.wl-row:not(.wl-drag) .wl-tile:hover .wl-cap{opacity:1}.wl-cap b{font:700 15px/1.2 var(--font-display);letter-spacing:.005em;color:#fff;text-wrap:pretty;transform:translateY(9px);opacity:0;transition:transform .38s var(--ease-spring) .04s,opacity .3s var(--ease-out) .04s}.wl-row:not(.wl-drag) .wl-tile:hover .wl-cap b{transform:none;opacity:1}@media (prefers-reduced-motion:reduce){.wl-hint svg{animation:none}.wl-cap,.wl-cap b{transition:none}}';
const WALL_SEEDS=[['af1','Кросівки Air Force'],['cam2','Плівкова мильниця'],['carh','Робоча куртка Carhartt'],['vin','Вініл, збірка'],['skate','Скейт, комплект'],['guit','Акустична гітара'],['tnf','Пуховик The North Face'],['pol','Polaroid 600'],['vans','Кеди Vans, 42'],['lamp','Лампа-грибок'],['chair','Крісло з барахолки'],['bike2','Шосейний велосипед'],['tent','Намет на двох'],['boots','Черевики Dr. Martens'],['ski','Лижі з палицями'],['vase','Ваза, кераміка'],['mug','Чашки, набір'],['deck','Дека без підвісок'],['coat','Пальто вовняне'],['film','Плівка, 5 котушок'],['synth','Синтезатор Volca'],['rug','Килим ручний'],['plant','Монстера у горщику'],['watch','Годинник Casio'],['bag','Сумка через плече'],['hat','Кепка вельветова'],['desk','Стіл письмовий'],['radio','Радіо 70-х'],['kettle','Чайник зі свистком'],['shelf','Полиця дубова'],['jeans','Джинси Levi\'s 501'],['helmet','Шолом велосипедний'],['globe','Глобус радянський'],['cassette','Касети, коробка'],['mirror','Дзеркало в рамі'],['sled','Санки дерев\'яні']];

function WallTile({seed,name,size}){
  return (
    <span className="wl-tile" style={{width:size,height:size}}>
      <img src={'https://picsum.photos/seed/'+seed+'/280/280'} alt={name} loading="lazy" decoding="async"
        onLoad={e=>e.currentTarget.classList.add('wl-on')}/>
      <span className="wl-cap" aria-hidden="true"><b>{name}</b></span>
    </span>
  );
}

/* two rows of things, drifting slowly in opposite directions; grab or swipe to
   push them along */
function WallRow({seeds,size,dir}){
  const el=React.useRef(null),hold=React.useRef(false);
  React.useEffect(()=>{
    const n=el.current;if(!n)return;
    const still=window.matchMedia&&window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    if(dir<0)n.scrollLeft=n.scrollWidth/2;
    let raf=0,last=performance.now();
    const tick=t=>{
      const dt=Math.min(50,t-last);last=t;
      if(!hold.current)n.scrollLeft+=dir*0.022*dt;
      const half=n.scrollWidth/2;
      if(n.scrollLeft>=half)n.scrollLeft-=half; else if(n.scrollLeft<=0)n.scrollLeft+=half;
      raf=requestAnimationFrame(tick);
    };
    if(!still)raf=requestAnimationFrame(tick);
    let x0=0,s0=0,down=false;
    const dn=e=>{down=true;hold.current=true;x0=e.clientX;s0=n.scrollLeft;n.classList.add('wl-drag');n.setPointerCapture(e.pointerId);};
    const mv=e=>{if(down)n.scrollLeft=s0-(e.clientX-x0);};
    const up=()=>{down=false;hold.current=false;n.classList.remove('wl-drag');};
    n.addEventListener('pointerdown',dn);n.addEventListener('pointermove',mv);
    n.addEventListener('pointerup',up);n.addEventListener('pointercancel',up);
    const en=()=>hold.current=true,lv=()=>{if(!down)hold.current=false;};
    n.addEventListener('pointerenter',en);n.addEventListener('pointerleave',lv);
    return()=>{cancelAnimationFrame(raf);n.removeEventListener('pointerdown',dn);n.removeEventListener('pointermove',mv);n.removeEventListener('pointerup',up);n.removeEventListener('pointercancel',up);n.removeEventListener('pointerenter',en);n.removeEventListener('pointerleave',lv);};
  },[dir]);
  return <div className="wl-row" ref={el}>{[...seeds,...seeds].map((s,i)=><WallTile key={i} seed={s[0]} name={s[1]} size={size}/>)}</div>;
}

function Cats(){
  const half=Math.ceil(WALL_SEEDS.length/2);
  return (
    <section id="cats" style={{background:'linear-gradient(180deg,var(--violet-100) 0%,#F7EDFE 62%,#FBF4FE 100%)',overflow:'hidden'}}>
      <style>{WALL_CSS}</style>
      <div style={{maxWidth:'var(--page-max)',margin:'0 auto',padding:'var(--sp-9) 0 var(--sp-10)',display:'flex',flexDirection:'column',gap:'var(--sp-4)'}}>
        <h2 style={{font:'var(--type-display-sm)',fontFamily:'var(--font-display)',letterSpacing:'var(--ls-display)',color:'var(--violet-950)',padding:'0 var(--gutter-web)',transform:'skewX(-8deg)',transformOrigin:'0 100%'}}>Що вже міняють</h2>
        <div style={{display:'flex',flexDirection:'column',gap:12,WebkitMaskImage:'linear-gradient(90deg,transparent 0,#000 60px,#000 calc(100% - 60px),transparent 100%)',maskImage:'linear-gradient(90deg,transparent 0,#000 60px,#000 calc(100% - 60px),transparent 100%)'}}>
          <WallRow seeds={WALL_SEEDS.slice(0,half)} size={132} dir={1}/>
          <WallRow seeds={WALL_SEEDS.slice(half)} size={132} dir={-1}/>
        </div>
        <div className="wl-hint" aria-hidden="true">
          <svg width="132" height="14" viewBox="0 0 132 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 2 2 7l5 5"/><path d="M125 2l5 5-5 5"/><path d="M2 7h128" opacity=".35"/>
          </svg>
          <b>гортай</b>
        </div>
      </div>
    </section>
  );
}

function useCountUp(target,dur=2200){
  const ref=React.useRef(null);
  const [v,setV]=React.useState(0);
  React.useEffect(()=>{
    const el=ref.current; if(!el) return;
    let raf=0,started=false;
    const run=()=>{
      const t0=performance.now();
      const step=n=>{
        const p=Math.min(1,(n-t0)/dur);
        const e=1-Math.pow(1-p,4);
        setV(Math.round(target*e));
        if(p<1) raf=requestAnimationFrame(step);
      };
      raf=requestAnimationFrame(step);
    };
    const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting&&!started){started=true;run();io.disconnect();}})},{rootMargin:'-12% 0px -18% 0px'});
    io.observe(el);
    return()=>{io.disconnect();cancelAnimationFrame(raf);};
  },[target,dur]);
  return [ref,v];
}

function Odometer({value,fs}){
  const str=value.toLocaleString('uk-UA').replace(/\u00a0/g,' ');
  return (
    <span style={{display:'inline-flex',font:`700 ${fs}px/1 var(--font-display)`,letterSpacing:'-0.03em',color:'var(--violet-950)',fontVariantNumeric:'tabular-nums'}}>
      {[...str].map((c,i)=>(
        <span key={i} style={{display:'inline-block',minWidth:c===' '?'0.28em':'0.62em',textAlign:'center'}}>{c}</span>
      ))}
    </span>
  );
}

function Counter(){
  const [ref,n]=useCountUp(148920);
  const stats=[['Ланцюгових обмінів','21 480'],['Міст в Україні','142'],['Середній матч за','1.8 дня']];
  return (
    <section ref={ref} style={{background:'var(--surface-card)',borderTop:'1px solid var(--border-subtle)',overflow:'hidden'}}>
      <div style={{maxWidth:'var(--page-max)',margin:'0 auto',padding:'var(--sp-11) var(--gutter-web)',display:'flex',flexDirection:'column',alignItems:'center',gap:'var(--sp-6)',textAlign:'center'}}>
        <span style={{font:'var(--type-overline)',letterSpacing:'var(--ls-caps)',textTransform:'uppercase',color:'var(--text-brand)'}}>Уже обмінялись</span>
        <div style={{position:'relative',display:'flex',justifyContent:'center',width:'100%'}}>
          <div style={{position:'absolute',inset:'-60% -12%',background:'radial-gradient(ellipse at 50% 50%,var(--violet-100),transparent 65%)',pointerEvents:'none'}}/>
          <div style={{position:'relative',display:'flex',alignItems:'baseline',gap:'var(--sp-3)',flexWrap:'wrap',justifyContent:'center'}}>
            <Odometer value={n} fs={168}/>
            <span style={{font:'700 44px/1 var(--font-display)',letterSpacing:'var(--ls-display)',color:'var(--violet-600)'}}>речей</span>
          </div>
        </div>
        <p style={{font:'var(--fw-regular) var(--fs-20)/1.5 var(--font-text)',color:'var(--text-body)',maxWidth:520}}>
          Стільки речей знайшли нових власників без жодної гривні. Кожна з них комусь була не потрібна — і комусь була дуже потрібна.
        </p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'var(--sp-6)',marginTop:'var(--sp-3)',width:'100%',maxWidth:720}}>
          {stats.map(([l,v])=>(
            <div key={l} style={{display:'flex',flexDirection:'column',gap:'var(--sp-1)'}}>
              <span style={{font:'700 36px/1 var(--font-display)',letterSpacing:'var(--ls-display)',color:'var(--violet-700)'}}>{v}</span>
              <span style={{font:'var(--type-body-md)',color:'var(--text-muted)'}}>{l}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Cta(){
  return (
    <section id="cta" style={{background:'linear-gradient(180deg,var(--surface-card) 0%,#FDF9FE 18%,#FAF2FE 40%,#F6E9FE 68%,var(--violet-100) 100%)',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',inset:'-40% -10% auto',height:'160%',background:'radial-gradient(ellipse at 50% 0%,var(--violet-200),transparent 62%)',opacity:.18}}/>
      <div style={{position:'relative',maxWidth:'var(--page-max-narrow)',margin:'0 auto',padding:'var(--sp-12) var(--gutter-web) var(--sp-11)',display:'flex',flexDirection:'column',alignItems:'center',gap:'var(--sp-5)',textAlign:'center'}}>
        <h2 style={{font:'var(--type-display-md)',fontFamily:'var(--font-display)',letterSpacing:'var(--ls-display)',color:'var(--violet-950)'}}>У тебе вже є чим обмінятись</h2>
        <p style={{font:'var(--fw-regular) var(--fs-18)/1.5 var(--font-text)',color:'var(--violet-800)',maxWidth:480}}>Дві хвилини на першу річ. Далі алгоритм зробить свою справу.</p>
        <div style={{marginTop:'var(--sp-3)',marginBottom:'var(--sp-2)',display:'grid',gridTemplateColumns:'1fr auto 1fr',alignItems:'center',gap:'var(--sp-2)',width:'100%'}}>
          <span style={{minWidth:0,display:'flex',alignItems:'flex-end',justifyContent:'flex-end',gap:6}}>
            <Note rotate={-5} size={26} style={{marginBottom:26}}>swop-swop і готово!</Note>
            <Arrow kind="swoopRight" width={96} rotate={6} delay={.15}/>
          </span>
          <HypeButton label="Викласти річ" labelDone="Готово" width={262}/>
          <span style={{minWidth:0,display:'flex',alignItems:'flex-end',justifyContent:'flex-start',gap:6}}>
            <Arrow kind="curlLeft" width={96} rotate={-6} delay={.3}/>
            <Note rotate={4} size={26} style={{marginBottom:26}}>три кліки — і все</Note>
          </span>
        </div>
        <div style={{display:'flex',gap:'var(--sp-3)',flexWrap:'wrap',justifyContent:'center'}}>
          <Button variant="ghost" size="sm" iconLeft="apple" style={{color:'var(--violet-800)'}}>App Store</Button>
          <Button variant="ghost" size="sm" iconLeft="play" style={{color:'var(--violet-800)'}}>Google Play</Button>
        </div>
      </div>
    </section>
  );
}

function Footer(){
  const cols=[['Продукт',['Як це працює','Ланцюги','Довіра','Нова Пошта']],['Компанія',['Про нас','Блог','Вакансії','Пресa']],['Правила',['Умови','Приватність','Безпека обміну']]];
  return (
    <footer style={{background:'var(--ink-950)',color:'var(--ink-300)'}}>
      <div style={{maxWidth:'var(--page-max)',margin:'0 auto',padding:'var(--sp-9) var(--gutter-web) var(--sp-6)',display:'grid',gridTemplateColumns:'1.4fr repeat(3,1fr)',gap:'var(--sp-7)'}}>
        <div style={{display:'flex',flexDirection:'column',gap:'var(--sp-3)'}}>
          <Logo height={24} tone="inverse"/>
          <p style={{font:'var(--type-body-md)',color:'var(--ink-400)',maxWidth:280}}>Платформа обміну речами без грошей. Україна та ЄС.</p>
        </div>
        {cols.map(([t,ls])=>(
          <div key={t} style={{display:'flex',flexDirection:'column',gap:'var(--sp-2)'}}>
            <span style={{font:'var(--type-overline)',letterSpacing:'var(--ls-caps)',textTransform:'uppercase',color:'var(--ink-500)'}}>{t}</span>
            {ls.map(l=><a key={l} href="#" onClick={e=>e.preventDefault()} style={{font:'var(--type-body-md)',color:'var(--ink-300)',textDecoration:'none',fontWeight:400}}>{l}</a>)}
          </div>
        ))}
      </div>
      <div style={{maxWidth:'var(--page-max)',margin:'0 auto',padding:'var(--sp-4) var(--gutter-web)',borderTop:'1px solid rgba(255,255,255,.08)',display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:'var(--sp-3)'}}>
        <span style={{font:'var(--type-caption)',color:'var(--ink-500)'}}>© 2026 Swopify</span>
        <span style={{font:'var(--type-caption)',color:'var(--ink-500)'}}>Зображення на цій сторінці — плейсхолдери</span>
      </div>
    </footer>
  );
}

Object.assign(window,{Nav,Wordmark,Cats,Counter,Cta,Footer});
