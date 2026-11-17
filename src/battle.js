import {heldDamageMultiplier,heldEndTurnHeal,heldLifeOrbRecoil,heldFocusSashSurvival} from './held-battle-items.js';
import {MULTI_HIT_RANGES,multiHitCount} from './multi-hit-rules.js';
import {preparationInteraction} from './semi-invulnerable-rules.js';
import {HAZARD_MOVES,setHazard,clearHazards,ensureHazards} from './battle-hazards.js';
import {canContinueBattle} from './battle-turn-guards.js';
import {typeBlocksStatus} from './battle-status-rules.js';
import {tickWeather} from './battle-weather-cycle.js';
import {residualDamage} from './battle-residual.js';
import {effectiveWeather,preventsStatus,preventsConfusion,weatherSpeedMultiplier,weatherEvasionMultiplier,weatherDamageImmune,statusCureAbility,absorptionEffect,absorbsGround,offensiveAbilityMultiplier,defensiveAbilityMultiplier,ignoresBurnAttackPenalty,weatherAbilityHpFraction,ignoresIndirectDamage,pinchAbilityMultiplier,stabAbilityMultiplier,effectivenessAbilityMultiplier,fullHpDefenseMultiplier,wonderGuardBlocks,sturdySurvivalHp,blocksSecondaryEffect,blocksFlinch,secondaryEffectChance} from './ability-effects.js';
import {applyEntryAbility} from './battle-entry.js';
import {currentPp} from './pp-items.js';
import {getMove,speciesTypes,typeEffectiveness} from './moves.js';
import {validatePokemon} from './team.js';

