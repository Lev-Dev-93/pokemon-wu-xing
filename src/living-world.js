// Phase 3, checkpoint dev.409: deterministic, non-colliding environmental animation.
// This module never mutates map, player, story flags or collision geometry.
export const AMBIENT_SCENES=Object.freeze(['village','yard','route1','professor_clearing','waldrand','route2']);
export function ambientFrame(elapsedMs,reducedMotion=false){
 if(reducedMotion)return 0;
 return Math.floor(Math.max(0,Number(elapsedMs)||0)/320)%8;
}
export function ambientDetails(map,frame=0){
 if(!map||!AMBIENT_SCENES.includes(map.id))return [];
 const result=[];
 for(let y=1;y<map.h-1;y++)for(let x=1;x<map.w-1;x++){
  const key=`${x},${y}`;
  if(map.walls?.has(key)||map.landscapeArrivalCells?.has(key)||map.portals?.some(p=>p.x===x&&p.y===y))continue;
  const seed=(x*67+y*43+x*y*13+map.id.length*17)%109;
  if(seed<7)result.push({x,y,kind:'pollen',phase:(seed+frame)%8});
  else if(seed<11&&['route1','waldrand','route2'].includes(map.id))result.push({x,y,kind:'leaf',phase:(seed+frame)%8});
 }
 return result;
}
export function drawAmbientWorld(ctx,map,frame=0){
 for(const {x,y,kind,phase} of ambientDetails(map,frame)){
  const px=x*32+8+(phase%4)*3,py=y*32+9+((phase*3)%9);
  ctx.fillStyle=kind==='pollen'?'#f4df91':'#92b86a';
  ctx.fillRect(px,py,kind==='pollen'?2:4,kind==='pollen'?2:2);
 }
}
export function ambientAudit(map){return ambientDetails(map,0).every(({x,y})=>!map.walls.has(`${x},${y}`)&&!map.portals.some(p=>p.x===x&&p.y===y));}
