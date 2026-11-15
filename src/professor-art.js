// Einfache eigenständige Pixel-Silhouette für die Professor-Demonstration.
export function drawProfessorOverlay(ctx,width,height,phase){
 if(phase==='none')return;
 ctx.save();const s=Math.min(width,height)/320,cx=width*.64,cy=height*.52;
 ctx.fillStyle='rgba(12,35,27,.32)';ctx.fillRect(0,0,width,height);
 if(phase==='capture'){
  ctx.fillStyle='#f8f7f2';ctx.beginPath();ctx.arc(cx,cy,20*s,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#d34e52';ctx.beginPath();ctx.arc(cx,cy,20*s,Math.PI,0);ctx.fill();
  ctx.strokeStyle='#25343c';ctx.lineWidth=4*s;ctx.beginPath();ctx.moveTo(cx-20*s,cy);ctx.lineTo(cx+20*s,cy);ctx.stroke();
  ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(cx,cy,6*s,0,Math.PI*2);ctx.fill();ctx.restore();return;
 }
 ctx.fillStyle='#e3c53f';ctx.beginPath();ctx.ellipse(cx,cy+13*s,38*s,22*s,0,0,Math.PI*2);ctx.fill();
 ctx.beginPath();ctx.arc(cx-19*s,cy-9*s,17*s,0,Math.PI*2);ctx.fill();
 ctx.beginPath();ctx.arc(cx+9*s,cy-8*s,17*s,0,Math.PI*2);ctx.fill();
 ctx.fillStyle='#8c6825';ctx.fillRect(cx-27*s,cy-21*s,8*s,8*s);ctx.fillRect(cx-2*s,cy-20*s,8*s,8*s);
 ctx.fillStyle='#252b2c';ctx.fillRect(cx-25*s,cy-11*s,4*s,4*s);
 if(phase==='shiny'){ctx.fillStyle='#fff5a0';for(const [x,y] of [[-53,-40],[42,-33],[-44,29],[51,21]]){ctx.fillRect(cx+x*s,cy+y*s,5*s,15*s);ctx.fillRect(cx+(x-5)*s,cy+(y+5)*s,15*s,5*s)}}
 if(phase==='battle'){ctx.strokeStyle='#f5f1c7';ctx.lineWidth=5*s;ctx.beginPath();ctx.moveTo(cx-100*s,cy+10*s);ctx.lineTo(cx-42*s,cy+10*s);ctx.stroke()}
 ctx.restore();
}
