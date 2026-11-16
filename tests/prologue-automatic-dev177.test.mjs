import test from 'node:test';
import assert from 'node:assert/strict';
import {Engine} from '../src/engine.js';
import {maps,npcs,outdoorBuildings,isVillagePath} from '../src/maps.js';
import {findStoryWalk,STORY_WALK_TARGETS as T} from '../src/story-autowalk.js';
test('Professorenhaus liegt nicht auf Wegen, Eingang frei',()=>{
 const house=outdoorBuildings.professor_clearing.find(b=>b.label==='PROF.');assert.ok(house);
 for(let y=house.y;y<house.y+house.h;y++)for(let x=house.x;x<house.x+house.w;x++)assert.equal(maps.professor_clearing.walls.has(`${x},${y}`),true);
 const door=maps.professor_clearing.portals.find(p=>p.target==='professor_house');assert.deepEqual([door.x,door.y],[11,4]);assert.equal(maps.professor_clearing.walls.has('11,4'),false);
});
test('Marktstand verdeckt kein Wohnhaus und Händler ist erreichbar',()=>{
 const home=outdoorBuildings.village.find(b=>b.x===17&&b.y===6);
 assert.ok(home);const merchant=npcs.village.find(n=>n.id==='merchant');assert.deepEqual([merchant.x,merchant.y],[15,11]);
 assert.ok(findStoryWalk('village',[10,7],[15,12]));
});
test('Alle automatischen Fußwege sind kollisionsfrei und zusammenhängend',()=>{
 for(const [map,from,to] of [['village',[11,7],T.rival],['village',T.rival,T.villageExit],['yard',[7,10],T.yardExit],['ground',[5,7],T.parents]]){
  const route=findStoryWalk(map,from,to);assert.ok(route?.length);let previous=from;
  for(const at of route){assert.equal(Math.abs(at[0]-previous[0])+Math.abs(at[1]-previous[1]),1);assert.equal(maps[map].walls.has(at.join(',')),false);assert.ok(!(npcs[map]||[]).some(n=>n.x===at[0]&&n.y===at[1]));previous=at;}
  assert.deepEqual(previous,to);
 }
});
test('Elternbericht erteilt Professor-Hinweis und wird nur einmal abgeschlossen',()=>{
 const e=new Engine();e.state.flags.egg_received=true;e.state.flags.rift_closed=true;e.state.flags.rival_absol=true;
 e.state.mapId='ground';e.state.x=6;e.state.y=3;
 assert.equal(e.beginParentsReport(),true);assert.match(e.dialogue.pages.join(' '),/Professor/);
 while(e.mode==='dialogue')e.advanceDialogue();assert.equal(e.state.flags.parents_briefed,true);assert.equal(e.lastEvent,'parentsReportFinished');assert.equal(e.beginParentsReport(),false);
});
