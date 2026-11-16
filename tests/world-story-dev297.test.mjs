import test from 'node:test';import assert from 'node:assert/strict';
import {maps,outdoorBuildings,isVillagePath,auditBuildingApproaches} from '../src/maps.js';
test('Mu: Häuser stehen an Nebenwegen und zentrale Achse bleibt frei',()=>{assert.equal(auditBuildingApproaches().length,0);for(let x=0;x<22;x++)assert.ok(isVillagePath(x,7));assert.ok(outdoorBuildings.village.some(h=>h.x===4&&h.y===5));assert.ok(!maps.village.walls.has('10,7'));});
