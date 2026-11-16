import {maps,canMove} from './maps.js';
import {findStoryWalk,storyWalkIsAdjacent} from './story-autowalk.js';
// dev.370–374: feste Grasfläche außerhalb der Wege, Häuser und Portale.
export const TUTORIAL_GRASS=Object.freeze([[6,10],[7,10],[8,10],[6,11],[7,11],[8,11]]);
export const TUTORIAL_PLAYER_TARGET=Object.freeze([7,9]);
export const TUTORIAL_PROFESSOR_TARGET=Object.freeze([8,9]);
export function validateTutorialGrass(map=maps.professor_clearing){return TUTORIAL_GRASS.every(([x,y])=>x>=0&&y>=0&&x<map.w&&y<map.h&&!map.walls.has(`${x},${y}`)&&!map.portals.some(p=>p.x===x&&p.y===y));}
export function professorWalkPlan(mapId,x,y){
 const from=[x,y];const segments=[];
 if(mapId==='study'){
  const indoor=findStoryWalk('study',from,[5,6]);if(!indoor||!storyWalkIsAdjacent(from,indoor))return null;
  segments.push(...indoor.map(([x,y])=>({mapId:'study',x,y})));
  segments.push({mapId:'professor_clearing',x:4,y:5});
 }else if(mapId!=='professor_clearing')return null;
 const start=mapId==='study'?[4,5]:from;
 const outdoor=findStoryWalk('professor_clearing',start,TUTORIAL_PLAYER_TARGET);
 if(!outdoor||!storyWalkIsAdjacent(start,outdoor)||!validateTutorialGrass())return null;
 segments.push(...outdoor.map(([x,y])=>({mapId:'professor_clearing',x,y})));
 return segments;
}
export const TUTORIAL_BEATS=Object.freeze(['discovery','rarity','battle','attack','weakening','capture','success']);