const validRng=rng=>{const v=rng();if(!Number.isFinite(v)||v<0||v>=1)throw Error('Ungültiger Zufallswert');return v};
const clone=p=>structuredClone(p);
function fighter(p){if(!validatePokemon(p))throw Error('Ungültiges Kampf-Pokémon');return {pokemon:clone(p),pp:currentPp(p),stages:{attack:0,defense:0,specialAttack:0,specialDefense:0,speed:0,accuracy:0,evasion:0},volatile:{sleepTurns:0,confusionTurns:0,flinched:false,protected:false,enduring:false,protectStreak:0,seeded:false,aquaRing:false,ingrained:false,solarChargeIndex:null,rechargeTurns:0,reflectTurns:0,lightScreenTurns:0,safeguardTurns:0,mistTurns:0,flashFireBoost:false,yawnTurns:0,tauntTurns:0,healBlockTurns:0}}}
export function startBattle(own,enemy){if(!validatePokemon(own)||!validatePokemon(enemy)||own.currentHp===0||enemy.currentHp===0)throw Error('Kampf benötigt zwei kampffähige Pokémon');const battle={turn:1,finished:false,winner:null,weather:null,weatherTurns:0,player:fighter(own),opponent:fighter(enemy),playerSideFields:{lightScreenTurns:0,reflectTurns:0,safeguardTurns:0,mistTurns:0,wishTurns:0,wishHeal:0},opponentSideFields:{lightScreenTurns:0,reflectTurns:0,safeguardTurns:0,mistTurns:0,wishTurns:0,wishHeal:0},log:['Ein Testkampf beginnt.']};applyEntryAbility(battle,'player');applyEntryAbility(battle,'opponent');return battle}
// Wolke Sieben (13) und Klimaschutz (76) unterdrücken Wettereinflüsse, nicht die Wetterdauer.
function activeWeather(battle){return effectiveWeather(battle)}
function stageMult(stage){return stage>=0?(2+stage)/2:2/(2-stage)}
function accuracyMultiplier(stage){return stage>=0?(3+stage)/3:3/(3-stage)}
function hitChance(actor,target,move,weather=null){if(move.id===87&&weather==='rain')return 1;if(move.accuracy===null)return 1;const weatherEvasion=weatherEvasionMultiplier(target,weather);const diff=Math.max(-6,Math.min(6,(actor.stages.accuracy??0)-(target.stages.evasion??0)));return Math.min(1,(move.id===87&&weather==='sun'?0.5:move.accuracy/100)*accuracyMultiplier(diff)*weatherEvasion)}
function speed(f,weather=null){const p=f.pokemon;const boost=weatherSpeedMultiplier(f,weather);return p.stats.speed*stageMult(f.stages.speed)*(p.status==='paralysis'?0.5:1)*boost*(f.volatile.tailwindTurns>0?2:1)}
function damage(attacker,defender,move,rng,weather=null){if(!move.power||![2,3].includes(move.category))return 0;const special=move.category===3;const atk=special?'specialAttack':'attack',def=special?'specialDefense':'defense';const a=Math.max(1,attacker.pokemon.stats[atk]*stageMult(attacker.stages[atk]));const screen=special?defender.volatile.lightScreenTurns:defender.volatile.reflectTurns;const d=Math.max(1,defender.pokemon.stats[def]*stageMult(defender.stages[def])*(screen>0?2:1));const types=speciesTypes(defender.pokemon.speciesId,defender.pokemon.formId);const effectiveness=typeEffectiveness(move.typeId,types);if(effectiveness===0||wonderGuardBlocks(defender,effectiveness,move)||(move.typeId===5&&defender.pokemon.abilityId===26))return 0;const stab=stabAbilityMultiplier(attacker,move,speciesTypes(attacker.pokemon.speciesId,attacker.pokemon.formId).includes(move.typeId));const burn=attacker.pokemon.status==='burn'&&!special&&!ignoresBurnAttackPenalty(attacker)?0.5:1;const variation=0.85+0.15*validRng(rng);const targetPreparation=Number.isInteger(defender.volatile.solarChargeIndex)?defender.pokemon.moves[defender.volatile.solarChargeIndex]:null;const preparationMultiplier=preparationInteraction(targetPreparation,move.id).multiplier;const solarPenalty=move.id===76&&['rain','sand','hail'].includes(weather)?0.5:1;const weatherPower=weather==='sun'?(move.typeId===10?1.5:move.typeId===11?0.5:1):weather==='rain'?(move.typeId===11?1.5:move.typeId===10?0.5:1):1;return Math.max(1,Math.floor((Math.floor((2*attacker.pokemon.level/5+2)*move.power*a/d/50)+2)*stab*effectiveness*burn*variation*weatherPower*solarPenalty*preparationMultiplier*heldDamageMultiplier(attacker.pokemon,move,effectiveness)*offensiveAbilityMultiplier(attacker,move,weather)*defensiveAbilityMultiplier(defender,move)*pinchAbilityMultiplier(attacker,move)*effectivenessAbilityMultiplier(attacker,defender,effectiveness)*fullHpDefenseMultiplier(defender)))}
// Erste Stufenattacken: Änderung der Kampfstufen nur für die Dauer des Kampfes.
// Weitere Statusattacken werden erst aktiviert, wenn ihre Effekte implementiert sind.
// Rückstoß/Absorption beziehen sich auf tatsächlich verursachten Schaden.
// Mehrfachtreffer: ein Genauigkeitswurf pro Attacke, ein AP-Verbrauch pro Zug.
// 2–5 Treffer: 2/3 je 35 %, 4/5 je 15 %.
// Attacken mit festem bzw. proportionalem KP-Schaden (Generation-5-Regelgruppe).
const FIXED_DAMAGE_MOVES=new Set([49,69,82,101,162,283]);
function fixedDamage(attacker,defender,move){
 const types=speciesTypes(defender.pokemon.speciesId,defender.pokemon.formId);
 const factor=typeEffectiveness(move.typeId,types);
 if(factor===0||wonderGuardBlocks(defender,factor,move)||(move.typeId===5&&defender.pokemon.abilityId===26))return 0;
 switch(move.id){
  case 49:return 20; // Ultraschall (Sonic Boom): 20 KP
  case 69:case 101:return attacker.pokemon.level; // Geowurf/Nachtnebel
  case 82:return 40; // Drachenwut
  case 162:return Math.max(1,Math.floor(defender.pokemon.currentHp/2)); // Superzahn
  case 283:return Math.max(0,defender.pokemon.currentHp-attacker.pokemon.currentHp); // Notsituation
  default:return 0;
 }
}
const RECOIL_MOVES={36:0.25,38:1/3,66:0.25}; // Bodycheck, Risikotackle, Überroller
const DRAIN_MOVES={71:0.5,72:0.5,202:0.5,409:0.5}; // Absorber, Megasauger, Gigasauger, Ableithieb
const PROTECT_MOVES=new Set([182,197]);
const ENDURE_MOVE=203; // Ausdauer; teilt die Wiederholungswahrscheinlichkeit mit Schutzschild/Scanner
const DEFENSIVE_MOVES=new Set([...PROTECT_MOVES,ENDURE_MOVE]); // Schutzschild, Scanner
const RECOVERY_MOVES=new Set([105,135,208,234,235,236,303,355]); // Genesung, Weichei, Milchgetränk, Morgengrauen, Synthese, Tagedieb
export const SIDE_FIELD_KEYS=['lightScreenTurns','reflectTurns','safeguardTurns','mistTurns','tailwindTurns'];
const FIELD_MOVES={366:['tailwindTurns','Rückenwind'],113:['lightScreenTurns','Lichtschild'],115:['reflectTurns','Reflektor'],219:['safeguardTurns','Bodyguard'],54:['mistTurns','Weißnebel']};
const WEATHER_MOVES={241:['sun','Sonnenschein'],240:['rain','Regen'],201:['sand','Sandsturm'],258:['hail','Hagel']};
const PIVOT_MOVES=new Set([369,521]); // Kehrtwende, Voltwechsel
const FORCE_SWITCH_MOVES=new Set([18,46,525]); // Wirbelwind, Brüller, Drachenrute
const LEECH_SEED_MOVE=73;
const AQUA_RING_MOVE=392;
const INGRAIN_MOVE=275;
const NO_EFFECT_MOVES=new Set([150]); // Platscher: bewusst wirkungslos
const CONFUSION_MOVES=new Set([48,109,186]); // Superschall, Konfustrahl
const HIT_CONFUSION={60:0.1,324:0.1,352:0.2,431:0.2,448:1}; // Psystrahl
const HIT_FLINCH={29:0.3,44:0.3,23:0.3,127:0.2,239:0.2,310:0.3,399:0.2,403:0.3,407:0.2,428:0.2,442:0.3,531:0.3,537:0.3}; // Kopfnuss, Biss, Stampfer
// Zusatzeffekte von Schadensattacken: Treffer und lebendes Ziel erforderlich.
// Wahrscheinlichkeit 1 bedeutet garantierte Senkung bei einem erfolgreichen Treffer.
const HIT_STAGE={
  61:{stat:'speed',delta:-1,chance:0.1}, // Blubbstrahl
  62:{stat:'attack',delta:-1,chance:0.1}, // Aurorastrahl
  94:{stat:'specialDefense',delta:-1,chance:0.1}, // Psychokinese
  196:{stat:'speed',delta:-1,chance:1}, // Eissturm
  242:{stat:'defense',delta:-1,chance:0.2}, // Knirscher
  247:{stat:'specialDefense',delta:-1,chance:0.2}, // Spukball
  317:{stat:'speed',delta:-1,chance:1}, // Felsgrab
  330:{stat:'accuracy',delta:-1,chance:0.3}, // Lehmbrühe
  341:{stat:'speed',delta:-1,chance:1}, // Lehmschuss
  405:{stat:'specialDefense',delta:-1,chance:0.1}, // Käfergebrumm
  412:{stat:'specialDefense',delta:-1,chance:0.1}, // Energieball
  414:{stat:'specialDefense',delta:-1,chance:0.1}, // Erdkräfte
  426:{stat:'accuracy',delta:-1,chance:0.3}, // Schlammbombe
  189:{stat:'accuracy',delta:-1,chance:1}, // Lehmschelle
  488:{stat:'speed',delta:1,chance:1,self:true}, // Nitroladung
  490:{stat:'speed',delta:-1,chance:1}, // Fußtritt
  491:{stat:'specialDefense',delta:-2,chance:1}, // Säurespeier
  451:{stat:'specialAttack',delta:1,chance:0.7,self:true}, // Ladestrahl
  534:{stat:'defense',delta:-1,chance:0.5}, // Kalkklinge
  536:{stat:'accuracy',delta:-1,chance:0.5}, // Grasmixer
  539:{stat:'accuracy',delta:-1,chance:0.4}, // Nachtflut
  549:{stat:'speed',delta:-1,chance:1}, // Eiszeit
  522:{stat:'specialAttack',delta:-1,chance:1}, // Käfertrutz
  523:{stat:'speed',delta:-1,chance:1}, // Dampfwalze
  527:{stat:'speed',delta:-1,chance:1}, // Elektronetz
  555:{stat:'specialAttack',delta:-1,chance:1}, // Standpauke
  430:{stat:'specialDefense',delta:-1,chance:0.1} // Lichtkanone
};
const STAGE_LABELS={attack:'Angriff',defense:'Verteidigung',specialAttack:'Spezial-Angriff',specialDefense:'Spezial-Verteidigung',speed:'Initiative',accuracy:'Genauigkeit',evasion:'Ausweichwert'};
function applyHitStage(battle,target,moveId,rng){
 const effect=HIT_STAGE[moveId];if(!effect)return;
 if(effect.delta<0&&!effect.self&&blocksStatDrop(target,effect.stat)){battle.log.push('Die Fähigkeit verhindert die Statuswertsenkung!');return;}
 if(effect.delta<0&&!effect.self&&target.volatile.mistTurns>0){battle.log.push('Weißnebel schützt die Statuswerte!');return;}
 if(effect.chance<1&&validRng(rng)>=effect.chance)return;
 const recipient=effect.self?battle.player===target?battle.opponent:battle.player:target;
 const before=recipient.stages[effect.stat]??0;
 const after=Math.max(-6,Math.min(6,before+effect.delta));
 recipient.stages[effect.stat]=after;
 if(after!==before)battle.log.push(`${STAGE_LABELS[effect.stat]} des Ziels sinkt!`);
 else battle.log.push(`${STAGE_LABELS[effect.stat]} kann nicht weiter sinken.`);
}
const STATUS_MOVES={77:{status:'poison'},78:{status:'paralysis'},47:{status:'sleep'},79:{status:'sleep'},142:{status:'sleep'},147:{status:'sleep'},320:{status:'sleep'},464:{status:'sleep'},261:{status:'burn'},86:{status:'paralysis'},92:{status:'poison',toxic:true},95:{status:'sleep'},137:{status:'paralysis'},139:{status:'poison'}};
const HIT_STATUS={40:{status:'poison',chance:0.3},52:{status:'burn',chance:0.1},53:{status:'burn',chance:0.1},7:{status:'burn',chance:0.1},9:{status:'paralysis',chance:0.1},34:{status:'paralysis',chance:0.3},
 84:{status:'paralysis',chance:0.1},85:{status:'paralysis',chance:0.1},122:{status:'paralysis',chance:0.3},124:{status:'poison',chance:0.3},126:{status:'burn',chance:0.1},172:{status:'burn',chance:0.1},188:{status:'poison',chance:0.3},209:{status:'paralysis',chance:0.3},305:{status:'poison',chance:0.5},422:{status:'paralysis',chance:0.1},424:{status:'burn',chance:0.1},435:{status:'paralysis',chance:0.3},436:{status:'burn',chance:0.3},441:{status:'poison',chance:0.3},482:{status:'poison',chance:0.1},503:{status:'burn',chance:0.3},517:{status:'burn',chance:1},542:{status:'confusion',chance:0.3}};
