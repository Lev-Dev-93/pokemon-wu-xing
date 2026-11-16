import test from 'node:test';
import assert from 'node:assert/strict';
import {FOREST_STORY_BATTLE as b} from '../src/forest-story-battle.js';
test('Waldkampf ist nicht konfiguriert',()=>{assert.equal(b.status,'unconfigured');assert.equal(b.opponent,null);assert.equal(b.team,null);assert.equal(b.trigger,'manual_story_approval')});
