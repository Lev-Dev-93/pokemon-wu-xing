// Original interior furnishings, 8x2 atlas of 32px transparent sprites.
// Visual-only overlays: collision and object interaction remain map-driven.
export const INTERIOR_ATLAS='./assets/tilesets/interior_furniture_32.png';
let sprite=null,ready=false;
export function drawInteriorFurnishing(ctx,index,x,y){
 if(typeof Image==='undefined'||typeof ctx.drawImage!=='function')return false;
 if(!sprite){sprite=new Image();sprite.onload=()=>{ready=true};sprite.onerror=()=>{ready=false};sprite.src=new URL('../'+INTERIOR_ATLAS,import.meta.url).href;}
 if(!ready||!Number.isInteger(index)||index<0||index>15)return false;
 ctx.drawImage(sprite,(index%8)*32,Math.floor(index/8)*32,32,32,x*32,y*32,32,32);
 return true;
}
export const START_HOME_FURNISHINGS=Object.freeze({
 bedroom:[[0,1,1],[1,7,1],[5,8,3],[2,2,1]],
 ground:[[2,1,1],[6,2,1],[3,3,5],[4,8,1],[1,9,1],[5,10,5]]
});
export function drawStartHomeFurnishings(ctx,room){
 for(const [index,x,y] of START_HOME_FURNISHINGS[room]||[])drawInteriorFurnishing(ctx,index,x,y);
}
