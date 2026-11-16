import test from 'node:test';import assert from 'node:assert/strict';
import {maps,outdoorBuildings,auditBuildingApproaches} from '../src/maps.js';
test('Forschungsplatz: Gebäude und Wege sind geordnet',()=>{assert.equal(auditBuildingApproaches().length,0);assert.equal(outdoorBuildings.professor_clearing[0].x,4);for(const p of maps.professor_clearing.portals)assert.ok(!maps.professor_clearing.walls.has(`${p.x},${p.y}`));});
