import test from 'node:test';
import assert from 'node:assert/strict';
import {runPhase13BrowserChecks} from '../src/phase13-browser-checks.js';
import {readFileSync} from 'node:fs';
test('Browser-Kampfszenarien laufen auch unter Node fehlerfrei',()=>{const report=runPhase13BrowserChecks();assert.equal(report.passed,report.total,JSON.stringify(report.results));assert.equal(report.total,6)});
test('GitHub-Pages-Prüfseite lädt das Browsermodul über relativen Pfad',()=>{const html=readFileSync(new URL('../phase13-browser-test.html',import.meta.url),'utf8');assert.match(html,/\.\/src\/phase13-browser-checks\.js/);assert.match(html,/runPhase13BrowserChecks/);assert.match(html,/Manuelle End-to-End-Prüfung/)});
