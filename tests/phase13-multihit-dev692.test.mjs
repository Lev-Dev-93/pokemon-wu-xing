import test from 'node:test';
import assert from 'node:assert/strict';
import {multiHitCount} from '../src/multi-hit-rules.js';
import {createPokemon} from '../src/team.js';
import {startBattle,playTurn} from '../src/battle.js';
for(const [roll,expected] of [[0,2],[0.349,2],[0.35,3],[0.699,3],[0.7,4],[0.849,4],[0.85,5],[0.999,5]]){
 test(`Mehrfachtreffer-Verteilung ${roll}`,()=>assert.equal(multiHitCount(3,0,()=>roll),expected));
}
test('Wertelink erzwingt fünf Treffer bei variablen Attacken',()=>assert.equal(multiHitCount(3,92,()=>0),5));
test('Wertelink verändert feste Zweifachtreffer nicht',()=>assert.equal(multiHitCount(24,92,()=>0),2));
test('Einzeltreffer bleiben von Wertelink unberührt',()=>assert.equal(multiHitCount(33,92,()=>0),1));
test('Wertelink wirkt im echten Kampf und verbraucht nur einmal AP',()=>{
 const p=createPokemon(1,{level:45}),e=createPokemon(4,{level:45});p.moves=[3];e.moves=[33];
 const b=startBattle(p,e);b.player.pokemon.abilityId=92;b.player.pp=[10];b.opponent.pp=[10];b.player.pokemon.stats.speed=999;b.opponent.pokemon.stats.speed=1;
 b.opponent.pokemon.stats.hp=10000;b.opponent.pokemon.currentHp=10000;
 playTurn(b,0,0,{rng:()=>0.01});
 assert.ok(b.log.some(x=>x.includes('5 Treffer!')),JSON.stringify(b.log));assert.equal(b.player.pp[0],9);
});
test('Ohne Wertelink liefert derselbe Kampf zwei Treffer',()=>{
 const p=createPokemon(1,{level:45}),e=createPokemon(4,{level:45});p.moves=[3];e.moves=[33];
 const b=startBattle(p,e);b.player.pokemon.abilityId=1;b.player.pp=[10];b.opponent.pp=[10];b.player.pokemon.stats.speed=999;b.opponent.pokemon.stats.speed=1;
 b.opponent.pokemon.stats.hp=10000;b.opponent.pokemon.currentHp=10000;
 playTurn(b,0,0,{rng:()=>0.01});assert.ok(b.log.some(x=>x.includes('2 Treffer!')),JSON.stringify(b.log));
});
