import test from 'node:test';
import assert from 'node:assert/strict';
import {createPokemon} from '../src/team.js';
import {startBattle,playTurn} from '../src/battle.js';
function battle(move=182,enemyMove=33){const a=createPokemon(1,{level:40}),e=createPokemon(4,{level:40});a.moves=[move,33];e.moves=[enemyMove];const b=startBattle(a,e);b.player.pp=[10,30];b.opponent.pp=[30];return b}
test('Schutzschild blockiert Schaden und kostet einen AP',()=>{const b=battle();const hp=b.player.pokemon.currentHp;playTurn(b,0,0,{rng:()=>0.1});assert.equal(b.player.pokemon.currentHp,hp);assert.equal(b.player.pp[0],9);assert.ok(b.log.some(x=>x.includes('schützt sich vor der Attacke')))});
test('Scanner schützt genauso wie Schutzschild',()=>{const b=battle(197);const hp=b.player.pokemon.currentHp;playTurn(b,0,0,{rng:()=>0.1});assert.equal(b.player.pokemon.currentHp,hp)});
test('Schutzschild blockiert gegnerische Statusattacken',()=>{const b=battle(182,45);const attack=b.player.stages.attack;playTurn(b,0,0,{rng:()=>0.1});assert.equal(b.player.stages.attack,attack)});
test('Wiederholter Schutz kann fehlschlagen',()=>{const b=battle();playTurn(b,0,0,{rng:()=>0.1});const hp=b.player.pokemon.currentHp;playTurn(b,0,0,{rng:()=>0.99});assert.ok(b.player.pokemon.currentHp<hp);assert.ok(b.log.includes('Der Schutz ist fehlgeschlagen.'))});
test('Andere Attacke setzt Schutzschild-Erfolgsfolge zurück',()=>{const b=battle();playTurn(b,0,0,{rng:()=>0.1});playTurn(b,1,0,{rng:()=>0.1});playTurn(b,0,0,{rng:()=>0.99});assert.ok(b.log.some(x=>x.includes('schützt sich vor gegnerischen Attacken')))});
test('Schutzschild endet nach dem Zug',()=>{const b=battle();playTurn(b,0,0,{rng:()=>0.1});const hp=b.player.pokemon.currentHp;playTurn(b,1,0,{rng:()=>0.1});assert.ok(b.player.pokemon.currentHp<hp)});
