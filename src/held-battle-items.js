/** Gen-5-inspired held damage items. IDs are stable project keys, not bag item IDs. */
export const HELD_BATTLE_ITEMS=Object.freeze({
 'muscle-band':Object.freeze({name:'Muskelband',category:2,multiplier:1.1}),
 'wise-glasses':Object.freeze({name:'Schlauglas',category:3,multiplier:1.1}),
 'expert-belt':Object.freeze({name:'Expertengurt',superEffective:true,multiplier:1.2}),
 'leftovers':Object.freeze({name:'Überreste',endTurnHeal:1/16}),
 'life-orb':Object.freeze({name:'Leben-Orb',multiplier:1.3,selfDamage:1/10}),
 'focus-sash':Object.freeze({name:'Fokusgurt',survival:true})
});
export function heldFocusSashSurvival(pokemon,incoming){const hp=pokemon?.currentHp,max=pokemon?.stats?.hp;return pokemon?.heldItemId==='focus-sash'&&Number.isFinite(hp)&&hp>0&&hp===max&&incoming>=hp?hp-1:incoming}
export function heldEndTurnHeal(pokemon){if(pokemon?.heldItemId!=='leftovers'||pokemon.currentHp<=0)return 0;return Math.min(pokemon.stats.hp-pokemon.currentHp,Math.max(1,Math.floor(pokemon.stats.hp/16)))}
export function heldLifeOrbRecoil(pokemon,inflicted){if(pokemon?.heldItemId!=='life-orb'||inflicted<=0||pokemon.currentHp<=0)return 0;return Math.min(pokemon.currentHp,Math.max(1,Math.floor(pokemon.stats.hp/10)))}
export function validHeldBattleItem(id){return id===undefined||id===null||Object.hasOwn(HELD_BATTLE_ITEMS,id)}
export function heldDamageMultiplier(pokemon,move,effectiveness){
 const item=HELD_BATTLE_ITEMS[pokemon?.heldItemId];
 if(!item||!move||!(move.power>0)||![2,3].includes(move.category))return 1;
 if(item.category!==undefined&&item.category!==move.category)return 1;
 if(item.superEffective&&!(effectiveness>1))return 1;
 return item.multiplier;
}
