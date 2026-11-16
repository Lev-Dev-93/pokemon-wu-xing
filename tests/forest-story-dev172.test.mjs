import test from 'node:test';
import assert from 'node:assert/strict';
import {maps,auditStoryRouteAccess} from '../src/maps.js';
import {auditForestEncounterAccess} from '../src/forest-story-battle.js';
test('Waldhütte hat freien Ein- und Ausgang',()=>{assert.deepEqual(auditForestEncounterAccess(maps),[]);assert.deepEqual(auditStoryRouteAccess(),[])});
