// Canonical progression gates: pure helpers shared by map movement and tests.
export function canLeaveFarm(flags){return !!flags?.egg_received;}
export function canEnterRoute1(flags){return !!flags?.professor_demo;}
export function canExploreBeyondRoute1(flags){return !!flags?.route1_hatched;}
export function validatePrologueMilestones(flags){
 if(!flags||typeof flags!=='object'||Array.isArray(flags))return false;
 if(['birthday_wish_pending','egg_received','rift_closed','rival_absol','professor_demo','route1_hatched','parents_briefed'].some(k=>flags[k]!==undefined&&typeof flags[k]!=='boolean'))return false;
 const order=['birthday_wish_pending','egg_received','rift_closed','rival_absol','professor_demo','route1_hatched'];
 for(let i=1;i<order.length;i++)if(flags[order[i]]&&!flags[order[i-1]])return false;
 if(flags.parents_briefed&&(!flags.rift_closed||!flags.rival_absol))return false;
 return true;
}

export function pendingRiftRecovery(flags,mapId){
 if(!flags?.egg_received||flags.rift_closed)return 'none';
 return mapId==='village'?'scene':'run';
}
