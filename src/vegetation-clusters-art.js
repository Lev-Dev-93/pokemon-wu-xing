// Cohesive, original 32px vegetation clusters. Pure rendering data; never modifies maps.
// Low-frequency elliptical patches give each settlement a recognizable planted landscape.
const TILE=32;
const THEMES={
 village:{leaf:'#467b45',light:'#9fc475',accent:'#e8d59a',kind:'meadow'},
 beerendorf:{leaf:'#356c50',light:'#79a967',accent:'#e4a5c3',kind:'berries'},
 professor_clearing:{leaf:'#39775c',light:'#a3c38d',accent:'#d9d6a8',kind:'ferns'},
 yard:{leaf:'#527944',light:'#9cbd6a',accent:'#e9dba4',kind:'pasture'}
};
const yardPath=(x,y)=>(x===7&&y>=2)||(y===10&&x>=4&&x<=10);
const hash=(x,y,seed)=>{let n=Math.imul(x+seed*17,374761393)+Math.imul(y-seed*11,668265263);n=Math.imul(n^(n>>>13),1274126177);return (n^(n>>>16))>>>0};
export function vegetationClusterPixels(map,isPath){
 if(!map||!THEMES[map.id]||!Number.isInteger(map.w)||!Number.isInteger(map.h)||map.w<=0||map.h<=0||!(map.walls instanceof Set)||typeof isPath!=='function')return [];
 const theme=THEMES[map.id],parts=[];
 const portals=new Set((map.portals||[]).map(p=>`${p.x},${p.y}`));
 const centers=[];
 // Patch centers are distributed over the whole map rather than generated per tile.
 for(let y=2;y<map.h;y+=5)for(let x=2;x<map.w;x+=5){
  const n=hash(x,y,map.id.length);
  centers.push({x:Math.min(map.w-1,x+(n%3)-1),y:Math.min(map.h-1,y+((n>>>3)%3)-1),radius:1.65+((n>>>7)%3)*0.38});
 }
 const put=(x,y,dx,dy,w,h,color)=>parts.push({x:x*TILE+dx,y:y*TILE+dy,w,h,color,cellX:x,cellY:y});
 for(let y=1;y<map.h-1;y++)for(let x=1;x<map.w-1;x++){
  const key=`${x},${y}`;
  if(map.walls.has(key)||portals.has(key)||(map.id==='yard'?yardPath(x,y):isPath(map.id,x,y)))continue;
  const patch=centers.find(p=>((x-p.x)**2+(y-p.y)**2)/(p.radius*p.radius)<1);
  if(!patch)continue;
  const n=hash(x,y,map.id.length+31);
  if(n%7===0)continue; // irregular edges
  const dx=6+(n%6),dy=15+((n>>>5)%5);
  // Repeated broad leaf silhouettes create patches, not isolated single-pixel accents.
  put(x,y,dx,dy+6,17,5,theme.leaf);
  put(x,y,dx+3,dy+2,11,8,theme.light);
  put(x,y,dx+6,dy,5,5,theme.leaf);
  if(theme.kind==='berries'){
   put(x,y,dx+3,dy+4,3,3,theme.accent);
   put(x,y,dx+12,dy+8,3,3,theme.accent);
  }else if(theme.kind==='ferns'){
   put(x,y,dx+8,dy-5,2,10,theme.leaf);
   put(x,y,dx+3,dy-2,12,3,theme.light);
  }else if(n%4===0){
   put(x,y,dx+8,dy-3,2,7,theme.leaf);
   put(x,y,dx+6,dy-5,6,4,theme.accent);
  }
 }
 return parts;
}
