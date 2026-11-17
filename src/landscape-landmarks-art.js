// dev.730: Larger regional landscape motifs, rendered only on existing free grass.
// No collision, object, NPC or map state is ever changed.
const TILE=32;
const STYLES={
 village:{kind:'flowerbed',dark:'#47734a',mid:'#7fa75d',bright:'#e9d5a0',detail:'#d99b7d'},
 beerendorf:{kind:'berryhedge',dark:'#315d49',mid:'#5e9657',bright:'#d98bab',detail:'#f1c2ce'},
 professor_clearing:{kind:'ferngrove',dark:'#30664e',mid:'#68a17a',bright:'#b6d29a',detail:'#d6c58a'},
 yard:{kind:'pasture',dark:'#647a3d',mid:'#a5b16b',bright:'#e3c788',detail:'#f4e3ad'}
};
const yardPath=(x,y)=>(x===7&&y>=2)||(y===10&&x>=4&&x<=10);
const hash=(x,y,s)=>{let z=Math.imul(x+37*s,73856093)^Math.imul(y+19*s,19349663);z=Math.imul(z^(z>>>15),2246822519);return (z^(z>>>13))>>>0;};
export function landscapeLandmarkPixels(map,isPath){
 if(!map||!STYLES[map.id]||!Number.isInteger(map.w)||!Number.isInteger(map.h)||map.w<5||map.h<5||!(map.walls instanceof Set)||typeof isPath!=='function')return [];
 const style=STYLES[map.id],portals=new Set((map.portals||[]).map(p=>`${p.x},${p.y}`));
 const clear=(x,y)=>x>0&&y>0&&x<map.w-1&&y<map.h-1&&!map.walls.has(`${x},${y}`)&&!portals.has(`${x},${y}`)&&!(map.id==='yard'?yardPath(x,y):isPath(map.id,x,y));
 const pixels=[];
 const put=(x,y,dx,dy,w,h,color)=>{if(dx>=0&&dy>=0&&dx+w<=TILE&&dy+h<=TILE)pixels.push({x:x*TILE+dx,y:y*TILE+dy,w,h,color,cellX:x,cellY:y,kind:style.kind});};
 // Anchor a coherent 2x2 feature only where all four cells are safe. The same
 // anchor always produces the same motif, independent of frame and player state.
 for(let y=2;y<map.h-2;y+=4)for(let x=2;x<map.w-2;x+=4){
  const seed=hash(x,y,map.id.length);
  const ax=x+(seed%2),ay=y+((seed>>>2)%2);
  if(![[0,0],[1,0],[0,1],[1,1]].every(([dx,dy])=>clear(ax+dx,ay+dy)))continue;
  for(let dy=0;dy<2;dy++)for(let dx=0;dx<2;dx++){
   const cx=ax+dx,cy=ay+dy,n=hash(cx,cy,seed%97),shift=n%4;
   if(style.kind==='flowerbed'){
    put(cx,cy,3,10,26,15,style.dark);put(cx,cy,5,11,22,11,style.mid);
    for(let i=0;i<3;i++){const px=7+i*7+((n>>>i)%3),py=12+((n>>>(i+4))%7);put(cx,cy,px,py,4,4,i===1?style.detail:style.bright);put(cx,cy,px+1,py+1,2,2,style.detail);}
   }else if(style.kind==='berryhedge'){
    put(cx,cy,3,13,26,13,style.dark);put(cx,cy,5,9+shift,22,13,style.mid);
    put(cx,cy,8,12,5,5,style.bright);put(cx,cy,19,17,5,5,style.bright);put(cx,cy,10,13,2,2,style.detail);put(cx,cy,21,18,2,2,style.detail);
   }else if(style.kind==='ferngrove'){
    for(let i=0;i<3;i++){const bx=5+i*8;put(cx,cy,bx+2,10+shift,2,19,style.dark);put(cx,cy,bx,11+shift,7,3,style.mid);put(cx,cy,bx-1,17+shift,8,3,style.bright);put(cx,cy,bx+1,23,6,3,style.mid);}
   }else{
    put(cx,cy,4,19,24,5,style.dark);for(let i=0;i<4;i++){const bx=5+i*6;put(cx,cy,bx,12+(i%2)*3,3,12,style.mid);put(cx,cy,bx-1,11+(i%2)*3,5,3,i%2?style.bright:style.detail);}
   }
  }
 }
 return pixels;
}
