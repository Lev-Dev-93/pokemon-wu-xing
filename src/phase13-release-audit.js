import {BATTLE_DATA} from './battle-data.js';
import inventory from './ability-inventory.json' with {type:'json'};

/** Deterministic inventory audit. This checks data integrity, NOT effect correctness. */
export function phase13ReleaseAudit(){
 const allMoves=Object.values(BATTLE_DATA.moves);
 const moves=allMoves.filter(move=>move.id<10000);
 const issues=[];
 for(const move of moves){
  if(!Number.isInteger(move.id)||move.id<1)issues.push(`Attacke mit ungültiger ID: ${move.id}`);
  if(!move.name||!move.de)issues.push(`Attacke ${move.id}: Name fehlt`);
  if(!Number.isInteger(move.pp)||move.pp<1)issues.push(`Attacke ${move.id}: ungültige AP`);
  if(![1,2,3].includes(move.category))issues.push(`Attacke ${move.id}: ungültige Kategorie`);
  if(!Number.isInteger(move.typeId)||move.typeId<1||move.typeId>18)issues.push(`Attacke ${move.id}: ungültiger Typ`);
  if(move.accuracy!==null&&(!Number.isFinite(move.accuracy)||move.accuracy<1||move.accuracy>100))issues.push(`Attacke ${move.id}: ungültige Genauigkeit`);
  if(move.power!==null&&(!Number.isFinite(move.power)||move.power<1))issues.push(`Attacke ${move.id}: ungültige Stärke`);
 }
 const abilityCounts={complete:0,partial:0,unverified:0,other:0};
 for(const a of inventory.abilities){const key=Object.hasOwn(abilityCounts,a.status)?a.status:'other';abilityCounts[key]++;}
 const unverifiedAbilities=inventory.abilities.filter(a=>a.status!=='complete').map(a=>a.abilityId);
 return {moveCount:moves.length,specialMoveCount:allMoves.length-moves.length,abilityCount:inventory.abilities.length,abilityCounts,unverifiedAbilities,invalidData:issues, dataValid:issues.length===0,mechanicsComplete:issues.length===0&&unverifiedAbilities.length===0};
}
