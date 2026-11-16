// Phase 8: grid-based developer layout editor. No gameplay canvas interception.
export function gridCellFromPointer(clientX,clientY,rect,width,height,columns,rows){
 if(!rect||rect.width<=0||rect.height<=0||!Number.isFinite(clientX)||!Number.isFinite(clientY))return null;
 const x=Math.floor((clientX-rect.left)/rect.width*columns),y=Math.floor((clientY-rect.top)/rect.height*rows);
 return x>=0&&y>=0&&x<columns&&y<rows?{x,y}:null;
}
export function objectAtCell(items,x,y){return [...items].reverse().find(o=>x>=o.x&&x<o.x+o.w&&y>=o.y&&y<o.y+o.h)||null}
export function paintLayoutGrid(canvas,items,columns,rows,selectedId,player){
 const context=canvas.getContext('2d');if(!context)return;
 const unit=24;canvas.width=columns*unit;canvas.height=rows*unit;
 context.fillStyle='#f3f1dd';context.fillRect(0,0,canvas.width,canvas.height);
 context.strokeStyle='#c6d4bd';context.lineWidth=1;
 for(let x=0;x<=columns;x++){context.beginPath();context.moveTo(x*unit+.5,0);context.lineTo(x*unit+.5,canvas.height);context.stroke()}
 for(let y=0;y<=rows;y++){context.beginPath();context.moveTo(0,y*unit+.5);context.lineTo(canvas.width,y*unit+.5);context.stroke()}
 for(const o of items){context.fillStyle=o.id===selectedId?'#e4ad50':o.kind==='building'?'#729e87':'#88a9c2';context.fillRect(o.x*unit+2,o.y*unit+2,o.w*unit-4,o.h*unit-4);context.fillStyle='#172e26';context.font='10px sans-serif';context.fillText(o.id.slice(0,Math.max(3,o.w*4)),o.x*unit+3,o.y*unit+13);if(o.door){context.fillStyle='#b34c37';context.fillRect(o.door.x*unit+7,o.door.y*unit+7,10,10)}}
 if(player&&player.x>=0&&player.y>=0&&player.x<columns&&player.y<rows){context.fillStyle='#2756c5';context.beginPath();context.arc((player.x+.5)*unit,(player.y+.5)*unit,5,0,Math.PI*2);context.fill()}
}
