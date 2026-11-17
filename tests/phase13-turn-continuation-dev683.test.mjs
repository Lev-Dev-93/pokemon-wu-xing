import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createPokemon} from '../src/team.js';
import {startBattle,playTurn,resumeInterruptedTurn} from '../src/battle.js';
import {resolveOpponentSwitch} from '../src/battle-pending-switch.js';
import {switchTeamPokemon} from '../src/battle-switch.js';
const rng=()=>0;
function setup(move){const a=createPokemon(1,{level:25}),b=createPokemon(4,{level:25});a.moves=[move];a.pp=[10];b.moves=[33];b.pp=[35];const battle=startBattle(a,b);battle.player.pp=[10];battle.opponent.pp=[35];battle.player.stages.speed=6;battle.opponent.stages.speed=-6;return battle;}
test('Pivot: Gegner greift nach dem Spielerwechsel noch im selben Zug an',()=>{const b=setup(369);playTurn(b,0,0,{rng});assert.equal(b.pendingSwitch.side,'player');const team=[structuredClone(b.player.pokemon),createPokemon(7,{level:25})];switchTeamPokemon(b,team,0,1);assert.equal(b.turn,1);const before=b.opponent.pp[0];resumeInterruptedTurn(b,{rng});assert.equal(b.opponent.pp[0],before-1);assert.equal(b.turn,2);assert.equal(b.pendingTurn,null);});
test('Erzwungener Gegnerwechsel verhindert Aktion des ausgewechselten Pokémon',()=>{const b=setup(46);playTurn(b,0,0,{rng});const reserve=[createPokemon(7,{level:25})];resolveOpponentSwitch(b,reserve,{rng});const before=b.opponent.pp[0];resumeInterruptedTurn(b,{rng});assert.equal(b.opponent.pp[0],before);assert.equal(b.turn,2);});
test('Unterbrochene Runde kann nicht zweimal abgeschlossen werden',()=>{const b=setup(46);playTurn(b,0,0,{rng});resolveOpponentSwitch(b,[createPokemon(7,{level:25})],{rng});resumeInterruptedTurn(b,{rng});assert.throws(()=>resumeInterruptedTurn(b,{rng}),/Keine unterbrochene/);});
test('Solange ein Wechsel offen ist, kann die Runde nicht fortgesetzt werden',()=>{const b=setup(369);playTurn(b,0,0,{rng});assert.throws(()=>resumeInterruptedTurn(b,{rng}),/Wechselauftrag/);});
