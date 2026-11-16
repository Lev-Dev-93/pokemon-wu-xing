import test from 'node:test';import assert from 'node:assert/strict';import {auditWalkablePortals} from '../src/world-integrity.js';
test('Portale besitzen Zugänge und Spawnpunkte einen Ausweg',()=>assert.deepEqual(auditWalkablePortals(),[]));
