import {experienceForLevel,getLearnset,getLevelEvolutionCandidates,getMove,movesAtLevel} from './moves.js';
import {calculateStats,validatePokemon,MAX_LEVEL} from './team.js';
import {POKEMON_DATA} from './pokemon-data.js';
const integer=(n,min,max)=>Number.isSafeInteger(n)&&n>=min&&n<=max;
function requirePokemon(p){if(!validatePokemon(p))throw Error('Ungültiges Pokémon');}
export function levelProgress(p){requirePokemon(p);const current=experienceForLevel(p.speciesId,p.level);const next=p.level===MAX_LEVEL?null:experienceForLevel(p.speciesId,p.level+1);return {level:p.level,experience:Math.max(p.experience,current),currentLevelExperience:current,nextLevelExperience:next};}
export function awardExperience(p,amount){requirePokemon(p);if(!integer(amount,0,100000000))throw Error('Ungültige Erfahrungspunkte');const start=p.level;const base=experienceForLevel(p.speciesId,p.level);p.experience=Math.min(100000000,Math.max(p.experience,base)+amount);const learned=[];const evolutionOptions=[];
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
 if(p.moves.length<4){p.moves.push(moveId);return true}
 if(!integer(replaceIndex,0,3))throw Error('Ersetzen einer Attacke erforderlich');p.moves[replaceIndex]=moveId;return true;
}
export function availableLevelEvolutions(p){requirePokemon(p);return getLevelEvolutionCandidates(p.speciesId,p.level);}
export function evolvePokemon(p,targetSpeciesId){requirePokemon(p);if(!integer(targetSpeciesId,1,493)||!availableLevelEvolutions(p).some(e=>e.to===targetSpeciesId))throw Error('Entwicklungsbedingung nicht erfüllt');
 const oldMax=p.stats.hp,oldCurrent=p.currentHp;p.speciesId=targetSpeciesId;p.stats=calculateStats(p.speciesId,p.level,p.ivs,p.evs);p.currentHp=oldCurrent===0?0:Math.min(p.stats.hp,oldCurrent+p.stats.hp-oldMax);
 const abilities=POKEMON_DATA[p.speciesId].abilities;const next=abilities.find(a=>a.id===p.abilityId)||abilities.find(a=>a.hidden===p.hiddenAbility)||abilities[0];p.abilityId=next.id;p.hiddenAbility=next.hidden;
 return p;
}
