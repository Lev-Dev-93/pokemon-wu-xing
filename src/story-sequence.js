// Deterministic, save-safe prologue phase resolver. No new story flags are required.
export function prologuePhase(flags,mapId){
 if(!flags?.egg_received)return 'before-egg';
 if(!flags.rift_closed)return mapId==='village'?'rift-scene':'rift-approach';
 if(!flags.rival_absol)return 'to-rival';
 if(!flags.parents_briefed)return 'to-parents';
 return 'free';
}
export function storyControlsLocked(flags,mapId){return ['rift-scene','rift-approach','to-rival','to-parents'].includes(prologuePhase(flags,mapId));}
