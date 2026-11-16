import {battleOutcome} from './battle-flow.js';
export function resolveBattleState(kind,battle,team,activeIndex,remainingOpponents=0){
 if(!battle)return 'ongoing';
 const reserves=Array.isArray(team)?team.filter((p,i)=>i!==activeIndex&&p?.currentHp>0).length:0;
 return battleOutcome(kind,battle.finished?battle.winner:null,reserves,remainingOpponents);
}
export function rewardEligible(kind,battle){return Boolean(battle?.finished&&battle.winner==='player'&&['wild','trainer'].includes(kind))}
