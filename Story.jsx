const {Icon,ScaleField}=window.SwopifyDesignSystem_ad534d;

const ST_CSS=`
@keyframes stBurst{0%{opacity:0;transform:translate(-50%,-50%) scale(.15)}10%{opacity:1}100%{opacity:0;transform:translate(-50%,-50%) scale(3.4)}}
@keyframes stRoom{0%{opacity:0}6%{opacity:.92}30%{opacity:.34}100%{opacity:0}}
@keyframes stRing{0%{opacity:.7;transform:translate(-50%,-50%) scale(.2)}100%{opacity:0;transform:translate(-50%,-50%) scale(3.2)}}
@keyframes stKick{0%{transform:translate(-50%,-50%) rotate(-7deg) scale(var(--k))}20%{transform:translate(-50%,-50%) rotate(-9.6deg) scale(calc(var(--k) * 1.02)) translateY(-10px)}56%{transform:translate(-50%,-50%) rotate(-5.7deg) scale(var(--k)) translateY(3px)}100%{transform:translate(-50%,-50%) rotate(-7deg) scale(var(--k))}}
@keyframes stSplash{0%{opacity:0;transform:translate3d(0,0,0) scale(.2)}14%{opacity:1}70%{opacity:1}100%{opacity:0;transform:translate3d(var(--sx),var(--sy),0) scale(var(--ss))}}
@keyframes stFace{0%{opacity:0;transform:translate3d(0,0,0) scale(.2) rotate(0)}12%{opacity:1;transform:translate3d(calc(var(--sx)*.3),calc(var(--sy)*.3),0) scale(1.45) rotate(var(--sr))}100%{opacity:0;transform:translate3d(var(--sx),var(--sy),0) scale(.55) rotate(calc(var(--sr) * 2.2))}}
@keyframes stSeal{0%{opacity:0;transform:translate(-50%,-40%) scale(.72);filter:blur(14px)}42%{opacity:1;transform:translate(-50%,-52%) scale(1.05);filter:blur(0)}62%{transform:translate(-50%,-50%) scale(1)}100%{opacity:1;transform:translate(-50%,-50%) scale(1);filter:blur(0)}}
@keyframes stFog{0%{opacity:0;transform:translate(-50%,-50%) scale(.6)}100%{opacity:1;transform:translate(-50%,-50%) scale(1)}}
@keyframes stWord{0%{opacity:0;transform:translate(-50%,-50%) scale(.5)}16%{opacity:1;transform:translate(-50%,-50%) scale(1.08)}30%{transform:translate(-50%,-50%) scale(1)}64%{opacity:1}100%{opacity:0;transform:translate(-50%,-64%) scale(1.05)}}
@keyframes stGlow{0%{opacity:0;transform:translate(-50%,-50%) scale(.4)}30%{opacity:.85}100%{opacity:0;transform:translate(-50%,-50%) scale(1.9)}}
@keyframes stPing{0%{opacity:.6;transform:scale(1)}100%{opacity:0;transform:scale(1.9)}}
@keyframes stSheen{0%{transform:translate3d(-150%,0,0)}100%{transform:translate3d(260%,0,0)}}
@keyframes stObjIn{0%{opacity:0;filter:blur(12px);transform:translate3d(0,18%,0) scale(1.22)}62%{opacity:1;filter:blur(0)}100%{opacity:1;filter:blur(0);transform:none}}
.st-fx{pointer-events:none}
.st-wrap{position:relative;height:460vh}
.st-sticky{position:sticky;top:0;height:100vh;display:flex;align-items:center;justify-content:center;overflow:hidden}
.st-cols{position:relative;width:1240px;flex:none;height:700px;padding:0 var(--gutter-web);display:grid;grid-template-columns:minmax(360px,40%) 1fr;gap:var(--sp-5);align-items:center;transform-origin:center center;will-change:transform}
.st-copy{position:relative;height:100%}
.st-stage{position:relative;height:100%}
.st-swap{border:none;padding:0;background:none;cursor:pointer}
.st-swap:active{transform:scale(.94)}
@media (prefers-reduced-motion:reduce){.st-fx{animation:none!important;opacity:0!important}.st-kick{animation:none!important}}
`;

const cl=(v,a,b)=>Math.min(b,Math.max(a,v));
const sg=(p,a,b)=>cl((p-a)/(b-a),0,1);
const sm=t=>t*t*(3-2*t);
const e3=t=>1-Math.pow(1-t,3);
const RND=(a,b)=>a+Math.random()*(b-a);
const TAU=Math.PI*2;
const FLASH_AT=.2, TILT=-7, KSC=1.25, ROW_Y=410, CAM_CX=.44;
/* card geometry: feed cards, and the two hero cards that merge (bigger) */
const CW=224, HW=256, HH=304, HHALF=Math.round(HH/2), REST_TILT=5;
const VIO=['#C071F0','#A63FE9','#8E26E2','#7418BE','#5B1795'];
const TINT_A='linear-gradient(160deg,#F5E2FE,#FBF3FE)';
const TINT_B='linear-gradient(160deg,#EBC6FD,#F5E2FE)';

