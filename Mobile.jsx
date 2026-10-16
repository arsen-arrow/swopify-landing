/* A phone composition, not a scaled desktop canvas. The desktop story and its
   assets remain shared; only the choreography changes at the mobile breakpoint. */
const {Logo,Icon}=window.SwopifyDesignSystem_ad534d;
const cl=(v,a,b)=>Math.min(b,Math.max(a,v));
const sg=(p,a,b)=>cl((p-a)/(b-a),0,1);
const sm=t=>t*t*(3-2*t);
function usePhone(){
  const query='(max-width: 900px)';
  const [phone,setPhone]=React.useState(()=>window.matchMedia(query).matches);
  React.useEffect(()=>{const mq=window.matchMedia(query),change=()=>setPhone(mq.matches);mq.addEventListener('change',change);return()=>mq.removeEventListener('change',change);},[]);
  return phone;
}
function useStill(){
  const [still,setStill]=React.useState(()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  React.useEffect(()=>{const mq=window.matchMedia('(prefers-reduced-motion: reduce)'),change=()=>setStill(mq.matches);mq.addEventListener('change',change);return()=>mq.removeEventListener('change',change);},[]);
  return still;
}
function PhoneReveal({children,className=''}){
  const ref=React.useRef(null);
  React.useEffect(()=>{const el=ref.current;if(!el)return;const io=new IntersectionObserver(es=>{if(es[0].isIntersecting){el.classList.add('mp-visible');io.disconnect();}},{threshold:.12});io.observe(el);return()=>io.disconnect();},[]);
  return <div ref={ref} className={'mp-reveal '+className}>{children}</div>;
}
function PhoneNav(){
  const ref=React.useRef(null);
  React.useEffect(()=>{
    let frame=0;
    const paint=()=>{frame=0;const n=ref.current;if(!n)return;const total=document.documentElement.scrollHeight-window.innerHeight;n.style.setProperty('--read',String(total>0?window.scrollY/total:0));n.classList.toggle('mp-scrolled',window.scrollY>24);};
    const scroll=()=>{if(!frame)frame=requestAnimationFrame(paint);};paint();window.addEventListener('scroll',scroll,{passive:true});window.addEventListener('resize',scroll);
    return()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',scroll);window.removeEventListener('resize',scroll);};
  },[]);
  return <header ref={ref} className="mp-nav"><nav aria-label="Головна навігація"><a href="#hero" className="mp-brand" aria-label="Swopify — на початок"><Logo height={22}/></a><a className="mp-nav-link" href="#story">Спробуй обмін <Icon name="arrow-up-right" size={16}/></a></nav><span className="mp-read" aria-hidden="true"/></header>;
}
function PhoneHero(){
  return <section id="hero" className="mp-hero">
    <div className="mp-hero-glow" aria-hidden="true"/>
    <div className="mp-hero-content">
      <span className="mp-kicker"><span/>Без грошей. Взагалі.</span>
      <h1><span className="mp-hero-line">sw<span className="mp-violet">ій</span> до</span><span className="mp-hero-line mp-line-two">sw<span className="mp-violet">ого</span></span><span className="mp-hero-line">по sw<span className="mp-violet">оє</span><span className="mp-period">.</span></span></h1>
      <p className="mp-intro">Те, що тобі вже не треба,<br/>комусь дуже потрібно.</p>
      <div className="mp-hero-art" aria-hidden="true">
        <svg className="mp-orbit" viewBox="0 0 400 220" fill="none"><ellipse cx="200" cy="110" rx="178" ry="67" transform="rotate(-12 200 110)" stroke="currentColor" strokeDasharray="2 9"/><path d="m343 42 18 6-8 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        <div className="mp-mini mp-mini-a"><span><Icon name="headphones" size={48}/></span><b>Твоє «вже не треба»</b></div>
        <span className="mp-hero-exchange"><Icon name="repeat" size={25}/></span>
        <div className="mp-mini mp-mini-b"><span><Icon name="camera" size={48}/></span><b>Чиєсь «саме те»</b></div>
        <span className="mp-art-note">міняй вайб, а не гривні</span>
      </div>
      <a href="#story" className="mp-button">Подивись, як це працює <Icon name="arrow-down" size={19}/></a>
      <span className="mp-hero-foot">Менше зайвого. Більше свого.</span>
    </div>
    <div className="mp-ribbon" aria-hidden="true"><span>НЕ КУПУЙ. СВОПАЙ. <Icon name="repeat" size={18}/> ДАЙ РЕЧАМ НОВЕ ЖИТТЯ. <Icon name="repeat" size={18}/></span></div>
  </section>;
}
function PhoneTrail(){
  return <section id="trail" className="mp-trail mp-pad" aria-label="Чому обмін">
    <span className="mp-eyebrow">Нова цінність знайомих речей</span>
    <div className="mp-trail-list">{PTS.map((p,i)=><PhoneReveal key={p.w}><article className="mp-trail-item"><span className="mp-trail-dot" aria-hidden="true"/><span className="mp-item-index">0{i+1}</span><h2>{p.a}<em>{p.w}</em>{p.b}</h2><p>{p.sub}</p></article></PhoneReveal>)}</div>
    <span className="mp-handnote">а починається все з одного фото <Icon name="arrow-down" size={22}/></span>
  </section>;
}
function PhoneThing({give}){
  return <div className={'mp-thing '+(give?'mp-give':'mp-want')}><div className="mp-thing-image">{give?<img src="./photo-headphones.webp" alt="Фіолетові навушники" width="224" height="224" decoding="async"/>:<Icon name="camera" size={66}/>}</div><div className="mp-thing-copy"><span>{give?'Ти даєш':'Ти отримуєш'}</span><strong>{give?'Навушники':'Плівкова камера'}</strong><small><Icon name="map-pin" size={11}/>{give?'Львів':'Київ'}</small></div></div>;
}
function PhoneStory(){
  const wrap=React.useRef(null),scene=React.useRef(null),shutter=React.useRef(null);
  const still=useStill();
  const [step,setStep]=React.useState(0),[match,setMatch]=React.useState(false),[busy,setBusy]=React.useState(false);
  const timer=React.useRef(0),last=React.useRef(0);
  React.useEffect(()=>{
    const el=wrap.current,n=scene.current;if(!el||!n)return;
    let frame=0,visible=true;
    const paint=()=>{
      frame=0;if(!visible)return;
      const r=el.getBoundingClientRect();
      const p=still?1:cl(-r.top/Math.max(1,r.height-window.innerHeight),0,1);
      n.style.setProperty('--camera-out',String(sm(sg(p,.28,.58))));
      n.style.setProperty('--print',String(sm(sg(p,.08,.38))));
      n.style.setProperty('--develop',String(sm(sg(p,.14,.36))));
      n.style.setProperty('--paper-out',String(sm(sg(p,.36,.5))));
      n.style.setProperty('--cards',String(sm(sg(p,.4,.7))));
      const s=p>.53?1:0;if(last.current!==s){last.current=s;setStep(s);}
    };
    const request=()=>{if(!frame)frame=requestAnimationFrame(paint);};
    const io=new IntersectionObserver(es=>{visible=es[0].isIntersecting;if(visible)request();},{rootMargin:'100px'});io.observe(el);
    paint();window.addEventListener('scroll',request,{passive:true});window.addEventListener('resize',request);
    const reset=()=>{clearTimeout(timer.current);setMatch(false);setBusy(false);};window.addEventListener('swopify:replay',reset);
    return()=>{io.disconnect();cancelAnimationFrame(frame);clearTimeout(timer.current);window.removeEventListener('scroll',request);window.removeEventListener('resize',request);window.removeEventListener('swopify:replay',reset);};
  },[still]);
  const swap=()=>{if(busy||match)return;setBusy(true);timer.current=setTimeout(()=>{setMatch(true);setBusy(false);},still?0:850);};
  const replay=()=>{clearTimeout(timer.current);setMatch(false);setBusy(false);};
  return <section id="story" ref={wrap} className={'mp-story'+(still?' mp-still':'')} aria-label="Демонстрація обміну">
    <div className="mp-story-pin">
      <div className="mp-story-heading mp-pad"><span className="mp-eyebrow">{step===0?'01 / Твоя річ':'02 / Твій наступний метч'}</span><h2>{step===0?<>Просто<br/><em>сфоткай.</em></>:<>Знайди своє.<br/><em>І поміняйся.</em></>}</h2><p>{step===0?'Назву, опис і чистий фон допише ШІ.':'Твоя річ — початок чогось нового.'}</p></div>
      <div ref={scene} className={'mp-scene'+(busy?' mp-swapping':'')+(match?' mp-matched':'')} style={{'--camera-out':0,'--print':0,'--develop':0,'--cards':0}}>
        <div className="mp-scene-orbit" aria-hidden="true"/>
        <div className="mp-print" aria-hidden="true"><img src="./photo-headphones.webp" alt="" width="224" height="224"/><span>твоя наступна історія</span></div>
        <div className="mp-camera" role="img" aria-label="Фіолетовий фотоапарат, з якого з’являється фото речі"><Camera shutterRef={shutter}/></div>
        <div className="mp-pair" aria-hidden={step===0||match}><PhoneThing give/><PhoneThing/></div>
        <div className="mp-swap-action"><button className="mp-swap-button" disabled={step===0||busy||match} onClick={swap} aria-label="Обміняти навушники на камеру"><Icon name="repeat" size={25}/></button><span>тисни — це метч</span></div>
        <div className="mp-match" aria-hidden={!match} role={match?'status':undefined}><span className="mp-match-icon"><Icon name="check" size={36}/></span><h3>Це метч!</h3><p>Обмін узгоджено.<br/>Залишилось передати речі.</p><button onClick={replay} tabIndex={match?0:-1}>Ще раз <Icon name="rotate-ccw" size={15}/></button></div>
      </div>
      <div className="mp-story-bottom"><div className="mp-story-dots" aria-label={'Крок '+(step+1)+' із 2'}><span className={step===0?'active':''}/><span className={step===1?'active':''}/></div><span>{match?'далі — обери, як зустрінуться речі':step===0?'гортай — фото оживає':'обміняйся або гортай далі'} <Icon name="arrow-down" size={14}/></span></div>
    </div>
  </section>;
}
function PhoneDelivery(){
  const host=React.useRef(null),[width,setWidth]=React.useState(340),[mode,setMode]=React.useState('meet');
  const [seen,setSeen]=React.useState(false);
  const tabKeys=e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();const next=e.key==='Home'?'meet':e.key==='End'?'post':mode==='meet'?'post':'meet';setMode(next);e.currentTarget.querySelector('#'+next+'-tab').focus();}};
  React.useEffect(()=>{const el=host.current;if(!el)return;const ro=new ResizeObserver(es=>setWidth(Math.min(560,es[0].contentRect.width)));ro.observe(el);const io=new IntersectionObserver(es=>{if(es[0].isIntersecting)setSeen(true);},{threshold:.15});io.observe(el);return()=>{ro.disconnect();io.disconnect();};},[mode]);
  return <section id="steps" className="mp-delivery mp-pad"><style>{SP_CSS}</style><PhoneReveal><span className="mp-eyebrow">03 / Залишилось передати</span><h2 className="mp-heading">Ближче,<br/>ніж <em>здається.</em></h2><p className="mp-body">За сусіднім столиком чи в іншому місті — обмін знайде дорогу.</p></PhoneReveal>
    <div className="mp-tabs" role="tablist" aria-label="Спосіб обміну" onKeyDown={tabKeys}><button id="meet-tab" role="tab" aria-selected={mode==='meet'} tabIndex={mode==='meet'?0:-1} aria-controls="delivery-panel" onClick={()=>setMode('meet')}><Icon name="map-pin" size={17}/>В одному місті</button><button id="post-tab" role="tab" aria-selected={mode==='post'} tabIndex={mode==='post'?0:-1} aria-controls="delivery-panel" onClick={()=>setMode('post')}><Icon name="truck" size={18}/>У різних</button></div>
    <div ref={host} id="delivery-panel" role="tabpanel" aria-labelledby={mode==='meet'?'meet-tab':'post-tab'} className="mp-delivery-panel" tabIndex={0} key={mode}>
      {mode==='meet'?<><MeetMap on={seen} w={width}/><h3>Зустріньтесь.<br/><em>І поміняйтесь.</em></h3><p className="mp-body">Час і місце домовляєте в додатку, на мапі. Далі дві хвилини і по каві.</p><MeetSafety/></>:<><LockerBox on={seen} w={width}/><h3>Відправляйте<br/><em>Новою поштою.</em></h3><p className="mp-body">Обидва здають посилки — і кожна їде далі тільки після перевірки на відділенні.</p><PostSafety/></>}
    </div>
  </section>;
}
function PhoneCategories(){
  const items=[['headphones','Техніка'],['shirt','Одяг'],['armchair','Для дому'],['bike','Для руху'],['disc-3','Для душі'],['sparkles','Щось особливе']];
  return <section id="cats" className="mp-categories mp-pad"><PhoneReveal><span className="mp-eyebrow">Твій стаф — твоя валюта</span><h2 className="mp-heading">Усе, що має<br/><em>нову історію.</em></h2><div className="mp-category-grid">{items.map(([icon,label])=><div key={label}><Icon name={icon} size={27}/><span>{label}</span></div>)}</div></PhoneReveal></section>;
}
function PhoneCta(){
  const replay=()=>window.dispatchEvent(new CustomEvent('swopify:replay'));
  return <section id="cta" className="mp-cta mp-pad"><PhoneReveal><span className="mp-cta-mark" aria-hidden="true"><Logo variant="mark" tone="current" height={56}/></span><span className="mp-eyebrow">Менше цінників. Більше можливостей.</span><h2>У тебе вже є<br/>чим <em>обмінятись.</em></h2><p>Твоя наступна улюблена річ<br/>зараз чекає на когось іншого.</p><a className="mp-button" href="#story" onClick={replay}>Спробувати обмін <Icon name="arrow-up-right" size={21}/></a><span className="mp-cta-note">Демонстрація · без реєстрації</span></PhoneReveal></section>;
}
function PhoneFooter(){
  return <footer className="mp-footer mp-pad"><a href="#hero" aria-label="Swopify — на початок"><Logo tone="inverse" height={26}/></a><p>Міняй вайб, а не гривні.</p><nav aria-label="Навігація внизу сторінки"><a href="#story">Як це працює <Icon name="arrow-up-right" size={16}/></a><a href="#steps">Передача речей <Icon name="arrow-up-right" size={16}/></a><a href="#cats">Що можна міняти <Icon name="arrow-up-right" size={16}/></a></nav><div className="mp-footer-base"><span>© 2026 Swopify</span><a href="#hero">Нагору <Icon name="arrow-up" size={14}/></a></div></footer>;
}
function PhonePage(){return <div className="mp-page"><a className="mp-skip" href="#story">Перейти до демонстрації</a><PhoneNav/><main><PhoneHero/><PhoneTrail/><PhoneStory/><PhoneDelivery/><PhoneCategories/><PhoneCta/></main><PhoneFooter/></div>;}
Object.assign(window,{PhonePage,usePhone});
