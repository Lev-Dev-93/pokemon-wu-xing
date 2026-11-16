import test from 'node:test';
import assert from 'node:assert/strict';
import {maps,npcs,objects,canMove} from '../src/maps.js';
import {Engine} from '../src/engine.js';
import {createPokemon} from '../src/team.js';

const interiors=['chapel','rival_house','village_home','village_house_east'];
test('Startdorf hat vier Gebäude nach Marktstand-Umbau mit jeweils einem Rückweg',()=>{
 const doors=maps.village.portals.filter(p=>interiors.includes(p.target));
 assert.equal(doors.length,4);
 assert.deepEqual(new Set(doors.map(p=>p.target)),new Set(interiors));
 for(const door of doors){
  assert.equal(maps.village.walls.has(`${door.x},${door.y}`),false);
  assert.ok(canMove(maps.village,door.x,door.y+1,door.x,door.y));
  assert.ok(maps[door.target].portals.some(p=>p.target==='village'));
 }
});
test('Brunnen steht auf gesperrten Kacheln, aber der Storyweg bleibt frei',()=>{
 for(const x of [10,11])assert.equal(maps.village.walls.has(`${x},9`),true);
 for(const [x,y] of [[10,1],[10,3],[10,5],[10,7],[11,7]])assert.equal(maps.village.walls.has(`${x},${y}`),false);
});
test('Heilungs-NPC im Dorfhaus entfernt, Adoptivmutter heilt im eigenen Haus',()=>{
 assert.deepEqual(npcs.village_home,[]);
 const e=new Engine();e.state.mapId='ground';e.state.flags.route1_hatched=true;
 e.state.team=[createPokemon(1)];e.state.team[0].currentHp=1;
 e.state.x=6;e.state.y=3;e.state.facing='up';
 assert.equal(e.interact(),true);assert.equal(e.lastEvent,'stationHealed');
 assert.equal(e.state.team[0].currentHp,e.state.team[0].stats.hp);
});
test('PC befindet sich im Erdgeschoss der Zuchtfarm, nicht im Dorfhaus',()=>{
 assert.ok(objects.ground.some(o=>o.id==='pokemon_pc'));
 assert.ok(!objects.village_home.some(o=>o.id==='pokemon_pc'));
 const e=new Engine();e.state.mapId='ground';e.state.flags.route1_hatched=true;
 e.state.x=8;e.state.y=3;e.state.facing='up';
 assert.equal(e.interact(),true);assert.equal(e.lastEvent,'storageOpened');
 assert.equal(e.canAccessStorage(),true);
});
test('Markt bleibt funktional, Professor im Labor und Rivale auf dem Platz',()=>{
 assert.ok(npcs.village.some(n=>n.id==='merchant'));
 assert.ok(npcs.study.some(n=>n.id==='professor'));
 assert.ok(npcs.village.some(n=>n.id==='rival'));
 const e=new Engine();e.state.mapId='village';e.state.flags.route1_hatched=true;
 e.state.x=15;e.state.y=12;e.state.facing='up';
 assert.equal(e.interact(),true);assert.equal(e.lastEvent,'shopOpened');
});
