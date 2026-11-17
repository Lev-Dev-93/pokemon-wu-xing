// Phase 15: coherent breeder-yard architecture and path transitions.
// Pure rendering; never edits collision, portals or story state.
const T=32;
const tileKey=(x,y)=>`${x},${y}`;
export function yardWalkway(x,y){return x===7&&y>=2&&y<=10||y===10&&x>=4&&x<=10;}
export function yardArchitecturePixels(map){
 if(map.id!=='yard')return [];
 const out=[];
 const add=(x,y,w,h,color)=>out.push({x,y,w,h,color});
 const safe=(x,y)=>x>=0&&y>=0&&x<map.w&&y<map.h&&!map.walls.has(tileKey(x,y))&&!map.portals.some(p=>p.x===x&&p.y===y);
 // Soft irregular grass-to-earth transition, no solid tile-sized outlines.
 for(let y=2;y<map.h-1;y++)for(let x=1;x<map.w-1;x++){
  if(!safe(x,y)||!yardWalkway(x,y))continue;
  const X=x*T,Y=y*T;
  for(const [dx,dy] of [[-1,0],[1,0],[0,-1],[0,1]]){
   const nx=x+dx,ny=y+dy;
   if(!safe(nx,ny)||yardWalkway(nx,ny))continue;
   const seed=(x*31+y*17+dx*7+dy*13+200)%5;
   if(dx!==0){const edge=dx<0?X:X+29;for(let i=0;i<3;i++)add(edge+(dx<0?0:0),Y+5+i*9+seed%3,3+(i%2),4,'#a9ae78');}
   else {const edge=dy<0?Y:Y+29;for(let i=0;i<3;i++)add(X+4+i*9+seed%3,edge,5,3,'#a9ae78');}
  }
  if((x*7+y*11)%3===0){add(X+8,Y+12,8,2,'#e4cea0');add(X+21,Y+23,5,2,'#ae956c');}
 }
 // Barn's long fascia and structural timber, within the existing footprint.
 add(T+2,2,6*T-4,5,'#604335');add(T+5,4,6*T-10,2,'#dfb47a');
 for(let x=1;x<=6;x++){
  const X=x*T;
  add(X+3,T+3,4,24,'#785239');add(X+26,T+3,3,24,'#785239');
  add(X+7,T+8,18,2,'#d2a777');
 }
 // The fenced pasture has a consistent top rail and visible timber grain.
 for(let x=9;x<=14;x++){
  const X=x*T;
  add(X+3,3*T+9,26,2,'#f1d19b');
  if(x!==10)add(X+3,7*T+9,26,2,'#f1d19b');
 }
 for(let y=4;y<=6;y++)for(const x of [9,14]){
  add(x*T+3,y*T+9,26,2,'#f1d19b');
 }
 return out;
}
