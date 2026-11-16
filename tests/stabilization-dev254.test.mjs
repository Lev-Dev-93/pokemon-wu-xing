import test from 'node:test';import assert from 'node:assert/strict';import {findStoryWalk,storyWalkIsAdjacent,STORY_WALK_TARGETS} from '../src/story-autowalk.js';
test('Automatischer Weg zu den Eltern besteht nur aus Nachbarfeldern',()=>{const from=[5,7],path=findStoryWalk('ground',from,STORY_WALK_TARGETS.parents);assert.ok(path);assert.equal(storyWalkIsAdjacent(from,path),true)});
test('Sprünge in Storywegen werden erkannt',()=>assert.equal(storyWalkIsAdjacent([0,0],[[2,0]]),false));
