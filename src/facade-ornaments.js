// Original 32-pixel facade accents. All geometry stays within existing building cells.
export function facadeOrnaments(building){
 const {x,y,w,h,label=''}=building;
 if(![x,y,w,h].every(Number.isInteger)||w<1||h<1)return [];
 const style=label.toLowerCase().includes('labor')?'labor':(x+y)%2?'timber':'brick';
 const shapes=[];
 for(let i=0;i<w;i++){
  const px=(x+i)*32,py=y*32;
  shapes.push({x:px+2,y:py+3,w:28,h:3,color:style==='labor'?'#b9c7c3':'#e3a07b'});
  shapes.push({x:px+5,y:py+11,w:22,h:2,color:style==='timber'?'#f0bd83':'#6f493e'});
  if(i>0&&i<w-1&&h>1){
   const wy=(y+h-1)*32+7;
   shapes.push({x:px+6,y:wy,w:20,h:3,color:'#5d473b'});
   shapes.push({x:px+8,y:wy+3,w:16,h:12,color:style==='labor'?'#91c5ce':'#8fb9ae'});
   shapes.push({x:px+15,y:wy+3,w:2,h:12,color:'#f0dbaf'});
   shapes.push({x:px+6,y:wy+15,w:20,h:3,color:'#b37d57'});
  }
 }
 return shapes;
}
