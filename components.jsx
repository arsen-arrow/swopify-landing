window.SwopifyDesignSystem_ad534d = {};
(function(){

/* Swopify uses Lucide (rounded 2px stroke) served from CDN as a CSS mask, so a
   glyph inherits currentColor and needs no runtime JS. No icon set shipped with
   the source material -- see readme.md > Iconography for the substitution note. */
const CDN='https://unpkg.com/lucide-static@0.544.0/icons/';

function Icon({name,size=20,strokeAlt=false,style,...rest}){
  const url=CDN+name+'.svg';
  return (
    <span aria-hidden="true" {...rest} style={{
      display:'inline-block',flex:'0 0 auto',width:size,height:size,
      backgroundColor:'currentColor',
      WebkitMaskImage:`url("${url}")`,maskImage:`url("${url}")`,
      WebkitMaskRepeat:'no-repeat',maskRepeat:'no-repeat',
      WebkitMaskPosition:'center',maskPosition:'center',
      WebkitMaskSize:'contain',maskSize:'contain',
      opacity:strokeAlt?.62:1,...style}}/>
  );
}

window.SwopifyDesignSystem_ad534d.Icon=Icon;
})();
(function(){
const {Icon}=window.SwopifyDesignSystem_ad534d;


const SIZES={
  sm:{h:36,px:'var(--sp-4)',font:'var(--type-label-sm)',gap:6,icon:16},
  md:{h:44,px:'var(--sp-5)',font:'var(--type-label-md)',gap:8,icon:20},
  lg:{h:54,px:'var(--sp-6)',font:'var(--fw-bold) var(--fs-16)/1.2 var(--font-text)',gap:10,icon:20}
};
const VARIANTS={
  primary:{bg:'var(--action-brand-bg)',hover:'var(--action-brand-bg-hover)',active:'var(--action-brand-bg-active)',fg:'var(--action-brand-fg)',border:'transparent',shadow:'var(--shadow-sm)'},
  soft:{bg:'var(--action-soft-bg)',hover:'var(--action-soft-bg-hover)',active:'var(--action-soft-bg-active)',fg:'var(--action-soft-fg)',border:'transparent',shadow:'none'},
  outline:{bg:'var(--action-outline-bg)',hover:'var(--action-outline-bg-hover)',active:'var(--action-outline-bg-active)',fg:'var(--action-outline-fg)',border:'var(--border-default)',shadow:'none'},
  ghost:{bg:'transparent',hover:'var(--action-ghost-bg-hover)',active:'var(--ink-100)',fg:'var(--action-ghost-fg)',border:'transparent',shadow:'none'},
  danger:{bg:'var(--action-danger-bg)',hover:'var(--action-danger-bg-hover)',active:'var(--cherry-600)',fg:'var(--action-danger-fg)',border:'transparent',shadow:'var(--shadow-sm)'}
};

function Button({children,variant='primary',size='md',iconLeft,iconRight,fullWidth=false,loading=false,disabled=false,as='button',style,...rest}){
  const [hover,setHover]=React.useState(false);
  const [press,setPress]=React.useState(false);
  const s=SIZES[size]||SIZES.md;
  const v=VARIANTS[variant]||VARIANTS.primary;
  const off=disabled||loading;
  const Tag=as;
  return (
    <Tag disabled={as==='button'?off:undefined} {...rest}
      onMouseEnter={()=>setHover(true)} onMouseLeave={()=>{setHover(false);setPress(false);}}
      onMouseDown={()=>setPress(true)} onMouseUp={()=>setPress(false)}
      style={{
        display:'inline-flex',alignItems:'center',justifyContent:'center',gap:s.gap,
        width:fullWidth?'100%':'auto',minHeight:s.h,height:s.h,padding:`0 ${s.px}`,
        font:s.font,letterSpacing:'var(--ls-body)',whiteSpace:'nowrap',
        background:off?'var(--action-disabled-bg)':(press?v.active:hover?v.hover:v.bg),
        color:off?'var(--action-disabled-fg)':v.fg,
        border:`var(--bw-hair) solid ${off?'transparent':v.border}`,
        borderRadius:'var(--r-pill)',boxShadow:off?'none':v.shadow,
        cursor:off?'not-allowed':'pointer',textDecoration:'none',
        transform:press&&!off?'scale(var(--press-scale))':'scale(1)',
        transition:'background var(--dur-fast) var(--ease-standard),transform var(--dur-fast) var(--ease-spring),box-shadow var(--dur-fast) var(--ease-standard)',
        ...style}}>
      {loading?<Icon name="loader-circle" size={s.icon} style={{animation:'swop-spin 900ms linear infinite'}}/>:iconLeft?<Icon name={iconLeft} size={s.icon}/>:null}
      {children}
      {iconRight&&!loading?<Icon name={iconRight} size={s.icon}/>:null}
      <style>{'@keyframes swop-spin{to{transform:rotate(360deg)}}'}</style>
    </Tag>
  );
}

window.SwopifyDesignSystem_ad534d.Button=Button;
})();
(function(){
const {Icon}=window.SwopifyDesignSystem_ad534d;


const TONES={
  neutral:{bg:'var(--surface-sunken)',fg:'var(--text-body)'},
  brand:{bg:'var(--state-offer-bg)',fg:'var(--state-offer-fg)'},
  pending:{bg:'var(--state-pending-bg)',fg:'var(--state-pending-fg)'},
  done:{bg:'var(--state-done-bg)',fg:'var(--state-done-fg)'},
  declined:{bg:'var(--state-declined-bg)',fg:'var(--state-declined-fg)'},
  want:{bg:'var(--state-want-bg)',fg:'var(--state-want-fg)'},
  inverse:{bg:'var(--surface-inverse)',fg:'var(--text-on-inverse)'}
};

function Badge({children,tone='neutral',icon,dot=false,style,...rest}){
  const t=TONES[tone]||TONES.neutral;
  return (
    <span {...rest} style={{
      display:'inline-flex',alignItems:'center',gap:5,
      padding:'4px var(--sp-2)',background:t.bg,color:t.fg,
      font:'var(--type-label-sm)',borderRadius:'var(--r-pill)',
      whiteSpace:'nowrap',...style}}>
      {dot&&<span style={{width:6,height:6,borderRadius:'var(--r-pill)',background:'currentColor'}}/>}
      {icon&&<Icon name={icon} size={13}/>}
      {children}
    </span>
  );
}

window.SwopifyDesignSystem_ad534d.Badge=Badge;
})();
(function(){
const {Icon}=window.SwopifyDesignSystem_ad534d;

/* Ported from a community CSS button (uiverse.io, marcelodolza) and re-skinned
   onto the Swop Violet ramp. React drives the states (hover / press / fired)
   instead of the original's :focus hack, and the arrow travel + second-label
   position are measured from the DOM instead of guessed from the width. */
const CSS = `
.swop-hb{--hb-white:#FDF2FF;--hb-100:var(--violet-200);--hb-200:var(--violet-300);--hb-300:var(--violet-400);--hb-400:var(--violet-600);--hb-500:var(--violet-800);--hb-shadow:91 23 149;--hb-radius:20px;--hb-arrow-x:-140px;border-radius:var(--hb-radius);outline:none;cursor:pointer;font-size:22px;font-family:var(--font-display);background:transparent;letter-spacing:-.5px;border:0;position:relative;padding:0;-webkit-tap-highlight-color:transparent}
.swop-hb .hb-bg{position:absolute;inset:0;border-radius:inherit;filter:blur(1px)}
.swop-hb .hb-bg::before,.swop-hb .hb-bg::after{content:"";position:absolute;inset:0;border-radius:calc(var(--hb-radius) * 1.1);background:var(--hb-500)}
.swop-hb .hb-bg::before{filter:blur(18px);transition:all .3s ease;box-shadow:0 20px 40px 0 rgb(var(--hb-shadow)/55%),0 8px 16px 0 rgb(var(--hb-shadow)/35%)}
.swop-hb .hb-wrap{border-radius:inherit;overflow:hidden;height:100%;transform:translate(6px,-6px);padding:0;background:none;position:relative;transition:transform .3s ease}
.swop-hb .hb-outline{position:absolute;overflow:hidden;inset:0;opacity:0;outline:none;border-radius:inherit;transition:opacity .4s ease}
.swop-hb .hb-outline::before{content:"";position:absolute;inset:2px;width:120px;height:300px;margin:auto;background:linear-gradient(to right,transparent 0%,#fff 50%,transparent 100%);animation:hbSpin 3s linear infinite;animation-play-state:paused}
.swop-hb .hb-content{pointer-events:none;display:flex;align-items:center;justify-content:center;z-index:1;position:relative;height:100%;gap:16px;border-radius:calc(var(--hb-radius) * .85);font-weight:700;transition:box-shadow .3s ease;background:linear-gradient(to bottom,var(--hb-300) 0%,var(--hb-400) 100%);box-shadow:inset -2px 12px 11px -5px var(--hb-200),inset 1px -3px 11px 0 rgb(0 0 0/35%);overflow:hidden}
.swop-hb .hb-content::before{content:"";inset:0;position:absolute;z-index:10;width:80%;top:45%;bottom:35%;opacity:.7;margin:auto;background:linear-gradient(to bottom,transparent,var(--hb-400));filter:brightness(1.3) blur(5px)}
.swop-hb .hb-char{display:flex;align-items:center;justify-content:center;white-space:nowrap}
.swop-hb .hb-char span{display:block;color:transparent;position:relative}
.swop-hb .hb-char span[data-space]{width:.32em}
.swop-hb .hb-char span::before,.swop-hb .hb-char span::after{content:attr(data-label);position:absolute;left:0;top:0;color:var(--hb-white);text-shadow:-1px 1px 2px var(--hb-500);white-space:pre}
.swop-hb .hb-char span::before{opacity:0;transform:translateY(-100%)}
.swop-hb .hb-s1 span{animation:hbAppear 1.2s ease backwards calc(var(--i) * .03s)}
.swop-hb .hb-s2{position:absolute;left:0;right:0;pointer-events:none;justify-content:center}
.swop-hb .hb-s2 span::after{opacity:0}
.swop-hb:hover .hb-s1 span::before{animation:hbAppear .7s ease calc(var(--i) * .03s)}
.swop-hb:hover .hb-s1 span::after{opacity:1;animation:hbDisappear .7s ease calc(var(--i) * .03s)}
.swop-hb:hover .hb-wrap{transform:translate(8px,-8px)}
.swop-hb:hover .hb-outline{opacity:1}
.swop-hb:hover .hb-outline::before,.swop-hb:hover .hb-icon div::before,.swop-hb:hover .hb-icon div::after,.swop-hb:hover .hb-icon div{animation-play-state:running}
.swop-hb .hb-icon{animation:hbResetArrow .8s cubic-bezier(.7,-.5,.3,1.2) forwards;z-index:10;flex:none}
.swop-hb .hb-icon div,.swop-hb .hb-icon div::before,.swop-hb .hb-icon div::after{height:3px;border-radius:1px;background-color:var(--hb-white)}
.swop-hb .hb-icon div::before,.swop-hb .hb-icon div::after{content:"";position:absolute;right:0;transform-origin:center right;width:14px;border-radius:15px;transition:all .3s ease}
.swop-hb .hb-icon div{position:relative;width:24px;box-shadow:-2px 2px 5px var(--hb-400);transform:scale(.9);background:linear-gradient(to bottom,var(--hb-white),var(--hb-100));animation:hbSwing 1s ease-in-out infinite;animation-play-state:paused}
.swop-hb .hb-icon div::before{transform:rotate(44deg);top:1px;box-shadow:1px -2px 3px -1px var(--hb-400);animation:hbLine1 1s linear infinite;animation-play-state:paused}
.swop-hb .hb-icon div::after{bottom:1px;transform:rotate(316deg);box-shadow:-2px 2px 3px 0 var(--hb-400);background:linear-gradient(200deg,var(--hb-white),var(--hb-100));animation:hbLine2 1s linear infinite;animation-play-state:paused}
.swop-hb .hb-path{position:absolute;z-index:13;top:-6px;left:6px;stroke-dasharray:150 480;stroke-dashoffset:150;pointer-events:none;overflow:visible}
.swop-hb .hb-splash{position:absolute;top:50%;left:50%;width:160%;height:250%;translate:-50% -50%;pointer-events:none;stroke-dasharray:60 60;stroke-dashoffset:60;stroke:var(--hb-300);z-index:0}
.swop-hb.is-press .hb-bg::before{opacity:.7;box-shadow:0 10px 20px 0 rgb(var(--hb-shadow)/45%)}
.swop-hb.is-press .hb-content{box-shadow:inset -1px 12px 8px -5px rgb(var(--hb-shadow)/40%),inset 0 -3px 8px 0 var(--hb-200)}
.swop-hb.is-press .hb-outline{opacity:0}
.swop-hb.is-press .hb-wrap{transform:translate(3px,-3px)}
.swop-hb.is-fired .hb-splash{animation:hbSplash .8s cubic-bezier(.3,0,0,1) forwards .05s}
.swop-hb.is-fired .hb-path{animation:hbPath 1.6s ease forwards .2s}
.swop-hb.is-fired .hb-icon{animation:hbArrow 1s cubic-bezier(.7,-.5,.3,1.5) forwards}
.swop-hb.is-fired .hb-s1 span::before,.swop-hb.is-fired .hb-s1 span::after{animation:hbDisappear .5s ease forwards calc(var(--i) * .03s)}
.swop-hb.is-fired .hb-s1 span{animation:hbDisappear .5s ease forwards calc(var(--i) * .03s)}
.swop-hb.is-fired .hb-s2 span::after{opacity:1;animation:hbAppear 1s ease backwards calc(var(--i) * .03s)}
.swop-hb:focus-visible .hb-bg::after{outline:3px solid var(--violet-400);outline-offset:4px}
@keyframes hbSpin{to{transform:rotate(360deg)}}
@keyframes hbAppear{0%{transform:translateY(50%);opacity:0;filter:blur(20px)}20%{transform:translateY(70%);opacity:1}50%{transform:translateY(-15%);opacity:1;filter:blur(0)}100%{transform:translateY(0);opacity:1}}
@keyframes hbDisappear{0%{transform:translateY(0);opacity:1}100%{transform:translateY(-70%);opacity:0;filter:blur(3px)}}
@keyframes hbArrow{0%{opacity:1}50%{transform:translateX(60px);opacity:0}51%{transform:translateX(-200px);opacity:0}100%{transform:translateX(var(--hb-arrow-x));opacity:1}}
@keyframes hbSwing{50%{transform:translateX(5px) scale(.9)}}
@keyframes hbLine1{50%{transform:rotate(30deg)}80%{transform:rotate(55deg)}}
@keyframes hbLine2{50%{transform:rotate(330deg)}80%{transform:rotate(300deg)}}
@keyframes hbResetArrow{0%{transform:translateX(var(--hb-arrow-x))}100%{transform:translateX(0)}}
@keyframes hbPath{from{stroke:#fff}to{stroke-dashoffset:-480;stroke:var(--violet-200)}}
@keyframes hbSplash{to{stroke-dasharray:2 60;stroke-dashoffset:-60}}
@media (prefers-reduced-motion:reduce){.swop-hb *,.swop-hb *::before,.swop-hb *::after{animation:none!important;transition:none!important}.swop-hb .hb-s2{display:none}}
`;

const SPLASH = [
  ['M54.1054 99.7837C54.1054 99.7837 40.0984 90.7874 26.6893 97.6362C13.2802 104.485 1.5 97.6362 1.5 97.6362', 1],
  ['M285.273 99.7841C285.273 99.7841 299.28 90.7879 312.689 97.6367C326.098 104.486 340.105 95.4893 340.105 95.4893', 1],
  ['M281.133 64.9917C281.133 64.9917 287.96 49.8089 302.934 48.2295C317.908 46.6501 319.712 36.5272 319.712 36.5272', .3],
  ['M281.133 138.984C281.133 138.984 287.96 154.167 302.934 155.746C317.908 157.326 319.712 167.449 319.712 167.449', .3],
  ['M230.578 57.4476C230.578 57.4476 225.785 41.5051 236.061 30.4998C246.337 19.4945 244.686 12.9998 244.686 12.9998', 1],
  ['M230.578 150.528C230.578 150.528 225.785 166.471 236.061 177.476C246.337 188.481 244.686 194.976 244.686 194.976', 1],
  ['M170.392 57.0278C170.392 57.0278 173.89 42.1322 169.571 29.54C165.252 16.9478 168.751 2.05227 168.751 2.05227', .3],
  ['M170.392 150.948C170.392 150.948 173.89 165.844 169.571 178.436C165.252 191.028 168.751 205.924 168.751 205.924', .3],
  ['M112.609 57.4476C112.609 57.4476 117.401 41.5051 107.125 30.4998C96.8492 19.4945 98.5 12.9998 98.5 12.9998', 1],
  ['M112.609 150.528C112.609 150.528 117.401 166.471 107.125 177.476C96.8492 188.481 98.5 194.976 98.5 194.976', 1],
  ['M62.2941 64.9917C62.2941 64.9917 55.4671 49.8089 40.4932 48.2295C25.5194 46.6501 23.7159 36.5272 23.7159 36.5272', .3],
  ['M62.2941 145.984C62.2941 145.984 55.4671 161.167 40.4932 162.746C25.5194 164.326 23.7159 174.449 23.7159 174.449', .3]
];

function Chars({ text, cls }) {
  return (
    <span className={'hb-char ' + cls} aria-hidden="true">
      {Array.from(text).map((c, i) => c === ' '
        ? <span key={i} data-space="" style={{ '--i': i + 1 }} />
        : <span key={i} data-label={c} style={{ '--i': i + 1 }}>{c}</span>)}
    </span>
  );
}

function HypeButton({
  label = 'Почати своп',
  labelDone = 'Поїхали',
  width = 250,
  height = 84,
  tilt = true,
  onClick,
  style,
  ...rest
}) {
  const btn = React.useRef(null);
  const icon = React.useRef(null);
  const [press, setPress] = React.useState(false);
  const [fired, setFired] = React.useState(false);
  const timer = React.useRef(0);

  // Measure arrow travel after layout settles.
  React.useEffect(() => {
    const el = btn.current, ic = icon.current;
    if (!el || !ic) return;
    const measure = () => {
      const a = el.getBoundingClientRect(), b = ic.getBoundingClientRect();
      if (a.width > 0) el.style.setProperty('--hb-arrow-x', Math.round(a.left - b.right - 16) + 'px');
    };
    const t = setTimeout(measure, 120);
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => { clearTimeout(t); ro.disconnect(); };
  }, [label]);

  React.useEffect(() => () => clearTimeout(timer.current), []);

  const fire = e => {
    setFired(false);
    // restart the animations on a re-click
    requestAnimationFrame(() => setFired(true));
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setFired(false), 2200);
    onClick && onClick(e);
  };

  return (
    <button
      ref={btn}
      className={'swop-hb' + (press ? ' is-press' : '') + (fired ? ' is-fired' : '')}
      aria-label={label}
      onPointerDown={() => setPress(true)}
      onPointerUp={() => setPress(false)}
      onPointerLeave={() => setPress(false)}
      onClick={fire}
      {...rest}
      style={{ width, height, transform: tilt ? 'rotate(353deg) skewX(4deg)' : 'none', ...style }}
    >
      <span className="hb-bg" />
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 342 208" preserveAspectRatio="none" className="hb-splash" aria-hidden="true">
        {SPLASH.map(([d, o], i) => <path key={i} d={d} strokeLinecap="round" strokeWidth="3" strokeOpacity={o} />)}
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox={`0 0 ${width} ${height}`} width={width} height={height} className="hb-path" aria-hidden="true">
        <rect x="1.5" y="1.5" width={width-3} height={height-3} rx="19" ry="19" fill="none" strokeLinecap="round" strokeWidth="3"/>
      </svg>
      <span className="hb-wrap">
        <span className="hb-outline" />
        <span className="hb-content">
          <Chars text={label} cls="hb-s1" />
          <span className="hb-icon" ref={icon}><div /></span>
          <Chars text={labelDone} cls="hb-s2" />
        </span>
      </span>
      <style>{CSS}</style>
    </button>
  );
}

window.SwopifyDesignSystem_ad534d.HypeButton=HypeButton;
})();
(function(){
const {Icon}=window.SwopifyDesignSystem_ad534d;

/* Glyph outlines: Unbounded Bold, 1000-unit em, baseline y=0. The `o` is the
   Swopify exchange mark — the same ring with two rotational arrows cut into it. */
const O = 'M396 16L396 16Q286 16 204 -21.5Q122 -59 76 -127.5Q30 -196 30 -285L30 -285Q30 -376 76 -444Q122 -512 204 -550Q286 -588 396 -588L396 -588Q505 -588 587.5 -550Q670 -512 716 -444Q762 -376 762 -285L762 -285Q762 -196 716 -127.5Q670 -59 587.5 -21.5Q505 16 396 16ZM396 -135L396 -135Q446 -135 481.5 -153Q517 -171 536 -205Q555 -239 555 -285L555 -285Q555 -333 536 -366.5Q517 -400 481.5 -418Q446 -436 396 -436L396 -436Q346 -436 310 -418Q274 -400 255 -366.5Q236 -333 236 -286L236 -286Q236 -239 255 -205Q274 -171 310 -153Q346 -135 396 -135Z';
const GLYPHS = {
  s: 'M718 -186L718 -186Q718 -120 678 -75Q638 -30 564 -7Q490 16 386 16L386 16Q279 16 198.5 -10Q118 -36 73 -83Q28 -130 25 -192L25 -192L232 -192Q239 -169 259.5 -152.5Q280 -136 314 -127.5Q348 -119 395 -119L395 -119Q456 -119 487.5 -131Q519 -143 519 -167L519 -167Q519 -186 495 -195.5Q471 -205 413 -210L413 -210L312 -218Q211 -225 151.5 -248.5Q92 -272 66 -309.5Q40 -347 40 -395L40 -395Q40 -460 80.5 -502.5Q121 -545 193.5 -566.5Q266 -588 363 -588L363 -588Q459 -588 534 -563Q609 -538 654 -493.5Q699 -449 706 -389L706 -389L499 -389Q494 -408 477 -423.5Q460 -439 430 -449Q400 -459 353 -459L353 -459Q298 -459 269.5 -447Q241 -435 241 -413L241 -413Q241 -396 258.5 -386Q276 -376 324 -372L324 -372L457 -362Q556 -356 613 -333.5Q670 -311 694 -274Q718 -237 718 -186Z',
  w: 'M669 -571L836 -115L772 -115L934 -571L1138 -571L924 0L716 0L537 -474L605 -474L424 0L216 0L2 -571L208 -571L369 -115L305 -115L474 -571L669 -571Z',
  o: O,
  p: 'M56 165L56 -571L261 -571L261 -407L252 -383L252 -223L261 -176L261 165L56 165ZM196 -285L196 -285Q209 -378 250.5 -445.5Q292 -513 356 -550.5Q420 -588 501 -588L501 -588Q585 -588 648.5 -550Q712 -512 747.5 -444Q783 -376 783 -285L783 -285Q783 -196 747.5 -127.5Q712 -59 648.5 -21.5Q585 16 501 16L501 16Q420 16 356 -21.5Q292 -59 251 -127Q210 -195 196 -285ZM577 -285L577 -285Q577 -328 559.5 -361Q542 -394 510.5 -413Q479 -432 439 -432L439 -432Q398 -432 361 -413Q324 -394 296 -361Q268 -328 253 -285L253 -285Q268 -243 296 -210Q324 -177 361 -158.5Q398 -140 439 -140L439 -140Q479 -140 510.5 -158.5Q542 -177 559.5 -210Q577 -243 577 -285Z',
  i: 'M56 0L56 -580L159 -560L261 -580L261 0L56 0ZM158 -627L158 -627Q105 -627 72 -653.5Q39 -680 39 -726L39 -726Q39 -771 72 -798Q105 -825 158 -825L158 -825Q213 -825 245.5 -798Q278 -771 278 -726L278 -726Q278 -680 245.5 -653.5Q213 -627 158 -627Z',
  f: 'M462 -634L462 -634Q395 -634 368.5 -610.5Q342 -587 342 -535L342 -535L342 0L138 0L138 -525Q138 -608 172 -666.5Q206 -725 272.5 -755.5Q339 -786 437 -786L437 -786Q481 -786 515.5 -780Q550 -774 589 -763L589 -763L589 -613Q559 -624 527.5 -629Q496 -634 462 -634ZM575 -373L22 -373L22 -524L575 -524L575 -373Z',
  y: 'M244 181L244 181Q181 181 132 165.5Q83 150 37 118L37 118L37 -24Q84 6 125 19Q166 32 215 32L215 32Q256 32 288 14Q320 -4 340 -52L340 -52L559 -571L776 -571L502 11Q473 74 431.5 111.5Q390 149 342 165Q294 181 244 181ZM448 -53L251 -53L8 -571L233 -571L448 -53Z'
};
/* letter, advance width, x position (tracking -30 = -0.03em) */
const LETTERS = [['s',748,0],['w',1140,718],['o',792,1828],['p',815,2590],['i',317,3375],['f',589,3662],['y',777,4221]];
const WORDMARK_RATIO = 5038 / 1046;

const CUT_A = 'M0 0L-135 -502L298 -426Z';
const ARROW = 'M-35 -115L-126 -411L119 -256Z';

/** The two arrow gaps carved out of the ring, as a mask. */
function ExchangeCuts({id, x = 0, y = -660, w = 800, h = 740}) {
  return (
    <mask id={id} maskUnits="userSpaceOnUse" x={x} y={y} width={w} height={h}>
      <rect x={x} y={y} width={w} height={h} fill="#fff"/>
      <g transform="translate(396 -286) scale(1 0.8251)" fill="#000">
        <path d={CUT_A} transform="rotate(35)"/>
        <path d={CUT_A} transform="rotate(215)"/>
      </g>
    </mask>
  );
}

/** The exchange `o` drawn at glyph coordinates (0,0 = its own advance origin). */
function ExchangeO({maskId}) {
  return (
    <>
      <path fillRule="nonzero" mask={`url(#${maskId})`} d={O}/>
      <g transform="translate(396 -286) scale(1 0.8251)">
        <path d={ARROW} transform="rotate(35)"/>
        <path d={ARROW} transform="rotate(215)"/>
      </g>
    </>
  );
}

const TONES = {brand:'var(--text-brand)', ink:'var(--text-strong)', inverse:'var(--text-on-inverse)', current:'currentColor'};

/**
 * Swopify logo. `wordmark` is the lockup with the exchange `o`; `plain` swaps in
 * a normal `o` for sizes under ~22px; `mark` is the exchange glyph alone.
 */
function Logo({variant='wordmark', height, width, tone='brand', title='Swopify', style, ...rest}) {
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, '');
  const maskId = `swop-cuts-${uid}`;
  const color = TONES[tone] || tone;

  if (variant === 'mark') {
    const h = height || 32;
    return (
      <svg {...rest} role="img" aria-label={title} viewBox="10 -644 772 716"
        style={{display:'block', height:h, width:width || h * (772/716), color, fill:'currentColor', ...style}}>
        <ExchangeCuts id={maskId} x={10} y={-644} w={772} h={716}/>
        <ExchangeO maskId={maskId}/>
      </svg>
    );
  }

  const h = height || 28;
  return (
    <svg {...rest} role="img" aria-label={title} viewBox="-20 -845 5038 1046"
      style={{display:'block', height:h, width: width || h * WORDMARK_RATIO, color, fill:'currentColor', ...style}}>
      {variant === 'wordmark' && <ExchangeCuts id={maskId}/>}
      {LETTERS.map(([ch, , x]) => (
        <g key={ch} transform={`translate(${x} 0)`}>
          {ch === 'o' && variant === 'wordmark'
            ? <ExchangeO maskId={maskId}/>
            : <path fillRule="nonzero" d={GLYPHS[ch]}/>}
        </g>
      ))}
    </svg>
  );
}

window.SwopifyDesignSystem_ad534d.Logo=Logo;
})();
(function(){
const {Icon}=window.SwopifyDesignSystem_ad534d;

/* RibbonTape — one continuous strip of printed tape that runs through a whole
   page. Constant thickness, smooth Catmull-Rom path through normalised
   waypoints, uppercase keywords set solid so the strip reads as a LINE first
   and as words second.

   Two passes of the same path make the depth: pass="behind" sits under the
   content, pass="front" is masked to a few windows where the tape crosses over
   cards and buttons. Give both instances the same waypoints/height/twists and
   they are one physical tape.

   Twists are real geometry, not a colour swap: at each twist the strip is cut
   out and replaced by two quads that pinch to a waist and re-open, the second
   one carrying the blank back side of the tape. The print is masked out across
   the fold, so the words disappear into it the way ink does on real tape.

   The uppercase here is the system's single sanctioned exception to sentence
   case (see RibbonTape.prompt.md): it is texture, not a label. */

const DEFAULT_WORDS = ['ОБМІН', 'ХОЧУ НАТОМІСТЬ', 'ЦІЛЬ', 'ЗБІГ', 'ЛАНЦЮГ', 'ПРОПОЗИЦІЯ', 'БЕЗ ГРОШЕЙ', 'ЛЄНТА', 'ОБМІНЯНО', 'SWOPIFY'];

const DEFAULT_WAYPOINTS = [
  {x: -.06, y: .015}, {x: .52, y: .06}, {x: .93, y: .14}, {x: .22, y: .225},
  {x: -.03, y: .32}, {x: .68, y: .40}, {x: 1.05, y: .50}, {x: .30, y: .585},
  {x: .04, y: .68}, {x: .78, y: .765}, {x: 1.04, y: .865}, {x: .34, y: .945},
  {x: -.06, y: 1.01}
];

const TONES = {
  violet: {tape: '#8E26E2', back: '#6B18AE', crease: 'rgba(31,9,56,.30)', ink: '#FFFFFF', shadow: 'rgba(31,9,56,.20)', edge: null},
  ink:    {tape: '#1B1724', back: '#3F3851', crease: 'rgba(0,0,0,.35)',   ink: '#FFFFFF', shadow: 'rgba(31,9,56,.22)', edge: null},
  paper:  {tape: '#FFFFFF', back: '#EFEBF3', crease: 'rgba(31,9,56,.14)', ink: '#7418BE', shadow: 'rgba(31,9,56,.14)', edge: '#E2DCE8'},
  coral:  {tape: '#FF6B52', back: '#D93F26', crease: 'rgba(90,20,10,.28)', ink: '#FFFFFF', shadow: 'rgba(31,9,56,.18)', edge: null}
};

const clamp = (v, a, b) => v < a ? a : v > b ? b : v;
/* stable identity: a fresh `[]` default would re-fire the fold effect every commit */
const NO_TWISTS = [];

function buildPath(pts, w, h, tension) {
  const P = pts.map(p => [p.x * w, p.y * h]);
  if (P.length < 2) return '';
  let d = `M ${P[0][0].toFixed(1)} ${P[0][1].toFixed(1)}`;
  for (let i = 0; i < P.length - 1; i++) {
    const p0 = P[i - 1] || P[i], p1 = P[i], p2 = P[i + 1], p3 = P[i + 2] || P[i + 1];
    const c1 = [p1[0] + (p2[0] - p0[0]) * tension / 6, p1[1] + (p2[1] - p0[1]) * tension / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) * tension / 6, p2[1] - (p3[1] - p1[1]) * tension / 6];
    d += ` C ${c1[0].toFixed(1)} ${c1[1].toFixed(1)}, ${c2[0].toFixed(1)} ${c2[1].toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d;
}

/* frame at a length: point + unit normal of the path */
function frameAt(el, s, L) {
  const at = clamp(s, 0, L);
  const p = el.getPointAtLength(at);
  const a = el.getPointAtLength(clamp(at - 1.2, 0, L));
  const b = el.getPointAtLength(clamp(at + 1.2, 0, L));
  let tx = b.x - a.x, ty = b.y - a.y;
  const m = Math.hypot(tx, ty) || 1;
  tx /= m; ty /= m;
  return {x: p.x, y: p.y, nx: -ty, ny: tx};
}

const quad = pts => pts.map(p => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');

/* The fold: a band that FOLLOWS the curve across [s-w, s+w], waisted slightly at
   the middle. It is painted over the running tape (never cut out of it, so the
   strip never shows a hole) with a gradient that darkens to the tape's back
   side at the waist — the strip rolling over, not a block of another colour. */
function foldBand(el, s, w, h2, L, N = 14) {
  const A = [], B = [];
  for (let k = 0; k <= N; k++) {
    const u = -1 + 2 * k / N;
    const f = frameAt(el, s + u * w, L);
    const hw = h2 * (.86 + .14 * Math.abs(u));
    A.push([f.x + f.nx * hw, f.y + f.ny * hw]);
    B.push([f.x - f.nx * hw, f.y - f.ny * hw]);
  }
  return A.concat(B.reverse());
}

function RibbonTape({
  waypoints = DEFAULT_WAYPOINTS,
  words = DEFAULT_WORDS,
  separator = ' · ',
  height = 34,
  fontSize,
  tone = 'violet',
  speed = 22,
  tension = 1.05,
  twists = NO_TWISTS,
  twistSize,
  pass = 'behind',
  overWindows = [[.3, .4]],
  reveal = 'scroll',
  revealAt = .8,
  opacity = 1,
  style, ...rest
}) {
  const host = React.useRef(null);
  const pathEl = React.useRef(null);
  const measureEl = React.useRef(null);
  const textEl = React.useRef(null);
  const revealEl = React.useRef(null);
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, '');

  const [box, setBox] = React.useState({w: 0, h: 0});
  const [metrics, setMetrics] = React.useState({len: 0, unit: 0});
  const [folds, setFolds] = React.useState([]);

  const T = TONES[tone] || TONES.violet;
  const fs = fontSize || Math.round(height * .6);
  const fold = twistSize || height * .95;
  const twistKey = twists.join(',');
  const unitText = words.join(separator) + separator;
  const textStyle = {fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: fs, letterSpacing: (-fs * .045).toFixed(2), textTransform: 'uppercase'};

  React.useEffect(() => {
    const el = host.current; if (!el) return;
    const ro = new ResizeObserver(() => {
      const r = el.getBoundingClientRect();
      setBox(b => (Math.abs(b.w - r.width) < 1 && Math.abs(b.h - r.height) < 1) ? b : {w: Math.round(r.width), h: Math.round(r.height)});
    });
    ro.observe(el); return () => ro.disconnect();
  }, []);

  const d = React.useMemo(() => box.w ? buildPath(waypoints, box.w, box.h, tension) : '', [waypoints, box.w, box.h, tension]);

  React.useEffect(() => {
    if (!d || !pathEl.current || !measureEl.current) return;
    const raf = requestAnimationFrame(() => {
      const len = pathEl.current.getTotalLength();
      let unit = 0;
      try { unit = measureEl.current.getComputedTextLength(); } catch (e) { unit = 0; }
      if (!unit) unit = unitText.length * fs * .62;
      setMetrics(m => (Math.abs(m.len - len) < 2 && Math.abs(m.unit - unit) < 2) ? m : {len, unit});
    });
    return () => cancelAnimationFrame(raf);
  }, [d, fs, unitText]);

  const L = metrics.len, unit = metrics.unit;

  /* fold geometry: one waisted band per twist, plus the crease and the gradient
     anchors that shade it to the tape's back side */
  React.useEffect(() => {
    const el = pathEl.current;
    if (!el || !L || !twists.length) { setFolds(p => p.length ? [] : p); return; }
    const h2 = height / 2;
    setFolds(twists.map(t => {
      const s = clamp(t, 0, 1) * L;
      const M = frameAt(el, s, L);
      const A = frameAt(el, clamp(s - fold, 0, L), L), B = frameAt(el, clamp(s + fold, 0, L), L);
      const p = k => [M.x + M.nx * k, M.y + M.ny * k];
      return {
        s, w: fold,
        band: quad(foldBand(el, s, fold, h2, L)),
        crease: [p(h2 * .86), p(-h2 * .86)],
        g: [A.x, A.y, B.x, B.y]
      };
    }));
  }, [L, d, height, fold, twistKey]);

  const reps = L && unit ? Math.min(80, Math.ceil((L + unit * 2) / unit) + 1) : 2;
  const full = unitText.repeat(reps);

  /* one loop: print drift along the tape + scroll unroll */
  React.useEffect(() => {
    const el = host.current; if (!el || !L || !unit) return;
    const still = matchMedia('(prefers-reduced-motion:reduce)').matches;
    const setReveal = p => { if (revealEl.current) revealEl.current.setAttribute('stroke-dasharray', `${(L * p).toFixed(1)} ${(L * 2).toFixed(1)}`); };

    if (reveal === 'none' || still) setReveal(1);
    if (still) {
      if (textEl.current) textEl.current.setAttribute('startOffset', (-unit).toFixed(1));
      return;
    }

    let raf = 0, live = true, cur = reveal === 'none' ? 1 : 0;
    const io = new IntersectionObserver(es => { live = es[0].isIntersecting; }, {threshold: 0});
    io.observe(el);
    const t0 = performance.now();

    const tick = now => {
      if (live) {
        const t = (now - t0) / 1000;
        if (textEl.current) textEl.current.setAttribute('startOffset', (-unit + ((t * speed) % unit)).toFixed(1));
        if (reveal !== 'none') {
          const r = el.getBoundingClientRect();
          const vh = innerHeight || 800;
          const target = clamp((vh * revealAt - r.top) / Math.max(1, r.height * .82), 0, 1);
          cur += (target - cur) * .12;
          setReveal(cur < .999 ? cur : 1);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, [L, unit, speed, reveal, revealAt]);

  const pad = Math.max(box.w, box.h) || 2000;
  const maskBox = {maskUnits: 'userSpaceOnUse', x: -pad, y: -pad, width: (box.w || 0) + pad * 2, height: (box.h || 0) + pad * 2};
  const wins = pass === 'front' ? overWindows : null;
  /* the print stops across a fold — cut a bit wider than the band so no letter rides onto the crease */
  const cut = (mult, w) => folds.map((f, i) => (
    <path key={i} d={d} fill="none" stroke="#000" strokeWidth={w} strokeDasharray={`0 ${Math.max(0, f.s - f.w * mult).toFixed(1)} ${(f.w * 2 * mult).toFixed(1)} ${(L * 2).toFixed(1)}`}/>
  ));

  return (
    <div ref={host} aria-hidden="true" {...rest} style={{position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: pass === 'front' ? 4 : 0, opacity, ...style}}>
      {box.w > 0 && (
        <svg width={box.w} height={box.h} viewBox={`0 0 ${box.w} ${box.h}`} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
          <defs>
            <path id={`rt${uid}p`} ref={pathEl} d={d} fill="none"/>
            <mask id={`rt${uid}r`} {...maskBox}>
              <path d={d} fill="none" stroke="#fff" strokeWidth={height + 12} strokeLinecap="butt" ref={revealEl} strokeDasharray={reveal === 'none' ? `${L} ${L * 2}` : `0 ${L * 2}`}/>
            </mask>
            <mask id={`rt${uid}t`} {...maskBox}>
              <rect {...maskBox} fill="#fff"/>
              {cut(.98, height + 6)}
            </mask>
            {folds.map((f, i) => (
              <linearGradient key={i} id={`rt${uid}g${i}`} gradientUnits="userSpaceOnUse" x1={f.g[0]} y1={f.g[1]} x2={f.g[2]} y2={f.g[3]}>
                <stop offset="0" stopColor={T.tape}/>
                <stop offset=".3" stopColor={T.tape}/>
                <stop offset=".47" stopColor={T.back}/>
                <stop offset=".53" stopColor={T.back}/>
                <stop offset=".7" stopColor={T.tape}/>
                <stop offset="1" stopColor={T.tape}/>
              </linearGradient>
            ))}
            {wins && (
              <mask id={`rt${uid}w`} {...maskBox}>
                {wins.map(([s, e], i) => (
                  <path key={i} d={d} fill="none" stroke="#fff" strokeWidth={height + 16} strokeDasharray={`0 ${s * L} ${(e - s) * L} ${L * 2}`}/>
                ))}
              </mask>
            )}
            <filter id={`rt${uid}f`} x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="7" stdDeviation="9" floodColor="#1F0938" floodOpacity=".26"/>
            </filter>
          </defs>

          <text ref={measureEl} x="0" y="-9999" style={textStyle} visibility="hidden">{unitText}</text>

          <g mask={wins ? `url(#rt${uid}w)` : undefined}>
            <g mask={`url(#rt${uid}r)`} filter={pass === 'front' ? `url(#rt${uid}f)` : undefined}>
              <g>
                {pass !== 'front' && <path d={d} fill="none" stroke={T.shadow} strokeWidth={height} transform="translate(0,5)"/>}
                <path d={d} fill="none" stroke={T.tape} strokeWidth={height} strokeLinecap="butt"/>
                {T.edge && <path d={d} fill="none" stroke={T.edge} strokeWidth={height + 2} strokeLinecap="butt" style={{mixBlendMode: 'multiply'}} opacity=".5"/>}
              </g>
              <g mask={`url(#rt${uid}t)`} fill={T.ink} style={textStyle}>
                <text dy={fs * .34}>
                  <textPath ref={textEl} href={`#rt${uid}p`} startOffset={-unit || 0}>{full}</textPath>
                </text>
              </g>
              {folds.map((f, i) => (
                <g key={i}>
                  <polygon points={f.band} fill={`url(#rt${uid}g${i})`}/>
                  <line x1={f.crease[0][0]} y1={f.crease[0][1]} x2={f.crease[1][0]} y2={f.crease[1][1]} stroke={T.crease} strokeWidth="1.25"/>
                </g>
              ))}
            </g>
          </g>
        </svg>
      )}
    </div>
  );
}

