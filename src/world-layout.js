// Phase 4: immutable, data-driven building and furniture placement definitions.
// These are editable blueprints; existing map layouts remain unchanged until a
// validated migration explicitly applies a blueprint.
const clone = value => JSON.parse(JSON.stringify(value));
export const DEFAULT_LAYOUT = Object.freeze({
  village: [
    {id:'village-west-home',kind:'building',art:'mu-home',x:3,y:3,w:3,h:2,door:{x:4,y:5,target:'village_home',tx:5,ty:6}},
    {id:'village-east-home',kind:'building',art:'mu-home',x:16,y:3,w:3,h:2,door:{x:17,y:5,target:'village_house_east',tx:5,ty:6}},
    {id:'village-chapel',kind:'building',art:'mu-chapel',x:3,y:10,w:3,h:2,door:{x:4,y:12,target:'chapel',tx:5,ty:6}},
    {id:'village-rival-home',kind:'building',art:'mu-home',x:16,y:10,w:3,h:2,door:{x:17,y:12,target:'rival_house',tx:5,ty:6}}
  ],
  professor_clearing:[
    {id:'research-lab',kind:'building',art:'mu-lab',x:2,y:2,w:4,h:2,door:{x:4,y:4,target:'study',tx:5,ty:6}},
    {id:'professor-home',kind:'building',art:'mu-home',x:10,y:2,w:4,h:2,door:{x:12,y:4,target:'professor_house',tx:5,ty:6}}
  ],
  beerendorf:[
    {id:'berry-workshop',kind:'building',art:'mu-workshop',x:2,y:2,w:3,h:2,door:{x:3,y:4,target:'beerendorf_werkstatt',tx:5,ty:6}},
    {id:'berry-herbalist',kind:'building',art:'mu-home',x:11,y:2,w:3,h:2,door:{x:12,y:4,target:'beerendorf_haus',tx:5,ty:6}},
    {id:'berry-shop',kind:'building',art:'mu-shop',x:2,y:11,w:3,h:2,door:{x:3,y:13,target:'beerendorf_haus2',tx:5,ty:6}},
    {id:'berry-residence',kind:'building',art:'mu-home',x:11,y:11,w:3,h:2,door:{x:12,y:13,target:'beerendorf_wohnhaus',tx:5,ty:6}}
  ],
  village_home:[{id:'village_home-pot',kind:'furniture',art:'pot',x:9,y:5,w:1,h:1},{id:'village_home-desk',kind:'furniture',art:'desk',x:7,y:2,w:2,h:1},{id:'village_home-shelf-a',kind:'furniture',art:'shelf',x:2,y:4,w:1,h:1},{id:'village_home-shelf-b',kind:'furniture',art:'shelf',x:3,y:4,w:1,h:1},{id:'village_home-seat',kind:'furniture',art:'sofa',x:1,y:1,w:2,h:1},{id:'village_home-table',kind:'furniture',art:'table',x:4,y:4,w:2,h:1}],
  village_house_east:[{id:'village_house_east-pot',kind:'furniture',art:'pot',x:9,y:5,w:1,h:1},{id:'village_house_east-desk',kind:'furniture',art:'desk',x:7,y:2,w:2,h:1},{id:'village_house_east-shelf-a',kind:'furniture',art:'shelf',x:2,y:4,w:1,h:1},{id:'village_house_east-shelf-b',kind:'furniture',art:'shelf',x:3,y:4,w:1,h:1},{id:'village_house_east-seat',kind:'furniture',art:'sofa',x:1,y:1,w:2,h:1},{id:'village_house_east-table',kind:'furniture',art:'table',x:4,y:4,w:2,h:1}],
  professor_house:[{id:'professor_house-pot',kind:'furniture',art:'pot',x:9,y:5,w:1,h:1},{id:'professor_house-desk',kind:'furniture',art:'desk',x:7,y:2,w:2,h:1},{id:'professor_house-shelf-a',kind:'furniture',art:'shelf',x:2,y:4,w:1,h:1},{id:'professor_house-shelf-b',kind:'furniture',art:'shelf',x:3,y:4,w:1,h:1},{id:'professor_house-seat',kind:'furniture',art:'sofa',x:1,y:1,w:2,h:1},{id:'professor_house-table',kind:'furniture',art:'table',x:4,y:4,w:2,h:1}],
  chapel:[{id:'chapel-pot',kind:'furniture',art:'pot',x:9,y:5,w:1,h:1},{id:'chapel-desk',kind:'furniture',art:'desk',x:7,y:2,w:2,h:1},{id:'chapel-shelf-a',kind:'furniture',art:'shelf',x:2,y:4,w:1,h:1},{id:'chapel-shelf-b',kind:'furniture',art:'shelf',x:3,y:4,w:1,h:1},{id:'chapel-seat',kind:'furniture',art:'sofa',x:1,y:1,w:2,h:1},{id:'chapel-table',kind:'furniture',art:'table',x:4,y:4,w:2,h:1}],
  rival_house:[{id:'rival_house-pot',kind:'furniture',art:'pot',x:9,y:5,w:1,h:1},{id:'rival_house-desk',kind:'furniture',art:'desk',x:7,y:2,w:2,h:1},{id:'rival_house-shelf-a',kind:'furniture',art:'shelf',x:2,y:4,w:1,h:1},{id:'rival_house-shelf-b',kind:'furniture',art:'shelf',x:3,y:4,w:1,h:1},{id:'rival_house-seat',kind:'furniture',art:'sofa',x:1,y:1,w:2,h:1},{id:'rival_house-table',kind:'furniture',art:'table',x:4,y:4,w:2,h:1}],
  study:[{id:'study-pot',kind:'furniture',art:'pot',x:9,y:5,w:1,h:1},{id:'study-desk',kind:'furniture',art:'desk',x:7,y:2,w:2,h:1},{id:'study-shelf-a',kind:'furniture',art:'shelf',x:2,y:4,w:1,h:1},{id:'study-shelf-b',kind:'furniture',art:'shelf',x:3,y:4,w:1,h:1},{id:'study-seat',kind:'furniture',art:'sofa',x:1,y:1,w:2,h:1},{id:'study-table',kind:'furniture',art:'table',x:4,y:4,w:2,h:1}],
  beerendorf_haus2:[{id:'beerendorf_haus2-pot',kind:'furniture',art:'pot',x:9,y:5,w:1,h:1},{id:'beerendorf_haus2-desk',kind:'furniture',art:'desk',x:7,y:2,w:2,h:1},{id:'beerendorf_haus2-shelf-a',kind:'furniture',art:'shelf',x:2,y:4,w:1,h:1},{id:'beerendorf_haus2-shelf-b',kind:'furniture',art:'shelf',x:3,y:4,w:1,h:1},{id:'beerendorf_haus2-seat',kind:'furniture',art:'sofa',x:1,y:1,w:2,h:1},{id:'beerendorf_haus2-table',kind:'furniture',art:'table',x:4,y:4,w:2,h:1}],
  beerendorf_haus:[{id:'beerendorf_haus-pot',kind:'furniture',art:'pot',x:9,y:5,w:1,h:1},{id:'beerendorf_haus-desk',kind:'furniture',art:'desk',x:7,y:2,w:2,h:1},{id:'beerendorf_haus-shelf-a',kind:'furniture',art:'shelf',x:2,y:4,w:1,h:1},{id:'beerendorf_haus-shelf-b',kind:'furniture',art:'shelf',x:3,y:4,w:1,h:1},{id:'beerendorf_haus-seat',kind:'furniture',art:'sofa',x:1,y:1,w:2,h:1},{id:'beerendorf_haus-table',kind:'furniture',art:'table',x:4,y:4,w:2,h:1}],
  beerendorf_wohnhaus:[{id:'beerendorf_wohnhaus-pot',kind:'furniture',art:'pot',x:9,y:5,w:1,h:1},{id:'beerendorf_wohnhaus-desk',kind:'furniture',art:'desk',x:7,y:2,w:2,h:1},{id:'beerendorf_wohnhaus-shelf-a',kind:'furniture',art:'shelf',x:2,y:4,w:1,h:1},{id:'beerendorf_wohnhaus-shelf-b',kind:'furniture',art:'shelf',x:3,y:4,w:1,h:1},{id:'beerendorf_wohnhaus-seat',kind:'furniture',art:'sofa',x:1,y:1,w:2,h:1},{id:'beerendorf_wohnhaus-table',kind:'furniture',art:'table',x:4,y:4,w:2,h:1}],
  beerendorf_werkstatt:[{id:'beerendorf_werkstatt-pot',kind:'furniture',art:'pot',x:9,y:5,w:1,h:1},{id:'beerendorf_werkstatt-desk',kind:'furniture',art:'desk',x:7,y:2,w:2,h:1},{id:'beerendorf_werkstatt-shelf-a',kind:'furniture',art:'shelf',x:2,y:4,w:1,h:1},{id:'beerendorf_werkstatt-shelf-b',kind:'furniture',art:'shelf',x:3,y:4,w:1,h:1},{id:'beerendorf_werkstatt-seat',kind:'furniture',art:'sofa',x:1,y:1,w:2,h:1},{id:'beerendorf_werkstatt-table',kind:'furniture',art:'table',x:4,y:4,w:2,h:1}],
  forest_elder_house:[{id:'forest_elder_house-pot',kind:'furniture',art:'pot',x:9,y:5,w:1,h:1},{id:'forest_elder_house-desk',kind:'furniture',art:'desk',x:7,y:2,w:2,h:1},{id:'forest_elder_house-shelf-a',kind:'furniture',art:'shelf',x:2,y:4,w:1,h:1},{id:'forest_elder_house-shelf-b',kind:'furniture',art:'shelf',x:3,y:4,w:1,h:1},{id:'forest_elder_house-seat',kind:'furniture',art:'sofa',x:1,y:1,w:2,h:1},{id:'forest_elder_house-table',kind:'furniture',art:'table',x:4,y:4,w:2,h:1}],
  bedroom:[{id:'player-bed',kind:'furniture',art:'bed',x:1,y:1,w:2,h:2},{id:'player-desk',kind:'furniture',art:'desk',x:7,y:1,w:2,h:1},{id:'bedroom-dresser',kind:'furniture',art:'dresser',x:4,y:0,w:2,h:1},{id:'bedroom-shelf',kind:'furniture',art:'shelf',x:0,y:4,w:1,h:1},{id:'bedroom-pot',kind:'furniture',art:'pot',x:8,y:3,w:1,h:1},{id:'pokemon-pc',kind:'furniture',art:'pc',x:7,y:2,w:1,h:1}],
  ground:[{id:'family-table',kind:'furniture',art:'table',x:3,y:4,w:2,h:1},{id:'ground-kitchen-counter',kind:'furniture',art:'counter',x:2,y:1,w:2,h:1},{id:'ground-kitchen-stove',kind:'furniture',art:'counter',x:4,y:1,w:1,h:1},{id:'ground-shelf-left',kind:'furniture',art:'shelf',x:2,y:5,w:1,h:1},{id:'ground-shelf-right',kind:'furniture',art:'shelf',x:3,y:5,w:1,h:1},{id:'ground-sofa',kind:'furniture',art:'sofa',x:7,y:4,w:2,h:1},{id:'ground-small-table',kind:'furniture',art:'table',x:9,y:4,w:2,h:1},{id:'ground-shelf',kind:'furniture',art:'shelf',x:10,y:5,w:1,h:1},{id:'ground-pot',kind:'furniture',art:'pot',x:10,y:6,w:1,h:1}]
});
export function layoutCopy(layout=DEFAULT_LAYOUT){return clone(layout)}
export function footprint(object){return Array.from({length:object.w*object.h},(_,i)=>({x:object.x+i%object.w,y:object.y+Math.floor(i/object.w)}))}
export function validateLayout(layout,bounds={},reserved={}){
 const errors=[],ids=new Set();
 for(const [mapId,items] of Object.entries(layout)){
  if(!Array.isArray(items)){errors.push(`${mapId}: items must be an array`);continue}
  const occupied=new Set();
  for(const o of items){
   if(!o||typeof o.id!=='string'||!o.id||!['building','furniture'].includes(o.kind)||typeof o.art!=='string'||!o.art||![o.x,o.y,o.w,o.h].every(Number.isInteger)||o.w<1||o.h<1){errors.push(`${mapId}: invalid object`);continue}
   if(ids.has(o.id))errors.push(`duplicate id: ${o.id}`);ids.add(o.id);
   const bound=bounds[mapId];
   for(const {x,y} of footprint(o)){
    const key=`${x},${y}`;
    if(x<0||y<0||(bound&&(x>=bound.w||y>=bound.h)))errors.push(`${o.id}: outside map`);
    if(occupied.has(key))errors.push(`${o.id}: overlap ${key}`);
    if((reserved[mapId]||[]).includes(key))errors.push(`${o.id}: reserved ${key}`);
    occupied.add(key)
   }
   if(o.door){const d=o.door;if(o.kind!=='building'||![d.x,d.y,d.tx,d.ty].every(Number.isInteger)||!d.target)errors.push(`${o.id}: invalid door`);else if(d.x<o.x||d.x>=o.x+o.w||d.y!==o.y+o.h)errors.push(`${o.id}: door must be directly south of building`)}
  }
 }
 return {ok:errors.length===0,errors}
}
export function moveObject(layout,mapId,id,x,y,bounds={},reserved={}){
 const next=layoutCopy(layout);const object=next[mapId]?.find(item=>item.id===id);
 if(!object||![x,y].every(Number.isInteger))return {ok:false,errors:['unknown object or invalid position']};
 const dx=x-object.x,dy=y-object.y;object.x=x;object.y=y;
 if(object.door){object.door.x+=dx;object.door.y+=dy}
 const check=validateLayout(next,bounds,reserved);
 return check.ok?{ok:true,layout:next,object}:{ok:false,errors:check.errors}
}
export function addObject(layout,mapId,object,bounds={},reserved={}){
 const next=layoutCopy(layout);(next[mapId]??=[]).push(clone(object));
 const check=validateLayout(next,bounds,reserved);
 return check.ok?{ok:true,layout:next}:{ok:false,errors:check.errors}
}
export function collisionCells(layout,mapId){return (layout[mapId]||[]).flatMap(footprint).map(({x,y})=>`${x},${y}`)}
export function portalDefinitions(layout,mapId){return (layout[mapId]||[]).filter(o=>o.door).map(o=>({id:o.id,...o.door}))}
export function migrateLayout(previous,updated,position){
 // Explicit relocation mapping, no silent teleportation or save overwrite.
 const oldIds=new Map(Object.entries(previous).flatMap(([mapId,items])=>items.map(o=>[o.id,{mapId,...o}])));
 const moves=[];
 for(const [mapId,items] of Object.entries(updated))for(const item of items){const old=oldIds.get(item.id);if(old&&(old.x!==item.x||old.y!==item.y||old.mapId!==mapId))moves.push({id:item.id,from:{mapId:old.mapId,x:old.x,y:old.y},to:{mapId,x:item.x,y:item.y}})}
 return {moves,playerPosition:clone(position),requiresPlayerRelocation:!!(position&&collisionCells(updated,position.mapId).includes(`${position.x},${position.y}`))};
}

export function removeObject(layout,mapId,id){const next=layoutCopy(layout);if(!next[mapId]?.some(o=>o.id===id))return {ok:false,errors:['unknown object']};next[mapId]=next[mapId].filter(o=>o.id!==id);return {ok:true,layout:next}}
export function replaceLayout(layout,bounds={},reserved={}){const result=validateLayout(layout,bounds,reserved);return result.ok?{ok:true,layout:layoutCopy(layout)}:{ok:false,errors:result.errors}}
