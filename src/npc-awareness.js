// Optional ambient attention: visual facing only; never alters positions or story state.
export function orientNearbyNpcs(actors,player){
 if(!Array.isArray(actors)||!Number.isInteger(player?.x)||!Number.isInteger(player?.y))return actors;
 return actors.map(actor=>{
  if(!actor?.noticePlayer||!Number.isInteger(actor.x)||!Number.isInteger(actor.y))return actor;
  const dx=player.x-actor.x,dy=player.y-actor.y;
  const radius=actor.noticeRadius??2;
  if(!Number.isInteger(radius)||radius<1||radius>5||Math.abs(dx)+Math.abs(dy)>radius||dx===0&&dy===0)return actor;
  const facing=Math.abs(dx)>=Math.abs(dy)?(dx>0?'right':'left'):(dy>0?'down':'up');
  return actor.facing===facing?actor:{...actor,facing};
 });
}
