// Original 32px interior floor and wall tiles. Rendered beneath furnishings.
export const INTERIOR_SURFACE_ATLAS='./assets/tilesets/interior_surfaces_32.png';
let sprite=null,ready=false;
export function drawInteriorSurface(ctx,index,x,y){
 if(typeof Image==='undefined'||typeof ctx.drawImage!=='function')return false;
 if(!sprite){sprite=new Image();sprite.onload=()=>{ready=true};sprite.onerror=()=>{ready=false};sprite.src=new URL('../'+INTERIOR_SURFACE_ATLAS,import.meta.url).href;}
 if(!ready||!Number.isInteger(index)||index<0||index>5)return false;
 ctx.drawImage(sprite,index*32,0,32,32,x*32,y*32,32,32);
 return true;
}
export function drawStartHomeSurfaces(ctx,room){
 if(!['bedroom','ground','upper'].includes(room))return;
 const width=room==='ground'?12:10, height=room==='ground'?9:8;
 for(let y=0;y<height;y++)for(let x=0;x<width;x++){
  const index=y===0?(room==='ground'?4:3):room==='ground'?(x<6?1:2):room==='bedroom'?0:2;
  drawInteriorSurface(ctx,index,x,y);
 }
}
