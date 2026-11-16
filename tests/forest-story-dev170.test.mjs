import test from 'node:test';
import assert from 'node:assert/strict';
import {validateForestBattleDraft,forestBattleCanStart} from '../src/forest-story-battle.js';
test('Unbestimmte Kämpfe bleiben gesperrt',()=>{const s={mapId:'forest_elder_house',flags:{route1_hatched:true},team:[{currentHp:10}]};assert.equal(validateForestBattleDraft({}),false);assert.equal(forestBattleCanStart(s,null,true),false);assert.equal(forestBattleCanStart(s,{id:'forest_elder_future_battle',mapId:'forest_elder_house',npcId:'forest_elder',trigger:'approved_story_event',opponent:'Test',team:[{speciesId:1,level:5}],reward:0},false),false)});
