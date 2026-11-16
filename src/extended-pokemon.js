import extra from './extended-battle-data.json' with {type:'json'};
import {POKEMON_DATA} from './pokemon-data.js';
import {getRegionalFormByPokemonId} from './pokemon-extensions.js';
export function extendedEntry(id){return POKEMON_DATA[id]??extra[String(id)]??null;}
export function extendedForm(speciesId,formId){const f=getRegionalFormByPokemonId(formId);return f&&f.speciesId===Number(speciesId)&&extra[String(formId)]?f:null;}
export function extendedTypes(speciesId,formId=null){return extra[String(formId??speciesId)]?.types??null;}
export function extendedLearnset(speciesId,formId=null){return extra[String(formId??speciesId)]?.learnset??null;}
export function extendedGrowth(speciesId){return extra[String(speciesId)]?.growthRate??null;}
