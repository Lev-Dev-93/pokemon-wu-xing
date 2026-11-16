import test from 'node:test';
import assert from 'node:assert/strict';
import {bagEntries} from '../src/bag.js';
test('dev.357: Beutel: beschädigte Inventareinträge ohne Absturz ausblenden',()=>{
assert.deepEqual(bagEntries(null),[]);assert.deepEqual(bagEntries([null,{id:'potion',quantity:2},{id:'',quantity:2},{id:'potion',quantity:Infinity}]).map(x=>x.id),['potion']);
});
