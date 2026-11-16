import test from 'node:test';import assert from 'node:assert/strict';import {findStoryWalk,storyWalkIsAdjacent} from '../src/story-autowalk.js';
test('Ungültige Pfade werden vor Bewegung verworfen',()=>{assert.equal(storyWalkIsAdjacent([0,0],null),false);assert.equal(storyWalkIsAdjacent([0,0],[[0,1],[0,3]]),false)});
test('Leerer Weg am bereits erreichten Ziel ist gültig',()=>{assert.equal(storyWalkIsAdjacent([1,1],[]),true)});
