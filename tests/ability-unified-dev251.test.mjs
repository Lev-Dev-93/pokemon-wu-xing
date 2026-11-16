import test from 'node:test';
import assert from 'node:assert/strict';
import {offensiveAbilityMultiplier,defensiveAbilityMultiplier,weatherAbilityHpFraction,ignoresIndirectDamage,ignoresBurnAttackPenalty} from '../src/ability-effects.js';
const f=(id,status=null)=>({pokemon:{abilityId:id,status},volatile:{flashFireBoost:false}});
test('Sandgewalt verstärkt nur Boden, Gestein und Stahl im Sand',()=>{assert.equal(offensiveAbilityMultiplier(f(159),{typeId:5,category:2},'sand'),1.3);assert.equal(offensiveAbilityMultiplier(f(159),{typeId:10,category:2},'sand'),1);assert.equal(offensiveAbilityMultiplier(f(159),{typeId:5,category:2},'rain'),1)});
test('Speckschicht und Hitzeschutz reduzieren nur passende Typen',()=>{assert.equal(defensiveAbilityMultiplier(f(47),{typeId:15}),0.5);assert.equal(defensiveAbilityMultiplier(f(47),{typeId:11}),1);assert.equal(defensiveAbilityMultiplier(f(85),{typeId:10}),0.5)});
test('Adrenalin verhindert Angriffsabzug durch Verbrennung',()=>{assert.equal(ignoresBurnAttackPenalty(f(62,'burn')),true);assert.equal(ignoresBurnAttackPenalty(f(1,'burn')),false)});
test('Trockenheit heilt bei Regen und schadet bei Sonne',()=>{assert.equal(weatherAbilityHpFraction(f(87),'rain').fraction,1/8);assert.equal(weatherAbilityHpFraction(f(87),'sun').fraction,-1/8);assert.equal(weatherAbilityHpFraction(f(87),'sand'),null)});
test('Magieschild schützt gegen indirekten Schaden',()=>{assert.equal(ignoresIndirectDamage(f(98)),true);assert.equal(ignoresIndirectDamage(f(1)),false)});
