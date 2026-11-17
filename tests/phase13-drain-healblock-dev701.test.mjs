import test from 'node:test';
import assert from 'node:assert/strict';
import {createPokemon} from '../src/team.js';
import {startBattle,playTurn} from '../src/battle.js';
function setup(){
 const a=createPokemon(1,{level:40}),e=createPokemon(4,{level:40});
 a.moves=[71];e.moves=[150];
 const b=startBattle(a,e);b.player.pokemon.currentHp-=30;
 return b;
}
const turn=b=>playTurn(b,0,0,{rng:()=>0.5});
test('Absorber heilt ohne Heilblockade nach erfolgreichem Treffer',()=>{const b=setup();const hp=b.player.pokemon.currentHp;turn(b);assert.ok(b.player.pokemon.currentHp>hp);});
test('Absorber verursacht Schaden, heilt aber nicht unter Heilblockade',()=>{const b=setup();b.player.volatile.healBlockTurns=2;const own=b.player.pokemon.currentHp,enemy=b.opponent.pokemon.currentHp;turn(b);assert.equal(b.player.pokemon.currentHp,own);assert.ok(b.opponent.pokemon.currentHp<enemy);});
test('Absorber heilt wieder nach Ablauf der Heilblockade',()=>{const b=setup();b.player.volatile.healBlockTurns=1;const hp=b.player.pokemon.currentHp;turn(b);assert.equal(b.player.pokemon.currentHp,hp);turn(b);assert.ok(b.player.pokemon.currentHp>hp);});
