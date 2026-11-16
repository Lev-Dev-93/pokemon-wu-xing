import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
const art=readFileSync(new URL('../src/art.js',import.meta.url),'utf8');const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('Bachwasser bleibt vor Kollisionsblockgrafik sichtbar',()=>assert.match(art,/map.id==='brook'\|\|map.id==='yard'/));
test('Waldrand und Alter Wald besitzen neue Baumgruppen',()=>{assert.match(art,/map.id==='waldrand'/);assert.match(art,/const clusters=/)});
test('Kampf wird in denselben Spielrahmen versetzt',()=>assert.match(main,/sharedGameFrame.append\(battlePanel\)/));
test('Vollbildschalter ist bedienbar',()=>{assert.match(html,/id="fullscreen-toggle"/);assert.match(main,/requestFullscreen\(\)/)});
