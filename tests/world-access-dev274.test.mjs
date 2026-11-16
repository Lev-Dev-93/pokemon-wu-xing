import test from 'node:test';
import assert from 'node:assert/strict';
import {maps} from '../src/maps.js';
import {auditBuildingFootprints} from '../src/world-access-audit.js';
test('Kein Portal liegt auf Gebäudegrundriss',()=>assert.deepEqual(auditBuildingFootprints(),[]));
test('Unblockierter Gebäudegrundriss wird erkannt',()=>{const map={...maps.village,walls:new Set(maps.village.walls)};map.walls.delete('4,4');assert.match(auditBuildingFootprints({village:map},['village'])[0],/nicht blockiert/);});
