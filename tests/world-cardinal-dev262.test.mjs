import test from 'node:test';import assert from 'node:assert/strict';import {maps,auditCardinalWorld} from '../src/maps.js';
test('Kardinale Welt dev.262',()=>{assert.equal(maps.professor_clearing.portals.find(p=>p.target==='village').x,15);});
