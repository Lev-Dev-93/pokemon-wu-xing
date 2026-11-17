import test from 'node:test';
import assert from 'node:assert/strict';
import {createPokemon} from '../src/team.js';
import {startBattle,playTurn} from '../src/battle.js';
import {switchTeamPokemon} from '../src/battle-switch.js';
function setup(move){const team=[createPokemon(1,35),createPokemon(4,35),createPokemon(7,35)];const b=startBattle(team[0],createPokemon(10,35));b.playerTeam=team;b.playerTeamIndex=0;b.player.pokemon.moves=[move];b.player.pp=[20];b.opponent.pokemon.moves=[150];b.opponent.pp=[20];return {b,team}}
const turn=b=>playTurn(b,0,0,{rng:()=>0.4});
for(const move of [215,312])test(`Teamheilung ${move} heilt aktive und Reserve-Pokémon`,()=>{const {b,team}=setup(move);b.player.pokemon.status='burn';team[1].status='poison';team[1].toxicCounter=4;team[2].status='paralysis';turn(b);assert.equal(b.player.pokemon.status,'healthy');assert.equal(team[1].status,'healthy');assert.equal(team[1].toxicCounter,0);assert.equal(team[2].status,'healthy')});
test('Wunschtraum heilt nach einem Wechsel das eingewechselte Pokémon',()=>{const {b,team}=setup(273);team[1].currentHp-=10;turn(b);assert.equal(b.playerSideFields.wishTurns,1);const index=switchTeamPokemon(b,team,0,1);assert.equal(index,1);assert.equal(b.player.volatile.wishTurns,1);const before=b.player.pokemon.currentHp;b.player.pokemon.moves=[150];b.player.pp=[20];turn(b);assert.ok(b.player.pokemon.currentHp>before);assert.equal(b.playerSideFields.wishTurns,0)});
test('Wunschtraum kann nicht parallel auf derselben Seite gestapelt werden',()=>{const {b}=setup(273);turn(b);b.player.volatile.wishTurns=0;turn(b);assert.equal(b.playerSideFields.wishTurns,0);assert.ok(b.log.some(s=>s.includes('bereits aktiv')))});