function applyCondition(battle,target,status,rng){if(target.volatile.safeguardTurns>0){battle.log.push('Bodyguard verhindert das Statusproblem.');return false}if(target.pokemon.status&&target.pokemon.status!=='healthy'){battle.log.push('Das Ziel hat bereits ein Statusproblem.');return false}const types=speciesTypes(target.pokemon.speciesId,target.pokemon.formId);if(typeBlocksStatus(status,types)){battle.log.push('Das Ziel ist gegen diesen Status immun.');return false}if(preventsStatus(target,status,activeWeather(battle))){battle.log.push('Die Fähigkeit des Ziels verhindert das Statusproblem.');return false}target.pokemon.status=status;target.pokemon.toxicCounter=0;if(status==='sleep')target.volatile.sleepTurns=2+Math.floor(validRng(rng)*2);battle.log.push(({poison:'Das Ziel wurde vergiftet!',burn:'Das Ziel wurde verbrannt!',paralysis:'Das Ziel wurde paralysiert!',sleep:'Das Ziel ist eingeschlafen!'})[status]);return true}
const STAGE_MOVES={
  294:{self:true,changes:{specialAttack:3}}, // Schweifglanz
  322:{self:true,changes:{defense:1,specialDefense:1}}, // Kosmik-Kraft
  339:{self:true,changes:{attack:1,defense:1}}, // Protzer
  14:{self:true,changes:{attack:2}}, // Schwerttanz
  39:{self:false,changes:{defense:-1}}, // Rutenschlag
  43:{self:false,changes:{defense:-1}}, // Silberblick
  45:{self:false,changes:{attack:-1}}, // Heuler
  74:{self:true,changes:{attack:1,specialAttack:1}}, // Wachstum (Sonne: jeweils +2)
  97:{self:true,changes:{speed:2}}, // Agilität
  103:{self:false,changes:{defense:-2}}, // Kreideschrei
  106:{self:true,changes:{defense:1}}, // Härtner
  110:{self:true,changes:{defense:1}}, // Panzerschutz
  28:{self:false,changes:{accuracy:-1}}, // Sandwirbel
  104:{self:true,changes:{evasion:1}}, // Doppelteam
  107:{self:true,changes:{evasion:1}}, // Komprimator
  108:{self:false,changes:{accuracy:-1}}, // Rauchwolke
  134:{self:false,changes:{accuracy:-1}}, // Psykraft
  148:{self:false,changes:{accuracy:-1}}, // Blitz
  230:{self:false,changes:{evasion:-1}}, // Lockduft
  313:{self:false,changes:{specialDefense:-2}}, // Trugträne
  159:{self:true,changes:{attack:1}}, // Schärfer
  81:{self:false,changes:{speed:-2}}, // Fadenschuss
  96:{self:true,changes:{attack:1}}, // Meditation
  112:{self:true,changes:{defense:2}}, // Barriere
  133:{self:true,changes:{specialDefense:2}}, // Amnesie
  151:{self:true,changes:{defense:2}}, // Säurepanzer
  178:{self:false,changes:{speed:-2}}, // Baumwollsaat
  184:{self:false,changes:{speed:-2}}, // Grimasse
  297:{self:false,changes:{attack:-2}}, // Daunenreigen
  321:{self:false,changes:{attack:-1}}, // Spaßkanone
  334:{self:true,changes:{defense:2}}, // Eisenabwehr
  347:{self:true,changes:{specialAttack:1,specialDefense:1}}, // Gedankengut
  349:{self:true,changes:{attack:1,speed:1}}, // Drachentanz
  397:{self:true,changes:{speed:2}}, // Steinpolitur
  417:{self:true,changes:{specialAttack:2}}, // Ränkeschmied
  445:{self:false,changes:{specialAttack:-2}}, // Liebreiz
  455:{self:true,changes:{defense:2,specialDefense:2}}, // Blockbefehl
  468:{self:true,changes:{attack:1,accuracy:1}}, // Klauenwetzer
  483:{self:true,changes:{specialAttack:1,specialDefense:1,speed:1}}, // Falterreigen
  504:{self:true,changes:{attack:2,specialAttack:2,speed:2,defense:-1,specialDefense:-1}}, // Hausbruch
  204:{self:false,changes:{attack:-2}}, // Charme
  319:{self:false,changes:{specialDefense:-2}}, // Metall-Sound
  336:{self:true,changes:{attack:1}}, // Jauler
  475:{self:true,changes:{speed:2}}, // Autotomie (Gewichtsänderung vorläufig nicht modelliert)
  489:{self:true,changes:{attack:1,defense:1,accuracy:1}}, // Einrollen
  538:{self:true,changes:{defense:3}}, // Watteschild
  508:{self:true,changes:{attack:1,speed:2}}, // Gangwechsel
  111:{self:true,changes:{defense:1}}, // Einigler
  526:{self:true,changes:{attack:1,specialAttack:1}} // Kraftschub
};
function blocksStatDrop(recipient,stat){const id=recipient.pokemon.abilityId;return id===29||id===73||(id===52&&stat==='attack')||(id===51&&stat==='accuracy')}
function applyStageMove(battle,actor,target,moveId){
 const effect=STAGE_MOVES[moveId];if(!effect)return false;
 const recipient=effect.self?actor:target;let changed=false;
 if(!effect.self&&recipient.volatile.mistTurns>0&&Object.values(effect.changes).some(delta=>delta<0)){battle.log.push('Weißnebel verhindert die Statuswertsenkung!');return true;}
 const names={attack:'Angriff',defense:'Verteidigung',specialAttack:'Spezial-Angriff',specialDefense:'Spezial-Verteidigung',speed:'Initiative',accuracy:'Genauigkeit',evasion:'Ausweichwert'};
 for(const [stat,delta] of Object.entries(effect.changes)){
  if(!effect.self&&delta<0&&blocksStatDrop(recipient,stat)){battle.log.push('Die Fähigkeit verhindert die Statuswertsenkung!');continue;}
  const adjusted=moveId===74&&activeWeather(battle)==='sun'?delta*2:delta;
  const old=recipient.stages[stat],next=Math.max(-6,Math.min(6,old+adjusted));recipient.stages[stat]=next;
  if(next!==old){changed=true;battle.log.push(`${names[stat]} ${delta>0?'steigt':'sinkt'}${Math.abs(delta)>1?' stark':''}.`)}
 }
 if(!changed)battle.log.push('Die Statuswerte können sich nicht weiter verändern.');
 return true;
}
function confuse(battle,target,rng){if(preventsConfusion(target)){battle.log.push('Tempomacher verhindert Verwirrung.');return false}if((target.volatile.confusionTurns||0)>0){battle.log.push('Das Ziel ist bereits verwirrt.');return false}target.volatile.confusionTurns=2+Math.floor(validRng(rng)*3);battle.log.push('Das Ziel wurde verwirrt!');return true}
const RECHARGE_MOVES=new Set([63,416,439,459]);
const PREPARATION_MOVES=new Set([13,19,76,91,130,143,291,340]);
const SEMI_INVULNERABLE_MOVES=new Set([19,91,291,340]);
function perform(battle,actor,target,index,rng,tag){const moveId=actor.pokemon.moves[index];let move=getMove(moveId);if(!move||!Number.isInteger(index)||index<0||index>=actor.pp.length)throw Error('Ungültige Attackenauswahl');if(!Number.isInteger(actor.volatile.solarChargeIndex)&&actor.pp[index]<=0)throw Error('Keine AP übrig');if(actor.pokemon.currentHp<=0)return;
 if(actor.volatile.rechargeTurns>0){actor.volatile.rechargeTurns--;battle.log.push(`${tag} muss sich nach dem Angriff erholen!`);return;}
 if(actor.volatile.healBlockTurns>0&&(RECOVERY_MOVES.has(move.id)||[105,135,156,208,234,235,236,303,355,456].includes(move.id))){battle.log.push('Heilblockade verhindert die Heilung!');return}
 if(actor.volatile.tauntTurns>0&&move.category===1){battle.log.push('Verhöhner verhindert die Statusattacke!');return}
 if(actor.volatile.flinched){if(!DEFENSIVE_MOVES.has(move.id))actor.volatile.protectStreak=0;actor.volatile.flinched=false;battle.log.push(`${tag} schreckt zurück!`);return}
 if(actor.pokemon.status==='sleep'){if((actor.volatile?.sleepTurns??0)>0){actor.volatile.sleepTurns--;battle.log.push(`${tag} schläft tief und fest.`);return}actor.pokemon.status=null;battle.log.push(`${tag} ist aufgewacht!`)}if(actor.pokemon.status==='freeze'){if(validRng(rng)<0.2){actor.pokemon.status='healthy';battle.log.push(`${tag} taut auf!`)}else{battle.log.push(`${tag} kann sich nicht bewegen.`);return}}
 if(actor.pokemon.status==='paralysis'&&validRng(rng)<0.25){battle.log.push(`${tag} ist paralysiert.`);return}
 if((actor.volatile.confusionTurns||0)>0){actor.volatile.confusionTurns--;battle.log.push(`${tag} ist verwirrt!`);if(actor.volatile.confusionTurns===0){battle.log.push(`${tag} ist nicht mehr verwirrt.`)}else if(validRng(rng)<1/3){const hit=Math.max(1,Math.floor(actor.pokemon.stats.hp/8));actor.pokemon.currentHp=Math.max(0,actor.pokemon.currentHp-hit);battle.log.push(`${tag} verletzt sich selbst (${hit} KP).`);return}}
 const charging=actor.volatile.solarChargeIndex!==null&&actor.volatile.solarChargeIndex!==undefined;
 if(charging){index=actor.volatile.solarChargeIndex;actor.volatile.solarChargeIndex=null;move=getMove(actor.pokemon.moves[index]);battle.log.push(`${tag} entfesselt ${move.de||move.name}!`)}
 else {actor.pp[index]--;battle.log.push(`${tag} setzt ${move.de||move.name} ein.`);
  if(PREPARATION_MOVES.has(move.id)&&!(move.id===76&&activeWeather(battle)==='sun')){
   actor.volatile.solarChargeIndex=index;
   if(move.id===130){actor.stages.defense=Math.min(6,(actor.stages.defense||0)+1);battle.log.push(`${tag} stärkt seine Verteidigung!`);}
   battle.log.push(move.id===76?`${tag} sammelt Sonnenlicht!`:`${tag} bereitet ${move.de||move.name} vor!`);return;
  }
 }

 if(DEFENSIVE_MOVES.has(move.id)){
  const streak=actor.volatile.protectStreak||0;
  const success=streak===0||validRng(rng)<Math.pow(1/3,streak);
  actor.volatile.protectStreak=streak+1;
  actor.volatile.protected=success&&PROTECT_MOVES.has(move.id);
  actor.volatile.enduring=success&&move.id===ENDURE_MOVE;
  battle.log.push(success?(move.id===ENDURE_MOVE?`${tag} hält mit Ausdauer durch!`:`${tag} schützt sich vor gegnerischen Attacken!`):'Der Schutz ist fehlgeschlagen.');
  return;
 }
 actor.volatile.protectStreak=0;
 const selfTargeted=Boolean(HAZARD_MOVES[move.id]||NO_EFFECT_MOVES.has(move.id)||[287,116].includes(move.id)||RECOVERY_MOVES.has(move.id)||FIELD_MOVES[move.id]||WEATHER_MOVES[move.id]||[156,114,187,273,215,312,AQUA_RING_MOVE,INGRAIN_MOVE].includes(move.id)||(STAGE_MOVES[move.id]?.self));
 if(!selfTargeted&&Number.isInteger(target.volatile.solarChargeIndex)&&SEMI_INVULNERABLE_MOVES.has(target.pokemon.moves[target.volatile.solarChargeIndex])&&!preparationInteraction(target.pokemon.moves[target.volatile.solarChargeIndex],move.id).canHit){battle.log.push('Das Ziel ist während der Vorbereitung nicht erreichbar!');return;}
 if(target.volatile.protected&&!selfTargeted){battle.log.push('Das Ziel schützt sich vor der Attacke!');return;}
 if(!selfTargeted&&move.accuracy!==null&&validRng(rng)>=hitChance(actor,target,move,activeWeather(battle))){battle.log.push('Die Attacke verfehlt ihr Ziel.');return}
 // Type absorption is resolved once, before move side effects.
 if(!selfTargeted&&absorbsGround(target.pokemon.abilityId,move.typeId,move.category,move.power)){battle.log.push('Schwebe schützt vor der Bodenattacke!');return;}
 const targetsOpponent=!selfTargeted&&(move.category!==1||STATUS_MOVES[move.id]||CONFUSION_MOVES.has(move.id)||move.id===LEECH_SEED_MOVE||(STAGE_MOVES[move.id]&&!STAGE_MOVES[move.id].self));
 const absorption=targetsOpponent?absorptionEffect(target.pokemon.abilityId,move.typeId,move.category):null;
 if(absorption){
  if(absorption.flashFire){target.volatile.flashFireBoost=true;battle.log.push('Feuerfänger absorbiert die Feuerattacke und verstärkt Feuerattacken des Ziels!');}
  else if(absorption.heal){const heal=Math.min(target.pokemon.stats.hp-target.pokemon.currentHp,Math.max(1,Math.floor(target.pokemon.stats.hp/4)));target.pokemon.currentHp+=heal;battle.log.push(`${absorption.name} absorbiert die Attacke!${heal?` Das Ziel regeneriert ${heal} KP.`:''}`);}
  else {const old=target.stages[absorption.stat]??0;target.stages[absorption.stat]=Math.min(6,old+1);battle.log.push(`${absorption.name} absorbiert die Attacke! ${absorption.stat} steigt${old===6?' nicht weiter':''}.`);}
  return;
 }
 if(move.id===222){const roll=validRng(rng);const level=roll<0.05?4:roll<0.15?5:roll<0.35?6:roll<0.65?7:roll<0.85?8:roll<0.95?9:10;move={...move,power:({4:10,5:30,6:50,7:70,8:90,9:110,10:150})[level]};battle.log.push(`Intensität ${level}!`);}
 if(!FIXED_DAMAGE_MOVES.has(move.id)&&(move.category===1||move.power===null||move.power===0)){if(FORCE_SWITCH_MOVES.has(move.id)){
  if(target.volatile.ingrained){battle.log.push('Verwurzler verhindert den erzwungenen Wechsel.');}
  else {const side=actor===battle.player?'opponent':'player';battle.pendingSwitch={side,kind:'forced',moveId:move.id};battle.log.push('Das Ziel muss ausgewechselt werden!');}
 }else if(HAZARD_MOVES[move.id]){
  setHazard(battle,actor,move.id);
 }else if(move.id===432){
  const opponent=actor===battle.player?'opponentSideFields':'playerSideFields';
  const own=actor===battle.player?'playerSideFields':'opponentSideFields';
  const removedOpponent=clearHazards(battle,opponent);const removedOwn=clearHazards(battle,own);const removed=removedOpponent||removedOwn;
  target.stages.evasion=Math.max(-6,(target.stages.evasion??0)-1);
  battle.log.push(removed?'Auflockern beseitigt die ausgelegten Fallen!':'Auflockern senkt den Ausweichwert!');
 }else if(NO_EFFECT_MOVES.has(move.id)){
  battle.log.push('Aber nichts geschieht.');
 }else if(move.id===215||move.id===312){ // Vitalglocke / Aromakur: aktives Pokémon
  const party=actor===battle.player?battle.playerTeam:battle.opponentTeam;let cured=0;for(const pokemon of [actor.pokemon,...(Array.isArray(party)?party.filter(p=>p!==actor.pokemon&&p!==party[battle.playerTeamIndex]):[])]){if(pokemon.status&&pokemon.status!=='healthy'){pokemon.status='healthy';pokemon.toxicCounter=0;cured++;}}actor.volatile.sleepTurns=0;battle.log.push(cured?`${cured} Pokémon wurden von Statusproblemen geheilt!`:'Kein Pokémon hat ein Statusproblem.');
 }else if(move.id===273){ // Wunschtraum: Heilung am Ende der folgenden Runde
  const side=battle[actor===battle.player?'playerSideFields':'opponentSideFields'];if(side.wishTurns>0)battle.log.push('Ein Wunsch ist bereits aktiv.');else {side.wishTurns=2;side.wishHeal=Math.max(1,Math.floor(actor.pokemon.stats.hp/2));actor.volatile.wishTurns=2;actor.volatile.wishHeal=side.wishHeal;battle.log.push(`${tag} äußert einen Wunsch!`)}
 }else if(move.id===298){ // Taumeltanz verwirrt beide aktiven Pokémon (Einzelkampf)
  confuse(battle,actor,rng);confuse(battle,target,rng);
 }else if(move.id===287){ // Heilung: primäre Statusprobleme beseitigen
  if(actor.pokemon.status&&actor.pokemon.status!=='healthy'){actor.pokemon.status='healthy';actor.volatile.sleepTurns=0;battle.log.push(`${tag} ist wieder gesund!`)}
  else battle.log.push('Es gibt kein Statusproblem zu heilen.');
 }else if(move.id===281){ // Gähner: Schlaf nach der nächsten Rundenabrechnung
  if(target.volatile.yawnTurns>0||target.pokemon.status&&target.pokemon.status!=='healthy'||preventsStatus(target,'sleep',activeWeather(battle))||typeBlocksStatus('sleep',speciesTypes(target.pokemon.speciesId,target.pokemon.formId))||target.volatile.safeguardTurns>0)battle.log.push('Gähner hat keine Wirkung.');
  else {target.volatile.yawnTurns=2;battle.log.push('Das Ziel wird schläfrig!')}
 }else if(move.id===269){target.volatile.tauntTurns=3;battle.log.push('Das Ziel wurde verhöhnt!');
 }else if(move.id===207||move.id===260){ // Angeberei/Schmeichler
  const stat=move.id===207?'attack':'specialAttack';target.stages[stat]=Math.min(6,target.stages[stat]+2);battle.log.push('Der Statuswert des Ziels steigt stark!');confuse(battle,target,rng);
 }else if(move.id===505){ // Heilwoge heilt das Ziel
  const amount=Math.min(target.pokemon.stats.hp-target.pokemon.currentHp,Math.max(1,Math.floor(target.pokemon.stats.hp/2)));target.pokemon.currentHp+=amount;battle.log.push(amount?`Das Ziel regeneriert ${amount} KP.`:'Das Ziel hat bereits volle KP.');
 }else if(FIELD_MOVES[move.id]){
  const [key,label]=FIELD_MOVES[move.id];if(actor.volatile[key]>0)battle.log.push(`${label} ist bereits aktiv.`);else {actor.volatile[key]=move.id===366?4:5;battle.log.push(`${label} wirkt auf ${tag}!`)}
 }else if(WEATHER_MOVES[move.id]){
  const [weather,label]=WEATHER_MOVES[move.id];battle.weather=weather;battle.weatherTurns=5;battle.log.push(`${label} beginnt!`);
 }else if(move.id===156){ // Erholung: vollständig heilen und einschlafen
  if(actor.pokemon.currentHp===actor.pokemon.stats.hp&&(!actor.pokemon.status||actor.pokemon.status==='healthy'))battle.log.push('Erholung schlägt fehl: KP bereits voll.');
  else if(preventsStatus(actor,'sleep',activeWeather(battle)))battle.log.push('Die Fähigkeit verhindert Erholung.');
  else {actor.pokemon.currentHp=actor.pokemon.stats.hp;actor.pokemon.status='sleep';actor.volatile.sleepTurns=2;battle.log.push(`${tag} erholt sich vollständig und schläft ein!`)}
 }else if(move.id===244){ // Psycho-Plus
  actor.stages={...target.stages};battle.log.push('Psycho-Plus übernimmt die Statuswertveränderungen des Ziels!');
 }else if(move.id===384){ // Krafttausch: nur offensive Stufen
  for(const stat of ['attack','specialAttack']){const old=actor.stages[stat];actor.stages[stat]=target.stages[stat];target.stages[stat]=old;}battle.log.push('Krafttausch vertauscht die Angriffsstufen!');
 }else if(move.id===391){ // Statustausch: alle sieben Stufen
  for(const stat of Object.keys(actor.stages)){const old=actor.stages[stat];actor.stages[stat]=target.stages[stat];target.stages[stat]=old;}battle.log.push('Statustausch vertauscht sämtliche Statuswertstufen!');
 }else if(move.id===220){ // Leidteiler: Mittelwert der aktuellen KP, durch maximale KP begrenzt
  const average=Math.floor((actor.pokemon.currentHp+target.pokemon.currentHp)/2);
  actor.pokemon.currentHp=Math.min(actor.pokemon.stats.hp,average);
  target.pokemon.currentHp=Math.min(target.pokemon.stats.hp,average);
  battle.log.push('Leidteiler gleicht die KP beider Pokémon aus!');
 }else if(move.id===187){ // Bauchtrommel: halbe maximale KP für +6 Angriff
  const cost=Math.floor(actor.pokemon.stats.hp/2);
  if(actor.stages.attack>=6||actor.pokemon.currentHp<=cost)battle.log.push('Bauchtrommel schlägt fehl!');
  else {actor.pokemon.currentHp-=cost;actor.stages.attack=6;battle.log.push(`${tag} maximiert seinen Angriff mit Bauchtrommel!`)}
 }else if(move.id===385){ // Schutztausch
  for(const stat of ['defense','specialDefense']){const value=actor.stages[stat];actor.stages[stat]=target.stages[stat];target.stages[stat]=value;}battle.log.push('Schutztausch vertauscht die Verteidigungsstufen!');
 }else if(move.id===367){ // Akupressur
  const options=Object.keys(STAGE_LABELS).filter(stat=>(actor.stages[stat]??0)<6);if(!options.length)battle.log.push('Kein Statuswert kann weiter steigen.');else{const stat=options[Math.floor(validRng(rng)*options.length)];actor.stages[stat]=Math.min(6,actor.stages[stat]+2);battle.log.push(`${STAGE_LABELS[stat]} steigt durch Akupressur stark!`)}
 }else if(move.id===377){ // Heilblockade
  target.volatile.healBlockTurns=5;battle.log.push('Heilblockade verhindert heilende Attacken!');
 }else if(move.id===456){ // Heilbefehl
  const heal=Math.min(actor.pokemon.stats.hp-actor.pokemon.currentHp,Math.max(1,Math.floor(actor.pokemon.stats.hp/2)));actor.pokemon.currentHp+=heal;battle.log.push(heal?`${tag} regeneriert ${heal} KP.`:'Die KP sind bereits voll.');
 }else if(move.id===114){ // Dunkelnebel: alle Kampfstufen zurücksetzen
  for(const fighter of [actor,target])for(const stat of Object.keys(fighter.stages))fighter.stages[stat]=0;
  battle.log.push('Dunkelnebel setzt alle Statuswertveränderungen zurück!');
 }else if(RECOVERY_MOVES.has(move.id)){
  const missing=actor.pokemon.stats.hp-actor.pokemon.currentHp;
  if(missing>0){const heal=Math.min(missing,Math.max(1,Math.floor(actor.pokemon.stats.hp*( [234,235,236].includes(move.id)?(activeWeather(battle)==='sun'?2/3:activeWeather(battle)?1/4:1/2):1/2))));actor.pokemon.currentHp+=heal;battle.log.push(`${tag} erhält ${heal} KP zurück.`)}
  else battle.log.push('Die KP sind bereits vollständig aufgefüllt.');
 }else if(move.id===LEECH_SEED_MOVE){
  if(speciesTypes(target.pokemon.speciesId,target.pokemon.formId).includes(12))battle.log.push('Pflanzen-Pokémon sind gegen Egelsamen immun.');
  else if(target.volatile.seeded)battle.log.push('Das Ziel ist bereits von Egelsamen befallen.');
  else {target.volatile.seeded=true;battle.log.push('Egelsamen wurden am Ziel gepflanzt!')}
 }else if(move.id===AQUA_RING_MOVE||move.id===INGRAIN_MOVE){
  const key=move.id===AQUA_RING_MOVE?'aquaRing':'ingrained';
  if(actor.volatile[key])battle.log.push('Der Heilungseffekt ist bereits aktiv.');
  else {actor.volatile[key]=true;battle.log.push(move.id===AQUA_RING_MOVE?`${tag} wird von einem Wasserring umgeben!`:`${tag} verwurzelt sich!`)}
 }else if(CONFUSION_MOVES.has(move.id))confuse(battle,target,rng);else if(STATUS_MOVES[move.id]){if(applyCondition(battle,target,STATUS_MOVES[move.id].status,rng)&&STATUS_MOVES[move.id].toxic)target.pokemon.toxicCounter=1;}else if(!applyStageMove(battle,actor,target,move.id))battle.log.push('Der Spezialeffekt dieser Attacke ist noch nicht implementiert.');return}
 const attempts=multiHitCount(move.id,actor.pokemon.abilityId,rng);
 let value=0,inflicted=0,hits=0;
 for(let hit=0;hit<attempts&&target.pokemon.currentHp>0;hit++){
  const single=FIXED_DAMAGE_MOVES.has(move.id)?fixedDamage(actor,target,move):damage(actor,target,move,rng,activeWeather(battle));
  const sturdyDamage=sturdySurvivalHp(target,single);
  // Robustheit hat Vorrang: Ein zusätzlich getragener Fokusgurt bleibt unbenutzt.
  const protectedDamage=heldFocusSashSurvival(target.pokemon,sturdyDamage);
  if(sturdyDamage<single)battle.log.push('Robustheit verhindert den K.-o.-Treffer!');
  if(protectedDamage<sturdyDamage){target.pokemon.heldItemId=null;battle.log.push('Fokusgurt verhindert den K.-o.-Treffer und wird verbraucht!');}
  const actual=target.volatile.enduring?Math.min(protectedDamage,Math.max(0,target.pokemon.currentHp-1)):Math.min(protectedDamage,target.pokemon.currentHp);
  value+=actual;inflicted+=actual;
  target.pokemon.currentHp-=actual;
  hits++;
 }
 battle.log.push(value?`${value} Schadenspunkte.`:'Keine Wirkung.');
 if(MULTI_HIT_RANGES[move.id]&&hits>0)battle.log.push(`${hits} Treffer!`);
 if(target.volatile.enduring&&target.pokemon.currentHp===1&&hits>0&&typeEffectiveness(move.typeId,speciesTypes(target.pokemon.speciesId,target.pokemon.formId))>0)battle.log.push('Das Ziel übersteht den Angriff dank Ausdauer mit 1 KP!');
 if(move.id===499&&inflicted>0){for(const stat of Object.keys(target.stages))target.stages[stat]=0;battle.log.push('Klärsmog hebt die Statuswertveränderungen auf!');}
 if(move.id===229&&inflicted>0){
  const side=actor===battle.player?'playerSideFields':'opponentSideFields';
  if(clearHazards(battle,side))battle.log.push('Turbodreher beseitigt die eigenen Fallen!');
  actor.volatile.seeded=false;
 }
 if(inflicted>0&&RECHARGE_MOVES.has(move.id)&&actor.pokemon.currentHp>0){actor.volatile.rechargeTurns=1;battle.log.push(`${tag} muss in der nächsten Runde aussetzen!`);}
 if(inflicted>0&&PIVOT_MOVES.has(move.id)&&actor.pokemon.currentHp>0){battle.pendingSwitch={side:actor===battle.player?'player':'opponent',kind:'pivot',moveId:move.id};battle.log.push('Nach dem Treffer kann das angreifende Pokémon ausgewechselt werden!');}
 if(inflicted>0&&move.id===525&&target.pokemon.currentHp>0&&!target.volatile.ingrained){battle.pendingSwitch={side:actor===battle.player?'opponent':'player',kind:'forced',moveId:move.id};battle.log.push('Drachenrute erzwingt einen Wechsel!');}
 if(inflicted>0&&DRAIN_MOVES[move.id]&&actor.volatile.healBlockTurns<=0){
  const heal=Math.min(actor.pokemon.stats.hp-actor.pokemon.currentHp,Math.max(1,Math.floor(inflicted*DRAIN_MOVES[move.id])));
  if(heal>0){actor.pokemon.currentHp+=heal;battle.log.push(`${tag} absorbiert ${heal} KP.`)}
 }
 const orbRecoil=ignoresIndirectDamage(actor)?0:heldLifeOrbRecoil(actor.pokemon,inflicted);
 if(orbRecoil){actor.pokemon.currentHp-=orbRecoil;battle.log.push(`${tag} verliert ${orbRecoil} KP durch Leben-Orb.`)}
 if(inflicted>0&&RECOIL_MOVES[move.id]){
  const recoil=Math.max(1,Math.floor(inflicted*RECOIL_MOVES[move.id]));
  actor.pokemon.currentHp=Math.max(0,actor.pokemon.currentHp-recoil);
  battle.log.push(`${tag} erleidet ${recoil} KP Rückstoßschaden.`);
 }if(value>0&&target.pokemon.currentHp>0&&!blocksSecondaryEffect(target)&&HIT_STATUS[move.id]&&validRng(rng)<secondaryEffectChance(actor,HIT_STATUS[move.id].chance)){if(HIT_STATUS[move.id].status==='confusion')confuse(battle,target,rng);else applyCondition(battle,target,HIT_STATUS[move.id].status,rng);}
 if(value>0&&(!blocksSecondaryEffect(target)||HIT_STAGE[move.id]?.self))applyHitStage(battle,target,move.id,()=>Math.min(0.999999,validRng(rng)/(actor.pokemon.abilityId===32?2:1)));
 if(value>0&&target.pokemon.currentHp>0&&!blocksSecondaryEffect(target)&&HIT_CONFUSION[move.id]&&validRng(rng)<secondaryEffectChance(actor,HIT_CONFUSION[move.id]))confuse(battle,target,rng);
 if(value>0&&target.pokemon.currentHp>0&&!blocksSecondaryEffect(target)&&!blocksFlinch(target)&&!target.volatile.actedThisTurn&&HIT_FLINCH[move.id]&&validRng(rng)<secondaryEffectChance(actor,HIT_FLINCH[move.id])){target.volatile.flinched=true;battle.log.push('Das Ziel schreckt zurück!');}
 const factor=typeEffectiveness(move.typeId,speciesTypes(target.pokemon.speciesId,target.pokemon.formId));if(factor>1)battle.log.push('Das ist sehr effektiv!');if(factor>0&&factor<1)battle.log.push('Das ist nicht sehr effektiv.');
}
export function availableMoves(f){return f.pokemon.moves.map((id,index)=>({index,id,name:getMove(id)?.de||getMove(id)?.name,pp:f.pp[index],maxPp:getMove(id)?.pp}));}
function applyEndTurnStatus(battle,rng=Math.random){
 const p=battle.player,e=battle.opponent;
 for(const f of [p,e]){if(f.volatile.tauntTurns>0)f.volatile.tauntTurns--;if(f.volatile.yawnTurns>0&&--f.volatile.yawnTurns===0&&f.pokemon.currentHp>0&&(!f.pokemon.status||f.pokemon.status==='healthy'))applyCondition(battle,f,'sleep',rng)}
 for(const [f,sideName] of [[p,'playerSideFields'],[e,'opponentSideFields']]){const side=battle[sideName];if(side?.wishTurns>0){side.wishTurns--;f.volatile.wishTurns=side.wishTurns;if(side.wishTurns===0){if(f.pokemon.currentHp>0&&!(f.volatile.healBlockTurns>0)){const heal=Math.min(f.pokemon.stats.hp-f.pokemon.currentHp,side.wishHeal||0);f.pokemon.currentHp+=heal;battle.log.push(`Wunschtraum heilt ${heal} KP!`)}side.wishHeal=0;f.volatile.wishHeal=0;}}}
 for(const f of [p,e])for(const [key,label] of Object.values(FIELD_MOVES)){if(f.volatile[key]>0&&--f.volatile[key]===0)battle.log.push(`${label} lässt nach.`)}
 for(const [fighter,side] of [[p,'playerSideFields'],[e,'opponentSideFields']]){battle[side]??={};for(const key of SIDE_FIELD_KEYS)battle[side][key]=Math.max(0,fighter.volatile[key]||0)}
 const weather=activeWeather(battle);
 if(weather==='sand'||weather==='hail'){
  for(const [f,tag] of [[p,'Dein Pokémon'],[e,'Gegner']]){
   const types=speciesTypes(f.pokemon.speciesId,f.pokemon.formId);const immune=weatherDamageImmune(f,weather,types);
   if(f.pokemon.currentHp>0&&!immune){const amount=residualDamage(f.pokemon,16);f.pokemon.currentHp-=amount;battle.log.push(`${tag} erleidet ${amount} KP durch ${weather==='sand'?'Sandsturm':'Hagel'}.`)}
  }
 }
 // Wetterfähigkeiten werden vor dem Wetterablauf angewendet, damit die letzte Runde zählt.
 for(const [f,tag] of [[p,'Dein Pokémon'],[e,'Gegner']]){
  if(f.pokemon.currentHp<=0)continue;
  const ability=f.pokemon.abilityId;
  const cure=statusCureAbility(f,weather,()=>validRng(rng));
  if(cure){f.pokemon.status='healthy';f.pokemon.toxicCounter=0;f.volatile.sleepTurns=0;battle.log.push(`${tag} wird durch ${cure} geheilt.`)}
  const hpEffect=weatherAbilityHpFraction(f,weather);
  if(hpEffect){
   const amount=Math.max(1,Math.floor(f.pokemon.stats.hp*Math.abs(hpEffect.fraction)));
   if(hpEffect.fraction>0&&!(f.volatile.healBlockTurns>0)){const healed=Math.min(amount,f.pokemon.stats.hp-f.pokemon.currentHp);f.pokemon.currentHp+=healed;if(healed)battle.log.push(`${tag} regeneriert ${healed} KP durch ${hpEffect.name}.`)}
   else {const lost=Math.min(amount,f.pokemon.currentHp);f.pokemon.currentHp-=lost;if(lost)battle.log.push(`${tag} verliert ${lost} KP durch ${hpEffect.name}.`)}
  }
 }
 if(tickWeather(battle))battle.log.push('Das Wetter normalisiert sich.');
 for(const [f,tag] of [[p,'Dein Pokémon'],[e,'Gegner']]){
  if(f.pokemon.currentHp>0&&f.volatile.seeded&&!ignoresIndirectDamage(f)){
   const drain=Math.min(f.pokemon.currentHp,Math.max(1,Math.floor(f.pokemon.stats.hp/8)));
   f.pokemon.currentHp-=drain;
   const recipient=f===p?e:p;
   const heal=recipient.pokemon.currentHp>0?Math.min(drain,recipient.pokemon.stats.hp-recipient.pokemon.currentHp):0;
   recipient.pokemon.currentHp+=heal;
   battle.log.push(`${tag} verliert ${drain} KP durch Egelsamen.${heal?` Die Gegenseite erhält ${heal} KP zurück.`:''}`);
  }
  if(f.pokemon.currentHp>0&&!(f.volatile.healBlockTurns>0)){
   for(const [key,label] of [['aquaRing','Wasserring'],['ingrained','Verwurzler']]){
    if(!f.volatile[key])continue;
    const heal=Math.min(f.pokemon.stats.hp-f.pokemon.currentHp,Math.max(1,Math.floor(f.pokemon.stats.hp/16)));
    if(heal>0){f.pokemon.currentHp+=heal;battle.log.push(`${tag} erhält ${heal} KP durch ${label} zurück.`)}
   }
  }
  const heldHeal=f.volatile.healBlockTurns>0?0:heldEndTurnHeal(f.pokemon);
  if(heldHeal){f.pokemon.currentHp+=heldHeal;battle.log.push(`${tag} regeneriert ${heldHeal} KP durch Überreste.`)}
  if(f.pokemon.currentHp>0&&f.pokemon.status==='poison'&&f.pokemon.abilityId===90&&!(f.volatile.healBlockTurns>0)){
   const heal=Math.min(f.pokemon.stats.hp-f.pokemon.currentHp,Math.max(1,Math.floor(f.pokemon.stats.hp/8)));
   f.pokemon.currentHp+=heal;
   if(heal>0)battle.log.push(`${tag} regeneriert ${heal} KP durch Aufheber.`);
  }else if(f.pokemon.currentHp>0&&!ignoresIndirectDamage(f)&&!(f.pokemon.status==='poison'&&f.pokemon.abilityId===90)&&['poison','burn'].includes(f.pokemon.status)){
   const residual=f.pokemon.status==='poison'&&f.pokemon.toxicCounter>0?Math.min(f.pokemon.currentHp,Math.max(1,Math.floor(f.pokemon.stats.hp*Math.min(15,f.pokemon.toxicCounter)/16))):residualDamage(f.pokemon,8);
   if(f.pokemon.status==='poison'&&f.pokemon.toxicCounter>0)f.pokemon.toxicCounter=Math.min(15,f.pokemon.toxicCounter+1);
   f.pokemon.currentHp-=residual;
   battle.log.push(`${tag} erleidet ${residual} Statusschaden.`);
  }
 }
 for(const f of [p,e])if(f.volatile.healBlockTurns>0)f.volatile.healBlockTurns--;
}
function settleTurn(battle){
 const p=battle.player,e=battle.opponent;
 if(battle.log.length>(battle.turnEvents.at(-1)?.log.length||0))battle.turnEvents.push({actor:'status',playerHp:p.pokemon.currentHp,opponentHp:e.pokemon.currentHp,playerPp:[...p.pp],opponentPp:[...e.pp],log:[...battle.log]});
 if(p.pokemon.currentHp===0||e.pokemon.currentHp===0){battle.finished=true;battle.winner=p.pokemon.currentHp>0?'player':e.pokemon.currentHp>0?'opponent':'draw';battle.log.push('Kampf beendet.')}else battle.turn++;
 return battle;
}
export function playTurn(battle,playerMoveIndex,enemyMoveIndex,{rng=Math.random}={}){if(!canContinueBattle(battle))throw Error('Kampf bereits beendet oder ungültig');if(!Number.isInteger(playerMoveIndex)||!Number.isInteger(enemyMoveIndex))throw Error('Attackenindex erforderlich');const p=battle.player,e=battle.opponent;for(const [f,i] of [[p,playerMoveIndex],[e,enemyMoveIndex]]){const charging=f.volatile.solarChargeIndex;const effectiveIndex=charging===null||charging===undefined?i:charging;if(!f.pokemon.moves[effectiveIndex]||(!Number.isInteger(charging)&&f.pp[effectiveIndex]<=0)||!getMove(f.pokemon.moves[effectiveIndex]))throw Error('Attacke nicht verfügbar');}
 battle.log=[];battle.turnEvents=[];p.volatile.flinched=false;e.volatile.flinched=false;p.volatile.actedThisTurn=false;e.volatile.actedThisTurn=false;p.volatile.protected=false;e.volatile.protected=false;p.volatile.enduring=false;e.volatile.enduring=false;const pm=getMove(p.pokemon.moves[p.volatile.solarChargeIndex??playerMoveIndex]),em=getMove(e.pokemon.moves[e.volatile.solarChargeIndex??enemyMoveIndex]);const first=pm.priority!==em.priority?(pm.priority>em.priority?'p':'e'):speed(p,activeWeather(battle))!==speed(e,activeWeather(battle))?(speed(p,activeWeather(battle))>speed(e,activeWeather(battle))?'p':'e'):(validRng(rng)<0.5?'p':'e');
 const turns=first==='p'?[[p,e,playerMoveIndex,'Dein Pokémon'],[e,p,enemyMoveIndex,'Gegner']]:[[e,p,enemyMoveIndex,'Gegner'],[p,e,playerMoveIndex,'Dein Pokémon']];for(let position=0;position<turns.length;position++){const [a,d,i,tag]=turns[position];if(a.pokemon.currentHp===0||d.pokemon.currentHp===0||battle.pendingSwitch)break;perform(battle,a,d,i,rng,tag);a.volatile.actedThisTurn=true;if(battle.pendingSwitch){battle.pendingTurn={remaining:position===0?[{side:a===p?'opponent':'player',index:position===0?(a===p?enemyMoveIndex:playerMoveIndex):i}]:[],kind:battle.pendingSwitch.kind,forcedSide:battle.pendingSwitch.side};}battle.turnEvents.push({actor:a===p?'player':'opponent',playerHp:p.pokemon.currentHp,opponentHp:e.pokemon.currentHp,playerPp:[...p.pp],opponentPp:[...e.pp],log:[...battle.log]})}
 if(battle.pendingSwitch)return battle;
 applyEndTurnStatus(battle,rng);
 return settleTurn(battle);
}

