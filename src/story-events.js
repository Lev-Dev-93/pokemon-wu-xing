// Deterministic prologue event contract. Later scenes are intentionally NOT triggered here.
// A flag records a completed scene, not merely an encounter or a preview.
export const STORY_EVENTS=Object.freeze([
  Object.freeze({id:'birthday_wish_pending',requires:['spokenToBreederA','spokenToBreederB'],label:'Geburtstagswunsch vorbereiten'}),
  Object.freeze({id:'egg_received',requires:['birthday_wish_pending'],label:'Starter-Ei erhalten'}),
  Object.freeze({id:'rift_closed',requires:['egg_received'],label:'Dimensionsereignis abgeschlossen'}),
  Object.freeze({id:'rival_absol',requires:['rift_closed'],label:'Absol beim Kindheitsfreund'}),
  Object.freeze({id:'professor_demo',requires:['rival_absol'],label:'Professor zeigt den Raupy-Fang'}),
  Object.freeze({id:'route1_hatched',requires:['professor_demo'],label:'Starter-Ei auf Route 1 geschlüpft'})
]);
const byId=new Map(STORY_EVENTS.map(e=>[e.id,e]));
export const STORY_EVENT_IDS=Object.freeze(STORY_EVENTS.map(e=>e.id));
export function eventStatus(flags,id){
 const def=byId.get(id);if(!def)return {status:'unknown',missing:[]};
 if(flags[id])return {status:'complete',missing:[]};
 const missing=def.requires.filter(key=>!flags[key]);
 return {status:missing.length?'blocked':'ready',missing};
}
export function validateStoryFlags(flags){
 for(const def of STORY_EVENTS){
  if(flags[def.id]&&def.requires.some(key=>!flags[key]))return false;
 }
 return true;
}
export function applyStoryEvent(state,id){
 if(eventStatus(state.flags,id).status!=='ready')return false;
 state.flags[id]=true;
 state.eventLog??=[];
 state.eventLog.push({type:'story',key:id,value:true});
 return true;
}
export function nextStoryEvent(flags){return STORY_EVENTS.find(def=>!flags[def.id])?.id??null;}
