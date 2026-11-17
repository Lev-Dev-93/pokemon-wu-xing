// Pure guards for multi-opponent trainer battles. No UI or story mutations.
export function trainerBattleAction({kind,finished,winner,remaining=0,busy=false,rewardsPending=false}){
 if(kind!=='trainer')return 'not-trainer';
 if(!Number.isInteger(remaining)||remaining<0)throw Error('Ungültige Trainerreserve');
 if(busy)return 'wait';
 if(!finished)return 'ongoing';
 if(rewardsPending)return 'rewards';
 if(winner==='player'&&remaining>0)return 'next-opponent';
 return 'complete';
}
export function trainerDefeated({kind,finished,winner,remaining=0}){
 return trainerBattleAction({kind,finished,winner,remaining})==='complete'&&winner==='player';
}
