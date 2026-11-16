import test from 'node:test';
import assert from 'node:assert/strict';
import {scenePresentation} from '../src/story-presentation.js';
test('dev380 birthday uses existing parent speaker and warm mood',()=>{const s=scenePresentation({id:'birthday_greeting',name:'Deine Adoptiveltern',pages:['Adoptivmutter: Willkommen!'],index:0});assert.equal(s.voice,'Adoptivmutter');assert.equal(s.text,'Willkommen!');assert.equal(s.portrait,'mother');assert.equal(s.tone,'warm')});
test('dev381 rift presentation stays distinct',()=>{const s=scenePresentation({id:'rift_scene',name:'Dimensionsereignis',pages:['Giratina erscheint.'],index:0});assert.equal(s.portrait,'giratina');assert.equal(s.tone,'rift')});
test('dev382 absol scene uses own portrait',()=>{assert.equal(scenePresentation({id:'absol_scene',name:'Absol',pages:['Ein Riss.'],index:0}).portrait,'absol')});
test('dev383 professor dialogue identifies speaker without changing script',()=>{const s=scenePresentation({id:'professor_demo_scene',name:'Forschungsausflug',pages:['Professor: Ein schillerndes Raupy!'],index:0});assert.equal(s.text,'Ein schillerndes Raupy!');assert.equal(s.voice,'Professor');assert.equal(s.portrait,'professor')});
test('dev384 progress clamps safely and no story flags are changed',()=>{const d={id:'route1_hatch_scene',name:'Ei',pages:['a','b'],index:99};const copy=structuredClone(d);const s=scenePresentation(d);assert.equal(s.progress,'2 / 2');assert.deepEqual(d,copy);assert.equal(scenePresentation(null),null)});
