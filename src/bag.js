import {EVOLUTION_STONES,stoneEvolutionOptions} from './progression.js';
import {PP_ITEMS,currentPp,maxPp} from './pp-items.js';
import {POTION_ITEM,STATUS_REMEDIES,REVIVE_ITEM,FULL_RESTORE_ITEM} from './healing.js';
import {POKEBALL_ITEM} from './capture.js';
import {SHOP_STOCK} from './shop.js';
export const BAG_CATEGORIES=Object.freeze([{id:'all',name:'Alle'},{id:'medicine',name:'Medizin'},{id:'pp',name:'AP'},{id:'stones',name:'Steine'},{id:'balls',name:'Pokébälle'},{id:'other',name:'Sonstiges'}]);
export function bagCategory(id){if(id===POTION_ITEM||id===REVIVE_ITEM||id===FULL_RESTORE_ITEM||STATUS_REMEDIES.some(r=>r.id===id))return 'medicine';if(PP_ITEMS.some(p=>p.id===id))return 'pp';if(EVOLUTION_STONES.some(s=>s.id===id))return 'stones';if(id===POKEBALL_ITEM)return 'balls';return 'other';}
export function bagName(id){return SHOP_STOCK.find(i=>i.id===id)?.name||id;}
export function bagEntries(inventory,category='all'){return inventory.filter(i=>i.quantity>0&&(category==='all'||bagCategory(i.id)===category)).map(i=>({...i,name:bagName(i.id),category:bagCategory(i.id)}));}
export function bagTargets(itemId,team){if(!Array.isArray(team))return [];const result=[];team.forEach((p,index)=>{if(itemId===POTION_ITEM&&p.currentHp>0&&p.currentHp<p.stats.hp)result.push({index,label:`#${p.speciesId} · ${p.currentHp}/${p.stats.hp} KP`,kind:'potion'});
else if(itemId===REVIVE_ITEM&&p.currentHp===0)result.push({index,label:`#${p.speciesId} · kampfunfähig`,kind:'recovery'});
else if(itemId===FULL_RESTORE_ITEM&&p.currentHp>0&&(p.currentHp<p.stats.hp||(p.status&&p.status!=='healthy')))result.push({index,label:`#${p.speciesId} · ${p.currentHp}/${p.stats.hp} KP · ${p.status}`,kind:'recovery'});
else if(STATUS_REMEDIES.some(r=>r.id===itemId&&r.status===p.status)&&p.currentHp>0)result.push({index,label:`#${p.speciesId} · ${p.status}`,kind:'remedy'});
else if(PP_ITEMS.some(i=>i.id===itemId)&&p.currentHp>0){const item=PP_ITEMS.find(i=>i.id===itemId);const pp=currentPp(p),max=maxPp(p);if(item.all){if(pp.some((v,i)=>v<max[i]))result.push({index,moveIndex:0,label:`#${p.speciesId} · alle Attacken`,kind:'pp'});}else p.moves.forEach((move,moveIndex)=>{if(pp[moveIndex]<max[moveIndex])result.push({index,moveIndex,label:`#${p.speciesId} · Attacke ${moveIndex+1}: ${pp[moveIndex]}/${max[moveIndex]} AP`,kind:'pp'});});}
else if(EVOLUTION_STONES.some(s=>s.id===itemId))for(const evolution of stoneEvolutionOptions(p,itemId))result.push({index,target:evolution.to,label:`#${p.speciesId} → #${evolution.to}`,kind:'stone'});
});return result;}
export function applyBagItem(engine,id,target){if(!target||!engine.inventory.some(i=>i.id===id&&i.quantity>0))return false;switch(target.kind){case 'potion':return engine.usePotionOn(target.index);case 'recovery':return engine.useRecoveryOn(id,target.index);case 'remedy':return engine.useRemedyOn(id,target.index);case 'pp':return engine.usePpItemOn(id,target.index,target.moveIndex);case 'stone':return engine.useEvolutionStoneOn(id,target.index,target.target);default:return false;}}
