import test from 'node:test';import assert from 'node:assert/strict';
import {auditGameIntegration} from '../src/integration-quality.js';import {maps} from '../src/maps.js';
test('dev.369: alle Karten, Portale und Storywege sind gemeinsam konsistent',()=>assert.deepEqual(auditGameIntegration(),[]));
test('dev.369: Integrationsprüfung erkennt entfernte Kartenverbindung',()=>{const m=maps.bedroom,old=m.portals;try{m.portals=[];assert.ok(auditGameIntegration().length>0);}finally{m.portals=old;}});
