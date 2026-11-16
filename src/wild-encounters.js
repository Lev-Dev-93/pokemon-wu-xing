import {createPokemon} from './team.js';
// Vorläufige Mu-Route-1-Begegnungstabelle; endgültige Ökologie folgt beim Weltdesign.
export const ROUTE1_ENCOUNTERS=Object.freeze([{speciesId:10,weight:35},{speciesId:13,weight:25},{speciesId:16,weight:25},{speciesId:19,weight:15}]);
export const ROUTE2_ENCOUNTERS=Object.freeze([{speciesId:10,weight:20},{speciesId:13,weight:20},{speciesId:16,weight:20},{speciesId:43,weight:20},{speciesId:69,weight:20}]);
export const ENCOUNTER_CHANCE=0.18;
export function isTallGrass(x,y){return (x>=2&&x<=5&&y>=4&&y<=10)||(x>=10&&x<=13&&y>=5&&y<=13);}
function roll(rng){const n=rng();if(!Number.isFinite(n)||n<0||n>=1)throw Error('Ungültiger Zufallswert');return n;}
export function chooseWildPokemon(rng=Math.random,table=ROUTE1_ENCOUNTERS,minLevel=2){const value=roll(rng)*100;let cumulative=0;for(const entry of table){cumulative+=entry.weight;if(value<cumulative)return createPokemon(entry.speciesId,{level:minLevel+Math.floor(roll(rng)*3),ivs:Array.from({length:6},()=>Math.floor(roll(rng)*32)),abilityId:null});}throw Error('Ungültige Begegnungstabelle');}
export function rollEncounter({mapId,x,y,hatched,hasUsablePokemon,rng=Math.random}){if(!['route1','route2'].includes(mapId)||!hatched||!hasUsablePokemon||!isTallGrass(x,y))return null;if(roll(rng)>=ENCOUNTER_CHANCE)return null;return chooseWildPokemon(rng,mapId==='route2'?ROUTE2_ENCOUNTERS:ROUTE1_ENCOUNTERS,mapId==='route2'?4:2);}
export function escapeChance(playerSpeed,enemySpeed,attempts){if(!Number.isFinite(playerSpeed)||!Number.isFinite(enemySpeed)||enemySpeed<=0||!Number.isSafeInteger(attempts)||attempts<0)throw Error('Ungültige Fluchtdaten');return Math.min(1,Math.max(0,(playerSpeed*32/Math.max(1,Math.floor(enemySpeed/4))+30*attempts)/256));}
export function tryEscape(playerSpeed,enemySpeed,attempts,rng=Math.random){return roll(rng)<escapeChance(playerSpeed,enemySpeed,attempts);}
