import {getMove} from './moves.js';
export const PP_ITEMS=Object.freeze([
 Object.freeze({id:'ether',name:'Äther',price:80,all:false,amount:10}),
 Object.freeze({id:'max_ether',name:'Top-Äther',price:120,all:false,amount:Infinity}),
 Object.freeze({id:'elixir',name:'Elixier',price:160,all:true,amount:10}),
 Object.freeze({id:'max_elixir',name:'Top-Elixier',price:240,all:true,amount:Infinity})
]);
export const ppItem=id=>PP_ITEMS.find(i=>i.id===id)||null;
export function maxPp(p){return p.moves.map(id=>getMove(id).pp)}
export function currentPp(p){const max=maxPp(p);return Array.isArray(p.pp)&&p.pp.length===max.length?p.pp.map((v,i)=>Number.isInteger(v)&&v>=0&&v<=max[i]?v:max[i]):max}
export function restorePp(p,id,moveIndex=0){const item=ppItem(id);if(!item||!p||!Array.isArray(p.moves)||!p.moves.length)return false;const max=maxPp(p),old=currentPp(p);if(!item.all&&(!Number.isInteger(moveIndex)||moveIndex<0||moveIndex>=max.length))return false;const next=old.map((v,i)=>(item.all||i===moveIndex)?Math.min(max[i],v+item.amount):v);if(next.every((v,i)=>v===old[i]))return false;p.pp=next;return true}
