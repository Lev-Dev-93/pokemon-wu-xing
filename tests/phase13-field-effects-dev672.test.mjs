import test from 'node:test';
import assert from 'node:assert/strict';
import {createPokemon} from '../src/team.js';
import {startBattle,playTurn} from '../src/battle.js';
const rng=()=>0.5;
function battle(move,enemyMove=33){const p=createPokemon(4,{level:35}),e=createPokemon(1,{level:35});p.moves=[move];e.moves=[enemyMove];return startBattle(p,e)}
test('Reflektor reduziert physischen Schaden und hat begrenzte Dauer',()=>{const b=battle(115);playTurn(b,0,0,{rng});assert.equal(b.player.volatile.reflectTurns,4);assert.match(b.log.join(' '),/Reflektor/);for(let i=0;i<4&& !b.finished;i++)playTurn(b,0,0,{rng});assert.equal(b.player.volatile.reflectTurns,0)});
test('Lichtschild wird unabhängig von Reflektor aktiviert',()=>{const b=battle(113);playTurn(b,0,0,{rng});assert.equal(b.player.volatile.lightScreenTurns,4);assert.equal(b.player.volatile.reflectTurns,0)});
test('Bodyguard blockiert Statusveränderung durch gegnerische Attacke',()=>{const b=battle(219,86);playTurn(b,0,0,{rng});assert.equal(b.player.pokemon.status===null||b.player.pokemon.status==='healthy',true);assert.match(b.log.join(' '),/Bodyguard/)});
test('Weißnebel blockiert gegnerische Kampfstufensenkung',()=>{const b=battle(54,45);playTurn(b,0,0,{rng});assert.equal(b.player.stages.attack,0);assert.match(b.log.join(' '),/Weißnebel/)});
test('Eigene Feldattacke wird nicht durch gegnerischen Schutzschild blockiert',()=>{const b=battle(115,182);playTurn(b,0,0,{rng});assert.equal(b.player.volatile.reflectTurns,4)});
