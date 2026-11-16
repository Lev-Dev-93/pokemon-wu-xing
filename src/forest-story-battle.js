// Technische Vorbereitung, kein freigeschalteter Storykampf.
// Gegner, Team, Belohnungen und Auslöser sind im Kanon noch nicht festgelegt.
export const FOREST_STORY_BATTLE=Object.freeze({
 id:'forest_elder_future_battle',mapId:'forest_elder_house',npcId:'forest_elder',
 status:'unconfigured',trigger:'manual_story_approval',opponent:null,team:null,reward:null
});

export function forestEncounterReadiness(state){
 if(!state||!state.flags)return {ready:false,reason:'invalid_state'};
 if(!state.flags.route1_hatched)return {ready:false,reason:'prologue_incomplete'};
 if(state.mapId!=='forest_elder_house')return {ready:false,reason:'wrong_location'};
 if(!Array.isArray(state.team)||!state.team.some(p=>p.currentHp>0))return {ready:false,reason:'no_usable_pokemon'};
 return {ready:true,reason:'prerequisites_met'};
}

export function validateForestBattleDraft(draft){
 if(!draft||draft.id!==FOREST_STORY_BATTLE.id||draft.mapId!=='forest_elder_house'||draft.npcId!=='forest_elder')return false;
 if(draft.trigger!=='approved_story_event'||typeof draft.opponent!=='string'||!draft.opponent.trim())return false;
 if(!Array.isArray(draft.team)||draft.team.length<1||draft.team.length>6)return false;
 if(!draft.team.every(p=>Number.isInteger(p.speciesId)&&p.speciesId>=1&&p.speciesId<=493&&Number.isInteger(p.level)&&p.level>=1&&p.level<=100))return false;
 return Number.isSafeInteger(draft.reward)&&draft.reward>=0;
}
export function forestBattleCanStart(state,draft,approved=false){
 return approved===true&&forestEncounterReadiness(state).ready&&validateForestBattleDraft(draft);
}

// Der Hütteneingang und der Rückweg müssen weiterhin frei bleiben.
export function auditForestEncounterAccess(maps){
 const issues=[];const route=maps.route2,house=maps.forest_elder_house;
 const door=route?.portals.find(p=>p.target==='forest_elder_house');
 const exit=house?.portals.find(p=>p.target==='route2');
 if(!door||route.walls.has(`${door.x},${door.y}`))issues.push('Waldhütteneingang blockiert');
 if(!exit||house.walls.has(`${exit.x},${exit.y}`))issues.push('Waldhüttenausgang blockiert');
 if(door&&exit&&(exit.tx!==door.x||exit.ty!==door.y+1))issues.push('Rückweg nicht vor dem Eingang');
 return issues;
}
