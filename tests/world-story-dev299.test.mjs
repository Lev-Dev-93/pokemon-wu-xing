import test from 'node:test';import assert from 'node:assert/strict';
import {maps,outdoorBuildings,isBerryVillagePath,auditBuildingApproaches} from '../src/maps.js';
test('Beerendorf: Ost-West-Weg und vier Hausanschlüsse',()=>{assert.equal(auditBuildingApproaches().length,0);for(let x=0;x<16;x++)assert.ok(isBerryVillagePath(x,7)&&!maps.beerendorf.walls.has(`${x},7`));assert.equal(outdoorBuildings.beerendorf[0].x,3);});
