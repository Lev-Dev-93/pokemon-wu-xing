import {awardExperience,learnMove,evolvePokemon} from './progression.js';
import {validatePokemon} from './team.js';
import {getMove} from './moves.js';
export function testExperienceReward(enemy){if(!validatePokemon(enemy))throw Error('Ungültiger Gegner');return Math.max(1,Math.floor(enemy.level*12));}
export function grantTestExperience(pokemon,enemy){if(!validatePokemon(pokemon)||!validatePokemon(enemy))throw Error('Ungültiges Pokémon');const amount=testExperienceReward(enemy);const result=awardExperience(pokemon,amount);return {amount,...result};}
export function acceptMove(pokemon,moveId,replaceIndex=null){return learnMove(pokemon,moveId,replaceIndex);}
export function acceptEvolution(pokemon,target){return evolvePokemon(pokemon,target);}
export function describeMove(moveId){const m=getMove(moveId);return m?.de||m?.name||`#${moveId}`;}

// Deterministic, side-effect-free reward queue for battle UI.
export function createRewardQueue(result){
 if(!result||!Array.isArray(result.learnableMoves)||!Array.isArray(result.evolutionOptions))throw Error('Ungültige Kampfbelohnung');
 const moves=[...new Set(result.learnableMoves)].map(id=>({kind:'move',id}));
 const evolutions=[...new Set(result.evolutionOptions.map(e=>e.to))].map(id=>({kind:'evolution',id}));
 return [...moves,...evolutions];
}
