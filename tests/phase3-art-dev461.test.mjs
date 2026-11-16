import test from 'node:test';
import assert from 'node:assert/strict';
import {spriteDescriptor,drawBattleSprite,HANDCRAFTED_SPECIES} from '../src/battle-sprite-art.js';
test('curated early-game species have authored art',()=>{for(const id of [1,4,7,10,13,16,25,133,359])assert.equal(spriteDescriptor(id).handcrafted,true);assert.equal(spriteDescriptor(493).handcrafted,false);});
test('curated front and back sprites render within 48px bounds',()=>{for(const id of HANDCRAFTED_SPECIES){for(const back of [false,true]){const calls=[];const canvas={getContext:()=>({clearRect(){},fillRect(...args){calls.push(args)},set fillStyle(v){}})};assert.equal(drawBattleSprite(canvas,id,back),true);assert.ok(calls.length>20);for(const [x,y,w,h] of calls){assert.ok(x>=0&&y>=0&&x+w<=48&&y+h<=48,`${id}: ${x},${y}`)}}}});
test('invalid IDs are rejected and fallback still renders',()=>{assert.equal(spriteDescriptor(0),null);assert.equal(spriteDescriptor(2.5),null);const canvas={getContext:()=>({clearRect(){},fillRect(){},set fillStyle(v){}})};assert.equal(drawBattleSprite(canvas,493),true);});
