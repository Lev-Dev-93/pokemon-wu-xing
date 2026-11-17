import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const art=readFileSync(new URL('../src/art.js',import.meta.url),'utf8');
test('three settlements use one facade renderer',()=>{
 for(const id of ['village','professor_clearing','beerendorf'])assert.match(art,new RegExp('drawBuildingFacades\\(c,outdoorBuildings\\.'+id+'\\)'));
});
test('furniture is drawn in one common render phase',()=>{
 assert.equal((art.match(/drawLayoutFurniture\(c,map\.id\)/g)||[]).length,1);
 assert.doesNotMatch(art,/drawLayoutFurniture\(c,'bedroom'\)/);
 assert.doesNotMatch(art,/drawLayoutFurniture\(c,'ground'\)/);
});
test('ground floor has no static duplicate player figures',()=>{
 assert.doesNotMatch(art,/hero\(c,6\*32,2\*32/);
 assert.doesNotMatch(art,/hero\(c,3\*32,3\*32/);
});
