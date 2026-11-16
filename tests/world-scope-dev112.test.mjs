import test from 'node:test';
import assert from 'node:assert/strict';
import {maps,npcs,objects} from '../src/maps.js';
test('Scope dev.112',()=>{assert.ok(!Object.values(objects).flat().some(o=>/pickup|hidden|berry_item/i.test(o.id)));assert.ok(!Object.values(npcs).flat().some(n=>['villager','berry_guest','brook_artist','route1_guide'].includes(n.id)));});
