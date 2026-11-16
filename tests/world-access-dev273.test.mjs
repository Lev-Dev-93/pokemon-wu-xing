import test from 'node:test';
import assert from 'node:assert/strict';
import {maps} from '../src/maps.js';
import {auditNpcApproaches} from '../src/world-access-audit.js';
test('Story- und Händler-NPCs sind von Eingängen ansprechbar',()=>assert.deepEqual(auditNpcApproaches(),[]));
test('Eingemauerter NPC wird erkannt',()=>{const m={id:'test',w:5,h:5,walls:new Set(['2,1','1,2','3,2','2,3']),heights:{},stairs:[],portals:[{x:0,y:0}]};assert.match(auditNpcApproaches({test:m},{test:[{id:'isolated',x:2,y:2}]},['test'])[0],/nicht ansprechbar/);});
