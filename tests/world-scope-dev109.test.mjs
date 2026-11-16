import test from 'node:test';
import assert from 'node:assert/strict';
import {maps,npcs,objects} from '../src/maps.js';
test('Scope dev.109',()=>{assert.ok(maps.village.portals.some(p=>p.target==='yard'));});
