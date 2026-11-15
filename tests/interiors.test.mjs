import test from 'node:test';
import assert from 'node:assert/strict';
import {Engine} from '../src/engine.js';
import {maps,npcs} from '../src/maps.js';
for(const [x,y,target,spawn,flag] of [[6,3,'village_home',[5,6],'visitedVillageHome'],[19,3,'study',[5,6],'visitedStudy']]){
 test(`Dorfgebäude ${target}: Eingang, Rückweg und Speicherstand`,()=>{
  const e=new Engine();e.state.mapId='village';e.state.x=x;e.state.y=y+1;e.state.facing='up';
  assert.equal(e.step('up'),true);assert.equal(e.state.mapId,target);assert.deepEqual([e.state.x,e.state.y],spawn);assert.equal(e.state.flags[flag],true);
  const restored=new Engine();restored.load(e.save());assert.equal(restored.state.mapId,target);
  restored.state.y=6;assert.equal(restored.step('down'),true);assert.equal(restored.state.mapId,'village');assert.deepEqual([restored.state.x,restored.state.y],[x,y+1]);
 });
}
test('Hausbewohner ist ansprechbar und sein Fortschritt speicherbar',()=>{const e=new Engine();e.state.mapId='village_home';e.state.x=7;e.state.y=4;e.state.facing='up';assert.equal(e.interact(),true);while(e.mode==='dialogue')e.interact();assert.equal(e.state.flags.spokenToResident,true);const r=new Engine();r.load(e.save());assert.equal(r.state.flags.spokenToResident,true)});
test('Professor und Rivale sprechen nach dem Ei anders, ohne Storyflags auszulösen',()=>{const e=new Engine();e.state.flags.egg_received=true;for(const id of ['professor','rival']){const n=npcs.village.find(n=>n.id===id);assert.match(e.dialogueFor(n).join(' '),/Ei/)}assert.equal(e.state.flags.rift_closed,false);assert.equal(e.state.flags.rival_absol,false);assert.equal(e.state.flags.professor_demo,false)});
test('Alle Innenraum-Portale landen auf freien Feldern',()=>{for(const m of Object.values(maps))for(const portal of m.portals){const d=maps[portal.target];assert.ok(d);assert.equal(d.walls.has(`${portal.tx},${portal.ty}`),false);assert.equal((npcs[d.id]||[]).some(n=>n.x===portal.tx&&n.y===portal.ty),false)}});
