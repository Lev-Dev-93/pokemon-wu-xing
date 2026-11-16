import test from 'node:test';import assert from 'node:assert/strict';import {findStoryWalk} from '../src/story-autowalk.js';
test('Autoweg vom Ziel zu sich selbst ist leer',()=>{assert.deepEqual(findStoryWalk('ground',[6,3],[6,3]),[])});
test('Unbekannte Karten und Ziele liefern keinen Pfad',()=>{assert.equal(findStoryWalk('unknown',[0,0],[1,1]),null);assert.equal(findStoryWalk('ground',[-1,0],[6,3]),null)});
