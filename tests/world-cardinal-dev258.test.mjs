import test from 'node:test';import assert from 'node:assert/strict';import {maps} from '../src/maps.js';
test('Kardinale Welt dev.258',()=>{assert.ok(maps.professor_clearing.portals.some(p=>p.target==='study'));assert.ok(!maps.village.portals.some(p=>p.target==='study'));});
