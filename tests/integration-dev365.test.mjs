import test from 'node:test';import assert from 'node:assert/strict';
import {auditWorld} from '../src/world-integrity.js';import {maps} from '../src/maps.js';
test('dev.365: ungültige Portalpositionen werden erkannt',()=>{const portal=maps.bedroom.portals[0],old=portal.tx;try{portal.tx=1.5;assert.ok(auditWorld().some(e=>e.includes('ungültige Portaldaten')));}finally{portal.tx=old;}assert.deepEqual(auditWorld(),[]);});
