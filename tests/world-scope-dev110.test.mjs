import test from 'node:test';
import assert from 'node:assert/strict';
import {maps,npcs,objects} from '../src/maps.js';
test('Scope dev.110',()=>{assert.deepEqual(npcs.beerendorf.map(n=>n.id),['berry_walker']);assert.deepEqual(npcs.waldrand,[]);assert.deepEqual(npcs.brook,[]);assert.deepEqual(npcs.route2.map(n=>n.id),[]);assert.deepEqual(npcs.forest_elder_house.map(n=>n.id),['forest_elder']);});
