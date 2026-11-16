import {ppItem,currentPp,maxPp,restorePp} from './pp-items.js';
import {POTION_ITEM,usePotion,remedyFor,useStatusRemedy,REVIVE_ITEM,FULL_RESTORE_ITEM,useRevive,useFullRestore} from './healing.js';
/** A potion costs one turn; this function only applies the item, not the enemy turn. */
export function useBattlePotion(battle,inventory,{removeItem}={}){
 if(!battle||battle.finished||!battle.player?.pokemon||!Array.isArray(inventory)||typeof removeItem!=='function')return {ok:false,reason:'Kampfaktion nicht möglich.'};
 if(!inventory.some(item=>item.id===POTION_ITEM&&item.quantity>0))return {ok:false,reason:'Keine Tränke vorhanden.'};
 const pokemon=battle.player.pokemon;
 if(pokemon.currentHp<=0)return {ok:false,reason:'Kampfunfähige Pokémon benötigen eine andere Heilung.'};
 if(pokemon.currentHp>=pokemon.stats.hp)return {ok:false,reason:'Dein Pokémon hat bereits volle KP.'};
 if(!removeItem(POTION_ITEM,1))return {ok:false,reason:'Trank konnte nicht verbraucht werden.'};
 const previousHp=pokemon.currentHp;
 usePotion(pokemon);
 battle.log=[`Ein Trank stellt ${pokemon.currentHp-previousHp} KP wieder her.`];
 return {ok:true,healed:pokemon.currentHp-previousHp};
}

/** Statusheilmittel im Kampf: ein Gegenstand, ein Zug, danach ist der Gegner dran. */
export function useBattleRemedy(battle,inventory,id,{removeItem}={}){
 if(!battle||battle.finished||!battle.player?.pokemon||!Array.isArray(inventory)||typeof removeItem!=='function')return {ok:false,reason:'Kampfaktion nicht möglich.'};
 const remedy=remedyFor(id);
 if(!remedy)return {ok:false,reason:'Unbekanntes Heilmittel.'};
 const pokemon=battle.player.pokemon;
 if(pokemon.currentHp<=0)return {ok:false,reason:'Kampfunfähige Pokémon können nicht behandelt werden.'};
 if(pokemon.status!==remedy.status)return {ok:false,reason:`${remedy.name} passt nicht zum Status.`};
 if(!inventory.some(item=>item.id===id&&item.quantity>0))return {ok:false,reason:`Kein ${remedy.name} vorhanden.`};
 if(!removeItem(id,1))return {ok:false,reason:'Heilmittel konnte nicht verbraucht werden.'};
 useStatusRemedy(pokemon,id);
 battle.log=[`${remedy.name} heilt das Statusproblem deines Pokémon.`];
 return {ok:true,remedy:id};
}

/** Revive a fainted reserve or fully restore a living team member during a live battle.
 * The caller must grant the opposing Pokémon its turn after success. */
export function useBattleRecovery(battle,team,activeIndex,targetIndex,inventory,id,{removeItem,fighters}={}){
 if(!battle||battle.finished||!Array.isArray(team)||!Array.isArray(inventory)||typeof removeItem!=='function'||!Number.isInteger(activeIndex)||!Number.isInteger(targetIndex)||targetIndex<0||targetIndex>=team.length||activeIndex<0||activeIndex>=team.length)return {ok:false,reason:'Kampfaktion nicht möglich.'};
 if(id!==REVIVE_ITEM&&id!==FULL_RESTORE_ITEM)return {ok:false,reason:'Unbekanntes Heilmittel.'};
 const active=targetIndex===activeIndex;
 const pokemon=active?battle.player?.pokemon:team[targetIndex];
 if(!pokemon?.stats)return {ok:false,reason:'Pokémon nicht gefunden.'};
 const valid=id===REVIVE_ITEM?pokemon.currentHp===0:pokemon.currentHp>0&&(pokemon.currentHp<pokemon.stats.hp||(pokemon.status&&pokemon.status!=='healthy'));
 if(!valid)return {ok:false,reason:id===REVIVE_ITEM?'Beleber benötigen ein kampfunfähiges Pokémon.':'Dieses Pokémon benötigt keine Top-Genesung.'};
 if(!inventory.some(item=>item.id===id&&item.quantity>0))return {ok:false,reason:'Gegenstand nicht vorhanden.'};
 if(!removeItem(id,1))return {ok:false,reason:'Gegenstand konnte nicht verbraucht werden.'};
 const apply=id===REVIVE_ITEM?useRevive:useFullRestore;
 apply(pokemon);
 if(!active){team[targetIndex]=structuredClone(pokemon);if(fighters?.has(targetIndex))fighters.get(targetIndex).pokemon=structuredClone(pokemon)}
 battle.log=[`${id===REVIVE_ITEM?'Beleber':'Top-Genesung'} auf Pokémon #${pokemon.speciesId} angewendet.`];
 return {ok:true,id,targetIndex};
}

/** Restore AP during battle; the caller grants the opponent a turn on success. */
export function useBattlePpItem(battle,team,activeIndex,targetIndex,moveIndex,inventory,id,{removeItem,fighters}={}){
 const item=ppItem(id);
 if(!battle||battle.finished||!item||!Array.isArray(team)||!Array.isArray(inventory)||typeof removeItem!=='function'||!Number.isInteger(activeIndex)||activeIndex<0||activeIndex>=team.length||!Number.isInteger(targetIndex)||targetIndex<0||targetIndex>=team.length)return {ok:false,reason:'Kampfaktion nicht möglich.'};
 const active=activeIndex===targetIndex;
 const pokemon=active?battle.player?.pokemon:team[targetIndex];
 if(!pokemon||pokemon.currentHp<=0||!Array.isArray(pokemon.moves)||!pokemon.moves.length)return {ok:false,reason:'Kein kampffähiges Ziel vorhanden.'};
 if(!item.all&&(!Number.isInteger(moveIndex)||moveIndex<0||moveIndex>=pokemon.moves.length))return {ok:false,reason:'Ungültige Attacke.'};
 const before=active&&Array.isArray(battle.player.pp)?[...battle.player.pp]:currentPp(pokemon);
 const maximum=maxPp(pokemon);
 const eligible=item.all?before.some((v,i)=>v<maximum[i]):before[moveIndex]<maximum[moveIndex];
 if(!eligible)return {ok:false,reason:'Die AP sind bereits voll.'};
 if(!inventory.some(entry=>entry.id===id&&entry.quantity>0))return {ok:false,reason:'Gegenstand nicht vorhanden.'};
 if(!removeItem(id,1))return {ok:false,reason:'Gegenstand konnte nicht verbraucht werden.'};
 pokemon.pp=before;restorePp(pokemon,id,moveIndex);
 if(active)battle.player.pp=[...pokemon.pp];
 else {team[targetIndex]=structuredClone(pokemon);if(fighters?.has(targetIndex)){fighters.get(targetIndex).pokemon.pp=[...pokemon.pp];fighters.get(targetIndex).pp=[...pokemon.pp]}}
 battle.log=[`${item.name} stellt AP von Pokémon #${pokemon.speciesId} wieder her.`];
 return {ok:true,id,targetIndex,moveIndex,pp:[...pokemon.pp]};
}
