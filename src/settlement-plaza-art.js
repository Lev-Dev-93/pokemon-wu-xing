// Original, deterministic paving and path-edge pixel art. Render-only; no world mutations.
const TILE=32;
const THEMES={
 village:{joint:'#866c57',highlight:'#e2c49a',accent:'#b18c70'},
 beerendorf:{joint:'#8d6748',highlight:'#e8c28b',accent:'#bc855e'},
 professor_clearing:{joint:'#847c68',highlight:'#d4d0b1',accent:'#9ca895'},
 yard:{joint:'#8e785c',highlight:'#d5bc8e',accent:'#b09b77'}
};
const isYardPath=(x,y)=>x===7&&y>=2||y===10&&x>=4&&x<=10;
export function settlementPlazaPixels(map,isPath){
 if(!map||!THEMES[map.id]||!Number.isInteger(map.w)||!Number.isInteger(map.h)||typeof isPath!=='function')return [];
 const theme=THEMES[map.id],out=[];
 const add=(x,y,dx,dy,w,h,color)=>out.push({x:x*TILE+dx,y:y*TILE+dy,w,h,color,cellX:x,cellY:y});
 const path=(x,y)=>x>=0&&y>=0&&x<map.w&&y<map.h&&!map.walls.has(`${x},${y}`)&&!(map.id==='yard'?!isYardPath(x,y):!isPath(map.id,x,y));
 const portals=new Set((map.portals||[]).map(p=>`${p.x},${p.y}`));
 for(let y=0;y<map.h;y++)for(let x=0;x<map.w;x++){
  if(!path(x,y)||portals.has(`${x},${y}`))continue;
  const left=path(x-1,y),right=path(x+1,y),top=path(x,y-1),bottom=path(x,y+1);
  // Short inset stones at path edges; never draw outside this cell.
  if(!left){add(x,y,2,5,3,22,theme.joint);add(x,y,5,8,2,16,theme.highlight)}
  if(!right){add(x,y,27,5,3,22,theme.joint);add(x,y,25,8,2,16,theme.highlight)}
  if(!top){add(x,y,7,2,18,3,theme.joint);add(x,y,10,5,12,2,theme.highlight)}
  if(!bottom){add(x,y,7,27,18,3,theme.joint);add(x,y,10,25,12,2,theme.highlight)}
  // Crossroads get a recognizable paving pattern, unlike ordinary tracks.
  if(left&&right&&top&&bottom){
   add(x,y,7,8,18,2,theme.joint);add(x,y,7,22,18,2,theme.joint);
   add(x,y,15,10,2,12,theme.accent);add(x,y,9,13,4,4,theme.highlight);
  }else if((x*7+y*11)%5===0){add(x,y,13,15,6,2,theme.accent)}
 }
 return out;
}
