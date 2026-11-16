import test from 'node:test';
import assert from 'node:assert/strict';
import {Engine} from '../src/engine.js';
import {maps,npcs} from '../src/maps.js';
for(const [x,y,target,flag] of [[6,3,'study','visitedStudy'],[5,7,'village_home','visitedVillageHome'],[10,3,'professor_house',null],[19,3,'market',null],[20,7,'village_house_east',null],[5,11,'chapel',null],[19,11,'rival_house',null]]){
 test(`Dorfgebäude ${target}: Eingang, Rückweg und Speicherstand`,()=>{
  const e=new Engine();e.state.mapId='village';e.state.x=x;e.state.y=y+1;e.state.facing='up';
  assert.equal(e.step('up'),true);assert.equal(e.state.mapId,target);assert.deepEqual([e.state.x,e.state.y],[5,6]);
  if(flag)assert.equal(e.state.flags[flag],true);
  const restored=new Engine();restored.load(e.save());assert.equal(restored.state.mapId,target);
  restored.state.y=6;assert.equal(restored.step('down'),true);assert.equal(restored.state.mapId,'village');assert.deepEqual([restored.state.x,restored.state.y],[x,y+1]);
 });
}
test('Ehemaliger Heilungs-NPC und Pokémon-PC im Dorfhaus entfernt',()=>{const e=new Engine();assert.equal(npcs.village_home.length,0);assert.equal(e.state.flags.spokenToResident,false)});
test('Professor und Rivale sprechen nach dem Ei anders, ohne Storyflags auszulösen',()=>{const e=new Engine();e.state.flags.egg_received=true;for(const n of [npcs.study.find(n=>n.id==='professor'),npcs.village.find(n=>n.id==='rival')])assert.match(e.dialogueFor(n).join(' '),/Ei/);assert.equal(e.state.flags.rift_closed,false)});
test('Alle Innenraum-Portale landen auf freien Feldern',()=>{for(const m of Object.values(maps))for(const portal of m.portals){const d=maps[portal.target];assert.ok(d);assert.equal(d.walls.has(`${portal.tx},${portal.ty}`),false);assert.equal((npcs[d.id]||[]).some(n=>n.x===portal.tx&&n.y===portal.ty),false)}});
