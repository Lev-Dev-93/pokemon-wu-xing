import {currentPp,maxPp} from './pp-items.js';
import {movesAtLevel,getMove,experienceForLevel} from './moves.js';
import {POKEMON_DATA} from './pokemon-data.js';
export const TEAM_LIMIT=6;
export const MAX_LEVEL=100;
const statsNames=['hp','attack','defense','specialAttack','specialDefense','speed'];
const validInt=(n,min,max)=>Number.isSafeInteger(n)&&n>=min&&n<=max;
export function calculateStats(speciesId,level,ivs=Array(6).fill(31),evs=Array(6).fill(0)){
 const entry=POKEMON_DATA[speciesId];if(!entry||!validInt(level,1,MAX_LEVEL)||!Array.isArray(ivs)||ivs.length!==6||!ivs.every(v=>validInt(v,0,31))||!Array.isArray(evs)||evs.length!==6||!evs.every(v=>validInt(v,0,252))||evs.reduce((a,b)=>a+b,0)>510)throw Error('Ungültige Pokémon-Statusdaten');
 const out={};for(let i=0;i<6;i++){const raw=Math.floor((2*entry.stats[i]+ivs[i]+Math.floor(evs[i]/4))*level/100);out[statsNames[i]]=i===0?raw+level+10:raw+5;}return out;
}
export function createPokemon(speciesId,{level=5,ivs=Array(6).fill(31),evs=Array(6).fill(0),abilityId=null,shiny=false}={}){
 const entry=POKEMON_DATA[speciesId];if(!entry)throw Error('Unbekannte Pokémon-Art');
 const stats=calculateStats(speciesId,level,ivs,evs);
 const abilities=entry.abilities;const chosen=abilityId===null?(abilities.find(a=>a.hidden)||abilities[0]):abilities.find(a=>a.id===abilityId);
 if(!chosen)throw Error('Ungültige Fähigkeit');
 if(typeof shiny!=='boolean')throw Error('Ungültiger Shiny-Status');
 return {speciesId:Number(speciesId),level,experience:experienceForLevel(Number(speciesId),level),ivs:[...ivs],evs:[...evs],abilityId:chosen.id,hiddenAbility:chosen.hidden,shiny,stats,currentHp:stats.hp,status:'healthy',friendship:70,moves:movesAtLevel(Number(speciesId),level)};
}
export function validatePokemon(p){
 if(!p||typeof p!=='object'||!validInt(p.speciesId,1,493)||!POKEMON_DATA[p.speciesId]||!validInt(p.level,1,MAX_LEVEL)||!validInt(p.experience,0,100000000)||!Array.isArray(p.ivs)||!Array.isArray(p.evs))return false;
 if(p.friendship!==undefined&&!validInt(p.friendship,0,255))return false;
 let stats;try{stats=calculateStats(p.speciesId,p.level,p.ivs,p.evs)}catch{return false}
 if(!p.stats||statsNames.some(k=>p.stats[k]!==stats[k])||!validInt(p.currentHp,0,stats.hp))return false;
 const a=POKEMON_DATA[p.speciesId].abilities.find(a=>a.id===p.abilityId);
 return !!a&&p.hiddenAbility===a.hidden&&typeof p.shiny==='boolean'&&typeof p.status==='string'&&['healthy','poison','burn','paralysis','sleep','freeze'].includes(p.status)&&Array.isArray(p.moves)&&p.moves.length<=4&&p.moves.every(m=>validInt(m,1,10000)&&!!getMove(m))&&(p.pp===undefined||(Array.isArray(p.pp)&&p.pp.length===p.moves.length&&p.pp.every((v,i)=>validInt(v,0,getMove(p.moves[i]).pp))));
}
export function validateTeam(team){return Array.isArray(team)&&team.length<=TEAM_LIMIT&&team.every(validatePokemon)}
export function addToTeam(team,pokemon){if(!validateTeam(team)||!validatePokemon(pokemon)||team.length>=TEAM_LIMIT)return false;team.push(structuredClone(pokemon));return true}
export function removeFromTeam(team,index){if(!validateTeam(team)||!validInt(index,0,team.length-1))return null;return team.splice(index,1)[0]}
export function reorderTeam(team,from,to){if(!validateTeam(team)||!validInt(from,0,team.length-1)||!validInt(to,0,team.length-1))return false;const [p]=team.splice(from,1);team.splice(to,0,p);return true}
export function healTeam(team){if(!validateTeam(team))throw Error('Ungültiges Team');for(const p of team){p.currentHp=p.stats.hp;p.status='healthy'}return true}
