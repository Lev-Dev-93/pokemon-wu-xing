import test from 'node:test';
import assert from 'node:assert/strict';
import {Engine} from '../src/engine.js';
import {findStoryWalk,STORY_WALK_TARGETS} from '../src/story-autowalk.js';
test('Eltern sind vom Treppenabsatz erreichbar',()=>assert.ok(findStoryWalk('ground',[10,2],STORY_WALK_TARGETS.parents)?.length>0));
test('Geburtstagslied startet einmalig und setzt beide Elternflags',()=>{const e=new Engine();e.state.mapId='ground';assert.equal(e.beginBirthdayGreeting(),true);assert.equal(e.dialogue.id,'birthday_greeting');assert.match(e.dialogue.pages.join(' '),/Happy Birthday/);while(e.mode==='dialogue')e.advanceDialogue();assert.equal(e.state.flags.spokenToBreederA,true);assert.equal(e.state.flags.spokenToBreederB,true);assert.equal(e.beginBirthdayGreeting(),false)});
test('Geburtstagsdialog lässt sich vor dem Abschluss speichern',()=>{const e=new Engine();e.state.mapId='ground';e.beginBirthdayGreeting();const loaded=new Engine();loaded.load(e.save());assert.equal(loaded.state.flags.egg_received,false);assert.equal(loaded.state.flags.spokenToBreederA,false)});
