import test from 'node:test';
import assert from 'node:assert/strict';
import {validateRiftItinerary} from '../src/story-itinerary.js';
test('dev.343 story regression',()=>{assert.equal(validateRiftItinerary([{kind:'step',mapId:'ground',x:5.5,y:8}],'ground',[5,7]),false);assert.equal(validateRiftItinerary([], 'ground',[5]),false);});