window.SwopifyDesignSystem_ad534d.RibbonTape=RibbonTape;
})();
(function(){
const {Icon}=window.SwopifyDesignSystem_ad534d;


/* Decorative field of overlapping translucent cards -- "луска" (scales).
   Purely ambient: it sits behind content, never receives pointer events, and
   carries no information. A soft light follows the cursor and lifts the tiles
   it passes over; with no cursor it drifts on its own so the field is never
   static. See ScaleField.prompt.md for the two rules that keep it on-brand. */

const SF_CSS=`
@keyframes swpSfSlide{from{transform:translate3d(calc(var(--sf-shift) * -1),0,0)}to{transform:translate3d(var(--sf-shift),0,0)}}
@media (prefers-reduced-motion:reduce){.swp-sf-row{animation:none!important}}
`;

const rgba=(hex,a)=>{const n=parseInt(hex.slice(1),16);return `rgba(${n>>16&255},${n>>8&255},${n&255},${a})`;};
const rand=s=>()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};

/* Object glyphs only -- never the reserved brand glyphs (repeat, heart, target,
   sparkles, shield-check, package, git-branch, star...). Those carry meaning. */
const OBJECTS=['guitar','camera','headphones','bike','armchair','shirt','book-open','gamepad-2','footprints','watch','laptop','tent','dumbbell','sofa','lamp','coffee','drill','palette','baby','printer','glasses','briefcase','keyboard','speaker','bird','fish','ticket','disc-3','puzzle','scissors','wrench','tv','smartphone','backpack','umbrella','bed','cake','flower-2','snowflake','car-front'];

/* Iridescence palette -- the violet ramp plus one coral spark, so the light
   passing over the field shifts hue instead of just brightening. */
const IRID=['#C071F0','#A63FE9','#D9A0F8','#EBC6FD','#C071F0','#A63FE9','#D9A0F8','#FF6B52'];

const TONES={
  onViolet:{fill:'rgba(255,255,255,.055)',border:'rgba(255,255,255,.15)',litFill:'rgba(255,255,255,.14)',litBorder:'rgba(255,255,255,.52)',ink:'rgba(255,255,255,.55)',inkBase:.16,glow:'rgba(255,255,255,.10)',iridA:.30},
  onLight:{fill:rgba('#534AB7',.03),border:rgba('#534AB7',.10),litFill:rgba('#8E26E2',.07),litBorder:rgba('#8E26E2',.32),ink:'#8E26E2',inkBase:.10,glow:rgba('#C071F0',.10),iridA:.20},
  onInk:{fill:'rgba(255,255,255,.035)',border:'rgba(255,255,255,.09)',litFill:'rgba(255,255,255,.09)',litBorder:rgba('#C071F0',.55),ink:'rgba(255,255,255,.40)',inkBase:.12,glow:rgba('#A63FE9',.16),iridA:.38}
};

function ScaleField({
  tone='onViolet',shape='scale',content='icons',cell=104,overlap=.34,gap=7,
  intensity=1,drift=true,glow=320,seed=11,photoBase='https://picsum.photos/seed',
  style,...rest}){
  const host=React.useRef(null);
  const [box,setBox]=React.useState({w:0,h:0});

  React.useEffect(()=>{
    const el=host.current;if(!el)return;
    const ro=new ResizeObserver(()=>{const r=el.getBoundingClientRect();setBox({w:Math.round(r.width),h:Math.round(r.height)});});
    ro.observe(el);return()=>ro.disconnect();
  },[]);

  React.useEffect(()=>{
    const el=host.current;if(!el)return;
    if(matchMedia('(prefers-reduced-motion:reduce)').matches){
      el.style.setProperty('--sf-mx','50%');el.style.setProperty('--sf-my','34%');return;
    }
    let raf=0,tx=.5,ty=.34,cx=.5,cy=.34,live=true,seen=false;
    const t0=performance.now();
    const io=new IntersectionObserver(es=>{live=es[0].isIntersecting;},{threshold:0});
    io.observe(el);
    const move=e=>{const r=el.getBoundingClientRect();tx=(e.clientX-r.left)/r.width;ty=(e.clientY-r.top)/r.height;seen=true;};
    const tick=now=>{
      if(live){
        if(!seen){const t=(now-t0)/1000;tx=.5+Math.cos(t*.19)*.34;ty=.46+Math.sin(t*.13)*.3;}
        cx+=(tx-cx)*.09;cy+=(ty-cy)*.09;
        el.style.setProperty('--sf-mx',(cx*100).toFixed(2)+'%');
        el.style.setProperty('--sf-my',(cy*100).toFixed(2)+'%');
      }
      raf=requestAnimationFrame(tick);
    };
    window.addEventListener('pointermove',move,{passive:true});
    raf=requestAnimationFrame(tick);
    return()=>{cancelAnimationFrame(raf);io.disconnect();window.removeEventListener('pointermove',move);};
  },[]);

  const T=TONES[tone]||TONES.onViolet;
  const tileW=cell,tileH=Math.round(cell*(shape==='card'?1.24:1.08));
  const step=Math.max(24,Math.round(tileH*(1-overlap)));
  const radius=shape==='card'?'var(--r-lg)':'30% 30% 50% 50% / 18% 18% 44% 44%';

  const rows=React.useMemo(()=>{
    if(!box.w||!box.h)return [];
    const nx=Math.ceil(box.w/tileW)+3,ny=Math.ceil(box.h/step)+3,r=rand(seed);
    return Array.from({length:ny},(_,ri)=>{
      const tiles=Array.from({length:nx},(_,ci)=>{
        const k=r(),ip=r(),ang=Math.round(90+r()*140);
        const hue=IRID[Math.floor(r()*IRID.length)];
        const wantIcon=content==='icons'?k<.34:content==='mixed'?k<.2:false;
        const wantPhoto=content==='photos'?k<.3:content==='mixed'?k>=.2&&k<.34:false;
        return {ci,x:ci*tileW+(ri%2?tileW/2:0)-tileW,
          icon:wantIcon?OBJECTS[Math.floor(ip*OBJECTS.length)]:null,
          photo:wantPhoto?`${photoBase}/swop${ri*97+ci*13}/${Math.round(tileW)}/${Math.round(tileH)}`:null,
          hue,ang};
      });
      return {ri,y:ri*step-Math.round(tileH*.5),tiles,
        shift:(ri%2?1:-1)*(10+(ri%3)*7),dur:38+(ri%5)*11};
    });
  },[box.w,box.h,tileW,tileH,step,content,seed,photoBase]);

  const mask=`radial-gradient(circle ${glow}px at var(--sf-mx,50%) var(--sf-my,34%),#000 0%,rgba(0,0,0,.6) 46%,transparent 80%)`;
  const tileBase={position:'absolute',top:0,width:tileW-gap,height:tileH-gap,borderRadius:radius,borderStyle:'solid',borderWidth:'var(--bw-hair)',overflow:'hidden'};

  const layer=lit=>rows.map(rw=>(
    <div key={(lit?'l':'b')+rw.ri} className="swp-sf-row" style={{position:'absolute',left:0,right:0,top:rw.y,height:tileH,
      ['--sf-shift']:rw.shift+'px',
      animation:drift?`swpSfSlide ${rw.dur}s var(--ease-standard) infinite alternate`:'none'}}>
      {rw.tiles.map(t=>(
        <div key={t.ci} style={{...tileBase,left:t.x,
          borderColor:lit?T.litBorder:T.border,
          background:lit
            ?`linear-gradient(${t.ang}deg,${rgba(t.hue,T.iridA)},transparent 64%),${T.litFill}`
            :T.fill}}>
          {!lit&&t.icon&&<span style={{position:'absolute',inset:0,display:'grid',placeItems:'center',color:T.ink,opacity:T.inkBase*2.4}}>
            <Icon name={t.icon} size={Math.round(tileW*.34)}/></span>}
          {!lit&&t.photo&&<img src={t.photo} alt="" loading="lazy" style={{width:'100%',height:'100%',objectFit:'cover',opacity:T.inkBase*1.5,filter:'saturate(.7)'}}/>}
          {lit&&(t.icon||t.photo)&&<span style={{position:'absolute',inset:0,display:'grid',placeItems:'center',color:T.ink,opacity:.5}}>
            {t.icon&&<Icon name={t.icon} size={Math.round(tileW*.34)}/>}</span>}
        </div>
      ))}
    </div>
  ));

  return (
    <div ref={host} aria-hidden="true" {...rest} style={{position:'absolute',inset:0,overflow:'hidden',pointerEvents:'none',...style}}>
      <style>{SF_CSS}</style>
      {rows.length>0&&<React.Fragment>
        <div style={{position:'absolute',inset:0,opacity:intensity}}>{layer(false)}</div>
        <div style={{position:'absolute',inset:0,opacity:intensity,WebkitMaskImage:mask,maskImage:mask}}>{layer(true)}</div>
        <div style={{position:'absolute',inset:0,background:`radial-gradient(circle ${Math.round(glow*1.3)}px at var(--sf-mx,50%) var(--sf-my,34%),${T.glow},transparent 72%)`}}/>
      </React.Fragment>}
    </div>
  );
}

window.SwopifyDesignSystem_ad534d.ScaleField=ScaleField;
})();
(function(){
const {Icon}=window.SwopifyDesignSystem_ad534d;
/* ParcelCubes — nine paper parcels on an isometric grid; two of them fly in and out
   along the dashed tracks so the whole board reads as one synchronised shipment.
   Adapted from a uiverse.io community card (CSS-only 3D cubes), re-skinned onto
   the Swopify violet ramp. Decorative: no live data, no interaction beyond hover.

   Original:
   Re-skinned onto Swopify violet ramp; no styled-components.
   Tape/fold marks are painted as background layers on the top face so they
   survive the fly-in animation (which animates background-color only). */
const PARCEL_CUBES_CSS = `
.swop-pc-wrap{user-select:none;position:relative;display:flex;justify-content:center;align-items:center;width:400px;height:420px}
.swop-pc-particles{position:absolute;inset:0;top:150px;left:200px;transform-origin:top left;pointer-events:none;z-index:-1}
.swop-pc-particle{position:absolute;width:7px;height:7px;border-radius:50%;background:radial-gradient(circle at 50% 50%,#fff,#c4b5fd);box-shadow:0 0 8px 2px #a78bfa,0 0 16px 4px #a78bfa44;opacity:0;will-change:transform,opacity}
.swop-pc-particle:nth-child(1){animation:swopPcPf1 4s ease-in-out infinite 0s}
.swop-pc-particle:nth-child(2){animation:swopPcPf2 5s ease-in-out infinite .5s}
.swop-pc-particle:nth-child(3){animation:swopPcPf3 4.5s ease-in-out infinite 1s}
.swop-pc-particle:nth-child(4){animation:swopPcPf4 5.5s ease-in-out infinite 1.5s}
.swop-pc-particle:nth-child(5){animation:swopPcPf1 4.8s ease-in-out infinite 2s}
.swop-pc-particle:nth-child(6){animation:swopPcPf3 5.2s ease-in-out infinite 2.5s}
.swop-pc-particle:nth-child(7){animation:swopPcPf2 4.3s ease-in-out infinite 3s}
.swop-pc-particle:nth-child(8){animation:swopPcPf4 4.9s ease-in-out infinite 3.5s}
@keyframes swopPcPf1{0%{transform:translate(0,0) scale(.5);opacity:0}20%{opacity:1}50%{transform:translate(80px,-120px) scale(1);opacity:1}80%{opacity:1}100%{transform:translate(120px,-180px) scale(.3);opacity:0}}
@keyframes swopPcPf2{0%{transform:translate(0,0) scale(.6);opacity:0}15%{opacity:1}50%{transform:translate(-100px,-100px) scale(1);opacity:1}85%{opacity:1}100%{transform:translate(-150px,-160px) scale(.2);opacity:0}}
@keyframes swopPcPf3{0%{transform:translate(0,0) rotate(0deg) scale(.4);opacity:0}20%{opacity:1}50%{transform:translate(60px,-140px) rotate(180deg) scale(1);opacity:1}80%{opacity:1}100%{transform:translate(90px,-200px) rotate(360deg) scale(.25);opacity:0}}
@keyframes swopPcPf4{0%{transform:translate(0,0) scale(.5);opacity:0}25%{opacity:1}50%{transform:translate(-80px,-130px) scale(1);opacity:1}75%{opacity:1}100%{transform:translate(-100px,-190px) scale(.3);opacity:0}}

.swop-pc-wrap::before{content:"";position:absolute;inset:-130px;aspect-ratio:1;border-radius:50%;background:conic-gradient(from 90deg at 50% 50%,#fff0 0deg,#534AB7 120deg,#fff0 140deg,#7c3aed 300deg,#fff0 360deg);animation:swopPcRotGrad 4s linear infinite reverse;filter:blur(90px);opacity:0.25;z-index:-1}
@keyframes swopPcRotGrad{100%{transform:rotate(360deg)}}

.swop-pc-card{scale:1;position:relative;display:flex;justify-content:end;align-items:flex-start;flex-direction:column;gap:16px;padding:24px;font-family:var(--font-text,Inter,sans-serif);background:radial-gradient(circle at 50% 100%,#fff,#f5f3ff88);width:100%;height:100%;border-radius:20px;overflow:hidden;perspective:1400px;perspective-origin:50% 35%;box-shadow:inset 0 2px 5px 1px #fff,inset 0 5px 8px 0 #fffc,inset 0 5px 12px 0 #fff8,inset 0 8px 24px -12px #0004,0 1px 3px 0 #00000002,0 2px 6px 0 #00000001,0 4px 12px 0 #00000002;z-index:0}
.swop-pc-card::after{content:"";position:absolute;top:40px;left:-60px;width:30%;height:20%;outline:dotted 60px white;outline-offset:50px;transform-origin:180% 50%;animation:swopPcRotGrad 5s ease infinite alternate;filter:blur(36px);opacity:0.85;z-index:-1}
.swop-pc-card::before{content:"";position:absolute;inset:0;border-radius:inherit;background-image:linear-gradient(to bottom,transparent 30%,#fff5 50%,#fffe 70%,transparent 85%);pointer-events:none;z-index:1}

.swop-pc-msg{display:flex;flex-direction:column;align-items:flex-start;gap:8px;position:relative;z-index:2;line-height:1.4}
.swop-pc-msg .swop-pc-title{font-size:18px;font-weight:700;--bg-size:400%;background:linear-gradient(45deg,#534AB7,#7c3aed,#1e1b4b,#7c3aed,#534AB7) 0 0/var(--bg-size) 100%;color:transparent;background-clip:text;-webkit-background-clip:text;animation:swopPcMovBg 16s linear infinite}
.swop-pc-msg .swop-pc-sub{font-size:14px;font-weight:500;background:-webkit-linear-gradient(#9ca3af,#6b7280);background-clip:text;-webkit-background-clip:text;-webkit-text-fill-color:transparent}
@keyframes swopPcMovBg{0%{background-position:var(--bg-size) 0}100%{background-position:0 0}}

/* Cube grid */
.swop-pc-grid{--cube-size:65px;--cube-height:42px;--cube-gap:-19px;--cube-step:calc(var(--cube-size) + var(--cube-gap));--row-spacing-offset:-9px;--row-step:calc(var(--cube-step) + var(--row-spacing-offset));--column-1-offset:0px;--column-2-offset:-24px;--column-3-offset:-48px;--corner-radius:6px;--face-top:#c4b5fd;--face-front:#a78bfa;--face-left:#7c3aed;--face-right:var(--face-left);--face-back:var(--face-front);--face-bottom:var(--face-top);--cube-shadow-color:#534AB738;--cube-shadow-color-2:#7c3aed15;--cube-shadow-color-3:#7c3aed30;--fold:rgba(255,255,255,.16);align-self:center;position:absolute;top:32%;width:calc(3*var(--cube-size) + 2*var(--cube-gap));height:calc(3*var(--cube-size) + 2*var(--cube-gap));transform-style:preserve-3d;filter:drop-shadow(3px -5px 0.5px var(--cube-shadow-color-2))}
.swop-pc-cube{--size:var(--cube-size);position:absolute;width:var(--size);height:var(--cube-height);transform-style:preserve-3d;filter:drop-shadow(2px -4px 2px var(--cube-shadow-color-2))}
.swop-pc-cube.c1,.swop-pc-cube.c4,.swop-pc-cube.c7{filter:drop-shadow(-4px -2px 2px var(--cube-shadow-color-2))}
.swop-pc-cube.c2,.swop-pc-cube.c5,.swop-pc-cube.c8{filter:drop-shadow(-2px -3px 2px var(--cube-shadow-color-2))}
.swop-pc-cube.c3,.swop-pc-cube.c6,.swop-pc-cube.c9{filter:drop-shadow(1px -3px 2px var(--cube-shadow-color-2))}
.swop-pc-cube::after{content:"";position:absolute;inset:calc(-0.5*var(--cube-height));border-radius:50%;background:radial-gradient(circle at 50% 50%,#fff 0%,#0000 70%);opacity:0.6;transition:opacity .5s cubic-bezier(.65,0,.35,1),transform .5s cubic-bezier(.65,0,.35,1);z-index:1;pointer-events:none}
.swop-pc-cube::before{content:"";position:absolute;inset:calc(-0.5*var(--cube-height));border-radius:50%;background:radial-gradient(circle at 50% 50%,#fff 0%,#0000 70%);opacity:0;transition:opacity .5s cubic-bezier(.65,0,.35,1),transform .5s cubic-bezier(.65,0,.35,1);z-index:1;pointer-events:none}
.swop-pc-cube.c1{top:var(--column-1-offset);left:0;z-index:9}
.swop-pc-cube.c2{top:var(--column-2-offset);left:var(--cube-step);z-index:8}
.swop-pc-cube.c3{top:var(--column-3-offset);left:calc(2*var(--cube-step));z-index:3}
.swop-pc-cube.c4{top:calc(var(--row-step) + var(--column-1-offset));left:0;z-index:6}
.swop-pc-cube.c5{top:calc(var(--row-step) + var(--column-2-offset));left:var(--cube-step);z-index:5}
.swop-pc-cube.c6{top:calc(var(--row-step) + var(--column-3-offset));left:calc(2*var(--cube-step));z-index:2}
.swop-pc-cube.c7{top:calc(2*var(--row-step) + var(--column-1-offset));left:0;z-index:10}
.swop-pc-cube.c8{top:calc(2*var(--row-step) + var(--column-2-offset));left:var(--cube-step);z-index:2}
.swop-pc-cube.c9{top:calc(2*var(--row-step) + var(--column-3-offset));left:calc(2*var(--cube-step));z-index:1}
.swop-pc-body{position:absolute;inset:0;transform-style:preserve-3d;transform:rotateX(-30deg) rotateY(45deg);transform-origin:center center;transition:transform .5s cubic-bezier(.65,0,.35,1),border-radius .5s cubic-bezier(.65,0,.35,1)}
.swop-pc-cube.c2 .swop-pc-body{animation-delay:-.4s}
.swop-pc-cube.c3 .swop-pc-body{animation-delay:-.8s}
.swop-pc-cube.c5 .swop-pc-body{animation-delay:-1.6s}
.swop-pc-cube.c6 .swop-pc-body{animation-delay:-2s}
.swop-pc-cube.c8 .swop-pc-body{animation-delay:-2.8s}
.swop-pc-cube.c9 .swop-pc-body{animation-delay:-3.2s}
.swop-pc-face{position:absolute;display:flex;justify-content:center;align-items:center;font-size:11px;font-weight:700;letter-spacing:-.2px;color:#ffffffe6;inset:0;backface-visibility:hidden;box-shadow:inset 0 -5px 2px -2px var(--cube-shadow-color-3)}
.swop-pc-face.front{background:var(--face-front);transform:translateZ(calc(var(--size)/2));border-bottom-right-radius:var(--corner-radius);border-bottom-left-radius:calc(var(--corner-radius)*0.2) var(--corner-radius);border-top-right-radius:var(--corner-radius) calc(var(--corner-radius)*0.3)}
.swop-pc-face.back{background:var(--face-back);transform:rotateY(180deg) translateZ(calc(var(--size)/2));border-bottom-right-radius:var(--corner-radius);border-bottom-left-radius:var(--corner-radius) calc(var(--corner-radius)*0.2);border-top-right-radius:var(--corner-radius) calc(var(--corner-radius)*0.3)}
.swop-pc-face.right{background:var(--face-right);transform:rotateY(90deg) translateZ(calc(var(--size)/2));border-bottom-left-radius:var(--corner-radius);border-bottom-right-radius:var(--corner-radius) calc(var(--corner-radius)*0.2);border-top-left-radius:var(--corner-radius) calc(var(--corner-radius)*0.3)}
.swop-pc-face.left{background:var(--face-left);transform:rotateY(-90deg) translateZ(calc(var(--size)/2));border-bottom-left-radius:var(--corner-radius);border-bottom-right-radius:var(--corner-radius) calc(var(--corner-radius)*0.2);border-top-left-radius:var(--corner-radius) calc(var(--corner-radius)*0.3)}
.swop-pc-face.bottom{background:var(--face-bottom);top:calc(50% - var(--cube-size)/2);bottom:auto;height:var(--cube-size);transform:rotateX(-90deg) translateZ(calc(var(--cube-height)/2))}

/* Top face: fold creases painted as background layers */
.swop-pc-face.top{background-color:var(--face-top);background-image:linear-gradient(var(--fold) 1px,transparent 1px),linear-gradient(90deg,var(--fold) 1px,transparent 1px);background-size:100% 50%,50% 100%;background-position:0 0,0 0;background-repeat:repeat,repeat;top:calc(50% - var(--cube-size)/2);bottom:auto;height:var(--cube-size);transform:rotateX(90deg) translateZ(calc(var(--cube-height)/2));transition:border-radius .5s cubic-bezier(.65,0,.35,1);border-top-right-radius:var(--corner-radius);border-top-left-radius:var(--corner-radius) calc(var(--corner-radius)*0.2);border-bottom-right-radius:calc(var(--corner-radius)*0.2) var(--corner-radius)}

/* Tape variants — extra background layer in front of the creases */
.swop-pc-cube.tape-h .swop-pc-face.top{background-image:linear-gradient(#ffffff7d,#ffffff7d),linear-gradient(var(--fold) 1px,transparent 1px),linear-gradient(90deg,var(--fold) 1px,transparent 1px);background-size:88% 11px,100% 50%,50% 100%;background-position:center center,0 0,0 0;background-repeat:no-repeat,repeat,repeat}
.swop-pc-cube.tape-v .swop-pc-face.top{background-image:linear-gradient(#ffffff7d,#ffffff7d),linear-gradient(var(--fold) 1px,transparent 1px),linear-gradient(90deg,var(--fold) 1px,transparent 1px);background-size:11px 88%,100% 50%,50% 100%;background-position:center center,0 0,0 0;background-repeat:no-repeat,repeat,repeat}
.swop-pc-cube.tape-cross .swop-pc-face.top{background-image:linear-gradient(#ffffff72,#ffffff72),linear-gradient(#ffffff72,#ffffff72),linear-gradient(var(--fold) 1px,transparent 1px),linear-gradient(90deg,var(--fold) 1px,transparent 1px);background-size:88% 10px,10px 88%,100% 50%,50% 100%;background-position:center center,center center,0 0,0 0;background-repeat:no-repeat,no-repeat,repeat,repeat}
.swop-pc-cube.tape-off .swop-pc-face.top{background-image:linear-gradient(#ffffff70,#ffffff70),linear-gradient(var(--fold) 1px,transparent 1px),linear-gradient(90deg,var(--fold) 1px,transparent 1px);background-size:88% 10px,100% 50%,50% 100%;background-position:center 30%,0 0,0 0;background-repeat:no-repeat,repeat,repeat}
.swop-pc-cube.tape-edge .swop-pc-face.top{background-image:linear-gradient(#ffffff6b,#ffffff6b),linear-gradient(#ffffff4d,#ffffff4d),linear-gradient(var(--fold) 1px,transparent 1px),linear-gradient(90deg,var(--fold) 1px,transparent 1px);background-size:88% 9px,88% 6px,100% 50%,50% 100%;background-position:center 26%,center 62%,0 0,0 0;background-repeat:no-repeat,no-repeat,repeat,repeat}

/* Off-centre stamp badges on box walls */
.swop-pc-badge{position:absolute;line-height:0;opacity:.9;pointer-events:none}
.swop-pc-badge.tl{top:5px;left:6px}
.swop-pc-badge.tr{top:5px;right:6px}
.swop-pc-badge.bl{bottom:5px;left:6px}
.swop-pc-badge.br{bottom:5px;right:6px}
.swop-pc-badge.cl{top:50%;left:6px;transform:translateY(-50%)}
.swop-pc-badge.cr{top:50%;right:6px;transform:translateY(-50%)}

/* cube 2 */
.swop-pc-cube.c2{animation:swopPcC2 3.7s ease infinite;animation-delay:-.8s}
.swop-pc-cube.c2 .swop-pc-body{animation:swopPcSpinY360 3.7s ease infinite;animation-delay:0s}
.swop-pc-cube.c2 .swop-pc-face{animation:swopPcC2Face 3.7s ease infinite;animation-delay:-.8s}
.swop-pc-cube.c2 .swop-pc-face.left{animation:swopPcC2FaceLeft 3.7s ease infinite;animation-delay:-.8s}
@keyframes swopPcC2{0%{opacity:0;filter:blur(20px);transform:translate(-300px,0) scale(0)}25%{opacity:1;filter:blur(10px);transform:translate(-220px,-55px) scale(.75)}70%{filter:blur(0);transform:translate(0,-40px) scale(1)}100%{transform:translate(0,37px) scale(1)}}
@keyframes swopPcC2Face{10%{background-color:#0000}}
@keyframes swopPcC2FaceLeft{0%,35%{background-color:#0000}100%{background-color:#6d28d9}}
@keyframes swopPcSpinY360{0%,16%{transform:rotateX(-30deg) rotateY(45deg)}65%,80%{transform:rotateX(-30deg) rotateY(405deg)}100%{transform:rotateX(-30deg) rotateY(405deg)}}

/* cube 5 */
.swop-pc-cube.c5{animation:swopPcC5 3.7s ease infinite;animation-delay:-.8s}
.swop-pc-cube.c5 .swop-pc-face.left{animation:swopPcC5Left 3.7s ease infinite;animation-delay:-.8s}
@keyframes swopPcC5{0%,62%{transform:translate(0,0) scale(1)}94%{transform:translate(0,35px) scale(1)}100%{transform:translate(0,37px) scale(1)}}
@keyframes swopPcC5Left{0%,50%{background-color:#6d28d9}}

/* cube 8 */
.swop-pc-cube.c8{animation:swopPcC8 3.7s ease-in infinite;animation-delay:-1s}
@keyframes swopPcC8{0%,62%{transform:translate(0,0) scale(1)}74%{transform:translate(0,35px) scale(1)}85%{filter:blur(0)}100%{transform:translate(280px,35px) scale(1.05);filter:blur(10px)}}

/* tracks */
.swop-pc-tw1,.swop-pc-tw2{--anim-speed:3.7s;position:absolute;left:-187px;top:-95px;width:100%;height:100%;mask-image:linear-gradient(to bottom,white 50%,transparent 60%)}
.swop-pc-t1{position:absolute;top:0;left:0;width:500px;aspect-ratio:1;box-sizing:border-box;border-radius:40px;mask-image:conic-gradient(from 0deg at 50% 50%,transparent 40%,black 50%,black 75%,#0000 80%);animation:swopPcRot var(--anim-speed) linear infinite}
.swop-pc-t1 .swop-pc-line{position:absolute;inset:145px;border-radius:inherit;box-sizing:border-box;border:2px dashed #a78bfacc;animation:swopPcRot var(--anim-speed) linear infinite reverse}
.swop-pc-tw2{top:-130px;left:unset;right:-70px;mask-image:linear-gradient(to top,white 25%,transparent 30%)}
.swop-pc-t2{position:absolute;top:0;left:0;width:500px;aspect-ratio:1;box-sizing:border-box;border-radius:40px;mask-image:conic-gradient(from 0deg at 50% 50%,transparent 40%,black 50%,black 75%,#0000 80%);animation:swopPcRot var(--anim-speed) linear infinite reverse;animation-delay:-1.05s}
.swop-pc-t2 .swop-pc-line{position:absolute;inset:125px;border-radius:inherit;box-sizing:border-box;border:2px solid #7c3aed;animation:swopPcRot var(--anim-speed) linear infinite;animation-delay:-1.05s}
.swop-pc-t2 .swop-pc-line .swop-pc-dot{position:absolute;width:12px;aspect-ratio:1;background-color:#7c3aed;border-radius:50%;bottom:-7px;left:34px;box-shadow:0 0 0 4px white,0 0 0 6px #7c3aed88,0 0 0 8px white;animation:swopPcDot 1.85s ease infinite;animation-delay:.2s}
@keyframes swopPcRot{100%{transform:rotate(360deg)}}
@keyframes swopPcDot{0%{opacity:0;transform:translate(-30px,0)}60%{opacity:1}100%{opacity:1;transform:translate(200px,0)}}

/* hover */
.swop-pc-cube:hover::after{opacity:.75;transform:translateY(-10px) scale(1.3)}
.swop-pc-cube:hover .swop-pc-body{transform:rotateX(-30deg) rotateY(225deg)}
@media(prefers-reduced-motion:reduce){.swop-pc-cube *,.swop-pc-particle,.swop-pc-t1,.swop-pc-t2{animation:none!important}}
`;

const FragileIcon = () => (
  <svg width="13" height="17" viewBox="0 0 22 28" fill="none" stroke="#ffffffcc" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 3h8l-2 8a4 4 0 01-8 0z"/>
    <line x1="11" y1="11" x2="11" y2="22"/>
    <line x1="8" y1="22" x2="14" y2="22"/>
  </svg>
);
const DocIcon = () => (
  <svg width="11" height="15" viewBox="0 0 22 28" fill="none" stroke="#ffffffcc" strokeWidth="1.9" strokeLinecap="round">
    <rect x="3" y="2" width="16" height="24" rx="2"/>
    <line x1="7" y1="9" x2="15" y2="9"/>
    <line x1="7" y1="14" x2="15" y2="14"/>
    <line x1="7" y1="19" x2="12" y2="19"/>
  </svg>
);
const UpIcon = () => (
  <svg width="13" height="14" viewBox="0 0 24 22" fill="none" stroke="#ffffffcc" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 17V4"/><path d="M5 11l7-7 7 7"/>
    <line x1="5" y1="20" x2="19" y2="20"/>
  </svg>
);
const StampIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ffffffcc" strokeWidth="1.8" strokeLinecap="round">
    <rect x="2.5" y="2.5" width="19" height="19" rx="1.5" strokeDasharray="2.6 2.2"/>
    <rect x="7" y="7" width="10" height="10" rx="1"/>
  </svg>
);
const WeightIcon = () => (
  <svg width="13" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffffcc" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 8h14l2 13H3z"/>
    <path d="M9 8a3 3 0 016 0"/>
  </svg>
);

function Cube({cls, tape, front, back, badge, badgePos = 'tr', backBadge, backBadgePos = 'tl'}) {
  return (
    <div className={`swop-pc-cube ${cls}${tape ? ' ' + tape : ''}`}>
      <div className="swop-pc-body">
        <div className="swop-pc-face front">
          {front || null}
          {badge && <span className={`swop-pc-badge ${badgePos}`}>{badge}</span>}
        </div>
        <div className="swop-pc-face back">
          {back || null}
          {backBadge && <span className={`swop-pc-badge ${backBadgePos}`}>{backBadge}</span>}
        </div>
        <div className="swop-pc-face right"></div>
        <div className="swop-pc-face left"></div>
        <div className="swop-pc-face top"></div>
        <div className="swop-pc-face bottom"></div>
      </div>
    </div>
  );
}

function ParcelCubes({title='Посилки рухаються одночасно',subtitle=<>Поштомат розблоковується,<br/>коли обидві сторони відправили.</>,style,...rest}) {
  return (
    <div className="swop-pc-wrap" style={style} {...rest}>
      <style>{PARCEL_CUBES_CSS}</style>
      <div className="swop-pc-particles">
        {[1,2,3,4,5,6,7,8].map(i=><div key={i} className="swop-pc-particle"/>)}
      </div>
      <div className="swop-pc-card">
        <div className="swop-pc-tw1">
          <div className="swop-pc-t1"><div className="swop-pc-line"/></div>
        </div>
        <div className="swop-pc-tw2">
          <div className="swop-pc-t2">
            <div className="swop-pc-line"><div className="swop-pc-dot"/></div>
          </div>
        </div>
        <div className="swop-pc-grid">
          <Cube cls="c2" tape="tape-cross" badge={<FragileIcon/>} badgePos="tr"/>
          <Cube cls="c3" tape="tape-h" front="Пакуй" badge={<FragileIcon/>} badgePos="bl" back="Фото" backBadge={<StampIcon/>} backBadgePos="tr"/>
          <Cube cls="c5" tape="tape-off" badge={<WeightIcon/>} badgePos="cl"/>
          <Cube cls="c6" tape="tape-v" front="Відправ" badge={<UpIcon/>} badgePos="tr" back="Поштомат" backBadge={<DocIcon/>} backBadgePos="bl"/>
          <Cube cls="c7" tape="tape-h" badge={<StampIcon/>} badgePos="br"/>
          <Cube cls="c8" tape="tape-edge" badge={<DocIcon/>} badgePos="tl"/>
          <Cube cls="c9" tape="tape-cross" front="Отримай" badge={<StampIcon/>} badgePos="tr" back="Обмін" backBadge={<UpIcon/>} backBadgePos="br"/>
        </div>
        {(title||subtitle)&&(
          <div className="swop-pc-msg">
            {title&&<span className="swop-pc-title">{title}</span>}
            {subtitle&&<span className="swop-pc-sub">{subtitle}</span>}
          </div>
        )}
      </div>
    </div>
  );
}

window.SwopifyDesignSystem_ad534d.ParcelCubes=ParcelCubes;
})();
