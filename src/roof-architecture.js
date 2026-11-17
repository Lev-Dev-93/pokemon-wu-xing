// Distinctive original pixel roofs; every rectangle stays inside its building footprint.
export function roofArchitecture(building){
 const {x,y,w,h,label=''}=building??{};
 if(![x,y,w,h].every(Number.isInteger)||w<1||h<1)return [];
 const kind=/labor|forsch/i.test(label)?'slate':/haus|heim/i.test(label)?'copper':((x+3*y)%2?'clay':'moss');
 const palettes={slate:['#466c79','#2d515d','#9ac0c2'],copper:['#a16d51','#795044','#e5b18b'],clay:['#a85d4b','#743e3b','#d88b6a'],moss:['#6d8062','#485e4d','#a7b88b']};
 const [base,shade,light]=palettes[kind];
 const shapes=[];
 const put=(xx,yy,ww,hh,color)=>shapes.push({x:xx,y:yy,w:ww,h:hh,color});
 for(let i=0;i<w;i++){
  const px=(x+i)*32,py=y*32;
  put(px+1,py+1,30,25,base);
  put(px+1,py+24,30,4,shade);
  put(px+3,py+4,26,2,light);
  for(let r=0;r<2;r++){
   const yy=py+10+r*8;
   put(px+2,yy,28,2,shade);
   const offset=((i+r)%2)*10;
   put(px+5+offset,yy+3,8,2,light);
  }
  // Roof edge silhouette and eaves are clipped to the original tile.
  put(px+2,py+28,28,3,light);
  if(i===0)put(px+1,py+4,3,24,shade);
  if(i===w-1)put(px+28,py+4,3,24,shade);
 }
 // Roof skylight on larger research buildings, entirely inside top-row tiles.
 if(kind==='slate'&&w>=3){
  const cx=(x+Math.floor(w/2))*32;
  put(cx+8,y*32+8,16,12,shade);
  put(cx+10,y*32+10,12,8,'#a6d4d4');
  put(cx+15,y*32+10,2,8,'#e4efdc');
 }
 // Awnings, wooden crossbeams and lower facade motifs.
 if(h>=2){
  const by=(y+h-1)*32;
  for(let i=0;i<w;i++){
   const px=(x+i)*32;
   put(px+2,by+2,28,3,shade);
   if(kind==='copper'||kind==='moss'){
    put(px+3,by+5,3,21,shade);
    put(px+26,by+5,3,21,shade);
    put(px+6,by+21,20,3,light);
   }else if(i%2===0){
    put(px+4,by+6,24,2,light);
    put(px+4,by+9,3,13,shade);
   }
  }
 }
 return shapes;
}
