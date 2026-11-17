import {maps,outdoorBuildings,objects,npcs} from './maps.js';
import {DEFAULT_LAYOUT,layoutCopy,validateLayout,footprint,moveObject,addObject,removeObject,migrateLayout} from './world-layout.js';
const storageKey='monsterreise-layout-v1';
const backupKey='monsterreise-layout-backup-v1';
const supported=Object.keys(DEFAULT_LAYOUT);
const original={};
const originalInteriorExits=Object.fromEntries(Object.entries(maps).map(([id,map])=>[id,map.portals.map(p=>({...p}))]));
for(const id of supported){const map=maps[id];original[id]={walls:new Set(map.walls),portals:map.portals.map(p=>({...p})),buildings:(outdoorBuildings[id]||[]).map(b=>({...b})),objects:(objects[id]||[]).map(o=>({...o}))}}
const defaults=layoutCopy(DEFAULT_LAYOUT);
// Objects required by the prologue cannot be removed or silently rewritten by imported files.
const protectedFurniture=new Set(['player-bed','pokemon-pc']);
const canonicalDoors=new Map(Object.entries(defaults).flatMap(([mapId,items])=>items.filter(o=>o.door).map(o=>[o.id,{mapId,kind:o.kind,art:o.art,w:o.w,h:o.h,door:{...o.door}}])));
function checkProtectedObjects(layout){
 const errors=[];
 for(const [mapId,items] of Object.entries(defaults))for(const baseline of items){
  const item=(layout[mapId]||[]).find(o=>o.id===baseline.id);
  if(protectedFurniture.has(baseline.id)&&(!item||item.kind!==baseline.kind||item.art!==baseline.art||item.w!==baseline.w||item.h!==baseline.h))errors.push(`${baseline.id}: protected story object`);
  if(!baseline.door)continue;
  if(!item||item.kind!==baseline.kind||item.art!==baseline.art||item.w!==baseline.w||item.h!==baseline.h||!item.door||item.door.target!==baseline.door.target||item.door.tx!==baseline.door.tx||item.door.ty!==baseline.door.ty)errors.push(`${baseline.id}: protected door destination`);
 }
 for(const [mapId,items] of Object.entries(layout))for(const item of items||[]){
  const canonical=canonicalDoors.get(item.id);
  if(canonical&&canonical.mapId!==mapId)errors.push(`${item.id}: door moved to another map`);
  if(item.door&&!canonicalDoors.has(item.id))errors.push(`${item.id}: custom doors not supported`);
 }
 return errors;
}

