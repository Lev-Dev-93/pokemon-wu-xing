import test from 'node:test';
import assert from 'node:assert/strict';
import {createPokemon} from '../src/team.js';
import {startBattle,playTurn} from '../src/battle.js';
function battle(a,b,weather){const p=createPokemon(a,{level:35}),e=createPokemon(b,{level:35});p.moves=[33];e.moves=[33];const x=startBattle(p,e);x.weather=weather;x.weatherTurns=5;return x}
const rng=()=>0.5;
test('Chlorophyll ändert die Zugreihenfolge bei Sonne',()=>{const b=battle(1,7,'sun');b.player.pokemon.stats.speed=30;b.opponent.pokemon.stats.speed=45;playTurn(b,0,0,{rng});assert.equal(b.turnEvents[0].actor,'player')});
test('Chlorophyll ohne Sonne hat keinen Bonus',()=>{const b=battle(1,7,null);b.player.pokemon.stats.speed=30;b.opponent.pokemon.stats.speed=45;playTurn(b,0,0,{rng});assert.equal(b.turnEvents[0].actor,'opponent')});
test('Wassertempo verdoppelt Initiative bei Regen',()=>{const b=battle(60,7,'rain');b.player.pokemon.stats.speed=30;b.opponent.pokemon.stats.speed=45;playTurn(b,0,0,{rng});assert.equal(b.turnEvents[0].actor,'player')});
test('Sandschleier kann einen sonst treffenden Angriff verhindern',()=>{const b=battle(7,27,'sand');b.opponent.pokemon.abilityId=8;b.player.pokemon.moves=[33];const hp=b.opponent.pokemon.currentHp;playTurn(b,0,0,{rng:()=>0.85});assert.equal(b.opponent.pokemon.currentHp,hp)});
test('Schneemantel kann einen sonst treffenden Angriff verhindern',()=>{const b=battle(7,361,'hail');b.opponent.pokemon.abilityId=81;const hp=b.opponent.pokemon.currentHp;playTurn(b,0,0,{rng:()=>0.85});assert.equal(b.opponent.pokemon.currentHp,hp)});
test('Sandschleier ohne Sandsturm gewährt keinen Bonus',()=>{const b=battle(7,27,null);b.opponent.pokemon.abilityId=8;const hp=b.opponent.pokemon.currentHp;playTurn(b,0,0,{rng:()=>0.85});assert.ok(b.opponent.pokemon.currentHp<hp)});
