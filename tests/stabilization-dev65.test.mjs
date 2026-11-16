import test from 'node:test';
import assert from 'node:assert/strict';
import {Engine} from '../src/engine.js';
import {maps,tileHeight} from '../src/maps.js';

function readyRoute(){const e=new Engine();e.state.flags.egg_received=true;e.state.flags.birthday_wish_pending=true;e.state.flags.rift_closed=true;e.state.flags.rival_absol=true;e.state.flags.professor_demo=true;e.state.flags.route1_hatched=true;e.state.flags.visitedRoute1=true;e.state.flags.visitedRoute2=true;e.state.starterWishSpeciesId=1;e.state.starterEgg={speciesId:1,received:true,hatched:true};return e;}
// Use a valid starter/team from existing game to avoid forging progression data.
test('Ungültige JSON-Daten überschreiben keinen bestehenden Spielstand',()=>{const e=new Engine();const before=e.save();assert.throws(()=>e.load('{kaputt'));assert.equal(e.save(),before)});
test('Ungültige Kartenposition überschreibt keinen bestehenden Spielstand',()=>{const e=new Engine();const before=e.save();const bad=JSON.parse(before);bad.state.x=-1;assert.throws(()=>e.load(JSON.stringify(bad)));assert.equal(e.save(),before)});
test('Manipulierte Rückkehrpositionen werden entfernt',()=>{const e=new Engine();const data=JSON.parse(e.save());data.state.returns={'bedroom->ground':{x:-200,y:99},'unknown->route1':{x:1,y:1},'bedroom->yard':{x:1,y:1},'bedroom->ground ':null};e.load(JSON.stringify(data));assert.deepEqual(e.state.returns,{})});
test('Gültige Rückkehrposition bleibt nach Laden erhalten',()=>{const e=new Engine();const data=JSON.parse(e.save());data.state.returns={'bedroom->ground':{x:5,y:7}};e.load(JSON.stringify(data));assert.deepEqual(e.state.returns['bedroom->ground'],{x:5,y:7})});
test('Waldpfad ohne Fortschrittsflag wird beim Laden abgewiesen',()=>{const e=new Engine();const data=JSON.parse(e.save());data.state.mapId='route2';data.state.x=7;data.state.y=1;data.state.elevation=tileHeight(maps.route2,7,1);assert.throws(()=>e.load(JSON.stringify(data)));});
test('Route 1 ohne Freigabe wird beim Laden abgewiesen',()=>{const e=new Engine();const data=JSON.parse(e.save());data.state.mapId='route1';data.state.x=7;data.state.y=1;data.state.elevation=tileHeight(maps.route1,7,1);assert.throws(()=>e.load(JSON.stringify(data)));});
