import {maps} from './maps.js';
import {auditWorld, auditWalkablePortals, reachableMaps} from './world-integrity.js';
import {auditRiftItinerary} from './story-itinerary.js';
import {validatePrologueMilestones} from './story-guards.js';
export function auditGameIntegration(){
 const issues=[...auditWorld(),...auditWalkablePortals()];
 const reached=reachableMaps('bedroom');
 for(const id of Object.keys(maps))if(!reached.has(id))issues.push(`Nicht erreichbar: ${id}`);
 for(const result of auditRiftItinerary())if(!result.valid)issues.push(`Storylauf ungültig: ${result.mapId}`);
 if(!validatePrologueMilestones({}))issues.push('Prolog-Initialzustand ungültig');
 return issues;
}
