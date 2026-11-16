import test from 'node:test';
import assert from 'node:assert/strict';
import {ambientFrame,ambientDetails,ambientAudit,AMBIENT_SCENES} from '../src/living-world.js';
import {maps as MAPS} from '../src/maps.js';
test('animation advances deterministically',()=>{assert.equal(ambientFrame(0),0);assert.equal(ambientFrame(320),1);assert.equal(ambientFrame(2560),0)});
test('reduced motion stops environmental animation',()=>assert.equal(ambientFrame(1600,true),0));
test('ambient details are deterministic',()=>{const m=Object.values(MAPS).find(x=>x.id==='route1');assert.deepEqual(ambientDetails(m,3),ambientDetails(m,3))});
test('decorations never occupy walls or portals',()=>{for(const m of Object.values(MAPS))if(AMBIENT_SCENES.includes(m.id))assert.ok(ambientAudit(m),m.id)});
test('unsupported areas are not modified',()=>assert.deepEqual(ambientDetails({id:'unknown',h:4,w:4}),[]));
