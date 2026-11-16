import test from 'node:test';
import assert from 'node:assert/strict';
import {prologueRecoveryAction} from '../src/story-sequence.js';
test('dev.341 story regression',()=>{assert.equal(prologueRecoveryAction({egg_received:true},null),'none');assert.equal(prologueRecoveryAction({egg_received:true},''),'none');});
