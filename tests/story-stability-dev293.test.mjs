import test from 'node:test';import assert from 'node:assert/strict';import {findStoryWalk,storyWalkIsAdjacent} from '../src/story-autowalk.js';import {maps} from '../src/maps.js';
test('Automatischer Weg darf keine unzulässige Höhenkante überschreiten',()=>{const m=maps.ground;const path=findStoryWalk('ground',[5,5],[5,6]);assert.ok(path);assert.ok(storyWalkIsAdjacent([5,5],path));});
