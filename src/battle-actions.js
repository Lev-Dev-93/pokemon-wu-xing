export function legalMoveIndices(fighter){
 if(!Array.isArray(fighter?.pokemon?.moves)||!Array.isArray(fighter?.pp))return [];
 return fighter.pokemon.moves.flatMap((id,index)=>Number.isInteger(id)&&id>0&&Number.isInteger(fighter.pp[index])&&fighter.pp[index]>0?[index]:[]);
}
export function chooseLegalMove(fighter,rng=Math.random){
 const indices=legalMoveIndices(fighter);if(!indices.length)return null;
 const roll=rng();if(!Number.isFinite(roll)||roll<0||roll>=1)throw Error('Ungültiger Zufallswert');
 return indices[Math.floor(roll*indices.length)];
}
