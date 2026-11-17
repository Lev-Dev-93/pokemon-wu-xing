import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {drawStartHomeSurfaces,drawInteriorSurface,INTERIOR_SURFACE_ATLAS} from '../src/interior-surface-assets.js';
test('dev778 interior atlas exists and is PNG',()=>{const p=new URL('../'+INTERIOR_SURFACE_ATLAS,import.meta.url);assert.ok(existsSync(p));assert.equal(readFileSync(p).subarray(1,4).toString(),'PNG')});
test('dev778 surface drawing is safe without browser Image',()=>{assert.equal(drawInteriorSurface({},0,1,1),false);assert.doesNotThrow(()=>drawStartHomeSurfaces({},'bedroom'))});
test('dev778 renderer integrates surfaces before room details',()=>{const src=readFileSync(new URL('../src/art.js',import.meta.url),'utf8');for(const room of ['bedroom','ground','upper'])assert.ok(src.includes(`drawStartHomeSurfaces(c,'${room}')`))});
