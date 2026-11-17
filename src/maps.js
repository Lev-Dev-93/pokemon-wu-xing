import {isVillageRoad,isResearchRoad,isBerryRoad,isPlannedRoad,OUTDOOR_IDS} from './path-geometry.js';
import {landscapeObstacleCells,auditSafeVillageDecorations} from './landscape.js';
// Gemeinsame Weltgrundrisse: Darstellung und Kollision verwenden dieselben Rechtecke.
// Neu geplante Siedlungen: identische Hausgrundrisse und spiegelsymmetrische Parzellen.
export const outdoorBuildings={
 village:[{x:3,y:3,w:3,h:2,color:'#a67860',label:'HAUS'},{x:16,y:3,w:3,h:2,color:'#a67860',label:'HAUS'},{x:3,y:10,w:3,h:2,color:'#887e9d',label:'KAPELLE'},{x:16,y:10,w:3,h:2,color:'#a67860',label:'RIVALE'}],
 professor_clearing:[{x:2,y:2,w:4,h:2,color:'#557c8b',label:'LABOR'},{x:10,y:2,w:4,h:2,color:'#a67860',label:'PROF.'}],
 beerendorf:[{x:2,y:2,w:3,h:2,color:'#a67860',label:'WERKST.'},{x:11,y:2,w:3,h:2,color:'#a67860',label:'HAUS'},{x:2,y:11,w:3,h:2,color:'#a67860',label:'LADEN'},{x:11,y:11,w:3,h:2,color:'#a67860',label:'HAUS'}]
};
// Wege werden nur auf begehbaren Feldern gezeichnet; Gebäude bleiben frei.
export const isVillagePath=isVillageRoad;
export const isProfessorClearingPath=isResearchRoad;
export const isBerryVillagePath=isBerryRoad;
export const buildingCells=id=>(outdoorBuildings[id]||[]).flatMap(({x,y,w,h})=>Array.from({length:w*h},(_,i)=>[x+i%w,y+Math.floor(i/w)]));
const room=(id,name,w,h,walls=[],portals=[],heights={},stairs=[])=>({id,name,w,h,walls:new Set(walls.map(p=>p.join(','))),portals,heights,stairs});
const p=(x,y,target,tx,ty,kind='door')=>({x,y,target,tx,ty,kind});
// Baumkronen sind feste Hindernisse: dieselben Kacheln werden gezeichnet und blockiert.
export const forestTreeCells=(id,w=16,h=18)=>{
 const cells=[];
 if(id==='route2'){
  // Dichte, paarweise spiegelnde Waldgruppen; der Mittelgang und die Huette bleiben frei.
  for(const y of [2,3,4,12,13,14])for(const x of [2,3,12,13])cells.push([x,y]);
  for(const y of [5,6,10,11])for(const x of [1,14])cells.push([x,y]);
 }else if(id==='waldrand'){
  for(const y of [2,3,5,6,11,12,14,15])for(const x of [2,3,12,13])cells.push([x,y]);
 }
 return cells.filter(([x,y])=>x>=0&&y>=0&&x<w&&y<h&&!isPlannedRoad(id,x,y));
};
export const maps={
 bedroom:room('bedroom','Schlafzimmer',10,8,[[1,1],[2,1],[1,2],[7,1],[8,1]], [p(5,7,'ground',10,2,'stairs')]),
 ground:room('ground','Erdgeschoss',12,9,[[1,1],[2,1],[8,1],[9,1],[2,5],[3,5]], [p(10,1,'bedroom',5,6,'stairs'),p(5,8,'yard',7,2)]),
 yard:room('yard','Züchterhof',16,12,[[2,3],[3,3],[4,3],...Array.from({length:6},(_,i)=>[9+i,3]),...Array.from({length:6},(_,i)=>[9+i,7]).filter(([x])=>x!==10),...Array.from({length:3},(_,i)=>[9,4+i]),...Array.from({length:3},(_,i)=>[14,4+i]),...[ [2,8],[3,8],[4,8],[2,9],[3,9],[4,9] ]], [p(7,1,'ground',5,7),p(7,11,'village',10,1,'path')],{'8,8':1,'9,8':1,'10,8':1,'8,9':1,'9,9':1,'10,9':1},[[7,8],[7,9]]),
 village:room('village','Startdorf · Mu',22,16,
  [...buildingCells('village'),...Array.from({length:22},(_,x)=>[x,15])],
  [p(10,0,'yard',7,10,'path'),p(0,7,'professor_clearing',14,7,'path'),p(21,7,'route1',1,8,'path'),p(4,5,'village_home',5,6),p(17,5,'village_house_east',5,6),p(4,12,'chapel',5,6),p(17,12,'rival_house',5,6)]),
 professor_clearing:room('professor_clearing','Forschungsplatz · Westlich von Mu',16,12,
  buildingCells('professor_clearing'),
  [p(15,7,'village',1,7,'path'),p(4,4,'study',5,6),p(12,4,'professor_house',5,6)]),
 village_home:room('village_home','Wohnhaus · Mu',11,8,[[1,1],[2,1],[7,1],[8,1]],[p(5,7,'village',4,6)]),
 village_house_east:room('village_house_east','Wohnhaus am Dorfplatz',11,8,[[1,1],[2,1],[7,1],[8,1]],[p(5,7,'village',17,6)]),
 professor_house:room('professor_house','Haus des Professors',11,8,[[1,1],[2,1],[7,1],[8,1]],[p(5,7,'professor_clearing',12,5)]),
 chapel:room('chapel','Kleine Kapelle · Mu',11,8,[[1,1],[2,1],[7,1],[8,1]],[p(5,7,'village',4,13)]),
 rival_house:room('rival_house','Haus des Rivalen',11,8,[[1,1],[2,1],[7,1],[8,1]],[p(5,7,'village',17,13)]),
 route1:room('route1','Route 1 · Mu',16,18,
  [[2,3],[3,3],[12,3],[13,3],[2,13],[3,13],[12,13],[13,13]],
  [p(0,8,'village',20,7,'path'),p(15,6,'brook',1,6,'path')]),
 brook:room('brook','Bachübergang · Mu',16,16,
  Array.from({length:16},(_,y)=>y).flatMap(y=>y>=7&&y<=9?Array.from({length:16},(_,x)=>x).filter(x=>x<6||x>9).map(x=>[x,y]):[]),
  [p(0,6,'route1',14,6,'path'),p(7,15,'waldrand',7,1,'path')]),
 beerendorf:room('beerendorf','Beerendorf · Mu',16,16,buildingCells('beerendorf'),
  [p(0,7,'waldrand',14,8,'path'),p(15,7,'route2',1,7,'path'),p(3,4,'beerendorf_werkstatt',5,6),p(12,4,'beerendorf_haus',5,6),p(3,13,'beerendorf_haus2',5,6),p(12,13,'beerendorf_wohnhaus',5,6)]),
 beerendorf_haus2:room('beerendorf_haus2','Beeren- und Kräuterladen · Beerendorf',11,8,[[1,1],[2,1],[7,1],[8,1]],[p(5,7,'beerendorf',3,13)]),
 beerendorf_haus:room('beerendorf_haus','Haus der Kräuterhexe · Beerendorf',11,8,[[1,1],[2,1],[7,1],[8,1]],[p(5,7,'beerendorf',12,5)]),
 beerendorf_wohnhaus:room('beerendorf_wohnhaus','Wohnhaus · Beerendorf',11,8,[[1,1],[2,1],[7,1],[8,1]],[p(5,7,'beerendorf',12,13)]),
 beerendorf_werkstatt:room('beerendorf_werkstatt','Werkstatt · Beerendorf',11,8,[[1,1],[2,1],[7,1],[8,1],[2,4],[3,4]],[p(5,7,'beerendorf',3,5)]),
 route2:room('route2','Route 2 · Alter Wald',16,18,
  [...forestTreeCells('route2'),[9,11],[10,11],[9,12]],
  [p(0,7,'beerendorf',14,7,'path'),p(10,13,'forest_elder_house',5,6)]),
 waldrand:room('waldrand','Waldrand · Mu',16,18,forestTreeCells('waldrand'),
  [p(7,0,'brook',7,14,'path'),p(15,8,'beerendorf',1,7,'path')]),
 forest_elder_house:room('forest_elder_house','Waldhütte der alten Dame',11,8,[[1,1],[2,1],[7,1],[8,1]],[p(5,7,'route2',10,14)]),
 study:room('study','Forschungslabor des Professors',11,8,[[1,1],[2,1],[7,1],[8,1],[2,4],[3,4]],[p(5,7,'professor_clearing',4,5)])
};
// Busch-Kollision: sichtbare Beerenbüsche blockieren wie Bäume, Portale und Ankunftsfelder bleiben frei.
const arrivalCells=new Map();
for(const source of Object.values(maps))for(const p of source.portals){const cells=arrivalCells.get(p.target)||new Set();cells.add(`${p.tx},${p.ty}`);arrivalCells.set(p.target,cells);}
for(const map of Object.values(maps)){
 map.landscapeArrivalCells=arrivalCells.get(map.id)||new Set();
 const entranceAprons=new Set(map.portals.filter(p=>p.kind==='door').map(p=>`${p.x},${p.y+1}`));
 map.landscapeBushes=new Set(landscapeObstacleCells(map).map(([x,y])=>`${x},${y}`).filter(k=>!arrivalCells.get(map.id)?.has(k)&&!entranceAprons.has(k)));
 for(const k of map.landscapeBushes)map.walls.add(k);
}
export const npcs={route2:[],beerendorf:[],beerendorf_haus:[{id:'herbal_witch',x:6,y:3,name:'Kräuterhexe',dialogue:['Willkommen in meiner Kräuterstube. Ich kann deine Pokémon versorgen.']}],beerendorf_haus2:[],beerendorf_wohnhaus:[],beerendorf_werkstatt:[],brook:[],waldrand:[],yard:[],bedroom:[],village_home:[],village_house_east:[],professor_house:[],chapel:[],rival_house:[],
 forest_elder_house:[{id:'forest_elder',x:6,y:3,name:'Alte Dame',dialogue:['Der Alte Wald bewahrt Geschichten, die älter sind als unsere Dörfer.','Ich erinnere mich an Celebi. Doch nicht jede Erinnerung erzählt die ganze Wahrheit.','Tiefer im Wald liegen alte Ruinen. Dort findest du vielleicht weitere Spuren.','Bevor du weitergehst, solltest du dich gut auf den Weg vorbereiten.']}],
 route1:[{id:'route1_trainer',x:10,y:8,name:'Junger Trainer',dialogue:['Hallo! Lass uns unsere Pokémon in einem Übungskampf messen.']}],
 ground:[{id:'breeder_a',x:6,y:2,name:'Adoptivmutter',dialogue:['Guten Morgen! Schön, dass du da bist.','Heute ist ein besonderer Tag. Wir sprechen später in Ruhe darüber.']},{id:'breeder_b',x:3,y:3,name:'Züchter',dialogue:['Auf dem Hof gibt es immer etwas zu tun.','Sieh dich ruhig um.']}],
 professor_clearing:[],village:[{id:'merchant',x:15,y:11,name:'Markthändler',dialogue:['Hier bekommst du Reisebedarf.']},{id:'rival',x:14,y:7,name:'Kindheitsfreund',dialogue:['Gut, dich zu sehen! Ich bin heute auch unterwegs.','Hier im Dorf gibt es immer etwas zu entdecken.']}],

 study:[{id:'professor',x:7,y:4,name:'Professor',dialogue:['Ich beschäftige mich mit Pokémon und der Geschichte unserer Region.','Für einen gemeinsamen Ausflug ist es noch zu früh.']}]
};
export const objects={route2:[],forest_elder_house:[],beerendorf:[],beerendorf_haus2:[],beerendorf_haus:[],beerendorf_wohnhaus:[],beerendorf_werkstatt:[],brook:[],waldrand:[],route1:[],bedroom:[{id:'bed',x:1,y:1,name:'Bett',dialogue:['Dein vertrautes Bett. Hier hast du viele Nächte verbracht.']}],ground:[{id:'pokemon_pc',x:8,y:2,name:'Pokémon-PC',dialogue:['Verwalte hier dein Pokémon-Team und dein Lager.']}],village:[],professor_clearing:[],village_home:[],study:[],yard:[]};
export const start={mapId:'bedroom',x:5,y:5,facing:'down',elevation:0,returns:{},steps:0,flags:{introSeen:false,birthday_wish_pending:false,egg_received:false,rift_closed:false,rival_absol:false,parents_briefed:false,professor_demo:false,route1_hatched:false,spokenToBreederA:false,spokenToBreederB:false,visitedYard:false,visitedVillage:false,spokenToVillager:false,spokenToRival:false,spokenToProfessor:false,visitedVillageHome:false,visitedStudy:false,visitedRoute1:false,visitedRoute2:false,visitedBeerendorf:false,visitedWaldrand:false,visitedBrook:false,spokenToResident:false,suppliesCollected:false,route1TrainerDefeated:false},inventory:[],collectedPickups:[],money:0,eventLog:[],starterWishSpeciesId:null,starterEgg:null,team:[],storage:[]};
export const tileHeight=(map,x,y)=>map.heights[`${x},${y}`]??0;
export const inside=(map,x,y)=>x>=0&&y>=0&&x<map.w&&y<map.h;
export function canMove(map,x,y,nx,ny){if(!inside(map,nx,ny)||map.walls.has(`${nx},${ny}`))return false;const a=tileHeight(map,x,y),b=tileHeight(map,nx,ny);return a===b||map.stairs.some(([sx,sy])=>(sx===x&&sy===y)||(sx===nx&&sy===ny));}


