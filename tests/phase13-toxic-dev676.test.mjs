import test from 'node:test';
import assert from 'node:assert/strict';
import {createPokemon} from '../src/team.js';
import {startBattle,playTurn} from '../src/battle.js';
import {entryHazards} from '../src/battle-hazards.js';
import {switchTeamPokemon} from '../src/battle-switch.js';
function setup(){const b=startBattle(createPokemon(1,30),createPokemon(4,30));b.player.pokemon.moves=[150];b.player.pp=[40];b.opponent.pokemon.moves=[150];b.opponent.pp=[40];return b}
function turn(b){playTurn(b,0,0,{rng:()=>0.4})}
test('Toxin setzt schwere Vergiftung und den Anfangszähler',()=>{const b=setup();b.player.pokemon.moves=[92];b.player.pp=[20];turn(b);assert.equal(b.opponent.pokemon.status,'poison');assert.equal(b.opponent.pokemon.toxicCounter,2)});
test('Schwere Vergiftung steigert den Schaden je Runde',()=>{const b=setup();b.player.pokemon.status='poison';b.player.pokemon.toxicCounter=1;const hp=b.player.pokemon.stats.hp;const before=b.player.pokemon.currentHp;turn(b);const first=before-b.player.pokemon.currentHp;turn(b);const second=before-first-b.player.pokemon.currentHp;assert.equal(first,Math.max(1,Math.floor(hp/16)));assert.equal(second,Math.max(1,Math.floor(hp*2/16)))});
test('Normale Vergiftung bleibt konstant',()=>{const b=setup();b.player.pokemon.status='poison';const before=b.player.pokemon.currentHp;turn(b);const first=before-b.player.pokemon.currentHp;turn(b);const second=before-first-b.player.pokemon.currentHp;assert.equal(first,second)});
test('Zwei Giftspitzen-Schichten verursachen schwere Vergiftung',()=>{const b=setup();b.opponentSideFields.toxicSpikes=2;entryHazards(b,'opponentSideFields',b.opponent);assert.equal(b.opponent.pokemon.toxicCounter,1)});
test('Ein Pokémon-Wechsel setzt den Giftzähler zurück',()=>{const team=[createPokemon(1),createPokemon(4)];const b=startBattle(team[0],createPokemon(7));b.player.pokemon.status='poison';b.player.pokemon.toxicCounter=5;switchTeamPokemon(b,team,0,1);assert.equal(team[0].toxicCounter,0);assert.equal(team[0].status,'poison')});
