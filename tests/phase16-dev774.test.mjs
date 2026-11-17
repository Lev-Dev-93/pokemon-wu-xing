import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const root=new URL('../',import.meta.url);
const read=p=>readFileSync(new URL(p,root));
test('dev774 shadow atlas has expected pixel dimensions',()=>{const b=read('assets/tilesets/yard_building_shadows.png');assert.equal(b.readUInt32BE(16),512);assert.equal(b.readUInt32BE(20),32)});
test('dev774 both building sprites retain original dimensions',()=>{for(const [f,w] of [['zuechterhaus_224x64.png',224],['scheune_160x64.png',160]]){const b=read('assets/buildings/'+f);assert.equal(b.readUInt32BE(16),w);assert.equal(b.readUInt32BE(20),64)}});
test('dev774 renderer draws contact shadows without modifying collision',()=>{const s=read('src/yard-sprite-assets.js').toString();assert.match(s,/buildingShadows/);assert.match(s,/2\*32,2\*32,224,32/);assert.match(s,/10\*32,2\*32,160,32/)});
