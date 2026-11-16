// Test helpers are deliberately unavailable unless the URL explicitly enables them.
import {EVOLUTION_STONES} from './progression.js';
export function developerModeEnabled(search){return new URLSearchParams(search).get('devtools')==='1';}
export function grantDevelopmentSupplies(engine,{money=5000,stones=3}={}){
 if(!Number.isSafeInteger(money)||money<0||money>100000||!Number.isSafeInteger(stones)||stones<0||stones>20)throw Error('Ungültige Testausstattung');
 if(!engine?.state||!Number.isSafeInteger(engine.state.money))throw Error('Kein gültiger Spielstand');
 engine.state.money=Math.min(999999999,engine.state.money+money);
 for(const stone of EVOLUTION_STONES)if(stones)engine.addItem(stone.id,stones);
 engine.state.eventLog??=[];engine.state.eventLog.push({type:'developerSupplies',money,stones});
 return true;
}
