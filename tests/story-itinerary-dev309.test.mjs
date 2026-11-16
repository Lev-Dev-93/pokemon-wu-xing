import test from 'node:test';import assert from 'node:assert/strict';import {prologueRecoveryAction} from '../src/story-sequence.js';
test('Fortsetzen einer abgeschlossenen Elternszene startet keinen neuen Prologlauf',()=>assert.equal(prologueRecoveryAction({egg_received:true,rift_closed:true,rival_absol:true,parents_briefed:true},'ground'),'none'));
