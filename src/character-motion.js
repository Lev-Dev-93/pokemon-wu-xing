// Rein visuelle Bewegung; verändert weder Engine-Koordinaten noch Kollisionen.
export const WALK_DURATION_MS = 120;
export function startWalk(before, after, now, duration=WALK_DURATION_MS){
 if(!before||!after||before.mapId!==after.mapId||Math.abs(before.x-after.x)+Math.abs(before.y-after.y)!==1)return null;
 if(!Number.isFinite(now))return null;
 return {fromX:before.x,fromY:before.y,toX:after.x,toY:after.y,mapId:after.mapId,start:now,duration};
}
export function walkVisual(motion,now,mapId,reduced=false){
 if(!motion||reduced||motion.mapId!==mapId||!Number.isFinite(now))return null;
 const progress=Math.max(0,Math.min(1,(now-motion.start)/motion.duration));
 if(progress>=1)return null;
 const eased=progress*progress*(3-2*progress);
 return {x:motion.fromX+(motion.toX-motion.fromX)*eased,y:motion.fromY+(motion.toY-motion.fromY)*eased,phase:Math.floor(progress*4)%4};
}
export function actorWalkFrame(actor,animationFrame){return actor?.moving===true?Math.floor(animationFrame/2):0;}
