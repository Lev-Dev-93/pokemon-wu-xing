import test from 'node:test';import assert from 'node:assert/strict';
import {maps,isVillagePath,isProfessorClearingPath,isBerryVillagePath} from '../src/maps.js';
import {terrainKind} from '../src/landscape.js';
test('Alle sichtbaren Siedlungswege haben die gleiche Terrainklassifikation',()=>{for(const [id,fn] of [['village',isVillagePath],['professor_clearing',isProfessorClearingPath],['beerendorf',isBerryVillagePath]]){const m=maps[id];for(let y=0;y<m.h;y++)for(let x=0;x<m.w;x++)assert.equal(terrainKind(id,x,y)==='path',fn(x,y),`${id}:${x},${y}`)}});
