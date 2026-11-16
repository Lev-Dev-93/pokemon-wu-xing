import {PP_ITEMS} from './pp-items.js';
import {POKEBALL_ITEM} from './capture.js';
import {POTION_ITEM,STATUS_REMEDIES,REVIVE_ITEM,FULL_RESTORE_ITEM} from './healing.js';
// Vorläufige Testpreise. Die endgültige Ökonomie wird später festgelegt.
export const SHOP_STOCK=Object.freeze([
 Object.freeze({id:POKEBALL_ITEM,name:'Pokéball',price:40}),
 Object.freeze({id:POTION_ITEM,name:'Trank',price:60}),
 Object.freeze({id:REVIVE_ITEM,name:'Beleber',price:120}),
 Object.freeze({id:FULL_RESTORE_ITEM,name:'Top-Genesung',price:180}),
 ...PP_ITEMS.map(({id,name,price})=>Object.freeze({id,name,price})),
 ...STATUS_REMEDIES.map(({id,name,price})=>Object.freeze({id,name,price}))
]);
export function shopItem(id){return SHOP_STOCK.find(i=>i.id===id)||null}
export function canPurchase(state,id,quantity=1){const item=shopItem(id);return !!item&&Number.isSafeInteger(quantity)&&quantity>0&&quantity<=99&&Number.isSafeInteger(state.money)&&state.money>=item.price*quantity&&state.money<=999999999;}
