import test from 'node:test';import assert from 'node:assert/strict';import {maps} from '../src/maps.js';
test('Kardinale Welt dev.259',()=>{assert.equal(maps.village.portals.some(p=>p.y===15),false);assert.equal(maps.village.walls.has('10,15'),true);});
