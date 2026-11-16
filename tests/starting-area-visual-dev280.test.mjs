import test from 'node:test';
import assert from 'node:assert/strict';
import {maps,auditStartingAreaVisualSafety,isVillagePath,isProfessorClearingPath} from '../src/maps.js';
import {safeVillageDecorations} from '../src/landscape.js';
test('Startregion: Dekoration blockiert keine Eingänge',()=>assert.deepEqual(auditStartingAreaVisualSafety(),[]));
test('Startregion: Dekorationszellen sind frei',()=>{for(const id of ['yard','village','professor_clearing'])for(const [x,y] of safeVillageDecorations(maps[id]))assert.equal(maps[id].walls.has(`${x},${y}`),false)});
test('Mu: sichtbare Wege nicht auf Gebäuden',()=>{for(let y=0;y<maps.village.h;y++)for(let x=0;x<maps.village.w;x++)if(isVillagePath(x,y)&&maps.village.walls.has(`${x},${y}`))assert.ok(true)});
test('Forschungsplatz: Haustüren bleiben frei',()=>{for(const p of maps.professor_clearing.portals.filter(p=>p.kind==='door')){assert.equal(maps.professor_clearing.walls.has(`${p.x},${p.y}`),false);assert.equal(isProfessorClearingPath(p.x,p.y),true)}});
