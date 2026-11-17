import test from 'node:test';
import assert from 'node:assert/strict';
import {startWalk,walkVisual,actorWalkFrame} from '../src/character-motion.js';
const a={mapId:'yard',x:2,y:2},b={mapId:'yard',x:3,y:2};
test('benachbarte Schritte werden visuell interpoliert',()=>{const m=startWalk(a,b,100);assert.equal(walkVisual(m,100,'yard').x,2);assert.equal(walkVisual(m,160,'yard').x,2.5);assert.equal(walkVisual(m,220,'yard'),null)});
test('Kartenwechsel und Teleports erzeugen keine Laufanimation',()=>{assert.equal(startWalk(a,{...b,mapId:'ground'},100),null);assert.equal(startWalk(a,{...b,x:8},100),null)});
test('reduzierte Bewegung unterbindet Interpolation',()=>{assert.equal(walkVisual(startWalk(a,b,0),50,'yard',true),null)});
test('falsche Karte und fehlende Animation sind sicher',()=>{assert.equal(walkVisual(startWalk(a,b,0),50,'ground'),null);assert.equal(walkVisual(null,50,'yard'),null)});
test('stehende NPCs erhalten keine Gehpose',()=>{assert.equal(actorWalkFrame({moving:false},12),0);assert.equal(actorWalkFrame({moving:true},12),6)});
