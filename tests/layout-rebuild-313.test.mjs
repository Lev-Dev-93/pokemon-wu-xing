import test from 'node:test';import assert from 'node:assert/strict';
import {OUTDOOR_IDS,OUTDOOR_LAYOUT,isPlannedRoad,isPlaza} from '../src/path-geometry.js';
import {maps,outdoorBuildings} from '../src/maps.js';
import {walkwayCells} from '../src/route-layout.js';
import {isWildEncounterTerrain} from '../src/wild-encounters.js';
test('alle sieben Außenkarten verwenden ausschließlich definierte Wege',()=>{assert.equal(OUTDOOR_IDS.length,7);for(const id of OUTDOOR_IDS){const m=maps[id],{cells}=walkwayCells(m);for(let y=0;y<m.h;y++)for(let x=0;x<m.w;x++){const k=`${x},${y}`;if(isPlannedRoad(id,x,y))assert.ok(!m.walls.has(k),`${id} blockiert ${k}`);assert.equal(cells.has(k),isPlannedRoad(id,x,y),`${id} Wegabweichung ${k}`);}for(const p of m.portals)assert.ok(isPlannedRoad(id,p.x,p.y),`${id} Portal ${p.x},${p.y}`);}});
test('alle normalen Wegrechtecke sind zwei Kacheln breit',()=>{for(const [id,layout] of Object.entries(OUTDOOR_LAYOUT))for(const [x,y,w,h] of layout.roads)assert.ok(w===2||h===2,`${id} ${x},${y}: ${w}x${h}`);});
test('Dorfplätze sind frei und alle Wohnhäuser haben denselben Grundriss',()=>{for(const id of ['village','professor_clearing','beerendorf']){assert.ok(OUTDOOR_LAYOUT[id].plaza);const m=maps[id];for(let y=0;y<m.h;y++)for(let x=0;x<m.w;x++)if(isPlaza(id,x,y))assert.ok(!m.walls.has(`${x},${y}`));}const houses=[...outdoorBuildings.village,...outdoorBuildings.beerendorf].filter(h=>!['KAPELLE'].includes(h.label));assert.ok(houses.every(h=>h.w===3&&h.h===2));});
test('auf geplanten Wegen gibt es keine wilden Begegnungen',()=>{for(const id of ['route1','waldrand','route2']){const m=maps[id];for(let y=0;y<m.h;y++)for(let x=0;x<m.w;x++)if(isPlannedRoad(id,x,y))assert.equal(isWildEncounterTerrain(id,x,y),false);}});