/* what you shot — a random thing each visit, its print develops into a card */
const SHOTS=[['headphones','Мої навушники','hp']];
const WANT=[['camera','Плівкова камера'],['?','Здивуй мене'],['gamepad-2','Ретро-консоль'],['?','А що є в тебе?']];
const FEED=[
  ['headphones','Навушники','Київ'],
  ['gamepad-2','Ретро-консоль','Львів'],
  ['bike','Міський велосипед','Одеса'],
  ['tent','Намет на двох','Харків'],
  ['disc-3','Вініл 80-х','Дніпро'],
  ['armchair','Крісло-мішок','Львів'],
  ['camera','Плівкова камера','Київ']
];

function Glyph({icon,size=62}){
  if(icon==='?')return <span style={{font:`700 ${Math.round(size*1.25)}px/1 var(--font-display)`,letterSpacing:'-.02em',color:'var(--violet-500)'}}>?</span>;
  return <Icon name={icon} size={size}/>;
}

/* One card in the story: violet icon panel with a sheen, name and city.
   With a list of 2+ entries it morphs while `active`. */
function ThingCard({list,eyebrow,city,tint=TINT_A,active=false,delay=0,w=CW}){
  const [i,setI]=React.useState(0);
  React.useEffect(()=>{
    if(!active||list.length<2)return;
    const id=setInterval(()=>setI(v=>(v+1)%list.length),2600);
    return()=>clearInterval(id);
  },[active,list.length]);
  const [ic,label]=list[Math.min(i,list.length-1)];
  return (
    <div style={{width:w,padding:13,borderRadius:'var(--r-lg)',background:'var(--surface-card)',border:'var(--bw-hair) solid var(--border-subtle)',boxShadow:'var(--shadow-sm)',display:'flex',flexDirection:'column',gap:11}}>
      <div style={{position:'relative',height:Math.round(w*.79),borderRadius:18,background:tint,overflow:'hidden',display:'grid',placeItems:'center',color:'var(--violet-600)',isolation:'isolate'}}>
        <span key={i} style={{display:'grid',placeItems:'center',animation:'stObjIn .62s cubic-bezier(.2,.75,.25,1) both'}}><Glyph icon={ic} size={Math.round(w*.31)}/></span>
        <span aria-hidden="true" style={{position:'absolute',top:0,bottom:0,width:'38%',background:'linear-gradient(100deg,transparent,rgba(255,255,255,.72),transparent)',animation:`stSheen 5.2s ease-in-out ${delay}s infinite`,pointerEvents:'none'}}/>
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:3,padding:'0 4px 4px'}}>
        {eyebrow&&<span style={{font:'var(--type-overline)',letterSpacing:'var(--ls-caps)',textTransform:'uppercase',color:'var(--text-brand)'}}>{eyebrow}</span>}
        <span key={'l'+i} style={{font:'var(--type-title-md)',color:'var(--text-strong)',animation:'stObjIn .5s ease both'}}>{label}</span>
        <span style={{display:'flex',alignItems:'center',gap:4,color:'var(--text-faint)',font:'var(--type-caption)',minHeight:15}}>
          {city&&<React.Fragment><Icon name="map-pin" size={11}/>{city}</React.Fragment>}
        </span>
      </div>
    </div>
  );
}

function Camera({shutterRef}){
  return (
    <div style={{position:'relative',width:276,height:190,borderRadius:30,background:'linear-gradient(162deg,var(--violet-600) 0%,var(--violet-800) 46%,var(--violet-950) 100%)',border:'1px solid rgba(255,255,255,.18)',boxShadow:'0 34px 60px -24px rgba(38,35,87,.66),inset 0 1px 0 rgba(255,255,255,.28)'}}>
      <div style={{position:'absolute',left:16,right:16,top:15,height:48,borderRadius:14,background:'rgba(255,255,255,.07)',border:'1px solid rgba(255,255,255,.12)'}}/>
      <div style={{position:'absolute',left:30,top:27,width:58,height:24,borderRadius:7,background:'linear-gradient(180deg,#FCF6FF,#E4C9F7)',boxShadow:'inset 0 -2px 4px rgba(38,35,87,.35),0 0 0 1px rgba(255,255,255,.35)'}}/>
      <div style={{position:'absolute',left:100,top:31,width:30,height:17,borderRadius:5,background:'rgba(12,6,28,.62)',boxShadow:'inset 0 1px 2px rgba(0,0,0,.6)'}}/>
      <span ref={shutterRef} aria-hidden="true" style={{position:'absolute',right:26,top:24,width:30,height:30,borderRadius:'50%',border:'2px solid rgba(255,255,255,.5)',background:'var(--violet-300)',boxShadow:'0 4px 8px rgba(12,6,28,.45)',display:'block'}}/>
      <div style={{position:'absolute',left:'50%',top:74,marginLeft:-56,width:112,height:112,borderRadius:'50%',background:'linear-gradient(150deg,var(--violet-700),var(--violet-950))',boxShadow:'0 8px 18px rgba(12,6,28,.5),inset 0 1px 0 rgba(255,255,255,.22)',display:'grid',placeItems:'center'}}>
        <div style={{width:82,height:82,borderRadius:'50%',background:'radial-gradient(circle at 34% 28%,rgba(255,255,255,.42),rgba(74,26,140,.9) 42%,#140A2E 100%)',boxShadow:'inset 0 0 14px rgba(0,0,0,.7)',display:'grid',placeItems:'center'}}>
          <div style={{width:40,height:40,borderRadius:'50%',background:'radial-gradient(circle at 30% 26%,rgba(192,113,240,.85),#0E0620 70%)'}}/>
        </div>
      </div>
      <div style={{position:'absolute',left:'50%',bottom:-1,marginLeft:-97,width:194,height:11,borderRadius:'6px 6px 3px 3px',background:'linear-gradient(180deg,#0B0518,#1B0E38)',boxShadow:'inset 0 2px 3px rgba(0,0,0,.8)'}}/>
    </div>
  );
}

