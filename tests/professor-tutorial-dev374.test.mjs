import test from 'node:test';import assert from 'node:assert/strict';
import {Engine} from '../src/engine.js';
import {professorWalkPlan,validateTutorialGrass,TUTORIAL_GRASS} from '../src/professor-tutorial.js';
import {PROFESSOR_SCENE} from '../src/professor-scene.js';
test('dev370: Grasfläche liegt kollisionsfrei',()=>{assert.ok(validateTutorialGrass());assert.equal(TUTORIAL_GRASS.length,6)});
test('dev371: automatischer Weg aus dem Labor führt zur Lichtung',()=>{const path=professorWalkPlan('study',6,4);assert.ok(path?.length);assert.equal(path.at(-1).mapId,'professor_clearing');assert.deepEqual([path.at(-1).x,path.at(-1).y],[7,9]);});
test('dev372: Professor-Szene sperrt normale Bewegung',()=>{const e=new Engine();e.state.mapId='study';e.state.x=6;e.state.y=4;e.state.flags.rival_absol=true;assert.equal(e.beginProfessorScene(),true);assert.equal(e.mode,'cutscene');assert.equal(e.step('right'),false);});
test('dev373: Zuschauer-Kampf, kein Spieler-Pokémon und Fang durch Professor',()=>{const text=PROFESSOR_SCENE.pages.join(' ');assert.match(text,/eigenes Pokémon/);assert.match(text,/Professor wirft einen Pokéball/);assert.match(text,/schillernde Raupy/);assert.match(text,/schaust zu/);});
test('dev374: Storyabschluss ist einmalig und gibt Kontrolle zurück',()=>{const e=new Engine();e.state.mapId='study';e.state.x=6;e.state.y=4;e.state.flags.rival_absol=true;assert.ok(e.beginProfessorScene());e.state.mapId='professor_clearing';e.state.x=7;e.state.y=9;assert.ok(e.beginProfessorDemonstration());for(let i=0;i<PROFESSOR_SCENE.pages.length;i++)e.advanceDialogue();assert.equal(e.mode,'exploration');assert.equal(e.state.flags.professor_demo,true);assert.equal(e.state.team.length,0);assert.equal(e.beginProfessorScene(),false);});
