import test from 'node:test';
import assert from 'node:assert/strict';
import {prologuePhase} from '../src/story-sequence.js';
test('dev.340 story regression',()=>{assert.equal(prologuePhase(null,'ground'),'before-egg');assert.equal(prologuePhase([],'ground'),'before-egg');});
