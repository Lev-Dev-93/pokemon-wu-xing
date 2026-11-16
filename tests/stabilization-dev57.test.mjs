import test from 'node:test';
import assert from 'node:assert/strict';
import {createPokemon} from '../src/team.js';
import {startBattle} from '../src/battle.js';
import {switchTeamPokemon} from '../src/battle-switch.js';

function setup(){const team=[createPokemon(1),createPokemon(4)];return {team,battle:startBattle(team[0],createPokemon(7)),fighters:new Map()}}
test('Kampfwertstufen werden beim Auswechseln zurückgesetzt und bleiben nicht im Cache',()=>{
 const {team,battle,fighters}=setup();battle.player.stages.attack=4;battle.player.stages.accuracy=-3;
 switchTeamPokemon(battle,team,0,1,fighters);
 assert.equal(fighters.get(0).stages.attack,0);assert.equal(fighters.get(0).stages.accuracy,0);
 switchTeamPokemon(battle,team,1,0,fighters);
 assert.equal(battle.player.stages.attack,0);assert.equal(battle.player.stages.accuracy,0);
});
test('flüchtige Effekte verschwinden beim Wechsel, einschließlich Egelsamen und Feuerfänger',()=>{
 const {team,battle,fighters}=setup();Object.assign(battle.player.volatile,{seeded:true,protected:true,enduring:true,ingrained:true,aquaRing:true,flashFireBoost:true,confusionTurns:3,protectStreak:2,solarChargeIndex:0});
 switchTeamPokemon(battle,team,0,1,fighters);switchTeamPokemon(battle,team,1,0,fighters);
 for(const key of ['seeded','protected','enduring','ingrained','aquaRing','flashFireBoost'])assert.equal(battle.player.volatile[key],false,key);
 assert.equal(battle.player.volatile.confusionTurns,0);assert.equal(battle.player.volatile.protectStreak,0);assert.equal(battle.player.volatile.solarChargeIndex,null);
});
test('KP, AP und dauerhaftes Statusproblem überleben mehrere Wechsel',()=>{
 const {team,battle,fighters}=setup();battle.player.pokemon.currentHp-=4;battle.player.pokemon.status='poison';battle.player.pp[0]--;
 const hp=battle.player.pokemon.currentHp,pp=battle.player.pp[0];switchTeamPokemon(battle,team,0,1,fighters);switchTeamPokemon(battle,team,1,0,fighters);
 assert.equal(battle.player.pokemon.currentHp,hp);assert.equal(battle.player.pp[0],pp);assert.equal(battle.player.pokemon.status,'poison');
});
test('bereits zwischengespeicherte Kampfwerte werden beim Wiedereinwechseln normalisiert',()=>{
 const {team,battle,fighters}=setup();fighters.set(1,{pokemon:structuredClone(team[1]),pp:[...battle.player.pp],stages:{attack:6,accuracy:4},volatile:{seeded:true,flashFireBoost:true}});
 switchTeamPokemon(battle,team,0,1,fighters);
 assert.equal(battle.player.stages.attack,0);assert.equal(battle.player.stages.accuracy,0);assert.equal(battle.player.volatile.seeded,false);assert.equal(battle.player.volatile.flashFireBoost,false);
});
