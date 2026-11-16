export function validatePortalCoordinates(world){
 const issues=[];
 for(const [id,map] of Object.entries(world||{})){
  if(!map||!Number.isInteger(map.w)||!Number.isInteger(map.h)||map.w<=0||map.h<=0){issues.push(`${id}: ungültige Kartengröße`);continue;}
  if(!Array.isArray(map.portals)){issues.push(`${id}: Portalliste fehlt`);continue;}
  for(const [i,p] of map.portals.entries())if(!p||![p.x,p.y,p.tx,p.ty].every(Number.isInteger)||p.x<0||p.y<0||p.x>=map.w||p.y>=map.h)issues.push(`${id}: Portal ${i} hat ungültige Koordinaten`);
 }return issues;
}

export function validatePortalDestinations(world){
 const issues=[];
 for(const [id,map] of Object.entries(world||{}))for(const [i,p] of (Array.isArray(map?.portals)?map.portals:[]).entries()){
  const dest=world[p?.target];
  if(!dest){issues.push(`${id}: Portal ${i} ohne Zielkarte`);continue;}
  if(!Number.isInteger(p.tx)||!Number.isInteger(p.ty)||p.tx<0||p.ty<0||p.tx>=dest.w||p.ty>=dest.h)issues.push(`${id}: Portal ${i} landet außerhalb von ${p.target}`);
  else if(dest.walls?.has?.(`${p.tx},${p.ty}`))issues.push(`${id}: Portal ${i} landet in einer Wand`);
 }return issues;
}

export function validateReciprocalPortals(world){
 const issues=[];
 for(const [id,map] of Object.entries(world||{}))for(const [i,p] of (Array.isArray(map?.portals)?map.portals:[]).entries()){
  const target=world[p?.target];if(!target)continue;
  if(!Array.isArray(target.portals)||!target.portals.some(q=>q?.target===id))issues.push(`${id}: Portal ${i} hat keinen Rückweg`);
 }return issues;
}

export function validateActors(world,actors){
 const issues=[];
 for(const [id,entries] of Object.entries(actors||{})){
  const map=world?.[id];if(!map){if(entries?.length)issues.push(`${id}: NPC-Karte fehlt`);continue;}
  for(const [i,n] of (Array.isArray(entries)?entries:[]).entries()){
   if(!n||!Number.isInteger(n.x)||!Number.isInteger(n.y)||n.x<0||n.y<0||n.x>=map.w||n.y>=map.h||map.walls?.has?.(`${n.x},${n.y}`))issues.push(`${id}: NPC ${i} blockiert oder außerhalb`);
  }
 }return issues;
}

export function validateObjects(world,objects){
 const issues=[];
 for(const [id,entries] of Object.entries(objects||{})){
  const map=world?.[id];if(!map){if(entries?.length)issues.push(`${id}: Objektkarte fehlt`);continue;}
  for(const [i,o] of (Array.isArray(entries)?entries:[]).entries()){
   if(!o||!Number.isInteger(o.x)||!Number.isInteger(o.y)||o.x<0||o.y<0||o.x>=map.w||o.y>=map.h)issues.push(`${id}: Objekt ${i} außerhalb`);
  }
 }return issues;
}
