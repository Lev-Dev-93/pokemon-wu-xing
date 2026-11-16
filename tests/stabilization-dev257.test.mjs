import test from 'node:test';import assert from 'node:assert/strict';import {prologueRecoveryAction} from '../src/story-sequence.js';
test('Abgeschlossener Prolog löst keine automatische Szene aus',()=>assert.equal(prologueRecoveryAction({egg_received:true,rift_closed:true,rival_absol:true,parents_briefed:true},'ground'),'none'));
test('Elternbegrüßung erfolgt nur vor den ersten Gesprächen',()=>{assert.equal(prologueRecoveryAction({},'ground'),'birthday');assert.equal(prologueRecoveryAction({spokenToBreederA:true},'ground'),'none')});
