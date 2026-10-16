const {Icon}=window.SwopifyDesignSystem_ad534d;

const HERO_CSS=`
@keyframes swpDrift{0%{transform:translate3d(0,0,0)}50%{transform:translate3d(var(--dx),var(--dy),0)}100%{transform:translate3d(0,0,0)}}
@keyframes swpSpin{to{transform:rotate(360deg)}}
@keyframes swpSpinTilt{from{transform:rotateX(62deg) rotate(0)}to{transform:rotateX(62deg) rotate(360deg)}}
@keyframes swpTumble{0%{transform:rotateX(0) rotateY(0) rotateZ(0)}100%{transform:rotateX(360deg) rotateY(360deg) rotateZ(180deg)}}
@keyframes swpObjIn{0%{opacity:0;filter:blur(18px);transform:translate3d(0,26%,0) scale(1.42) rotate(9deg)}62%{opacity:1;filter:blur(0)}100%{opacity:1;filter:blur(0);transform:none}}
@keyframes swpObjOut{0%{opacity:1;filter:blur(0);transform:none}100%{opacity:0;filter:blur(16px);transform:translate3d(0,-22%,0) scale(.6) rotate(-11deg)}}
@keyframes swpGlowPulse{0%{opacity:0;transform:scale(.5)}35%{opacity:.85}100%{opacity:0;transform:scale(1.5)}}
@keyframes swpSheen{0%{transform:translate3d(-120%,0,0)}100%{transform:translate3d(220%,0,0)}}
@keyframes swpBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
@keyframes swpWave{0%,100%{transform:rotate(0)}50%{transform:rotate(-26deg)}}
@keyframes swpDot{0%{offset-distance:0%;opacity:0}12%{opacity:1}88%{opacity:1}100%{offset-distance:100%;opacity:0}}
@keyframes swpMergeIn{0%{opacity:0;transform:scale(.42) rotate(-8deg);filter:blur(14px)}55%{opacity:1;transform:scale(1.12) rotate(2deg);filter:blur(0)}78%{transform:scale(.97) rotate(-1deg)}100%{opacity:1;transform:scale(1) rotate(0);filter:blur(0)}}
@keyframes swpFlash{0%{opacity:0;transform:scale(.3)}18%{opacity:.9}100%{opacity:0;transform:scale(2.1)}}
@keyframes swpSplash{0%{opacity:0;transform:translate3d(0,0,0) scale(.2)}14%{opacity:1}70%{opacity:1}100%{opacity:0;transform:translate3d(var(--sx),var(--sy),0) scale(var(--ss))}}
@keyframes swpFace{0%{opacity:0;transform:translate3d(0,0,0) scale(.4) rotate(0)}22%{opacity:1;transform:translate3d(calc(var(--sx)*.4),calc(var(--sy)*.4),0) scale(1.1) rotate(var(--sr))}100%{opacity:0;transform:translate3d(var(--sx),var(--sy),0) scale(.9) rotate(var(--sr))}}
@keyframes swpDraw{to{stroke-dashoffset:0}}
@keyframes swpScrollArrow{0%{opacity:0;transform:translateY(-30px) scale(.82)}22%{opacity:1}62%{opacity:1}100%{opacity:0;transform:translateY(46px) scale(1.06)}}
@keyframes swpShimmer{0%{background-position:120% 0}100%{background-position:-120% 0}}
.swp-scrollhint{display:flex;flex-direction:column;align-items:center;gap:0;color:var(--violet-600)}
.swp-scrollhint svg{animation:swpScrollArrow 2.2s cubic-bezier(.4,0,.25,1) infinite;filter:drop-shadow(0 6px 12px rgba(116,24,190,.28))}
.swp-scrollhint svg:nth-child(2){animation-delay:.26s}
.swp-scrollhint svg:nth-child(3){animation-delay:.52s}
.swp-shimmer{background:linear-gradient(100deg,var(--violet-700) 20%,#E9C6FF 42%,#fff 50%,#E9C6FF 58%,var(--violet-700) 80%);background-size:260% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:swpShimmer 3.4s linear infinite}
@media(max-width:900px){.swp-scrollhint{display:none}}
.swp-hero-grid{display:flex;justify-content:center}
.swp-hero-stage{width:560px;max-width:100%;transform:scale(1.14);transform-origin:center center;margin:30px 0}
@media(max-width:1120px){.swp-hero-stage{transform:scale(1)}}
@keyframes swpRingPing{0%{opacity:.55;transform:scale(1)}100%{opacity:0;transform:scale(1.85)}}
.swp-swapbtn{transition:transform .28s cubic-bezier(.2,.8,.3,1),box-shadow .28s ease}
.swp-swapbtn:hover{transform:translate(-50%,-50%) scale(1.09)}
.swp-swapbtn:active{transform:translate(-50%,-50%) scale(.94)}
@media (prefers-reduced-motion:reduce){.swp-bg *,.swp-obj,.swp-stick *{animation:none!important}}
`;

