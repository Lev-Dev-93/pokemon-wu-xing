import test from 'node:test';
import assert from 'node:assert/strict';
import {gridCellFromPointer,objectAtCell} from '../src/visual-layout-editor.js';
test('Rasterpositionen berücksichtigen die skalierte Darstellung',()=>{
 const rect={left:10,top:20,width:240,height:120};
 assert.deepEqual(gridCellFromPointer(130,80,rect,480,240,20,10),{x:10,y:5});
 assert.equal(gridCellFromPointer(250,80,rect,480,240,20,10),null);
 assert.equal(gridCellFromPointer(9,80,rect,480,240,20,10),null);
});
test('Objektauswahl beachtet Grundfläche und oberste Zeichenreihenfolge',()=>{
 const items=[{id:'haus',x:2,y:3,w:3,h:2},{id:'topf',x:4,y:4,w:1,h:1}];
 assert.equal(objectAtCell(items,2,3)?.id,'haus');
 assert.equal(objectAtCell(items,4,4)?.id,'topf');
 assert.equal(objectAtCell(items,0,0),null);
});
