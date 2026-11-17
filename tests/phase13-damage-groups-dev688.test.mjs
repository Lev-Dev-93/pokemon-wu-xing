import test from 'node:test';
import assert from 'node:assert/strict';
import {createPokemon} from '../src/team.js';
import {startBattle,playTurn} from '../src/battle.js';
const rng=()=>0.01;
function setup(move, own=1, foe=1){const a=createPokemon(own,{level:30}),b=createPokemon(foe,{level:30});a.moves=[move];b.moves=[150];const battle=startBattle(a,b);battle.player.pp=[20];battle.opponent.pp=[20];return battle;}
function strike(b){const hp=b.opponent.pokemon.currentHp;playTurn(b,0,0,{rng});return hp-b.opponent.pokemon.currentHp;}
test('Ultraschall/Sonic Boom verursacht genau 20 KP',()=>{const b=setup(49);assert.equal(strike(b),20)});
test('Drachenwut verursacht genau 40 KP',()=>{const b=setup(82);assert.equal(strike(b),40)});
test('Geowurf verursacht Schaden entsprechend dem Level',()=>{const b=setup(69);assert.equal(strike(b),30)});
test('Nachtnebel verursacht Schaden entsprechend dem Level',()=>{const b=setup(101);assert.equal(strike(b),30)});
test('Typimmunität gilt auch für festen Schaden',()=>{const b=setup(69,1,92);assert.equal(strike(b),0)});
test('Superzahn halbiert die aktuellen KP, abgerundet',()=>{const b=setup(162);b.opponent.pokemon.currentHp=61;assert.equal(strike(b),30)});
test('Notsituation reduziert Ziel-KP auf eigene KP',()=>{const b=setup(283);b.player.pokemon.currentHp=18;b.opponent.pokemon.currentHp=61;assert.equal(strike(b),43)});
test('Notsituation verursacht keinen Schaden bei niedrigeren Ziel-KP',()=>{const b=setup(283);b.player.pokemon.currentHp=61;b.opponent.pokemon.currentHp=18;assert.equal(strike(b),0)});
test('Wachstum steigert bei Sonne beide Angriffswerte um zwei Stufen',()=>{const b=setup(74);b.weather='sun';b.weatherTurns=5;strike(b);assert.equal(b.player.stages.attack,2);assert.equal(b.player.stages.specialAttack,2)});
test('Wachstum steigert ohne Sonne beide Angriffswerte um eine Stufe',()=>{const b=setup(74);strike(b);assert.equal(b.player.stages.attack,1);assert.equal(b.player.stages.specialAttack,1)});
test('Klärsmog setzt nach Treffer alle Ziel-Stufen zurück',()=>{const b=setup(499);b.opponent.stages.attack=4;b.opponent.stages.speed=-2;assert.ok(strike(b)>0);assert.equal(b.opponent.stages.attack,0);assert.equal(b.opponent.stages.speed,0)});
test('Klärsmog setzt bei Schutzschild keine Ziel-Stufen zurück',()=>{const b=setup(499);b.opponent.stages.attack=4;b.opponent.pokemon.moves=[182];b.opponent.pp=[20];strike(b);assert.equal(b.opponent.stages.attack,4)});
