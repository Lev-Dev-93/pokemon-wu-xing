import {awardExperience,learnMove,evolvePokemon} from './progression.js';
import {validatePokemon} from './team.js';
import {getMove} from './moves.js';
export function testExperienceReward(enemy){if(!validatePokemon(enemy))throw Error('Ungültiger Gegner');return Math.max(1,Math.floor(enemy.level*12));}
export function grantTestExperience(pokemon,enemy){if(!validatePokemon(pokemon)||!validatePokemon(enemy))throw Error('Ungültiges Pokémon');const amount=testExperienceReward(enemy);const result=awardExperience(pokemon,amount);return {amount,...result};}
export function acceptMove(pokemon,moveId,replaceIndex=null){return learnMove(pokemon,moveId,replaceIndex);}
export function acceptEvolution(pokemon,target){return evolvePokemon(pokemon,target);}
export function describeMove(moveId){const m=getMove(moveId);return m?.de||m?.name||`#${moveId}`;}
