// dev.734: distinct 2x2 settlement gardens, original pixel art only.
// Gardens occupy safe grass and never modify map collision or objects.
import {composedLandscapePixels} from './landscape-composition.js';
const T=32;
const THEMES={
 village:{soil:'#8b6747',edge:'#c4a578',foliage:'#4b854f',flower:'#f2d2b0',center:'#f3dc75'},
 beerendorf:{soil:'#76563e',edge:'#b89063',foliage:'#3c7648',flower:'#c15b79',center:'#f0caa3'},
 professor_clearing:{soil:'#5d6b4b',edge:'#9caf82',foliage:'#3d8063',flower:'#a5d6c3',center:'#f1e4a8'},
 yard:{soil:'#7b724a',edge:'#c3b27b',foliage:'#648d4c',flower:'#e8d28e',center:'#f7e6af'}
};
const yardPath=(x,y)=>(x===7&&y>=2)||(y===10&&x>=4&&x<=10);
export function settlementGardenPixels(map,isPath){
 if(!map||!THEMES[map.id]||!Number.isInteger(map.w)||!Number.isInteger(map.h)||!(map.walls instanceof Set)||typeof isPath!=='function')return [];
 const p=THEMES[map.id],portals=new Set((map.portals||[]).map(v=>`${v.x},${v.y}`));
 const occupied=new Set(composedLandscapePixels(map,isPath).map(v=>`${v.cellX},${v.cellY}`));
 const safe=(x,y)=>x>0&&y>0&&x<map.w-1&&y<map.h-1&&!map.walls.has(`${x},${y}`)&&!portals.has(`${x},${y}`)&&!occupied.has(`${x},${y}`)&&!(map.id==='yard'?yardPath(x,y):isPath(map.id,x,y));
 const candidates=[];
 for(let y=1;y<map.h-2;y++)for(let x=1;x<map.w-2;x++){
  const cells=[[x,y],[x+1,y],[x,y+1],[x+1,y+1]];
  if(!cells.every(([a,b])=>safe(a,b)))continue;
  // Prefer garden sites beside an existing path, but not on top of it.
  const adjacent=cells.some(([a,b])=>[[a-1,b],[a+1,b],[a,b-1],[a,b+1]].some(([u,v])=>u>=0&&v>=0&&u<map.w&&v<map.h&&(map.id==='yard'?yardPath(u,v):isPath(map.id,u,v))));
  if(adjacent)candidates.push({x,y,score:Math.abs(x-map.w/2)+Math.abs(y-map.h/2)});
 }
 candidates.sort((a,b)=>a.score-b.score||a.y-b.y||a.x-b.x);
 const selected=[];
 for(const candidate of candidates){if(selected.length===2)break;if(selected.some(v=>Math.abs(v.x-candidate.x)<4&&Math.abs(v.y-candidate.y)<4))continue;selected.push(candidate);}
 // Crowded maps may have no contiguous 2x2 grass patch. Use a compact
 // one-tile planter instead of silently rendering nothing.
 if(!selected.length){
  const singles=[];
  for(let y=1;y<map.h-1;y++)for(let x=1;x<map.w-1;x++)if(safe(x,y)){
   const nextToPath=[[x-1,y],[x+1,y],[x,y-1],[x,y+1]].some(([u,v])=>map.id==='yard'?yardPath(u,v):isPath(map.id,u,v));
   singles.push({x,y,score:(nextToPath?0:1000)+Math.abs(x-map.w/2)+Math.abs(y-map.h/2)});
  }
  singles.sort((a,b)=>a.score-b.score||a.y-b.y||a.x-b.x);
  if(singles.length)selected.push({...singles[0],compact:true});
 }
 const out=[];
 const add=(cx,cy,dx,dy,w,h,color)=>{if(dx<0||dy<0||dx+w>T||dy+h>T)throw Error('Garden pixel outside tile');out.push({x:cx*T+dx,y:cy*T+dy,w,h,color,cellX:cx,cellY:cy});};
 for(const {x,y,compact=false} of selected)for(let dy=0;dy<(compact?1:2);dy++)for(let dx=0;dx<(compact?1:2);dx++){
  const cx=x+dx,cy=y+dy;
  add(cx,cy,2,2,28,28,p.soil);
  add(cx,cy,2,2,28,3,p.edge);add(cx,cy,2,27,28,3,p.edge);
  if(dx===0)add(cx,cy,2,2,3,28,p.edge);
  if(dx===1||compact)add(cx,cy,27,2,3,28,p.edge);
  // Three individual flowers per quadrant; no cross-tile overdraw.
  for(const [fx,fy] of [[10,10],[22,17],[13,24]]){
   add(cx,cy,fx,fy+3,2,5,p.foliage);
   add(cx,cy,fx-3,fy,7,5,p.flower);
   add(cx,cy,fx,fy+1,2,2,p.center);
  }
 }
 return out;
}
