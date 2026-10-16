/* The footprints. They stamp out of the violet fog right after «Метч», walk down
   as one road, and at the signpost the road forks: left — meet in person (map,
   pin, time), right — different cities, send it through the post. */

const SP_CSS=`
@keyframes spStamp{0%{opacity:0;filter:blur(6px)}55%{opacity:1;filter:blur(0)}100%{opacity:1;filter:blur(0)}}
@keyframes spHalo{0%{opacity:.55;transform:scale(.5)}100%{opacity:0;transform:scale(2.4)}}
@keyframes spPostIn{0%{opacity:0;transform:translate(-50%,-40%) rotate(-9deg) scale(.7)}58%{opacity:1;transform:translate(-50%,-50%) rotate(4deg) scale(1.04)}78%{transform:translate(-50%,-50%) rotate(-2deg) scale(1)}100%{opacity:1;transform:translate(-50%,-50%) rotate(0) scale(1)}}
@keyframes spArmIn{0%{opacity:0;transform:translateY(-14px) rotate(var(--r0))}70%{opacity:1;transform:translateY(0) rotate(calc(var(--r1) * 1.6))}100%{opacity:1;transform:translateY(0) rotate(var(--r1))}}
@keyframes spDraw{to{stroke-dashoffset:0}}
@keyframes spFade{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
@keyframes spPin{0%{opacity:0;transform:translate(-50%,-190%) scale(.6)}22%{opacity:1}42%{transform:translate(-50%,-100%) scale(1.06)}54%{transform:translate(-50%,-88%) scale(.98)}66%,100%{opacity:1;transform:translate(-50%,-100%) scale(1)}}
@keyframes spRing{0%{opacity:.55;transform:translate(-50%,-50%) scale(.3)}100%{opacity:0;transform:translate(-50%,-50%) scale(2.6)}}
@keyframes spWalk{0%{opacity:0;transform:translate(var(--x0),var(--y0)) scale(.5)}14%{opacity:1}64%,84%{opacity:1;transform:translate(var(--x1),var(--y1)) scale(1)}100%{opacity:0;transform:translate(var(--x1),var(--y1)) scale(1.6)}}
@keyframes spBlink{0%,48%{opacity:1}50%,98%{opacity:.15}100%{opacity:1}}
@keyframes spHand{0%{transform:rotate(var(--a0))}70%{transform:rotate(calc(var(--a1) + 8deg))}100%{transform:rotate(var(--a1))}}
@keyframes spBox{0%{opacity:0;transform:translate(-120px,0) rotate(-8deg)}16%{opacity:1}44%,60%{opacity:1;transform:translate(0,0) rotate(0)}72%{opacity:1;transform:translate(26px,0) rotate(0)}86%,100%{opacity:0;transform:translate(26px,0) rotate(0)}}
@keyframes spDoor{0%,58%{transform:perspective(320px) rotateY(-104deg)}78%,100%{transform:perspective(320px) rotateY(0)}}
@keyframes spCode{0%,60%{opacity:0}72%,94%{opacity:1}100%{opacity:0}}
@keyframes spScan{0%{transform:translateY(-130%)}10%,90%{opacity:.95}100%{transform:translateY(130%)}}
@keyframes spPop{0%{opacity:0;transform:scale(.35) rotate(-18deg)}62%{opacity:1;transform:scale(1.14) rotate(5deg)}100%{opacity:1;transform:scale(1) rotate(0)}}
@keyframes spFloat{0%,100%{transform:translateY(0) rotate(-1.6deg)}50%{transform:translateY(-9px) rotate(1.6deg)}}
@keyframes spStar{0%{opacity:0;transform:scale(.2) rotate(-40deg)}70%{opacity:1;transform:scale(1.22) rotate(6deg)}100%{opacity:1;transform:scale(1) rotate(0)}}
@keyframes spParcel{0%{opacity:0;transform:translateX(-160px) rotate(-10deg)}12%{opacity:1;transform:translateX(0) rotate(0)}62%{opacity:1;transform:translateX(0) rotate(0)}78%,100%{opacity:0;transform:translateX(170px) rotate(7deg)}}
@keyframes spLid{0%,14%{transform:rotate(0)}24%,58%{transform:rotate(-118deg)}70%,100%{transform:rotate(0)}}
@keyframes spTickA{0%,20%{opacity:0;transform:translateX(-9px)}28%,68%{opacity:1;transform:none}76%,100%{opacity:0;transform:none}}
@keyframes spTickB{0%,30%{opacity:0;transform:translateX(-9px)}38%,68%{opacity:1;transform:none}76%,100%{opacity:0;transform:none}}
@keyframes spTickC{0%,40%{opacity:0;transform:translateX(-9px)}48%,68%{opacity:1;transform:none}76%,100%{opacity:0;transform:none}}
@keyframes spOk{0%,52%{opacity:0;transform:scale(2) rotate(-30deg)}60%{opacity:1;transform:scale(1) rotate(-11deg)}72%{opacity:1;transform:scale(1) rotate(-11deg)}80%,100%{opacity:0;transform:scale(1) rotate(-11deg)}}
@keyframes spBeat{0%,100%{transform:scale(1)}50%{transform:scale(1.07)}}
@keyframes spSlap{0%{opacity:0;transform:translate(-50%,-50%) scale(2.4) rotate(-26deg)}60%{opacity:1;transform:translate(-50%,-50%) scale(.94) rotate(-11deg)}100%{opacity:1;transform:translate(-50%,-50%) scale(1) rotate(-11deg)}}
@keyframes spSweep{0%{transform:translate(-60%,-60%) scale(.4);opacity:0}20%{opacity:1}100%{transform:translate(40%,40%) scale(1);opacity:0}}
@keyframes spAnsIn{0%{opacity:0;transform:translateY(8px)}100%{opacity:1;transform:none}}
@keyframes spPostOut{0%{opacity:1;transform:translate(-50%,-50%) rotate(0) scale(1)}30%{transform:translate(-50%,-50%) rotate(3deg) scale(1.03)}100%{opacity:0;transform:translate(-50%,-42%) rotate(-8deg) scale(.7)}}
@keyframes spArmOut{0%{opacity:1;transform:translateY(0) rotate(var(--r1))}32%{opacity:1;transform:translateY(3px) rotate(calc(var(--r1) * 2.2))}100%{opacity:0;transform:translateY(-16px) rotate(var(--r0))}}
.sp-rule{transition:transform .3s var(--ease-spring)}
.sp-rule:hover{transform:translateX(5px)}
.sp-num{transition:color .3s var(--ease-standard),transform .3s var(--ease-spring)}
.sp-rule:hover .sp-num{color:var(--violet-600);transform:scale(1.14)}
.sp-down{display:inline-flex;align-items:flex-start;gap:6px;text-decoration:none;cursor:pointer;transition:transform .3s var(--ease-spring)}
.sp-down:hover{transform:translateY(4px)}
.sp-side{transition:opacity .45s var(--ease-standard),transform .45s var(--ease-spring)}
.sp-arm{cursor:default}
.sp-cubes .swop-pc-card{background:none!important;box-shadow:none!important}
.sp-cubes .swop-pc-card::before,.sp-cubes .swop-pc-card::after{display:none!important}
.sp-cubes .swop-pc-wrap::before{opacity:.14!important;filter:blur(110px)!important}
@media (prefers-reduced-motion:reduce){.sp-fx{animation:none!important}}
`;

