import {entryWeather,intimidates,curesOnSwitchOut} from './ability-effects.js';
// Entry abilities are applied once per actual entry, never during a normal turn.
export function applyEntryAbility(battle, side){
 if(!['player','opponent'].includes(side))throw Error('Ungültige Kampfseite');
 const entrant=battle?.[side], opponent=battle?.[side==='player'?'opponent':'player'];
 if(!entrant?.pokemon||!opponent?.pokemon||!Number.isFinite(entrant.pokemon.currentHp)||entrant.pokemon.currentHp<=0)return battle;
 // Imported or resumed battles may lack optional stage/log containers.
 if(!Array.isArray(battle.log))battle.log=[];
 if(!entrant.stages||typeof entrant.stages!=='object')entrant.stages={};
 if(!opponent.stages||typeof opponent.stages!=='object')opponent.stages={};
 const ability=entrant.pokemon.abilityId;
 const weatherEntry=entryWeather(ability);
 if(weatherEntry){
  const [weather,label]=weatherEntry;battle.weather=weather;battle.weatherTurns=5;
  battle.log.push(`${label} beginnt durch die Fähigkeit des eingewechselten Pokémon!`);
 }
 if(intimidates(ability)&&opponent.pokemon.currentHp>0){
  const old=Number.isFinite(opponent.stages.attack)?Math.max(-6,Math.min(6,opponent.stages.attack)):0;opponent.stages.attack=Math.max(-6,old-1);
  if(old!==opponent.stages.attack)battle.log.push('Bedroher senkt den Angriff des Gegners!');
 }
 if(ability===117&&battle.weather==='hail')battle.log.push('Hagel wird durch Hagelalarm ausgelöst.');
 return battle;
}
export function cureOnSwitchOut(pokemon){
 if(curesOnSwitchOut(pokemon?.abilityId)&&pokemon.status&&pokemon.status!=='healthy')pokemon.status='healthy';
 return pokemon;
}