/* ---------- floating translucent 3D-ish objects ---------- */
const R=(a,b)=>a+Math.random()*(b-a);
const VIO=['#C071F0','#A63FE9','#8E26E2','#7418BE','#5B1795'];

function Shape({s}){
  const spin={animation:`swpSpin ${s.spin}s linear infinite${s.rev?' reverse':''}`};
  let inner=null;
  if(s.kind==='sphere'){
    inner=<div style={{width:'100%',height:'100%',borderRadius:'50%',background:`radial-gradient(circle at 30% 26%,rgba(255,255,255,.96),${s.c1} 30%,${s.c2} 66%,${s.c3} 100%)`,boxShadow:`inset -6px -10px 18px ${s.c3}66, inset 8px 10px 22px rgba(255,255,255,.35)`,...spin}}/>;
  } else if(s.kind==='ring'){
    inner=<div style={{width:'100%',height:'100%',borderRadius:'50%',background:`conic-gradient(from 200deg,${s.c2},rgba(255,255,255,.95) 22%,${s.c1} 42%,${s.c3} 68%,${s.c2} 100%)`,WebkitMaskImage:'radial-gradient(circle,#0000 49%,#000 51%)',maskImage:'radial-gradient(circle,#0000 49%,#000 51%)',animation:`swpSpinTilt ${s.spin}s linear infinite${s.rev?' reverse':''}`}}/>;
  } else if(s.kind==='pill'){
    inner=<div style={{width:'100%',height:'42%',marginTop:'29%',borderRadius:999,background:`linear-gradient(128deg,rgba(255,255,255,.9),${s.c1} 26%,${s.c2} 58%,${s.c3} 100%)`,boxShadow:`inset 0 -6px 14px ${s.c3}55,inset 0 6px 12px rgba(255,255,255,.45)`,...spin}}/>;
  } else if(s.kind==='cube'){
    const h=s.size/2;
    const faces=[['translateZ('+h+'px)',s.c1],['rotateY(180deg) translateZ('+h+'px)',s.c2],['rotateY(90deg) translateZ('+h+'px)',s.c2],['rotateY(-90deg) translateZ('+h+'px)',s.c3],['rotateX(90deg) translateZ('+h+'px)',s.c1],['rotateX(-90deg) translateZ('+h+'px)',s.c3]];
    inner=<div style={{width:'100%',height:'100%',transformStyle:'preserve-3d',animation:`swpTumble ${s.spin*1.6}s linear infinite${s.rev?' reverse':''}`}}>
      {faces.map(([tf,c],i)=><div key={i} style={{position:'absolute',inset:0,transform:tf,borderRadius:Math.round(s.size*0.14),border:'1px solid rgba(255,255,255,.5)',background:`linear-gradient(140deg,rgba(255,255,255,.55),${c} 55%,${s.c3} 100%)`,opacity:.55}}/>)}
    </div>;
  } else {
    inner=<div style={{width:'100%',height:'100%',borderRadius:'62% 38% 48% 52% / 52% 46% 54% 48%',background:`radial-gradient(circle at 34% 28%,rgba(255,255,255,.92),${s.c1} 32%,${s.c2} 70%,${s.c3} 100%)`,boxShadow:`inset -8px -12px 20px ${s.c3}55`,...spin}}/>;
  }
  return (
    <div style={{position:'absolute',left:s.x+'%',top:s.y+'%',width:s.size,height:s.size,opacity:s.op,filter:s.blur?`blur(${s.blur}px)`:'none',perspective:600,animation:`swpDrift ${s.dur}s ease-in-out ${s.delay}s infinite`,['--dx']:s.dx+'px',['--dy']:s.dy+'px',willChange:'transform'}}>{inner}</div>
  );
}