// Für jedes Außenportal muss mindestens eine begehbare Nachbarkachel erreichbar sein.
export function auditStoryRouteAccess(){
 const issues=[];
 for(const id of ['beerendorf','route2']){
  const map=maps[id], entrance=map.portals.find(p=>p.kind==='path'&&(p.x===0||p.y===0));
  if(!entrance){issues.push(`${id}: Haupteingang fehlt`);continue;}
  const start=[entrance.x,entrance.y],queue=[start],seen=new Set([start.join(',')]);
  while(queue.length){const [x,y]=queue.shift();for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){
   const nx=x+dx,ny=y+dy,key=`${nx},${ny}`;
   if(inside(map,nx,ny)&&!map.walls.has(key)&&!seen.has(key)){seen.add(key);queue.push([nx,ny]);}
  }}
  for(const p of map.portals)if(!seen.has(`${p.x},${p.y}`))issues.push(`${id}: Portal ${p.x},${p.y} nicht vom Haupteingang erreichbar`);
 }
 return issues;
}
export function auditOutdoorLayout(){
 const issues=[];
 for(const id of ['village','professor_clearing','beerendorf','route2']){
  const map=maps[id];
  for(const portal of map.portals){
   const key=`${portal.x},${portal.y}`;
   if(map.walls.has(key))issues.push(`${id}: Portal ${key} blockiert`);
   const neighbors=[[1,0],[-1,0],[0,1],[0,-1]].some(([dx,dy])=>inside(map,portal.x+dx,portal.y+dy)&&!map.walls.has(`${portal.x+dx},${portal.y+dy}`));
   if(!neighbors)issues.push(`${id}: Portal ${key} ohne Zugang`);
  }
  for(const [x,y] of buildingCells(id))if(!map.walls.has(`${x},${y}`))issues.push(`${id}: Gebäude ${x},${y} ohne Kollision`);
 }
 return issues;
}

