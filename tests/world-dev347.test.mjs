import test from 'node:test';
import assert from 'node:assert/strict';
import {validateReciprocalPortals} from '../src/world-validation.js';
test('dev.347 portal return routes',()=>{const w={a:{portals:[{target:'b'}]},b:{portals:[]}};assert.equal(validateReciprocalPortals(w).length,1);w.b.portals.push({target:'a'});assert.deepEqual(validateReciprocalPortals(w),[]);});