function BgObjects({count=17}){
  const layers=React.useMemo(()=>{
    const kinds=['sphere','ring','pill','cube','drop','sphere','ring','cube'];
    const all=Array.from({length:count},(_,i)=>{
      const d=R(.22,1), ci=Math.floor(R(0,3));
      return {id:i,d,kind:kinds[Math.floor(R(0,kinds.length))],size:Math.round(R(42,104)*(.5+d*.7)),
        x:R(-6,96),y:R(-8,94),dx:R(-90,90),dy:R(-110,110),dur:R(17,36),delay:-R(0,22),spin:R(24,72),rev:Math.random()<.5,
        op:.09+d*.17,blur:+((1-d)*5.5).toFixed(1),c1:VIO[ci],c2:VIO[ci+1],c3:VIO[ci+2]};
    });
    return [all.filter(s=>s.d<=.5),all.filter(s=>s.d>.5&&s.d<=.78),all.filter(s=>s.d>.78)];
  },[count]);
  const refs=[React.useRef(null),React.useRef(null),React.useRef(null)];
  React.useEffect(()=>{
    const host=refs[0].current&&refs[0].current.parentNode;
    if(!host)return;
    let raf=0,tx=0,ty=0,cx=0,cy=0;
    const move=e=>{const r=host.getBoundingClientRect();tx=(e.clientX-r.left)/r.width-.5;ty=(e.clientY-r.top)/r.height-.5;};
    const tick=()=>{cx+=(tx-cx)*.06;cy+=(ty-cy)*.06;
      const f=[10,24,46];
      refs.forEach((r,i)=>{if(r.current)r.current.style.transform=`translate3d(${(-cx*f[i]).toFixed(2)}px,${(-cy*f[i]).toFixed(2)}px,0)`;});
      raf=requestAnimationFrame(tick);};
    raf=requestAnimationFrame(tick);
    window.addEventListener('pointermove',move,{passive:true});
    return()=>{cancelAnimationFrame(raf);window.removeEventListener('pointermove',move);};
  },[]);
  return (
    <div className="swp-bg" aria-hidden="true" style={{position:'absolute',inset:'-8%',pointerEvents:'none',zIndex:0,overflow:'hidden'}}>
      {layers.map((ls,i)=><div key={i} ref={refs[i]} style={{position:'absolute',inset:0,willChange:'transform'}}>{ls.map(s=><Shape key={s.id} s={s}/>)}</div>)}
    </div>
  );
}

