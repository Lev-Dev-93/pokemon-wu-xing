// dev.395–399: purely decorative, deterministic woodland layer.
import {isPlannedRoad} from './path-geometry.js';
export const FOREST_SCENE_IDS=Object.freeze(['waldrand','route2','forest_elder_house']);
const pixel=(ctx,x,y,w,h,color)=>{ctx.fillStyle=color;ctx.fillRect(x,y,w,h)};
export function forestAtmospherePlan(map){
 if(!map||!FOREST_SCENE_IDS.includes(map.id))return [];
 const details=[];
 for(let y=1;y<map.h-1;y++)for(let x=1;x<map.w-1;x++){
  const cell=`${x},${y}`;
  if(map.walls.has(cell)||map.landscapeArrivalCells?.has(cell)||map.portals.some(p=>p.x===x&&p.y===y)||isPlannedRoad(map.id,x,y))continue;
  const seed=(x*53+y*71+x*y*17+map.id.length*29)%101;
  let kind=null;
  if(map.id==='waldrand')kind=seed<13?'fern':seed<19?'fallenLeaf':seed<23?'mushroom':null;
  if(map.id==='route2')kind=seed<15?'moss':seed<25?'fern':seed<31?'fallenLeaf':seed<34?'mushroom':null;
  if(map.id==='forest_elder_house')kind=seed<14?'woodGrain':seed<22?'herbBundle':null;
  if(kind)details.push({x,y,kind});
 }
 return details;
}
export function auditForestAtmosphere(map){return forestAtmospherePlan(map).flatMap(({x,y})=>{
 const cell=`${x},${y}`;
 return map.walls.has(cell)||map.landscapeArrivalCells?.has(cell)||map.portals.some(p=>p.x===x&&p.y===y)||isPlannedRoad(map.id,x,y)?[`${map.id}:${cell}`]:[];
});}
export function drawForestAtmosphere(ctx,map){
 for(const {x,y,kind} of forestAtmospherePlan(map)){
  const X=x*32,Y=y*32;
  if(kind==='fern'){pixel(ctx,X+15,Y+18,2,10,'#346e49');for(const [dx,dy] of [[8,17],[11,13],[17,14],[19,19]])pixel(ctx,X+dx,Y+dy,8,3,'#579568');}
  if(kind==='fallenLeaf'){pixel(ctx,X+10,Y+23,6,3,'#c49a56');pixel(ctx,X+19,Y+16,5,4,'#b8794e');pixel(ctx,X+22,Y+19,3,2,'#8c603f');}
  if(kind==='mushroom'){pixel(ctx,X+15,Y+22,3,6,'#e2d4b5');pixel(ctx,X+11,Y+19,11,5,'#a96c57');pixel(ctx,X+14,Y+20,2,2,'#ead3b4');}
  if(kind==='moss'){pixel(ctx,X+8,Y+24,14,4,'#497d54');pixel(ctx,X+12,Y+21,9,3,'#6b9a60');}
  if(kind==='woodGrain'){pixel(ctx,X+7,Y+22,18,2,'#aa805a');pixel(ctx,X+11,Y+25,11,1,'#8c684d');}
  if(kind==='herbBundle'){pixel(ctx,X+13,Y+20,2,7,'#59855c');pixel(ctx,X+17,Y+18,2,9,'#59855c');pixel(ctx,X+11,Y+19,6,4,'#8cab72');pixel(ctx,X+17,Y+16,5,5,'#8cab72');}
 }
}
