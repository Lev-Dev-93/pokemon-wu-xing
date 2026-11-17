import test from 'node:test';
import assert from 'node:assert/strict';
import {maps,canMove,auditWorldHeights} from '../src/maps.js';
import {Engine} from '../src/engine.js';
test('Alle bestehenden Höhen und Treppen bestehen die Weltprüfung',()=>assert.deepEqual(auditWorldHeights(),[]));
test('Treppen erlauben nur direkte Nachbarn und genau eine Höhenstufe',()=>{
 const m={w:4,h:2,walls:new Set(),heights:{'1,0':1,'2,0':3},stairs:[[0,0],[1,0]]};
 assert.equal(canMove(m,0,0,1,0),true);
 assert.equal(canMove(m,1,0,2,0),false);
 assert.equal(canMove(m,0,0,2,0),false);
 assert.equal(canMove(m,-1,0,0,0),false);
 assert.equal(canMove(m,0,0,0,0),false);
});
test('Höhenprüfung meldet kaputte Treppen und ungültige Höhen',()=>{
 const m={w:2,h:2,walls:new Set(),heights:{'8,8':1},stairs:[[0,0],[0,0]]};
 assert.ok(auditWorldHeights({test:m}).length>=3);
});
test('Züchterhof: markierte Treppe überwindet Höhe, Seitenkante nicht',()=>{
 const e=new Engine();e.state.mapId='yard';e.state.x=7;e.state.y=8;e.state.elevation=0;
 assert.equal(e.step('right'),true);assert.deepEqual([e.state.x,e.state.y,e.state.elevation],[8,8,1]);
 e.state.x=8;e.state.y=7;e.state.elevation=0;
 assert.equal(e.step('down'),false);assert.deepEqual([e.state.x,e.state.y,e.state.elevation],[8,7,0]);
});
