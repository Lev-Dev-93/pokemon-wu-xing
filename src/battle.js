import {getMove,speciesTypes,typeEffectiveness} from './moves.js';
import {validatePokemon} from './team.js';

const validRng=rng=>{const v=rng();if(!Number.isFinite(v)||v<0||v>=1)throw Error('Ungültiger Zufallswert');return v};
const clone=p=>structuredClone(p);
function fighter(p){if(!validatePokemon(p))throw Error('Ungültiges Kampf-Pokémon');return {pokemon:clone(p),pp:p.moves.map(id=>getMove(id).pp),stages:{attack:0,defense:0,specialAttack:0,specialDefense:0,speed:0},volatile:{sleepTurns:0}}}
export function startBattle(own,enemy){if(!validatePokemon(own)||!validatePokemon(enemy)||own.currentHp===0||enemy.currentHp===0)throw Error('Kampf benötigt zwei kampffähige Pokémon');return {turn:1,finished:false,winner:null,player:fighter(own),opponent:fighter(enemy),log:['Ein Testkampf beginnt.']}}
function stageMult(stage){return stage>=0?(2+stage)/2:2/(2-stage)}
function speed(f){const p=f.pokemon;return p.stats.speed*stageMult(f.stages.speed)*(p.status==='paralysis'?0.5:1)}
function damage(attacker,defender,move,rng){if(!move.power||![2,3].includes(move.category))return 0;const special=move.category===3;const atk=special?'specialAttack':'attack',def=special?'specialDefense':'defense';const a=Math.max(1,attacker.pokemon.stats[atk]*stageMult(attacker.stages[atk]));const d=Math.max(1,defender.pokemon.stats[def]*stageMult(defender.stages[def]));const types=speciesTypes(defender.pokemon.speciesId);const effectiveness=typeEffectiveness(move.typeId,types);if(effectiveness===0)return 0;const stab=speciesTypes(attacker.pokemon.speciesId).includes(move.typeId)?1.5:1;const burn=attacker.pokemon.status==='burn'&&!special?0.5:1;const variation=0.85+0.15*validRng(rng);return Math.max(1,Math.floor((Math.floor((2*attacker.pokemon.level/5+2)*move.power*a/d/50)+2)*stab*effectiveness*burn*variation))}
function perform(battle,actor,target,index,rng,tag){const moveId=actor.pokemon.moves[index],move=getMove(moveId);if(!move||!Number.isInteger(index)||index<0||index>=actor.pp.length)throw Error('Ungültige Attackenauswahl');if(actor.pp[index]<=0)throw Error('Keine AP übrig');if(actor.pokemon.currentHp<=0)return;
 actor.pp[index]--;battle.log.push(`${tag} setzt ${move.de||move.name} ein.`);
 if(actor.pokemon.status==='sleep'||actor.pokemon.status==='freeze'){battle.log.push(`${tag} kann sich nicht bewegen.`);return}
 if(actor.pokemon.status==='paralysis'&&validRng(rng)<0.25){battle.log.push(`${tag} ist paralysiert.`);return}
 if(move.accuracy!==null&&validRng(rng)*100>=move.accuracy){battle.log.push('Die Attacke verfehlt ihr Ziel.');return}
 if(move.category===1||move.power===null||move.power===0){battle.log.push('Der Spezialeffekt dieser Attacke ist noch nicht implementiert.');return}
 const value=damage(actor,target,move,rng);target.pokemon.currentHp=Math.max(0,target.pokemon.currentHp-value);battle.log.push(value?`${value} Schadenspunkte.`:'Keine Wirkung.');
 const factor=typeEffectiveness(move.typeId,speciesTypes(target.pokemon.speciesId));if(factor>1)battle.log.push('Das ist sehr effektiv!');if(factor>0&&factor<1)battle.log.push('Das ist nicht sehr effektiv.');
}
export function availableMoves(f){return f.pokemon.moves.map((id,index)=>({index,id,name:getMove(id)?.de||getMove(id)?.name,pp:f.pp[index],maxPp:getMove(id)?.pp}));}
export function playTurn(battle,playerMoveIndex,enemyMoveIndex,{rng=Math.random}={}){if(!battle||battle.finished)throw Error('Kampf bereits beendet oder ungültig');if(!Number.isInteger(playerMoveIndex)||!Number.isInteger(enemyMoveIndex))throw Error('Attackenindex erforderlich');const p=battle.player,e=battle.opponent;for(const [f,i] of [[p,playerMoveIndex],[e,enemyMoveIndex]])if(!f.pokemon.moves[i]||f.pp[i]<=0)throw Error('Attacke nicht verfügbar');
 battle.log=[];battle.turnEvents=[];const pm=getMove(p.pokemon.moves[playerMoveIndex]),em=getMove(e.pokemon.moves[enemyMoveIndex]);const first=pm.priority!==em.priority?(pm.priority>em.priority?'p':'e'):speed(p)!==speed(e)?(speed(p)>speed(e)?'p':'e'):(validRng(rng)<0.5?'p':'e');
 const turns=first==='p'?[[p,e,playerMoveIndex,'Dein Pokémon'],[e,p,enemyMoveIndex,'Gegner']]:[[e,p,enemyMoveIndex,'Gegner'],[p,e,playerMoveIndex,'Dein Pokémon']];for(const [a,d,i,tag] of turns){if(a.pokemon.currentHp===0||d.pokemon.currentHp===0)break;perform(battle,a,d,i,rng,tag);battle.turnEvents.push({actor:a===p?'player':'opponent',playerHp:p.pokemon.currentHp,opponentHp:e.pokemon.currentHp,playerPp:[...p.pp],opponentPp:[...e.pp],log:[...battle.log]})}
 for(const [f,tag] of [[p,'Dein Pokémon'],[e,'Gegner']]){if(f.pokemon.currentHp>0&&['poison','burn'].includes(f.pokemon.status)){const residual=Math.max(1,Math.floor(f.pokemon.stats.hp/8));f.pokemon.currentHp=Math.max(0,f.pokemon.currentHp-residual);battle.log.push(`${tag} erleidet ${residual} Statusschaden.`)}}
 if(battle.log.length>(battle.turnEvents.at(-1)?.log.length||0))battle.turnEvents.push({actor:'status',playerHp:p.pokemon.currentHp,opponentHp:e.pokemon.currentHp,playerPp:[...p.pp],opponentPp:[...e.pp],log:[...battle.log]});
 if(p.pokemon.currentHp===0||e.pokemon.currentHp===0){battle.finished=true;battle.winner=p.pokemon.currentHp>0?'player':e.pokemon.currentHp>0?'opponent':'draw';battle.log.push('Kampf beendet.')}else battle.turn++;return battle;
}