const spCl=(v,a,b)=>Math.min(b,Math.max(a,v));
const spSm=t=>t*t*(3-2*t);

function spPath(pts,k=.92){
  let d='M'+pts[0].x.toFixed(1)+' '+pts[0].y.toFixed(1);
  for(let i=0;i<pts.length-1;i++){
    const p0=pts[i-1]||pts[i],p1=pts[i],p2=pts[i+1],p3=pts[i+2]||pts[i+1];
    d+='C'+(p1.x+(p2.x-p0.x)/6*k).toFixed(1)+' '+(p1.y+(p2.y-p0.y)/6*k).toFixed(1)+' '
      +(p2.x-(p3.x-p1.x)/6*k).toFixed(1)+' '+(p2.y-(p3.y-p1.y)/6*k).toFixed(1)+' '
      +p2.x.toFixed(1)+' '+p2.y.toFixed(1);
  }
  return d;
}

function spLayout(W){
  const narrow=W<880;
  const cx=W/2, cp=(v,a,b)=>Math.round(Math.min(b,Math.max(a,v)));
  if(narrow){
    const bw=Math.min(430,Math.max(230,W-64)), BH=Math.round(224*(bw/404))+320, FY=300;
    const bly=FY+190, bry=bly+BH+430, H=bry+BH+430;
    const eL={x:Math.round(bw*.34),y:bly-26}, eR={x:Math.round(W-bw+bw*.52),y:bry-26};
    return {narrow,H,cx,FY,eL,eR,bw,stride:11,
      bl:{x:0,y:bly},br:{x:W-bw,y:bry},
      q:{left:0,top:44,width:W,textAlign:'left'},
      stem:spPath([{x:cx+14,y:-40},{x:cx-14,y:FY*.4},{x:cx+10,y:FY*.74},{x:cx,y:FY-4}]),
      left:spPath([{x:cx,y:FY+6},{x:cx-(cx-eL.x)*.42,y:FY+76},{x:eL.x-16,y:FY+(eL.y-FY)*.7},{x:eL.x,y:eL.y}]),
      right:spPath([{x:cx,y:FY+6},{x:W-32,y:FY+130},{x:W-26,y:(FY+eR.y)/2},{x:W-46,y:eR.y-170},{x:eR.x,y:eR.y}])};
  }
  const H=1900, FY=Math.round(H*.29), bw=404, spread=Math.min(330,W*.29);
  const eL={x:Math.round(cx-spread),y:Math.round(H*.50)};
  const eR={x:Math.round(cx+spread),y:Math.round(H*.62)};
  const arm=(e,bend)=>spPath([{x:cx,y:FY+6},{x:cx+(e.x-cx)*.34,y:FY+(e.y-FY)*.3},{x:cx+(e.x-cx)*(1+bend),y:FY+(e.y-FY)*.64},{x:e.x,y:e.y}]);
  return {narrow,H,cx,FY,eL,eR,bw,stride:13,
    bl:{x:cp(eL.x-bw/2,0,W-bw),y:eL.y+26},br:{x:cp(eR.x-bw/2,0,W-bw),y:eR.y+26},
    q:{right:W-cx+64,top:FY-230,width:460,textAlign:'right'},
    stem:spPath([{x:cx+16,y:-40},{x:cx-16,y:FY*.34},{x:cx+12,y:FY*.7},{x:cx,y:FY-4}]),
    left:arm(eL,.12),right:arm(eR,.1)};
}

/* shoe print — sole and separate heel, toes at the top. */
function Foot({side}){
  return (
    <g transform={'scale('+(side>0?-1:1)+',1)'}>
      <path d="M1.4-23C7.4-23 10.4-18 10.4-11.2 10.4-5.2 8.4-1 6.8 3.6L-5.4 1.2C-4.8-2.8-6-7-6-11.6-6-18.2-4.2-23 1.4-23Z"/>
      <path d="M-6.4 5.8 6.2 8.2C7 12.4 6.4 17.4 3 19.2-1.2 21.2-5.4 18.4-6.4 13.8-7 10.8-6.9 8-6.4 5.8Z"/>
    </g>
  );
}

function spFeet(d,stride,t0,t1,branch,phase){
  const pe=document.createElementNS('http://www.w3.org/2000/svg','path');
  pe.setAttribute('d',d);
  const total=pe.getTotalLength();
  const n=Math.max(3,Math.round(total/46));
  return Array.from({length:n},(_,i)=>{
    const u=(i+.5)/n,l=total*u;
    const a=pe.getPointAtLength(Math.max(0,l-4)),b=pe.getPointAtLength(Math.min(total,l+4));
    const ang=Math.atan2(b.y-a.y,b.x-a.x);
    const side=(i+phase)%2?1:-1;
    const p=pe.getPointAtLength(l);
    return {x:p.x+Math.cos(ang-Math.PI/2)*stride*side,y:p.y+Math.sin(ang-Math.PI/2)*stride*side,
      rot:ang*180/Math.PI+90+side*7,t:t0+(t1-t0)*u,side,branch,i};
  });
}

