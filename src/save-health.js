// dev.440–449: safe diagnostic summary without exposing raw saves.
export function saveHealth(raw){try{const data=JSON.parse(raw);if(!data||!Number.isInteger(data.schema)||!data.state||typeof data.state!=='object')return {ok:false,reason:'format'};const s=data.state;return {ok:true,schema:data.schema,map:s.mapId??null,team:Array.isArray(s.team)?s.team.length:0,hasDex:!!s.pokedex};}catch{return {ok:false,reason:'json'};}}
export function exportSaveFile(raw){const health=saveHealth(raw);if(!health.ok)throw Error('Ungültiger Speicherstand');return JSON.stringify(JSON.parse(raw),null,2);}
