import test from 'node:test';
import assert from 'node:assert/strict';
import {validatePortalDestinations} from '../src/world-validation.js';
test('dev.346 portal targets',()=>{const w={a:{w:2,h:2,portals:[{x:1,y:0,target:'b',tx:1,ty:1}]},b:{w:2,h:2,walls:new Set(['1,1']),portals:[]}};assert.equal(validatePortalDestinations(w).length,1);w.b.walls.clear();assert.deepEqual(validatePortalDestinations(w),[]);});
