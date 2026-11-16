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
function wallBlock(c,x,y){R(c,x,y,32,32,'#79644f');R(c,x+2,y+2,28,26,'#a18a6a');R(c,x+3,y+4,26,2,'#d4b795');R(c,x+2,y+27,28,4,'#624e41')}
function hero(c,x,y,facing,steps){const walk=steps%2===0?0:2;R(c,x+10,y+26,6,4-walk,'#3b3b48');R(c,x+19,y+26-walk,6,4+walk,'#3b3b48');R(c,x+9,y+16,18,12,'#426e85');R(c,x+10,y+18,3,9,'#e0a77e');R(c,x+24,y+18,3,9,'#e0a77e');R(c,x+10,y+7,16,12,'#eebf96');R(c,x+8,y+4,20,8,'#513a33');R(c,x+11,y+2,14,4,'#715043');R(c,x+13,y+17,10,3,'#d5a980');if(facing==='down'){R(c,x+13,y+13,2,2,'#322d30');R(c,x+21,y+13,2,2,'#322d30')}if(facing==='left')R(c,x+10,y+13,2,2,'#322d30');if(facing==='right')R(c,x+24,y+13,2,2,'#322d30');if(facing==='up'){R(c,x+12,y+9,13,8,'#614b3f');R(c,x+14,y+18,9,8,'#a97c5e')}}
function drawBedroom(c){bed(c,32,32);desk(c,224,32);dresser(c,128,0);carpet(c,96,128,64,64);pot(c,258,104);window(c,5*32,0);shelf(c,7,4*32);door(c,5*32,7*32)}
function drawUpper(c){carpet(c,4*32,3*32,4*32,3*32,'#8b7769');sofa(c,32,32);dresser(c,9*32,32);window(c,5*32,0);pot(c,10*32,3*32);shelf(c,32,5*32);door(c,5*32,32);stairs(c,10*32,7*32)}
function drawGround(c){carpet(c,4*32,3*32,3*32,3*32,'#8d665c');sofa(c,32,32);counter(c,8*32,32);table(c,4*32,4*32);shelf(c,2*32,5*32);shelf(c,3*32,5*32);pot(c,10*32,5*32);window(c,5*32,0);stairs(c,10*32,32);door(c,5*32,8*32)}
function drawYard(c,map){const W=map.w*32; // farmhouse silhouette, top edge, and gardens: only map.walls block movement
for(let x=1;x<=6;x++)roof(c,x*32,0);
for(let x=1;x<=6;x++){wallBlock(c,x*32,32);if(x===3||x===5)window(c,x*32,32)}
// doorway is the existing portal at (7,1); leave its approach walkable
R(c,7*32+4,32+4,24,25,'#6a4b39');R(c,7*32+7,32+6,18,22,'#3f5961');
for(let y=2;y<10;y++)path(c,7*32,y*32,y);
for(let x=4;x<11;x++)path(c,x*32,10*32,x);
for(let x=11;x<=13;x++)for(let y=4;y<=5;y++)fence(c,x*32,y*32);
for(let x=2;x<=4;x++)for(let y=3;y<=3;y++){R(c,x*32,y*32,32,32,'#6d9c60');flower(c,x*32,y*32)}
for(const [x,y] of [[2,7],[3,8],[4,7],[12,8],[13,9],[14,7]])flower(c,x*32,y*32);
for(const [x,y] of [[1,9],[14,2],[2,10]])pot(c,x*32,y*32);
for(let x=8;x<=10;x++)for(let y=8;y<=9;y++){R(c,x*32,y*32,32,32,'#b29c76');R(c,x*32,y*32+1,32,2,'#e0c69c')}
stairs(c,7*32,8*32);stairs(c,7*32,9*32);
// original fence on outer sides, not collision-bearing: visual boundary only
for(let y=3;y<11;y++){fence(c,0,y*32);fence(c,W-32,y*32)}
}
function drawVillage(c,map){
 const W=map.w,H=map.h;
 // Original hand-drawn pixel architecture. All walls match the data map.
 for(const [x,y,w,h,col] of [[2,2,4,2,'#aa7154'],[15,2,4,2,'#667d90'],[3,10,3,2,'#a78d5b'],[16,10,3,2,'#8a6b8f']]){
  for(let yy=y;yy<y+h;yy++)for(let xx=x;xx<x+w;xx++){wallBlock(c,xx*T,yy*T);if(yy===y)roof(c,xx*T,yy*T)}
  R(c,(x+1)*T,(y+h-1)*T+8,20,20,col);R(c,(x+1)*T+4,(y+h-1)*T+11,12,15,'#3b3e44');
 }
 for(const [x,y] of [[1,5],[5,7],[19,7],[2,13],[20,13],[12,12],[7,13]])pot(c,x*T,y*T);
 for(const [x,y] of [[6,3],[7,4],[14,4],[20,5],[6,12],[13,13],[20,11]])flower(c,x*T,y*T);
 for(let x=0;x<W;x++){if(x!==10)fence(c,x*T,0);if(x<8||x>13)fence(c,x*T,(H-1)*T)}
 // Doorways at (6,3) and (19,3) are traversable, with collision walls beside them.
 for(const [x,y] of [[6,3],[19,3]]){door(c,x*T,y*T);R(c,x*T+7,y*T+26,18,4,'#e4c88f')}
 // Route 1 opens at the southern edge.
R(c,10*T+4,(H-1)*T+8,24,18,'#cbb58a');
// Mark the northern portal clearly; this tile stays traversable.
 R(c,10*T+4,0,24,9,'#b5a07c');R(c,10*T+7,0,18,4,'#e9d6a7');
}
function drawRoute1(c,map){for(let y=2;y<map.h;y++){for(let x=6;x<=9;x++)path(c,x*T,y*T,x+y*map.w)}for(const [x,y] of [[1,2],[3,8],[12,3],[14,10],[2,15],[13,16]]){pot(c,x*T,y*T);flower(c,(x+1)*T,y*T)}for(const [x,y] of [[2,4],[3,4],[12,6],[13,6],[4,12],[5,12],[11,14],[12,14]]){R(c,x*T,y*T,32,32,'#3c704a');R(c,x*T+6,y*T+3,20,25,'#5e985a')}R(c,7*T,0,32,9,'#e2c99c')}
function drawInterior(c,id){carpet(c,3*T,3*T,5*T,3*T,id==='study'?'#607d87':'#9b775b');window(c,5*T,0);shelf(c,2*T,4*T);shelf(c,3*T,4*T);desk(c,7*T,2*T);pot(c,9*T,5*T);door(c,5*T,7*T);if(id==='village_home'){sofa(c,T,T);table(c,4*T,4*T)}else{desk(c,T,T);shelf(c,8*T,T)}}
function drawNpc(c,x,y,kind){
 const palette={merchant:['#d7aa43','#4e7256'],route1_trainer:['#df624f','#376caa'],route1_guide:['#6fa88e','#5b6e54'],route1_naturalist:['#86a16e','#b3a179'],route2_guide:['#ba9466','#607e5d'],route2_botanist:['#71a67a','#d4c293'],route2_hiker:['#b68e62','#685f4e'],route1_guide:['#6fa88e','#5b6e54'],route1_naturalist:['#86a16e','#b3a179'],route2_guide:['#ba9466','#607e5d'],route2_botanist:['#71a67a','#d4c293'],route2_hiker:['#b68e62','#685f4e'],route1_guide:['#6fa88e','#5b6e54'],route1_naturalist:['#86a16e','#b3a179'],route2_guide:['#ba9466','#607e5d'],route2_botanist:['#71a67a','#d4c293'],route2_hiker:['#b68e62','#685f4e'],resident:['#9a70b0','#e2bd80'],breeder_a:['#b87558','#668a65'],breeder_b:['#718ca8','#9a7757'],villager:['#c17f69','#6b965c'],rival:['#6c7cb1','#c0a17d'],professor:['#e9e8db','#e9e8db']};
 const [shirt,hat]=palette[kind]||['#8aa58c','#a17c61'];const X=x*T,Y=y*T;
 R(c,X+7,Y+27,19,4,'#51463c');R(c,X+9,Y+17,6,11,'#4b4854');R(c,X+19,Y+17,6,11,'#4b4854');
 R(c,X+7,Y+13,19,11,shirt);R(c,X+5,Y+15,4,9,'#d6a17e');R(c,X+25,Y+15,4,9,'#d6a17e');
 R(c,X+10,Y+5,14,12,'#efbd93');R(c,X+9,Y+3,16,6,hat);R(c,X+13,Y+11,2,2,'#342c32');R(c,X+20,Y+11,2,2,'#342c32');
 if(kind==='merchant'){R(c,X+4,Y+2,24,4,'#dcb54b');R(c,X+10,Y,12,4,'#dcb54b');R(c,X+13,Y+18,7,5,'#f7db8c')}
 if(kind==='route1_trainer'){R(c,X+6,Y+3,20,4,'#e35648');R(c,X+22,Y+4,8,3,'#e35648');R(c,X+14,Y+17,6,6,'#fff4de')}
 if(kind==='professor'){R(c,X+8,Y+17,4,12,'#f7f4e9');R(c,X+23,Y+17,4,12,'#f7f4e9')}
}
function drawTag(c,x,y,label){if(typeof c.fillText!=='function'||typeof c.measureText!=='function')return;c.save();c.font='bold 10px sans-serif';const w=Math.ceil(c.measureText(label).width)+10;const px=Math.max(0,Math.round(x*T+16-w/2)),py=Math.max(0,y*T-14);R(c,px,py,w,13,'#252d2b');R(c,px+1,py+1,w-2,11,'#f4e6b5');c.fillStyle='#252d2b';c.fillText(label,px+5,py+10);c.restore()}
export function drawScene(c,map,state){c.imageSmoothingEnabled=false;for(let y=0;y<map.h;y++)for(let x=0;x<map.w;x++){const px=x*T,py=y*T,n=x+y*map.w;if(map.id==='yard'){if(x===7&&y>=2||y===10&&x>=4&&x<=10)path(c,px,py,n);else grass(c,px,py,n)}else if((((map.id==='route1'||map.id==='route2')||map.id==='route2')||map.id==='route2')){if(x>=6&&x<=9)path(c,px,py,n);else grass(c,px,py,n)}else if(map.id==='village'){if((x>=9&&x<=11)||(y===7&&x>=5&&x<=18)||(y>=4&&y<=11&&x>=12&&x<=13))path(c,px,py,n);else grass(c,px,py,n)}else if(map.id==='ground')stone(c,px,py,n);else wood(c,px,py,n);if(!['yard','village','route1','route2'].includes(map.id)&&y===0)wallpaper(c,px,py,n)}
if(map.id==='bedroom')drawBedroom(c);if(map.id==='ground')drawGround(c);if(map.id==='yard')drawYard(c,map);if(map.id==='village')drawVillage(c,map);if(((map.id==='route1'||map.id==='route2')||map.id==='route2')||map.id==='route2')drawRoute1(c,map);if(map.id==='village_home'||map.id==='study')drawInterior(c,map.id);
// Collision layer is always visually indicated, without changing the engine's walls.
for(const cell of map.walls){const [x,y]=cell.split(',').map(Number);if(map.id==='bedroom')continue;if(map.id==='ground'&&((x===1||x===2)&&y===1||(x===8||x===9)&&y===1||(x===2||x===3)&&y===5))continue;if(map.id==='yard'||map.id==='village'||(((map.id==='route1'||map.id==='route2')||map.id==='route2')||map.id==='route2'))continue;wallBlock(c,x*32,y*32)}
if(map.id==='yard'){// raised garden tiles must stay visible above the ground
R(c,8*32,8*32,3*32,2,'#e7c99b')}
if(map.id==='ground'){hero(c,6*32,2*32,'down',0);hero(c,3*32,3*32,'left',0)}
for(const item of objects[map.id]||[]){if(item.id==='pokemon_pc'){R(c,item.x*T+4,item.y*T+3,24,23,'#343c55');R(c,item.x*T+7,item.y*T+6,18,13,'#69c9d2');R(c,item.x*T+11,item.y*T+22,10,5,'#c6cbd2');R(c,item.x*T+7,item.y*T+27,18,3,'#555c6d');drawTag(c,item.x,item.y,'PC')}else if(item.id==='supply_box'){R(c,item.x*T+3,item.y*T+9,26,20,'#8d6135');R(c,item.x*T+3,item.y*T+9,26,5,'#e0b967');R(c,item.x*T+13,item.y*T+10,6,17,'#e8d19a');drawTag(c,item.x,item.y,'TRÄNKE')}else if(item.id==='village_sign'||item.id==='professor_sign'){R(c,item.x*T+7,item.y*T+6,18,20,'#a77a4c');R(c,item.x*T+5,item.y*T+3,22,13,'#e6c990')}}
for(const npc of npcs[map.id]||[]){drawNpc(c,npc.x,npc.y,npc.id);if(npc.id==='merchant')drawTag(c,npc.x,npc.y,'LADEN');if(npc.id==='route1_trainer')drawTag(c,npc.x,npc.y,'TRAINER');}
hero(c,state.x*32,state.y*32,state.facing,state.steps);
}
