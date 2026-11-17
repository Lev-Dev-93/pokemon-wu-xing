// Original bedroom PC sprite. The interaction remains driven by maps.js.
const url=new URL('../assets/tilesets/bedroom_pc_32.png',import.meta.url).href;
let sprite=null,ready=false;
export function drawBedroomPcSprite(ctx,x,y){
 if(typeof Image==='undefined'||typeof ctx.drawImage!=='function')return false;
 if(!sprite){sprite=new Image();sprite.onload=()=>{ready=true};sprite.onerror=()=>{ready=false};sprite.src=url;}
 if(!ready)return false;
 ctx.drawImage(sprite,x*32,y*32,32,32);return true;
}
