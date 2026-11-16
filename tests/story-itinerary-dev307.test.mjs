import test from 'node:test';import assert from 'node:assert/strict';import {riftResumeReady} from '../src/story-itinerary.js';
test('Wiederaufnahme des Erdbebenlaufs prüft den Weg',()=>{assert.equal(riftResumeReady('ground',[5,7]),true);assert.equal(riftResumeReady('unbekannt',[1,1]),false);});
