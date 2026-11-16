import test from 'node:test';import assert from 'node:assert/strict';
import {reachableMaps} from '../src/world-integrity.js';
test('dev.367: unbekannte Startkarten werden nicht als erreichbar gemeldet',()=>{assert.deepEqual([...reachableMaps('unbekannt')],[]);assert.ok(reachableMaps('bedroom').has('village'));});
