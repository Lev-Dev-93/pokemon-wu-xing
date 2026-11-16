import {applyEntryAbility,cureOnSwitchOut} from './battle-entry.js';
import {currentPp} from './pp-items.js';
import {getMove} from './moves.js';
import {validatePokemon} from './team.js';

// Keep persistent HP, PP and major status; reset temporary combat modifiers on switch.
export function switchTeamPokemon(battle,team,activeIndex,nextIndex,fighters=new Map()){
 if(!battle||!Array.isArray(team)||!Number.isInteger(nextIndex)||nextIndex===activeIndex||nextIndex<0||nextIndex>=team.length)throw Error('Ungültiger Pokémon-Wechsel');
 const next=team[nextIndex];if(!validatePokemon(next)||next.currentHp<=0)throw Error('Dieses Pokémon ist nicht kampffähig');
 if(battle.finished&&!(['opponent','draw'].includes(battle.winner)&&battle.player.pokemon.currentHp===0&&battle.opponent.pokemon.currentHp>0))throw Error('Kampf ist bereits beendet');
 team[activeIndex]=cureOnSwitchOut(structuredClone({...battle.player.pokemon,pp:[...battle.player.pp]}));
 const outgoing=structuredClone(battle.player);
 outgoing.stages={attack:0,defense:0,specialAttack:0,specialDefense:0,speed:0,accuracy:0,evasion:0};
 outgoing.volatile={...outgoing.volatile,seeded:false,aquaRing:false,ingrained:false,protected:false,enduring:false,flinched:false,confusionTurns:0,protectStreak:0,solarChargeIndex:null,actedThisTurn:false,flashFireBoost:false};
 fighters.set(activeIndex,outgoing);
 const selected=fighters.get(nextIndex);
 // Reservestatus ist maßgeblich; veraltete Kämpferkopien übernehmen keine KP.
 if(selected)selected.pokemon=structuredClone(next);
 battle.player=selected?structuredClone(selected):{pokemon:structuredClone(next),pp:currentPp(next),stages:{attack:0,defense:0,specialAttack:0,specialDefense:0,speed:0},volatile:{sleepTurns:0,confusionTurns:0,flinched:false,protected:false,enduring:false,protectStreak:0,seeded:false,aquaRing:false,ingrained:false,solarChargeIndex:null,flashFireBoost:false}};
 battle.player.stages={attack:0,defense:0,specialAttack:0,specialDefense:0,speed:0,accuracy:0,evasion:0};
 battle.player.volatile={...battle.player.volatile,seeded:false,aquaRing:false,ingrained:false,protected:false,enduring:false,flinched:false,confusionTurns:0,protectStreak:0,solarChargeIndex:null,actedThisTurn:false,flashFireBoost:false};
 battle.finished=false;battle.winner=null;battle.turnEvents=[];
 battle.log=[`Pokémon #${battle.player.pokemon.speciesId} wird eingewechselt!`];applyEntryAbility(battle,'player');
 return nextIndex;
}
export function availableSwitches(team,activeIndex){return team.map((p,index)=>({index,pokemon:p})).filter(({index,pokemon})=>index!==activeIndex&&validatePokemon(pokemon)&&pokemon.currentHp>0)}
