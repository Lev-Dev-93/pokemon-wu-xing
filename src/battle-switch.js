import {entryHazards} from './battle-hazards.js';
import {SIDE_FIELD_KEYS} from './battle.js';
import {applyEntryAbility,cureOnSwitchOut} from './battle-entry.js';
import {currentPp} from './pp-items.js';
import {getMove} from './moves.js';
import {validatePokemon} from './team.js';

// Keep persistent HP, PP and major status; reset temporary combat modifiers on switch.
export function switchTeamPokemon(battle,team,activeIndex,nextIndex,fighters=new Map()){
 if(!battle||!Array.isArray(team)||!Number.isInteger(activeIndex)||activeIndex<0||activeIndex>=team.length||!validatePokemon(team[activeIndex])||!Number.isInteger(nextIndex)||nextIndex===activeIndex||nextIndex<0||nextIndex>=team.length)throw Error('Ungültiger Pokémon-Wechsel');
 const next=team[nextIndex];if(!validatePokemon(next)||next.currentHp<=0)throw Error('Dieses Pokémon ist nicht kampffähig');
 if(battle.finished&&!(['opponent','draw'].includes(battle.winner)&&battle.player?.pokemon?.currentHp===0&&battle.opponent?.pokemon?.currentHp>0))throw Error('Kampf ist bereits beendet');
 // Side-wide barriers belong to the team, not to the outgoing Pokémon.
 battle.playerSideFields??={};battle.playerTeam=team;battle.playerTeamIndex=nextIndex;
 for(const key of SIDE_FIELD_KEYS)battle.playerSideFields[key]=Math.max(0,battle.player.volatile?.[key]||0);
 team[activeIndex]=cureOnSwitchOut(structuredClone({...battle.player.pokemon,pp:[...battle.player.pp],toxicCounter:0}));
 const outgoing=structuredClone(battle.player);
 outgoing.stages={attack:0,defense:0,specialAttack:0,specialDefense:0,speed:0,accuracy:0,evasion:0};
 outgoing.volatile={...outgoing.volatile,seeded:false,aquaRing:false,ingrained:false,protected:false,enduring:false,flinched:false,confusionTurns:0,protectStreak:0,solarChargeIndex:null,rechargeTurns:0,actedThisTurn:false,flashFireBoost:false,wishTurns:0,wishHeal:0};
 fighters.set(activeIndex,outgoing);
 const selected=fighters.get(nextIndex);
 // Reservestatus ist maßgeblich; veraltete Kämpferkopien übernehmen keine KP.
 // The party record is authoritative for persistent PP; cached combat PP may be stale.
 if(selected)selected.pokemon=structuredClone(next);
 battle.player=selected?structuredClone(selected):{pokemon:structuredClone(next),pp:currentPp(next),stages:{attack:0,defense:0,specialAttack:0,specialDefense:0,speed:0},volatile:{sleepTurns:0,confusionTurns:0,flinched:false,protected:false,enduring:false,protectStreak:0,seeded:false,aquaRing:false,ingrained:false,solarChargeIndex:null,rechargeTurns:0,flashFireBoost:false}};
 battle.player.pp=currentPp(next);
 battle.player.stages={attack:0,defense:0,specialAttack:0,specialDefense:0,speed:0,accuracy:0,evasion:0};
 battle.player.volatile={...battle.player.volatile,seeded:false,aquaRing:false,ingrained:false,protected:false,enduring:false,flinched:false,confusionTurns:0,protectStreak:0,solarChargeIndex:null,rechargeTurns:0,actedThisTurn:false,flashFireBoost:false,wishTurns:battle.playerSideFields.wishTurns||0,wishHeal:battle.playerSideFields.wishHeal||0};
 for(const key of SIDE_FIELD_KEYS)battle.player.volatile[key]=battle.playerSideFields[key]||0;
 battle.finished=false;battle.winner=null;if(!battle.pendingTurn)battle.turnEvents=[];if(battle.pendingSwitch?.side==='player')battle.pendingSwitch=null;
 battle.log=[`Pokémon #${battle.player.pokemon.speciesId} wird eingewechselt!`];entryHazards(battle,'playerSideFields',battle.player);if(battle.player.pokemon.currentHp>0)applyEntryAbility(battle,'player');else {battle.log.push('Das eingewechselte Pokémon wurde durch Fallen besiegt.');if(availableSwitches(team,nextIndex).length){battle.pendingSwitch={side:'player',kind:'hazard-replacement'};battle.finished=false;battle.winner=null;}else{battle.finished=true;battle.winner='opponent';battle.pendingTurn=null;}}
 return nextIndex;
}
export function availableSwitches(team,activeIndex){return team.map((p,index)=>({index,pokemon:p})).filter(({index,pokemon})=>index!==activeIndex&&validatePokemon(pokemon)&&pokemon.currentHp>0)}