function Story(){
  const shot=React.useMemo(()=>SHOTS[Math.floor(Math.random()*SHOTS.length)],[]);
  const photoUrl='./photo-headphones.png';
  const give=React.useMemo(()=>[[shot[0],shot[1]],['?','Або що скажеш'],['sparkles','Ще щось з полиці']],[shot]);

  const wrap=React.useRef(null),stage=React.useRef(null);
  const cam=React.useRef(null),shutter=React.useRef(null),mask=React.useRef(null);
  const fly=React.useRef(null),flyM=React.useRef(null),pola=React.useRef(null),img=React.useRef(null),qm=React.useRef(null),cardEl=React.useRef(null);
  const copyA=React.useRef(null),copyB=React.useRef(null),col=React.useRef(null),lastM=React.useRef(null),swapEl=React.useRef(null),halo=React.useRef(null),hintB=React.useRef(null),vortex=React.useRef(null),field=React.useRef(null),veil=React.useRef(null);
  const [flash,setFlash]=React.useState(0);
  const [phase,setPhase]=React.useState('idle');
  const [burst,setBurst]=React.useState(0);
  const [ready,setReady]=React.useState(false);
  const prev=React.useRef(null),sw=React.useRef(740),merging=React.useRef(false),raf2=React.useRef(0),timers=React.useRef([]);
  const readyRef=React.useRef(false),phaseRef=React.useRef('idle');
  /* the gate: the page cannot go past the story until the swap has played once */
  const lockedRef=React.useRef(false),doneRef=React.useRef(false),lockY=React.useRef(0),scrub=React.useRef(null),charge=React.useRef(0),ring=React.useRef(null),sealEl=React.useRef(null);
  const [done,setDone]=React.useState(false);
  const release=()=>{if(doneRef.current)return;doneRef.current=true;lockedRef.current=false;setDone(true);
    /* hand the cards back to the scroll: from here everything is reversible */
    [flyM.current,lastM.current].forEach(el=>{if(el){el.style.transform='';el.style.filter='';el.style.zIndex='';}});
    merging.current=false;
    window.dispatchEvent(new CustomEvent('swopify:matched'));};
  const goPhase=v=>{phaseRef.current=v;setPhase(v);};

  React.useEffect(()=>{
    const size=()=>{
      if(stage.current)sw.current=stage.current.offsetWidth||740;
      const c=stage.current&&stage.current.parentElement;
      if(c)c.style.transform='scale('+Math.min(1,(window.innerWidth-24)/1240,(window.innerHeight-40)/740).toFixed(3)+')';
    };
    size();
    window.addEventListener('resize',size);
    /* scrub mode: the blocked scroll first winds the ring around the button,
       and only then turns the cards */
    const RING=2*Math.PI*42, CHARGE=1600;
    const advance=d=>{
      if(doneRef.current)return;
      if(!scrub.current){
        if(phaseRef.current!=='idle')return;
        charge.current=Math.max(0,charge.current+d*.25);
        const q=cl(charge.current/CHARGE,0,1);
        if(ring.current)ring.current.style.strokeDashoffset=(RING*(1-q)).toFixed(2);
        if(q>=1)runMerge('scrub');
        return;
      }
      const s=scrub.current;s.tt=Math.max(0,s.tt+d*1.5);s.frame(s.tt);if(s.tt>=s.END)scrub.current=null;
    };
    let ty=0;
    const block=e=>{if(!lockedRef.current||doneRef.current)return;e.preventDefault();if(e.deltaY!==undefined)advance(e.deltaY*3.4);
      else if(e.touches&&e.touches[0]){const y=e.touches[0].clientY;if(ty)advance((ty-y)*9);ty=y;}};
    const touchStart=e=>{ty=e.touches&&e.touches[0]?e.touches[0].clientY:0;};
    window.addEventListener('touchstart',touchStart,{passive:true});
    const keys=e=>{if(lockedRef.current&&!doneRef.current&&[32,33,34,35,40].indexOf(e.keyCode)>=0)e.preventDefault();};
    window.addEventListener('wheel',block,{passive:false});
    window.addEventListener('touchmove',block,{passive:false});
    window.addEventListener('keydown',keys,{passive:false});
    let raf=0;
    const paint=()=>{
      const el=wrap.current;
      if(el){
        const vh=window.innerHeight;
        const r=el.getBoundingClientRect();
        const p=cl(-r.top/Math.max(1,r.height-vh),0,1);
        const W=sw.current;
        const camCx=CAM_CX*W, camCy=172;
        const cardCx=Math.max(HW/2+18,W*.21), feedCx=W-(HW/2+30), swapCx=(cardCx+feedCx)/2;
        const rad=TILT*Math.PI/180;
        const slotX=camCx-95*Math.sin(rad)*KSC, slotY=camCy+95*Math.cos(rad)*KSC;

        if(field.current){
          /* луска appears only once the print has left the camera, then lags
             behind the feed column — parallax at ~a third of its travel */
          field.current.style.opacity=(sg(p,.24,.54)*.9).toFixed(3);
          field.current.style.transform=`translate3d(${(p*72).toFixed(1)}px,${(-p*300).toFixed(1)}px,0)`;
        }
        const s=sm(sg(p,0,.1)), out=e3(sg(p,.48,.68));
        if(cam.current){
          cam.current.style.left=camCx+'px';
          cam.current.style.top=(camCy-out*vh*1.15+(1-s)*70)+'px';
          cam.current.style.transform=`translate(-50%,-50%) rotate(${(TILT-out*14).toFixed(2)}deg) scale(${(KSC*(.94+.06*s)).toFixed(3)})`;
          cam.current.style.opacity=((.15+.85*s)*(1-sg(p,.58,.7))).toFixed(3);
        }
        if(shutter.current)shutter.current.style.transform=`translateY(${(sm(sg(p,.12,FLASH_AT))*5).toFixed(2)}px)`;

        const ej=sm(sg(p,FLASH_AT,.44));
        const t=sg(p,.46,.88), fe=e3(t);
        const dv=sg(p,.28,.5);
        if(img.current){img.current.style.opacity=dv.toFixed(3);img.current.style.filter=`blur(${((1-dv)*16).toFixed(2)}px) saturate(${(.2+.8*dv).toFixed(2)})`;}
        if(qm.current)qm.current.style.opacity=(1-sg(p,.26,.4)).toFixed(3);
        if(mask.current){
          const open=sm(sg(p,.42,.5));
          const tg=Math.tan(rad), far=2400, off=open*3000;
          mask.current.style.clipPath=`polygon(${-far}px ${slotY+(-far-slotX)*tg-off}px, ${far}px ${slotY+(far-slotX)*tg-off}px, ${far}px ${far}px, ${-far}px ${far}px)`;
        }
        if(fly.current&&!merging.current){
          const dx=(cardCx-camCx)*fe-Math.sin(t*Math.PI*2.4)*38*(1-t*.8);
          const dy=(ROW_Y-slotY-HHALF)*fe+Math.sin(t*Math.PI*3.1)*24*(1-t);
          const rot=TILT-(360+TILT)*e3(t)+Math.sin(t*Math.PI*4)*9*(1-t);
          const tilt=Math.sin(t*Math.PI*2.6)*46*(1-t*.7);
          fly.current.style.left=slotX+'px';
          fly.current.style.top=slotY+'px';
          fly.current.style.transform=`translate(-50%,0) translate3d(${dx.toFixed(1)}px,${dy.toFixed(1)}px,0) rotate(${rot.toFixed(2)}deg) rotateY(${tilt.toFixed(1)}deg) scale(${(1+.03*fe).toFixed(3)}) translateY(${((1-ej)*-372).toFixed(1)}px)`;
        }

        const m=sm(sg(p,.62,.82));
        if(pola.current)pola.current.style.opacity=(1-m).toFixed(3);
        if(cardEl.current)cardEl.current.style.opacity=m.toFixed(3);
        if(halo.current){halo.current.style.left=cardCx+'px';halo.current.style.opacity=(Math.sin(m*Math.PI)*.85).toFixed(3);}

        if(copyA.current){const o=1-sg(p,.36,.5);copyA.current.style.opacity=o.toFixed(3);copyA.current.style.transform=`translateY(${((1-o)*-26).toFixed(1)}px)`;}
        if(copyB.current){const o=sg(p,.58,.74);copyB.current.style.opacity=o.toFixed(3);copyB.current.style.transform=`translateY(${((1-o)*30).toFixed(1)}px)`;}
        if(col.current&&!merging.current){
          const o=sg(p,.5,.66);
          const last=col.current.lastElementChild;
          const end=last?ROW_Y-(last.offsetTop+last.offsetHeight/2):0;
          col.current.style.left=feedCx+'px';
          col.current.style.opacity=o.toFixed(3);
          col.current.style.transform=`translate(-50%,${(760+(end-760)*e3(sg(p,.5,.94))).toFixed(1)}px)`;
        }
        const rdy=p>.9;
        if(swapEl.current){
          const o=sg(p,.78,.9);
          swapEl.current.style.left=swapCx+'px';
          swapEl.current.style.opacity=(phaseRef.current!=='idle'||doneRef.current?0:o).toFixed(3);
          swapEl.current.style.transform=`translate(-50%,-50%) scale(${(.4+.6*o).toFixed(3)})`;
        }
        if(vortex.current&&!merging.current){vortex.current.style.left=((cardCx+feedCx)/2)+'px';vortex.current.style.opacity='0';}
        if(hintB.current)hintB.current.style.opacity=(rdy&&phaseRef.current==='idle'&&!doneRef.current?1:0).toFixed(2);
        if(rdy!==readyRef.current){readyRef.current=rdy;setReady(rdy);}

        if(!doneRef.current){
          if(!lockedRef.current&&p>=.985){
            lockedRef.current=true;lockY.current=window.scrollY;
          }
          if(lockedRef.current&&window.scrollY>lockY.current)window.scrollTo(0,lockY.current);
        }

        if(doneRef.current){
          /* the swap is spent: both cards stay gone, the photo never flies back,
             only the seal dissolves as you scroll away */
          if(flyM.current)flyM.current.style.opacity='0';
          if(lastM.current)lastM.current.style.opacity='0';
          if(sealEl.current)sealEl.current.style.opacity=sg(p,.9,.985).toFixed(3);
        }
        if(veil.current)veil.current.style.opacity=(sg(p,.97,1)*.9).toFixed(3);
        if(prev.current===null)prev.current=p;
        else{const cross=(prev.current<FLASH_AT)!==(p<FLASH_AT),down=p>prev.current;prev.current=p;if(cross&&down&&!doneRef.current)setFlash(n=>n+1);}
      }
      raf=requestAnimationFrame(paint);
    };
    raf=requestAnimationFrame(paint);
    return()=>{cancelAnimationFrame(raf);cancelAnimationFrame(raf2.current);timers.current.forEach(clearTimeout);window.removeEventListener('resize',size);
      window.removeEventListener('wheel',block);window.removeEventListener('touchmove',block);window.removeEventListener('keydown',keys);window.removeEventListener('touchstart',touchStart);};
  },[]);

  const splash=React.useMemo(()=>{
    const dots=Array.from({length:30},()=>{const a=RND(0,TAU),d=RND(120,300);return {sx:Math.cos(a)*d,sy:Math.sin(a)*d*.8,ss:RND(.2,.8),s:RND(6,16),dl:RND(0,.16),c:VIO[Math.floor(RND(0,4))]};});
    const faces=[':)',':D','^_^',':]',';)','(:','\\o/','\u2665',':P','\u2726','\u00b0\u25e1\u00b0','\\\u00b0\u25e1\u00b0/'].map(t=>{const a=RND(0,TAU),d=RND(180,360);return {t,sx:Math.cos(a)*d,sy:Math.sin(a)*d,sr:RND(-70,70)+'deg',dl:RND(0,.12),sz:RND(20,42)};});
    return {dots,faces};
  },[burst]);

  /* press → jolt → the two cards orbit into each other → splash */
  const runMerge=driver=>{
    if(!readyRef.current||phaseRef.current!=='idle'||merging.current||doneRef.current)return;
    const A=flyM.current, B=lastM.current;
    if(!A||!B)return;
    merging.current=true;
    goPhase('spin');
    const ra=A.getBoundingClientRect(), rb=B.getBoundingClientRect();
    const ca={x:ra.left+ra.width/2,y:ra.top+ra.height/2}, cb={x:rb.left+rb.width/2,y:rb.top+rb.height/2};
    const mid={x:(ca.x+cb.x)/2,y:(ca.y+cb.y)/2};
    const R0=Math.abs(cb.x-ca.x)/2;
    const put=(el,c,x,y,rot,sc,blur,z,op)=>{el.style.transform=`translate3d(${(x-c.x).toFixed(1)}px,${(y-c.y).toFixed(1)}px,0) rotate(${rot.toFixed(2)}deg) scale(${sc.toFixed(3)})`;el.style.filter=blur?`blur(${blur.toFixed(2)}px)`:'none';el.style.zIndex=z;el.style.opacity=op.toFixed(3);};
    const WIND=520, ORB=1900, t0=performance.now(), END=WIND+ORB;
    let ended=false;
    const frame=tt=>{
      if(tt>=END){if(!ended){ended=true;finish();}return true;}
      if(tt<WIND){
        const q=sm(tt/WIND);
        put(A,ca,mid.x-R0*(1+.12*q),mid.y-18*q,REST_TILT*q,1+.04*q,0,3,1);
        put(B,cb,mid.x+R0*(1+.12*q),mid.y-18*q,-REST_TILT*q,1+.04*q,0,3,1);
        if(swapEl.current)swapEl.current.style.opacity=String(1-q);
        if(vortex.current){vortex.current.style.opacity=(q*.35).toFixed(3);vortex.current.style.transform=`translate(-50%,-50%) rotate(${(q*40).toFixed(1)}deg) scale(${(.45+.15*q).toFixed(3)})`;}
      } else {
        const q=cl((tt-WIND)/ORB,0,1);
        const spin=TAU*4.6*Math.pow(q,2.2);
        const w=TAU*4.6*2.2*Math.pow(q,1.2)/(ORB/1000);
        const ce=sm(cl((q-.32)/.68,0,1));
        const R1=R0*(1.12-1.10*ce), sc=1.04-.4*ce;
        const fade=1-sm(cl((q-.76)/.24,0,1));
        [[A,ca,Math.PI],[B,cb,0]].forEach(([el,c,ph])=>{
          const th=spin+ph, si=Math.sin(th), dep=(si+1)/2;
          put(el,c,mid.x+Math.cos(th)*R1,mid.y-si*R1*.24-18*ce,si*9,sc*(.94+.12*dep),cl(w*.26,0,15)+ce*8,si>0?3:1,fade);
        });
        if(vortex.current){
          vortex.current.style.opacity=(.35+.6*sm(q)).toFixed(3);
          vortex.current.style.transform=`translate(-50%,-50%) rotate(${(spin*62).toFixed(1)}deg) scale(${(.6+1.05*q).toFixed(3)})`;
        }
      }
    };
    const tick=now=>{if(frame(performance.now()-t0)!==true)raf2.current=requestAnimationFrame(tick);};
    const finish=()=>{
      A.style.opacity='0';B.style.opacity='0';
      if(vortex.current){vortex.current.style.transition='opacity 320ms var(--ease-out)';vortex.current.style.opacity='0';}
      setBurst(n=>n+1);goPhase('merged');
      /* «Метч» fades into the deal being sealed — and the fog behind that
         word is where the footprints walk out of */
      timers.current.push(setTimeout(()=>{goPhase('sealed');release();},1500));
    };
    const back=()=>{
      goPhase('return');
      const s0=performance.now(), D=620;
      const step=now=>{
        const q=cl((now-s0)/D,0,1), e=e3(q);
        if(vortex.current)vortex.current.style.transition='';
        [A,B].forEach(el=>{el.style.opacity='1';el.style.transform=`scale(${(.62+.38*e).toFixed(3)})`;el.style.filter=q<1?`blur(${((1-e)*10).toFixed(2)}px)`:'none';el.style.zIndex='';});
        if(q<1)raf2.current=requestAnimationFrame(step);
        else{[A,B].forEach(el=>{el.style.transform='';el.style.filter='';});merging.current=false;goPhase('idle');}
      };
      raf2.current=requestAnimationFrame(step);
    };
    if(driver==='scrub'){scrub.current={frame,END,tt:0};frame(0);}
    else{scrub.current=null;raf2.current=requestAnimationFrame(tick);}
  };

  const big={font:'var(--type-display-md)',fontFamily:'var(--font-display)',letterSpacing:'var(--ls-display)',color:'var(--violet-950)',margin:0,textWrap:'pretty',transform:'skewX(-8deg) rotate(-1.6deg)',transformOrigin:'0 100%'};
  const em={color:'var(--violet-600)'};
  const sub={font:'var(--fw-regular) var(--fs-18)/1.55 var(--font-text)',color:'var(--text-muted)',margin:0,maxWidth:'26ch'};
  const bandB={position:'absolute',inset:0,zIndex:6,opacity:0,pointerEvents:'none',willChange:'transform,opacity'};
  const slab={position:'absolute',left:0,top:'50%',transform:'translateY(-50%)',width:'100%',display:'flex',flexDirection:'column',gap:'var(--sp-4)',willChange:'transform,opacity'};

  return (
    <section id="story" ref={wrap} className="st-wrap" style={{background:'linear-gradient(180deg,var(--surface-card) 0%,var(--surface-card) 84%,#FDFAFF 94%,#FBF3FE 100%)'}}>
      <style>{ST_CSS}</style>
      {flash>0&&<React.Fragment key={'r'+flash}>
        <span className="st-fx" aria-hidden="true" style={{position:'fixed',inset:0,zIndex:60,background:'#fff',opacity:0,animation:'stRoom 420ms cubic-bezier(.05,.85,.2,1) both'}}/>
        <span className="st-fx" aria-hidden="true" style={{position:'fixed',left:'56%',top:'44%',width:'46vw',height:'46vw',zIndex:59,borderRadius:'50%',border:'2px solid var(--violet-300)',opacity:0,animation:'stRing 720ms cubic-bezier(.1,.75,.3,1) both'}}/>
      </React.Fragment>}

      <div className="st-sticky">
        <span ref={veil} aria-hidden="true" style={{position:'absolute',left:0,right:0,bottom:0,height:280,zIndex:20,opacity:0,pointerEvents:'none',backdropFilter:'blur(12px)',WebkitBackdropFilter:'blur(12px)',WebkitMaskImage:'linear-gradient(180deg,transparent 0%,#000 74%)',maskImage:'linear-gradient(180deg,transparent 0%,#000 74%)',background:'linear-gradient(180deg,rgba(251,243,254,0) 0%,rgba(251,243,254,.7) 54%,#FBF3FE 92%)'}}/>
        <span ref={field} aria-hidden="true" style={{position:'absolute',left:-90,right:-90,top:-280,bottom:-460,opacity:0,willChange:'transform,opacity'}}>
          <ScaleField tone="onLight" shape="card" content="icons" cell={252} overlap={0} gap={18} intensity={.4} glow={420} seed={23}/>
        </span>
        <div className="st-cols">
          <div className="st-copy">
            <div ref={copyA} style={slab}>
              <h2 style={big}>Дістань те, що вже не носиш — і <span style={em}>сфоткай</span>.</h2>
              <p style={sub}>Назву, опис і чистий фон допише ШІ.</p>
              <span style={{display:'flex',alignItems:'flex-start',gap:8,marginTop:'var(--sp-2)'}}>
                <Arrow kind="swoopRight" width={62} rotate={10} delay={.4}/>
                <Note rotate={-3} size={23} style={{marginTop:26}}>гортай, воно саме</Note>
              </span>
            </div>
          </div>

          <div ref={copyB} style={bandB}>
            <h2 style={{...big,position:'absolute',left:'var(--gutter-web)',top:6,width:'52%',fontSize:'var(--fs-64,64px)',transform:'skewX(-8deg) rotate(1.2deg)'}}>А тепер знайди те, на що <span style={em}>хочеться</span> поміняти.</h2>
            <div style={{position:'absolute',left:'var(--gutter-web)',top:ROW_Y-96,width:'30%',display:'flex',flexDirection:'column',gap:'var(--sp-3)'}}>
              <p style={{font:'var(--fw-medium,600) var(--fs-24,26px)/1.4 var(--font-text)',color:'var(--text-strong)',margin:0,maxWidth:'17ch',textWrap:'pretty',transform:'rotate(-1deg)'}}>Побачив у стрічці своє — <span style={em}>жми обмін</span> і запропонуй власнику свою річ.</p>
              <span style={{display:'flex',alignItems:'flex-start',gap:8}}><Arrow kind="swoopRight" width={72} rotate={-6} delay={.3}/><Note rotate={-3} size={26} style={{marginTop:24}}>він відповість</Note></span>
            </div>
          </div>

          <div ref={stage} className="st-stage" style={{perspective:1400}}>
            <span ref={halo} aria-hidden="true" style={{position:'absolute',left:'20%',top:ROW_Y,width:520,height:520,marginLeft:-260,marginTop:-260,borderRadius:'50%',background:'radial-gradient(circle,var(--violet-200),transparent 66%)',opacity:0,zIndex:1,pointerEvents:'none'}}/>

            <div ref={cam} style={{position:'absolute',left:'44%',top:172,zIndex:4,['--k']:KSC,willChange:'transform,opacity'}}>
              <div key={'k'+flash} className={flash>0?'st-kick':undefined} style={flash>0?{animation:'stKick 380ms cubic-bezier(.34,1.56,.64,1) both',transformOrigin:'50% 50%'}:undefined}>
                <Camera shutterRef={shutter}/>
              </div>
              {flash>0&&<span key={'b'+flash} className="st-fx" aria-hidden="true" style={{position:'absolute',left:52,top:39,width:230,height:230,borderRadius:'50%',background:'radial-gradient(circle,#fff 26%,rgba(232,208,252,.9) 48%,transparent 72%)',opacity:0,animation:'stBurst 620ms cubic-bezier(.08,.8,.3,1) both'}}/>}
            </div>

            <div ref={mask} style={{position:'absolute',inset:0,zIndex:3,willChange:'clip-path'}}>
              <div ref={fly} style={{position:'absolute',left:0,top:0,width:HW,transformOrigin:'50% 0',transformStyle:'preserve-3d',willChange:'transform'}}>
                <div ref={flyM} style={{willChange:'transform,filter'}}>
                  <div style={{transform:`rotate(${-REST_TILT}deg)`,transformOrigin:'50% 50%'}}>
                    <div ref={pola} style={{padding:'14px 14px 48px',borderRadius:10,background:'linear-gradient(180deg,#fff,#F6F2FC)',boxShadow:'0 30px 50px -20px rgba(38,35,87,.55),0 0 0 1px rgba(38,35,87,.06)'}}>
                      <div style={{position:'relative',width:HW-28,height:Math.round((HW-28)*1.25),borderRadius:5,overflow:'hidden',background:'linear-gradient(180deg,#1D1140,#0C0520)'}}>
                        <img ref={img} src={photoUrl} alt="" style={{width:'100%',height:'100%',objectFit:'cover',opacity:0,willChange:'opacity,filter'}}/>
                        <span ref={qm} aria-hidden="true" style={{position:'absolute',inset:0,display:'grid',placeItems:'center',font:'600 112px/1 Caveat,cursive',color:'var(--violet-400)'}}>?</span>
                      </div>
                    </div>
                    <div ref={cardEl} style={{position:'absolute',left:0,top:0,width:HW,opacity:0}}>
                      <ThingCard list={give} eyebrow="Ти даєш" city="Львів" tint={TINT_A} active={ready&&phase==='idle'} delay={.4} w={HW}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div ref={col} style={{position:'absolute',left:'80%',top:0,display:'flex',flexDirection:'column',alignItems:'center',gap:18,zIndex:2,opacity:0,willChange:'transform,opacity'}}>
              {FEED.slice(0,FEED.length-1).map(([ic,l,c],i)=>(
                <ThingCard key={l} list={[[ic,l]]} city={c} tint={i%2?TINT_B:TINT_A} delay={i*.5}/>
              ))}
              <div ref={lastM} style={{willChange:'transform,filter'}}>
                <div style={{transform:`rotate(${REST_TILT}deg)`,transformOrigin:'50% 50%'}}>
                  <ThingCard list={WANT} eyebrow="Ти отримуєш" city="Київ" tint={TINT_B} active={ready&&phase==='idle'} delay={.9} w={HW}/>
                </div>
              </div>
            </div>

            <span ref={vortex} aria-hidden="true" style={{position:'absolute',left:'55%',top:ROW_Y,width:340,height:340,zIndex:5,opacity:0,pointerEvents:'none',borderRadius:'50%',transform:'translate(-50%,-50%) scale(.45)',background:'conic-gradient(from 0deg,transparent 0deg,#C071F0 58deg,transparent 118deg,#8E26E2 216deg,transparent 298deg,#D9A0F8 338deg,transparent 360deg)',filter:'blur(24px)',willChange:'transform,opacity'}}/>
            <span ref={swapEl} style={{position:'absolute',left:'55%',top:ROW_Y,zIndex:7,opacity:0,willChange:'transform,opacity'}}>
              <button className="st-swap" onClick={()=>runMerge()} aria-label="Обміняти" disabled={!ready||done}
                style={{position:'relative',display:'grid',placeItems:'center',width:74,height:74,borderRadius:'50%',background:ready?'var(--violet-600)':'var(--violet-300)',color:'#fff',border:'4px solid #fff',boxShadow:'0 14px 30px -10px rgba(116,24,190,.6)',transition:'background var(--dur-base) var(--ease-standard),transform var(--dur-fast) var(--ease-spring)',cursor:ready?'pointer':'default'}}>
                {ready&&phase==='idle'&&!done&&<span aria-hidden="true" style={{position:'absolute',inset:-4,borderRadius:'50%',border:'2px solid var(--violet-400)',animation:'stPing 2.2s ease-out infinite'}}/>}
                <svg aria-hidden="true" width="96" height="96" viewBox="0 0 96 96" fill="none" style={{position:'absolute',left:'50%',top:'50%',transform:'translate(-50%,-50%) rotate(-90deg)',pointerEvents:'none'}}>
                  <circle cx="48" cy="48" r="42" stroke="rgba(116,24,190,.16)" strokeWidth="5"/>
                  <circle ref={ring} cx="48" cy="48" r="42" stroke="var(--violet-600)" strokeWidth="5" strokeLinecap="round" style={{strokeDasharray:2*Math.PI*42,strokeDashoffset:2*Math.PI*42}}/>
                </svg>
                <Icon name="repeat" size={30}/>
              </button>
              <span ref={hintB} style={{position:'absolute',left:'50%',top:82,transform:'translateX(-50%)',opacity:0,transition:'opacity var(--dur-base) var(--ease-standard)',pointerEvents:'none'}}>
                <Note rotate={-4} size={23}>гортай</Note>
              </span>
            </span>

            {(phase==='merged'||phase==='sealed')&&(
              <div key={'m'+burst} ref={sealEl} aria-hidden="true" style={{position:'absolute',left:'50%',top:ROW_Y,zIndex:8,display:'grid',placeItems:'center',pointerEvents:'none'}}>
                <span style={{position:'absolute',left:'50%',top:'50%',width:760,height:560,borderRadius:'50%',background:'radial-gradient(ellipse,rgba(192,113,240,.5),rgba(214,160,248,.28) 46%,transparent 72%)',filter:'blur(26px)',animation:'stFog 1.1s var(--ease-out) both'}}/>
                <span style={{position:'absolute',left:'50%',top:'50%',width:300,height:300,borderRadius:'50%',background:'radial-gradient(circle,#fff,rgba(192,113,240,.45) 44%,transparent 70%)',animation:'stGlow .9s ease-out both'}}/>
                {splash.dots.map((d,i)=><span key={'d'+i} style={{position:'absolute',width:d.s,height:d.s,borderRadius:'50%',background:d.c,['--sx']:d.sx+'px',['--sy']:d.sy+'px',['--ss']:d.ss,animation:`stSplash 1.4s cubic-bezier(.15,.7,.3,1) ${d.dl}s both`}}/>)}
                {splash.faces.map((f,i)=><span key={'f'+i} style={{position:'absolute',font:`800 ${Math.round(f.sz)}px/1 var(--font-display)`,color:'var(--violet-700)',['--sx']:f.sx+'px',['--sy']:f.sy+'px',['--sr']:f.sr,animation:`stFace 1.5s cubic-bezier(.12,.85,.3,1) ${f.dl}s both`}}>{f.t}</span>)}
                {phase==='merged'
                  ? <span style={{position:'absolute',left:'50%',top:'50%',whiteSpace:'nowrap',font:'700 76px/1 var(--font-display)',letterSpacing:'var(--ls-display)',color:'var(--violet-700)',animation:'stWord 1.6s cubic-bezier(.2,.8,.25,1) both'}}>Метч</span>
                  : <span style={{position:'absolute',left:'50%',top:'50%',whiteSpace:'nowrap',textAlign:'center',animation:'stSeal 900ms cubic-bezier(.2,.8,.25,1) both'}}>
                      <span style={{display:'block',font:'700 76px/1 var(--font-display)',letterSpacing:'var(--ls-display)',color:'var(--violet-700)'}}>Обмін узгоджено</span>
                      <span style={{display:'block',marginTop:14,font:'600 26px/1.2 Caveat,cursive',color:'var(--violet-600)'}}>умови погоджені — залишилось дійти до поштомата</span>
                    </span>}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window,{Story,ThingCard});
