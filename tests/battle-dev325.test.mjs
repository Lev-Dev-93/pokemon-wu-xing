import {test} from 'node:test';import {strict as assert} from 'node:assert';
import {switchAllowed} from '../src/battle-switch-policy.js';
test('Kein freiwilliger Wechsel nach abgeschlossenem Kampf',()=>{assert.equal(switchAllowed({finished:true,winner:'player'},[{currentHp:0},{currentHp:12}],0,1),false)});
