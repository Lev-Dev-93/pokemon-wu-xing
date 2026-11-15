import {getMove} from './moves.js';
import {validatePokemon} from './team.js';

// Preserve the outgoing fighter's PP and stat changes while another team member fights.
export function switchTeamPokemon(battle,team,activeIndex,nextIndex,fighters=new Map()){
 if(!battle||!Array.isArray(team)||!Number.isInteger(nextIndex)||nextIndex===activeIndex||nextIndex<0||nextIndex>=team.length)throw Error('Ungültiger Pokémon-Wechsel');
 const next=team[nextIndex];if(!validatePokemon(next)||next.currentHp<=0)throw Error('Dieses Pokémon ist nicht kampffähig');
 if(battle.finished&&!(battle.winner==='opponent'&&battle.player.pokemon.currentHp===0&&battle.opponent.pokemon.currentHp>0))throw Error('Kampf ist bereits beendet');
 team[activeIndex]=structuredClone(battle.player.pokemon);
 fighters.set(activeIndex,structuredClone(battle.player));
 const selected=fighters.get(nextIndex);
 battle.player=selected?structuredClone(selected):{pokemon:structuredClone(next),pp:next.moves.map(id=>getMove(id).pp),stages:{attack:0,defense:0,specialAttack:0,specialDefense:0,speed:0},volatile:{sleepTurns:0}};
 battle.finished=false;battle.winner=null;battle.turnEvents=[];
 battle.log=[`Pokémon #${battle.player.pokemon.speciesId} wird eingewechselt!`];
 return nextIndex;
}
export function availableSwitches(team,activeIndex){return team.map((p,index)=>({index,pokemon:p})).filter(({index,pokemon})=>index!==activeIndex&&validatePokemon(pokemon)&&pokemon.currentHp>0)}
