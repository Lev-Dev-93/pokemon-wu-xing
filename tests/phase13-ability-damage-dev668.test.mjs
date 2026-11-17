import test from 'node:test';
import assert from 'node:assert/strict';
import {pinchAbilityMultiplier,stabAbilityMultiplier,effectivenessAbilityMultiplier,fullHpDefenseMultiplier} from '../src/ability-effects.js';
import {createPokemon} from '../src/team.js';
import {startBattle,playTurn} from '../src/battle.js';
const f=(abilityId,hp=30,max=90)=>({pokemon:{abilityId,currentHp:hp,stats:{hp:max}}});
test('Vier Notfallfähigkeiten aktivieren sich nur bei höchstens einem Drittel KP und passendem Typ',()=>{
 for(const [id,type] of [[65,12],[66,10],[67,11],[68,7]]){
  assert.equal(pinchAbilityMultiplier(f(id,30),{typeId:type}),1.5);
  assert.equal(pinchAbilityMultiplier(f(id,31),{typeId:type}),1);
  assert.equal(pinchAbilityMultiplier(f(id,30),{typeId:1}),1);
  assert.equal(pinchAbilityMultiplier(f(id,0),{typeId:type}),1);
 }
});
test('Anpassung erhöht STAB auf 2 und verleiht keinen fremden STAB',()=>{
 assert.equal(stabAbilityMultiplier(f(91),{},true),2);
 assert.equal(stabAbilityMultiplier(f(91),{},false),1);
 assert.equal(stabAbilityMultiplier(f(1),{},true),1.5);
});
test('Aufwertung verstärkt nur nicht sehr effektive Treffer, Filter und Felskern nur sehr effektive',()=>{
 assert.equal(effectivenessAbilityMultiplier(f(110),f(1),0.5),2);
 assert.equal(effectivenessAbilityMultiplier(f(110),f(1),0),1);
 for(const id of [111,116]){
  assert.equal(effectivenessAbilityMultiplier(f(1),f(id),2),0.75);
  assert.equal(effectivenessAbilityMultiplier(f(1),f(id),1),1);
 }
});
test('Multischuppe halbiert nur bei vollen KP',()=>{
 assert.equal(fullHpDefenseMultiplier(f(136,90)),0.5);
 assert.equal(fullHpDefenseMultiplier(f(136,89)),1);
 assert.equal(fullHpDefenseMultiplier(f(1,90)),1);
});
test('Kampfintegration: Anpassung verursacht mit STAB mehr Schaden',()=>{
 const base=createPokemon(4,{level:25}),enemy=createPokemon(1,{level:25});
 base.moves=[52];enemy.moves=[33];
 const b1=startBattle(base,enemy),b2=startBattle(base,enemy);
 b1.player.pokemon.abilityId=91;
 for(const b of [b1,b2]){b.player.pokemon.stats.speed=999; b.opponent.pokemon.stats.speed=1;}
 // Kampfobjekte sind nach dem Start isoliert und können für die Regelprüfung manipuliert werden.
 playTurn(b1,0,0,{rng:()=>0.5});playTurn(b2,0,0,{rng:()=>0.5});
 assert.ok(b1.opponent.pokemon.currentHp<b2.opponent.pokemon.currentHp);
});
