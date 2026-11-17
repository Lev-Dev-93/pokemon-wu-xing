// Phase 11: Original pixel-art furniture. Every sprite stays inside its layout footprint.
// The world renderer and editor use the same object positions; no baked-in furniture.
export const FURNITURE_PALETTE=Object.freeze({outline:'#47382f',wood:'#946440',woodLight:'#d6a06b',highlight:'#f1d2a0',cloth:'#648f83',clothLight:'#9fc3ae',screen:'#6ac6c7',metal:'#9da9ad',leaf:'#4b8658'});
export const FURNITURE_ARTS=Object.freeze(['bed','desk','table','pc','pot','shelf','chair','sofa','dresser','counter']);
export function furnitureBounds(object,tile=32){return {x:object.x*tile,y:object.y*tile,w:object.w*tile,h:object.h*tile}}
export function drawFurnitureSprite(ctx,object,tile=32){
 const {x,y,w,h}=furnitureBounds(object,tile);const p=FURNITURE_PALETTE;
 const rect=(dx,dy,dw,dh,color)=>{if(dw>0&&dh>0){ctx.fillStyle=color;ctx.fillRect(Math.round(x+dx),Math.round(y+dy),Math.round(dw),Math.round(dh))}};
 // All shapes are clipped to the collision footprint, including narrow 1-cell objects.
 const canClip=typeof ctx.save==='function'&&typeof ctx.clip==='function';
 if(canClip){ctx.save();ctx.beginPath();ctx.rect(x,y,w,h);ctx.clip();}
 const frame=(inset=3)=>{rect(inset,5,w-2*inset,h-9,p.outline);rect(inset+3,7,w-2*inset-6,h-14,p.wood);rect(inset+5,9,w-2*inset-10,3,p.woodLight)};
 switch(object.art){
 case 'bed':frame(2);rect(6,9,w-12,Math.max(8,h*.27),p.highlight);rect(6,h*.37,w-12,h*.52,p.cloth);rect(9,h*.4,w-18,3,p.clothLight);break;
 case 'desk':case 'table':frame(2);rect(7,10,w-14,4,p.woodLight);if(object.art==='desk'){rect(w*.3,17,w*.4,7,p.highlight);rect(w-15,11,6,9,p.cloth)}break;
 case 'pc':frame(3);rect(w*.25,3,w*.5,Math.min(h-7,23),p.outline);rect(w*.25+3,6,w*.5-6,Math.min(h-13,14),p.screen);rect(w*.43,23,w*.14,3,p.metal);break;
 case 'pot':rect(w*.31,h*.56,w*.38,h*.35,p.wood);rect(w*.25,h*.52,w*.5,4,p.woodLight);rect(w*.44,4,w*.12,h*.52,p.leaf);rect(5,h*.29,w*.46,7,p.leaf);rect(w*.5,h*.19,w*.38,8,p.cloth);break;
 case 'shelf':frame(3);rect(5,h*.45,w-10,3,p.woodLight);for(let i=0;i<4;i++)rect(8+i*(w-14)/4,10,Math.max(2,(w-14)/6),h*.27,[p.cloth,p.highlight,p.leaf,p.woodLight][i]);break;
 case 'chair':frame(6);rect(9,5,w-18,8,p.cloth);break;
 case 'sofa':frame(2);rect(5,7,w-10,h*.43,p.cloth);rect(5,h*.53,w-10,h*.29,p.clothLight);rect(w*.48,7,3,h*.7,p.outline);break;
 case 'dresser':frame(2);rect(w*.49,8,3,h-16,p.outline);rect(w*.39,h*.54,3,4,p.highlight);rect(w*.6,h*.54,3,4,p.highlight);break;
 case 'counter':frame(1);rect(4,8,w-8,8,p.woodLight);rect(7,19,w-14,6,p.wood);break;
 default:frame(3);
 }
 if(canClip)ctx.restore();
}
