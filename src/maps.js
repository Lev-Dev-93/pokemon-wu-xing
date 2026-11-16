// Gemeinsame Weltgrundrisse: Darstellung und Kollision verwenden dieselben Rechtecke.
export const outdoorBuildings={
 village:[{x:2,y:2,w:4,h:2,color:'#557c8b',label:'LABOR'},{x:7,y:2,w:3,h:2,color:'#977357',label:'PROF.'},{x:2,y:6,w:3,h:2,color:'#9c705c',label:'HAUS'},{x:17,y:6,w:3,h:2,color:'#a67b64',label:'HAUS'},{x:2,y:10,w:3,h:2,color:'#8b89a3',label:'KAPELLE'},{x:16,y:10,w:3,h:2,color:'#9a6e55',label:'RIVALE'}],
 beerendorf:[{x:2,y:3,w:2,h:2},{x:12,y:3,w:2,h:2},{x:2,y:11,w:2,h:2},{x:12,y:11,w:2,h:2}]
};
// Wege werden nur auf begehbaren Feldern gezeichnet; Gebäude bleiben frei.
export function isVillagePath(x,y){return ((x>=8&&x<=14&&y>=5&&y<=11)||(x>=9&&x<=11)||(y===7&&x>=4&&x<=20)||(y===11&&x>=4&&x<=19)||(y===4&&x>=6&&x<=19));}
export function isBerryVillagePath(x,y){return (x>=7&&x<=8)||(y===7&&x>=3&&x<=14)||(y>=5&&y<=13&&x===4)||(y>=5&&y<=13&&x===14)||(y===13&&x>=3&&x<=13);}
export const buildingCells=id=>(outdoorBuildings[id]||[]).flatMap(({x,y,w,h})=>Array.from({length:w*h},(_,i)=>[x+i%w,y+Math.floor(i/w)]));
const room=(id,name,w,h,walls=[],portals=[],heights={},stairs=[])=>({id,name,w,h,walls:new Set(walls.map(p=>p.join(','))),portals,heights,stairs});
const p=(x,y,target,tx,ty,kind='door')=>({x,y,target,tx,ty,kind});
// Baumkronen sind feste Hindernisse: dieselben Kacheln werden gezeichnet und blockiert.
export const forestTreeCells=(id,w=16,h=18)=>{
 const cells=[];
 if(id==='route2'){
  for(const [sx,sy,bw,bh] of [[0,0,3,4],[12,0,4,4],[0,5,4,4],[12,5,4,4],[0,10,4,4],[12,10,4,4],[0,15,4,3],[12,15,4,3]])
   for(let y=sy;y<sy+bh;y++)for(let x=sx;x<sx+bw;x++)if(x<6||x>9)cells.push([x,y]);
  for(const [x,y] of [[4,2],[5,6],[10,3],[11,7],[4,13],[10,15]])cells.push([x,y]);
 }
 if(id==='waldrand')for(const cell of [[1,2],[4,4],[12,2],[14,5],[2,9],[4,12],[12,10],[14,14],[1,16],[11,16],[1,3],[2,6],[13,3],[14,7],[1,14],[13,15]])cells.push(cell);
 return cells.filter(([x,y])=>x>=0&&y>=0&&x<w&&y<h);
};
export const maps={
 bedroom:room('bedroom','Schlafzimmer',10,8,[[1,1],[2,1],[1,2],[7,1],[8,1]], [p(5,7,'ground',10,2,'stairs')]),
 ground:room('ground','Erdgeschoss',12,9,[[1,1],[2,1],[8,1],[9,1],[2,5],[3,5]], [p(10,1,'bedroom',5,6,'stairs'),p(5,8,'yard',7,2)]),
 yard:room('yard','Züchterhof',16,12,[[2,3],[3,3],[4,3],...Array.from({length:6},(_,i)=>[9+i,3]),...Array.from({length:6},(_,i)=>[9+i,7]).filter(([x])=>x!==10),...Array.from({length:3},(_,i)=>[9,4+i]),...Array.from({length:3},(_,i)=>[14,4+i]),...[ [2,8],[3,8],[4,8],[2,9],[3,9],[4,9] ]], [p(7,1,'ground',5,7),p(7,11,'village',10,1,'path')],{'8,8':1,'9,8':1,'10,8':1,'8,9':1,'9,9':1,'10,9':1},[[7,8],[7,9]]),
 village:room('village','Startdorf · Mu',22,16,
  [...buildingCells('village'),[10,9],[11,9],[16,8],[18,8]],
  [p(10,0,'yard',7,10,'path'),p(6,3,'study',5,6),p(10,3,'professor_house',5,6),p(5,7,'village_home',5,6),p(20,7,'village_house_east',5,6),p(5,11,'chapel',5,6),p(19,11,'rival_house',5,6),p(10,15,'route1',7,1,'path')]),
 village_home:room('village_home','Wohnhaus · Mu',11,8,[[1,1],[2,1],[7,1],[8,1]],[p(5,7,'village',5,8)]),
 village_house_east:room('village_house_east','Wohnhaus am Dorfplatz',11,8,[[1,1],[2,1],[7,1],[8,1]],[p(5,7,'village',20,8)]),
 professor_house:room('professor_house','Haus des Professors',11,8,[[1,1],[2,1],[7,1],[8,1]],[p(5,7,'village',10,4)]),
 chapel:room('chapel','Kleine Kapelle · Mu',11,8,[[1,1],[2,1],[7,1],[8,1]],[p(5,7,'village',5,12)]),
 rival_house:room('rival_house','Haus des Rivalen',11,8,[[1,1],[2,1],[7,1],[8,1]],[p(5,7,'village',19,12)]),
 route1:room('route1','Route 1 · Mu',16,18,[[2,4],[3,4],[12,6],[13,6],[4,12],[5,12],[11,14],[12,14]], [p(7,0,'village',10,14,'path'),p(7,17,'brook',7,1,'path')]),
 brook:room('brook','Bachübergang · Mu',16,16,Array.from({length:16},(_,y)=>y).flatMap(y=>y>=7&&y<=9?Array.from({length:16},(_,x)=>x).filter(x=>x<6||x>9).map(x=>[x,y]):[]),[p(7,0,'route1',7,16,'path'),p(7,15,'waldrand',7,1,'path')]),
 beerendorf:room('beerendorf','Beerendorf · Mu',16,16,buildingCells('beerendorf'),[p(7,0,'waldrand',7,16,'path'),p(7,15,'route2',7,1,'path'),p(4,5,'beerendorf_werkstatt',5,6),p(14,5,'beerendorf_haus',5,6),p(3,13,'beerendorf_haus2',5,6),p(13,13,'beerendorf_wohnhaus',5,6)]),
 beerendorf_haus2:room('beerendorf_haus2','Beeren- und Kräuterladen · Beerendorf',11,8,[[1,1],[2,1],[7,1],[8,1]],[p(5,7,'beerendorf',3,13)]),
 beerendorf_haus:room('beerendorf_haus','Haus der Kräuterhexe · Beerendorf',11,8,[[1,1],[2,1],[7,1],[8,1]],[p(5,7,'beerendorf',14,6)]),
 beerendorf_wohnhaus:room('beerendorf_wohnhaus','Wohnhaus · Beerendorf',11,8,[[1,1],[2,1],[7,1],[8,1]],[p(5,7,'beerendorf',13,13)]),
 beerendorf_werkstatt:room('beerendorf_werkstatt','Werkstatt · Beerendorf',11,8,[[1,1],[2,1],[7,1],[8,1],[2,4],[3,4]],[p(5,7,'beerendorf',4,6)]),
 route2:room('route2','Route 2 · Alter Wald',16,18,[...forestTreeCells('route2'),[10,9],[11,9],[10,10],[2,5],[3,5],[12,6],[13,6],[3,12],[4,12],[11,14],[12,14]],[p(7,0,'beerendorf',7,14,'path'),p(11,10,'forest_elder_house',5,6)]),
 waldrand:room('waldrand','Waldrand · Mu',16,18,[...forestTreeCells('waldrand'),[2,5],[3,5],[12,6],[13,6],[3,12],[4,12],[11,14],[12,14]],[p(7,0,'brook',7,14,'path'),p(7,17,'beerendorf',7,1,'path')]),
 forest_elder_house:room('forest_elder_house','Waldhütte der alten Dame',11,8,[[1,1],[2,1],[7,1],[8,1]],[p(5,7,'route2',11,11)]),
 study:room('study','Forschungslabor des Professors',11,8,[[1,1],[2,1],[7,1],[8,1],[2,4],[3,4]],[p(5,7,'village',6,4)])
};
export const npcs={route2:[],beerendorf:[],beerendorf_haus:[{id:'herbal_witch',x:6,y:3,name:'Kräuterhexe',dialogue:['Willkommen in meiner Kräuterstube. Ich kann deine Pokémon versorgen.']}],beerendorf_haus2:[],beerendorf_wohnhaus:[],beerendorf_werkstatt:[],brook:[],waldrand:[],yard:[],bedroom:[],village_home:[],village_house_east:[],professor_house:[],chapel:[],rival_house:[],
 forest_elder_house:[{id:'forest_elder',x:6,y:3,name:'Alte Dame',dialogue:['Der Alte Wald bewahrt Geschichten, die älter sind als unsere Dörfer.','Ich erinnere mich an Celebi. Doch nicht jede Erinnerung erzählt die ganze Wahrheit.','Tiefer im Wald liegen alte Ruinen. Dort findest du vielleicht weitere Spuren.','Bevor du weitergehst, solltest du dich gut auf den Weg vorbereiten.']}],
 route1:[{id:'route1_trainer',x:10,y:8,name:'Junger Trainer',dialogue:['Hallo! Lass uns unsere Pokémon in einem Übungskampf messen.']}],
 ground:[{id:'breeder_a',x:6,y:2,name:'Adoptivmutter',dialogue:['Guten Morgen! Schön, dass du da bist.','Heute ist ein besonderer Tag. Wir sprechen später in Ruhe darüber.']},{id:'breeder_b',x:3,y:3,name:'Züchter',dialogue:['Auf dem Hof gibt es immer etwas zu tun.','Sieh dich ruhig um.']}],
 village:[{id:'merchant',x:17,y:9,name:'Markthändler',dialogue:['Hier bekommst du Reisebedarf.']},{id:'rival',x:14,y:7,name:'Kindheitsfreund',dialogue:['Gut, dich zu sehen! Ich bin heute auch unterwegs.','Hier im Dorf gibt es immer etwas zu entdecken.']}],

 study:[{id:'professor',x:7,y:4,name:'Professor',dialogue:['Ich beschäftige mich mit Pokémon und der Geschichte unserer Region.','Für einen gemeinsamen Ausflug ist es noch zu früh.']}]
};
export const objects={route2:[],forest_elder_house:[],beerendorf:[],beerendorf_haus2:[],beerendorf_haus:[],beerendorf_wohnhaus:[],beerendorf_werkstatt:[],brook:[],waldrand:[],route1:[],bedroom:[{id:'bed',x:1,y:1,name:'Bett',dialogue:['Dein vertrautes Bett. Hier hast du viele Nächte verbracht.']}],ground:[{id:'pokemon_pc',x:8,y:2,name:'Pokémon-PC',dialogue:['Verwalte hier dein Pokémon-Team und dein Lager.']}],village:[],village_home:[],study:[],yard:[]};
export const start={mapId:'bedroom',x:5,y:5,facing:'down',elevation:0,returns:{},steps:0,flags:{introSeen:false,birthday_wish_pending:false,egg_received:false,rift_closed:false,rival_absol:false,professor_demo:false,route1_hatched:false,spokenToBreederA:false,spokenToBreederB:false,visitedYard:false,visitedVillage:false,spokenToVillager:false,spokenToRival:false,spokenToProfessor:false,visitedVillageHome:false,visitedStudy:false,visitedRoute1:false,visitedRoute2:false,visitedBeerendorf:false,visitedWaldrand:false,visitedBrook:false,spokenToResident:false,suppliesCollected:false,route1TrainerDefeated:false},inventory:[],money:0,eventLog:[],starterWishSpeciesId:null,starterEgg:null,team:[],storage:[]};
export const tileHeight=(map,x,y)=>map.heights[`${x},${y}`]??0;
export const inside=(map,x,y)=>x>=0&&y>=0&&x<map.w&&y<map.h;
export function canMove(map,x,y,nx,ny){if(!inside(map,nx,ny)||map.walls.has(`${nx},${ny}`))return false;const a=tileHeight(map,x,y),b=tileHeight(map,nx,ny);return a===b||map.stairs.some(([sx,sy])=>(sx===x&&sy===y)||(sx===nx&&sy===ny));}


// Für jedes Außenportal muss mindestens eine begehbare Nachbarkachel erreichbar sein.
export function auditStoryRouteAccess(){
 const issues=[];
 for(const id of ['beerendorf','route2']){
  const map=maps[id], entrance=map.portals.find(p=>p.kind==='path'&&p.y===0);
  if(!entrance){issues.push(`${id}: Nordeingang fehlt`);continue;}
  const start=[entrance.x,entrance.y],queue=[start],seen=new Set([start.join(',')]);
  while(queue.length){const [x,y]=queue.shift();for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){
   const nx=x+dx,ny=y+dy,key=`${nx},${ny}`;
   if(inside(map,nx,ny)&&!map.walls.has(key)&&!seen.has(key)){seen.add(key);queue.push([nx,ny]);}
  }}
  for(const p of map.portals)if(!seen.has(`${p.x},${p.y}`))issues.push(`${id}: Portal ${p.x},${p.y} nicht vom Nordeingang erreichbar`);
 }
 return issues;
}
export function auditOutdoorLayout(){
 const issues=[];
 for(const id of ['village','beerendorf','route2']){
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
