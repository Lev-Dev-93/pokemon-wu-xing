import {validatePokemon} from './team.js';
// Technisches Fangmodell. Raten für die vorläufigen Route-1-Arten; weitere Arten folgen.
export const POKEBALL_ITEM='poke-ball';
export const ROUTE1_CATCH_RATES=Object.freeze({10:255,13:255,16:255,19:255});
export function captureProbability(pokemon,{ballMultiplier=1}={}){
 if(!validatePokemon(pokemon)||!Number.isFinite(ballMultiplier)||ballMultiplier<=0)throw Error('Ungültige Fangdaten');
 const rate=ROUTE1_CATCH_RATES[pokemon.speciesId]??45;
 const hpFactor=(3*pokemon.stats.hp-2*pokemon.currentHp)/(3*pokemon.stats.hp);
 const statusFactor=['sleep','freeze'].includes(pokemon.status)?2:['paralysis','poison','burn'].includes(pokemon.status)?1.5:1;
 return Math.min(1,Math.max(0,(rate/255)*hpFactor*statusFactor*ballMultiplier*0.75));
}
export function tryCapture(pokemon,rng=Math.random){const v=rng();if(!Number.isFinite(v)||v<0||v>=1)throw Error('Ungültiger Zufallswert');return v<captureProbability(pokemon);}
