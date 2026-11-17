import {availableSwitches} from './battle-switch.js';
export function forcedSwitchRequired(battle,team,activeIndex){
 return Boolean(battle?.finished&&['opponent','draw'].includes(battle.winner)&&battle.player?.pokemon?.currentHp===0&&(battle.opponent?.pokemon?.currentHp===undefined||battle.opponent.pokemon.currentHp>0)&&availableSwitches(team,activeIndex).length);
}
export function switchAllowed(battle,team,activeIndex,nextIndex){
 return Boolean(battle&&availableSwitches(team,activeIndex).some(s=>s.index===nextIndex)&&(!battle.finished||forcedSwitchRequired(battle,team,activeIndex)));
}
