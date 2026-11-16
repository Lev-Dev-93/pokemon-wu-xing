// Einzige verbindliche Quelle für alle Außenwege: nur explizit geplante 2-Kachel-Bänder.
// Rechtecke [x,y,breite,hoehe]; Plätze sind ausdrücklich eigene Flächen.
export const OUTDOOR_LAYOUT=Object.freeze({
 village:{roads:[[10,0,2,7],[0,7,22,2],[4,5,2,2],[17,5,2,2],[4,12,2,2],[17,12,2,2],[10,9,2,5]],plaza:[8,6,6,5]},
 professor_clearing:{roads:[[4,4,2,4],[12,4,2,4],[4,7,12,2]],plaza:[7,6,4,4]},
 beerendorf:{roads:[[0,7,16,2],[3,4,2,3],[12,4,2,3],[3,13,2,2],[12,13,2,2]],plaza:[6,6,4,5]},
 route1:{roads:[[0,7,16,2],[14,6,2,2]]},
 brook:{roads:[[0,5,8,2],[7,6,2,10]]},
 waldrand:{roads:[[7,0,2,9],[7,8,9,2]]},
 route2:{roads:[[0,7,16,2],[11,9,2,6],[10,13,2,2]]}
});
export const OUTDOOR_IDS=Object.freeze(Object.keys(OUTDOOR_LAYOUT));
const contains=(r,x,y)=>x>=r[0]&&y>=r[1]&&x<r[0]+r[2]&&y<r[1]+r[3];
export function isPlaza(id,x,y){const p=OUTDOOR_LAYOUT[id]?.plaza;return Boolean(p&&contains(p,x,y));}
export function isPlannedRoad(id,x,y){const layout=OUTDOOR_LAYOUT[id];return Boolean(layout&&(layout.roads.some(r=>contains(r,x,y))||isPlaza(id,x,y)));}
export const isVillageRoad=(x,y)=>isPlannedRoad('village',x,y);
export const isResearchRoad=(x,y)=>isPlannedRoad('professor_clearing',x,y);
export const isBerryRoad=(x,y)=>isPlannedRoad('beerendorf',x,y);
export const isSettlementRoad=isPlannedRoad;
