import {POTION_ITEM,usePotion} from './healing.js';
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
