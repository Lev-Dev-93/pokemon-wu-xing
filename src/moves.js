import {isEligibleSpecies} from './pokemon-extensions.js';
import {extendedTypes,extendedLearnset,extendedGrowth} from './extended-pokemon.js';
import {BATTLE_DATA} from './battle-data.js';
const validSpecies=id=>Number.isInteger(Number(id))&&Number(id)>=1&&isEligibleSpecies(Number(id));
export function getMove(id){return BATTLE_DATA.moves[id]??null}
export function getLearnset(speciesId,formId=null){return validSpecies(speciesId)?(extendedLearnset(speciesId,formId)??BATTLE_DATA.learnsets[speciesId]??[]).map(([level,id])=>({level,moveId:id})):[]}
export function movesAtLevel(speciesId,level,formId=null){if(!validSpecies(speciesId)||!Number.isInteger(level)||level<1||level>100)throw Error('Ungültige Lernliste');const list=getLearnset(speciesId,formId).filter(x=>x.level<=level).map(x=>x.moveId);return [...new Set(list.reverse())].slice(0,4).reverse()}
export function getEvolutions(speciesId){return validSpecies(speciesId)?structuredClone(BATTLE_DATA.evolutions[speciesId]||[]):[]}
export function getLevelEvolutionCandidates(speciesId,level){if(!Number.isInteger(level)||level<1||level>100)return [];return getEvolutions(speciesId).filter(e=>e.trigger===1&&e.level!==null&&level>=e.level&&!e.item&&Object.keys(e.conditions).length===0)}
export function typeEffectiveness(attackType,defenderTypes){if(!Number.isInteger(attackType)||!Array.isArray(defenderTypes)||defenderTypes.length<1||defenderTypes.length>2)throw Error('Ungültige Typen');let factor=1;for(const t of defenderTypes){const match=BATTLE_DATA.typeChart.find(x=>x[0]===attackType&&x[1]===t);if(!match)throw Error('Unbekannter Typ');factor*=match[2]/100}return factor}
export function speciesTypes(id,formId=null){return [...(extendedTypes(id,formId)??BATTLE_DATA.types[id]??[])]}
export function experienceForLevel(speciesId,level){if(!validSpecies(speciesId)||!Number.isInteger(level)||level<1||level>100)throw Error('Ungültige Erfahrung');return BATTLE_DATA.experience[(extendedGrowth(speciesId)??BATTLE_DATA.growth[speciesId])]?.[level]??null}
export function checkEvolution(pokemon){return getLevelEvolutionCandidates(pokemon.speciesId,pokemon.level)}
