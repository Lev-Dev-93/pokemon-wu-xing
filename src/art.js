import {drawFurnitureSprite} from './furniture-art.js';
import {currentLayout} from './layout-runtime.js';
import {drawMuAtmosphere} from './mu-atmosphere.js';
import {drawForestAtmosphere} from './forest-atmosphere.js';
import {facingAccent} from './visual-details.js';
import {objectHighlight} from './visual-details.js';
import {waterGlint} from './visual-details.js';
import {npcShadow} from './visual-details.js';
import {heroShadow} from './visual-details.js';
import {isTravelPath} from './landscape.js';
import {isPlannedRoad} from './path-geometry.js';
import {isWalkway} from './route-layout.js';
import {outdoorBuildings,forestTreeCells,isVillagePath,isBerryVillagePath,isProfessorClearingPath} from './maps.js';
import {landscapeDetails,terrainKind,terrainEdgeMask,safeVillageDecorations,brookBankCells,woodlandAccentCells,berryVillageDecorations} from './landscape.js';
import {npcs,objects} from './maps.js';
// Pokémon Wu Xing: all visual primitives and tiles are original, generated locally.
// One 32px world tile equals one engine cell. Renderer never mutates game state.
const T=32;
const R=(c,x,y,w,h,color)=>{c.fillStyle=color;c.fillRect(Math.round(x),Math.round(y),w,h)};
const L=(c,x,y,w,h,a,b)=>{R(c,x,y,w,h,a);R(c,x,y,w,2,b)};
function wood(c,x,y,n){R(c,x,y,T,T,'#bc8b5b');R(c,x,y,32,1,'#e0b584');R(c,x,y+15,32,1,'#98623e');R(c,x+31,y,1,32,'#98623e');R(c,x+5+(n*7)%16,y+6,9,1,'#d8a676');R(c,x+3+(n*13)%15,y+24,11,1,'#9f704b')}
function stone(c,x,y,n){R(c,x,y,32,32,'#c9b69b');R(c,x,y+15,32,1,'#a99880');R(c,x+((n%2)*16),y,1,16,'#aa9980');R(c,x+16-((n%2)*16),y+16,1,16,'#aa9980');R(c,x+4,y+4,5,1,'#e6d6b9')}
function grass(c,x,y,n){R(c,x,y,32,32,((n*17)%5===0)?'#7da66a':'#87ad71');for(let i=0;i<5;i++){let xx=(n*13+i*11)%29,yy=(n*7+i*17)%29;R(c,x+xx,y+yy,2,4,i%2?'#669257':'#a5c287');R(c,x+xx+3,y+yy+2,2,2,'#6e9c5a')}}
function path(c,x,y,n){R(c,x,y,32,32,'#cbb58a');R(c,x+2,y+3,10,3,'#decba6');R(c,x+19,y+18,9,3,'#b5a079');R(c,x+8+(n%8),y+24,3,2,'#a9906d')}
function wallpaper(c,x,y,n){R(c,x,y,32,32,'#e9d5a9');R(c,x,y+24,32,8,'#91664a');R(c,x,y+23,32,2,'#f8e6bc');R(c,x+7,y+5,2,8,'#ddc394');R(c,x+22,y+5,2,8,'#ddc394')}
function window(c,x,y){R(c,x+4,y+3,24,24,'#8a6248');R(c,x+7,y+6,18,17,'#b9dce0');R(c,x+15,y+6,2,17,'#f9e4bb');R(c,x+7,y+14,18,2,'#f9e4bb');R(c,x+2,y+25,28,4,'#d5a876')}
function carpet(c,x,y,w,h,color='#9c5c58'){R(c,x+2,y+3,w-4,h-6,'#68464a');R(c,x+5,y+6,w-10,h-12,color);R(c,x+10,y+11,w-20,h-22,'#c89079');R(c,x+15,y+16,w-30,h-32,color)}
function bed(c,x,y){R(c,x+1,y+1,30,64,'#593e33');R(c,x+4,y+3,24,58,'#f2e8d0');R(c,x+6,y+6,20,15,'#fff2d7');R(c,x+4,y+22,24,33,'#638b8d');R(c,x+7,y+25,18,3,'#9fc5bb');R(c,x+1,y+59,30,5,'#49382e')}
function desk(c,x,y){R(c,x+1,y+5,62,26,'#65442e');R(c,x+2,y+3,60,17,'#b87b4b');R(c,x+5,y+6,54,3,'#e2ac72');R(c,x+8,y+21,15,10,'#7b5035');R(c,x+42,y+21,15,10,'#7b5035');R(c,x+26,y+5,14,10,'#eee0b2');R(c,x+47,y+7,5,8,'#4e8877')}
function dresser(c,x,y){R(c,x+2,y+2,60,29,'#654733');R(c,x+4,y+3,56,25,'#9d714e');R(c,x+31,y+4,2,24,'#4e392d');R(c,x+26,y+15,3,4,'#ebc379');R(c,x+37,y+15,3,4,'#ebc379');R(c,x+4,y+27,56,4,'#543b30')}
function sofa(c,x,y){R(c,x+2,y+4,60,26,'#51483d');R(c,x+5,y+4,54,16,'#799b79');R(c,x+5,y+19,54,9,'#597c66');R(c,x+9,y+8,21,8,'#9bb899');R(c,x+34,y+8,21,8,'#9bb899')}
function table(c,x,y){R(c,x+3,y+4,57,26,'#684932');R(c,x+5,y+3,53,22,'#c58c56');R(c,x+11,y+7,42,2,'#e7b87d');R(c,x+26,y+12,12,8,'#f2e2bf')}
function counter(c,x,y){R(c,x+1,y+2,62,29,'#76513a');R(c,x+1,y+2,62,11,'#d4a16c');R(c,x+5,y+15,54,12,'#9d704c');R(c,x+9,y+18,13,6,'#e8d5ac');R(c,x+34,y+18,14,6,'#5e8175')}
function shelf(c,x,y){R(c,x+2,y+2,28,28,'#684b37');R(c,x+5,y+5,22,7,'#a37c53');R(c,x+5,y+15,22,7,'#a37c53');for(let i=0;i<5;i++)R(c,x+7+i*4,y+5+(i%2)*11,3,7,['#8a9d6a','#a86f5c','#e0c188'][i%3])}
function pot(c,x,y){R(c,x+9,y+19,15,11,'#b36f4c');R(c,x+7,y+18,19,3,'#d49a6d');for(const [dx,dy] of [[6,10],[12,3],[19,8],[12,13],[20,2]]){R(c,x+dx,y+dy,8,9,'#447f57');R(c,x+dx+2,y+dy+1,3,4,'#76ae67')}}
function stairs(c,x,y){R(c,x,y,32,32,'#8e6c50');for(let i=0;i<4;i++){R(c,x+2,y+3+i*7,28,6,i%2?'#c69c65':'#dbb47c');R(c,x+2,y+8+i*7,28,2,'#73513b')}}
function door(c,x,y){R(c,x+1,y,30,32,'#6a4c3a');R(c,x+4,y+2,24,27,'#35404a');R(c,x+7,y+5,18,20,'#596a73');R(c,x+2,y+28,28,4,'#d7b27b')}
function flower(c,x,y){R(c,x+15,y+18,2,9,'#4b8c4b');for(const [dx,dy] of [[11,14],[18,14],[15,10],[15,18]])R(c,x+dx,y+dy,5,5,'#e7d4df');R(c,x+15,y+14,4,4,'#f2c85c')}
function fence(c,x,y){R(c,x+2,y+8,28,5,'#d3aa72');R(c,x+2,y+20,28,5,'#a7794d');for(let i=0;i<3;i++){R(c,x+3+i*11,y+3,7,28,'#b78a5b');R(c,x+4+i*11,y+3,2,24,'#e4bd84')}}
function roof(c,x,y){R(c,x,y,32,32,'#9e5947');for(let j=0;j<4;j++){R(c,x,y+j*8,32,2,'#754338');R(c,x+(j%2)*11+4,y+j*8+3,11,1,'#c47b5a')}}
function facadeDetail(c,x,y,w,h,seed=0){
 // Purely visual: windows and cornices stay inside the existing building footprint.
 const left=x*T,top=y*T,right=(x+w)*T,bottom=(y+h)*T;
 R(c,left+2,top+2,w*T-4,3,'#d6a77c');
 for(let i=0;i<w;i++){
  const xx=left+i*T;
  R(c,xx+4,top+7,24,2,'#db9471');
  R(c,xx+5,top+14,8,2,'#80483e');
  if(h>1&&i>0&&i<w-1&&i%2===(seed%2)){
   R(c,xx+7,bottom-25,18,17,'#654c3d');R(c,xx+9,bottom-23,14,13,'#80b5b5');
   R(c,xx+15,bottom-23,2,13,'#f1dcab');R(c,xx+9,bottom-17,14,2,'#f1dcab');
   R(c,xx+5,bottom-8,22,3,'#b17e57');
  }
 }
}
function interiorDetail(c,id){
 // Wall trim and furnishing accents never add collision cells.
 for(let x=0;x<12;x++){R(c,x*T,26,32,2,'#d5b78c');R(c,x*T,29,32,2,'#795a48')}
 for(const [x,y] of [[1,2],[9,3]]){R(c,x*T+10,y*T+8,12,14,'#755b43');R(c,x*T+12,y*T+10,8,10,'#d5c294');R(c,x*T+14,y*T+12,4,6,'#7a9b79')}
 if(id==='study'){R(c,6*T+6,2*T+8,20,3,'#8ca7ac');R(c,6*T+8,2*T+12,16,2,'#b6d1ce')}
}
function wallBlock(c,x,y){R(c,x,y,32,32,'#79644f');R(c,x+2,y+2,28,26,'#a18a6a');R(c,x+3,y+4,26,2,'#d4b795');R(c,x+2,y+27,28,4,'#624e41')}
function hero(c,x,y,facing,steps){const walk=steps%2===0?0:2;R(c,x+10,y+26,6,4-walk,'#3b3b48');R(c,x+19,y+26-walk,6,4+walk,'#3b3b48');R(c,x+9,y+16,18,12,'#426e85');R(c,x+10,y+18,3,9,'#e0a77e');R(c,x+24,y+18,3,9,'#e0a77e');R(c,x+10,y+7,16,12,'#eebf96');R(c,x+8,y+4,20,8,'#513a33');R(c,x+11,y+2,14,4,'#715043');R(c,x+13,y+17,10,3,'#d5a980');if(facing==='down'){R(c,x+13,y+13,2,2,'#322d30');R(c,x+21,y+13,2,2,'#322d30')}if(facing==='left')R(c,x+10,y+13,2,2,'#322d30');if(facing==='right')R(c,x+24,y+13,2,2,'#322d30');if(facing==='up'){R(c,x+12,y+9,13,8,'#614b3f');R(c,x+14,y+18,9,8,'#a97c5e')}}
function drawBedroom(c){interiorDetail(c,'bedroom');carpet(c,96,128,64,64);window(c,5*32,0);door(c,5*32,7*32)}
function drawUpper(c){interiorDetail(c,'upper');carpet(c,4*32,3*32,4*32,3*32,'#8b7769');sofa(c,32,32);dresser(c,9*32,32);window(c,5*32,0);pot(c,10*32,3*32);shelf(c,32,5*32);door(c,5*32,32);stairs(c,10*32,7*32)}
function drawGround(c){
 interiorDetail(c,'ground');
 // Küche links: Herd, Spüle, Schränke und Esstisch. Wohnzimmer rechts: Sofa, Teppich und Bücher.
 R(c,0,0,6*T,7*T,'#b79b78');R(c,6*T,0,6*T,7*T,'#c3ad8c');
 for(let x=0;x<6;x++)R(c,x*T,0,T,6,'#896748');
 
 
 
 carpet(c,7*T,3*T,4*T,3*T,'#8d665c');
 window(c,5*T,0);window(c,9*T,0);
 stairs(c,10*T,T);door(c,5*T,8*T);
}
function drawYard(c,map){const W=map.w*T;
 // Weidegräser nur auf freien Feldern, nicht auf Türen, Wegen oder Portalen.
 for(const [x,y] of [[10,5],[11,5],[12,6],[13,5],[11,6],[5,8],[6,6]]){
  if(map.walls.has(`${x},${y}`)||map.portals.some(p=>p.x===x&&p.y===y)||x===7||y===10)continue;
  R(c,x*T+10,y*T+18,2,9,'#5a914c');R(c,x*T+17,y*T+15,2,12,'#6d9c52');
 }

 for(let x=1;x<=6;x++)roof(c,x*T,0);
 for(let x=1;x<=6;x++){wallBlock(c,x*T,T);if(x===3||x===5)window(c,x*T,T)}
 R(c,7*T+4,T+4,24,25,'#6a4b39');R(c,7*T+7,T+6,18,22,'#3f5961');
 for(let y=2;y<11;y++)if(!map.walls.has(`7,${y}`))path(c,7*T,y*T,y);
 for(let x=4;x<11;x++)if(!map.walls.has(`${x},10`))path(c,x*T,10*T,x);
 // Umzäunte Weide mit offenem Tor im Süden; Zaun-Kollisionen liegen in maps.js.
 for(let x=9;x<=14;x++){fence(c,x*T,3*T);if(x!==10)fence(c,x*T,7*T)}
 for(let y=4;y<=6;y++){fence(c,9*T,y*T);fence(c,14*T,y*T)}
 for(const [x,y] of [[10,4],[12,5],[13,6]]){R(c,x*T+6,y*T+12,20,13,'#77a45a');R(c,x*T+11,y*T+7,9,9,'#a3c875')}
 // Kleiner Teich links unten: Wasser ist nicht betretbar.
 for(let y=8;y<=9;y++)for(let x=2;x<=4;x++){R(c,x*T,y*T,T,T,'#78a88c');R(c,x*T+3,y*T+3,26,26,'#438fa9');R(c,x*T+9,y*T+11,14,2,'#8cd4d7')}
 for(const [x,y] of [[2,6],[4,7],[12,9],[13,9],[14,8]])flower(c,x*T,y*T);
 for(const [x,y] of [[1,9],[14,2],[2,10]])pot(c,x*T,y*T);
 for(let y=3;y<11;y++){fence(c,0,y*T);fence(c,W-T,y*T)}
}
function drawBuildingFacades(c,buildings){
 for(const {x,y,w,h,color='#9e7153',label=''} of buildings){
  for(let yy=y;yy<y+h;yy++)for(let xx=x;xx<x+w;xx++){
   wallBlock(c,xx*T,yy*T);
   if(yy===y)roof(c,xx*T,yy*T);
  }
  facadeDetail(c,x,y,w,h,x+y);
  R(c,x*T+5,(y+h-1)*T+6,w*T-10,16,color);
  if(label&&typeof c.fillText==='function'){
   c.save();c.fillStyle='#fff2d1';c.font='bold 9px sans-serif';
   c.fillText(label,x*T+8,(y+h-1)*T+18);c.restore();
  }
 }
}
function drawVillage(c,map){
 // Kleine Pflastersteine nur auf tatsächlich freien Dorfwegen.
 for(let y=1;y<map.h-1;y++)for(let x=1;x<map.w-1;x++){
  if(!isVillagePath(x,y)||map.walls.has(`${x},${y}`)||map.portals.some(p=>p.x===x&&p.y===y))continue;
  if((x*11+y*7)%5===0){R(c,x*T+7,y*T+9,7,3,'#b39c78');R(c,x*T+20,y*T+22,5,2,'#e3cda8')}
 }

 // Sieben Häuser; Labor und Professorenhaus zusammen im nördlichen Viertel.
 drawBuildingFacades(c,outdoorBuildings.village);
 // Vier geordnete Gruenflaechen, ausserhalb der Hauptachsen.
 for(const [x,y] of [[7,4],[14,4],[7,10],[14,10]]){
  if(!map.walls.has(`${x},${y}`)&&!isVillagePath(x,y)){R(c,x*T+5,y*T+8,22,17,'#638e50');R(c,x*T+10,y*T+11,12,10,'#94b36c');}
 }
 for(let x=0;x<map.w;x++){if(!isPlannedRoad(map.id,x,0))fence(c,x*T,0);if(!isPlannedRoad(map.id,x,map.h-1))fence(c,x*T,(map.h-1)*T)}
 for(const {x,y} of map.portals.filter(p=>p.kind==='door')){door(c,x*T,y*T);R(c,x*T+7,y*T+26,18,4,'#e4c88f')}
 R(c,10*T+4,0,24,9,'#b5a07c');
}
function drawProfessorClearing(c,map){
 // Hohes Gras der Lehrvorführung, rein visuell und abseits der Wege.
 for(const [gx,gy] of [[6,10],[7,10],[8,10],[6,11],[7,11],[8,11]]){
  const X=gx*T,Y=gy*T;R(c,X+1,Y+9,30,21,'#386f48');
  for(let k=0;k<5;k++){const xx=X+3+k*6;R(c,xx,Y+8+(k%2)*4,3,17,'#65a963');R(c,xx+2,Y+5+(k%3)*3,2,12,'#8bc77b');}
 }

 // Laborplatz: Wegpflaster ohne Übermalen von Gebäuden oder Türfeldern.
 for(let y=4;y<=7;y++)for(let x=5;x<=11;x++){
  if(!isProfessorClearingPath(x,y)||map.walls.has(`${x},${y}`)||map.portals.some(p=>p.x===x&&p.y===y))continue;
  if((x+y)%3===0)R(c,x*T+8,y*T+21,13,2,'#b4a183');
 }

 drawBuildingFacades(c,outdoorBuildings.professor_clearing);
 for(const {x,y} of map.portals.filter(p=>p.kind==='door'))door(c,x*T,y*T);
 for(const [x,y] of [[1,3],[14,3],[3,9],[12,10]])if(!map.walls.has(`${x},${y}`)&&terrainKind(map.id,x,y)!=='path'&&!isWalkway(map,x,y))pot(c,x*T,y*T);
 R(c,(map.w-1)*T,7*T+8,32,8,'#e2c99c');
}
function drawBeerendorf(c,map){
 // Eigenständige Dorfzeichnung: die Werkstatt-Tür liegt sichtbar auf (4,5).
 drawBuildingFacades(c,outdoorBuildings.beerendorf);
 // Wege sind bereits einheitlich im Kartenhintergrund gezeichnet.
 for(const [x,y] of [[1,8],[11,8],[1,12],[11,12]]){if(map.walls.has(`${x},${y}`)||terrainKind(map.id,x,y)==='path'||isWalkway(map,x,y))continue;pot(c,x*T,y*T);if(!map.walls.has(`${x+1},${y}`)&&terrainKind(map.id,x+1,y)!=='path'&&!isWalkway(map,x+1,y))flower(c,(x+1)*T,y*T)}
 for(const [x,y] of [[1,9],[2,9],[11,10],[12,10]]){R(c,x*T+5,y*T+15,22,11,'#7b9c58');R(c,x*T+8,y*T+11,16,7,'#a3b96b')}for(const {x,y} of map.portals.filter(p=>p.kind==='door'))door(c,x*T,y*T);R(c,4*T+3,5*T-9,26,9,'#a87845');
 R(c,4*T+7,5*T-7,18,5,'#f3e0ac');
 R(c,10*T+5,10*T+6,22,20,'#a5a8a1');R(c,10*T+8,10*T+8,16,8,'#72b8c2');R(c,0,7*T+10,9,12,'#e2c99c');R(c,(map.w-1)*T+23,7*T+10,9,12,'#e2c99c');
}
function drawRoute1(c,map){for(let y=0;y<map.h;y++)for(let x=0;x<map.w;x++)if(isTravelPath(map.id,x,y)&&!map.walls.has(`${x},${y}`))path(c,x*T,y*T,x+y*map.w);for(const [x,y] of [[1,2],[3,8],[12,3],[14,10],[2,15],[13,16]]){if(map.walls.has(`${x},${y}`)||terrainKind(map.id,x,y)==='path'||isWalkway(map,x,y))continue;pot(c,x*T,y*T);if(!map.walls.has(`${x+1},${y}`)&&terrainKind(map.id,x+1,y)!=='path'&&!isWalkway(map,x+1,y))flower(c,(x+1)*T,y*T)}for(const [x,y] of [[2,3],[3,3],[12,3],[13,3],[2,13],[3,13],[12,13],[13,13]]){if(!map.walls.has(`${x},${y}`))continue;R(c,x*T,y*T,32,32,'#3c704a');R(c,x*T+6,y*T+3,20,25,'#5e985a')}if(map.id==='route1'){R(c,0,8*T+10,9,12,'#e2c99c');R(c,15*T+23,6*T+10,9,12,'#e2c99c')}}
function drawInterior(c,id){interiorDetail(c,id);carpet(c,3*T,3*T,5*T,3*T,id==='study'?'#607d87':'#9b775b');window(c,5*T,0);door(c,5*T,7*T)}
export function drawNpc(c,x,y,kind,frame=0){
 const palette={brook_ranger:['#587f63','#8d6742'],brook_artist:['#ae8c6b','#9d677a'],merchant:['#d7aa43','#4e7256'],route1_trainer:['#df624f','#376caa'],route1_guide:['#6fa88e','#5b6e54'],route1_naturalist:['#86a16e','#b3a179'],route2_guide:['#ba9466','#607e5d'],route2_botanist:['#71a67a','#d4c293'],route2_hiker:['#b68e62','#685f4e'],route1_guide:['#6fa88e','#5b6e54'],route1_naturalist:['#86a16e','#b3a179'],route2_guide:['#ba9466','#607e5d'],route2_botanist:['#71a67a','#d4c293'],route2_hiker:['#b68e62','#685f4e'],route1_guide:['#6fa88e','#5b6e54'],route1_naturalist:['#86a16e','#b3a179'],route2_guide:['#ba9466','#607e5d'],route2_botanist:['#71a67a','#d4c293'],route2_hiker:['#b68e62','#685f4e'],herbal_witch:['#765486','#637c49'],resident:['#9a70b0','#e2bd80'],breeder_a:['#b87558','#668a65'],breeder_b:['#718ca8','#9a7757'],villager:['#c17f69','#6b965c'],rival:['#6c7cb1','#c0a17d'],professor:['#e9e8db','#e9e8db']};
 const [shirt,hat]=palette[kind]||['#8aa58c','#a17c61'];const X=x*T,Y=y*T;const pose=(frame%4===1?2:frame%4===3?-2:0);
 R(c,X+7,Y+28,19,3,'#51463c');R(c,X+9,Y+17,6,11+Math.max(0,pose),'#4b4854');R(c,X+19,Y+17,6,11+Math.max(0,-pose),'#4b4854');R(c,X+8,Y+26+Math.max(0,pose),8,3,'#343a48');R(c,X+19,Y+26+Math.max(0,-pose),8,3,'#343a48');
 R(c,X+7,Y+13,19,11,shirt);R(c,X+5,Y+15+pose,4,9,'#d6a17e');R(c,X+25,Y+15-pose,4,9,'#d6a17e');
 R(c,X+10,Y+5,14,12,'#efbd93');R(c,X+9,Y+3,16,6,hat);R(c,X+13,Y+11,2,2,'#342c32');R(c,X+20,Y+11,2,2,'#342c32');
 if(kind==='merchant'){R(c,X+4,Y+2,24,4,'#dcb54b');R(c,X+10,Y,12,4,'#dcb54b');R(c,X+13,Y+18,7,5,'#f7db8c')}
 if(kind==='route1_trainer'){R(c,X+6,Y+3,20,4,'#e35648');R(c,X+22,Y+4,8,3,'#e35648');R(c,X+14,Y+17,6,6,'#fff4de')}
 if(kind==='professor'){R(c,X+8,Y+17,4,12,'#f7f4e9');R(c,X+23,Y+17,4,12,'#f7f4e9')}
}
function drawTag(c,x,y,label){if(typeof c.fillText!=='function'||typeof c.measureText!=='function')return;c.save();c.font='bold 10px sans-serif';const w=Math.ceil(c.measureText(label).width)+10;const px=Math.max(0,Math.round(x*T+16-w/2)),py=Math.max(0,y*T-14);R(c,px,py,w,13,'#252d2b');R(c,px+1,py+1,w-2,11,'#f4e6b5');c.fillStyle='#252d2b';c.fillText(label,px+5,py+10);c.restore()}
function drawPathEdges(c,map){
 for(let y=0;y<map.h;y++)for(let x=0;x<map.w;x++){
  if(map.walls.has(`${x},${y}`))continue;
  const mask=terrainEdgeMask(map,x,y),X=x*T,Y=y*T;
  if(mask&1)R(c,X,Y,32,2,'#a99773');
  if(mask&2)R(c,X+30,Y,2,32,'#a99773');
  if(mask&4)R(c,X,Y+30,32,2,'#a99773');
  if(mask&8)R(c,X,Y,2,32,'#a99773');
 }
}
function drawVillageDecor(c,map){
 for(const [x,y,kind] of safeVillageDecorations(map)){const X=x*T,Y=y*T;
  if(kind==='flowerbed'){R(c,X+3,Y+19,26,9,'#866247');for(const ox of [7,16,24]){R(c,X+ox,Y+13,2,10,'#3d7b46');R(c,X+ox-3,Y+11,7,6,'#e5a9bd');}}
  if(kind==='bench'){R(c,X+3,Y+15,26,5,'#9b6844');R(c,X+5,Y+10,22,4,'#c48a59');R(c,X+6,Y+20,3,7,'#5e4737');R(c,X+24,Y+20,3,7,'#5e4737');}
  if(kind==='researchPlot'){R(c,X+3,Y+7,26,20,'#74583d');for(let i=0;i<3;i++){R(c,X+6+i*8,Y+10,4,14,'#5d9156');R(c,X+6+i*8,Y+8,4,5,'#b4c86b');}}
 }
}
function drawBrookBanks(c,map){
 for(const {x,y,side} of brookBankCells(map)){const X=x*T,Y=y*T;
  const oy=side==='north'?24:0;
  R(c,X,Y+oy,32,7,'#547f59');R(c,X,Y+oy+2,32,2,'#9fbc7a');
  if(x%3===0){R(c,X+10,Y+oy-4,2,7,'#4c7850');R(c,X+9,Y+oy-7,5,4,'#b2a16b');}
 }
}
function drawWoodlandAccents(c,map){
 // Waldrand-Wegsaum: dezente Vegetation neben dem freien Hauptweg.
 if(map.id==='waldrand')for(let y=1;y<=6;y++)for(const x of [5,10]){
  if(map.walls.has(`${x},${y}`)||isTravelPath(map.id,x,y))continue;
  R(c,x*T+11,y*T+22,2,6,'#528c50');R(c,x*T+17,y*T+19,2,8,'#6a9d58');
 }

 for(const {x,y,kind} of woodlandAccentCells(map)){const X=x*T,Y=y*T;
  if(kind==='leafLitter'){for(const [dx,dy] of [[6,17],[16,12],[23,23]]){R(c,X+dx,Y+dy,5,3,'#9a8850');R(c,X+dx+2,Y+dy+2,3,2,'#b1a269');}}
  else{R(c,X+7,Y+20,13,4,'#71966b');R(c,X+11,Y+16,8,5,'#a3b48a');}
 }
}
function drawBerryVillageDecor(c,map){
 for(const [x,y,kind] of berryVillageDecorations(map)){const X=x*T,Y=y*T;
  if(kind==='crate'){R(c,X+6,Y+15,20,14,'#8a5c39');R(c,X+8,Y+17,16,9,'#c08d54');R(c,X+14,Y+17,3,9,'#6c492f');}
  if(kind==='barrel'){R(c,X+9,Y+11,15,18,'#91613d');R(c,X+9,Y+14,15,3,'#d5a76a');R(c,X+9,Y+23,15,3,'#d5a76a');}
  if(kind==='basket'){R(c,X+7,Y+18,19,10,'#a97845');R(c,X+10,Y+15,13,6,'#bf6572');R(c,X+11,Y+19,3,3,'#e0b4b8');}
 }
}
function drawLandscapeDetails(c,map){
 for(const {x,y,type} of landscapeDetails(map)){
  const X=x*T,Y=y*T;
  if(type==='wildflower'){R(c,X+9,Y+20,2,8,'#3d8250');R(c,X+8,Y+16,7,6,'#edcbdc');R(c,X+10,Y+17,3,3,'#e5bb53')}
  if(type==='tuft'){for(let i=0;i<3;i++){R(c,X+7+i*5,Y+18-i%2*3,2,10,'#467c48');R(c,X+5+i*5,Y+21,4,2,'#72a45d')}}
  if(type==='stone'||type==='pebbles'){R(c,X+7,Y+20,15,7,'#92988b');R(c,X+9,Y+18,10,3,'#c4c8b6');if(type==='pebbles')R(c,X+24,Y+24,4,3,'#b5b8a8')}
  if(type==='reeds'){for(let i=0;i<3;i++){R(c,X+8+i*6,Y+10+i%2*3,2,18,'#5b8451');R(c,X+8+i*6,Y+8+i%2*3,3,7,'#b49d63')}}
  if(type==='fern'){for(let i=0;i<4;i++){R(c,X+8+i*4,Y+14+i%2*3,3,12,'#356e46');R(c,X+5+i*4,Y+17+i%2*3,9,3,'#5c9b60')}}
  if(type==='mushroom'){R(c,X+14,Y+21,4,6,'#dfd7b3');R(c,X+9,Y+17,14,6,'#a65d4d');R(c,X+13,Y+18,3,2,'#f6dcb9')}
  if(type==='berryBush'){R(c,X+8,Y+16,17,12,'#477f4b');R(c,X+11,Y+13,11,12,'#659e58');R(c,X+12,Y+19,3,3,'#ba5b6c');R(c,X+20,Y+23,3,3,'#b94b5d')}
  if(type==='roots'){R(c,X+4,Y+24,24,3,'#795f44');R(c,X+8,Y+20,4,7,'#8d6c4b');R(c,X+21,Y+22,3,5,'#8d6c4b')}
 }
}

