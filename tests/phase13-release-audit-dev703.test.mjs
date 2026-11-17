import test from 'node:test';
import assert from 'node:assert/strict';
import {phase13ReleaseAudit} from '../src/phase13-release-audit.js';
test('Phase 13: Katalogdaten haben gültige Struktur',()=>{const r=phase13ReleaseAudit();assert.ok(r.moveCount>500);assert.equal(r.invalidData.length,0,r.invalidData.slice(0,10).join('\n'));});
test('Phase 13: nicht bestätigte Fähigkeiten werden nicht als abgeschlossen deklariert',()=>{const r=phase13ReleaseAudit();assert.equal(r.abilityCount,Object.values(r.abilityCounts).reduce((a,b)=>a+b,0));assert.equal(r.mechanicsComplete,false);assert.ok(r.unverifiedAbilities.length>0);});
