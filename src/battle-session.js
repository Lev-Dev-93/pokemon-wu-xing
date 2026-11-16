// Validate the exploration position before entering a persistent battle.
export function battleOrigin(state){
 if(!state||typeof state.mapId!=="string"||!Number.isInteger(state.x)||!Number.isInteger(state.y))throw Error("Ungültige Kampfposition");
 return Object.freeze({mapId:state.mapId,x:state.x,y:state.y});
}
export function battleCanBegin(team){return Array.isArray(team)&&team.some(p=>p&&Number.isFinite(p.currentHp)&&p.currentHp>0)}
