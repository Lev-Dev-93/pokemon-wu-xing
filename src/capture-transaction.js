import {POKEBALL_ITEM,tryCapture} from './capture.js';
import {validatePokemon} from './team.js';

// Each issued decision can be committed at most once, even if UI handlers fire twice.
const consumedDecisions=new WeakSet();
// Pure decision: no inventory or party mutation until the roll and capacity checks succeed.
export function captureDecision({pokemon,inventory,team,storage,rng=Math.random}){
 if(!validatePokemon(pokemon))throw Error('Ungültiges Fangziel');
 if(!Array.isArray(inventory)||!Array.isArray(team)||!Array.isArray(storage))throw Error('Ungültiger Fangzustand');
 const ball=inventory.find(i=>i?.id===POKEBALL_ITEM);
 if(!ball||!Number.isSafeInteger(ball.quantity)||ball.quantity<1)return {attempted:false,caught:false,reason:'no-ball'};
 if(team.length>=6&&storage.length>=500)return {attempted:false,caught:false,reason:'full'};
 return {attempted:true,caught:tryCapture(pokemon,rng),reason:null};
}

// Called only after the decision; ensures the item is not lost on a failed transfer.
export function commitCapture(engine,pokemon,decision){
 if(!decision||typeof decision!=='object'||consumedDecisions.has(decision)||!decision.attempted||typeof decision.caught!=='boolean')return false;
 consumedDecisions.add(decision);
 if(!engine.removeItem(POKEBALL_ITEM,1))return false;
 if(!decision.caught)return true;
 const copy=structuredClone(pokemon);copy.currentHp=Math.max(1,copy.currentHp);
 if(engine.catchPokemon(copy))return true;
 engine.addItem(POKEBALL_ITEM,1);
 return false;
}
