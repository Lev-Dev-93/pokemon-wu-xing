// Phase 15: original, deterministic pixel-art ecosystem for the breeder's yard.
// All coordinates are in world pixels; no gameplay state or collision changes.
const T=32;
const rect=(c,x,y,w,h,color)=>{c.fillStyle=color;c.fillRect(Math.round(x),Math.round(y),w,h)};
const portal=(map,x,y)=>map.portals.some(p=>p.x===x&&p.y===y);
export const yardPondCells=Object.freeze([[2,8],[3,8],[4,8],[2,9],[3,9],[4,9]]);
export const yardMeadowCells=Object.freeze([[1,4],[2,4],[3,5],[4,5],[5,5],[1,6],[2,6],[3,6],[4,6],[5,7],[6,7],[5,8],[6,8],[11,8],[12,8],[13,8],[11,9],[12,9],[13,9],[4,10],[5,10],[6,10]]);
export const yardFlowerbeds=Object.freeze([[1,5],[2,5],[3,7],[4,7],[5,9],[11,9],[12,9],[13,9]]);
export const yardSaplings=Object.freeze([[1,3],[5,4],[12,2],[14,9]]);
export const yardBabyPokemon=Object.freeze([
 {id:'azurill',name:'Azurill',x:5,y:8,zone:'pond',phase:0},
 {id:'pichu',name:'Pichu',x:11,y:5,zone:'pasture',phase:1},
 {id:'togepi',name:'Togepi',x:12,y:6,zone:'pasture',phase:2}
]);
export function yardSafeDecor(map,x,y){return x>=0&&y>=0&&x<map.w&&y<map.h&&!map.walls.has(`${x},${y}`)&&!portal(map,x,y)&&!map.landscapeArrivalCells?.has(`${x},${y}`)}
export function yardGround(c,map){
 // Continuous-looking grass texture, with details straddling tile boundaries.
 for(let y=2;y<map.h-1;y++)for(let x=1;x<map.w-1;x++){
  if(!yardSafeDecor(map,x,y)||x===7||y===10&&x>=4&&x<=10)continue;
  const n=(x*73+y*137+x*y*19)%23,px=x*T,py=y*T;
  if(n<9){rect(c,px+2,py+3,26,24,n%2?'#84ad6d':'#82aa69');rect(c,px+19,py+23,16,10,'#82aa69')}
  for(let i=0;i<3;i++){const sx=(n*7+i*13)%31,sy=(n*11+i*9)%28;rect(c,px+sx,py+sy,2,5,'#5e944f');rect(c,px+sx+3,py+sy+2,2,3,'#a4c780')}
 }
 for(const [x,y] of yardMeadowCells){if(!yardSafeDecor(map,x,y))continue;const X=x*T,Y=y*T;for(let i=0;i<5;i++){const xx=X+((i*11+x*7+y*3)%29),yy=Y+((i*7+y*11)%24);rect(c,xx,yy+4,2,5,'#4d884b');rect(c,xx-2,yy+3,4,3,i%3===0?'#f2d4df':i%3===1?'#f7e7a2':'#d7c6ed');rect(c,xx-1,yy+3,2,2,'#f6c96d')}}
 for(const [x,y] of yardFlowerbeds){if(!yardSafeDecor(map,x,y))continue;const X=x*T,Y=y*T;rect(c,X+2,Y+10,28,17,'#896a4b');rect(c,X+3,Y+11,26,14,'#a37b53');for(let i=0;i<3;i++){const xx=X+7+i*8;rect(c,xx,Y+11,2,11,'#548b4b');rect(c,xx-3,Y+9+(i%2)*2,8,7,['#f2b9c9','#f3e1a2','#d5c1ee'][i]);rect(c,xx,Y+11+(i%2)*2,2,2,'#fff2bd')}}
 for(const [x,y] of yardSaplings){if(!yardSafeDecor(map,x,y))continue;const X=x*T,Y=y*T;rect(c,X+14,Y+17,5,14,'#7a5438');for(const [dx,dy,w,h] of [[6,10,21,14],[10,4,16,16],[4,16,25,7]])rect(c,X+dx,Y+dy,w,h,'#477e4a');rect(c,X+8,Y+11,13,5,'#70a65b');rect(c,X+15,Y+6,8,4,'#8abc6e')}
}
// Shared shoreline geometry: render the six water cells as one continuous pond.
// The shoreline is determined by neighbours, not by tile row, avoiding seams.
export const yardPondSet=new Set(yardPondCells.map(([x,y])=>`${x},${y}`));
export function yardPondEdge(x,y,dx,dy){return !yardPondSet.has(`${x+dx},${y+dy}`)}
export function yardWater(c,frame=0){
 for(const [x,y] of yardPondCells){
  const X=x*T,Y=y*T;
  rect(c,X,Y,T,T,'#438fa5');
  // The deep-water region continues exactly across adjacent tiles.
  rect(c,X+2,Y+2,28,28,'#438fa5');
  if(yardPondEdge(x,y,0,-1)){rect(c,X,Y,32,5,'#a3b477');rect(c,X,Y+5,32,3,'#6a9c85')}
  if(yardPondEdge(x,y,0,1)){rect(c,X,Y+26,32,6,'#a3b477');rect(c,X,Y+25,32,2,'#6a9c85')}
  if(yardPondEdge(x,y,-1,0)){rect(c,X,Y,5,32,'#a3b477');rect(c,X+5,Y,2,32,'#6a9c85')}
  if(yardPondEdge(x,y,1,0)){rect(c,X+27,Y,5,32,'#a3b477');rect(c,X+25,Y,2,32,'#6a9c85')}
  // Animated ripples cross the underlying cell grid without painting borders.
  const wave=(frame+3*x+y*2)%9;
  rect(c,X+7+wave,Y+12,9,2,'#85c9d1');
  rect(c,X+17-wave/2,Y+21,7,2,'#6bb8c5');
 }
 for(const [x,y] of [[2,8],[4,9]]){rect(c,x*T+12,y*T+16,13,6,'#72ac70');rect(c,x*T+17,y*T+14,6,5,'#e9d1d9')}
 for(const [x,y] of [[1,8],[5,9]]){const X=x*T,Y=y*T;for(let i=0;i<3;i++){rect(c,X+18+i*4,Y+8-i*3,2,18,'#538b55');rect(c,X+17+i*4,Y+7-i*3,4,6,'#b59d5d')}}
}
// Larger regional planting patches, assembled without new colliders or pickups.
export const yardHabitatPatches=Object.freeze([
 {kind:'flower-meadow',cells:[[1,6],[2,6],[1,7],[2,7]]},
 {kind:'pasture-clover',cells:[[10,4],[11,4],[12,4],[13,4],[10,5],[11,5],[12,5],[13,5],[10,6],[11,6],[12,6],[13,6]]},
 {kind:'orchard-edge',cells:[[4,4],[5,4],[4,5],[5,5]]}
]);
export function yardHabitatPixels(map){
 const pixels=[];
 const add=(x,y,w,h,color)=>pixels.push({x,y,w,h,color});
 for(const patch of yardHabitatPatches)for(const [x,y] of patch.cells){
  if(!yardSafeDecor(map,x,y)||yardPondSet.has(`${x},${y}`))continue;
  const X=x*T,Y=y*T,seed=(x*19+y*37)%11;
  // Border-free irregular patches intentionally extend to adjacent cells.
  add(X+1,Y+5,29,22,patch.kind==='pasture-clover'?'#85b36b':'#89b46e');
  add(X+22,Y+20,10,12,'#85b36b');
  for(let i=0;i<4;i++){
   const px=X+4+(seed+i*7)%24,py=Y+8+(seed*3+i*5)%19;
   add(px,py,2,7,'#4f8c4d');
   if(patch.kind==='flower-meadow'){
    add(px-3,py-3,8,5,['#f2c4d6','#f5e5a6','#d9c9ee'][i%3]);add(px,py-2,2,2,'#f7efb2');
   }else if(patch.kind==='pasture-clover'){
    add(px-3,py,5,4,'#c5d99a');add(px+1,py-2,5,4,'#b7d38b');
   }else{add(px-2,py-2,5,4,'#e9d19d')}
  }
 }
 return pixels;
}
const babyShadow=(c,x,y)=>rect(c,x+7,y+27,18,3,'#547b57');
function baby(c,id,x,y,frame){
 babyShadow(c,x,y);const bob=(frame%4===1)?-2:0;const Y=y+bob;
 if(id==='pichu'){
  rect(c,x+7,Y+3,6,13,'#292c32');rect(c,x+21,Y+3,6,13,'#292c32');rect(c,x+9,Y+8,5,8,'#e8c65c');rect(c,x+20,Y+8,5,8,'#e8c65c');rect(c,x+9,Y+13,17,15,'#e9ce69');rect(c,x+11,Y+17,4,4,'#e96e66');rect(c,x+22,Y+17,4,4,'#e96e66');rect(c,x+14,Y+17,2,3,'#313139');rect(c,x+21,Y+17,2,3,'#313139');rect(c,x+17,Y+21,3,2,'#473c35');rect(c,x+10,Y+27,5,3,'#4e4a38');rect(c,x+21,Y+27,5,3,'#4e4a38');
 }else if(id==='togepi'){
  rect(c,x+13,Y+5,11,11,'#f6e6c4');rect(c,x+10,Y+12,18,17,'#f5e9d4');rect(c,x+13,Y+10,3,3,'#2b3a42');rect(c,x+22,Y+10,3,3,'#2b3a42');rect(c,x+14,Y+15,3,2,'#a27b6c');rect(c,x+11,Y+20,5,5,'#d06c69');rect(c,x+20,Y+21,5,5,'#679ab9');rect(c,x+17,Y+17,4,5,'#d6aa73');rect(c,x+12,Y+28,5,2,'#bfae93');rect(c,x+22,Y+28,5,2,'#bfae93');
 }else{
  rect(c,x+17,Y+3,7,7,'#679ec3');rect(c,x+12,Y+7,15,10,'#76b3d2');rect(c,x+10,Y+14,19,14,'#8fc8e3');rect(c,x+8,Y+17,5,8,'#8fc8e3');rect(c,x+26,Y+17,5,8,'#8fc8e3');rect(c,x+14,Y+16,2,3,'#344554');rect(c,x+23,Y+16,2,3,'#344554');rect(c,x+18,Y+21,4,2,'#d76c86');rect(c,x+11,Y+27,5,3,'#618ca6');rect(c,x+24,Y+27,5,3,'#618ca6');
 }
}
// Independent ambient routes. A cycle has walking segments and deliberate resting frames.
// The positions are render-only; no NPC, encounter, save, or collision state is changed.
export const yardBabyRoutes=Object.freeze({
 azurill:Object.freeze([[5,8],[6,8],[6,9],[5,9],[5,8]]),
 pichu:Object.freeze([[11,5],[12,5],[13,5],[13,4],[12,4],[11,4],[11,5]]),
 togepi:Object.freeze([[12,6],[11,6],[10,6],[10,5],[10,4],[11,4],[12,4],[12,5],[12,6]])
});
export const BABY_WALK_FRAMES=9;
export const BABY_REST_FRAMES=13;
export function yardBabyPosition(actor,frame=0){
 const route=yardBabyRoutes[actor.id];
 if(!route)throw new Error(`Unknown yard baby: ${actor.id}`);
 const steps=route.length-1,segment=BABY_WALK_FRAMES+BABY_REST_FRAMES;
 const cycle=steps*segment;
 const f=((Math.floor(frame)+actor.phase*segment)%cycle+cycle)%cycle;
 const index=Math.floor(f/segment),local=f%segment;
 const [x,y]=route[index],[nx,ny]=route[index+1];
 // Smooth, bounded movement across one tile, then a quiet pause.
 const t=Math.min(1,local/BABY_WALK_FRAMES);
 return {id:actor.id,zone:actor.zone,x:x+(nx-x)*t,y:y+(ny-y)*t,moving:local<BABY_WALK_FRAMES};
}
export function yardBabies(c,frame=0){
 for(const actor of yardBabyPokemon){
  const position=yardBabyPosition(actor,frame);
  const gait=position.moving?Math.floor(frame/2)%4:0;
  baby(c,actor.id,position.x*T,position.y*T,gait);
 }
}
