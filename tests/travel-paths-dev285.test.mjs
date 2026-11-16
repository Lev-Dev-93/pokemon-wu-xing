import test from 'node:test';
import assert from 'node:assert/strict';
import {maps} from '../src/maps.js';
import {isTravelPath,terrainEdgeMask} from '../src/landscape.js';
test('Route 1: beide Seitenportale haben sichtbare Wege',()=>{for(const p of maps.route1.portals.filter(p=>p.kind==='path'))assert.equal(isTravelPath('route1',p.x,p.y),true)});
test('Bach: Westportal, Brücke und Südausgang verbunden',()=>{for(const [x,y] of [[0,6],[7,6],[7,7],[7,8],[7,9],[7,15]])assert.equal(isTravelPath('brook',x,y),true)});
test('Waldrand: Nordportal und Ostausgang auf Weg',()=>{for(const [x,y] of [[7,0],[7,7],[7,8],[15,8]])assert.equal(isTravelPath('waldrand',x,y),true)});
test('Hindernisse bekommen keine Wegkanten',()=>{for(const id of ['route1','brook','waldrand']){const m=maps[id];for(const k of m.walls){const [x,y]=k.split(',').map(Number);assert.equal(terrainEdgeMask(m,x,y),0)}}});
test('Sichtbare Wege haben freien Portaleintritt',()=>{for(const id of ['route1','brook','waldrand'])for(const p of maps[id].portals.filter(p=>p.kind==='path'))assert.equal(maps[id].walls.has(`${p.x},${p.y}`),false)});
