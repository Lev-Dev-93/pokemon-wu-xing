// Pure interaction resolution. NPCs take precedence over static objects when
// legacy map data puts both on the same tile; input arrays are never mutated.
export function interactionTarget(npcs=[],objects=[],x,y){
 if(!Number.isInteger(x)||!Number.isInteger(y))return null;
 return (Array.isArray(npcs)?npcs:[]).find(a=>a?.x===x&&a?.y===y)
   ??(Array.isArray(objects)?objects:[]).find(a=>a?.x===x&&a?.y===y)??null;
}
export function auditInteractionTargets(map,npcs=[],objects=[]){
 const issues=[];
 if(!map||!Number.isInteger(map.w)||!Number.isInteger(map.h))return ['Ungültige Karte'];
 const seen=new Map();
 for(const [kind,actors] of [['NPC',npcs],['Objekt',objects]]){
  if(!Array.isArray(actors)){issues.push(`${kind}-Liste ungültig`);continue;}
  for(const actor of actors){
   if(!actor||!Number.isInteger(actor.x)||!Number.isInteger(actor.y)||actor.x<0||actor.y<0||actor.x>=map.w||actor.y>=map.h){issues.push(`${kind} außerhalb der Karte`);continue;}
   const key=`${actor.x},${actor.y}`;
   if(seen.has(key))issues.push(`${kind} ${actor.id??'?'} teilt Interaktionsfeld ${key} mit ${seen.get(key)}`);
   else seen.set(key,`${kind} ${actor.id??'?'}`);
  }
 }
 return issues;
}
