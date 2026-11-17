import {getMove,speciesTypes,typeEffectiveness} from './moves.js';
import {legalMoveIndices} from './battle-actions.js';

// Deterministic ranking with seeded/random tie breaking. The trainer avoids
// ineffective attacks while still preferring a useful move over no action.
export function chooseTrainerMove(attacker,defender,rng=Math.random){
 const legal=legalMoveIndices(attacker);
 if(!legal.length)return null;
 const targetTypes=speciesTypes(defender?.pokemon?.speciesId,defender?.pokemon?.formId);
 const ownTypes=speciesTypes(attacker.pokemon.speciesId,attacker.pokemon.formId);
 const scored=legal.map(index=>{
  const move=getMove(attacker.pokemon.moves[index]);
  let score=0;
  if(move?.power>0&&[2,3].includes(move.category)){
   let effectiveness=1;
   if(targetTypes.length){try{effectiveness=typeEffectiveness(move.typeId,targetTypes)}catch{effectiveness=1}}
   score=move.power*effectiveness*(ownTypes.includes(move.typeId)?1.5:1)*(move.accuracy==null?1:move.accuracy/100);
  }else if(move?.category===1){
   // Status moves remain possible; do not assume every data entry has an implemented effect.
   score=12;
  }
  return {index,score};
 });
 const best=Math.max(...scored.map(x=>x.score));
 const choices=scored.filter(x=>x.score===best);
 const roll=rng();
 if(!Number.isFinite(roll)||roll<0||roll>=1)throw Error('Ungültiger Zufallswert');
 return choices[Math.floor(roll*choices.length)].index;
}
