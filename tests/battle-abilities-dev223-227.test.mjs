import test from 'node:test';
import assert from 'node:assert/strict';
import {preventsStatus,preventsConfusion,statusCureAbility} from '../src/ability-effects.js';
const f=(id,status=null)=>({pokemon:{abilityId:id,status}});
test('Tempomacher verhindert Verwirrung',()=>assert.equal(preventsConfusion(f(20)),true));
test('Magmapanzer verhindert Einfrieren',()=>assert.equal(preventsStatus(f(40),'freeze'),true));
test('Insomnia und Munterkeit verhindern Schlaf',()=>{assert.equal(preventsStatus(f(15),'sleep'),true);assert.equal(preventsStatus(f(72),'sleep'),true)});
test('Hydration heilt im Regen',()=>assert.equal(statusCureAbility(f(93,'burn'),'rain',()=>0.9),'Hydration'));
test('Expidermis heilt mit kontrollierter Zufallszahl',()=>assert.equal(statusCureAbility(f(61,'burn'),null,()=>0),'Expidermis'));
