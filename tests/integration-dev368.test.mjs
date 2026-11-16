import test from 'node:test';import assert from 'node:assert/strict';
import {auditWorld} from '../src/world-integrity.js';import {npcs} from '../src/maps.js';
test('dev.368: doppelte NPC-Kennungen werden erkannt',()=>{const id=Object.keys(npcs).find(k=>npcs[k].length),list=npcs[id],npc={...list[0]};try{list.push(npc);assert.ok(auditWorld().some(e=>e.includes('doppelte NPC-ID')));}finally{list.pop();}assert.deepEqual(auditWorld(),[]);});
