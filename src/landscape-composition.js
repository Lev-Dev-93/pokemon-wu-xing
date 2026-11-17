// dev.732: A single, deterministic painter order for the regional vegetation layers.
// A large landscape feature owns its whole footprint: smaller vegetation cannot
// draw over it. No map or gameplay state is mutated.
import {landscapeScenePixels} from './landscape-scenes-art.js';
import {landscapeLandmarkPixels} from './landscape-landmarks-art.js';
import {vegetationClusterPixels} from './vegetation-clusters-art.js';
import {landscapeTransitionPixels} from './landscape-transition-art.js';

const key=p=>`${p.cellX},${p.cellY}`;
const footprint=parts=>new Set(parts.map(key));
const without=(parts,blocked)=>parts.filter(p=>!blocked.has(key(p)));
export function composedLandscapePixels(map,isPath){
 const scenes=landscapeScenePixels(map,isPath);
 const sceneCells=footprint(scenes);
 const landmarks=without(landscapeLandmarkPixels(map,isPath),sceneCells);
 const majorCells=new Set([...sceneCells,...footprint(landmarks)]);
 const clusters=without(vegetationClusterPixels(map,isPath),majorCells);
 const plantedCells=new Set([...majorCells,...footprint(clusters)]);
 const transitions=without(landscapeTransitionPixels(map,isPath),plantedCells);
 return [...transitions,...clusters,...landmarks,...scenes];
}
