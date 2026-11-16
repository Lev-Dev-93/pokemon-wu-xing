import test from 'node:test';
import assert from 'node:assert/strict';
import {legalMoveIndices} from '../src/battle-actions.js';
test('335: ungültige AP dürfen keine Attacke freigeben',()=>{assert.deepEqual(legalMoveIndices({pokemon:{moves:[1,2,3,4]},pp:[NaN,Infinity,-1,2]}),[3]);});
