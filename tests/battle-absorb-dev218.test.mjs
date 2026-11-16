import test from 'node:test';
import assert from 'node:assert/strict';
import {createPokemon} from '../src/team.js';
import {startBattle,playTurn} from '../src/battle.js';
function battle(ability,move){const own=createPokemon(1,{level:40}),enemy=createPokemon(4,{level:40});own.moves=[33];enemy.moves=[move];const b=startBattle(own,enemy);b.player.pokemon.abilityId=ability;b.player.pokemon.stats.speed=1;b.opponent.pokemon.stats.speed=999;return b}
const cases=[
 [31,85,'specialAttack'],[114,55,'specialAttack'],[157,75,'attack'],[78,85,'speed']
];
for(const [ability,move,stat] of cases)test(`Absorption ${ability} verhindert Schaden und steigert ${stat}`,()=>{const b=battle(ability,move);const hp=b.player.pokemon.currentHp;playTurn(b,0,0,{rng:()=>0.5});assert.equal(b.player.stages[stat],1);assert.equal(b.player.pokemon.currentHp,hp)});
test('Trockenheit absorbiert Wasser und heilt',()=>{const b=battle(87,55);b.player.pokemon.currentHp-=20;const hp=b.player.pokemon.currentHp;playTurn(b,0,0,{rng:()=>0.5});assert.ok(b.player.pokemon.currentHp>hp)});
