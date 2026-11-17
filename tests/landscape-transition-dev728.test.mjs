import test from 'node:test';
import assert from 'node:assert/strict';
import {landscapeTransitionPixels} from '../src/landscape-transition-art.js';
const mk=(id='village')=>({id,w:7,h:7,walls:new Set(['0,0','4,4']),portals:[{x:1,y:1}]});
const path=(_,x,y)=>x===3||y===3;
test('vegetation transitions are deterministic and visible next to paths',()=>{
 const m=mk();const a=landscapeTransitionPixels(m,path);
 assert.ok(a.length>0);assert.deepEqual(a,landscapeTransitionPixels(m,path));
});
test('every pixel remains strictly inside its grass cell',()=>{
 for(const p of landscapeTransitionPixels(mk(),path)){
  assert.ok(p.x>=p.cellX*32&&p.x+p.w<=(p.cellX+1)*32);
  assert.ok(p.y>=p.cellY*32&&p.y+p.h<=(p.cellY+1)*32);
  assert.ok(!path('',p.cellX,p.cellY));
 }
});
test('portals and blocked cells are never decorated',()=>{
 const a=landscapeTransitionPixels(mk(),path);
 assert.ok(!a.some(p=>p.cellX===1&&p.cellY===1));
 assert.ok(!a.some(p=>p.cellX===4&&p.cellY===4));
});
test('only grass directly adjacent to a path is decorated',()=>{
 const a=landscapeTransitionPixels(mk(),path);
 assert.ok(a.every(p=>[[0,-1],[0,1],[-1,0],[1,0]].some(([dx,dy])=>path('',p.cellX+dx,p.cellY+dy))));
});
test('unknown maps and malformed input do not produce decorations',()=>{
 assert.deepEqual(landscapeTransitionPixels(mk('bedroom'),path),[]);
 assert.deepEqual(landscapeTransitionPixels(null,path),[]);
 assert.deepEqual(landscapeTransitionPixels(mk(),null),[]);
});
test('rendering never mutates the world',()=>{
 const m=mk();const before=JSON.stringify({walls:[...m.walls],portals:m.portals});
 landscapeTransitionPixels(m,path);
 assert.equal(JSON.stringify({walls:[...m.walls],portals:m.portals}),before);
});
test('yard uses actual yard paths even with a false callback',()=>{
 const m={...mk('yard'),w:15,h:15};const a=landscapeTransitionPixels(m,()=>false);
 assert.ok(a.length>0);
 assert.ok(a.every(p=>!(p.cellX===7&&p.cellY>=2||p.cellY===10&&p.cellX>=4&&p.cellX<=10)));
});
test('regional palettes differ',()=>{
 const colors=['village','beerendorf','professor_clearing','yard'].map(id=>new Set(landscapeTransitionPixels(mk(id),path).map(p=>p.color)));
 assert.equal(colors.length,4);
 assert.notDeepEqual([...colors[0]],[...colors[1]]);
});
