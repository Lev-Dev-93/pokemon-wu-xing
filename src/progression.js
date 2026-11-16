import {experienceForLevel,getLearnset,getLevelEvolutionCandidates,getEvolutions,getMove,movesAtLevel} from './moves.js';
import {calculateStats,validatePokemon,MAX_LEVEL} from './team.js';
import {POKEMON_DATA} from './pokemon-data.js';
import {currentPp} from './pp-items.js';
const integer=(n,min,max)=>Number.isSafeInteger(n)&&n>=min&&n<=max;
function requirePokemon(p){if(!validatePokemon(p))throw Error('Ungültiges Pokémon');}
export function levelProgress(p){requirePokemon(p);const current=experienceForLevel(p.speciesId,p.level);const next=p.level===MAX_LEVEL?null:experienceForLevel(p.speciesId,p.level+1);return {level:p.level,experience:Math.max(p.experience,current),currentLevelExperience:current,nextLevelExperience:next};}
export function awardExperience(p,amount){requirePokemon(p);if(!integer(amount,0,100000000))throw Error('Ungültige Erfahrungspunkte');const start=p.level;const base=experienceForLevel(p.speciesId,p.level);p.experience=Math.min(experienceForLevel(p.speciesId,MAX_LEVEL),Math.max(p.experience,base)+amount);const learned=[];const evolutionOptions=[];
 while(p.level<MAX_LEVEL&&p.experience>=experienceForLevel(p.speciesId,p.level+1)){
  const oldHp=p.stats.hp;p.level++;p.stats=calculateStats(p.speciesId,p.level,p.ivs,p.evs);p.currentHp=Math.min(p.stats.hp,p.currentHp+(p.stats.hp-oldHp));
  for(const x of getLearnset(p.speciesId).filter(x=>x.level===p.level))if(!p.moves.includes(x.moveId)&&!learned.includes(x.moveId))learned.push(x.moveId);
  evolutionOptions.push(...getLevelEvolutionCandidates(p.speciesId,p.level).map(e=>({...e,atLevel:p.level})));
 }
 return {oldLevel:start,newLevel:p.level,levelsGained:p.level-start,learnableMoves:learned,evolutionOptions};
}
export function learnMove(p,moveId,replaceIndex=null){requirePokemon(p);if(!integer(moveId,1,10000)||!getMove(moveId))throw Error('Unbekannte Attacke');if(p.moves.includes(moveId))return false;
 // Only level-up moves already reached may be learned here; item/tutor moves need a separate system.
 if(!getLearnset(p.speciesId).some(x=>x.moveId===moveId&&x.level<=p.level))throw Error('Attacke noch nicht erlernbar');
 const pp=currentPp(p);if(p.moves.length<4){p.moves.push(moveId);p.pp=[...pp,getMove(moveId).pp];return true}
 if(!integer(replaceIndex,0,3))throw Error('Ersetzen einer Attacke erforderlich');p.moves[replaceIndex]=moveId;pp[replaceIndex]=getMove(moveId).pp;p.pp=pp;return true;
}
export function availableLevelEvolutions(p){requirePokemon(p);return getLevelEvolutionCandidates(p.speciesId,p.level);}
export function evolvePokemon(p,targetSpeciesId){requirePokemon(p);if(!integer(targetSpeciesId,1,493)||!availableLevelEvolutions(p).some(e=>e.to===targetSpeciesId))throw Error('Entwicklungsbedingung nicht erfüllt');
 const oldMax=p.stats.hp,oldCurrent=p.currentHp;p.speciesId=targetSpeciesId;p.stats=calculateStats(p.speciesId,p.level,p.ivs,p.evs);p.currentHp=oldCurrent===0?0:Math.min(p.stats.hp,oldCurrent+p.stats.hp-oldMax);
 const abilities=POKEMON_DATA[p.speciesId].abilities;const next=abilities.find(a=>a.id===p.abilityId)||abilities.find(a=>a.hidden===p.hiddenAbility)||abilities[0];p.abilityId=next.id;p.hiddenAbility=next.hidden;
 return p;
}

// PokeAPI item IDs; only known stones with an unambiguous evolution trigger are supported.
export const EVOLUTION_STONES=Object.freeze([
 {id:'water-stone',itemId:84,name:'Wasserstein'},
 {id:'thunder-stone',itemId:83,name:'Donnerstein'},
 {id:'fire-stone',itemId:82,name:'Feuerstein'},
 {id:'moon-stone',itemId:81,name:'Mondstein'},
 {id:'leaf-stone',itemId:85,name:'Blattstein'},
 {id:'sun-stone',itemId:80,name:'Sonnenstein'},
 {id:'shiny-stone',itemId:107,name:'Leuchtstein'},
 {id:'dusk-stone',itemId:108,name:'Finsterstein'},
 {id:'dawn-stone',itemId:109,name:'Funkelstein'}
]);
export function stoneEvolutionOptions(p,stoneId){
 requirePokemon(p);const stone=EVOLUTION_STONES.find(s=>s.id===stoneId);if(!stone)return [];
 return getEvolutions(p.speciesId).filter(e=>e.trigger===3&&e.item===stone.itemId&&Object.entries(e.conditions||{}).every(([key,value])=>key==='required_pokemon_form_id'&&Number(value)===p.speciesId));
}
export function evolveWithStone(p,stoneId,target){
 if(!stoneEvolutionOptions(p,stoneId).some(e=>e.to===target))throw Error('Steinentwicklung nicht möglich');
 return applyEvolution(p,target);
}
function applyEvolution(p,target){
 const oldMax=p.stats.hp,oldCurrent=p.currentHp;p.speciesId=target;p.stats=calculateStats(target,p.level,p.ivs,p.evs);p.currentHp=oldCurrent===0?0:Math.min(p.stats.hp,oldCurrent+p.stats.hp-oldMax);
 const abilities=POKEMON_DATA[target].abilities;const next=abilities.find(a=>a.id===p.abilityId)||abilities.find(a=>a.hidden===p.hiddenAbility)||abilities[0];p.abilityId=next.id;p.hiddenAbility=next.hidden;return p;
}

export function friendshipEvolutionOptions(p,timeOfDay='day'){
 requirePokemon(p);if(!['day','night'].includes(timeOfDay))throw Error('Ungültige Tageszeit');
 return getEvolutions(p.speciesId).filter(e=>{
  if(e.trigger!==1||e.item!==null||e.level!==null)return false;
  const c=e.conditions||{};if(!Object.hasOwn(c,'minimum_happiness'))return false;
  if(Object.keys(c).some(k=>!['minimum_happiness','time_of_day','required_pokemon_form_id'].includes(k)))return false;
  if(c.required_pokemon_form_id!==undefined&&Number(c.required_pokemon_form_id)!==p.speciesId)return false;
  if(c.time_of_day!==undefined&&c.time_of_day!==timeOfDay)return false;
  return (p.friendship??70)>=Number(c.minimum_happiness);
 });
}
export function evolveWithFriendship(p,target,timeOfDay='day'){
 if(!friendshipEvolutionOptions(p,timeOfDay).some(e=>e.to===target))throw Error('Freundschaftsentwicklung nicht möglich');
 return applyEvolution(p,target);
}
