import test from 'node:test';
import assert from 'node:assert/strict';
import {HELD_BATTLE_ITEMS,heldDamageMultiplier,heldEndTurnHeal,heldLifeOrbRecoil,heldFocusSashSurvival} from '../src/held-battle-items.js';
import {phase13ReleaseAudit} from '../src/phase13-release-audit.js';
const p=(heldItemId,hp=100,currentHp=100)=>({heldItemId,currentHp,stats:{hp}});
test('dev704: alle sechs getragenen Kampfitems besitzen eindeutige IDs',()=>{assert.equal(Object.keys(HELD_BATTLE_ITEMS).length,6);assert.equal(new Set(Object.keys(HELD_BATTLE_ITEMS)).size,6)});
test('dev704: Schadenverstärker greifen nur in ihrer Kategorie',()=>{assert.equal(heldDamageMultiplier(p('muscle-band'),{power:80,category:2},1),1.1);assert.equal(heldDamageMultiplier(p('muscle-band'),{power:80,category:3},1),1);assert.equal(heldDamageMultiplier(p('wise-glasses'),{power:80,category:3},1),1.1);assert.equal(heldDamageMultiplier(p('expert-belt'),{power:80,category:2},2),1.2);assert.equal(heldDamageMultiplier(p('expert-belt'),{power:80,category:2},1),1)});
test('dev704: Heilung, Rückstoß und Fokusgurt begrenzen Werte',()=>{assert.equal(heldEndTurnHeal(p('leftovers',160,155)),5);assert.equal(heldLifeOrbRecoil(p('life-orb',100,4),20),4);assert.equal(heldFocusSashSurvival(p('focus-sash',100,100),200),99);assert.equal(heldFocusSashSurvival(p('focus-sash',100,99),200),200)});
test('dev704: Audit behauptet keine unbewiesene vollständige Freigabe',()=>{const a=phase13ReleaseAudit();assert.equal(a.mechanicsComplete,false);assert.equal(a.dataValid,true)});
