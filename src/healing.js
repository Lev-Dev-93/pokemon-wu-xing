import {maxPp} from './pp-items.js';
// Reiseversorgung: Trank heilt höchstens 20 KP, Station heilt KP und Status.
export const POTION_ITEM='potion';
export function usePotion(pokemon){
 if(!pokemon||!pokemon.stats||!Number.isInteger(pokemon.currentHp)||pokemon.currentHp<=0||pokemon.currentHp>=pokemon.stats.hp)return false;
 pokemon.currentHp=Math.min(pokemon.stats.hp,pokemon.currentHp+20);return true;
}
export function healPartyAtStation(team){
 if(!Array.isArray(team))throw Error('Ungültiges Team');
 let changed=false;
 for(const p of team){if(p.currentHp!==p.stats.hp||p.status!=='healthy')changed=true;p.currentHp=p.stats.hp;p.status='healthy';p.pp=maxPp(p);}
 return changed;
}

// Statusheilmittel sind nur außerhalb des Kampfes einsetzbar.
export const STATUS_REMEDIES=Object.freeze([
 Object.freeze({id:'antidote',name:'Gegengift',status:'poison',price:30}),
 Object.freeze({id:'burn_heal',name:'Feuerheiler',status:'burn',price:30}),
 Object.freeze({id:'paralyze_heal',name:'Para-Heiler',status:'paralysis',price:30}),
 Object.freeze({id:'awakening',name:'Aufwecker',status:'sleep',price:30}),
 Object.freeze({id:'ice_heal',name:'Eisheiler',status:'freeze',price:30})
]);
export function remedyFor(id){return STATUS_REMEDIES.find(x=>x.id===id)||null}
export function useStatusRemedy(pokemon,id){
 const remedy=remedyFor(id);
 if(!remedy||!pokemon||!pokemon.stats||!Number.isInteger(pokemon.currentHp)||pokemon.currentHp<=0||pokemon.status!==remedy.status)return false;
 pokemon.status='healthy';return true;
}

// Wiederbelebung und vollständige Genesung (vorläufige Testökonomie).
export const REVIVE_ITEM='revive';
export const FULL_RESTORE_ITEM='full_restore';
export function useRevive(pokemon){
 if(!pokemon?.stats||!Number.isInteger(pokemon.currentHp)||pokemon.currentHp!==0||!Number.isInteger(pokemon.stats.hp)||pokemon.stats.hp<=0)return false;
 pokemon.currentHp=Math.max(1,Math.floor(pokemon.stats.hp/2));pokemon.status='healthy';return true;
}
export function useFullRestore(pokemon){
 if(!pokemon?.stats||!Number.isInteger(pokemon.currentHp)||pokemon.currentHp<=0||!Number.isInteger(pokemon.stats.hp)||pokemon.stats.hp<=0)return false;
 if(pokemon.currentHp===pokemon.stats.hp&&(!pokemon.status||pokemon.status==='healthy'))return false;
 pokemon.currentHp=pokemon.stats.hp;pokemon.status='healthy';return true;
}
