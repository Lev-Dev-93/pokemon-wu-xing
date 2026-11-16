import test from 'node:test';import assert from 'node:assert/strict';
import {auditWorld} from '../src/world-integrity.js';import {maps} from '../src/maps.js';
test('dev.366: fehlende Portalliste wird als Fehler gemeldet',()=>{const m=maps.bedroom,old=m.portals;try{m.portals=null;assert.ok(auditWorld().some(e=>e.includes('Portalliste fehlt')));}finally{m.portals=old;}assert.deepEqual(auditWorld(),[]);});
