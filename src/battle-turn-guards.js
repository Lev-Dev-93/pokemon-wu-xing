// A knocked-out fighter cannot receive a move, and a completed battle cannot be continued.
export function canContinueBattle(battle){
 return Boolean(battle&&!battle.finished&&battle.player?.pokemon?.currentHp>0&&battle.opponent?.pokemon?.currentHp>0);
}
