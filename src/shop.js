import {POKEBALL_ITEM} from './capture.js';
import {POTION_ITEM} from './healing.js';
// Vorläufige Testpreise. Die endgültige Ökonomie wird später festgelegt.
export const SHOP_STOCK=Object.freeze([
 Object.freeze({id:POKEBALL_ITEM,name:'Pokéball',price:40}),
 Object.freeze({id:POTION_ITEM,name:'Trank',price:60})
]);
export function shopItem(id){return SHOP_STOCK.find(i=>i.id===id)||null}
export function canPurchase(state,id,quantity=1){const item=shopItem(id);return !!item&&Number.isSafeInteger(quantity)&&quantity>0&&quantity<=99&&Number.isSafeInteger(state.money)&&state.money>=item.price*quantity&&state.money<=999999999;}
