// Original decorative 32px bedroom tiles, strictly visual; no collision or interaction changes.
export const BEDROOM_DETAIL_ATLAS='./assets/tilesets/bedroom_detail_32.png';
export const BEDROOM_DETAIL_LAYOUT=Object.freeze([[0,4,4],[1,5,4],[2,4,5],[3,5,5],[4,5,0],[5,3,0],[6,8,5],[7,3,2]]);
let image=null,ready=false;
export function drawBedroomDetails(ctx){
 if(typeof Image==='undefined'||typeof ctx.drawImage!=='function')return false;
 if(!image){image=new Image();image.onload=()=>{ready=true};image.onerror=()=>{ready=false};image.src=new URL('../'+BEDROOM_DETAIL_ATLAS,import.meta.url).href;}
 if(!ready)return false;
 for(const [tile,x,y] of BEDROOM_DETAIL_LAYOUT)ctx.drawImage(image,tile*32,0,32,32,x*32,y*32,32,32);
 return true;
}
