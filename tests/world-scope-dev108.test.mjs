import test from 'node:test';
import assert from 'node:assert/strict';
import {maps,npcs,objects} from '../src/maps.js';
test('Scope dev.108',()=>{assert.ok(maps.bedroom&&maps.ground&&maps.yard);});
