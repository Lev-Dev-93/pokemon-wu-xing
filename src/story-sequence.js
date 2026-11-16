// Deterministic, save-safe prologue phase resolver. No new story flags are required.
export function prologuePhase(flags,mapId){
 if(!flags?.egg_received)return 'before-egg';
 if(!flags.rift_closed)return mapId==='village'?'rift-scene':'rift-approach';
 if(!flags.rival_absol)return 'to-rival';
 if(!flags.parents_briefed)return 'to-parents';
 return 'free';
}
export function storyControlsLocked(flags,mapId){return ['rift-scene','rift-approach','to-rival','to-parents'].includes(prologuePhase(flags,mapId));}

// Einheitliche Wiederaufnahmeentscheidung für Speicherstände im Prolog.
export function prologueRecoveryAction(flags,mapId){
 const phase=prologuePhase(flags,mapId);
 if(phase==='rift-scene')return 'rift-scene';
 if(phase==='rift-approach'&&['ground','yard'].includes(mapId))return 'rift-approach';
 if(phase==='to-rival'&&mapId==='village')return 'to-rival';
 if(phase==='to-parents'&&['village','yard','ground'].includes(mapId))return 'to-parents';
 if(phase==='before-egg'&&mapId==='ground'&&!flags?.spokenToBreederA&&!flags?.spokenToBreederB)return 'birthday';
 return 'none';
}
