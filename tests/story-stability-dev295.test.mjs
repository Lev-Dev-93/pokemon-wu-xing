import test from 'node:test';import assert from 'node:assert/strict';import {Engine} from '../src/engine.js';
test('Laden verweigert widersprüchlichen Elternbericht',()=>{const e=new Engine();const data=JSON.parse(e.save());data.state.flags.parents_briefed=true;assert.throws(()=>new Engine().load(JSON.stringify(data)),/Story-Reihenfolge/)});
