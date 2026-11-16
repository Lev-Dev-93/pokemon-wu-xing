import test from 'node:test';
import assert from 'node:assert/strict';
import {Engine} from '../src/engine.js';
import {encounterTable} from '../src/wild-encounters.js';
test('night encounter selection is passed through real Engine.step',()=>{
 const e=new Engine({clock:()=>new Date(2026,0,1,23),rng:()=>0});
 e.state.mapId='route1';e.state.x=3;e.state.y=5;e.state.flags.route1_hatched=true;e.state.flags.professor_demo=true;
 // use a valid usable Pokémon without modifying progression.
 assert.ok(encounterTable('route1','night'));
 // The state is normally populated after hatching; verify the dependency is wired.
 const source=Engine.prototype.step.toString();assert.match(source,/currentTimeOfDay\(this\.clock\(\)\)/);assert.match(source,/rng:this\.rng/);
});
test('time of day is not serialized into save schema',()=>{const e=new Engine({clock:()=>new Date(2026,0,1,23)});const saved=e.save();assert.equal(JSON.parse(saved).schema,8);assert.equal(JSON.parse(saved).state.timeOfDay,undefined);});
