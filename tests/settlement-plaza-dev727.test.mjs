import test from 'node:test';
import assert from 'node:assert/strict';
import {settlementPlazaPixels} from '../src/settlement-plaza-art.js';
const map={id:'village',w:5,h:5,walls:new Set(['0,0']),portals:[{x:1,y:1}]};
const path=(_,x,y)=>x>=1&&x<=3&&y>=1&&y<=3;
test('plaza art is deterministic and has visible crossroads',()=>{
 const a=settlementPlazaPixels(map,path);
 assert.deepEqual(a,settlementPlazaPixels(map,path));
 assert.ok(a.some(p=>p.cellX===2&&p.cellY===2));
});
test('plaza art never draws outside its own tile',()=>{
 for(const p of settlementPlazaPixels(map,path)){
  assert.ok(p.x>=p.cellX*32&&p.y>=p.cellY*32);
  assert.ok(p.x+p.w<=(p.cellX+1)*32&&p.y+p.h<=(p.cellY+1)*32);
 }
});
test('plaza art leaves portal and walls clear',()=>{
 const a=settlementPlazaPixels(map,path);
 assert.ok(!a.some(p=>p.cellX===1&&p.cellY===1));
 assert.ok(!a.some(p=>p.cellX===0&&p.cellY===0));
});
test('plaza art does not modify map data',()=>{
 const before=[...map.walls],portal=JSON.stringify(map.portals);
 settlementPlazaPixels(map,path);
 assert.deepEqual([...map.walls],before);assert.equal(JSON.stringify(map.portals),portal);
});
test('plaza art is disabled on other maps and invalid input',()=>{
 assert.deepEqual(settlementPlazaPixels({...map,id:'route1'},path),[]);
 assert.deepEqual(settlementPlazaPixels(null,path),[]);
});
test('yard uses its actual walkway independently of the supplied path callback',()=>{
 const yard={id:'yard',w:15,h:15,walls:new Set(),portals:[]};
 const a=settlementPlazaPixels(yard,()=>false);
 assert.ok(a.length>0);
 assert.ok(a.every(p=>p.cellX===7&&p.cellY>=2||p.cellY===10&&p.cellX>=4&&p.cellX<=10));
});
