import {test} from 'node:test';
import {strict as assert} from 'node:assert';
import {createPokemon} from '../src/team.js';
import {startBattle} from '../src/battle.js';
import {resolveOpponentSwitch} from '../src/battle-pending-switch.js';
import {switchTeamPokemon} from '../src/battle-switch.js';
const setup=()=>{const b=startBattle(createPokemon(1),createPokemon(4));b.pendingSwitch={side:'opponent',kind:'forced'};return b;};
test('Kettenwechsel: Fallen besiegen ersten Ersatz, zweiter kommt ohne weitere Runde',()=>{
 const b=setup(),a=createPokemon(7),c=createPokemon(25);a.currentHp=1;
 b.opponentSideFields={stealthRock:true,spikes:3};
 const reserves=[a,c];const result=resolveOpponentSwitch(b,reserves,{rng:()=>0});
 assert.equal(result.attempts,2);assert.equal(b.opponent.pokemon.speciesId,25);assert.equal(b.pendingSwitch,null);
 assert.equal(reserves.some(p=>p.speciesId===7),false);assert.equal(reserves.some(p=>p.speciesId===4),true);
});
test('Kettenwechsel: alle Ersatz-Pokémon durch Fallen besiegt, Kampf endet',()=>{
 const b=setup(),a=createPokemon(7);a.currentHp=1;b.opponentSideFields={spikes:3};
 const result=resolveOpponentSwitch(b,[a],{rng:()=>0});
 assert.equal(result.fainted,true);assert.equal(b.finished,true);assert.equal(b.winner,'player');assert.equal(b.pendingSwitch,null);
});
test('Kettenwechsel: ungültiger Zufallswert verändert keine Reserven',()=>{
 const b=setup(),r=[createPokemon(7)];assert.throws(()=>resolveOpponentSwitch(b,r,{rng:()=>1}));
 assert.equal(r.length,1);assert.equal(b.pendingSwitch.side,'opponent');
});
test('Spieler: Ersatz durch Fallen besiegt, weiterer Wechsel bleibt möglich',()=>{
 const team=[createPokemon(1),createPokemon(7),createPokemon(25)];team[1].currentHp=1;
 const b=startBattle(team[0],createPokemon(4));b.playerSideFields={spikes:3};
 switchTeamPokemon(b,team,0,1);
 assert.equal(b.player.pokemon.currentHp,0);assert.equal(b.finished,false);
 assert.equal(b.pendingSwitch.side,'player');
 switchTeamPokemon(b,team,1,2);
 assert.equal(b.pendingSwitch,null);assert.equal(b.player.pokemon.speciesId,25);
});
test('Spieler: letzte Reserve fällt durch Fallen, Kampf wird verloren',()=>{
 const team=[createPokemon(1),createPokemon(7)];team[1].currentHp=1;
 const b=startBattle(team[0],createPokemon(4));b.playerSideFields={spikes:3};
 switchTeamPokemon(b,team,0,1);
 assert.equal(b.finished,false);assert.equal(b.pendingSwitch?.side,'player');
});