/* ---------- stick people ---------- */
function Stickman({wave,delay}){
  return (
    <svg className="swp-stick" width="24" height="38" viewBox="0 0 26 40" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" style={{animation:`swpBob 2.6s ease-in-out ${delay}s infinite`,overflow:'visible'}}>
      <circle cx="13" cy="6.5" r="5"/>
      <path d="M13 12V25"/>
      {wave
        ? <g style={{transformOrigin:'13px 16px',animation:`swpWave 1.5s ease-in-out ${delay}s infinite`}}><path d="M13 16l-7 5"/><path d="M13 16l7-7"/></g>
        : <g><path d="M13 16l-7 5"/><path d="M13 16l7 5"/></g>}
      <path d="M13 25l-6 12"/><path d="M13 25l6 12"/>
    </svg>
  );
}
function StickRow(){
  return (
    <div style={{display:'flex',alignItems:'center',gap:'var(--sp-3)',color:'var(--violet-600)'}}>
      <div style={{display:'flex',alignItems:'flex-end',gap:10}}>
        <Stickman delay={0}/><Stickman wave delay={.35}/><Stickman delay={.7}/>
      </div>
      <span style={{font:'var(--type-body-md)',color:'var(--text-muted)'}}>Хтось поруч зараз шукає саме твою річ</span>
    </div>
  );
}

/* ---------- hand-drawn arrows + marker notes ---------- */
const ARROWS={
  swoopRight:{vb:'0 0 132 74',d:'M3 8c14 25 38 42 68 48 14 3 27 3 39 1',h:'M99 46c5 6 8 11 11 11-6 3-11 8-14 15'},
  hookDown:{vb:'0 0 92 96',d:'M12 5C8 30 18 52 44 66c11 6 22 9 33 10',h:'M64 60c5 8 11 13 15 15-8 4-13 10-16 18'},
  curlLeft:{vb:'0 0 124 80',d:'M120 10c-16 20-42 33-72 37-12 2-23 2-33 1',h:'M28 34c-8 6-14 12-19 13 7 5 12 12 14 21'},
  nudgeUp:{vb:'0 0 96 92',d:'M8 86C6 58 20 34 48 20c10-5 21-9 32-11',h:'M62 3c9 1 16 0 19 2-6 6-9 14-9 23'},
  dropIn:{vb:'0 0 40 108',d:'M20 4c-6 14-7 27-2 40 5 13 6 33-2 52',h:'M6 82c5 8 9 13 10 16 4-3 10-6 17-7'}
};
function Arrow({kind='swoopRight',width=120,rotate=0,color='var(--violet-500)',delay=0,style}){
  const a=ARROWS[kind]||ARROWS.swoopRight;
  return (
    <svg aria-hidden="true" viewBox={a.vb} width={width} fill="none" stroke={color} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"
      style={{overflow:'visible',transform:`rotate(${rotate}deg)`,opacity:.9,...style}}>
      <path d={a.d} style={{strokeDasharray:280,strokeDashoffset:280,animation:`swpDraw 1.1s cubic-bezier(.4,.1,.2,1) ${delay}s forwards`}}/>
      <path d={a.h} style={{strokeDasharray:60,strokeDashoffset:60,animation:`swpDraw .4s ease-out ${delay+.85}s forwards`}}/>
    </svg>
  );
}
function Note({children,rotate=-4,size=21,color='var(--violet-600)',style}){
  return <span style={{font:`600 ${size}px/1.15 Caveat,cursive`,color,transform:`rotate(${rotate}deg)`,display:'inline-block',whiteSpace:'nowrap',...style}}>{children}</span>;
}

/* ---------- store buttons ---------- */
function StoreButton({icon,top,label,dark}){
  const [h,setH]=React.useState(false);
  return (
    <a href="#" onClick={e=>e.preventDefault()} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{display:'flex',alignItems:'center',gap:12,padding:'13px 22px 13px 18px',borderRadius:16,textDecoration:'none',fontWeight:400,
        background:dark?'rgba(31,9,56,.42)':'rgba(255,255,255,.34)',color:dark?'#fff':'var(--violet-950)',
        backdropFilter:'blur(8px)',WebkitBackdropFilter:'blur(8px)',
        border:dark?'1px solid rgba(31,9,56,.28)':'1px solid rgba(31,9,56,.14)',
        boxShadow:'none',opacity:h?1:.72,
        transform:h?'translateY(-2px)':'none',transition:'transform .2s cubic-bezier(.2,.8,.3,1),opacity .2s ease,background .2s ease'}}>
      <Icon name={icon} size={26}/>
      <span style={{display:'flex',flexDirection:'column',lineHeight:1.15,textAlign:'left'}}>
        <span style={{font:'var(--fw-medium) 12px/1.2 var(--font-text)',opacity:.7}}>{top}</span>
        <span style={{font:'var(--fw-bold) 17px/1.2 var(--font-text)',letterSpacing:'-.01em'}}>{label}</span>
      </span>
    </a>
  );
}

