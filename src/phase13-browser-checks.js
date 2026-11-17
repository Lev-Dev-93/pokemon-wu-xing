// Browser-safe integration diagnostics: run without changing the player's save or world.
import {createPokemon} from './team.js';
import {startBattle,playTurn,availableMoves} from './battle.js';

function check(condition, message){if(!condition)throw Error(message)}
function combat(playerMoves,enemyMoves=[150]){
 const own=createPokemon(1,{level:40}),enemy=createPokemon(4,{level:40});
 own.moves=playerMoves;enemy.moves=enemyMoves;
 return startBattle(own,enemy);
}
export function runPhase13BrowserChecks(){
 const results=[];
 function run(name,fn){try{fn();results.push({name,passed:true})}catch(error){results.push({name,passed:false,error:String(error?.message||error)})}}
 run('Kampfstart und gültige Kämpfer',()=>{const b=combat([33]);check(b.player.pokemon.currentHp>0&&b.opponent.pokemon.currentHp>0,'Ungültiger Kampfstart')});
 run('Attackenliste und AP',()=>{const b=combat([33]);const moves=availableMoves(b.player);check(moves.length===1&&moves[0].pp>0,'Attacken/AP fehlen')});
 run('Kampfrunde: Schaden und AP-Verbrauch',()=>{const b=combat([33]);const hp=b.opponent.pokemon.currentHp,pp=b.player.pp[0];playTurn(b,0,0,{rng:()=>0.5});check(b.opponent.pokemon.currentHp<hp,'Kein Schaden');check(b.player.pp[0]===pp-1,'AP nicht verbraucht')});
 run('Heilblockade verhindert Absorber-Heilung',()=>{const b=combat([71]);b.player.pokemon.currentHp-=30;b.player.volatile.healBlockTurns=2;const hp=b.player.pokemon.currentHp,enemyHp=b.opponent.pokemon.currentHp;playTurn(b,0,0,{rng:()=>0.5});check(b.player.pokemon.currentHp===hp,'Heilblockade ignoriert');check(b.opponent.pokemon.currentHp<enemyHp,'Absorber-Schaden fehlt')});
 run('Heilung nach Ablauf der Heilblockade',()=>{const b=combat([71]);b.player.pokemon.currentHp-=30;b.player.volatile.healBlockTurns=1;const hp=b.player.pokemon.currentHp;playTurn(b,0,0,{rng:()=>0.5});check(b.player.pokemon.currentHp===hp,'Zu frühe Heilung');playTurn(b,0,0,{rng:()=>0.5});check(b.player.pokemon.currentHp>hp,'Heilung bleibt blockiert')});
 run('Kampfende bei K.-o.',()=>{const b=combat([33]);b.opponent.pokemon.currentHp=1;playTurn(b,0,0,{rng:()=>0.5});check(b.finished&&b.winner==='player','Kampfende nicht korrekt')});
 return {passed:results.filter(x=>x.passed).length,total:results.length,results};
}
