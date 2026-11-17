import test from 'node:test';
import assert from 'node:assert/strict';
import {createPokemon} from '../src/team.js';
import {startBattle,playTurn} from '../src/battle.js';
function setup(move){const b=startBattle(createPokemon(1,35),createPokemon(4,35));b.player.pokemon.moves=[move];b.player.pp=[20];b.opponent.pokemon.moves=[150];b.opponent.pp=[20];return b}
function turn(b){return playTurn(b,0,0,{rng:()=>0.4})}
for(const [move,stats] of [[294,{specialAttack:3}],[322,{defense:1,specialDefense:1}],[339,{attack:1,defense:1}]])test(`Statuswert-Attacke ${move} erhöht die korrekten Stufen`,()=>{const b=setup(move);turn(b);for(const [stat,value] of Object.entries(stats))assert.equal(b.player.stages[stat],value)});
test('Giftpuder vergiftet und scheitert an Gift-Immunität',()=>{const b=setup(77);turn(b);assert.equal(b.opponent.pokemon.status,'poison');const c=setup(77);c.opponent.pokemon.speciesId=1; c.opponent.pokemon.status='healthy';turn(c);assert.notEqual(c.opponent.pokemon.status,'poison')});
test('Stachelspore verursacht Paralyse',()=>{const b=setup(78);turn(b);assert.equal(b.opponent.pokemon.status,'paralysis')});
for(const move of [215,312])test(`Heilattacke ${move} heilt Status des aktiven Pokémon`,()=>{const b=setup(move);b.player.pokemon.status='poison';b.player.pokemon.toxicCounter=3;turn(b);assert.equal(b.player.pokemon.status,'healthy');assert.equal(b.player.pokemon.toxicCounter,0)});
test('Taumeltanz verwirrt beide aktiven Pokémon',()=>{const b=setup(298);turn(b);assert.ok(b.player.volatile.confusionTurns>0);assert.ok(b.opponent.volatile.confusionTurns>0)});
test('Rückenwind wird für das eigene Team angelegt und zählt herunter',()=>{const b=setup(366);turn(b);assert.equal(b.player.volatile.tailwindTurns,3);assert.equal(b.playerSideFields.tailwindTurns,3)});
test('Wunschtraum heilt erst am Ende der nächsten Runde',()=>{const b=setup(273);b.player.pokemon.currentHp=Math.max(1,b.player.pokemon.currentHp-30);const before=b.player.pokemon.currentHp;turn(b);assert.equal(b.player.pokemon.currentHp,before);assert.equal(b.player.volatile.wishTurns,1);b.player.pokemon.moves=[150];turn(b);assert.ok(b.player.pokemon.currentHp>before);assert.equal(b.player.volatile.wishTurns,0)});
