import {test} from 'node:test';import {strict as assert} from 'node:assert';
import {forcedSwitchRequired} from '../src/battle-switch-policy.js';
test('Doppel-KO erlaubt erzwungenen Wechsel',()=>{const b={finished:true,winner:'draw',player:{pokemon:{currentHp:0}}};assert.equal(forcedSwitchRequired(b,[{currentHp:0},{currentHp:12,stats:{hp:20},speciesId:1}],0),false);});
