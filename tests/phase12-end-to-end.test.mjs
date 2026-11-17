import test from 'node:test';
import assert from 'node:assert/strict';
import {Engine} from '../src/engine.js';
import {prologueGuide,prologueConsistency} from '../src/prologue-guide.js';
import {professorSceneReady} from '../src/professor-scene.js';

function finish(e){assert.equal(e.mode,'dialogue');let n=0;while(e.mode==='dialogue'&&n++<30)e.advanceDialogue();assert.equal(e.mode,'exploration');}
function checkpoint(e,label){const raw=e.save();const copy=new Engine();copy.load(raw);assert.deepEqual(copy.state.flags,e.state.flags,`${label}: flags`);assert.deepEqual(copy.state.starterEgg,e.state.starterEgg,`${label}: egg`);assert.deepEqual(copy.state.team,e.state.team,`${label}: team`);return copy;}

test('Prolog vollständig: Geburtstag → Ei → Giratina → Absol → Eltern → Raupy → Route 1, mit Save/Load',()=>{
 let e=new Engine();e.state.mapId='ground';
 assert.equal(e.beginBirthdayGreeting(),true);finish(e);
 assert.equal(e.beginBirthdayPreview(),true);finish(e);
 e=checkpoint(e,'Geburtstag');
 assert.equal(e.chooseStarter(1),true);finish(e);
 assert.equal(e.state.team.length,0);assert.equal(e.state.starterEgg.hatched,false);
 e=checkpoint(e,'Ei');
 assert.equal(e.beginRiftScene(),true);finish(e);e=checkpoint(e,'Giratina');
 e.state.mapId='village';assert.equal(e.beginAbsolScene(),true);finish(e);e=checkpoint(e,'Absol');
 assert.equal(e.state.flags.parents_briefed,false,'Elternbericht steht noch aus');
 e.state.mapId='ground';assert.equal(e.beginParentsReport(),true);finish(e);e=checkpoint(e,'Elternbericht');
 assert.equal(professorSceneReady(e.state.flags),true);
 e.state.mapId='professor_clearing';e.mode='cutscene';assert.equal(e.beginProfessorDemonstration(),true);finish(e);
 e=checkpoint(e,'Raupy');assert.equal(e.state.team.length,0);
 e.state.mapId='route1';e.setFlag('visitedRoute1',true);assert.equal(e.beginHatchScene(),true);finish(e);
 assert.equal(e.state.flags.route1_hatched,true);assert.equal(e.state.starterEgg.hatched,true);
 assert.equal(e.state.team.length,1);assert.equal(e.state.team[0].level,5);
 assert.equal(e.state.eventLog.filter(x=>x.type==='hatch').length,1);
 assert.equal(e.beginHatchScene(),false);assert.equal(e.finishHatching(),false);
 e=checkpoint(e,'Schlüpfen');assert.equal(prologueGuide(e.state.flags).finished,true);
 assert.equal(prologueConsistency(e.state.flags,e.state.starterEgg,e.state.team).ok,true);
});

test('Professor-Demonstration nicht vor Absol oder außerhalb des Schauplatzes',()=>{
 const e=new Engine();e.state.mapId='professor_clearing';e.mode='cutscene';
 assert.equal(e.beginProfessorDemonstration(),false);
 e.state.flags.rival_absol=true;assert.equal(e.beginProfessorDemonstration(),true);
});
