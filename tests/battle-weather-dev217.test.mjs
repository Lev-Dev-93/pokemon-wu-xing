import test from 'node:test';
import assert from 'node:assert/strict';
import {createPokemon} from '../src/team.js';
import {startBattle,playTurn} from '../src/battle.js';
function duel(ability){const a=createPokemon(1,{level:35}),b=createPokemon(4,{level:35});a.moves=[33];b.moves=[33];const fight=startBattle(a,b);fight.player.pokemon.abilityId=ability;return fight}
test('Wetterschutz: Wetter verursacht bei Wetterfest keinen Schaden',()=>{const b=duel(142);b.weather='sand';b.weatherTurns=3;const hp=b.player.pokemon.currentHp;playTurn(b,0,0,{rng:()=>0.5});assert.ok(b.log.every(line=>!line.includes('Dein Pokémon erleidet')||!line.includes('Sandsturm')));assert.ok(b.player.pokemon.currentHp<=hp)});
test('Sandscharrer beeinflusst Reihenfolge bei Sandsturm',()=>{const b=duel(146);b.weather='sand';b.weatherTurns=3;b.player.pokemon.stats.speed=80;b.opponent.pokemon.stats.speed=100;playTurn(b,0,0,{rng:()=>0.5});assert.equal(b.turnEvents[0]?.actor,'player')});
test('Laubschutz verhindert Status unter Sonne',()=>{const b=duel(102);b.weather='sun';b.weatherTurns=3;b.opponent.pokemon.moves=[92];playTurn(b,0,0,{rng:()=>0.5});assert.notEqual(b.player.pokemon.status,'poison')});
