import test from 'node:test';import assert from 'node:assert/strict';
import {maps} from '../src/maps.js';
test('kanonische Gebietsfolge bleibt unverändert',()=>{
 const chain=['route1','brook','waldrand','beerendorf','route2'];
 for(let i=0;i<chain.length-1;i++){
 assert.ok(maps[chain[i]].portals.some(p=>p.target===chain[i+1]));
 assert.ok(maps[chain[i+1]].portals.some(p=>p.target===chain[i]));
 }
});
test('alle drei Gebäude in Beerendorf haben Rückwege',()=>{
 for(const id of ['beerendorf_werkstatt','beerendorf_haus','beerendorf_haus2']){
 assert.ok(maps.beerendorf.portals.some(p=>p.target===id));
 assert.ok(maps[id].portals.some(p=>p.target==='beerendorf'));
 }
});