function ScrollHint({flip}){
  return (
    <div className="swp-scrollhint" aria-hidden="true" style={{justifySelf:flip?'start':'end'}}>
      {[0,1,2].map(i=>(
        <svg key={i} width="64" height="38" viewBox="0 0 26 16" fill="none" stroke="currentColor" strokeWidth="3.1" strokeLinecap="round" strokeLinejoin="round" style={{opacity:0,marginTop:i?-12:0}}>
          <path d="M2 2l11 11L24 2"/>
        </svg>
      ))}
    </div>
  );
}

function Hero(){
  return (
    <section id="hero" style={{position:'relative',overflow:'hidden',background:'linear-gradient(180deg,#F5E2FE 0%,#F7E7FE 46%,#FBF3FE 100%)'}}>
      <style>{HERO_CSS}</style>
      <BgObjects/>
      <HeroTape/>
      <div aria-hidden="true" style={{position:'absolute',inset:0,zIndex:0,pointerEvents:'none',background:'radial-gradient(ellipse 62% 48% at 50% 34%,rgba(250,238,254,.82),rgba(250,238,254,0) 70%)'}}/>
      <div aria-hidden="true" style={{position:'absolute',left:0,right:0,bottom:0,height:210,zIndex:1,pointerEvents:'none',backdropFilter:'blur(10px)',WebkitBackdropFilter:'blur(10px)',WebkitMaskImage:'linear-gradient(180deg,transparent 0%,#000 76%)',maskImage:'linear-gradient(180deg,transparent 0%,#000 76%)'}}/>
      <div aria-hidden="true" style={{position:'absolute',left:0,right:0,bottom:0,height:170,zIndex:1,pointerEvents:'none',background:'linear-gradient(180deg,rgba(251,243,254,0) 0%,rgba(251,243,254,.72) 52%,#FBF3FE 88%)'}}/>
      <div style={{position:'relative',maxWidth:'var(--page-max)',margin:'0 auto',padding:'calc(var(--sp-11) + 104px) var(--gutter-web) var(--sp-6)',display:'flex',flexDirection:'column',gap:'var(--sp-8)'}}>
        <Wordmark/>
        <div style={{display:'grid',gridTemplateColumns:'1fr auto 1fr',alignItems:'center',gap:'var(--sp-6)'}}>
          <ScrollHint/>
          <div style={{display:'flex',flexDirection:'column',gap:'var(--sp-5)',alignItems:'center',textAlign:'center'}}>
            <div style={{display:'flex',gap:'var(--sp-3)',flexWrap:'wrap',justifyContent:'center'}}>
              <StoreButton icon="apple" top="Завантажити в" label="App Store" dark/>
              <StoreButton icon="play" top="Завантажити в" label="Google Play"/>
            </div>
            <StickRow/>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:2,marginTop:'var(--sp-4)'}}>
              <span className="swp-shimmer" style={{font:'700 20px/1.2 Caveat,cursive',letterSpacing:'.04em'}}>гортай вниз</span>
              <Note rotate={-3} size={28}>Ось як це працює</Note>
              <Arrow kind="dropIn" width={30} delay={.6} style={{marginLeft:6}}/>
            </div>
          </div>
          <ScrollHint flip/>
        </div>
      </div>
    </section>
  );
}

Object.assign(window,{Hero,ScrollHint,BgObjects,StickRow,Arrow,Note,StoreButton});
