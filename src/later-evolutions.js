import {getEvolutionParent,getEvolutionConditions,isEligibleSpecies} from './pokemon-extensions.js';
import {extendedEntry,extendedForm} from './extended-pokemon.js';
// Conservative interpretation of PokeAPI evolution conditions: unknown triggers never auto-pass.
const flags=new Set(['needs_overworld_rain','turn_upside_down','needs_multiplayer','near_special_rock']);
export function laterEvolutionOptions(p,context={}){
 if(!p||!Number.isInteger(p.speciesId))return [];
 const out=[];
 for(const target of [700,862,863,864,865,866,899,900,901,903,904,979,980,981,982]){
  if(getEvolutionParent(target)!==p.speciesId||!isEligibleSpecies(target)||!extendedEntry(target))continue;
  for(const c of getEvolutionConditions(target)){
   const trigger=c.evolution_trigger_id;
   // Explicitly support level-up and item triggers only. Special combat and location triggers remain pending.
   if(![1,3].includes(trigger))continue;
   const allowed=new Set(['evolution_trigger_id','minimum_level','minimum_happiness','minimum_affection','time_of_day','known_move_id','known_move_type_id','held_item_id','trigger_item_id','required_pokemon_form_id',...flags]);
   if(Object.keys(c).some(k=>!allowed.has(k)))continue;
   if(flags.values().some(k=>Number(c[k]??0)!==0))continue;
   if(c.required_pokemon_form_id!==undefined&&Number(c.required_pokemon_form_id)!==(p.formId??p.speciesId))continue;
   if(c.minimum_level!==undefined&&p.level<Number(c.minimum_level))continue;
   if(c.minimum_happiness!==undefined&&(p.friendship??70)<Number(c.minimum_happiness))continue;
   // Affection is not interchangeable with friendship.
   if(c.minimum_affection!==undefined&&(context.affection??0)<Number(c.minimum_affection))continue;
   if(c.time_of_day!==undefined&&c.time_of_day!==context.timeOfDay)continue;
   if(c.known_move_id!==undefined&&!(p.moves??[]).includes(Number(c.known_move_id)))continue;
   if(c.known_move_type_id!==undefined&&!(context.knownMoveTypes??[]).includes(Number(c.known_move_type_id)))continue;
   if(c.held_item_id!==undefined&&Number(context.heldItemId)!==Number(c.held_item_id))continue;
   if(trigger===3&&Number(context.itemId)!==Number(c.trigger_item_id))continue;
   if(trigger===1&&context.trigger!=='level-up')continue;
   out.push({to:target,trigger,conditions:{...c}});break;
  }
 }
 return out;
}
export function evolvedFormId(p,target){
 // A regional form can only carry through if an explicit target form is supplied and verified.
 return null;
}
