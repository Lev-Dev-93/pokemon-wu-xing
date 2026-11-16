import test from 'node:test';
import assert from 'node:assert/strict';
import {createPokemon} from '../src/team.js';
import {startBattle,playTurn} from '../src/battle.js';
const rng=()=>0.5;
function battle(weather,ability,other=1){const a=createPokemon(1,{level:40}),b=createPokemon(7,{level:40});a.moves=[33];b.moves=[33];const x=startBattle(a,b);x.weather=weather;x.weatherTurns=3;x.player.pokemon.abilityId=ability;x.opponent.pokemon.abilityId=other;x.player.pokemon.stats.hp=160;x.player.pokemon.currentHp=100;x.player.pokemon.stats.defense=999;x.opponent.pokemon.stats.attack=1;return x}
test('Trockenheit heilt bei Regen',()=>{const b=battle('rain',87);playTurn(b,0,0,{rng});assert.ok(b.log.some(x=>x.includes('regeneriert')&&x.includes('Trockenheit')))});
test('Trockenheit schadet bei Sonne',()=>{const b=battle('sun',87);playTurn(b,0,0,{rng});assert.ok(b.log.some(x=>x.includes('verliert')&&x.includes('Trockenheit')))});
test('Trockenheit bleibt bei Hagel inaktiv',()=>{const b=battle('hail',87);playTurn(b,0,0,{rng});assert.ok(!b.log.some(x=>x.includes('Trockenheit')))});
test('Wolke Sieben unterdrückt Sandsturmschaden',()=>{const b=battle('sand',13);playTurn(b,0,0,{rng});assert.ok(!b.log.some(x=>x.includes('durch Sandsturm')));assert.equal(b.weather,'sand');assert.equal(b.weatherTurns,2)});
test('Klimaschutz unterdrückt Hagelschaden',()=>{const b=battle('hail',76);playTurn(b,0,0,{rng});assert.ok(!b.log.some(x=>x.includes('durch Hagel')))});
test('Wolke Sieben auf Gegenseite unterdrückt Trockenheit',()=>{const b=battle('rain',87,13);playTurn(b,0,0,{rng});assert.ok(!b.log.some(x=>x.includes('Trockenheit')))});
test('Wetterunterdrückung verhindert Regengenuss',()=>{const b=battle('rain',44,76);playTurn(b,0,0,{rng});assert.ok(!b.log.some(x=>x.includes('Regengenuss')))});
test('Wetter bleibt trotz Unterdrückung nicht dauerhaft',()=>{const b=battle('rain',13);b.weatherTurns=1;playTurn(b,0,0,{rng});assert.equal(b.weather,null)});
