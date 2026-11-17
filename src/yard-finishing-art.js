// Phase 15: unified yard finishing layer. Visual only; collision and map data are immutable.
import {yardPondSet,yardSafeDecor} from './yard-biome-art.js';
import {yardWalkway} from './yard-architecture-art.js';
const T=32;
const key=(x,y)=>`${x},${y}`;
export function yardFinishingPixels(map){
 if(map.id!=='yard')return [];
 const pixels=[];
 const add=(x,y,w,h,color)=>{if(x>=0&&y>=0&&x+w<=map.w*T&&y+h<=map.h*T)pixels.push({x,y,w,h,color})};
 // Short, irregular grass tufts along the footpath, never on its walking surface.
 for(let y=2;y<map.h-1;y++)for(let x=1;x<map.w-1;x++){
  if(!yardSafeDecor(map,x,y)||yardWalkway(x,y)||yardPondSet.has(key(x,y)))continue;
  const near=[[1,0],[-1,0],[0,1],[0,-1]].some(([dx,dy])=>yardWalkway(x+dx,y+dy));
  if(!near)continue;
  const seed=(x*17+y*29)%7,X=x*T,Y=y*T;
  for(let i=0;i<3;i++){
   const xx=X+5+(seed+i*9)%22, yy=Y+18+(seed+i*3)%7;
   add(xx,yy,2,6,'#52884b');add(xx+2,yy+2,3,3,'#7cac61');
  }
 }
 // Pond perimeter plants occupy adjacent land only; the water is never covered.
 for(const [x,y] of [[1,8],[1,9],[5,8],[5,9],[2,7],[3,7],[4,7],[2,10],[3,10],[4,10]]){
  if(!yardSafeDecor(map,x,y)||yardWalkway(x,y)||yardPondSet.has(key(x,y)))continue;
  const X=x*T,Y=y*T,s=(x*5+y*3)%8;
  add(X+6+s,Y+15,3,13,'#4e885a');add(X+11+s,Y+11,2,17,'#639d65');
  add(X+5+s,Y+12,5,5,'#b5a56c');add(X+10+s,Y+9,4,5,'#c7b47d');
 }
 // Pasture interior clover, respecting the open gate and fences.
 for(let y=4;y<=6;y++)for(let x=10;x<=13;x++){
  if(!yardSafeDecor(map,x,y))continue;
  const X=x*T,Y=y*T,s=(x*13+y*7)%9;
  add(X+4+s,Y+22,7,4,'#a4c980');add(X+9+s,Y+19,6,5,'#c4d99b');
 }
 // Barn eaves and dark shadow anchor the building visually to the terrain.
 add(T+2,T+28,6*T-4,3,'#6e644b');
 add(T+4,T+25,6*T-8,2,'#b18a5f');
 // Gate threshold marks the opening at x=10 on the southern fence.
 add(10*T+5,7*T+25,22,3,'#bd9d6b');
 add(10*T+7,7*T+28,18,2,'#e2c693');
 return pixels;
}
