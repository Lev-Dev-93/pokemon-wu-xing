import test from 'node:test';import assert from 'node:assert/strict';
import {FURNITURE_ARTS,furnitureBounds,drawFurnitureSprite} from '../src/furniture-art.js';
test('sprite footprint uses layout dimensions',()=>assert.deepEqual(furnitureBounds({x:3,y:4,w:2,h:1}),{x:96,y:128,w:64,h:32}));
test('every furniture art draws without throwing and clips to footprint',()=>{
 for(const art of FURNITURE_ARTS){let clipped=false,draws=0;const ctx={save(){},restore(){},beginPath(){},rect(x,y,w,h){assert.equal(x,32);assert.equal(y,64);assert.equal(w,32);assert.equal(h,32)},clip(){clipped=true},fillRect(x,y,w,h){assert.ok(clipped);assert.ok(w>0&&h>0);draws++},set fillStyle(v){assert.ok(v)}};drawFurnitureSprite(ctx,{x:1,y:2,w:1,h:1,art});assert.ok(draws>0,art)}
});
test('unknown art uses generic sprite',()=>{let n=0;const ctx={save(){},restore(){},beginPath(){},rect(){},clip(){},fillRect(){n++},set fillStyle(v){}};drawFurnitureSprite(ctx,{x:0,y:0,w:2,h:1,art:'custom'});assert.ok(n>0)});
