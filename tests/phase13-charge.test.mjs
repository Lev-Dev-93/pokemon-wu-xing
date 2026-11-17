import test from 'node:test';
import assert from 'node:assert/strict';
import {createPokemon} from '../src/team.js';
import {startBattle,playTurn,playEnemyOnlyTurn} from '../src/battle.js';
const rng=()=>0.5;
function setup(){const p=createPokemon(1,{level:70}),e=createPokemon(1,{level:70});p.moves=[76,33];e.moves=[76,33];p.currentHp=p.stats.hp;e.currentHp=e.stats.hp;const b=startBattle(p,e);b.player.pp=[1,10];b.opponent.pp=[1,10];return b;}
test('Solarstrahl trifft in Runde zwei auch bei 0 AP ohne weiteren AP-Verbrauch',()=>{const b=setup();playTurn(b,0,1,{rng});assert.equal(b.player.pp[0],0);assert.equal(b.player.volatile.solarChargeIndex,0);playTurn(b,0,1,{rng});assert.equal(b.player.pp[0],0);assert.equal(b.player.pp[1],10);assert.equal(b.player.volatile.solarChargeIndex,null);assert.match(b.log.join(' '),/entfesselt/);});
test('Auch ein Gegner darf einen begonnenen Solarstrahl bei 0 AP abschließen',()=>{const b=setup();playEnemyOnlyTurn(b,0,{rng});assert.equal(b.opponent.pp[0],0);playEnemyOnlyTurn(b,0,{rng});assert.equal(b.opponent.volatile.solarChargeIndex,null);assert.equal(b.opponent.pp[1],10);});
