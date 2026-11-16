import test from 'node:test';
import assert from 'node:assert/strict';
import {maps,buildingCells,outdoorBuildings,auditOutdoorLayout} from '../src/maps.js';
test('Alle Außengebäude besitzen blockierende Grundflächen',()=>{for(const id of ['village','beerendorf'])for(const [x,y] of buildingCells(id))assert.ok(maps[id].walls.has(`${x},${y}`),`${id}: ${x},${y}`)});
test('Alle Außenportale sind frei und von Nachbarfeldern erreichbar',()=>assert.deepEqual(auditOutdoorLayout(),[]));
test('Keine Gebäudefläche liegt auf dem zentralen Durchgang',()=>{for(const id of ['village','beerendorf'])for(const [x,y] of buildingCells(id))assert.ok(x!==10||y!==14,`${id}: Hauptweg blockiert`)});
test('Alle Gebäuderechtecke liegen innerhalb ihrer Karte',()=>{for(const [id,buildings] of Object.entries(outdoorBuildings))for(const b of buildings)assert.ok(b.x>=0&&b.y>=0&&b.x+b.w<=maps[id].w&&b.y+b.h<=maps[id].h)});
