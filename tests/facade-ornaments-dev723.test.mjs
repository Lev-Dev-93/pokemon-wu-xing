import test from 'node:test';
import assert from 'node:assert/strict';
import {facadeOrnaments} from '../src/facade-ornaments.js';
test('invalid dimensions cannot generate facade pixels',()=>{assert.deepEqual(facadeOrnaments({x:0,y:0,w:0,h:2}),[])});
test('ornaments remain strictly within building footprint',()=>{for(const b of [{x:2,y:3,w:5,h:3},{x:0,y:0,w:1,h:1},{x:10,y:5,w:3,h:2,label:'Labor'}])for(const p of facadeOrnaments(b)){assert.ok(p.x>=b.x*32&&p.y>=b.y*32);assert.ok(p.x+p.w<=(b.x+b.w)*32&&p.y+p.h<=(b.y+b.h)*32)}});
test('same building produces deterministic ornaments',()=>{const b={x:2,y:3,w:5,h:3};assert.deepEqual(facadeOrnaments(b),facadeOrnaments(b))});
test('different building styles produce different ornament colors',()=>{assert.notDeepEqual(facadeOrnaments({x:1,y:2,w:3,h:2,label:'Labor'}),facadeOrnaments({x:1,y:2,w:3,h:2,label:'Haus'}))});
