// NPC simulation uses elapsed active exploration time, not player movement.
// No catch-up after hidden tabs, modal pauses or suspended rendering.
export const NPC_TICK_MS=700;
export function npcClockStep(previous,now,active,interval=NPC_TICK_MS){
 if(!Number.isFinite(now)||!active)return {last:null,tick:false};
 if(!Number.isFinite(previous)||now<previous)return {last:now,tick:false};
 if(now-previous<interval)return {last:previous,tick:false};
 return {last:now,tick:true};
}
