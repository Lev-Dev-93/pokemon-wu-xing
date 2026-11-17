import test from 'node:test';
import assert from 'node:assert/strict';
import {createPokemon} from '../src/team.js';
import {startBattle,playTurn} from '../src/battle.js';
const rng=()=>0.01;
function battle(move,enemyMove=150){const p=createPokemon(4,{level:40}),e=createPokemon(1,{level:40});p.moves=[move];e.moves=[enemyMove];const b=startBattle(p,e);b.player.pp=[30];b.opponent.pp=[30];return b;}
test('Breites Stufenpaket: Einrollen, Watteschild, Charme und Metall-Sound',()=>{
 for(const [id,side,stat,expected] of [[489,'player','accuracy',1],[538,'player','defense',3],[204,'opponent','attack',-2],[319,'opponent','specialDefense',-2]]){const b=battle(id);playTurn(b,0,0,{rng});assert.equal(b[side].stages[stat],expected,`Attacke ${id}`)}
});
test('Schadensattacken senken bei Treffer garantiert den korrekten Wert',()=>{
 for(const [id,stat] of [[522,'specialAttack'],[523,'speed'],[527,'speed'],[555,'specialAttack']]){const b=battle(id);playTurn(b,0,0,{rng});assert.equal(b.opponent.stages[stat],-1,`Attacke ${id}`)}
});
test('Gähner verursacht erst nach der Folgerunde Schlaf',()=>{const b=battle(281);playTurn(b,0,0,{rng});assert.equal(b.opponent.pokemon.status,'healthy');assert.equal(b.opponent.volatile.yawnTurns,1);playTurn(b,0,0,{rng});assert.equal(b.opponent.pokemon.status,'sleep')});
test('Verhöhner verhindert Statusattacken und läuft ab',()=>{const b=battle(269,14);playTurn(b,0,0,{rng});assert.equal(b.opponent.stages.attack,0);assert.match(b.log.join(' '),/Verhöhner/);b.player.pokemon.moves[0]=150;playTurn(b,0,0,{rng});assert.equal(b.opponent.stages.attack,0);playTurn(b,0,0,{rng});playTurn(b,0,0,{rng});assert.equal(b.opponent.stages.attack,2)});
test('Heilung entfernt eine bestehende Verbrennung',()=>{const b=battle(287);b.player.pokemon.status='burn';playTurn(b,0,0,{rng});assert.equal(b.player.pokemon.status,'healthy')});
test('Heilwoge heilt das gegnerische Ziel',()=>{const b=battle(505);b.opponent.pokemon.currentHp-=25;const hp=b.opponent.pokemon.currentHp;playTurn(b,0,0,{rng});assert.ok(b.opponent.pokemon.currentHp>hp)});
test('Angeberei erhöht Angriff und verwirrt das Ziel',()=>{const b=battle(207);playTurn(b,0,0,{rng});assert.equal(b.opponent.stages.attack,2);assert.ok(b.opponent.volatile.confusionTurns>0)});
test('Platscher zeigt keinen unimplementierten Spezialeffekt',()=>{const b=battle(150);playTurn(b,0,0,{rng});assert.match(b.log.join(' '),/nichts geschieht/);assert.doesNotMatch(b.log.join(' '),/nicht implementiert/)});
test('Weitere garantierte Trefferfolgen: Lehmschelle, Nitroladung, Fußtritt, Säurespeier, Eiszeit',()=>{
 for(const [id,side,stat,delta] of [[189,'opponent','accuracy',-1],[488,'player','speed',1],[490,'opponent','speed',-1],[491,'opponent','specialDefense',-2],[549,'opponent','speed',-1]]){const b=battle(id);playTurn(b,0,0,{rng});assert.equal(b[side].stages[stat],delta,`Attacke ${id}`)}
});
test('Neue sekundäre Statusfolgen: Siedewasser, Funkensprung, Matschbombe, Inferno',()=>{
 for(const [id,status] of [[503,'burn'],[209,'paralysis'],[188,'poison'],[517,'burn']]){const b=battle(id);if(id===188){const water=createPokemon(7,{level:40});water.moves=[150];b.opponent.pokemon=water;}playTurn(b,0,0,{rng});assert.equal(b.opponent.pokemon.status,status,`Attacke ${id}`)}
});
test('Trefferbedingte Statusfolgen lösen nicht bei Immunität aus',()=>{const b=battle(84);b.opponent.pokemon.abilityId=10;playTurn(b,0,0,{rng});assert.notEqual(b.opponent.pokemon.status,'paralysis')});
