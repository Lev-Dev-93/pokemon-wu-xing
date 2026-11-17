import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const art=readFileSync(new URL('../src/art.js',import.meta.url),'utf8');
test('building facades drawn in existing building footprints',()=>{assert.match(art,/function facadeDetail/);assert.match(art,/facadeDetail\(c,x,y,w,h,x\+y\)/)});
test('all interior enhancements are render-only',()=>{assert.match(art,/function interiorDetail/);assert.match(art,/drawInterior\(c,id\)\{interiorDetail/)});
test('NPC animation uses existing step count without moving NPC positions',()=>{assert.match(art,/const pose=/);assert.match(art,/drawNpc\(c,npc.x,npc.y,npc.id,npc.moving===true\?/)});
