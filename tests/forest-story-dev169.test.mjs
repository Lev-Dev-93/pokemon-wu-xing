import test from 'node:test';
import assert from 'node:assert/strict';
import {forestEncounterReadiness as ready} from '../src/forest-story-battle.js';
test('Waldbegegnung erfordert Prolog, Hütte und Team',()=>{assert.equal(ready({mapId:'forest_elder_house',flags:{route1_hatched:false},team:[]}).ready,false);assert.equal(ready({mapId:'route2',flags:{route1_hatched:true},team:[{currentHp:1}]}).ready,false);assert.equal(ready({mapId:'forest_elder_house',flags:{route1_hatched:true},team:[{currentHp:1}]}).ready,true)});
