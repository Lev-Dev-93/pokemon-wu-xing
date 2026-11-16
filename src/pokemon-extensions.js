// PokeAPI-CSV: zusätzliche Entwicklungen der Nationaldex-Arten #001–493 und Regionalformen.
// Registry ist getrennt von der noch auf #001–493 beschränkten Kampf-/Teamengine.
import data from './pokemon-extensions-data.json' with {type:'json'};
const later=new Set(data.laterEvolutionSpecies);
const forms=new Map(data.regionalForms.map(f=>[f.pokemonId,f]));
export const ORIGINAL_SPECIES_MAX=493;
export function isEligibleSpecies(id){return Number.isInteger(id)&&id>0&&(id<=493||later.has(id));}
export function isLaterEvolution(id){return later.has(id);}
export function getLaterEvolutionSpecies(){return [...data.laterEvolutionSpecies];}
export function getRegionalForms(speciesId){return data.regionalForms.filter(f=>f.speciesId===speciesId).map(f=>({...f}));}
export function getRegionalFormByPokemonId(id){const f=forms.get(id);return f?{...f}:null;}
export function getEvolutionParent(speciesId){return data.evolvesFrom[String(speciesId)]??null;}
export function getEvolutionChildren(speciesId){return Object.entries(data.evolvesFrom).filter(([,p])=>p===speciesId).map(([id])=>Number(id)).sort((a,b)=>a-b);}
export function getEvolutionConditions(speciesId){return structuredClone(data.evolutionConditions[String(speciesId)]??[]);}
export function getEligibleSpeciesName(id){return isEligibleSpecies(id)?data.speciesNames[String(id)]??null:null;}
export const EXTENSION_IMPLEMENTATION_STATUS=Object.freeze({catalog:'available',evolutionExecution:'not-implemented',regionalBattleStats:'not-implemented',regionalSprites:'not-implemented'});
