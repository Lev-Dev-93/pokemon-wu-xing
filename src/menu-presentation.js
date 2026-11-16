// dev.390–394: pure, read-only menu presentation helpers.
export const MENU_TABS=Object.freeze(['team','inventory','pokedex','settings']);
export function hpPresentation(current,max){const ratio=max>0?Math.max(0,Math.min(1,current/max)):0;return {percent:Math.round(ratio*100),band:ratio<=.2?'critical':ratio<=.5?'warning':'healthy'};}
export function dexEntries(team=[],storage=[]){const owned=new Set([...team,...storage].filter(p=>Number.isInteger(p?.speciesId)&&p.speciesId>=1&&p.speciesId<=493).map(p=>p.speciesId));return [...owned].sort((a,b)=>a-b).map(id=>({id,owned:true}));}
export function dexProgress(team=[],storage=[]){return {owned:dexEntries(team,storage).length,total:493};}
export const DISPLAY_OPTIONS=Object.freeze([{id:'large-text',label:'Große Schrift'},{id:'high-contrast',label:'Hoher Kontrast'}]);
export function readDisplayOptions(storage){try{const data=JSON.parse(storage.getItem('wu-xing-display-options')||'{}');return Object.fromEntries(DISPLAY_OPTIONS.map(o=>[o.id,data[o.id]===true]));}catch{return Object.fromEntries(DISPLAY_OPTIONS.map(o=>[o.id,false]));}}
export function writeDisplayOptions(storage,options){const safe=Object.fromEntries(DISPLAY_OPTIONS.map(o=>[o.id,options[o.id]===true]));try{storage.setItem('wu-xing-display-options',JSON.stringify(safe));return true}catch{return false}}
