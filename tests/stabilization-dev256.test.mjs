import test from 'node:test';import assert from 'node:assert/strict';import {prologueRecoveryAction} from '../src/story-sequence.js';
test('Wiederaufnahme nach Erdbeben wählt Platzlauf oder Szene',()=>{assert.equal(prologueRecoveryAction({egg_received:true},'ground'),'rift-approach');assert.equal(prologueRecoveryAction({egg_received:true},'village'),'rift-scene')});
test('Nach Absol wird die Elternszene wiederaufgenommen',()=>assert.equal(prologueRecoveryAction({egg_received:true,rift_closed:true,rival_absol:true},'yard'),'to-parents'));
