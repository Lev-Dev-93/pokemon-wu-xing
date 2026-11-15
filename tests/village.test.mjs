import test from 'node:test';
import assert from 'node:assert/strict';
import {Engine} from '../src/engine.js';
import {maps,npcs} from '../src/maps.js';

test('Züchterhof führt ins Dorf und zurück ohne Softlock',()=>{
 const e=new Engine();e.state.mapId='yard';e.state.x=7;e.state.y=10;e.state.elevation=0;
 assert.equal(e.step('down'),true);assert.equal(e.state.mapId,'village');assert.deepEqual([e.state.x,e.state.y],[10,1]);
 assert.equal(e.state.flags.visitedVillage,true);assert.equal(e.step('up'),true);
 assert.equal(e.state.mapId,'yard');assert.deepEqual([e.state.x,e.state.y],[7,10]);
});
test('Dorf-Portal und Spawn sind begehbar und NPC-frei',()=>{
 const m=maps.village;assert.equal(m.portals.length,4);
 assert.equal(m.walls.has('10,1'),false);assert.equal(m.walls.has('10,0'),false);
 assert.equal(npcs.village.some(n=>n.x===10&&n.y===1),false);
});
test('Dorfbewohnerin, Kindheitsfreund und Professor sind ansprechbar und speichern Flags',()=>{
 for(const [id,flag] of [['villager','spokenToVillager'],['rival','spokenToRival'],['professor','spokenToProfessor']]){
  const n=npcs.village.find(n=>n.id===id);const e=new Engine();e.state.mapId='village';e.state.x=n.x;e.state.y=n.y+1;e.state.facing='up';
  assert.equal(e.interact(),true);assert.equal(e.mode,'dialogue');
  while(e.mode==='dialogue')e.interact();assert.equal(e.state.flags[flag],true);
  const restored=new Engine();restored.load(e.save());assert.equal(restored.state.flags[flag],true);
 }
});
test('Alte Spielstände ergänzen neue Dorf-Flags',()=>{
 const e=new Engine();const d=JSON.parse(e.save());for(const k of ['visitedVillage','spokenToVillager','spokenToRival','spokenToProfessor'])delete d.state.flags[k];
 const restored=new Engine();restored.load(JSON.stringify(d));assert.equal(restored.state.flags.visitedVillage,false);
});
test('Dorfbesuch löst keine späteren kanonischen Ereignisse aus',()=>{
 const e=new Engine();e.state.mapId='yard';e.state.x=7;e.state.y=10;e.step('down');
 for(const k of ['rift_closed','rival_absol','professor_demo','route1_hatched'])assert.equal(e.state.flags[k],false);
 assert.equal(e.state.starterEgg,null);
});
