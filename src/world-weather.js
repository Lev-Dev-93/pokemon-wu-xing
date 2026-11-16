// dev.420–429: ambient effects remain visual-only and never affect movement or battle.
export function weatherPhase(mapId,elapsedMs=0,reducedMotion=false){
 const eligible=['route1','brook','waldrand','route2','beerendorf','village','yard'];
 if(!eligible.includes(mapId))return {kind:'none',frame:0};
 const kind=['brook'].includes(mapId)?'water':['waldrand','route2'].includes(mapId)?'canopy':'breeze';
 return {kind,frame:reducedMotion?0:Math.floor(Math.max(0,elapsedMs)/240)%12};
}
export function drawWeather(ctx,map,elapsedMs=0,reducedMotion=false){
 const {kind,frame}=weatherPhase(map?.id,elapsedMs,reducedMotion);if(kind==='none')return;
 const width=map.w*32,height=map.h*32;ctx.save();
 for(let i=0;i<Math.min(35,Math.floor(width*height/3000));i++){
  const x=(i*97+frame*3)%width,y=(i*71+Math.floor(i/4)*17)%height;
  if(kind==='water'){if(i%3)continue;ctx.fillStyle='rgba(221,247,255,.34)';ctx.fillRect(x,y,8,1)}
  else if(kind==='canopy'){ctx.fillStyle='rgba(175,211,129,.26)';ctx.fillRect(x,y,3,2)}
  else {ctx.fillStyle='rgba(255,242,187,.23)';ctx.fillRect(x,y,2,2)}
 }ctx.restore();
}
