import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {START_HOME_FURNISHINGS,INTERIOR_ATLAS,drawInteriorFurnishing} from '../src/interior-sprite-assets.js';
import {maps} from '../src/maps.js';
test('start house furnishings remain within map boundaries',()=>{for(const [id,placements] of Object.entries(START_HOME_FURNISHINGS))for(const [index,x,y] of placements){assert.ok(index>=0&&index<8);assert.ok(x>=0&&x<maps[id].w);assert.ok(y>=0&&y<maps[id].h)}});
test('interior sprite atlas is a real PNG',()=>{assert.equal(readFileSync(new URL('../'+INTERIOR_ATLAS,import.meta.url)).subarray(0,8).toString('hex'),'89504e470d0a1a0a')});
test('node renderer gracefully falls back without Image',()=>{assert.equal(drawInteriorFurnishing({drawImage(){}},0,1,1),false)});
