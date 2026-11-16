import test from 'node:test';import assert from 'node:assert/strict';
import {auditOrderedSettlementLayout,auditOutdoorLayout,auditBuildingApproaches} from '../src/maps.js';import {auditWalkwayNetwork} from '../src/route-layout.js';import {maps} from '../src/maps.js';
test('Alle drei Siedlungen: Türen, Häuser, Wege und Hindernisse sind konsistent',()=>{assert.deepEqual(auditOrderedSettlementLayout(),[]);assert.deepEqual(auditBuildingApproaches(),[]);assert.deepEqual(auditOutdoorLayout(),[]);assert.deepEqual(auditWalkwayNetwork(maps),[]);});
