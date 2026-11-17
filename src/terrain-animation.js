// dev.711: Pure, deterministic overlays on existing terrain. No map or game-state mutations.
import {isPlannedRoad} from './path-geometry.js';

export function terrainAnimationCells(map){
 if(!map||!Number.isInteger(map.w)||!Number.isInteger(map.h)||map.w<=0||map.h<=0)return [];
 const cells=[];
 if(map.id==='brook'){
  for(let y=7;y<=9&&y<map.h;y++)for(let x=0;x<map.w;x++){
   if(x>=6&&x<=9)continue; // existing wooden bridge must remain visually intact
   cells.push({x,y,kind:'water'});
  }
 }else if(['route1','route2','waldrand','yard','village','beerendorf','professor_clearing'].includes(map.id)){
  for(let y=1;y<map.h-1;y++)for(let x=1;x<map.w-1;x++){
   if(map.walls?.has(`${x},${y}`)||map.portals?.some(p=>p.x===x&&p.y===y))continue;
   if(map.id!=='yard'&&isPlannedRoad(map.id,x,y))continue;
   if((x*37+y*19+map.id.length*11)%23!==0)continue;
   cells.push({x,y,kind:'grass'});
  }
 }
 return cells;
}
export function terrainAnimationPhase(elapsedMs=0,reducedMotion=false){
 if(reducedMotion)return 0;
 return Math.floor(Math.max(0,Number(elapsedMs)||0)/240)%8;
}
export function drawTerrainAnimation(ctx,map,elapsedMs=0,reducedMotion=false){
 const phase=terrainAnimationPhase(elapsedMs,reducedMotion);
 ctx.save();
 for(const cell of terrainAnimationCells(map)){
  const x=cell.x*32,y=cell.y*32;
  if(cell.kind==='water'){
   const offset=(cell.x*3+cell.y*5+phase*2)%18;
   ctx.fillStyle='rgba(189,236,239,0.55)';ctx.fillRect(x+3+offset,y+10,7,2);
   ctx.fillStyle='rgba(36,111,139,0.35)';ctx.fillRect(x+21-offset%9,y+24,6,1);
  }else{
   const sway=reducedMotion?0:phase%3-1;
   ctx.fillStyle='#7da967';ctx.fillRect(x+12+sway,y+13,2,7);
   ctx.fillStyle='#a1c37a';ctx.fillRect(x+16+sway,y+11,2,6);
  }
 }
 ctx.restore();
}
