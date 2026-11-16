import test from 'node:test';
import assert from 'node:assert/strict';
import {maps,npcs,objects} from '../src/maps.js';
test('Scope dev.111',()=>{assert.ok(npcs.village.some(n=>n.id==='merchant'));assert.ok(npcs.village_home.length===0);assert.ok(npcs.village.some(n=>n.id==='rival'));assert.ok(npcs.study.some(n=>n.id==='professor'));});
