import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Engine} from '../src/engine.js';

test('Starterwahl bleibt bis zum Ende des Ei-Dialogs in der Dialogansicht',()=>{
 const e=new Engine();e.state.mapId='ground';e.setFlag('spokenToBreederA',true);e.setFlag('spokenToBreederB',true);
 assert.equal(e.chooseStarter(1),true);assert.equal(e.mode,'dialogue');assert.equal(e.dialogue.id,'starter_wish');
 assert.equal(e.lastEvent,'starterSelected');
 e.advanceDialogue();assert.equal(e.mode,'dialogue');
 e.advanceDialogue();assert.equal(e.mode,'dialogue');
 e.advanceDialogue();assert.equal(e.mode,'exploration');assert.equal(e.lastEvent,'starterWishFinished');
});
test('Ein normaler Dialog löst nicht das Ei-Endereignis aus',()=>{
 const e=new Engine();e.state.mapId='ground';e.setFlag('spokenToBreederA',true);e.setFlag('spokenToBreederB',true);e.chooseStarter(1);
 while(e.mode==='dialogue')e.advanceDialogue();
 e.dialogue={id:'breeder_a',name:'Züchterin',pages:['Hallo'],index:0};e.mode='dialogue';e.advanceDialogue();
 assert.equal(e.lastEvent,'dialogueFinished');
});
test('Die Startauswahl löst keinen vorzeitigen Kartenlauf aus',()=>{
 const source=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
 const selection=source.slice(source.indexOf('function renderStarters()'),source.indexOf('function openStarters()'));
 assert.doesNotMatch(selection,/runToVillageSquare\(/);
 assert.match(source,/event==='starterWishFinished'&&engine\.state\.flags\.egg_received/);
});