/* ---------- left destination: the meeting point ---------- */
function MeetMap({on,w=404}){
  const k=w/404;
  const road=(d,w,o,dl)=>(
    <path d={d} stroke="var(--violet-400)" strokeWidth={w} strokeLinecap="round" opacity={o} fill="none"
      style={{strokeDasharray:900,strokeDashoffset:on?900:900,animation:on?`spDraw 1.4s cubic-bezier(.3,.8,.3,1) ${dl}s forwards`:undefined}}/>
  );
  const dot=(x0,y0,x1,y1,dl,c)=>(
    <span aria-hidden="true" style={{position:'absolute',left:0,top:0,width:13,height:13,marginLeft:-6,marginTop:-6,borderRadius:'50%',background:c,border:'2px solid #fff',boxShadow:'0 2px 6px rgba(38,35,87,.3)',opacity:0,
      ['--x0']:x0+'px',['--y0']:y0+'px',['--x1']:x1+'px',['--y1']:y1+'px',animation:on?`spWalk 4.6s cubic-bezier(.4,.1,.3,1) ${dl}s infinite`:undefined}}/>
  );
  return (
    <div style={{position:'relative',height:Math.round(224*k),borderRadius:20,overflow:'hidden',background:'linear-gradient(158deg,#F5E2FE,#FBF3FE)',border:'var(--bw-hair) solid var(--border-subtle)'}}>
     <div style={{position:'absolute',left:0,top:0,width:404,height:224,transform:'scale('+k.toFixed(3)+')',transformOrigin:'0 0'}}>
      <svg width="404" height="224" viewBox="0 0 404 224" fill="none" aria-hidden="true" style={{position:'absolute',inset:0}}>
        <g opacity=".55" fill="var(--violet-200)">
          <rect x="18" y="16" width="86" height="52" rx="6"/><rect x="132" y="8" width="64" height="56" rx="6"/>
          <rect x="226" y="20" width="98" height="44" rx="6"/><rect x="24" y="112" width="72" height="66" rx="6"/>
          <rect x="252" y="120" width="86" height="60" rx="6"/><rect x="136" y="150" width="74" height="52" rx="6"/>
        </g>
        {road('M-10 92C60 88 120 96 200 88 268 82 320 96 414 88',3.4,.9,0)}
        {road('M118 -10C124 60 112 130 128 238',3,.8,.25)}
        {road('M-10 200C70 172 118 138 200 116 280 94 330 58 414 22',2.4,.6,.5)}
        {road('M-10 154C58 146 96 168 168 160',2,.45,.7)}
      </svg>
      <span aria-hidden="true" style={{position:'absolute',left:212,top:112,width:120,height:120,borderRadius:'50%',border:'2px solid var(--violet-500)',opacity:0,animation:on?'spRing 2.6s ease-out .9s infinite':undefined}}/>
      <span style={{position:'absolute',left:212,top:112,color:'var(--violet-700)',opacity:0,filter:'drop-shadow(0 6px 10px rgba(116,24,190,.35))',animation:on?'spPin .9s cubic-bezier(.2,.85,.3,1) .55s both':undefined}}>
        <Icon name="map-pin" size={40}/>
      </span>
      {dot(34,74,196,104,1.1,'var(--violet-600)')}
      {dot(358,186,228,120,1.5,'var(--violet-800)')}
      <span style={{position:'absolute',left:14,bottom:14,display:'flex',alignItems:'center',gap:9,whiteSpace:'nowrap',padding:'8px 14px 8px 10px',borderRadius:999,background:'rgba(255,255,255,.86)',backdropFilter:'blur(6px)',boxShadow:'var(--shadow-sm)',opacity:0,animation:on?'spFade .6s var(--ease-out) 1.1s both':undefined}}>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
          <circle cx="11" cy="11" r="9.2" stroke="var(--violet-600)" strokeWidth="1.8"/>
          <line x1="11" y1="11" x2="11" y2="5.6" stroke="var(--violet-700)" strokeWidth="1.8" strokeLinecap="round"
            style={{transformOrigin:'11px 11px',['--a0']:'0deg',['--a1']:'180deg',animation:on?'spHand 1.1s cubic-bezier(.3,.9,.3,1) 1.3s both':undefined}}/>
          <line x1="11" y1="11" x2="11" y2="7" stroke="var(--violet-500)" strokeWidth="1.8" strokeLinecap="round"
            style={{transformOrigin:'11px 11px',['--a0']:'0deg',['--a1']:'540deg',animation:on?'spHand 1.2s cubic-bezier(.3,.9,.3,1) 1.3s both':undefined}}/>
        </svg>
        <span style={{font:'600 21px/1 Caveat,cursive',color:'var(--violet-700)'}}>сьогодні о 18<span style={{animation:on?'spBlink 1.6s steps(1) 2s infinite':undefined}}>:</span>30</span>
      </span>
     </div>
    </div>
  );
}

