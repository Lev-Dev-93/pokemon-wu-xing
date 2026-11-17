import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {drawYardSpriteBuildings,drawYardTerrainTile,drawYardProp} from '../src/yard-sprite-assets.js';
const art=readFileSync(new URL('../src/art.js',import.meta.url),'utf8');
test('PNG buildings render as primary layer and legacy buildings are fallback only',()=>{
 assert.match(art,/drawYard\(c,map,\{buildings:!drawYardSpriteBuildings\(c\)\}\)/);
 assert.match(art,/function drawYard\(c,map,\{buildings=true\}=\{\}\)\{\s*if\(buildings\)\{/);
 assert.doesNotMatch(art,/drawYardSpriteBuildings\(c\);yardWater/);
});
test('pasture uses PNG grass where available and retains fallback',()=>{
 assert.match(art,/if\(drawYardTerrainTile\(c,x,y,'grass'\)\)continue/);
 assert.match(art,/R\(c,X,Y,T,T,'#85ad72'\)/);
});
test('asset rendering remains safe in headless tests',()=>{
 const ctx={drawImage(){throw Error('should not draw without Image')}};
 assert.equal(drawYardSpriteBuildings(ctx),false);
 assert.equal(drawYardTerrainTile(ctx,1,1),false);
 assert.equal(drawYardProp(ctx,1,1,1),false);
});
