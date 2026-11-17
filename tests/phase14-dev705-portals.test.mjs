import test from 'node:test';
import assert from 'node:assert/strict';
import {Engine} from '../src/engine.js';
import {maps,npcs,inside} from '../src/maps.js';

test('dev.705: every existing portal has a valid destination and source',()=>{
 const engine=new Engine();
 for(const map of Object.values(maps))for(const portal of map.portals){
  assert.equal(inside(map,portal.x,portal.y),true,`${map.id}: source outside`);
  assert.equal(map.walls.has(`${portal.x},${portal.y}`),false,`${map.id}: blocked source`);
  assert.equal(engine.validPortalDestination(portal),true,`${map.id} -> ${portal.target}: invalid arrival`);
 }
});
test('dev.705: blocked arrival never changes player position, steps, or return anchors',()=>{
 const engine=new Engine();const original=structuredClone(engine.state);
 const portal=maps.bedroom.portals[0];const dest=maps[portal.target];
 dest.walls.add(`${portal.tx},${portal.ty}`);
 try{
  engine.state.x=portal.x;engine.state.y=portal.y-1;
  const before=structuredClone(engine.state);
  assert.equal(engine.step('down'),false);
  assert.deepEqual(engine.state,before);
  assert.equal(engine.message,'Dieser Übergang ist derzeit blockiert.');
 }finally{dest.walls.delete(`${portal.tx},${portal.ty}`)}
 assert.equal(original.mapId,'bedroom');
});
test('dev.705: occupied destination blocks portal atomically',()=>{
 const engine=new Engine();const portal=maps.bedroom.portals[0];
 const occupants=npcs[portal.target];occupants.push({id:'test_guard',x:portal.tx,y:portal.ty});
 try{engine.state.x=portal.x;engine.state.y=portal.y-1;const before=structuredClone(engine.state);assert.equal(engine.step('down'),false);assert.deepEqual(engine.state,before);}finally{occupants.pop()}
});
test('dev.705: invalid coordinates are rejected before transition',()=>{
 const engine=new Engine();
 assert.equal(engine.validPortalDestination({target:'ground',tx:NaN,ty:2}),false);
 assert.equal(engine.validPortalDestination({target:'ground',tx:10.5,ty:2}),false);
 assert.equal(engine.validPortalDestination({target:'missing',tx:1,ty:1}),false);
});
