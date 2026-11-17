import test from 'node:test';
import assert from 'node:assert/strict';
import {createPokemon} from '../src/team.js';
import {startBattle,playTurn} from '../src/battle.js';
function setup(move=150){const b=startBattle(createPokemon(1,35),createPokemon(4,35));b.player.pokemon.moves=[move];b.player.pp=[30];b.opponent.pokemon.moves=[150];b.opponent.pp=[30];return b}
function turn(b){playTurn(b,0,0,{rng:()=>0.4})}
test('Kraftschub steigert Angriff und Spezial-Angriff',()=>{const b=setup(526);turn(b);assert.equal(b.player.stages.attack,1);assert.equal(b.player.stages.specialAttack,1)});
test('Einigler steigert Verteidigung',()=>{const b=setup(111);turn(b);assert.equal(b.player.stages.defense,1)});
test('Psycho-Plus kopiert sämtliche Kampfwertstufen',()=>{const b=setup(244);b.opponent.stages.attack=3;b.opponent.stages.speed=-2;turn(b);assert.equal(b.player.stages.attack,3);assert.equal(b.player.stages.speed,-2)});
test('Schutztausch vertauscht beide Verteidigungsstufen',()=>{const b=setup(385);b.player.stages.defense=2;b.opponent.stages.defense=-1;b.player.stages.specialDefense=1;b.opponent.stages.specialDefense=3;turn(b);assert.equal(b.player.stages.defense,-1);assert.equal(b.opponent.stages.defense,2);assert.equal(b.player.stages.specialDefense,3)});
test('Akupressur steigert einen verfügbaren Wert um zwei',()=>{const b=setup(367);turn(b);assert.equal(Object.values(b.player.stages).filter(x=>x===2).length,1)});
test('Heilbefehl heilt bis zur KP-Grenze',()=>{const b=setup(456);b.player.pokemon.currentHp-=10;turn(b);assert.equal(b.player.pokemon.currentHp,b.player.pokemon.stats.hp)});
test('Neutraltorso verhindert gegnerische Angriffssenkung',()=>{const b=setup(150);b.opponent.pokemon.moves=[45];b.opponent.pokemon.abilityId=29; b.player.pokemon.abilityId=29;turn(b);assert.equal(b.player.stages.attack,0)});
test('Scherenmacht schützt Angriff, nicht Verteidigung',()=>{const b=setup(150);b.opponent.pokemon.moves=[45];b.player.pokemon.abilityId=52;turn(b);assert.equal(b.player.stages.attack,0);b.opponent.pokemon.moves=[39];turn(b);assert.equal(b.player.stages.defense,-1)});
test('Weißer Rauch verhindert gegnerische Verteidigungssenkung',()=>{const b=setup(150);b.opponent.pokemon.moves=[39];b.player.pokemon.abilityId=73;turn(b);assert.equal(b.player.stages.defense,0)});
test('Adlerauge verhindert gegnerische Genauigkeitssenkung',()=>{const b=setup(150);b.opponent.pokemon.moves=[28];b.player.pokemon.abilityId=51;turn(b);assert.equal(b.player.stages.accuracy,0)});
