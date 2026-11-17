import test from 'node:test';
import assert from 'node:assert/strict';
import {maps} from '../src/maps.js';
import {yardBabyPokemon,yardBabyRoutes,yardBabyPosition,BABY_WALK_FRAMES,BABY_REST_FRAMES,yardBabies} from '../src/yard-biome-art.js';
const map=maps.yard;
const ctx=()=>({fillStyle:'',ops:[],fillRect(x,y,w,h){this.ops.push([x,y,w,h,this.fillStyle])}});
test('dev742 routes are closed, safe and restricted to their habitat',()=>{
 for(const actor of yardBabyPokemon){const path=yardBabyRoutes[actor.id];assert.deepEqual(path[0],path.at(-1));
  for(let i=0;i<path.length;i++){const [x,y]=path[i];assert.ok(!map.walls.has(`${x},${y}`));assert.ok(!map.portals.some(p=>p.x===x&&p.y===y));
   if(actor.zone==='pasture')assert.ok(x>=10&&x<=13&&y>=5&&y<=7);else assert.ok(x>=5&&x<=6&&y>=8&&y<=9);
   if(i)assert.equal(Math.abs(x-path[i-1][0])+Math.abs(y-path[i-1][1]),1);
  }
 }
});
test('dev742 positions remain inside habitats for 1000 frames',()=>{
 for(const a of yardBabyPokemon)for(let f=0;f<1000;f++){
  const p=yardBabyPosition(a,f);assert.ok(Number.isFinite(p.x)&&Number.isFinite(p.y));
  if(a.zone==='pasture'){assert.ok(p.x>=10&&p.x<=13);assert.ok(p.y>=4&&p.y<=6)}else{assert.ok(p.x>=5&&p.x<=6);assert.ok(p.y>=8&&p.y<=9)}
 }
});
test('dev742 movement advances without player input and pauses at each waypoint',()=>{
 const a=yardBabyPokemon[0],f=0;
 const first=yardBabyPosition(a,f),next=yardBabyPosition(a,f+4);
 assert.notDeepEqual([first.x,first.y],[next.x,next.y]);
 const paused=yardBabyPosition(a,BABY_WALK_FRAMES+3);assert.equal(paused.moving,false);
 assert.deepEqual([paused.x,paused.y],[6,8]);
});
test('dev742 movement loops deterministically and supports negative frame values',()=>{
 for(const a of yardBabyPokemon){const period=(yardBabyRoutes[a.id].length-1)*(BABY_WALK_FRAMES+BABY_REST_FRAMES);
  for(const f of [-100,0,1,50,300])assert.deepEqual(yardBabyPosition(a,f),yardBabyPosition(a,f+period));
 }
});
test('dev742 animated render remains within map and changes over time',()=>{
 const a=ctx(),b=ctx();yardBabies(a,0);yardBabies(b,7);assert.notDeepEqual(a.ops,b.ops);
 for(const op of [...a.ops,...b.ops])assert.ok(op[0]>=0&&op[1]>=0&&op[0]<map.w*32&&op[1]<map.h*32);
});
