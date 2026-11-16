import test from 'node:test';
import assert from 'node:assert/strict';
import {entryWeather,intimidates,curesOnSwitchOut,absorptionEffect,absorbsGround} from '../src/ability-effects.js';
test('Einwechsel-Fähigkeiten haben gemeinsame Metadaten',()=>{assert.deepEqual(entryWeather(2),['rain','Regen']);assert.deepEqual(entryWeather(117),['hail','Hagel']);assert.equal(entryWeather(1),null);assert.equal(intimidates(22),true);assert.equal(curesOnSwitchOut(30),true)});
test('Absorption respektiert Attackentyp und Kategorie',()=>{assert.equal(absorptionEffect(31,13,1)?.stat,'specialAttack');assert.equal(absorptionEffect(11,11,1),null);assert.equal(absorptionEffect(11,11,2)?.heal,true);assert.equal(absorptionEffect(157,12,1)?.stat,'attack');assert.equal(absorptionEffect(18,10,2)?.flashFire,true);assert.equal(absorptionEffect(31,11,2),null)});
test('Schwebe wirkt nur auf schadende Bodenattacken',()=>{assert.equal(absorbsGround(26,5,2,40),true);assert.equal(absorbsGround(26,5,1,0),false);assert.equal(absorbsGround(26,13,2,40),false)});
