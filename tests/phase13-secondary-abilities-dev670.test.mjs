import test from 'node:test';
import assert from 'node:assert/strict';
import {blocksSecondaryEffect,blocksFlinch,secondaryEffectChance} from '../src/ability-effects.js';
import {createPokemon} from '../src/team.js';
import {startBattle,playTurn} from '../src/battle.js';
const f=id=>({pokemon:{abilityId:id}});
test('Puderabwehr blockiert sekundäre Effekte, Konzentrator nur Zurückschrecken',()=>{
 assert.equal(blocksSecondaryEffect(f(19)),true);
 assert.equal(blocksSecondaryEffect(f(39)),false);
 assert.equal(blocksFlinch(f(39)),true);
 assert.equal(blocksFlinch(f(19)),false);
});
test('Edelmut verdoppelt Chancen ohne über 100 Prozent zu steigen',()=>{
 assert.equal(secondaryEffectChance(f(32),0.3),0.6);
 assert.equal(secondaryEffectChance(f(32),1),1);
 assert.equal(secondaryEffectChance(f(1),0.3),0.3);
});
function battle(move,defenderAbility,attackerAbility=1){
 const a=createPokemon(4,{level:25}),d=createPokemon(1,{level:25});
 a.moves=[move];d.moves=[33];
 const b=startBattle(a,d);
 b.player.pokemon.abilityId=attackerAbility;
 b.opponent.pokemon.abilityId=defenderAbility;
 b.player.pokemon.stats.speed=999;b.opponent.pokemon.stats.speed=1;
 b.player.pokemon.stats.attack=60;b.player.pokemon.stats.specialAttack=60;
 playTurn(b,0,0,{rng:()=>0});return b;
}
test('Puderabwehr verhindert sekundäre Verbrennung nach erfolgreichem Treffer',()=>{
 const blocked=battle(52,19),normal=battle(52,1);
 assert.ok(blocked.opponent.pokemon.currentHp<blocked.opponent.pokemon.stats.hp);
 assert.notEqual(blocked.opponent.pokemon.status,'burn');
 assert.equal(normal.opponent.pokemon.status,'burn');
});
test('Konzentrator verhindert Zurückschrecken, aber nicht Schaden',()=>{
 const blocked=battle(44,39),normal=battle(44,1);
 assert.ok(blocked.opponent.pokemon.currentHp<blocked.opponent.pokemon.stats.hp);
 assert.ok(!blocked.log.some(x=>x.includes('schreckt zurück')));
 assert.ok(normal.log.some(x=>x.includes('schreckt zurück')));
});
