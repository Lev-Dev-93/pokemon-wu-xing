import {test} from 'node:test';
import {strict as assert} from 'node:assert';
import {createPokemon} from '../src/team.js';
import {startBattle,playTurn} from '../src/battle.js';
import {switchTeamPokemon} from '../src/battle-switch.js';
function battleWithMove(id){const a=createPokemon(1),b=createPokemon(4);a.moves=[id,33];b.moves=[33];a.pp=[10,10];b.pp=[35];const battle=startBattle(a,b);battle.player.pp=[10,10];battle.opponent.pp=[35];return battle;}
test('Kehrtwende setzt nach erfolgreichem Schaden einen Spielerwechsel aus',()=>{const b=battleWithMove(369);playTurn(b,0,0,{rng:()=>0});assert.equal(b.pendingSwitch?.kind,'pivot');assert.equal(b.pendingSwitch?.side,'player');assert.equal(b.player.pp[0],9)});
test('Voltwechsel erzeugt einen Wechselauftrag',()=>{const b=battleWithMove(521);playTurn(b,0,0,{rng:()=>0});assert.equal(b.pendingSwitch?.kind,'pivot')});
test('Brüller erzeugt einen erzwungenen Wechselauftrag',()=>{const b=battleWithMove(46);playTurn(b,0,0,{rng:()=>0});assert.equal(b.pendingSwitch?.kind,'forced');assert.equal(b.pendingSwitch?.side,'opponent')});
test('Verwurzler verhindert erzwungenen Wechsel',()=>{const b=battleWithMove(18);b.opponent.volatile.ingrained=true;playTurn(b,0,0,{rng:()=>0});assert.equal(b.pendingSwitch,undefined)});
test('Spielerwechsel erfüllt den ausstehenden Wechselauftrag',()=>{const b=battleWithMove(369);playTurn(b,0,0,{rng:()=>0});const team=[structuredClone(b.player.pokemon),createPokemon(7)];switchTeamPokemon(b,team,0,1);assert.equal(b.pendingSwitch,null)});
