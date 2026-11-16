import test from 'node:test';
import assert from 'node:assert/strict';
import {createPokemon} from '../src/team.js';
import {startBattle,playTurn} from '../src/battle.js';
function setup(weather,ability,turns=3){const a=createPokemon(1,{level:40}),b=createPokemon(7,{level:40});a.moves=[33];b.moves=[33];const battle=startBattle(a,b);battle.weather=weather;battle.weatherTurns=turns;battle.player.pokemon.abilityId=ability;battle.player.pokemon.stats.hp=160;battle.player.pokemon.currentHp=100;battle.opponent.pokemon.stats.attack=1;battle.player.pokemon.stats.defense=999;return battle}
const rng=()=>0.5;
test('Regengenuss heilt bei Regen',()=>{const b=setup('rain',44);const hp=b.player.pokemon.currentHp;playTurn(b,0,0,{rng});assert.ok(b.log.some(x=>x.includes('Regengenuss')));assert.ok(b.player.pokemon.currentHp>=hp)});
test('Regengenuss wirkt ohne Regen nicht',()=>{const b=setup(null,44);playTurn(b,0,0,{rng});assert.ok(!b.log.some(x=>x.includes('Regengenuss')))});
test('Eishaut heilt bei Hagel',()=>{const b=setup('hail',115);playTurn(b,0,0,{rng});assert.ok(b.log.some(x=>x.includes('Eishaut')))});
test('Eishaut wirkt ohne Hagel nicht',()=>{const b=setup('rain',115);playTurn(b,0,0,{rng});assert.ok(!b.log.some(x=>x.includes('Eishaut')))});
test('Solarkraft verursacht Sonnenschaden',()=>{const b=setup('sun',94);playTurn(b,0,0,{rng});assert.ok(b.log.some(x=>x.includes('Solarkraft')))});
test('Solarkraft verursacht ohne Sonne keinen Eigenschaden',()=>{const b=setup('rain',94);playTurn(b,0,0,{rng});assert.ok(!b.log.some(x=>x.includes('Solarkraft')))});
test('Solarkraft verstärkt nur Spezialattacken',()=>{const a=setup('sun',94),b=setup('sun',1);a.player.pokemon.moves=[52];b.player.pokemon.moves=[52];a.opponent.pokemon.stats.speed=1;b.opponent.pokemon.stats.speed=1;playTurn(a,0,0,{rng});playTurn(b,0,0,{rng});assert.ok(a.opponent.pokemon.currentHp<b.opponent.pokemon.currentHp)});
test('Wetterfähigkeit gilt auch in der letzten Wetterrunde',()=>{const b=setup('rain',44,1);playTurn(b,0,0,{rng});assert.ok(b.log.some(x=>x.includes('Regengenuss')));assert.equal(b.weather,null)});
