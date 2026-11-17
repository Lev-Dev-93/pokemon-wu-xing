import {entryHazards} from './battle-hazards.js';
import {applyEntryAbility,cureOnSwitchOut} from './battle-entry.js';
import {currentPp} from './pp-items.js';
import {validatePokemon} from './team.js';
import {SIDE_FIELD_KEYS} from './battle.js';

const freshVolatile=()=>({sleepTurns:0,confusionTurns:0,flinched:false,protected:false,enduring:false,protectStreak:0,seeded:false,aquaRing:false,ingrained:false,solarChargeIndex:null,flashFireBoost:false,actedThisTurn:false});
const freshStages=()=>({attack:0,defense:0,specialAttack:0,specialDefense:0,speed:0,accuracy:0,evasion:0});

// Resolve a complete opponent switch chain. Fainted entrants never become reserves.
// The outgoing fighter is preserved exactly once, and only if still conscious.
export function resolveOpponentSwitch(battle,reserves,{rng=Math.random}={}){
 if(battle?.pendingSwitch?.side!=='opponent')throw Error('Kein gegnerischer Wechselauftrag');
 if(!Array.isArray(reserves))throw Error('Ungültige Gegnerreserve');
 const eligible=reserves.filter(p=>validatePokemon(p)&&p.currentHp>0);
 if(!eligible.length){battle.pendingSwitch=null;battle.log.push('Der Gegner hat kein kampffähiges Ersatz-Pokémon.');return {switched:false,attempts:0};}
 // Validate before mutating the battle or the reserves.
 const roll=rng();if(!Number.isFinite(roll)||roll<0||roll>=1)throw Error('Ungültiger Zufallswert');
 const old=battle.opponent;
 const outgoing=cureOnSwitchOut(structuredClone({...old.pokemon,pp:[...old.pp],toxicCounter:0}));
 const fields=battle.opponentSideFields??={};
 for(const key of SIDE_FIELD_KEYS)fields[key]=Math.max(0,old.volatile?.[key]??fields[key]??0);
 if(outgoing.currentHp>0)reserves.push(outgoing);
 let attempts=0, lastSpeciesId=null, fainted=false;
 // One RNG draw determines the first candidate; subsequent attempts use reserve order.
 let preferred=Math.floor(roll*eligible.length);
 while(true){
  const candidates=reserves.map((p,i)=>({p,i})).filter(({p})=>validatePokemon(p)&&p.currentHp>0&&p!==outgoing);
  // Exclude the just-withdrawn fighter from immediate re-entry during this chain.
  const available=candidates.filter(({p})=>!(outgoing.currentHp>0&&p===outgoing));
  if(!available.length)break;
  const selected=available[Math.min(preferred,available.length-1)];preferred=0;
  const incoming=structuredClone(selected.p);reserves.splice(selected.i,1);
  attempts++;lastSpeciesId=incoming.speciesId;
  battle.opponent={pokemon:incoming,pp:currentPp(incoming),stages:freshStages(),volatile:freshVolatile()};
  for(const key of SIDE_FIELD_KEYS)battle.opponent.volatile[key]=fields[key]||0;
  battle.opponent.volatile.wishTurns=fields.wishTurns||0;
  battle.opponent.volatile.wishHeal=fields.wishHeal||0;
  battle.log.push(`Der Gegner schickt Pokémon #${incoming.speciesId} in den Kampf!`);
  entryHazards(battle,'opponentSideFields',battle.opponent);
  if(battle.opponent.pokemon.currentHp>0){applyEntryAbility(battle,'opponent');fainted=false;break;}
  fainted=true;
  battle.log.push('Das eingewechselte Pokémon wurde durch Eintrittsfallen besiegt.');
 }
 battle.pendingSwitch=null;
 if(fainted){battle.log.push('Der Gegner hat kein kampffähiges Ersatz-Pokémon mehr.');battle.finished=true;battle.winner='player';battle.pendingTurn=null;}
 return {switched:attempts>0,speciesId:lastSpeciesId,fainted,attempts};
}
