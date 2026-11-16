// dev.375–379: deterministic, render-only environmental detail; never changes collision.
import {isPlannedRoad} from './path-geometry.js';
const R=(c,x,y,w,h,color)=>{c.fillStyle=color;c.fillRect(x,y,w,h)};
export const ATMOSPHERE_MAPS=Object.freeze(['professor_clearing','route1','brook','beerendorf']);
export function atmospherePlan(map){
 if(!ATMOSPHERE_MAPS.includes(map.id))return [];
 const plan=[];
 for(let y=1;y<map.h-1;y++)for(let x=1;x<map.w-1;x++){
  const k=`${x},${y}`;
  if(map.walls.has(k)||map.landscapeArrivalCells?.has(k)||map.portals.some(p=>p.x===x&&p.y===y)||isPlannedRoad(map.id,x,y))continue;
  // River banks and bridge are special: never decorate water or crossing tiles.
  if(map.id==='brook'&&y>=6&&y<=10)continue;
  // Tutorial grass is reserved for the professor's scripted encounter.
  if(map.id==='professor_clearing'&&x>=6&&x<=8&&y>=9)continue;
  const seed=(x*41+y*67+x*y*13+map.id.length*19)%97;
  let kind=null;
  if(map.id==='professor_clearing')kind=seed<10?'fieldNotes':seed<27?'clover':null;
  if(map.id==='route1')kind=seed<11?'butterfly':seed<30?'meadowBloom':seed<37?'clover':null;
  if(map.id==='brook')kind=seed<18?'riverPebble':seed<30?'clover':null;
  if(map.id==='beerendorf')kind=seed<13?'berryBloom':seed<23?'clover':null;
  if(kind)plan.push({x,y,kind});
 }
 return plan;
}
export function auditAtmosphere(map){return atmospherePlan(map).flatMap(({x,y})=>{
 const k=`${x},${y}`;
 return map.walls.has(k)||map.portals.some(p=>p.x===x&&p.y===y)||map.landscapeArrivalCells?.has(k)||isPlannedRoad(map.id,x,y)?[`${map.id}:${k}`]:[];
});}
export function drawMuAtmosphere(c,map){
 for(const {x,y,kind} of atmospherePlan(map)){
  const X=x*32,Y=y*32;
  if(kind==='clover'){for(const [dx,dy] of [[12,19],[17,18],[14,15]])R(c,X+dx,Y+dy,5,4,'#5c9b58');R(c,X+15,Y+21,2,6,'#39744c');}
  if(kind==='meadowBloom'||kind==='berryBloom'){R(c,X+14,Y+16,2,11,'#477e4d');for(const [dx,dy] of [[11,14],[17,14],[14,11],[14,17]])R(c,X+dx,Y+dy,5,5,kind==='berryBloom'?'#e7a5bf':'#f0d2a0');R(c,X+15,Y+15,3,3,'#efce6c');}
  if(kind==='butterfly'){R(c,X+13,Y+13,5,5,'#f5d17c');R(c,X+19,Y+13,5,5,'#e8b969');R(c,X+18,Y+14,2,8,'#675c42');}
  if(kind==='riverPebble'){R(c,X+9,Y+22,13,5,'#a7b2a1');R(c,X+11,Y+21,9,2,'#d9d8bb');R(c,X+24,Y+24,4,3,'#8d9c91');}
  if(kind==='fieldNotes'){R(c,X+9,Y+20,14,7,'#b7a477');R(c,X+11,Y+21,10,4,'#e5d6a4');R(c,X+13,Y+22,6,1,'#718c78');}
 }
 // Distinct nonblocking landmarks on safe, previously empty parts of the maps.
 if(map.id==='professor_clearing'){
  R(c,9*32+10,9*32+18,13,9,'#7b684b');R(c,9*32+12,9*32+12,9,8,'#d3c493');R(c,9*32+14,9*32+15,5,2,'#6d8d83');
 }
 if(map.id==='beerendorf'){
  for(const [x,y] of [[6,2],[9,12]]){if(map.walls.has(`${x},${y}`)||isPlannedRoad(map.id,x,y))continue;R(c,x*32+8,y*32+18,18,9,'#8d633f');R(c,x*32+10,y*32+15,14,5,'#bf8553');R(c,x*32+12,y*32+13,4,4,'#b85b67');R(c,x*32+19,y*32+13,4,4,'#cc7c80');}
 }
 if(map.id==='brook'){
  for(let x=0;x<map.w;x++)for(const y of [7,8,9]){if(x>=6&&x<=9)continue;const X=x*32,Y=y*32;R(c,X+3,Y+4,13,2,'#a2d4d5');R(c,X+19,Y+18,8,2,'#8cc7d1');}
 }
}
