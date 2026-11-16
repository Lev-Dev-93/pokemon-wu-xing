import {entryWeather,intimidates,curesOnSwitchOut} from './ability-effects.js';
// Entry abilities are applied once per actual entry, never during a normal turn.
export function applyEntryAbility(battle, side){
 const entrant=battle?.[side], opponent=battle?.[side==='player'?'opponent':'player'];
 if(!entrant||!opponent||entrant.pokemon.currentHp<=0)return battle;
 const ability=entrant.pokemon.abilityId;
 if(entryWeather(ability)){
  const [weather,label]=entryWeather(ability);battle.weather=weather;battle.weatherTurns=5;
  battle.log.push(`${label} beginnt durch die Fähigkeit des eingewechselten Pokémon!`);
 }
 if(intimidates(ability)&&opponent.pokemon.currentHp>0){
  const old=opponent.stages.attack??0;opponent.stages.attack=Math.max(-6,old-1);
  if(old!==opponent.stages.attack)battle.log.push('Bedroher senkt den Angriff des Gegners!');
 }
 if(ability===117&&battle.weather==='hail')battle.log.push('Hagel wird durch Hagelalarm ausgelöst.');
 return battle;
}
export function cureOnSwitchOut(pokemon){
 if(curesOnSwitchOut(pokemon?.abilityId)&&pokemon.status&&pokemon.status!=='healthy')pokemon.status='healthy';
 return pokemon;
}
