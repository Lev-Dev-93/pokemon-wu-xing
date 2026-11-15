import test from 'node:test';
import assert from 'node:assert/strict';
import {createPokemon} from '../src/team.js';
import {startBattle} from '../src/battle.js';
import {switchTeamPokemon,availableSwitches} from '../src/battle-switch.js';

test('wechsel bewahrt KP und AP des bisherigen Pokémon',()=>{
 const team=[createPokemon(1),createPokemon(4)];const b=startBattle(team[0],createPokemon(7));const cache=new Map();
 b.player.pokemon.currentHp-=3;b.player.pp[0]--;
 let active=switchTeamPokemon(b,team,0,1,cache);
 assert.equal(team[0].currentHp,team[0].stats.hp-3);
 assert.equal(active,1);
 active=switchTeamPokemon(b,team,active,0,cache);
 assert.equal(b.player.pokemon.currentHp,team[0].stats.hp-3);
 assert.equal(b.player.pp[0],cache.get(0).pp[0]);
});
test('kampfunfähige Teammitglieder können nicht eingewechselt werden',()=>{
 const team=[createPokemon(1),createPokemon(4)];team[1].currentHp=0;
 const b=startBattle(team[0],createPokemon(7));
 assert.equal(availableSwitches(team,0).length,0);
 assert.throws(()=>switchTeamPokemon(b,team,0,1),/nicht kampffähig/);
});
test('nach KO kann ein Reservemitglied den Kampf fortsetzen',()=>{
 const team=[createPokemon(1),createPokemon(4)];const b=startBattle(team[0],createPokemon(7));
 b.player.pokemon.currentHp=0;b.finished=true;b.winner='opponent';
 const next=switchTeamPokemon(b,team,0,1);
 assert.equal(next,1);assert.equal(b.finished,false);assert.equal(b.winner,null);
});
test('kein Wechsel nach einem Sieg oder auf denselben Platz',()=>{
 const team=[createPokemon(1),createPokemon(4)];const b=startBattle(team[0],createPokemon(7));
 assert.throws(()=>switchTeamPokemon(b,team,0,0),/Ungültiger/);
 b.finished=true;b.winner='player';
 assert.throws(()=>switchTeamPokemon(b,team,0,1),/bereits beendet/);
});
