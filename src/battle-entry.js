// Entry abilities are applied once per actual entry, never during a normal turn.
const WEATHER_ABILITIES = {2:['rain','Regen'],70:['sun','Sonnenschein'],45:['sand','Sandsturm'],117:['hail','Hagel']};
export function applyEntryAbility(battle, side){
 const entrant=battle?.[side], opponent=battle?.[side==='player'?'opponent':'player'];
 if(!entrant||!opponent||entrant.pokemon.currentHp<=0)return battle;
 const ability=entrant.pokemon.abilityId;
 if(WEATHER_ABILITIES[ability]){
  const [weather,label]=WEATHER_ABILITIES[ability];battle.weather=weather;battle.weatherTurns=5;
  battle.log.push(`${label} beginnt durch die Fähigkeit des eingewechselten Pokémon!`);
 }
 if(ability===22&&opponent.pokemon.currentHp>0){
  const old=opponent.stages.attack??0;opponent.stages.attack=Math.max(-6,old-1);
  if(old!==opponent.stages.attack)battle.log.push('Bedroher senkt den Angriff des Gegners!');
 }
 if(ability===117&&battle.weather==='hail')battle.log.push('Hagel wird durch Hagelalarm ausgelöst.');
 return battle;
}
export function cureOnSwitchOut(pokemon){
 if(pokemon?.abilityId===30&&pokemon.status&&pokemon.status!=='healthy')pokemon.status='healthy';
 return pokemon;
}