/* ---------- right destination: the parcel locker ---------- */
function LockerBox({on,w=404}){
  const k=w/404;
  const cell=(n)=><span key={n} style={{borderRadius:5,background:'rgba(255,255,255,.1)',boxShadow:'inset 0 1px 0 rgba(255,255,255,.18)'}}/>;
  return (
    <div style={{position:'relative',height:Math.round(224*k),borderRadius:20,overflow:'hidden',background:'linear-gradient(158deg,#EBC6FD,#F5E2FE)',border:'var(--bw-hair) solid var(--border-subtle)'}}>
     <div style={{position:'absolute',left:0,top:0,width:404,height:224,transform:'scale('+k.toFixed(3)+')',transformOrigin:'0 0'}}>
      <span aria-hidden="true" style={{position:'absolute',left:0,right:0,bottom:0,height:46,background:'linear-gradient(180deg,rgba(116,24,190,.08),rgba(116,24,190,.16))'}}/>
      <div style={{position:'absolute',left:112,top:20,width:200,height:158,borderRadius:'16px 16px 6px 6px',background:'linear-gradient(162deg,var(--violet-600),var(--violet-800) 58%,var(--violet-950))',boxShadow:'0 24px 40px -18px rgba(38,35,87,.6),inset 0 1px 0 rgba(255,255,255,.24)',padding:12,display:'grid',gridTemplateColumns:'repeat(3,1fr)',gridTemplateRows:'repeat(3,1fr)',gap:7}}>
        {[0,1,2].map(cell)}
        <span style={{position:'relative',borderRadius:5,background:'#160A2F',boxShadow:'inset 0 2px 8px rgba(0,0,0,.7)',overflow:'hidden'}}>
          <span aria-hidden="true" style={{position:'absolute',left:'50%',top:'50%',width:34,height:26,marginLeft:-17,marginTop:-13,borderRadius:3,background:'linear-gradient(170deg,#F7E9D6,#E4CDAE)',boxShadow:'0 3px 6px rgba(0,0,0,.45)',opacity:0,animation:on?'spBox 4.4s cubic-bezier(.3,.7,.3,1) .4s infinite':undefined}}>
            <span style={{position:'absolute',left:'50%',top:0,bottom:0,width:5,marginLeft:-2.5,background:'rgba(116,24,190,.5)'}}/>
          </span>
          <span aria-hidden="true" style={{position:'absolute',inset:0,borderRadius:5,transformOrigin:'left center',background:'linear-gradient(120deg,rgba(255,255,255,.16),rgba(255,255,255,.06))',boxShadow:'inset 0 1px 0 rgba(255,255,255,.2)',animation:on?'spDoor 4.4s cubic-bezier(.3,.8,.3,1) .4s infinite':undefined}}/>
        </span>
        {[4,5,6,7,8].map(cell)}
      </div>
      <span style={{position:'absolute',left:130,top:186,display:'flex',alignItems:'center',gap:8,whiteSpace:'nowrap',padding:'7px 14px',borderRadius:999,background:'rgba(255,255,255,.9)',boxShadow:'var(--shadow-sm)',font:'600 20px/1 Caveat,cursive',color:'var(--violet-700)',opacity:0,animation:on?'spCode 4.4s ease .4s infinite':undefined}}>
        <Icon name="lock-keyhole" size={15}/>код 84-20
      </span>
      <span aria-hidden="true" style={{position:'absolute',right:16,top:26,display:'flex',flexDirection:'column',gap:6,alignItems:'flex-end',opacity:.55}}>
        <Icon name="truck" size={30}/>
      </span>
     </div>
    </div>
  );
}

/* ---------- safety scene A: verified people ---------- */
function DiiaMark({size=104}){
  return (
    <svg width={size} height={size} viewBox="0 0 1024 1024" fill="none" aria-label="Дія" role="img">
      <path d="M512 1024C736.36 1024 861.082 1024 942.541 942.541C1024 861.082 1024 736.434 1024 512C1024 287.566 1024 162.918 942.541 81.4588C861.082 0 736.36 0 512 0C287.64 0 162.918 0 81.4588 81.4588C0 162.918 0 287.64 0 512C0 736.36 0 861.082 81.4588 942.541C162.918 1024 287.64 1024 512 1024Z" fill="#111018"/>
      <path d="M704.294 410.767C665.617 410.767 636.91 440.624 636.91 477.464C636.91 507.544 658.06 531.014 684.835 537.959L629.947 622.036H681.214L727.876 543.789H762.803V622.036H805.603V410.767H704.294ZM710.181 508.046C692.578 508.046 681.678 494.231 681.678 478.485C681.678 462.739 691.668 447.736 710.181 447.736H762.859V508.046H710.181Z" fill="#fff"/>
      <path d="M469.904 410.767L455.699 449.871L513.985 449.537L479.467 576.135C469.625 613.049 508.099 640.938 540.928 619.232L615.59 568.578L593.606 536.269L519.036 587.926L569.3 410.767H469.904Z" fill="#fff"/>
      <path d="M550.289 383.601C566.645 383.601 579.905 371.655 579.905 356.919C579.905 342.183 566.645 330.236 550.289 330.236C533.932 330.236 520.672 342.183 520.672 356.919C520.672 371.655 533.932 383.601 550.289 383.601Z" fill="#fff"/>
      <path d="M399.216 583.039V361.669H234.981V479.819C234.981 535.412 218.882 569.782 209.394 582.946H189.934V679.501H231.583V622.422H387.296V679.594H428.926V583.039H399.216ZM276.388 477.386V400.941H356.51V582.909H253.085C262.462 567.572 276.388 528.542 276.388 477.386Z" fill="#fff"/>
    </svg>
  );
}

/* ---------- under the left arrow: how a meetup stays safe ---------- */
const SP_RULES=[
  {n:'01',d:'Річ бачиш на власні очі. Передумав — обмін можна просто не підтверджувати.'},
  {n:'02',d:'Репутація підказує, з ким обмін буде легким: оцінки й відгуки відкриті заздалегідь.'},
  {n:'03',d:'Тих, хто псує це все, ми просто прощаємо з платформою.'}
];

