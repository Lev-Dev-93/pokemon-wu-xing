import inventory from './ability-inventory.json' with {type:'json'};
export function abilityAudit(){const abilities=inventory.abilities;return {total:abilities.length,partial:abilities.filter(a=>a.status==='partial').length,unverified:abilities.filter(a=>a.status==='unverified').length,complete:abilities.filter(a=>a.status==='complete').length,scope:inventory.scope};}
export function abilityStatus(id){return inventory.abilities.find(a=>a.abilityId===id)??null;}
export function missingAbilities(){return inventory.abilities.filter(a=>a.status!=='complete').map(a=>a.abilityId);}
