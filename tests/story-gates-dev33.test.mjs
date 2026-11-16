import test from 'node:test';
import assert from 'node:assert/strict';
import {Engine} from '../src/engine.js';
import {maps,npcs,objects} from '../src/maps.js';
import {readFileSync} from 'node:fs';
test('Züchterhof vor Ei-Übergabe gesperrt',()=>{const e=new Engine();e.state.mapId='yard';e.state.x=7;e.state.y=10;assert.equal(e.step('down'),false);assert.equal(e.state.mapId,'yard');assert.match(e.message,/Ei/)});
test('Züchterhof nach Ei-Übergabe freigegeben',()=>{const e=new Engine();e.state.flags.egg_received=true;e.state.mapId='yard';e.state.x=7;e.state.y=10;assert.equal(e.step('down'),true);assert.equal(e.state.mapId,'village')});
test('Händler und Trainer besitzen unterscheidbare Grafiken und Schilder',()=>{const art=readFileSync(new URL('../src/art.js',import.meta.url),'utf8');for(const id of ['merchant','route1_trainer'])assert.match(art,new RegExp(id));for(const label of ['LADEN','TRAINER'])assert.ok(art.includes(label));assert.ok(npcs.market.some(n=>n.id==='merchant'));assert.ok(npcs.route1.some(n=>n.id==='route1_trainer'))});
test('Automatischer Lauf zum Dorfplatz und Dimensionsszene sind verbunden',()=>{const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');assert.match(main,/runToVillageSquare\(\)/);assert.match(main,/engine.beginRiftScene\(\)/);assert.match(main,/scriptedRun/)});
