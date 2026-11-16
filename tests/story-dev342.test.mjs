import test from 'node:test';
import assert from 'node:assert/strict';
import {buildRiftItinerary} from '../src/story-itinerary.js';
test('dev.342 story regression',()=>{assert.equal(buildRiftItinerary('ground',[5]),null);assert.equal(buildRiftItinerary('ground',[5,7.5]),null);});
