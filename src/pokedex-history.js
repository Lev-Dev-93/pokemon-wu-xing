// dev.410–419: durable Pokédex discovery history, backwards compatible with schema 8.
const MAX_SPECIES=493;
export function validSpecies(id){return Number.isInteger(id)&&id>=1&&id<=MAX_SPECIES;}
export function collectOwnedSpecies(team=[],storage=[]){return [...new Set([...team,...storage].map(p=>p?.speciesId).filter(validSpecies))].sort((a,b)=>a-b);}
export function normalizeDex(raw,team=[],storage=[]){
 const seen=new Set(Array.isArray(raw?.seen)?raw.seen.filter(validSpecies):[]);
 const caught=new Set(Array.isArray(raw?.caught)?raw.caught.filter(validSpecies):[]);
 for(const id of collectOwnedSpecies(team,storage))caught.add(id);
 for(const id of caught)seen.add(id);
 return {seen:[...seen].sort((a,b)=>a-b),caught:[...caught].sort((a,b)=>a-b)};
}
export function registerDexSpecies(raw,id,kind='seen'){const dex=normalizeDex(raw);if(!validSpecies(id))return dex;const seen=new Set(dex.seen),caught=new Set(dex.caught);seen.add(id);if(kind==='caught')caught.add(id);return normalizeDex({seen:[...seen],caught:[...caught]});}
export function dexHistoryProgress(raw){const dex=normalizeDex(raw);return {seen:dex.seen.length,caught:dex.caught.length,total:MAX_SPECIES};}
export function dexHistoryEntries(raw,filter='all'){const dex=normalizeDex(raw);const seen=new Set(dex.seen),caught=new Set(dex.caught);return [...seen].filter(id=>filter==='caught'?caught.has(id):filter==='seen'?!caught.has(id):true).map(id=>({id,seen:true,caught:caught.has(id)}));}
