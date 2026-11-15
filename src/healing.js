// Reiseversorgung: Trank heilt höchstens 20 KP, Station heilt KP und Status.
export const POTION_ITEM='potion';
export function usePotion(pokemon){
 if(!pokemon||!pokemon.stats||!Number.isInteger(pokemon.currentHp)||pokemon.currentHp<=0||pokemon.currentHp>=pokemon.stats.hp)return false;
 pokemon.currentHp=Math.min(pokemon.stats.hp,pokemon.currentHp+20);return true;
}
export function healPartyAtStation(team){
 if(!Array.isArray(team))throw Error('Ungültiges Team');
 let changed=false;
 for(const p of team){if(p.currentHp!==p.stats.hp||p.status!=='healthy')changed=true;p.currentHp=p.stats.hp;p.status='healthy';}
 return changed;
}
