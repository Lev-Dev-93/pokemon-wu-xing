import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {GROUND_FLOOR_DETAILS,GROUND_FLOOR_DETAIL_ATLAS,drawGroundFloorDetails} from '../src/ground-floor-detail-assets.js';
import {maps,objects} from '../src/maps.js';
test('ground floor details are in bounds and have valid sprite indices',()=>{
 assert.equal(GROUND_FLOOR_DETAIL_ATLAS,'./assets/tilesets/ground_floor_details_32.png');
 for(const [index,x,y] of GROUND_FLOOR_DETAILS){assert.ok(index>=0&&index<16);assert.ok(x>=0&&x<maps.ground.w);assert.ok(y>=0&&y<maps.ground.h)}
});
test('decorations do not add interactions or new doors',()=>{assert.equal(objects.ground.length,0);assert.equal(maps.ground.portals.length,2)});
test('render helper works without browser image constructor',()=>{assert.equal(drawGroundFloorDetails({drawImage(){}}),false)});
test('sprite sheet is a 256x64 RGBA PNG',()=>{const b=readFileSync(new URL('../assets/tilesets/ground_floor_details_32.png',import.meta.url));assert.equal(b.toString('hex',0,8),'89504e470d0a1a0a');assert.equal(b.readUInt32BE(16),256);assert.equal(b.readUInt32BE(20),64)});
