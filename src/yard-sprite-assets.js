// Phase 16: original PNG sprite assets. No dependency on DOM during Node tests.
// All atlas cells are 32x32; building footprints match the yard collision grid.
export const YARD_ASSETS=Object.freeze({
 terrain:'./assets/tilesets/yard_terrain_32.png',
 props:'./assets/tilesets/yard_props_32.png',
 trees:'./assets/tilesets/yard_trees_96.png',
 pond:'./assets/tilesets/yard_pond_3x2.png',
 pathEdges:'./assets/tilesets/yard_path_edges_32.png',
 home:'./assets/buildings/zuechterhaus_224x64.png',
 barn:'./assets/buildings/scheune_160x64.png',
 buildingShadows:'./assets/tilesets/yard_building_shadows.png'
});
const cache=new Map();
export function yardAsset(key){
 if(typeof Image==='undefined'||!YARD_ASSETS[key])return null;
 if(!cache.has(key)){
  const img=new Image();
  const item={img,ready:false};cache.set(key,item);
  img.onload=()=>{item.ready=true};
  img.onerror=()=>{item.ready=false};
  img.src=new URL('../'+YARD_ASSETS[key],import.meta.url).href;
 }
 const entry=cache.get(key);
 return entry.ready?entry.img:null;
}
export function drawYardSpriteBuildings(ctx){
 if(typeof ctx.drawImage!=='function')return false;
 const home=yardAsset('home'),barn=yardAsset('barn');
 if(!home||!barn)return false;
 const shadows=yardAsset('buildingShadows');
 if(shadows){
  ctx.drawImage(shadows,64,0,224,32,2*32,2*32,224,32);
  ctx.drawImage(shadows,320,0,160,32,10*32,2*32,160,32);
 }
 ctx.drawImage(home,2*32,0,224,64);
 ctx.drawImage(barn,10*32,0,160,64);
 return true;
}
export function drawYardTerrainTile(ctx,x,y,kind='grass'){
 if(typeof ctx.drawImage!=='function')return false;
 const atlas=yardAsset('terrain');if(!atlas)return false;
 const variant=kind==='path'?3+(x+y)%2:(x*7+y*13)%3;
 ctx.drawImage(atlas,(variant%8)*32,Math.floor(variant/8)*32,32,32,x*32,y*32,32,32);
 return true;
}

// Atlas-backed environmental props. Source cells are always 32x32 pixels.
export function drawYardProp(ctx,index,x,y){
 if(typeof ctx.drawImage!=='function'||!Number.isInteger(index)||index<0||index>=32)return false;
 const atlas=yardAsset('props');if(!atlas)return false;
 ctx.drawImage(atlas,(index%8)*32,Math.floor(index/8)*32,32,32,x*32,y*32,32,32);
 return true;
}
export function drawYardFenceSprite(ctx,x,y,vertical=false){
 return drawYardProp(ctx,vertical?6:5,x,y);
}

// Multi-cell PNG props render at native pixel resolution, without changing collisions.
export function drawYardTree(ctx,x,y,variant=0){
 if(typeof ctx.drawImage!=='function')return false;
 const atlas=yardAsset('trees');if(!atlas)return false;
 ctx.drawImage(atlas,(variant%2)*96,0,96,96,x*32-16,y*32-32,96,96);return true;
}
export function drawYardPond(ctx){
 if(typeof ctx.drawImage!=='function')return false;
 const atlas=yardAsset('pond');if(!atlas)return false;
 ctx.drawImage(atlas,2*32,8*32,96,64);return true;
}
export function drawYardPathEdge(ctx,x,y,mask){
 if(typeof ctx.drawImage!=='function')return false;
 const atlas=yardAsset('pathEdges');if(!atlas)return false;
 ctx.drawImage(atlas,(mask%4)*32,Math.floor(mask/4)*32,32,32,x*32,y*32,32,32);return true;
}
