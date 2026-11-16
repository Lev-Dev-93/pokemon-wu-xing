import test from 'node:test';
import assert from 'node:assert/strict';
import {validatePortalCoordinates} from '../src/world-validation.js';
test('dev.345 portal coordinates',()=>{assert.deepEqual(validatePortalCoordinates({a:{w:4,h:4,portals:[{x:1,y:2,tx:0,ty:0}]}}),[]);assert.equal(validatePortalCoordinates({a:{w:4,h:4,portals:[{x:4,y:1,tx:0,ty:0}]}}).length,1);});
