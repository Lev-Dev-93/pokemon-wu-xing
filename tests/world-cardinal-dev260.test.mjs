import test from 'node:test';import assert from 'node:assert/strict';import {maps} from '../src/maps.js';
test('Kardinale Welt dev.260',()=>{assert.equal(maps.beerendorf.portals.find(p=>p.target==='route2').x,15);assert.equal(maps.route1.portals.find(p=>p.target==='brook').x,15);});
