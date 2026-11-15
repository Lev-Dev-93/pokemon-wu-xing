import test from 'node:test';
import assert from 'node:assert/strict';
import {Engine} from '../src/engine.js';
import {createPokemon} from '../src/team.js';
function ready(){const e=new Engine();e.state.mapId='route1';e.state.flags.route1_hatched=true;e.state.team=[createPokemon(1,{level:5})];return e}
test('Trainer pays exactly once and records prize',()=>{const e=ready();assert.equal(e.state.money,0);assert.equal(e.finishTrainerBattle(true),true);assert.equal(e.state.money,80);assert.equal(e.finishTrainerBattle(true),false);assert.equal(e.state.money,80);assert.deepEqual(e.state.eventLog.at(-1),{type:'trainerPrize',trainer:'route1_trainer',amount:80})});
test('Loss does not award money',()=>{const e=ready();assert.equal(e.finishTrainerBattle(false),false);assert.equal(e.state.money,0)});
test('Prize survives save/load',()=>{const e=new Engine();e.state.money=80;const other=new Engine();other.load(e.save());assert.equal(other.state.money,80)});
test('Older save migrates with zero money',()=>{const e=new Engine();const old=JSON.parse(e.save());delete old.state.money;const other=new Engine();other.load(JSON.stringify(old));assert.equal(other.state.money,0)});
test('Invalid money rejected',()=>{const e=new Engine();const old=JSON.parse(e.save());old.state.money=-5;assert.throws(()=>new Engine().load(JSON.stringify(old)),/Guthaben/)});
