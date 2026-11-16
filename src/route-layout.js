// Deterministic, collision-aware walkways linking every outdoor portal.
const outdoor=new Set(['village','professor_clearing','route1','brook','waldrand','beerendorf','route2']);
const cache=new WeakMap();
const key=(x,y)=>`${x},${y}`;
function preferred(map,x,y){
 if(map.id==='village')return (x>=8&&x<=14&&y<=11)||(y===7)||(y===11&&x>=4&&x<=19)||(y===4&&x>=6&&x<=19);
 if(map.id==='professor_clearing')return y===7||(x>=5&&x<=11&&y>=4&&y<=7);
 if(map.id==='beerendorf')return (x>=7&&x<=8)||(y===7)||(x===4&&y>=5)||(x===14&&y>=5)||(y===13&&x>=3&&x<=13);
 if(map.id==='brook')return x>=6&&x<=9;
 if(map.id==='waldrand')return (x>=6&&x<=9)||(y===8&&x>=7);
 if(map.id==='route2')return (x>=6&&x<=9)||(y===8&&x<=9);
 return (x>=6&&x<=9)||y===8;
}
function shortest(map,from,to){
 const start=key(from.x,from.y),goal=key(to.x,to.y);
 const dist=new Map([[start,0]]),prev=new Map(),todo=[[0,from.x,from.y]];
 while(todo.length){todo.sort((a,b)=>a[0]-b[0]);const [cost,x,y]=todo.shift(),k=key(x,y);if(cost!==dist.get(k))continue;if(k===goal)break;
  for(const [dx,dy] of [[1,0],[0,1],[-1,0],[0,-1]]){
   const nx=x+dx,ny=y+dy,nk=key(nx,ny);
   if(nx<0||ny<0||nx>=map.w||ny>=map.h||map.walls.has(nk))continue;
   const nd=cost+(preferred(map,nx,ny)?1:3);
   if(nd<(dist.get(nk)??Infinity)){dist.set(nk,nd);prev.set(nk,k);todo.push([nd,nx,ny]);}
  }
 }
 if(!dist.has(goal))return null;
 const result=[];for(let k=goal;k!==start;k=prev.get(k))result.push(k);result.push(start);return result;
}
export function walkwayCells(map){
 if(cache.has(map))return cache.get(map);
 const cells=new Set();const unreachable=[];
 if(outdoor.has(map.id)&&map.portals.length){const root=map.portals[0];for(const portal of map.portals){const path=shortest(map,root,portal);if(!path)unreachable.push(key(portal.x,portal.y));else for(const cell of path)cells.add(cell);}}
 const result={cells,unreachable};cache.set(map,result);return result;
}
export function isWalkway(map,x,y){return walkwayCells(map).cells.has(key(x,y))&&!map.walls.has(key(x,y));}
export function auditWalkwayNetwork(maps){const issues=[];for(const id of outdoor){const map=maps[id];if(!map)continue;const {cells,unreachable}=walkwayCells(map);for(const cell of unreachable)issues.push(`${id}: Weg zu Portal ${cell} unterbrochen`);for(const cell of cells)if(map.walls.has(cell))issues.push(`${id}: Hindernis auf Weg ${cell}`);for(const portal of map.portals)if(!cells.has(key(portal.x,portal.y)))issues.push(`${id}: Portal ${portal.x},${portal.y} ohne Weg`);}return issues;}
