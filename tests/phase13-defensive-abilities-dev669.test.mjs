import test from 'node:test';
import assert from 'node:assert/strict';
import {wonderGuardBlocks,sturdySurvivalHp} from '../src/ability-effects.js';
import {createPokemon} from '../src/team.js';
import {startBattle,playTurn} from '../src/battle.js';
const f=(id,hp=40,max=40)=>({pokemon:{abilityId:id,currentHp:hp,stats:{hp:max}}});
test('Wunderwache blockiert neutrale und ineffektive Schadensattacken, nicht sehr effektive',()=>{
 const m={power:40,category:2};
 assert.equal(wonderGuardBlocks(f(25),1,m),true);
 assert.equal(wonderGuardBlocks(f(25),0.5,m),true);
 assert.equal(wonderGuardBlocks(f(25),2,m),false);
 assert.equal(wonderGuardBlocks(f(25),1,{power:0,category:1}),false);
 assert.equal(wonderGuardBlocks(f(5),1,m),false);
});
test('Robustheit rettet bei vollen KP vor direktem K.-o., aber nicht bei angeschlagenen KP',()=>{
 assert.equal(sturdySurvivalHp(f(5),40),39);
 assert.equal(sturdySurvivalHp(f(5),100),39);
 assert.equal(sturdySurvivalHp(f(5),39),39);
 assert.equal(sturdySurvivalHp(f(5,39),100),100);
 assert.equal(sturdySurvivalHp(f(1),100),100);
});
test('Integration: Robustheit verhindert einen tödlichen Ersttreffer',()=>{
 const a=createPokemon(4,{level:35}),d=createPokemon(1,{level:5});
 a.moves=[52];d.moves=[33];
 const b=startBattle(a,d);b.opponent.pokemon.abilityId=5;
 b.player.pokemon.stats.speed=999;b.opponent.pokemon.stats.speed=1;
 b.player.pokemon.stats.specialAttack=9999;
 playTurn(b,0,0,{rng:()=>0.5});
 assert.equal(b.opponent.pokemon.currentHp,1);
 assert.ok(b.log.some(x=>x.includes('Robustheit')));
});
test('Integration: Wunderwache blockiert neutralen Schaden',()=>{
 const a=createPokemon(4,{level:20}),d=createPokemon(1,{level:20});
 a.moves=[33];d.moves=[33];
 const b=startBattle(a,d);b.opponent.pokemon.abilityId=25;
 b.player.pokemon.stats.speed=999;b.opponent.pokemon.stats.speed=1;
 const hp=b.opponent.pokemon.currentHp;
 playTurn(b,0,0,{rng:()=>0.5});
 assert.equal(b.opponent.pokemon.currentHp,hp);
});