export function auditCardinalWorld(){
 const expected=[['yard','village','south'],['village','professor_clearing','west'],['village','route1','east'],['route1','brook','east'],['brook','waldrand','south'],['waldrand','beerendorf','east'],['beerendorf','route2','east']];
 const issues=[];
 for(const [from,to,side] of expected){
  const a=maps[from],b=maps[to],portal=a.portals.find(p=>p.target===to&&p.kind==='path');
  if(!portal){issues.push(`${from} -> ${to} fehlt`);continue;}
  if(side==='east'&&portal.x!==a.w-1||side==='west'&&portal.x!==0||side==='south'&&portal.y!==a.h-1)issues.push(`${from} -> ${to}: falsche Himmelsrichtung`);
  if(a.walls.has(`${portal.x},${portal.y}`)||b.walls.has(`${portal.tx},${portal.ty}`))issues.push(`${from} -> ${to}: blockiert`);
  if(!b.portals.some(q=>q.target===from&&q.kind==='path'))issues.push(`${to} -> ${from}: Rückweg fehlt`);
 }
 if(maps.village.portals.some(p=>p.y===maps.village.h-1))issues.push('Mu besitzt unerwünschten Südausgang');
 return issues;
}

// Außenhaustüren müssen frei bleiben und über eine sichtbare Wegkachel erreichbar sein.
export function auditBuildingApproaches(){
 const issues=[];
 const paths={village:isVillagePath,professor_clearing:isProfessorClearingPath,beerendorf:isBerryVillagePath};
 for(const id of Object.keys(paths)){
  const map=maps[id];
  for(const portal of map.portals.filter(p=>p.kind==='door')){
   const k=`${portal.x},${portal.y}`;
   if(map.walls.has(k))issues.push(`${id}: Tür ${k} blockiert`);
   if(!paths[id](portal.x,portal.y))issues.push(`${id}: Tür ${k} ohne sichtbaren Weg`);
   const below=`${portal.x},${portal.y+1}`;
   if(!inside(map,portal.x,portal.y+1)||map.walls.has(below)||!paths[id](portal.x,portal.y+1))issues.push(`${id}: Tür ${k} ohne freien Vorplatz`);
  }
 }
 return issues;
}

