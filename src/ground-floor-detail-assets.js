// Decorative 32px PNG sprites for the starter home's ground floor.
// This layer never creates portals, objects, or collision cells.
export const GROUND_FLOOR_DETAIL_ATLAS='./assets/tilesets/ground_floor_details_32.png';
export const GROUND_FLOOR_DETAILS=Object.freeze([
 [0,1,1],[1,2,1],[2,4,1],[8,3,1], // kitchen
 [9,4,4],[3,2,4],[14,5,4], // dining area
 [6,8,1],[10,8,4],[11,9,6],[12,7,1],[7,11,4], // living room
 [5,6,1],[4,7,6],[15,5,7] // lighting, rugs, entry
]);
let atlas=null,loaded=false;
export function drawGroundFloorDetails(ctx){
 if(typeof Image==='undefined'||typeof ctx.drawImage!=='function')return false;
 if(!atlas){atlas=new Image();atlas.onload=()=>{loaded=true};atlas.onerror=()=>{loaded=false};atlas.src=new URL('../'+GROUND_FLOOR_DETAIL_ATLAS,import.meta.url).href;}
 if(!loaded)return false;
 for(const [index,x,y] of GROUND_FLOOR_DETAILS){ctx.drawImage(atlas,(index%8)*32,Math.floor(index/8)*32,32,32,x*32,y*32,32,32)}
 return true;
}