// Complete an interrupted turn exactly once, after a pending switch was resolved.
// A forced-out target forfeits its queued action; a pivot target may still act.
export function resumeInterruptedTurn(battle,{rng=Math.random}={}){
 if(battle?.pendingSwitch)throw Error('Wechselauftrag noch nicht aufgelöst');
 if(!battle?.pendingTurn)throw Error('Keine unterbrochene Kampfrunde');
 if(battle.finished)throw Error('Kampf bereits beendet');
 const state=battle.pendingTurn;
 battle.pendingTurn=null;
 for(const action of state.remaining){
  if(state.kind==='forced'&&action.side===state.forcedSide)continue;
  const actor=battle[action.side],target=battle[action.side==='player'?'opponent':'player'];
  if(!actor||!target||actor.pokemon.currentHp<=0||target.pokemon.currentHp<=0)continue;
  perform(battle,actor,target,action.index,rng,action.side==='player'?'Dein Pokémon':'Gegner');
  actor.volatile.actedThisTurn=true;
  battle.turnEvents.push({actor:action.side,playerHp:battle.player.pokemon.currentHp,opponentHp:battle.opponent.pokemon.currentHp,playerPp:[...battle.player.pp],opponentPp:[...battle.opponent.pp],log:[...battle.log]});
  if(battle.pendingSwitch){battle.pendingTurn={remaining:[],kind:battle.pendingSwitch.kind,forcedSide:battle.pendingSwitch.side};return battle;}
 }
 applyEndTurnStatus(battle,rng);
 return settleTurn(battle);
}

