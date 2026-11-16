import test from 'node:test';import assert from 'node:assert/strict';
import {npcs,objects,maps} from '../src/maps.js';
test('keine neuen Sammelobjekte oder versteckten Fundstellen',()=>{
 const allowed=new Set(['bed','pokemon_pc']);
 assert.deepEqual([...new Set(Object.values(objects).flat().map(o=>o.id))].sort(),[...allowed].sort());
});
test('NPC-Bestand beschränkt sich auf Story und funktionale Rollen',()=>{
 const allowed=new Set(['forest_elder','route1_trainer','breeder_a','breeder_b','resident','merchant','rival','professor']);
 for(const npc of Object.values(npcs).flat())assert.ok(allowed.has(npc.id),npc.id);
});
