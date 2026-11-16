import test from 'node:test';import assert from 'node:assert/strict';
import {createPokemon} from '../src/team.js';import {startBattle,playTurn,availableMoves} from '../src/battle.js';
const rng=()=>0.1;
function pair(){const p=createPokemon(4,{level:25}),e=createPokemon(1,{level:25});p.moves=[52];e.moves=[33];return startBattle(p,e)}
test('battle starts with isolated copies',()=>{const p=createPokemon(4),e=createPokemon(1);const b=startBattle(p,e);b.player.pokemon.currentHp=1;assert.equal(p.currentHp,p.stats.hp)});
test('moves expose valid PP',()=>{const b=pair();assert.equal(availableMoves(b.player)[0].pp,25)});
test('turn spends PP and deals damage',()=>{const b=pair(),hp=b.opponent.pokemon.currentHp;playTurn(b,0,0,{rng});assert.equal(b.player.pp[0],24);assert.ok(b.opponent.pokemon.currentHp<hp)});
test('cannot use exhausted PP',()=>{const b=pair();b.player.pp[0]=0;assert.throws(()=>playTurn(b,0,0,{rng}));assert.equal(b.turn,1)});
test('turn order obeys priority',()=>{const b=pair();b.player.pokemon.moves=[98];b.player.pp=[30];playTurn(b,0,0,{rng});assert.match(b.log[0],/Dein Pokémon/)});
test('immunity prevents damage',()=>{const b=pair();b.player.pokemon.moves=[33];b.player.pp=[35];b.opponent.pokemon=createPokemon(92,{level:25});const hp=b.opponent.pokemon.currentHp;playTurn(b,0,0,{rng});assert.equal(b.opponent.pokemon.currentHp,hp)});
test('fainted opponent ends battle',()=>{const b=pair();b.opponent.pokemon.currentHp=1;playTurn(b,0,0,{rng});assert.equal(b.finished,true);assert.equal(b.winner,'player');assert.throws(()=>playTurn(b,0,0,{rng}))});
test('invalid random number rejected',()=>{const b=pair();assert.throws(()=>playTurn(b,0,0,{rng:()=>1}))});
test('Sandsturm aktiviert einen Wettereffekt',()=>{const b=pair();b.player.pokemon.moves=[201];b.player.pp=[10];playTurn(b,0,0,{rng});assert.equal(b.weather,'sand')});