const bounds=Object.fromEntries(supported.map(id=>[id,{w:maps[id].w,h:maps[id].h}]));
// Protected spawn, stair, exit and story interaction tiles. Doors are exempt only at their own positions.
const fixedWalls=Object.fromEntries(supported.map(id=>[id,new Set(original[id].walls)]));
for(const id of supported)for(const item of defaults[id])for(const {x,y} of footprint(item))fixedWalls[id].delete(`${x},${y}`);
const reserved=Object.fromEntries(supported.map(id=>[id,new Set([...fixedWalls[id],...original[id].portals.filter(p=>p.kind!=='door').map(p=>`${p.x},${p.y}`),...(npcs[id]||[]).map(n=>`${n.x},${n.y}`)])]));
// Preserve story-critical floor interaction positions and paths.
reserved.bedroom.add('5,5');reserved.ground.add('6,2');reserved.ground.add('3,3');
function check(layout){const validation=validateLayout(layout,bounds,Object.fromEntries(supported.map(id=>[id,[...reserved[id]]])));const errors=[...validation.errors,...checkProtectedObjects(layout)];for(const id of supported){const map=maps[id];const doors=new Set();for(const item of layout[id]||[]){if(item.door){const d=item.door,key=`${d.x},${d.y}`;if(d.x<0||d.y<0||d.x>=map.w||d.y>=map.h||reserved[id].has(key)||doors.has(key))errors.push(`${item.id}: blocked door`);doors.add(key);if(footprint(item).some(cell=>cell.x===d.x&&cell.y===d.y))errors.push(`${item.id}: door inside building`);if((layout[id]||[]).some(other=>footprint(other).some(cell=>cell.x===d.x&&cell.y===d.y)))errors.push(`${item.id}: door overlaps object`)} } }return {ok:!errors.length,errors}}
let current=layoutCopy(defaults);
const undoStack=[],redoStack=[];
const historyLimit=40;
function remember(previous){undoStack.push(layoutCopy(previous));if(undoStack.length>historyLimit)undoStack.shift();redoStack.length=0}
export function historyInfo(){return {undo:undoStack.length,redo:redoStack.length}}
export function currentLayout(){return layoutCopy(current)}
export function applyLayout(next,player=null,{record=false}={}){const validation=check(next);if(!validation.ok)return validation;const migration=migrateLayout(current,next,player);if(migration.requiresPlayerRelocation)return {ok:false,errors:['Spieler steht im neuen Objekt. Bitte zuerst wegbewegen.']};
 for(const [id,portals] of Object.entries(originalInteriorExits))maps[id].portals=portals.map(p=>({...p}));
 for(const id of supported){const map=maps[id];map.walls=new Set(fixedWalls[id]);for(const item of next[id]||[])for(const {x,y} of footprint(item))map.walls.add(`${x},${y}`);
 const defaultDoors=new Map((defaults[id]||[]).filter(o=>o.door).map(o=>[o.id,o.door]));map.portals=original[id].portals.filter(p=>![...defaultDoors.values()].some(d=>p.x===d.x&&p.y===d.y&&p.target===d.target)).map(p=>({...p}));
 for(const item of next[id]||[])if(item.door)map.portals.push({...item.door,kind:'door'});
 if(['village','professor_clearing','beerendorf'].includes(id)){
  const colors={'village-chapel':'#887e9d','research-lab':'#557c8b'};
  outdoorBuildings[id]=(next[id]||[]).filter(o=>o.kind==='building').map(o=>({x:o.x,y:o.y,w:o.w,h:o.h,color:colors[o.id]||'#a67860',label:o.art==='mu-chapel'?'KAPELLE':o.art==='mu-lab'?'LABOR':o.art==='mu-workshop'?'WERKST.':o.art==='mu-shop'?'LADEN':'HAUS'}));
 }

 // Keep original interactions, relocate them along with their furniture.
 if(id==='bedroom'||id==='ground'){objects[id]=original[id].objects.map(o=>({...o}));for(const o of objects[id]){const item=(next[id]||[]).find(i=>i.id===(o.id==='bed'?'player-bed':o.id==='pokemon_pc'?'pokemon-pc':''));if(item){o.x=item.x;o.y=item.y+(o.id==='pokemon_pc'?1:0)}}}
 }
 for(const id of ['village','professor_clearing','beerendorf'])for(const item of next[id]||[]){if(!item.door)continue;const interior=maps[item.door.target];if(!interior)continue;for(const exit of interior.portals)if(exit.target===id){exit.tx=item.door.x;exit.ty=item.door.y+1}}
 if(record)remember(current);current=layoutCopy(next);return {ok:true,migration}}
export function editLayout(action,mapId,id,x,y,art,player=null){if(!supported.includes(mapId))return {ok:false,errors:['unsupported map']};let result;
 if(action==='move')result=moveObject(current,mapId,id,x,y);
 else if(action==='remove'){const existing=current[mapId]?.find(o=>o.id===id);if(existing?.door||protectedFurniture.has(id))return {ok:false,errors:['Storywichtige Objekte dürfen nicht gelöscht werden. Bitte verschieben.']};result=removeObject(current,mapId,id);}
 else if(action==='add'){const kind=['village','professor_clearing','beerendorf'].includes(mapId)?'building':'furniture';const w=kind==='building'?3:1,h=kind==='building'?2:1;result=addObject(current,mapId,{id,kind,art:art|| (kind==='building'?'mu-home':'pot'),x,y,w,h});}
 else return {ok:false,errors:['unknown action']};if(!result.ok)return result;return applyLayout(result.layout,player,{record:true})}
