import {createPokemon} from './team.js';
// Vorläufige Mu-Route-1-Begegnungstabelle; endgültige Ökologie folgt beim Weltdesign.
export const ROUTE1_ENCOUNTERS=Object.freeze([{speciesId:10,weight:35},{speciesId:13,weight:25},{speciesId:16,weight:25},{speciesId:19,weight:15}]);
export const ROUTE2_ENCOUNTERS=Object.freeze([{speciesId:10,weight:20},{speciesId:13,weight:20},{speciesId:16,weight:20},{speciesId:43,weight:20},{speciesId:69,weight:20}]);
export const AREA_ENCOUNTERS=Object.freeze({
 route1:Object.freeze({day:ROUTE1_ENCOUNTERS,night:Object.freeze([{speciesId:10,weight:20},{speciesId:13,weight:20},{speciesId:16,weight:15},{speciesId:19,weight:25},{speciesId:41,weight:20}])}),
 waldrand:Object.freeze({day:ROUTE2_ENCOUNTERS,night:ROUTE2_ENCOUNTERS}),
 route2:Object.freeze({day:ROUTE2_ENCOUNTERS,night:Object.freeze([{speciesId:10,weight:15},{speciesId:13,weight:15},{speciesId:43,weight:20},{speciesId:69,weight:20},{speciesId:92,weight:30}])})
});
export function encounterTable(mapId,timeOfDay='day'){if(!['day','night'].includes(timeOfDay))throw Error('Ungültige Tageszeit');return AREA_ENCOUNTERS[mapId]?.[timeOfDay]??null;}
export const ENCOUNTER_CHANCE=0.18;
export function isTallGrass(x,y){return (x>=2&&x<=5&&y>=4&&y<=10)||(x>=10&&x<=13&&y>=5&&y<=13);}
function roll(rng){const n=rng();if(!Number.isFinite(n)||n<0||n>=1)throw Error('Ungültiger Zufallswert');return n;}
export function chooseWildPokemon(rng=Math.random,table=ROUTE1_ENCOUNTERS,minLevel=2){if(!Array.isArray(table)||!table.length||table.some(e=>!Number.isInteger(e.speciesId)||e.speciesId<1||e.speciesId>493||!Number.isFinite(e.weight)||e.weight<=0))throw Error('Ungültige Begegnungstabelle');const total=table.reduce((sum,e)=>sum+e.weight,0);const value=roll(rng)*total;let cumulative=0;for(const entry of table){cumulative+=entry.weight;if(value<cumulative)return createPokemon(entry.speciesId,{level:minLevel+Math.floor(roll(rng)*3),ivs:Array.from({length:6},()=>Math.floor(roll(rng)*32)),abilityId:null});}throw Error('Ungültige Begegnungstabelle');}
export function rollEncounter({mapId,x,y,hatched,hasUsablePokemon,rng=Math.random,timeOfDay='day'}){if(!encounterTable(mapId,timeOfDay)||!hatched||!hasUsablePokemon||!isTallGrass(x,y))return null;if(roll(rng)>=ENCOUNTER_CHANCE)return null;return chooseWildPokemon(rng,encounterTable(mapId,timeOfDay),mapId==='route2'?4:2);}
export function escapeChance(playerSpeed,enemySpeed,attempts){if(!Number.isFinite(playerSpeed)||!Number.isFinite(enemySpeed)||enemySpeed<=0||!Number.isSafeInteger(attempts)||attempts<0)throw Error('Ungültige Fluchtdaten');return Math.min(1,Math.max(0,(playerSpeed*32/Math.max(1,Math.floor(enemySpeed/4))+30*attempts)/256));}
export function tryEscape(playerSpeed,enemySpeed,attempts,rng=Math.random){return roll(rng)<escapeChance(playerSpeed,enemySpeed,attempts);}
