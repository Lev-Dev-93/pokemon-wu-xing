import test from 'node:test';
import assert from 'node:assert/strict';
import {createPokemon} from '../src/team.js';
import {startBattle,playTurn} from '../src/battle.js';
const rng=()=>0.01;
function setup(move, own=4, enemy=1){const a=createPokemon(own,{level:40}),e=createPokemon(enemy,{level:40});a.moves=[move,33];e.moves=[106];const b=startBattle(a,e);b.player.pp=[20,20];b.opponent.pp=[20];return b}
test('Sonnenschein dauert fünf Runden',()=>{const b=setup(241);playTurn(b,0,0,{rng});assert.equal(b.weather,'sun');assert.equal(b.weatherTurns,4);for(let i=0;i<4;i++)playTurn(b,1,0,{rng});assert.equal(b.weather,null)});
test('Regen ersetzt Sonnenschein',()=>{const b=setup(240);b.weather='sun';playTurn(b,0,0,{rng});assert.equal(b.weather,'rain')});
test('Sandsturm schädigt ungeschützte Pokémon',()=>{const b=setup(201);const hp=b.player.pokemon.currentHp;playTurn(b,0,0,{rng});assert.equal(b.player.pokemon.currentHp,hp-Math.max(1,Math.floor(b.player.pokemon.stats.hp/16)))});
test('Sandsturm schont Gestein-Pokémon',()=>{const b=setup(201,74,1);const hp=b.player.pokemon.currentHp;playTurn(b,0,0,{rng});assert.equal(b.player.pokemon.currentHp,hp)});
test('Hagel schont Eis-Pokémon',()=>{const b=setup(258,131,1);const hp=b.player.pokemon.currentHp;playTurn(b,0,0,{rng});assert.equal(b.player.pokemon.currentHp,hp)});
test('Wetter verändert Feuer-Schaden',()=>{const dry=setup(52),sun=setup(52),rain=setup(52);sun.weather='sun';sun.weatherTurns=5;rain.weather='rain';rain.weatherTurns=5;for(const b of [dry,sun,rain])playTurn(b,0,0,{rng});const loss=b=>b.opponent.pokemon.stats.hp-b.opponent.pokemon.currentHp;assert.ok(loss(sun)>loss(dry));assert.ok(loss(dry)>loss(rain))});
test('Sonnenschein verstärkt Synthese',()=>{const b=setup(235);b.weather='sun';b.weatherTurns=5;b.player.pokemon.abilityId=66;b.player.pokemon.currentHp=1;const before=b.player.pokemon.currentHp;playTurn(b,0,0,{rng});assert.equal(b.player.pokemon.currentHp-before,Math.floor(b.player.pokemon.stats.hp*2/3))});
