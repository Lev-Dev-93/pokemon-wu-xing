import {canMove} from './maps.js';
import {objects} from './maps.js';
// All movement is opt-in. The simulation clock counts successful player steps,
// so saves and tests never depend on the user's wall clock.
const DIRECTIONS=Object.freeze({up:[0,-1],right:[1,0],down:[0,1],left:[-1,0]});
const key=(x,y)=>`${x},${y}`;
export function npcScheduleAt(actor,turn){
 if(!Number.isSafeInteger(turn)||turn<0)return null;
 const schedule=actor?.schedule;
 if(!Array.isArray(schedule)||!schedule.length)return null;
 const cycle=Number.isSafeInteger(actor.scheduleCycle)&&actor.scheduleCycle>0?actor.scheduleCycle:24;
 const phase=turn%cycle;
 return schedule.find(entry=>entry&&Number.isInteger(entry.from)&&Number.isInteger(entry.to)&&entry.from>=0&&entry.from<entry.to&&entry.to<=cycle&&phase>=entry.from&&phase<entry.to)??null;
}
export function validateNpcSchedule(actor){
 if(!Array.isArray(actor?.schedule)||!actor.schedule.length)return false;
 const cycle=actor.scheduleCycle??24;
 if(!Number.isSafeInteger(cycle)||cycle<1||cycle>100000)return false;
 const intervals=[];
 for(const entry of actor.schedule){
  if(!entry||!Number.isInteger(entry.from)||!Number.isInteger(entry.to)||entry.from<0||entry.from>=entry.to||entry.to>cycle||!['idle','patrol'].includes(entry.activity))return false;
  if(entry.activity==='patrol'&&(!Array.isArray(entry.path)||!entry.path.length||!entry.path.every(dir=>Object.hasOwn(DIRECTIONS,dir))))return false;
  if(intervals.some(([a,b])=>entry.from<b&&a<entry.to))return false;
  intervals.push([entry.from,entry.to]);
 }
 return true;
}
export function advanceNpcPatrol(map,actors,player,turn=0){
 if(!map||!Array.isArray(actors)||!Number.isSafeInteger(turn)||turn<0)return actors;
 const occupied=new Set(actors.map(a=>key(a.x,a.y)));
 const forbidden=new Set([...(map.portals||[]).map(p=>key(p.x,p.y)),...(map.landscapeArrivalCells||[]),...(objects[map.id]||[]).map(o=>key(o.x,o.y))]);
 if(Number.isInteger(player?.x)&&Number.isInteger(player?.y))forbidden.add(key(player.x,player.y));
 return actors.map(actor=>{
  if(!actor||!Number.isInteger(actor.x)||!Number.isInteger(actor.y))return actor;
  let path=actor.patrol,phase=turn;
  if(actor.schedule!==undefined){
   if(!validateNpcSchedule(actor))return actor;
   const entry=npcScheduleAt(actor,turn);
   if(!entry||entry.activity!=='patrol')return actor;
   path=entry.path;
   phase=turn% (actor.scheduleCycle??24)-entry.from;
  }
  if(!Array.isArray(path)||!path.length)return actor;
  const cadence=actor.patrolEvery??1;
  if(!Number.isSafeInteger(cadence)||cadence<1||cadence>100000||phase%cadence!==0)return actor;
  const direction=path[Math.floor(phase/cadence)%path.length],delta=DIRECTIONS[direction];
  if(!delta)return actor;
  const nx=actor.x+delta[0],ny=actor.y+delta[1],target=key(nx,ny);
  if(occupied.has(target)||forbidden.has(target)||!canMove(map,actor.x,actor.y,nx,ny))return actor;
  occupied.delete(key(actor.x,actor.y));occupied.add(target);
  return {...actor,x:nx,y:ny,facing:direction};
 });
}
