import test from 'node:test';
import assert from 'node:assert/strict';
import {maps} from '../src/maps.js';
import {ATMOSPHERE_MAPS,atmospherePlan,auditAtmosphere,drawMuAtmosphere} from '../src/mu-atmosphere.js';
test('375 Forschungsplatz: scenery excludes scripted tutorial grass and collision',()=>{
 const m=maps.professor_clearing;assert.deepEqual(auditAtmosphere(m),[]);
 assert.ok(atmospherePlan(m).length>0);
 assert.ok(atmospherePlan(m).every(p=>!(p.x>=6&&p.x<=8&&p.y>=9)));
});
test('376 Route 1: deterministic flowers and butterflies avoid road and portals',()=>{
 const m=maps.route1;assert.deepEqual(auditAtmosphere(m),[]);assert.deepEqual(atmospherePlan(m),atmospherePlan(m));assert.ok(atmospherePlan(m).some(p=>p.kind==='meadowBloom'));
});
test('377 Bach: river and bridge remain free of decorative objects',()=>{
 const m=maps.brook;assert.deepEqual(auditAtmosphere(m),[]);assert.ok(atmospherePlan(m).every(p=>p.y<6||p.y>10));
});
test('378 Beerendorf: decor respects unchanged building footprints',()=>{
 const m=maps.beerendorf;assert.deepEqual(auditAtmosphere(m),[]);assert.ok(atmospherePlan(m).length>0);
});
test('379 integration: visual-only drawing does not mutate maps or player state',()=>{
 const state={mapId:'route1',x:1,y:8};const before=JSON.stringify(state);
 const c={fillStyle:'',fillRect(){}};
 for(const id of ATMOSPHERE_MAPS){const m=maps[id],walls=[...m.walls].sort().join('|'),portals=JSON.stringify(m.portals);drawMuAtmosphere(c,m);assert.equal([...m.walls].sort().join('|'),walls);assert.equal(JSON.stringify(m.portals),portals);}
 assert.equal(JSON.stringify(state),before);
});
