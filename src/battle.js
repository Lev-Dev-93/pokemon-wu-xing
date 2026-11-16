import {currentPp} from './pp-items.js';
import {getMove,speciesTypes,typeEffectiveness} from './moves.js';
import {validatePokemon} from './team.js';

const validRng=rng=>{const v=rng();if(!Number.isFinite(v)||v<0||v>=1)throw Error('Ungültiger Zufallswert');return v};
const clone=p=>structuredClone(p);
function fighter(p){if(!validatePokemon(p))throw Error('Ungültiges Kampf-Pokémon');return {pokemon:clone(p),pp:currentPp(p),stages:{attack:0,defense:0,specialAttack:0,specialDefense:0,speed:0,accuracy:0,evasion:0},volatile:{sleepTurns:0,confusionTurns:0,flinched:false,protected:false,enduring:false,protectStreak:0,seeded:false,aquaRing:false,ingrained:false,solarChargeIndex:null,flashFireBoost:false}}}
export function startBattle(own,enemy){if(!validatePokemon(own)||!validatePokemon(enemy)||own.currentHp===0||enemy.currentHp===0)throw Error('Kampf benötigt zwei kampffähige Pokémon');return {turn:1,finished:false,winner:null,weather:null,weatherTurns:0,player:fighter(own),opponent:fighter(enemy),log:['Ein Testkampf beginnt.']}}
// Wolke Sieben (13) und Klimaschutz (76) unterdrücken Wettereinflüsse, nicht die Wetterdauer.
function activeWeather(battle){return [battle.player,battle.opponent].some(f=>f.pokemon.currentHp>0&&[13,76].includes(f.pokemon.abilityId))?null:battle.weather}
function stageMult(stage){return stage>=0?(2+stage)/2:2/(2-stage)}
function accuracyMultiplier(stage){return stage>=0?(3+stage)/3:3/(3-stage)}
function hitChance(actor,target,move,weather=null){if(move.id===87&&weather==='rain')return 1;if(move.accuracy===null)return 1;const weatherEvasion=(weather==='sand'&&target.pokemon.abilityId===8)||(weather==='hail'&&target.pokemon.abilityId===81)?0.8:1;const diff=Math.max(-6,Math.min(6,(actor.stages.accuracy??0)-(target.stages.evasion??0)));return Math.min(1,(move.id===87&&weather==='sun'?0.5:move.accuracy/100)*accuracyMultiplier(diff)*weatherEvasion)}
function speed(f,weather=null){const p=f.pokemon;const boost=(weather==='sun'&&p.abilityId===34)||(weather==='rain'&&p.abilityId===33)?2:1;return p.stats.speed*stageMult(f.stages.speed)*(p.status==='paralysis'?0.5:1)*boost}
function damage(attacker,defender,move,rng,weather=null){if(!move.power||![2,3].includes(move.category))return 0;const special=move.category===3;const atk=special?'specialAttack':'attack',def=special?'specialDefense':'defense';const solarPower=special&&weather==='sun'&&attacker.pokemon.abilityId===94?1.5:1;const flashFire=move.typeId===10&&attacker.pokemon.abilityId===18&&attacker.volatile.flashFireBoost?1.5:1;const a=Math.max(1,attacker.pokemon.stats[atk]*stageMult(attacker.stages[atk])*solarPower);const d=Math.max(1,defender.pokemon.stats[def]*stageMult(defender.stages[def]));const types=speciesTypes(defender.pokemon.speciesId);const effectiveness=typeEffectiveness(move.typeId,types);if(effectiveness===0)return 0;const stab=speciesTypes(attacker.pokemon.speciesId).includes(move.typeId)?1.5:1;const burn=attacker.pokemon.status==='burn'&&!special?0.5:1;const variation=0.85+0.15*validRng(rng);const solarPenalty=move.id===76&&['rain','sand','hail'].includes(weather)?0.5:1;const weatherPower=weather==='sun'?(move.typeId===10?1.5:move.typeId===11?0.5:1):weather==='rain'?(move.typeId===11?1.5:move.typeId===10?0.5:1):1;return Math.max(1,Math.floor((Math.floor((2*attacker.pokemon.level/5+2)*move.power*a/d/50)+2)*stab*effectiveness*burn*variation*weatherPower*solarPenalty*flashFire))}
// Erste Stufenattacken: Änderung der Kampfstufen nur für die Dauer des Kampfes.
// Weitere Statusattacken werden erst aktiviert, wenn ihre Effekte implementiert sind.
// Rückstoß/Absorption beziehen sich auf tatsächlich verursachten Schaden.
// Mehrfachtreffer: ein Genauigkeitswurf pro Attacke, ein AP-Verbrauch pro Zug.
// 2–5 Treffer: 2/3 je 35 %, 4/5 je 15 %.
const MULTI_HIT_MOVES={3:[2,5],4:[2,5],24:[2,2],31:[2,5],41:[2,2],42:[2,5],140:[2,5],154:[2,5],198:[2,5],292:[2,5],331:[2,5],333:[2,5]};
function hitCount(moveId,rng){const range=MULTI_HIT_MOVES[moveId];if(!range)return 1;if(range[0]===range[1])return range[0];const roll=validRng(rng);return roll<0.35?2:roll<0.7?3:roll<0.85?4:5;}
const RECOIL_MOVES={36:0.25,38:1/3,66:0.25}; // Bodycheck, Risikotackle, Überroller
const DRAIN_MOVES={71:0.5,72:0.5,202:0.5,409:0.5}; // Absorber, Megasauger, Gigasauger, Ableithieb
const PROTECT_MOVES=new Set([182,197]);
const ENDURE_MOVE=203; // Ausdauer; teilt die Wiederholungswahrscheinlichkeit mit Schutzschild/Scanner
const DEFENSIVE_MOVES=new Set([...PROTECT_MOVES,ENDURE_MOVE]); // Schutzschild, Scanner
const RECOVERY_MOVES=new Set([105,135,208,234,235,303]); // Genesung, Weichei, Milchgetränk, Morgengrauen, Synthese, Tagedieb
const WEATHER_MOVES={241:['sun','Sonnenschein'],240:['rain','Regen'],201:['sand','Sandsturm'],258:['hail','Hagel']};
const LEECH_SEED_MOVE=73;
const AQUA_RING_MOVE=392;
const INGRAIN_MOVE=275;
const CONFUSION_MOVES=new Set([48,109]); // Superschall, Konfustrahl
const HIT_CONFUSION={60:0.1}; // Psystrahl
const HIT_FLINCH={29:0.3,44:0.3,23:0.3}; // Kopfnuss, Biss, Stampfer
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
  430:{stat:'specialDefense',delta:-1,chance:0.1} // Lichtkanone
};
const STAGE_LABELS={attack:'Angriff',defense:'Verteidigung',specialAttack:'Spezial-Angriff',specialDefense:'Spezial-Verteidigung',speed:'Initiative',accuracy:'Genauigkeit',evasion:'Ausweichwert'};
function applyHitStage(battle,target,moveId,rng){
 const effect=HIT_STAGE[moveId];if(!effect)return;
 if(effect.chance<1&&validRng(rng)>=effect.chance)return;
 const before=target.stages[effect.stat]??0;
 const after=Math.max(-6,Math.min(6,before+effect.delta));
 target.stages[effect.stat]=after;
 if(after!==before)battle.log.push(`${STAGE_LABELS[effect.stat]} des Ziels sinkt!`);
 else battle.log.push(`${STAGE_LABELS[effect.stat]} kann nicht weiter sinken.`);
}
const STATUS_MOVES={92:{status:'poison'},95:{status:'sleep'},137:{status:'paralysis'},139:{status:'poison'}};
const HIT_STATUS={40:{status:'poison',chance:0.3},52:{status:'burn',chance:0.1},53:{status:'burn',chance:0.1},7:{status:'burn',chance:0.1},9:{status:'paralysis',chance:0.1},34:{status:'paralysis',chance:0.3}};
function applyCondition(battle,target,status,rng){if(target.pokemon.status&&target.pokemon.status!=='healthy'){battle.log.push('Das Ziel hat bereits ein Statusproblem.');return false}const types=speciesTypes(target.pokemon.speciesId);if((status==='poison'&&(types.includes(4)||types.includes(9)))||(status==='burn'&&types.includes(10))||(status==='paralysis'&&types.includes(13))){battle.log.push('Das Ziel ist gegen diesen Status immun.');return false}target.pokemon.status=status;if(status==='sleep')target.volatile.sleepTurns=2+Math.floor(validRng(rng)*2);battle.log.push(({poison:'Das Ziel wurde vergiftet!',burn:'Das Ziel wurde verbrannt!',paralysis:'Das Ziel wurde paralysiert!',sleep:'Das Ziel ist eingeschlafen!'})[status]);return true}
const STAGE_MOVES={
  14:{self:true,changes:{attack:2}}, // Schwerttanz
  39:{self:false,changes:{defense:-1}}, // Rutenschlag
  43:{self:false,changes:{defense:-1}}, // Silberblick
  45:{self:false,changes:{attack:-1}}, // Heuler
  74:{self:true,changes:{attack:1,specialAttack:1}}, // Wachstum (neutrales Wetter)
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
  159:{self:true,changes:{attack:1}} // Schärfer
};
function applyStageMove(battle,actor,target,moveId){
 const effect=STAGE_MOVES[moveId];if(!effect)return false;
 const recipient=effect.self?actor:target;let changed=false;
 const names={attack:'Angriff',defense:'Verteidigung',specialAttack:'Spezial-Angriff',specialDefense:'Spezial-Verteidigung',speed:'Initiative',accuracy:'Genauigkeit',evasion:'Ausweichwert'};
 for(const [stat,delta] of Object.entries(effect.changes)){
  const old=recipient.stages[stat],next=Math.max(-6,Math.min(6,old+delta));recipient.stages[stat]=next;
  if(next!==old){changed=true;battle.log.push(`${names[stat]} ${delta>0?'steigt':'sinkt'}${Math.abs(delta)>1?' stark':''}.`)}
 }
 if(!changed)battle.log.push('Die Statuswerte können sich nicht weiter verändern.');
 return true;
}
function confuse(battle,target,rng){if((target.volatile.confusionTurns||0)>0){battle.log.push('Das Ziel ist bereits verwirrt.');return false}target.volatile.confusionTurns=2+Math.floor(validRng(rng)*3);battle.log.push('Das Ziel wurde verwirrt!');return true}
function perform(battle,actor,target,index,rng,tag){const moveId=actor.pokemon.moves[index];let move=getMove(moveId);if(!move||!Number.isInteger(index)||index<0||index>=actor.pp.length)throw Error('Ungültige Attackenauswahl');if(actor.pp[index]<=0)throw Error('Keine AP übrig');if(actor.pokemon.currentHp<=0)return;
 if(actor.volatile.flinched){if(!DEFENSIVE_MOVES.has(move.id))actor.volatile.protectStreak=0;actor.volatile.flinched=false;battle.log.push(`${tag} schreckt zurück!`);return}
 if(actor.pokemon.status==='sleep'){if((actor.volatile?.sleepTurns??0)>0){actor.volatile.sleepTurns--;battle.log.push(`${tag} schläft tief und fest.`);return}actor.pokemon.status=null;battle.log.push(`${tag} ist aufgewacht!`)}if(actor.pokemon.status==='freeze'){battle.log.push(`${tag} kann sich nicht bewegen.`);return}
 if(actor.pokemon.status==='paralysis'&&validRng(rng)<0.25){battle.log.push(`${tag} ist paralysiert.`);return}
 if((actor.volatile.confusionTurns||0)>0){actor.volatile.confusionTurns--;battle.log.push(`${tag} ist verwirrt!`);if(validRng(rng)<1/3){const hit=Math.max(1,Math.floor(actor.pokemon.stats.hp/8));actor.pokemon.currentHp=Math.max(0,actor.pokemon.currentHp-hit);battle.log.push(`${tag} verletzt sich selbst (${hit} KP).`);return}if(actor.volatile.confusionTurns===0)battle.log.push(`${tag} ist nicht mehr verwirrt.`)}
 const charging=actor.volatile.solarChargeIndex!==null&&actor.volatile.solarChargeIndex!==undefined;
 if(charging){index=actor.volatile.solarChargeIndex;actor.volatile.solarChargeIndex=null;move=getMove(actor.pokemon.moves[index]);battle.log.push(`${tag} entfesselt ${move.de||move.name}!`)}
 else {actor.pp[index]--;battle.log.push(`${tag} setzt ${move.de||move.name} ein.`);
  if(move.id===76&&activeWeather(battle)!=='sun'){actor.volatile.solarChargeIndex=index;battle.log.push(`${tag} sammelt Sonnenlicht!`);return}
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
 if(target.volatile.protected&&!RECOVERY_MOVES.has(move.id)&&!(STAGE_MOVES[move.id]?.self)){battle.log.push('Das Ziel schützt sich vor der Attacke!');return;}
 if(move.accuracy!==null&&validRng(rng)>=hitChance(actor,target,move,activeWeather(battle))){battle.log.push('Die Attacke verfehlt ihr Ziel.');return}
 // Typabsorption gilt für gegnerische Attacken, nicht für eigene Statusattacken.
 // Fähigkeit 11 H2O-Absorber, 10 Voltabsorber, 18 Feuerfänger (Gen IV).
 const absorbType={11:11,10:13,18:10}[target.pokemon.abilityId];
 if(move.category!==1&&move.power>0&&absorbType===move.typeId){
  if(target.pokemon.abilityId===18){
   target.volatile.flashFireBoost=true;
   battle.log.push('Feuerfänger absorbiert die Feuerattacke und verstärkt Feuerattacken des Ziels!');
  }else{
   const heal=Math.min(target.pokemon.stats.hp-target.pokemon.currentHp,Math.max(1,Math.floor(target.pokemon.stats.hp/4)));
   target.pokemon.currentHp+=heal;
   battle.log.push(`${target.pokemon.abilityId===11?'H2O-Absorber':'Voltabsorber'} absorbiert die Attacke!${heal?` Das Ziel regeneriert ${heal} KP.`:''}`);
  }
  return;
 }
 if(move.category===1||move.power===null||move.power===0){if(WEATHER_MOVES[move.id]){
  const [weather,label]=WEATHER_MOVES[move.id];battle.weather=weather;battle.weatherTurns=5;battle.log.push(`${label} beginnt!`);
 }else if(RECOVERY_MOVES.has(move.id)){
  const missing=actor.pokemon.stats.hp-actor.pokemon.currentHp;
  if(missing>0){const heal=Math.min(missing,Math.max(1,Math.floor(actor.pokemon.stats.hp*( [234,235].includes(move.id)?(activeWeather(battle)==='sun'?2/3:activeWeather(battle)?1/4:1/2):1/2))));actor.pokemon.currentHp+=heal;battle.log.push(`${tag} erhält ${heal} KP zurück.`)}
  else battle.log.push('Die KP sind bereits vollständig aufgefüllt.');
 }else if(move.id===LEECH_SEED_MOVE){
  if(speciesTypes(target.pokemon.speciesId).includes(12))battle.log.push('Pflanzen-Pokémon sind gegen Egelsamen immun.');
  else if(target.volatile.seeded)battle.log.push('Das Ziel ist bereits von Egelsamen befallen.');
  else {target.volatile.seeded=true;battle.log.push('Egelsamen wurden am Ziel gepflanzt!')}
 }else if(move.id===AQUA_RING_MOVE||move.id===INGRAIN_MOVE){
  const key=move.id===AQUA_RING_MOVE?'aquaRing':'ingrained';
  if(actor.volatile[key])battle.log.push('Der Heilungseffekt ist bereits aktiv.');
  else {actor.volatile[key]=true;battle.log.push(move.id===AQUA_RING_MOVE?`${tag} wird von einem Wasserring umgeben!`:`${tag} verwurzelt sich!`)}
 }else if(CONFUSION_MOVES.has(move.id))confuse(battle,target,rng);else if(STATUS_MOVES[move.id])applyCondition(battle,target,STATUS_MOVES[move.id].status,rng);else if(!applyStageMove(battle,actor,target,move.id))battle.log.push('Der Spezialeffekt dieser Attacke ist noch nicht implementiert.');return}
 const attempts=hitCount(move.id,rng);
 let value=0,inflicted=0,hits=0;
 for(let hit=0;hit<attempts&&target.pokemon.currentHp>0;hit++){
  const single=damage(actor,target,move,rng,activeWeather(battle));
  const actual=target.volatile.enduring?Math.min(single,Math.max(0,target.pokemon.currentHp-1)):Math.min(single,target.pokemon.currentHp);
  value+=actual;inflicted+=actual;
  target.pokemon.currentHp-=actual;
  hits++;
 }
 battle.log.push(value?`${value} Schadenspunkte.`:'Keine Wirkung.');
 if(MULTI_HIT_MOVES[move.id]&&hits>0)battle.log.push(`${hits} Treffer!`);
 if(target.volatile.enduring&&target.pokemon.currentHp===1&&hits>0&&typeEffectiveness(move.typeId,speciesTypes(target.pokemon.speciesId))>0)battle.log.push('Das Ziel übersteht den Angriff dank Ausdauer mit 1 KP!');
 if(inflicted>0&&DRAIN_MOVES[move.id]){
  const heal=Math.min(actor.pokemon.stats.hp-actor.pokemon.currentHp,Math.max(1,Math.floor(inflicted*DRAIN_MOVES[move.id])));
  if(heal>0){actor.pokemon.currentHp+=heal;battle.log.push(`${tag} absorbiert ${heal} KP.`)}
 }
 if(inflicted>0&&RECOIL_MOVES[move.id]){
  const recoil=Math.max(1,Math.floor(inflicted*RECOIL_MOVES[move.id]));
  actor.pokemon.currentHp=Math.max(0,actor.pokemon.currentHp-recoil);
  battle.log.push(`${tag} erleidet ${recoil} KP Rückstoßschaden.`);
 }if(value>0&&target.pokemon.currentHp>0&&HIT_STATUS[move.id]&&validRng(rng)<HIT_STATUS[move.id].chance)applyCondition(battle,target,HIT_STATUS[move.id].status,rng);
 if(value>0&&target.pokemon.currentHp>0)applyHitStage(battle,target,move.id,rng);
 if(value>0&&target.pokemon.currentHp>0&&HIT_CONFUSION[move.id]&&validRng(rng)<HIT_CONFUSION[move.id])confuse(battle,target,rng);
 if(value>0&&target.pokemon.currentHp>0&&HIT_FLINCH[move.id]&&validRng(rng)<HIT_FLINCH[move.id]){target.volatile.flinched=true;battle.log.push('Das Ziel schreckt zurück!');}
 const factor=typeEffectiveness(move.typeId,speciesTypes(target.pokemon.speciesId));if(factor>1)battle.log.push('Das ist sehr effektiv!');if(factor>0&&factor<1)battle.log.push('Das ist nicht sehr effektiv.');
}
export function availableMoves(f){return f.pokemon.moves.map((id,index)=>({index,id,name:getMove(id)?.de||getMove(id)?.name,pp:f.pp[index],maxPp:getMove(id)?.pp}));}
function applyEndTurnStatus(battle){
 const p=battle.player,e=battle.opponent;
 const weather=activeWeather(battle);
 if(weather==='sand'||weather==='hail'){
  for(const [f,tag] of [[p,'Dein Pokémon'],[e,'Gegner']]){
   const types=speciesTypes(f.pokemon.speciesId);const immune=weather==='sand'?[5,6,9].some(t=>types.includes(t)):types.includes(15);
   if(f.pokemon.currentHp>0&&!immune){const amount=Math.max(1,Math.floor(f.pokemon.stats.hp/16));f.pokemon.currentHp=Math.max(0,f.pokemon.currentHp-amount);battle.log.push(`${tag} erleidet ${amount} KP durch ${weather==='sand'?'Sandsturm':'Hagel'}.`)}
  }
 }
 // Wetterfähigkeiten werden vor dem Wetterablauf angewendet, damit die letzte Runde zählt.
 for(const [f,tag] of [[p,'Dein Pokémon'],[e,'Gegner']]){
  if(f.pokemon.currentHp<=0)continue;
  const ability=f.pokemon.abilityId;
  if((weather==='rain'&&ability===44)||(weather==='hail'&&ability===115)){
   const heal=Math.min(f.pokemon.stats.hp-f.pokemon.currentHp,Math.max(1,Math.floor(f.pokemon.stats.hp/16)));
   if(heal>0){f.pokemon.currentHp+=heal;battle.log.push(`${tag} regeneriert ${heal} KP durch ${ability===44?'Regengenuss':'Eishaut'}.`)}
  }
  // Trockenheit (87): Regen heilt 1/8, Sonne entzieht 1/8 der maximalen KP.
  if(ability===87&&weather==='rain'){
   const heal=Math.min(f.pokemon.stats.hp-f.pokemon.currentHp,Math.max(1,Math.floor(f.pokemon.stats.hp/8)));
   if(heal>0){f.pokemon.currentHp+=heal;battle.log.push(`${tag} regeneriert ${heal} KP durch Trockenheit.`)}
  }
  if(ability===87&&weather==='sun'){
   const loss=Math.min(f.pokemon.currentHp,Math.max(1,Math.floor(f.pokemon.stats.hp/8)));
   f.pokemon.currentHp-=loss;battle.log.push(`${tag} verliert ${loss} KP durch Trockenheit.`);
  }
  if(weather==='sun'&&ability===94){
   const amount=Math.min(f.pokemon.currentHp,Math.max(1,Math.floor(f.pokemon.stats.hp/8)));
   f.pokemon.currentHp-=amount;
   battle.log.push(`${tag} verliert ${amount} KP durch Solarkraft.`);
  }
 }
 if(battle.weatherTurns>0&&--battle.weatherTurns===0){battle.log.push('Das Wetter normalisiert sich.');battle.weather=null;}
 for(const [f,tag] of [[p,'Dein Pokémon'],[e,'Gegner']]){
  if(f.pokemon.currentHp>0&&f.volatile.seeded){
   const drain=Math.min(f.pokemon.currentHp,Math.max(1,Math.floor(f.pokemon.stats.hp/8)));
   f.pokemon.currentHp-=drain;
   const recipient=f===p?e:p;
   const heal=recipient.pokemon.currentHp>0?Math.min(drain,recipient.pokemon.stats.hp-recipient.pokemon.currentHp):0;
   recipient.pokemon.currentHp+=heal;
   battle.log.push(`${tag} verliert ${drain} KP durch Egelsamen.${heal?` Die Gegenseite erhält ${heal} KP zurück.`:''}`);
  }
  if(f.pokemon.currentHp>0){
   for(const [key,label] of [['aquaRing','Wasserring'],['ingrained','Verwurzler']]){
    if(!f.volatile[key])continue;
    const heal=Math.min(f.pokemon.stats.hp-f.pokemon.currentHp,Math.max(1,Math.floor(f.pokemon.stats.hp/16)));
    if(heal>0){f.pokemon.currentHp+=heal;battle.log.push(`${tag} erhält ${heal} KP durch ${label} zurück.`)}
   }
  }
  if(f.pokemon.currentHp>0&&['poison','burn'].includes(f.pokemon.status)){
   const residual=Math.max(1,Math.floor(f.pokemon.stats.hp/8));
   f.pokemon.currentHp=Math.max(0,f.pokemon.currentHp-residual);
   battle.log.push(`${tag} erleidet ${residual} Statusschaden.`);
  }
 }
}
function settleTurn(battle){
 const p=battle.player,e=battle.opponent;
 if(battle.log.length>(battle.turnEvents.at(-1)?.log.length||0))battle.turnEvents.push({actor:'status',playerHp:p.pokemon.currentHp,opponentHp:e.pokemon.currentHp,playerPp:[...p.pp],opponentPp:[...e.pp],log:[...battle.log]});
 if(p.pokemon.currentHp===0||e.pokemon.currentHp===0){battle.finished=true;battle.winner=p.pokemon.currentHp>0?'player':e.pokemon.currentHp>0?'opponent':'draw';battle.log.push('Kampf beendet.')}else battle.turn++;
 return battle;
}
export function playTurn(battle,playerMoveIndex,enemyMoveIndex,{rng=Math.random}={}){if(!battle||battle.finished)throw Error('Kampf bereits beendet oder ungültig');if(!Number.isInteger(playerMoveIndex)||!Number.isInteger(enemyMoveIndex))throw Error('Attackenindex erforderlich');const p=battle.player,e=battle.opponent;for(const [f,i] of [[p,playerMoveIndex],[e,enemyMoveIndex]])if(!f.pokemon.moves[i]||f.pp[i]<=0)throw Error('Attacke nicht verfügbar');
 battle.log=[];battle.turnEvents=[];p.volatile.flinched=false;e.volatile.flinched=false;p.volatile.protected=false;e.volatile.protected=false;p.volatile.enduring=false;e.volatile.enduring=false;const pm=getMove(p.pokemon.moves[p.volatile.solarChargeIndex??playerMoveIndex]),em=getMove(e.pokemon.moves[e.volatile.solarChargeIndex??enemyMoveIndex]);const first=pm.priority!==em.priority?(pm.priority>em.priority?'p':'e'):speed(p,activeWeather(battle))!==speed(e,activeWeather(battle))?(speed(p,activeWeather(battle))>speed(e,activeWeather(battle))?'p':'e'):(validRng(rng)<0.5?'p':'e');
 const turns=first==='p'?[[p,e,playerMoveIndex,'Dein Pokémon'],[e,p,enemyMoveIndex,'Gegner']]:[[e,p,enemyMoveIndex,'Gegner'],[p,e,playerMoveIndex,'Dein Pokémon']];for(const [a,d,i,tag] of turns){if(a.pokemon.currentHp===0||d.pokemon.currentHp===0)break;perform(battle,a,d,i,rng,tag);battle.turnEvents.push({actor:a===p?'player':'opponent',playerHp:p.pokemon.currentHp,opponentHp:e.pokemon.currentHp,playerPp:[...p.pp],opponentPp:[...e.pp],log:[...battle.log]})}
 applyEndTurnStatus(battle);
 return settleTurn(battle);
}

// Der gegnerische Zug nach einem fehlgeschlagenen Fangversuch (ohne Spielerattacke).
export function playEnemyOnlyTurn(battle,enemyMoveIndex,{rng=Math.random}={}){
 if(!battle||battle.finished)throw Error('Kampf bereits beendet oder ungültig');
 const e=battle.opponent,p=battle.player;if(!Number.isInteger(enemyMoveIndex)||!e.pokemon.moves[enemyMoveIndex]||e.pp[enemyMoveIndex]<=0)throw Error('Attacke nicht verfügbar');
 battle.log=[];battle.turnEvents=[];p.volatile.flinched=false;e.volatile.flinched=false;p.volatile.protected=false;e.volatile.protected=false;p.volatile.enduring=false;e.volatile.enduring=false;perform(battle,e,p,enemyMoveIndex,rng,'Gegner');
 battle.turnEvents.push({actor:'opponent',playerHp:p.pokemon.currentHp,opponentHp:e.pokemon.currentHp,playerPp:[...p.pp],opponentPp:[...e.pp],log:[...battle.log]});
 applyEndTurnStatus(battle);
 return settleTurn(battle);
}