function drawLayoutFurniture(c,id){for(const o of currentLayout()[id]||[])if(o.kind==='furniture')drawFurnitureSprite(c,o,T)}

export function drawScene(c,map,state,animationFrame=0,actors=npcs[map.id]||[],heroVisual=null){c.imageSmoothingEnabled=false;for(let y=0;y<map.h;y++)for(let x=0;x<map.w;x++){const px=x*T,py=y*T,n=x+y*map.w;if(map.id==='yard'){if(x===7&&y>=2||y===10&&x>=4&&x<=10)path(c,px,py,n);else grass(c,px,py,n)}else if((((map.id==='route1'||['route2','waldrand'].includes(map.id))||['route2','waldrand'].includes(map.id))||['route2','waldrand'].includes(map.id))){if(isTravelPath(map.id,x,y)&&!map.walls.has(`${x},${y}`))path(c,px,py,n);else grass(c,px,py,n)}else if(map.id==='brook'){if(y>=7&&y<=9){R(c,px,py,32,32,x>=6&&x<=9?'#aa8356':'#4d9eaf')}else if(isTravelPath(map.id,x,y)&&!map.walls.has(`${x},${y}`))path(c,px,py,n);else grass(c,px,py,n)}else if(map.id==='village'){if(isVillagePath(x,y)&&!map.walls.has(`${x},${y}`))path(c,px,py,n);else grass(c,px,py,n)}else if(map.id==='professor_clearing'){if(isProfessorClearingPath(x,y)&&!map.walls.has(`${x},${y}`))path(c,px,py,n);else grass(c,px,py,n)}else if(map.id==='beerendorf'){if(isBerryVillagePath(x,y)&&!map.walls.has(`${x},${y}`))path(c,px,py,n);else grass(c,px,py,n)}else if(map.id==='ground')stone(c,px,py,n);else wood(c,px,py,n);if(!['yard','village','professor_clearing','route1','route2','waldrand','beerendorf','brook'].includes(map.id)&&y===0)wallpaper(c,px,py,n)}
if(map.id==='bedroom'){drawBedroom(c)}if(map.id==='ground'){drawGround(c)}if(map.id==='yard'){drawYard(c,map);for(const [fx,fy] of [[1,6],[4,7],[12,8],[14,6]]){R(c,fx*T+6,fy*T+11,20,15,'#6b8e50');R(c,fx*T+10,fy*T+6,12,12,'#96b36c')}}if(map.id==='village')drawVillage(c,map);if(map.id==='professor_clearing')drawProfessorClearing(c,map);if(map.id==='beerendorf')drawBeerendorf(c,map);if(map.id==='route2'){for(let y=11;y<=12;y++)for(let x=9;x<=10;x++){wallBlock(c,x*T,y*T);if(y===11)roof(c,x*T,y*T)}door(c,10*T,13*T);}if(map.id==='beerendorf_haus2'){drawInterior(c,'village_home');for(const [x,y] of [[2,2],[8,2],[2,5]]){R(c,x*T+10,y*T+12,13,13,'#608b51');R(c,x*T+13,y*T+15,5,5,'#c95667')}}if(map.id==='beerendorf_haus'){drawInterior(c,'village_home')}if(map.id==='beerendorf_wohnhaus'){drawInterior(c,'village_home')}if(map.id==='forest_elder_house'){drawInterior(c,'village_home')}if(map.id==='beerendorf_werkstatt'){drawInterior(c,'study')}if(((map.id==='route1'||['route2','waldrand'].includes(map.id))||['route2','waldrand'].includes(map.id))||['route2','waldrand'].includes(map.id))drawRoute1(c,map);if(map.id==='brook'){for(let x=0;x<map.w;x++)for(let y=7;y<=9;y++)if(x<6||x>9){const X=x*T,Y=y*T;R(c,X+4,Y+9,18,2,'#82c6ce');R(c,X+12,Y+23,12,2,'#75b8c5');waterGlint(c,X,Y,state.steps||0)}for(const [x,y] of [[2,3],[13,3],[2,12],[13,12]])if(!map.walls.has(`${x},${y}`)&&terrainKind(map.id,x,y)==='grass'){pot(c,x*T,y*T)}for(let x=0;x<map.w;x++){if(x<6||x>9){for(let y of [6,10]){R(c,x*T,y*T+18,32,14,'#739c66');R(c,x*T+8,y*T+12,3,15,'#4c7e57');R(c,x*T+21,y*T+10,3,18,'#527d51')}}}for(let y=7;y<=9;y++)for(let x=6;x<=9;x++){const X=x*T,Y=y*T;R(c,X,Y,32,32,'#a47848');R(c,X+2,Y+3,28,5,'#d4a36b');R(c,X+2,Y+19,28,4,'#744e32');R(c,X+14,Y,3,32,'#5f402b');if(x===6||x===9){R(c,X+(x===6?2:26),Y+3,4,26,'#66462f');R(c,X+(x===6?2:26),Y+3,4,3,'#e7b77e')}}}if(map.id==='village_home'||map.id==='village_house_east'||map.id==='professor_house'||map.id==='chapel'||map.id==='rival_house'||map.id==='study'){drawInterior(c,map.id==='study'?'study':'village_home');if(map.id==='chapel'){carpet(c,4*T,T,3*T,5*T,'#927b9c')}}
drawPathEdges(c,map);
drawLandscapeDetails(c,map);
drawVillageDecor(c,map);
drawBrookBanks(c,map);
drawWoodlandAccents(c,map);
drawBerryVillageDecor(c,map);
// Collision layer is always visually indicated, without changing the engine's walls.
for(const cell of map.walls){const [x,y]=cell.split(',').map(Number);if(map.id==='bedroom')continue;if(map.id==='ground'&&((x===1||x===2)&&y===1||(x===8||x===9)&&y===1||(x===2||x===3)&&y===5))continue;if(map.id==='brook'||map.id==='yard'||map.id==='village'||map.id==='professor_clearing'||(((map.id==='route1'||['route2','waldrand'].includes(map.id))||['route2','waldrand'].includes(map.id))||['route2','waldrand'].includes(map.id)))continue;wallBlock(c,x*32,y*32)}
// Baeume werden ausschliesslich auf den echten, blockierten Baumkacheln gezeichnet.
if(map.id==='waldrand'||map.id==='route2'){
 for(const [x,y] of forestTreeCells(map.id,map.w,map.h)){
  if(!map.walls.has(`${x},${y}`))continue;
  const X=x*T,Y=y*T,deep=map.id==='route2';
  R(c,X+11,Y+14,10,18,'#705238');
  R(c,X+2,Y+4,28,23,deep?'#315e42':'#41774b');
  R(c,X+6,Y+1,20,17,deep?'#457b50':'#58945a');
  R(c,X+10,Y+6,11,7,deep?'#5c9562':'#75a66b');
 }
}
if(map.id==='route2'){
 // Wegmarkierungen stehen auf dem Boden und blockieren keine Kachel.
 for(const [x,y] of [[7,3],[8,7],[7,12],[8,15]]){
  const X=x*T,Y=y*T;R(c,X+13,Y+23,6,5,'#766344');R(c,X+15,Y+17,2,7,'#c7ad75');
 }
}
if(map.id==='route2'){
 // Waldlichtungen: gedämpfte Bodenakzente, keine unsichtbaren Hindernisse.
 for(const [x,y] of [[6,4],[9,5],[6,11],[9,13],[6,16]]){
  const X=x*T,Y=y*T;R(c,X+4,Y+19,9,3,'#638354');R(c,X+17,Y+12,3,3,'#d1b777');R(c,X+21,Y+21,5,2,'#6b8b5a');
 }
}
if(map.id==='yard'){// raised garden tiles must stay visible above the ground
R(c,8*32,8*32,3*32,2,'#e7c99b')}

drawMuAtmosphere(c,map);
drawForestAtmosphere(c,map);
if(currentLayout()[map.id])drawLayoutFurniture(c,map.id);
for(const item of objects[map.id]||[]){if(item.id==='pokemon_pc'){R(c,item.x*T+4,item.y*T+3,24,23,'#343c55');R(c,item.x*T+7,item.y*T+6,18,13,'#69c9d2');R(c,item.x*T+11,item.y*T+22,10,5,'#c6cbd2');R(c,item.x*T+7,item.y*T+27,18,3,'#555c6d');objectHighlight(c,item.x*T,item.y*T,'pc');drawTag(c,item.x,item.y,'PC')}else if(item.id==='supply_box'){R(c,item.x*T+3,item.y*T+9,26,20,'#8d6135');R(c,item.x*T+3,item.y*T+9,26,5,'#e0b967');R(c,item.x*T+13,item.y*T+10,6,17,'#e8d19a');objectHighlight(c,item.x*T,item.y*T,'box');drawTag(c,item.x,item.y,'TRÄNKE')}else if(item.id==='village_sign'||item.id==='professor_sign'){R(c,item.x*T+7,item.y*T+6,18,20,'#a77a4c');R(c,item.x*T+5,item.y*T+3,22,13,'#e6c990')}}
for(const npc of actors){npcShadow(c,npc.x,npc.y);drawNpc(c,npc.x,npc.y,npc.id,npc.moving===true?(npc.walkPhase??Math.floor(animationFrame/2)):0);if(npc.id==='merchant')drawTag(c,npc.x,npc.y,'LADEN');if(npc.id==='route1_trainer')drawTag(c,npc.x,npc.y,'TRAINER');}
const hx=(heroVisual?.x??state.x)*32,hy=(heroVisual?.y??state.y)*32;heroShadow(c,hx,hy);hero(c,hx,hy,state.facing,heroVisual?heroVisual.phase:0);facingAccent(c,hx,hy,state.facing);
}
