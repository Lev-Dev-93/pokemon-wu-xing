// Originale Canvas-Effektgrafik: keine externen Assets, kein Eingriff in den Spielzustand.
export function drawRiftOverlay(ctx,width,height,phase){
 if(!['distortion','giratina','aftermath'].includes(phase))return;
 ctx.save();ctx.fillStyle=phase==='aftermath'?'rgba(43,27,61,.18)':'rgba(31,15,58,.43)';ctx.fillRect(0,0,width,height);
 if(phase!=='aftermath'){
  const cx=width*.54,cy=height*.45,scale=Math.min(width,height)/300;
  ctx.lineCap='round';
  for(let j=0;j<3;j++){
   const x=cx+(j-1)*width*.17,y=cy+(j%2?height*.12:-height*.08);
   ctx.beginPath();ctx.moveTo(x-12*scale,y-65*scale);ctx.lineTo(x+8*scale,y-29*scale);ctx.lineTo(x-5*scale,y+10*scale);ctx.lineTo(x+14*scale,y+51*scale);
   ctx.strokeStyle=j===1?'#e2b8fa':'#ab81db';ctx.lineWidth=6*scale;ctx.stroke();
   ctx.strokeStyle='#342047';ctx.lineWidth=2*scale;ctx.stroke();
  }
  if(phase==='giratina'){
   // Abstrakte Silhouette, bewusst keine Behauptung über eine konkrete Form.
   ctx.fillStyle='#211b32';ctx.beginPath();ctx.ellipse(cx,cy,39*scale,55*scale,0,0,Math.PI*2);ctx.fill();
   ctx.strokeStyle='#b9a26c';ctx.lineWidth=5*scale;
   for(const d of [-1,1]){ctx.beginPath();ctx.moveTo(cx+d*18*scale,cy-20*scale);ctx.lineTo(cx+d*68*scale,cy-55*scale);ctx.stroke();}
   ctx.fillStyle='#dfbb79';ctx.fillRect(cx-17*scale,cy-18*scale,9*scale,5*scale);ctx.fillRect(cx+8*scale,cy-18*scale,9*scale,5*scale);
  }
 }
 ctx.restore();
}
