import test from 'node:test';
import assert from 'node:assert/strict';
import {drawBattleSprite,HANDCRAFTED_SPECIES} from '../src/battle-sprite-art.js';
function render(id,back){const ops=[];const canvas={getContext:()=>({clearRect(){},fillRect(...a){ops.push(a)},set fillStyle(v){}})};assert.equal(drawBattleSprite(canvas,id,back),true);return ops;}
test('Phase 4 artwork uses finer 1px detailing',()=>{for(const id of HANDCRAFTED_SPECIES){const front=render(id,false),rear=render(id,true);assert.ok(front.some(a=>a[2]===1||a[3]===1),`missing 1px accents for ${id}`);assert.notDeepEqual(front,rear,`rear view identical for ${id}`);for(const a of [...front,...rear])assert.ok(a[0]>=0&&a[1]>=0&&a[0]+a[2]<=48&&a[1]+a[3]<=48,`${id} out of bounds`);}});
