import {test} from 'node:test';import {strict as assert} from 'node:assert';
import {applyEntryAbility} from '../src/battle-entry.js';
test('Ungültige Einwechsel-Seite',()=>assert.throws(()=>applyEntryAbility({},'other'),/Kampfseite/));