function MeetSafety(){
  const wrap=React.useRef(null),[on,setOn]=React.useState(false);
  React.useEffect(()=>{
    const el=wrap.current;if(!el)return;
    const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)setOn(true);}),{rootMargin:'-8% 0px -12% 0px'});
    io.observe(el);return()=>io.disconnect();
  },[]);
  return (
    <div ref={wrap} style={{marginTop:20,display:'flex',flexDirection:'column',gap:22}}>
      <div style={{display:'flex',alignItems:'center',gap:16}}>
        <span style={{position:'relative',flex:'0 0 auto',width:66,height:66,opacity:0,animation:on?'spPop .7s cubic-bezier(.2,.85,.25,1) .1s both':undefined}}>
          <span style={{display:'block',width:66,height:66,borderRadius:17,overflow:'hidden',boxShadow:'0 16px 28px -16px rgba(38,35,87,.7)',animation:on?'spFloat 5.4s ease-in-out 1s infinite':undefined}}>
            <DiiaMark size={66}/>
          </span>
        </span>
        <span style={{opacity:0,animation:on?'spFade .6s var(--ease-out) .35s both':undefined}}>
          <span style={{display:'flex',alignItems:'center',gap:8,font:'800 19px/1.25 var(--font-heading)',color:'var(--violet-950)'}}>Вхід — через Дію
            <span aria-hidden="true" style={{width:24,height:24,flex:'0 0 auto',borderRadius:'50%',display:'grid',placeItems:'center',background:'var(--violet-600)',color:'#fff',opacity:0,animation:on?'spPop .5s cubic-bezier(.2,.85,.25,1) .8s both':undefined}}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5 10 17.5 19 7"/></svg>
            </span>
          </span>
          <span style={{display:'block',marginTop:5,font:'var(--fw-regular) 16px/1.45 var(--font-text)',color:'var(--text-muted)',maxWidth:'30ch'}}>Один акаунт на одну людину — тому тут свої.</span>
        </span>
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:2}}>
        {SP_RULES.map((r,i)=>(
          <div key={r.n} className="sp-rule" style={{display:'flex',alignItems:'flex-start',gap:14,padding:'14px 0',borderTop:'var(--bw-hair) solid var(--border-subtle)',opacity:0,animation:on?`spAnsIn .6s var(--ease-out) ${.55+i*.14}s both`:undefined}}>
            <span className="sp-num" style={{flex:'0 0 auto',font:'900 26px/1.15 var(--font-heading)',color:'var(--violet-300)',display:'inline-block'}}>{r.n}</span>
            <span style={{font:'var(--fw-regular) 17px/1.5 var(--font-text)',color:'var(--violet-950)',textWrap:'pretty'}}>{r.d}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- under the right arrow: the counter check ---------- */
const SP_POST=[
  {n:'01',d:'Ваше оголошення вже відкрите у працівника на екрані — шукати щось у телефоні не треба.'},
  {n:'02',d:'Він звіряє річ із фото й описом. Збіглося — приймає й відправляє далі.'},
  {n:'03',d:'Доставку ділите навпіл: кожен платить за свою посилку.'}
];

function PostSafety(){
  const wrap=React.useRef(null),[on,setOn]=React.useState(false);
  React.useEffect(()=>{
    const el=wrap.current;if(!el)return;
    const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)setOn(true);}),{rootMargin:'-8% 0px -12% 0px'});
    io.observe(el);return()=>io.disconnect();
  },[]);
  return (
    <div ref={wrap} style={{marginTop:20,display:'flex',flexDirection:'column',gap:22}}>
      <div style={{display:'flex',alignItems:'center',gap:16}}>
        <span style={{position:'relative',flex:'0 0 auto',width:66,height:66,opacity:0,animation:on?'spPop .7s cubic-bezier(.2,.85,.25,1) .1s both':undefined}}>
          <span style={{position:'relative',display:'grid',placeItems:'center',width:66,height:66,borderRadius:17,background:'#fff',boxShadow:'0 16px 28px -16px rgba(38,35,87,.55)',animation:on?'spFloat 5.4s ease-in-out 1s infinite':undefined}}>
            <img src="np-logomark.png" alt="Нова пошта" width="62" height="62" style={{display:'block'}}/>
          </span>
        </span>
        <span style={{opacity:0,animation:on?'spFade .6s var(--ease-out) .35s both':undefined}}>
          <span style={{display:'flex',alignItems:'center',gap:8,font:'800 19px/1.25 var(--font-heading)',color:'var(--violet-950)'}}>Зустрічна доставка
            <span aria-hidden="true" style={{width:24,height:24,flex:'0 0 auto',borderRadius:'50%',display:'grid',placeItems:'center',background:'var(--violet-600)',color:'#fff',opacity:0,animation:on?'spPop .5s cubic-bezier(.2,.85,.25,1) .8s both, spBeat 3s ease-in-out 1.6s infinite':undefined}}>
              <Icon name="repeat" size={13}/>
            </span>
          </span>
          <span style={{display:'block',marginTop:5,font:'var(--fw-regular) 16px/1.45 var(--font-text)',color:'var(--text-muted)',maxWidth:'30ch'}}>Обидва здаєте посилки — і вони їдуть одна одній назустріч.</span>
        </span>
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:2}}>
        {SP_POST.map((r,i)=>(
          <div key={r.n} className="sp-rule" style={{display:'flex',alignItems:'flex-start',gap:14,padding:'14px 0',borderTop:'var(--bw-hair) solid var(--border-subtle)',opacity:0,animation:on?`spAnsIn .6s var(--ease-out) ${.55+i*.14}s both`:undefined}}>
            <span className="sp-num" style={{flex:'0 0 auto',font:'900 26px/1.15 var(--font-heading)',color:'var(--violet-300)',display:'inline-block'}}>{r.n}</span>
            <span style={{font:'var(--fw-regular) 17px/1.5 var(--font-text)',color:'var(--violet-950)',textWrap:'pretty'}}>{r.d}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Steps(){
  const inner=React.useRef(null),halo=React.useRef(null),postRef=React.useRef(null);
  const feet=React.useRef([]),fills=React.useRef([]);
  const hov=React.useRef(null);
  const [W,setW]=React.useState(1160);
  const [matched,setMatched]=React.useState(false);
  const [stage,setStage]=React.useState(0); /* 0 walking · 1 at the fork · 2 arrived */
  const [seen,setSeen]=React.useState({L:false,R:false});
  const [ever,setEver]=React.useState(false);
  React.useEffect(()=>{if(stage>0)setEver(true);},[stage]);
  const blk={L:React.useRef(null),R:React.useRef(null)};
  const maskRef=React.useRef(null),arrowRef=React.useRef(null),geoRef=React.useRef(null);
  const headRef=React.useRef(null),countRef=React.useRef(null),numRef=React.useRef(null),subRef=React.useRef(null),chainRef=React.useRef(null),fhov=React.useRef(-1);
  const [hR,setHR]=React.useState(0);
  const L=React.useMemo(()=>spLayout(W),[W]);

  /* the seam between the two roads: a faint dashed line that, once the postal
     block runs out, loosens into the same dotted footpath the page opens with */
  const G=React.useMemo(()=>{
    const cx=L.cx, j=L.br.y+(hR||520)-6;
    const top=L.narrow?j-170:L.bl.y-16;
    const sw=L.narrow?Math.min(72,W*.17):104;
    const way=[{x:cx,y:j},{x:cx+sw,y:j+120},{x:cx+sw*.34,y:j+252},{x:cx,y:j+346},{x:cx,y:j+452}];
    const end=way[way.length-1];
    return {seam:spPath([{x:cx,y:top},{x:cx,y:(top+j)/2},{x:cx,y:j}],.9),
      branch:spPath([{x:cx+sw*.95,y:j+112},{x:cx+sw+26,y:j+152},{x:cx+126,y:j+192},{x:cx+182,y:j+216}],.9),
      d:spPath(way,.9),top,j,sw,end,bottom:end.y-92};
  },[L,hR,W]);
  geoRef.current=G;
  const H2=Math.max(L.H,G.bottom);

  React.useEffect(()=>{
    const on=()=>setMatched(true);
    window.addEventListener('swopify:matched',on);
    return()=>window.removeEventListener('swopify:matched',on);
  },[]);

  React.useEffect(()=>{
    const el=inner.current;if(!el)return;
    const ro=new ResizeObserver(es=>{const w=Math.round(es[0].contentRect.width);if(w>0)setW(w);});
    ro.observe(el);return()=>ro.disconnect();
  },[]);

  React.useEffect(()=>{
    const io=new IntersectionObserver(es=>es.forEach(e=>{
      if(e.isIntersecting)setSeen(s=>s[e.target.dataset.side]?s:{...s,[e.target.dataset.side]:true});
    }),{rootMargin:'-12% 0px -18% 0px'});
    [blk.L.current,blk.R.current].forEach(el=>el&&io.observe(el));
    return()=>io.disconnect();
  },[]);

  React.useEffect(()=>{
    const el=blk.R.current;if(!el)return;
    const ro=new ResizeObserver(es=>{const h=Math.round(es[0].contentRect.height);if(h>0)setHR(h);});
    ro.observe(el);return()=>ro.disconnect();
  },[]);

  const marks=React.useMemo(()=>[
    ...spFeet(L.stem,L.stride,.02,.30,'S',0),
    ...spFeet(L.left,L.stride,.40,.62,'L',1),
    ...spFeet(L.right,L.stride,.40,.70,'R',0)
  ],[L]);

  React.useEffect(()=>{
    const el=inner.current;if(!el||!marks.length)return;
    let raf=0,st=-1;
    const tick=()=>{
      const r=el.getBoundingClientRect(),vh=window.innerHeight;
      const start=vh*.55,end=-(r.height-vh*.5);
      const p=spCl((start-r.top)/Math.max(1,start-end),0,1);
      let lead=-1;
      /* each print fills from its OWN position on screen, with a head start:
         it starts going violet while still ~10% below the fold and is full by
         the time it reaches the lower third — so the colour runs ahead of the
         reader instead of trailing the scroll of a very tall section */
      const lead0=vh*1.02,span=vh*.52;
      marks.forEach((m,i)=>{
        const g=feet.current[i],f=fills.current[i];if(!g)return;
        const a=spSm(spCl((lead0-(r.top+m.y))/span,0,1));
        if(m.branch==='S'&&a>.5)lead=i;
        const dim=hov.current&&m.branch!=='S'&&m.branch!==hov.current?.34:1;
        const fh=fhov.current===i;
        const hot=(hov.current===m.branch?1.1:1)*(fh?1.32:1);
        g.style.opacity=((.2+.8*a)*dim).toFixed(3);
        g.style.transform='translate('+m.x.toFixed(1)+'px,'+m.y.toFixed(1)+'px) rotate('+(m.rot+(fh?m.side*6:0)).toFixed(1)+'deg) scale('+((.84+.16*a)*hot).toFixed(3)+')';
        if(f){f.style.opacity=Math.max(a,fh?1:0).toFixed(3);f.style.transform='scale('+((1+.14*Math.sin(spCl(a,0,1)*Math.PI))*(fh?1.06:1)).toFixed(3)+')';}
      });
      if(halo.current){
        const m=marks[Math.max(0,lead)];
        halo.current.style.opacity=(lead>=0&&lead<marks.length-1?.5:0).toFixed(2);
        halo.current.style.transform='translate('+m.x.toFixed(1)+'px,'+m.y.toFixed(1)+'px)';
      }
      /* the walked part starts only where the postal block ends: from there a
         dot runs down the seam and turns it violet behind itself */
      const g=geoRef.current,mk=maskRef.current;
      if(g&&mk){
        const len=mk.getTotalLength();
        const rev=spCl((vh*.72-(r.top+g.j))/Math.max(1,(g.end.y-g.j)*.86),0,1);
        mk.style.strokeDasharray=len.toFixed(1);
        mk.style.strokeDashoffset=(len*(1-rev)).toFixed(1);
        if(headRef.current){
          const hp=mk.getPointAtLength(len*rev);
          headRef.current.style.transform='translate3d('+hp.x.toFixed(1)+'px,'+hp.y.toFixed(1)+'px,0) translate(-50%,-50%)';
          headRef.current.style.opacity=(rev>.006&&rev<.995?1:0).toFixed(2);
        }
        if(arrowRef.current)arrowRef.current.style.opacity=spCl((rev-.9)/.08,0,1).toFixed(3);
        if(chainRef.current){
          const c=spSm(spCl((rev-.08)/.34,0,1));
          chainRef.current.style.opacity=c.toFixed(3);
          chainRef.current.style.transform='translateY('+((1-c)*30).toFixed(1)+'px)';
        }
        if(countRef.current){
          const a=spSm(spCl((rev-.18)/.42,0,1));
          countRef.current.style.opacity=spCl(a*1.8,0,1).toFixed(3);
          if(numRef.current){
            const v=Math.round(148920*(1-Math.pow(1-a,3)));
            numRef.current.textContent=v.toLocaleString('uk-UA').replace(/\u00a0/g,' ');
            numRef.current.style.filter='blur('+((1-a)*7).toFixed(2)+'px)';
            numRef.current.style.transform='translateY('+((1-a)*-14).toFixed(1)+'px) scale('+(1+(1-a)*.06).toFixed(3)+')';
          }
          if(subRef.current){
            const b=spSm(spCl((rev-.5)/.24,0,1));
            subRef.current.style.opacity=b.toFixed(3);
            subRef.current.style.transform='translateY('+((1-b)*14).toFixed(1)+'px)';
            subRef.current.style.filter='blur('+((1-b)*4).toFixed(2)+'px)';
          }
        }
      }
      const s=p>.5?2:p>.28?1:0;
      if(s!==st){st=s;setStage(s);}
      raf=requestAnimationFrame(tick);
    };
    raf=requestAnimationFrame(tick);
    return()=>cancelAnimationFrame(raf);
  },[marks]);

  const big={font:'800 '+(L.narrow?34:44)+'px/1.08 var(--font-display)',letterSpacing:'var(--ls-display)',color:'var(--violet-950)',margin:0,transform:'skewX(-8deg)',transformOrigin:'0 100%',textWrap:'pretty'};
  const em={color:'var(--violet-600)'};
  const sub={font:'var(--fw-regular) 17px/1.5 var(--font-text)',color:'var(--text-muted)',margin:'12px 0 0',maxWidth:'30ch'};
  const arm=(dirLeft)=>({position:'absolute',top:dirLeft?-14:30,[dirLeft?'right':'left']:'50%',[dirLeft?'marginRight':'marginLeft']:9,width:L.narrow?150:186,height:46,display:'flex',alignItems:'center',
    justifyContent:dirLeft?'flex-end':'flex-start',padding:dirLeft?'0 16px 0 30px':'0 30px 0 16px',
    background:'linear-gradient(170deg,var(--violet-600),var(--violet-800))',color:'#fff',boxShadow:'0 12px 24px -12px rgba(38,35,87,.7)',
    clipPath:dirLeft?'polygon(0 50%,24px 0,100% 0,100% 100%,24px 100%)':'polygon(0 0,calc(100% - 24px) 0,100% 50%,calc(100% - 24px) 100%,0 100%)',
    font:'700 '+(L.narrow?15:17)+'px/1 var(--font-display)',letterSpacing:'.01em',whiteSpace:'nowrap',
    ['--r0']:dirLeft?'-14deg':'14deg',['--r1']:dirLeft?'-2.5deg':'2.5deg',transform:'rotate('+(dirLeft?-2.5:2.5)+'deg)',opacity:0,
    animation:stage>0?`spArmIn .7s cubic-bezier(.2,.85,.25,1) ${dirLeft?.15:.3}s both`
      :ever?`spArmOut .5s cubic-bezier(.4,0,.7,.2) ${dirLeft?.1:0}s both`:undefined});

  const block=(side)=>{
    const b=side==='L'?L.bl:L.br;
    return {position:'absolute',left:b.x,top:b.y,width:L.bw,zIndex:3};
  };

  return (
    <section id="steps" style={{position:'relative',marginTop:-190,zIndex:2,background:'linear-gradient(180deg,rgba(251,243,254,0) 0%,#FBF3FE 16%,#FDFAFF 64%,var(--surface-card) 100%)'}}>
      <style>{SP_CSS}</style>
      <span aria-hidden="true" style={{position:'absolute',left:0,right:0,top:120,height:260,pointerEvents:'none',backdropFilter:'blur(12px)',WebkitBackdropFilter:'blur(12px)',WebkitMaskImage:'linear-gradient(180deg,transparent 0%,#000 46%,#000 74%,transparent 100%)',maskImage:'linear-gradient(180deg,transparent 0%,#000 46%,#000 74%,transparent 100%)',background:'linear-gradient(180deg,rgba(251,243,254,0) 0%,rgba(251,243,254,.6) 52%,rgba(251,243,254,.88) 78%,rgba(251,243,254,0) 100%)'}}/>
      <span aria-hidden="true" style={{position:'absolute',left:0,right:0,bottom:-170,height:340,pointerEvents:'none',zIndex:0,backdropFilter:'blur(16px)',WebkitBackdropFilter:'blur(16px)',WebkitMaskImage:'linear-gradient(180deg,transparent 0%,#000 40%,#000 68%,transparent 100%)',maskImage:'linear-gradient(180deg,transparent 0%,#000 40%,#000 68%,transparent 100%)',background:'linear-gradient(180deg,rgba(253,250,255,0) 0%,rgba(251,244,254,.6) 46%,rgba(246,233,254,.72) 74%,rgba(246,233,254,0) 100%)'}}/>
      <div style={{maxWidth:'var(--page-max)',margin:'0 auto',padding:'0 var(--gutter-web)',position:'relative',zIndex:1}}>
        <div ref={inner} style={{position:'relative',height:H2,opacity:matched?1:0,transition:'opacity .8s var(--ease-standard)',pointerEvents:matched?'auto':'none'}}>
          <svg width={W} height={H2} viewBox={'0 0 '+W+' '+H2} fill="none" aria-hidden="true" style={{position:'absolute',left:0,top:0,overflow:'visible'}}>
            <defs>
              <mask id="spDivReveal" maskUnits="userSpaceOnUse" x="-60" y="-60" width={W+120} height={H2+120}>
                <path ref={maskRef} d={G.d} stroke="#fff" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" fill="none" style={{strokeDashoffset:99999}}/>
              </mask>
            </defs>
            <path d={G.seam} stroke="var(--violet-300)" strokeWidth="2.4" strokeLinecap="round" strokeDasharray="2 14" opacity=".34"/>
            {!L.narrow&&<path d={G.branch} stroke="var(--violet-300)" strokeWidth="2.4" strokeLinecap="round" strokeDasharray="2 12" opacity=".5"/>}
            <path d={G.d} stroke="var(--violet-300)" strokeWidth="2.4" strokeLinecap="round" strokeDasharray="2 14" opacity=".34"/>
            <path d={G.d} stroke="var(--violet-500)" strokeWidth="3.4" strokeLinecap="round" strokeDasharray="2.8 12" mask="url(#spDivReveal)"/>
            <g ref={arrowRef} style={{opacity:0}} transform={'translate('+G.end.x.toFixed(1)+' '+G.end.y.toFixed(1)+')'}>
              <path d="M-13 -14L0 0L13 -14" stroke="var(--violet-500)" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            <path d={L.stem} stroke="var(--violet-200)" strokeWidth="2" strokeLinecap="round" strokeDasharray="1 14" opacity=".8"/>
            <path d={L.left} stroke="var(--violet-200)" strokeWidth="2" strokeLinecap="round" strokeDasharray="1 14" opacity=".8"/>
            <path d={L.right} stroke="var(--violet-200)" strokeWidth="2" strokeLinecap="round" strokeDasharray="1 14" opacity=".8"/>
            <g ref={halo} className="sp-fx" style={{opacity:0}}>
              <circle r="34" fill="var(--violet-300)" opacity=".3" style={{filter:'blur(10px)'}}/>
            </g>
            {marks.map((m,i)=>(
              <g key={i} ref={e=>feet.current[i]=e} style={{opacity:0,animation:matched&&m.branch==='S'&&m.i<4?`spStamp .5s cubic-bezier(.2,.8,.25,1) ${.15+m.i*.13}s both`:undefined}}
                onPointerEnter={()=>fhov.current=i} onPointerLeave={()=>{if(fhov.current===i)fhov.current=-1;}}>
                <g style={{fill:'var(--violet-300)',opacity:.9}}><Foot side={m.side}/></g>
                <g ref={e=>fills.current[i]=e} style={{fill:'var(--violet-600)',opacity:0,transformOrigin:'center',transformBox:'fill-box',filter:'drop-shadow(0 3px 8px rgba(116,24,190,.35))'}}><Foot side={m.side}/></g>
              </g>
            ))}
          </svg>

          {/* the dot that walks the last stretch, and the tally it picks up */}
          <span ref={headRef} aria-hidden="true" style={{position:'absolute',left:0,top:0,width:16,height:16,borderRadius:'50%',background:'var(--violet-500)',boxShadow:'0 0 0 6px rgba(166,63,233,.16),0 6px 16px rgba(116,24,190,.45)',opacity:0,pointerEvents:'none',zIndex:4}}/>
          {!L.narrow&&<div ref={chainRef} className="sp-cubes" style={{position:'absolute',zIndex:3,opacity:0,left:L.cx+150,top:G.j+20,width:400}}>
            <ParcelCubes title={null} subtitle={null}/>
          </div>}

          <div ref={countRef} style={{position:'absolute',top:G.j+156,zIndex:3,opacity:0,
            ...(L.narrow?{left:0,width:Math.max(200,W-40),textAlign:'left'}:{right:W-L.cx+56,width:420,textAlign:'right'})}}>
            <p style={{...big,fontSize:L.narrow?32:46,transform:'skewX(-8deg) rotate(-1deg)'}}>
              <span ref={numRef} style={{...em,fontVariantNumeric:'tabular-nums',display:'inline-block',willChange:'filter,transform'}}>0</span> речей
            </p>
            <p ref={subRef} style={{...sub,marginLeft:L.narrow?0:'auto',opacity:0}}>уже помінялись на swopify. Середній матч знаходиться за 1.8 дня.</p>
          </div>

          {/* the question, hugging the road from the left */}
          <div style={{position:'absolute',zIndex:3,...L.q}}>
            <p style={{...big,fontSize:L.narrow?34:52,transform:'skewX(-8deg) rotate(-1.4deg)'}}>Ви в <span style={em}>одному місті</span>?</p>
            <span style={{display:'inline-block',marginTop:10}}><Note rotate={-3} size={L.narrow?21:25}>звідси дорога роздвоюється</Note></span>
          </div>

          {/* the signpost at the fork */}
          <div ref={postRef} style={{position:'absolute',left:L.cx,top:L.FY-58,zIndex:4,opacity:0,transform:'translate(-50%,-50%)',
            animation:stage>0?'spPostIn .8s cubic-bezier(.2,.85,.25,1) both':ever?'spPostOut .6s cubic-bezier(.4,0,.7,.2) .22s both':undefined}}>
            <span aria-hidden="true" style={{position:'absolute',left:'50%',top:-46,marginLeft:-5,width:10,height:150,borderRadius:5,background:'linear-gradient(180deg,var(--violet-700),var(--violet-500))',boxShadow:'0 10px 20px -10px rgba(38,35,87,.6)'}}/>
            <span className="sp-arm" style={arm(true)}>в одному</span>
            <span className="sp-arm" style={arm(false)}>у різних</span>
          </div>

          {/* left: meet in person */}
          <div className="sp-side" ref={blk.L} data-side="L" style={block('L')}
            onPointerEnter={()=>hov.current='L'} onPointerLeave={()=>{if(hov.current==='L')hov.current=null;}}>
            <MeetMap on={seen.L} w={L.bw}/>
            <p style={{...big,marginTop:22,transform:'skewX(-8deg) rotate(-1.1deg)'}}>Зустріньтесь і <span style={em}>поміняйтесь</span>.</p>
            <p style={sub}>Час і місце домовляєте в додатку, на мапі. Далі дві хвилини і по каві.</p>
            <span className="sp-down" style={{alignItems:'flex-start',gap:8,marginTop:14}}>
              <Arrow kind="dropIn" width={26} rotate={-14} delay={.2}/>
              <Note rotate={-4} size={23} style={{marginTop:14}}>а звідки взагалі довіра?</Note>
            </span>
            <MeetSafety/>
          </div>

          {/* right: send it */}
          <div className="sp-side" ref={blk.R} data-side="R" style={block('R')}
            onPointerEnter={()=>hov.current='R'} onPointerLeave={()=>{if(hov.current==='R')hov.current=null;}}>
            <LockerBox on={seen.R} w={L.bw}/>
            <p style={{...big,marginTop:22,transform:'skewX(-8deg) rotate(1.2deg)'}}>Або <span style={em}>Новою поштою</span>.</p>
            <p style={sub}>Обидва здають посилки — і кожна їде далі тільки після перевірки на відділенні.</p>
            <span className="sp-down" style={{alignItems:'flex-start',gap:8,marginTop:14}}>
              <Arrow kind="dropIn" width={26} rotate={10} delay={.3}/>
              <Note rotate={3} size={23} style={{marginTop:14}}>а хто за цим стежить?</Note>
            </span>
            <PostSafety/>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window,{Steps,MeetMap,LockerBox,MeetSafety,PostSafety,SP_CSS});
