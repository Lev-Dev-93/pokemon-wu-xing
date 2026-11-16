import test from 'node:test';
import assert from 'node:assert/strict';
import {sameWorldPosition,battleExitPermitted} from '../src/battle-return.js';
test('339: Kartenposition und Kampfabschluss verlangen gültige Werte',()=>{assert.equal(sameWorldPosition({mapId:'mu',x:NaN,y:1},{mapId:'mu',x:NaN,y:1}),false);assert.equal(battleExitPermitted({finished:true,pending:NaN}),false);});
