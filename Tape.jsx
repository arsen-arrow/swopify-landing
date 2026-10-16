const {RibbonTape}=window.SwopifyDesignSystem_ad534d;

/* A single arc of tape vaulting over the wordmark in the hero — and nowhere else
   on the page. Not scroll-linked: it unrolls once on load and then just hangs there. */
const ARC=[
  {x:-.10,y:.46},{x:.06,y:.28},{x:.24,y:.16},{x:.50,y:.115},
  {x:.76,y:.16},{x:.94,y:.28},{x:1.10,y:.46}
];

function HeroTape(){
  return (
    <div aria-hidden="true" style={{position:'absolute',inset:0,zIndex:0,pointerEvents:'none',mixBlendMode:'multiply',opacity:.26,contain:'paint'}}>
      <style>{'@keyframes htArc{0%{opacity:0;transform:translate3d(0,-30px,0) scale(1.06) rotate(-1.4deg);filter:blur(12px)}60%{opacity:1}100%{opacity:1;transform:none;filter:blur(0)}}@media (prefers-reduced-motion:reduce){.ht-in{animation:none!important}}'}</style>
      <div className="ht-in" style={{position:'absolute',inset:0,animation:'htArc 1.5s cubic-bezier(.2,.75,.25,1) .25s both',willChange:'transform,opacity,filter'}}>
        <RibbonTape waypoints={ARC} height={30} tone="violet" speed={7} tension={1.1} reveal="none"/>
      </div>
    </div>
  );
}

Object.assign(window,{HeroTape});
