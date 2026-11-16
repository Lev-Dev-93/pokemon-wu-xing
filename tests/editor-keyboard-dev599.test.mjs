import test from 'node:test';
import assert from 'node:assert/strict';
import {keyboardMove} from '../src/editor-keyboard.js';
const obj={x:2,y:3,w:3,h:2};
test('Pfeiltasten bewegen Objekt genau ein Feld',()=>{
 assert.deepEqual(keyboardMove('ArrowLeft',obj,10,10),{x:1,y:3});
 assert.deepEqual(keyboardMove('ArrowRight',obj,10,10),{x:3,y:3});
 assert.deepEqual(keyboardMove('ArrowUp',obj,10,10),{x:2,y:2});
 assert.deepEqual(keyboardMove('ArrowDown',obj,10,10),{x:2,y:4});
});
test('Kartenrand und andere Tasten erzeugen keine Bewegung',()=>{
 assert.equal(keyboardMove('ArrowLeft',{...obj,x:0},10,10),null);
 assert.equal(keyboardMove('ArrowRight',{...obj,x:7},10,10),null);
 assert.equal(keyboardMove('ArrowDown',{...obj,y:8},10,10),null);
 assert.equal(keyboardMove('Enter',obj,10,10),null);
 assert.equal(keyboardMove('ArrowUp',null,10,10),null);
});
