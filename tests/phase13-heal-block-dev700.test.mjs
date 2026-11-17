import test from 'node:test';
import assert from 'node:assert/strict';
import {createPokemon} from '../src/team.js';
import {startBattle,playTurn} from '../src/battle.js';
function battle(item='leftovers'){
 const a=createPokemon(1,{level:40,heldItemId:item});const e=createPokemon(4,{level:40});
 a.moves=[150];e.moves=[150];const b=startBattle(a,e);
 b.player.pokemon.currentHp-=30;
 return b;
}
const turn=b=>playTurn(b,0,0,{rng:()=>0.5});
test('Überreste heilen ohne Heilblockade',()=>{const b=battle();const before=b.player.pokemon.currentHp;turn(b);assert.ok(b.player.pokemon.currentHp>before)});
test('Heilblockade verhindert Überreste während der vollen verbleibenden Runde',()=>{const b=battle();const before=b.player.pokemon.currentHp;b.player.volatile.healBlockTurns=1;turn(b);assert.equal(b.player.pokemon.currentHp,before);assert.equal(b.player.volatile.healBlockTurns,0);turn(b);assert.ok(b.player.pokemon.currentHp>before)});
test('Heilblockade verhindert Wasserring und Verwurzler',()=>{const b=battle(null);b.player.volatile.aquaRing=true;b.player.volatile.ingrained=true;b.player.volatile.healBlockTurns=2;const before=b.player.pokemon.currentHp;turn(b);assert.equal(b.player.pokemon.currentHp,before)});
test('Heilblockade verhindert Wunschtraum bei Auslösung',()=>{const b=battle(null);b.player.volatile.healBlockTurns=2;b.playerSideFields.wishTurns=1;b.playerSideFields.wishHeal=30;const before=b.player.pokemon.currentHp;turn(b);assert.equal(b.player.pokemon.currentHp,before);assert.equal(b.playerSideFields.wishTurns,0)});
test('Aufheber verursacht auch unter Heilblockade keinen Giftschaden',()=>{const b=battle(null);b.player.pokemon.abilityId=90;b.player.pokemon.status='poison';b.player.volatile.healBlockTurns=2;const before=b.player.pokemon.currentHp;turn(b);assert.equal(b.player.pokemon.currentHp,before)});
