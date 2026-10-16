function Page(){
  const phone=usePhone();
  React.useEffect(()=>{
    const id=decodeURIComponent(window.location.hash.slice(1));
    if(!['hero','trail','story','steps','cats','cta'].includes(id))return;
    let active=true;
    const go=()=>{if(active)document.getElementById(id)?.scrollIntoView({behavior:'instant',block:'start'});};
    if(document.fonts)document.fonts.ready.then(go);else requestAnimationFrame(go);
    return()=>{active=false;};
  },[]);
  return phone?<PhonePage/>:<div><Nav/><SideNav/><Hero/><Trail/><Story/><Steps/><Cta/><Cats/><Footer/></div>;
}
ReactDOM.createRoot(document.getElementById('root')).render(<Page/>);
