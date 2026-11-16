import test from 'node:test';
import assert from 'node:assert/strict';
import {maps} from '../src/maps.js';
import {auditWorldTravel,auditCompleteWorld} from '../src/world-access-audit.js';
test('Alle Außenkarten sind von Mu über Pfade erreichbar',()=>assert.deepEqual(auditWorldTravel(),[]));
test('Kombinierte Weltprüfung meldet keine Hindernisse',()=>assert.deepEqual(auditCompleteWorld(),[]));
test('Abgeschnittene Region wird erkannt',()=>{const world={...maps,waldrand:{...maps.waldrand,portals:maps.waldrand.portals.filter(p=>p.target!=='beerendorf')}};assert.ok(auditWorldTravel(world).some(issue=>issue.includes('beerendorf')));});
