import test from 'node:test';
import assert from 'node:assert/strict';
import {npcClockStep,NPC_TICK_MS} from '../src/npc-clock.js';
import {Engine} from '../src/engine.js';

test('NPC clock ticks after active elapsed time without player input',()=>{
 let state=npcClockStep(null,100,true);assert.equal(state.tick,false);
 state=npcClockStep(state.last,100+NPC_TICK_MS-1,true);assert.equal(state.tick,false);
 state=npcClockStep(state.last,100+NPC_TICK_MS,true);assert.equal(state.tick,true);
});
test('NPC clock pauses and resumes without catching up',()=>{
 let state=npcClockStep(0,100,false);assert.deepEqual(state,{last:null,tick:false});
 state=npcClockStep(state.last,900000,true);assert.equal(state.tick,false);
 state=npcClockStep(state.last,900000+NPC_TICK_MS,true);assert.equal(state.tick,true);
});
test('NPC clock handles backward timestamps',()=>{assert.deepEqual(npcClockStep(1000,100,true),{last:100,tick:false});});
test('player steps no longer advance NPC simulation',()=>{
 const e=new Engine();e.state.mapId='beerendorf';e.state.x=7;e.state.y=8;
 const before=e.npcTurn;e.step('left');assert.equal(e.npcTurn,before);
 e.advanceNpcs();assert.equal(e.npcTurn,before+1);
});
test('NPC simulation remains paused during dialogues',()=>{
 const e=new Engine();e.mode='dialogue';e.advanceNpcs();assert.equal(e.npcTurn,0);
});
