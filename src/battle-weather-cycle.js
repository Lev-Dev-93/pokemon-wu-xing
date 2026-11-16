export function tickWeather(battle){
 if(!battle||typeof battle!=='object')return false;
 const hadWeather=Boolean(battle.weather);
 if(!hadWeather){battle.weatherTurns=0;return false;}
 if(!Number.isInteger(battle.weatherTurns)||battle.weatherTurns<=0){battle.weather=null;battle.weatherTurns=0;return true;}
 battle.weatherTurns--;
 if(battle.weatherTurns!==0)return false;
 battle.weather=null;
 return true;
}