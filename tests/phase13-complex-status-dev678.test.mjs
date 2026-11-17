import test from 'node:test';
import assert from 'node:assert/strict';
import {createPokemon} from '../src/team.js';
import {startBattle,playTurn} from '../src/battle.js';
function battle(move){const b=startBattle(createPokemon(1,35),createPokemon(4,35));b.player.pokemon.moves=[move];b.player.pp=[20];b.opponent.pokemon.moves=[150];b.opponent.pp=[20];return b;}
function run(b){playTurn(b,0,0,{rng:()=>0.4});}
test('Krafttausch vertauscht beide Offensivstufen und nicht die Verteidigung',()=>{const b=battle(384);b.player.stages.attack=2;b.opponent.stages.attack=-1;b.player.stages.specialAttack=3;b.opponent.stages.specialAttack=-2;b.player.stages.defense=4;run(b);assert.equal(b.player.stages.attack,-1);assert.equal(b.opponent.stages.attack,2);assert.equal(b.player.stages.specialAttack,-2);assert.equal(b.opponent.stages.specialAttack,3);assert.equal(b.player.stages.defense,4)});
test('Statustausch vertauscht alle sieben Stufen',()=>{const b=battle(391);const keys=Object.keys(b.player.stages);keys.forEach((k,i)=>{b.player.stages[k]=i-3;b.opponent.stages[k]=3-i});run(b);keys.forEach((k,i)=>{assert.equal(b.player.stages[k],3-i);assert.equal(b.opponent.stages[k],i-3)})});
test('Leidteiler mittelt aktuelle KP und begrenzt auf maximale KP',()=>{const b=battle(220);b.player.pokemon.currentHp=20;b.opponent.pokemon.currentHp=40;run(b);assert.equal(b.player.pokemon.currentHp,Math.min(30,b.player.pokemon.stats.hp));assert.equal(b.opponent.pokemon.currentHp,Math.min(30,b.opponent.pokemon.stats.hp))});
test('Bauchtrommel setzt Angriff auf +6 und kostet halbe maximale KP',()=>{const b=battle(187);const cost=Math.floor(b.player.pokemon.stats.hp/2);const hp=b.player.pokemon.currentHp;run(b);assert.equal(b.player.stages.attack,6);assert.equal(b.player.pokemon.currentHp,hp-cost)});
test('Bauchtrommel schlägt bei unzureichenden KP fehl',()=>{const b=battle(187);b.player.pokemon.currentHp=Math.floor(b.player.pokemon.stats.hp/2);run(b);assert.equal(b.player.stages.attack,0);assert.equal(b.player.pokemon.currentHp,Math.floor(b.player.pokemon.stats.hp/2))});
test('Bauchtrommel schlägt bei maximalem Angriff fehl',()=>{const b=battle(187);b.player.stages.attack=6;const hp=b.player.pokemon.currentHp;run(b);assert.equal(b.player.pokemon.currentHp,hp)});