// Der gegnerische Zug nach einem fehlgeschlagenen Fangversuch (ohne Spielerattacke).
export function playEnemyOnlyTurn(battle,enemyMoveIndex,{rng=Math.random}={}){
 if(!canContinueBattle(battle))throw Error('Kampf bereits beendet oder ungültig');
 const e=battle.opponent,p=battle.player;const charging=e.volatile.solarChargeIndex;const effectiveIndex=Number.isInteger(charging)?charging:enemyMoveIndex;if(!Number.isInteger(enemyMoveIndex)||!e.pokemon.moves[effectiveIndex]||(!Number.isInteger(charging)&&e.pp[effectiveIndex]<=0)||!getMove(e.pokemon.moves[effectiveIndex]))throw Error('Attacke nicht verfügbar');
 battle.log=[];battle.turnEvents=[];p.volatile.flinched=false;e.volatile.flinched=false;p.volatile.actedThisTurn=false;e.volatile.actedThisTurn=false;p.volatile.protected=false;e.volatile.protected=false;p.volatile.enduring=false;e.volatile.enduring=false;perform(battle,e,p,enemyMoveIndex,rng,'Gegner');
 battle.turnEvents.push({actor:'opponent',playerHp:p.pokemon.currentHp,opponentHp:e.pokemon.currentHp,playerPp:[...p.pp],opponentPp:[...e.pp],log:[...battle.log]});
 if(battle.pendingSwitch)return battle;
 applyEndTurnStatus(battle,rng);
 return settleTurn(battle);
}
