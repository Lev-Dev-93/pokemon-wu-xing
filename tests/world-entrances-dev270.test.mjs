import test from 'node:test';
import assert from 'node:assert/strict';
import {auditBuildingApproaches,auditOutdoorLayout,auditCardinalWorld,maps,isBerryVillagePath} from '../src/maps.js';
test('Alle Außentüren haben sichtbaren freien Vorplatz',()=>assert.deepEqual(auditBuildingApproaches(),[]));
test('Geografie und Gebäudezugänge bleiben gültig',()=>{assert.deepEqual(auditOutdoorLayout(),[]);assert.deepEqual(auditCardinalWorld(),[])});
test('Beide südlichen Beerendorf-Häuser haben Weganschluss',()=>{assert.equal(isBerryVillagePath(3,14),true);assert.equal(isBerryVillagePath(12,14),true);assert.equal(maps.beerendorf.walls.has('3,14'),false);assert.equal(maps.beerendorf.walls.has('12,14'),false)});
