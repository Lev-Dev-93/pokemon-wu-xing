import test from 'node:test';
import assert from 'node:assert/strict';
import {createPokemon} from '../src/team.js';
import {startBattle,playTurn} from '../src/battle.js';
const rng=()=>0.01;
function battle(move,opponentMove=33){const p=createPokemon(4,{level:30}),e=createPokemon(1,{level:30});p.moves=[move];e.moves=[opponentMove];const b=startBattle(p,e);b.player.pp=[30];b.opponent.pp=[35];return b;}
test('Drachentanz steigert Angriff und Initiative',()=>{const b=battle(349);playTurn(b,0,0,{rng});assert.equal(b.player.stages.attack,1);assert.equal(b.player.stages.speed,1)});
test('Hausbruch erhöht drei Werte und senkt zwei',()=>{const b=battle(504);playTurn(b,0,0,{rng});assert.deepEqual([b.player.stages.attack,b.player.stages.specialAttack,b.player.stages.speed,b.player.stages.defense,b.player.stages.specialDefense],[2,2,2,-1,-1])});
test('Dunkelnebel entfernt positive und negative Stufen beider Seiten',()=>{const b=battle(114);b.player.stages.attack=4;b.opponent.stages.speed=-3;playTurn(b,0,0,{rng});assert.equal(b.player.stages.attack,0);assert.equal(b.opponent.stages.speed,0)});
test('Erholung heilt und schläfert den Anwender ein',()=>{const b=battle(156);b.player.pokemon.currentHp-=15;playTurn(b,0,0,{rng});assert.equal(b.player.pokemon.status,'sleep');assert.equal(b.player.volatile.sleepTurns,2);assert.ok(b.player.pokemon.currentHp>0)});
test('Irrlicht verursacht Verbrennung',()=>{const b=battle(261);playTurn(b,0,0,{rng});assert.equal(b.opponent.pokemon.status,'burn')});
test('Schlafpuder schläfert ein',()=>{const b=battle(79);playTurn(b,0,0,{rng});assert.equal(b.opponent.pokemon.status,'sleep')});
test('Stufensteigerungen bleiben bei +6 gedeckelt',()=>{const b=battle(417);b.player.stages.specialAttack=5;playTurn(b,0,0,{rng});assert.equal(b.player.stages.specialAttack,6)});
test('Aufheber wandelt Giftschaden in Heilung um',()=>{const b=battle(106);b.player.pokemon.abilityId=90;b.player.pokemon.status='poison';b.player.pokemon.currentHp-=20;const hp=b.player.pokemon.currentHp;playTurn(b,0,0,{rng});assert.ok(b.player.pokemon.currentHp>hp);assert.match(b.log.join(' '),/Aufheber/)});
