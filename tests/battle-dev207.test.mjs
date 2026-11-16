import test from 'node:test';
import assert from 'node:assert/strict';
import {createPokemon} from '../src/team.js';
import {startBattle,playTurn} from '../src/battle.js';
test('Einfrieren kann mit 20 Prozent auftauen',()=>{const a=createPokemon(1,{level:20});const b=createPokemon(4,{level:20});a.status='freeze';const fight=startBattle(a,b);playTurn(fight,0,0,{rng:()=>0.1});assert.notEqual(fight.player.pokemon.status,'freeze');});
test('Verwirrung endet vor einem weiteren Selbsttreffer',()=>{const a=createPokemon(1,{level:20});const b=createPokemon(4,{level:20});const fight=startBattle(a,b);fight.player.volatile.confusionTurns=1;playTurn(fight,0,0,{rng:()=>0.1});assert.equal(fight.player.volatile.confusionTurns,0);});
