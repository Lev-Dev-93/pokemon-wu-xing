// Temporäre eigenständige Canvas-Silhouette, keine externen Assets.
export function drawAbsolOverlay(ctx,width,height,phase){
 if(!['arrival','partner'].includes(phase))return;
 ctx.save();const s=Math.min(width,height)/300,cx=width*.65,cy=height*.49;
 if(phase==='arrival'){ctx.fillStyle='rgba(36,17,60,.25)';ctx.fillRect(0,0,width,height);ctx.strokeStyle='#d8b8f0';ctx.lineWidth=5*s;ctx.beginPath();ctx.moveTo(cx-33*s,cy-66*s);ctx.lineTo(cx-14*s,cy-21*s);ctx.lineTo(cx-28*s,cy+27*s);ctx.lineTo(cx-5*s,cy+66*s);ctx.stroke()}
 ctx.fillStyle='#e7e8ef';ctx.beginPath();ctx.ellipse(cx+30*s,cy+20*s,28*s,24*s,0,0,Math.PI*2);ctx.fill();
 ctx.beginPath();ctx.ellipse(cx+8*s,cy-14*s,20*s,23*s,0,0,Math.PI*2);ctx.fill();
 ctx.fillStyle='#293344';ctx.beginPath();ctx.moveTo(cx-5*s,cy-26*s);ctx.lineTo(cx-32*s,cy-62*s);ctx.lineTo(cx-14*s,cy-17*s);ctx.fill();
 ctx.beginPath();ctx.moveTo(cx+14*s,cy-27*s);ctx.lineTo(cx+30*s,cy-44*s);ctx.lineTo(cx+26*s,cy-7*s);ctx.fill();
 ctx.fillRect(cx+13*s,cy+36*s,8*s,22*s);ctx.fillRect(cx+42*s,cy+36*s,8*s,22*s);
 ctx.fillStyle='#d43b55';ctx.fillRect(cx-3*s,cy-12*s,5*s,4*s);ctx.restore();
}
