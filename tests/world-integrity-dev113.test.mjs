import test from 'node:test';import assert from 'node:assert/strict';
import {maps} from '../src/maps.js';import {auditWorld,reachableMaps} from '../src/world-integrity.js';
test('alle Portale, Spawnpunkte und NPCs sind strukturell gültig',()=>assert.deepEqual(auditWorld(),[]));
test('alle Karten sind vom Schlafzimmer aus erreichbar',()=>assert.deepEqual([...reachableMaps()].sort(),Object.keys(maps).sort()));
