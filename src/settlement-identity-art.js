// Original pixel architecture: visual-only overlays, clipped to existing building footprints.
// No new collision, interactable objects, portals, or world items.
const TILE=32;
const PALETTES={
 village:{roof:'#6f4d73',trim:'#e0c59c',dark:'#554151',glass:'#9dc7c6',accent:'#b9a4c7'},
 beerendorf:{roof:'#80533f',trim:'#ebc792',dark:'#614333',glass:'#a7c9ab',accent:'#d49c65'},
 professor_clearing:{roof:'#496c71',trim:'#e2d5ae',dark:'#38535b',glass:'#a7d6cf',accent:'#8cb8ad'}
};
const rect=(out,x,y,w,h,color,building)=>{
 const left=building.x*TILE,top=building.y*TILE,right=(building.x+building.w)*TILE,bottom=(building.y+building.h)*TILE;
 if(w>0&&h>0&&x>=left&&y>=top&&x+w<=right&&y+h<=bottom)out.push({x,y,w,h,color});
};
export function settlementBuildingDetails(mapId,building){
 const p=PALETTES[mapId];
 if(!p||!building||![building.x,building.y,building.w,building.h].every(Number.isInteger)||building.w<2||building.h<2)return [];
 const out=[],X=building.x*TILE,Y=building.y*TILE,W=building.w*TILE,H=building.h*TILE;
 const add=(x,y,w,h,color)=>rect(out,x,y,w,h,color,building);
 // Roof silhouette: staggered slate shingles, ridge caps, and a clear lower eave.
 add(X+2,Y+2,W-4,4,p.dark);add(X+4,Y+3,W-8,2,p.trim);
 for(let row=0;row<3;row++)for(let col=0;col<building.w*2-1;col++){
  const sx=X+5+col*16+(row%2)*5,sy=Y+9+row*6;
  if(sx+10>X+W-3)continue;
  add(sx,sy,10,2,row===1?p.accent:p.roof);
  add(sx+2,sy+2,3,1,p.trim);
 }
 add(X+2,Y+29,W-4,3,p.dark);
 // A distinct architectural signature is selected by location and existing label.
 const label=String(building.label||'').toUpperCase();
 const isWorkshop=label.includes('WERK'),isShop=label.includes('LADEN'),isChapel=label.includes('KAPEL'),isRival=label.includes('RIVALE');
 const isResearch=mapId==='professor_clearing';
 if(isWorkshop){
  // Workshop: timber braces and a copper-colored workshop emblem.
  for(const xx of [X+5,X+W-9]){add(xx,Y+35,4,H-42,p.dark);add(xx+1,Y+38,2,H-48,p.trim)}
  add(X+W/2-10,Y+37,20,12,p.dark);add(X+W/2-7,Y+40,14,6,p.accent);add(X+W/2-1,Y+38,2,10,p.trim);
 }else if(isShop){
  // Berry merchant: striped awning above the existing lower facade.
  add(X+6,Y+35,W-12,10,p.trim);
  for(let i=0;i<Math.floor((W-12)/12);i++)add(X+6+i*12,Y+35,6,10,i%2?p.roof:p.accent);
  add(X+7,Y+45,W-14,3,p.dark);
 }else if(isChapel){
  // Chapel: stained-glass rosette and a restrained carved arch.
  add(X+W/2-9,Y+36,18,18,p.dark);add(X+W/2-6,Y+39,12,12,p.glass);
  add(X+W/2-1,Y+39,2,12,p.trim);add(X+W/2-6,Y+44,12,2,p.trim);
  add(X+W/2-3,Y+12,6,11,p.trim);add(X+W/2-7,Y+16,14,3,p.trim);
 }else if(isResearch){
  // Research house: glass roof light and twin vent bands.
  add(X+W/2-16,Y+10,32,15,p.dark);add(X+W/2-13,Y+12,26,10,p.glass);
  add(X+W/2-1,Y+12,2,10,p.trim);
  for(const xx of [X+10,X+W-19]){add(xx,Y+38,9,3,p.dark);add(xx,Y+43,9,3,p.trim)}
 }else{
  // Homes: exposed wood beam, shutters and a small unique gable.
  add(X+W/2-8,Y+11,16,12,p.dark);add(X+W/2-5,Y+13,10,7,p.accent);
  for(const xx of [X+9,X+W-14]){add(xx,Y+38,5,16,p.dark);add(xx+1,Y+40,3,12,p.accent)}
  if(isRival)add(X+W/2-3,Y+13,6,5,p.trim);
 }
 // Consistent foot-level foundation and small side pilasters.
 add(X+2,Y+H-7,W-4,3,p.dark);
 add(X+2,Y+33,3,H-41,p.trim);add(X+W-5,Y+33,3,H-41,p.trim);
 return out;
}
export function yardBarnDetails(){
 // The existing barn occupies x=1..6, y=0..1. All accents stay on those tiles.
 const b={x:1,y:0,w:6,h:2},out=[];
 const add=(x,y,w,h,color)=>rect(out,x,y,w,h,color,b);
 const X=32,Y=0,W=192;
 add(X+4,Y+3,W-8,3,'#5f483c');
 for(let i=0;i<10;i++){add(X+8+i*18,Y+10,10,2,'#d3a66f');add(X+13+i*18,Y+18,8,2,'#80513e')}
 for(const xx of [X+6,X+W-12]){add(xx,35,6,24,'#74513a');add(xx+2,38,2,18,'#e1b47b')}
 add(X+W/2-16,38,32,17,'#6b4b3d');add(X+W/2-13,41,26,11,'#9cb8a6');
 add(X+W/2-1,41,2,11,'#f0d5a5');
 return out;
}
