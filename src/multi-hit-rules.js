// Mehrfachtreffer-Regeln (Generation V): Wert 92 = Wertelink / Skill Link.
export const MULTI_HIT_RANGES=Object.freeze({3:[2,5],4:[2,5],24:[2,2],31:[2,5],41:[2,2],42:[2,5],140:[2,5],154:[2,5],198:[2,5],292:[2,5],331:[2,5],333:[2,5]});
export function multiHitCount(moveId,abilityId,rng=Math.random){
 const range=MULTI_HIT_RANGES[moveId];
 if(!range)return 1;
 if(range[0]===range[1])return range[0];
 if(abilityId===92)return range[1];
 const raw=Number(rng());const roll=Number.isFinite(raw)?Math.min(0.999999,Math.max(0,raw)):0;
 return roll<0.35?2:roll<0.7?3:roll<0.85?4:5;
}
