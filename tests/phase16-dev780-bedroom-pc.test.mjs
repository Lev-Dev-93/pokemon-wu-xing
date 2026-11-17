import test from 'node:test';
import assert from 'node:assert/strict';
import {objects,maps} from '../src/maps.js';
import {DEFAULT_LAYOUT} from '../src/world-layout.js';
import {Engine} from '../src/engine.js';
import {inspectImportedLayout} from '../src/layout-runtime.js';

test('PC and its protected furniture belong to the bedroom, never the ground floor',()=>{
 assert.deepEqual(objects.bedroom.filter(o=>o.id==='pokemon_pc').map(o=>[o.x,o.y]),[[7,2]]);
 assert.equal(objects.ground.some(o=>o.id==='pokemon_pc'),false);
 assert.equal(DEFAULT_LAYOUT.bedroom.some(o=>o.id==='pokemon-pc'),true);
 assert.equal(DEFAULT_LAYOUT.ground.some(o=>o.id==='pokemon-pc'),false);
 assert.equal(maps.bedroom.walls.has('7,2'),true);
});
test('bedroom PC opens storage only after starter hatches',()=>{
 const e=new Engine();e.state.mapId='bedroom';e.state.x=6;e.state.y=2;e.state.facing='right';
 e.interact();assert.equal(e.canAccessStorage(),false);
 e.state.flags.route1_hatched=true;e.interact();assert.equal(e.lastEvent,'storageOpened');assert.equal(e.canAccessStorage(),true);
 e.state.mapId='ground';assert.equal(e.canAccessStorage(),false);
});
test('older saved layout with PC downstairs migrates upstairs',()=>{
 const legacy=JSON.parse(JSON.stringify(DEFAULT_LAYOUT));
 legacy.bedroom=legacy.bedroom.filter(o=>o.id!=='pokemon-pc');
 legacy.ground.push({id:'pokemon-pc',kind:'furniture',art:'pc',x:8,y:1,w:2,h:1});
 const result=inspectImportedLayout(JSON.stringify({schema:1,layout:legacy}));
 assert.equal(result.ok,true,result.errors?.join('; '));
 assert.equal(result.layout.bedroom.some(o=>o.id==='pokemon-pc'),true);
 assert.equal(result.layout.ground.some(o=>o.id==='pokemon-pc'),false);
});
