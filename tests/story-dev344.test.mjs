import test from 'node:test';
import assert from 'node:assert/strict';
import {validatePrologueMilestones} from '../src/story-guards.js';
test('dev.344 story regression',()=>{assert.equal(validatePrologueMilestones([]),false);assert.equal(validatePrologueMilestones({egg_received:'true'}),false);assert.equal(validatePrologueMilestones({}),true);});
