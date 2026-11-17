import test from 'node:test';
import assert from 'node:assert/strict';
import {createPokemon} from '../src/team.js';
import {startBattle,playTurn} from '../src/battle.js';
const rng=()=>0.01;
function setup(move){const a=createPokemon(1,{level:40}),b=createPokemon(4,{level:40});a.moves=[move,33];b.moves=[150];const battle=startBattle(a,b);battle.player.pp=[10,10];battle.opponent.pp=[20];battle.player.pokemon.stats.speed=999;battle.opponent.pokemon.stats.hp=999;battle.opponent.pokemon.currentHp=999;return battle;}
for(const [id,name] of [[13,'Klingensturm'],[130,'Schädelwumme'],[143,'Himmelsfeger'],[76,'Solarstrahl'],[19,'Fliegen'],[91,'Schaufler'],[291,'Taucher'],[340,'Sprungfeder']]){
 test(`${name}: Vorbereitungsrunde, erzwungene Ausführung und einmaliger AP-Verbrauch`,()=>{
  const b=setup(id);const hp=b.opponent.pokemon.currentHp;
  playTurn(b,0,0,{rng});assert.equal(b.player.volatile.solarChargeIndex,0);assert.equal(b.player.pp[0],9);assert.equal(b.opponent.pokemon.currentHp,hp);
  playTurn(b,1,0,{rng});assert.equal(b.player.volatile.solarChargeIndex,null);assert.equal(b.player.pp[0],9);assert.equal(b.player.pp[1],10);assert.ok(b.opponent.pokemon.currentHp<hp);
 });
}
test('Schädelwumme erhöht Verteidigung genau einmal in der Vorbereitungsrunde',()=>{
 const b=setup(130);playTurn(b,0,0,{rng});assert.equal(b.player.stages.defense,1);playTurn(b,0,0,{rng});assert.equal(b.player.stages.defense,1);
});

for(const [id,name] of [[19,'Fliegen'],[91,'Schaufler'],[291,'Taucher'],[340,'Sprungfeder']]){
 test(`${name}: während der Vorbereitung kann ein gewöhnlicher Angriff nicht treffen`,()=>{
  const b=setup(id);b.opponent.pokemon.moves=[33];b.opponent.pp=[20];b.opponent.pokemon.stats.attack=999;
  const hp=b.player.pokemon.currentHp;playTurn(b,0,0,{rng});assert.equal(b.player.pokemon.currentHp,hp);
 });
}
