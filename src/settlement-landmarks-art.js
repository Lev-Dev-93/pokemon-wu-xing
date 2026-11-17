// dev.733: Original regional paving emblems. Visual only; never edits a map.
const T=32;
const THEMES={
 village:{rim:'#785b46',stone:'#e7cf9f',inner:'#b98064',spark:'#f6e3b5'},
 beerendorf:{rim:'#785038',stone:'#e3bd8d',inner:'#a35b66',spark:'#f3d5aa'},
 professor_clearing:{rim:'#576f65',stone:'#d5cba4',inner:'#739c8b',spark:'#f1e6b9'},
 yard:{rim:'#846744',stone:'#e6c88e',inner:'#a77c4f',spark:'#f2d9a3'}
};
const yardPath=(x,y)=>x===7&&y>=2||y===10&&x>=4&&x<=10;
export function settlementLandmarkPixels(map,isPath){
 if(!map||!THEMES[map.id]||!Number.isInteger(map.w)||!Number.isInteger(map.h)||typeof isPath!=='function')return [];
 const theme=THEMES[map.id],parts=[],portals=new Set((map.portals||[]).map(p=>`${p.x},${p.y}`));
 const clear=(x,y)=>x>=0&&y>=0&&x<map.w&&y<map.h&&!map.walls.has(`${x},${y}`)&&!portals.has(`${x},${y}`)&&(map.id==='yard'?yardPath(x,y):isPath(map.id,x,y));
 const add=(x,y,dx,dy,w,h,color)=>parts.push({x:x*T+dx,y:y*T+dy,w,h,color,cellX:x,cellY:y});
 if(map.id==='yard'){
  // A three-tile woven threshold on the existing east-west farm track.
  const y=10;
  const xs=[5,6,7];
  if(xs.every(x=>clear(x,y))){for(const x of xs){add(x,y,2,10,28,2,theme.rim);add(x,y,2,21,28,2,theme.rim);for(let j=0;j<3;j++)add(x,y,5+j*9,13+(x+j)%2*4,5,4,theme.stone)}add(6,y,13,13,6,6,theme.inner)}
  return parts;
 }
 const options=[];
 for(let y=0;y<map.h-1;y++)for(let x=0;x<map.w-1;x++)if([[x,y],[x+1,y],[x,y+1],[x+1,y+1]].every(([a,b])=>clear(a,b)))options.push({x,y,dist:Math.abs(x+1-map.w/2)+Math.abs(y+1-map.h/2)});
 options.sort((a,b)=>a.dist-b.dist||a.y-b.y||a.x-b.x);
 if(!options.length)return [];
 const {x,y}=options[0];
 // A 64x64 geometric landmark divided into four tile-bounded quadrants.
 for(let dy=0;dy<2;dy++)for(let dx=0;dx<2;dx++){
  const cx=x+dx,cy=y+dy;
  add(cx,cy,2,2,28,2,theme.rim);add(cx,cy,2,28,28,2,theme.rim);
  add(cx,cy,2,2,2,28,theme.rim);add(cx,cy,28,2,2,28,theme.rim);
  add(cx,cy,5,5,22,22,theme.stone);
  add(cx,cy,8,8,16,16,theme.inner);
  add(cx,cy,11,11,10,10,theme.stone);
  add(cx,cy,14,14,4,4,theme.spark);
 }
 return parts;
}
