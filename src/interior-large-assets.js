// Large-format original interior sprites, independent from map collisions.
// 64px atlas tiles drawn at native size over two 32px map cells.
export const LARGE_INTERIOR_ATLAS='./assets/tilesets/interior_furniture_64.png';
let atlas=null,loaded=false;
export const LARGE_FURNISHINGS=Object.freeze({
 bedroom:[[0,1,1],[1,7,1]],
 ground:[[2,1,1],[6,3,5],[4,8,3]],
 upper:[[3,8,1],[5,1,4]]
});
export function drawLargeInteriorFurnishings(ctx,room){
 if(typeof Image==='undefined'||typeof ctx.drawImage!=='function')return false;
 if(!atlas){atlas=new Image();atlas.onload=()=>{loaded=true};atlas.onerror=()=>{loaded=false};atlas.src=new URL('../'+LARGE_INTERIOR_ATLAS,import.meta.url).href;}
 if(!loaded)return false;
 for(const [index,x,y] of LARGE_FURNISHINGS[room]||[])ctx.drawImage(atlas,(index%8)*64,Math.floor(index/8)*64,64,64,x*32,y*32,64,64);
 return true;
}
