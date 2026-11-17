import {speciesTypes,typeEffectiveness} from './moves.js';
import {typeBlocksStatus} from './battle-status-rules.js';
import {preventsStatus} from './ability-effects.js';

export const HAZARD_MOVES={191:'spikes',390:'toxicSpikes',446:'stealthRock'};
export function ensureHazards(battle){for(const side of ['playerSideFields','opponentSideFields']){battle[side]??={};const f=battle[side];f.spikes=Math.max(0,Math.min(3,f.spikes||0));f.toxicSpikes=Math.max(0,Math.min(2,f.toxicSpikes||0));f.stealthRock=Boolean(f.stealthRock)}}
export function setHazard(battle,actor,moveId){const kind=HAZARD_MOVES[moveId];if(!kind)return false;ensureHazards(battle);const fields=battle[actor===battle.player?'opponentSideFields':'playerSideFields'];const max=kind==='spikes'?3:kind==='toxicSpikes'?2:1;const old=Number(fields[kind]||0);if(old>=max){battle.log.push('Weitere Fallen können nicht ausgelegt werden.');return true}fields[kind]=kind==='stealthRock'?true:old+1;battle.log.push(({spikes:'Stachler',toxicSpikes:'Giftspitzen',stealthRock:'Tarnsteine'})[kind]+' liegen nun auf der gegnerischen Seite!');return true}
export function clearHazards(battle,side){ensureHazards(battle);const f=battle[side];const had=Boolean(f.spikes||f.toxicSpikes||f.stealthRock);f.spikes=0;f.toxicSpikes=0;f.stealthRock=false;return had}
export function entryHazards(battle,side,fighter){ensureHazards(battle);const f=battle[side],p=fighter.pokemon,types=speciesTypes(p.speciesId,p.formId);if(p.currentHp<=0)return;const grounded=!types.includes(3)&&p.abilityId!==26;
 const harm=(fraction,name)=>{if(p.currentHp<=0)return;const amount=Math.min(p.currentHp,Math.max(1,Math.floor(p.stats.hp*fraction)));p.currentHp-=amount;battle.log.push(`${name} verursachen ${amount} KP Schaden beim Einwechseln.`)};
 if(f.stealthRock){const effectiveness=typeEffectiveness(6,types);if(effectiveness>0)harm(effectiveness/8,'Tarnsteine')}
 if(grounded&&f.spikes)harm([0,1/8,1/6,1/4][f.spikes],'Stachler');
 if(p.currentHp<=0||!grounded||!f.toxicSpikes)return;
 if(types.includes(4)){f.toxicSpikes=0;battle.log.push('Das Gift-Pokémon entfernt die Giftspitzen.');return}
 if(typeBlocksStatus('poison',types)||preventsStatus(fighter,'poison',null)||p.status&&p.status!=='healthy')return;
 p.status='poison';p.toxicCounter=f.toxicSpikes>=2?1:0;battle.log.push('Giftspitzen vergiften das eingewechselte Pokémon.');
}