export function resetLayout(player=null){return applyLayout(defaults,player,{record:true})}
export function undoLayout(player=null){if(!undoStack.length)return {ok:false,errors:['Keine Änderung zum Rückgängigmachen']};const target=undoStack[undoStack.length-1];const previous=layoutCopy(current);const result=applyLayout(target,player);if(result.ok){undoStack.pop();redoStack.push(previous)}return result}
export function redoLayout(player=null){if(!redoStack.length)return {ok:false,errors:['Keine Änderung zum Wiederholen']};const target=redoStack[redoStack.length-1];const previous=layoutCopy(current);const result=applyLayout(target,player);if(result.ok){redoStack.pop();undoStack.push(previous)}return result}
// Phase 7: Validate untrusted JSON before invoking geometry and collision checks.
// Prevent oversized footprints, unsupported properties and dangerous object keys.
export function inspectImportedLayout(text){
 try{
  if(typeof text!=='string'||text.length>300000)throw Error('Ungültige Dateigröße');
  const data=JSON.parse(text);
  if(!data||data.schema!==1||!data.layout||typeof data.layout!=='object'||Array.isArray(data.layout))throw Error('Unbekanntes Layoutformat');
  const unknown=Object.keys(data.layout).filter(id=>!supported.includes(id));
  if(unknown.length)throw Error('Unbekannte Karten: '+unknown.join(', '));
  const merged=layoutCopy(defaults);
  for(const id of supported){
   if(!Object.hasOwn(data.layout,id))continue;
   const items=data.layout[id];
   if(!Array.isArray(items)||items.length>100)throw Error('Ungültige Objektliste: '+id);
   for(const item of items){
    if(!item||typeof item!=='object'||Array.isArray(item))throw Error('Ungültiges Objekt: '+id);
    if(![item.x,item.y,item.w,item.h].every(Number.isSafeInteger)||item.w<1||item.h<1||item.w>20||item.h>20)throw Error('Ungültige Objektabmessungen: '+id);
    if(typeof item.id!=='string'||item.id.length>100||typeof item.art!=='string'||item.art.length>100)throw Error('Ungültige Objektkennung: '+id);
    if(item.door&&(!item.door.target||typeof item.door.target!=='string'||!maps[item.door.target]||![item.door.x,item.door.y,item.door.tx,item.door.ty].every(Number.isSafeInteger)))throw Error('Unbekanntes Türziel: '+id);
   }
   merged[id]=items;

  }
  const validation=check(merged);
  if(!validation.ok)return validation;
  const changed=supported.filter(id=>JSON.stringify(merged[id])!==JSON.stringify(current[id]));
  return {ok:true,layout:merged,changedMaps:changed,objectCount:supported.reduce((n,id)=>n+merged[id].length,0)};
 }catch(e){return {ok:false,errors:[String(e.message)]}}
}
export function previewImport(text,player=null){const result=inspectImportedLayout(text);if(!result.ok)return result;const migration=migrateLayout(current,result.layout,player);return {...result,migration,ok:!migration.requiresPlayerRelocation,errors:migration.requiresPlayerRelocation?['Spieler steht im neuen Objekt. Bitte zuerst wegbewegen.']:[]}}
export function exportLayout(){return JSON.stringify({schema:1,layout:currentLayout()},null,2)}
export function importLayout(text,player=null){const preview=previewImport(text,player);if(!preview.ok)return preview;return applyLayout(preview.layout,player,{record:true})}
export function saveLayout(storage){
 try{
  const previous=storage.getItem(storageKey);
  if(previous){const checkPrevious=inspectImportedLayout(previous);if(checkPrevious.ok)storage.setItem(backupKey,previous)}
  const serialized=exportLayout();storage.setItem(storageKey,serialized);return storage.getItem(storageKey)===serialized
 }catch(e){return false}
}
export function loadLayout(storage){try{const raw=storage.getItem(storageKey);if(!raw)return {ok:true,default:true};const result=inspectImportedLayout(raw);if(!result.ok)return result;return applyLayout(result.layout)}catch(e){return {ok:false,errors:[String(e.message)]}}}
export function restoreBackup(storage,player=null){try{const raw=storage.getItem(backupKey);if(!raw)return {ok:false,errors:['Keine Sicherung vorhanden']};return importLayout(raw,player)}catch(e){return {ok:false,errors:[String(e.message)]}}}
export function backupInfo(storage){try{return {available:!!storage.getItem(backupKey)}}catch(e){return {available:false}}}
export function layoutInfo(){return {supported,bounds,objects:currentLayout()}}
applyLayout(defaults);
