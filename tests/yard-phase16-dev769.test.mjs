import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {YARD_ASSETS,drawYardProp,drawYardFenceSprite} from '../src/yard-sprite-assets.js';
const png=readFileSync(new URL('../'+YARD_ASSETS.props,import.meta.url));
test('dev769: transparent prop atlas has 8 by 4 native 32px cells',()=>{assert.equal(png.readUInt32BE(16),256);assert.equal(png.readUInt32BE(20),128);assert.equal(png.toString('ascii',1,4),'PNG')});
test('dev769: invalid atlas indices never render',()=>{let calls=0;const ctx={drawImage(){calls++}};assert.equal(drawYardProp(ctx,-1,2,3),false);assert.equal(drawYardProp(ctx,32,2,3),false);assert.equal(drawYardProp(ctx,2.5,2,3),false);assert.equal(calls,0)});
test('dev769: props safely fall back without browser Image',()=>{assert.equal(drawYardProp({drawImage(){}},2,3,4),false);assert.equal(drawYardFenceSprite({drawImage(){}},3,4),false)});
test('dev769: rendering uses PNG fence and garden with canvas fallback',()=>{const s=readFileSync(new URL('../src/art.js',import.meta.url),'utf8');assert.match(s,/drawYardFenceSprite\(c,x,4\)/);assert.match(s,/drawYardProp\(c,7,x,y\)/);assert.match(s,/drawYardSpriteBuildings\(c\)/)});