export function auditStartingAreaVisualSafety(){
 return ['yard','village','professor_clearing'].flatMap(id=>auditSafeVillageDecorations(maps[id]));
}

// Prüft die Deckung zwischen sichtbaren massiven Objekten und der Kollision.
export function auditVisibleObstacles(){
 const issues=[];
 for(const [id,buildings] of Object.entries(outdoorBuildings)){
  const map=maps[id];
  for(const {x,y,w,h} of buildings)for(let yy=y;yy<y+h;yy++)for(let xx=x;xx<x+w;xx++)
   if(!map.walls.has(`${xx},${yy}`))issues.push(`${id}: Haus ohne Kollision ${xx},${yy}`);
 }
 for(const id of ['waldrand','route2'])for(const [x,y] of forestTreeCells(id))
  if(!maps[id].walls.has(`${x},${y}`))issues.push(`${id}: Baum ohne Kollision ${x},${y}`);
 for(const map of Object.values(maps))for(const k of map.landscapeBushes||[])
  if(!map.walls.has(k))issues.push(`${map.id}: Busch ohne Kollision ${k}`);
 return issues;
}

export function auditBerryForestJourney(){
 const issues=[...auditVisibleObstacles(),...auditBuildingApproaches()];
 const berry=maps.beerendorf,forest=maps.route2;
 for(const [id,map] of [['beerendorf',berry],['route2',forest]]){
  for(const p of map.portals){
   if(map.walls.has(`${p.x},${p.y}`))issues.push(`${id}: Portal blockiert ${p.x},${p.y}`);
   if(maps[p.target]?.walls.has(`${p.tx},${p.ty}`))issues.push(`${id}: Ankunft blockiert ${p.target}`);
  }
 }
 return issues;
}

// Dev.300: Häuser stehen an ihrer jeweiligen Tür, ohne Hauptwege zu blockieren.
export function auditOrderedSettlementLayout(){
 const issues=[];
 for(const id of ['village','professor_clearing','beerendorf']){
  const map=maps[id],houses=outdoorBuildings[id],doors=map.portals.filter(p=>p.kind==='door');
  if(houses.length!==doors.length)issues.push(`${id}: Haus-/Türzahl stimmt nicht`);
  for(const door of doors){
   const adjacent=houses.some(h=>door.x>=h.x-1&&door.x<=h.x+h.w&&door.y>=h.y-1&&door.y<=h.y+h.h);
   if(!adjacent)issues.push(`${id}: Tür ${door.x},${door.y} ohne Haus`);
   if(map.walls.has(`${door.x},${door.y}`))issues.push(`${id}: Tür blockiert`);
  }
  for(const h of houses)for(let y=h.y;y<h.y+h.h;y++)for(let x=h.x;x<h.x+h.w;x++)
   if(!map.walls.has(`${x},${y}`))issues.push(`${id}: Hauskollision fehlt`);
 }
 return issues;
}
