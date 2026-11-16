import test from 'node:test';
import assert from 'node:assert/strict';
import {absorptionEffect} from '../src/ability-effects.js';
test('Absorptionswerte sind unabhängig von Aufrufreihenfolge',()=>{const a=absorptionEffect(114,11,2);const b=absorptionEffect(31,13,2);assert.equal(a.stat,'specialAttack');assert.equal(b.stat,'specialAttack');assert.equal(absorptionEffect(114,13,2),null)});
