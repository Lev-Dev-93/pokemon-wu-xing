import {test} from 'node:test';import {strict as assert} from 'node:assert';
import {availableSwitches} from '../src/battle-switch.js';
test('Leeres Team bietet keine Wechseloptionen',()=>assert.deepEqual(availableSwitches([],0),[]));
