import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {YARD_ASSETS} from '../src/yard-sprite-assets.js';
const png=(key)=>readFileSync(new URL('../'+YARD_ASSETS[key],import.meta.url));
const dimensions=(buf)=>[buf.readUInt32BE(16),buf.readUInt32BE(20)];
test('dev768: terrain atlas preserves 8x4 tile grid',()=>assert.deepEqual(dimensions(png('terrain')),[256,128]));
test('dev768: building PNGs match collision grid dimensions',()=>{assert.deepEqual(dimensions(png('home')),[224,64]);assert.deepEqual(dimensions(png('barn')),[160,64])});
test('dev768: prop atlas expanded to 8x4',()=>assert.deepEqual(dimensions(png('props')),[256,128]));
test('dev768: legacy yard path cannot overwrite successfully loaded path PNG',()=>{
 const art=readFileSync(new URL('../src/art.js',import.meta.url),'utf8');
 assert.match(art,/!drawYardTerrainTile\(c,7,y,'path'\)/);
 assert.match(art,/!drawYardTerrainTile\(c,x,10,'path'\)/);
});
