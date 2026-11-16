import test from 'node:test';
import assert from 'node:assert/strict';
import {currentLayout,editLayout,undoLayout,redoLayout,historyInfo,exportLayout,importLayout,resetLayout} from '../src/layout-runtime.js';
test('Phase 6: export/import schema and safe invalid import',()=>{
 const baseline=exportLayout();assert.equal(JSON.parse(baseline).schema,1);
 assert.equal(importLayout('{broken').ok,false);
 assert.equal(importLayout(JSON.stringify({schema:1,layout:{unknown:[]}})).ok,false);
 assert.equal(importLayout(JSON.stringify({schema:2,layout:{}})).ok,false);
 assert.deepEqual(JSON.parse(exportLayout()),JSON.parse(baseline));
});
test('Phase 6: undo and redo successful edits, rejects collision',()=>{
 const before=exportLayout();const first=currentLayout().village.find(o=>o.id==='village-west-home');
 const moved=editLayout('move','village',first.id,first.x+1,first.y);assert.equal(moved.ok,true,JSON.stringify(moved.errors));
 assert.equal(historyInfo().undo>0,true);
 assert.equal(undoLayout().ok,true);assert.equal(exportLayout(),before);
 assert.equal(redoLayout().ok,true);
 assert.equal(undoLayout().ok,true);
 assert.equal(importLayout(JSON.stringify({schema:1,layout:{village:[{id:'broken',kind:'building',art:'house',x:-1,y:0,w:1,h:1}]}})).ok,false);
 assert.equal(exportLayout(),before);
});
test('Phase 6: imported valid layout is undoable',()=>{
 const baseline=exportLayout();const layout=JSON.parse(baseline);
 const item=layout.layout.village.find(o=>o.id==='village-west-home');item.x++;item.door.x++;
 assert.equal(importLayout(JSON.stringify(layout)).ok,true);
 assert.equal(undoLayout().ok,true);assert.equal(exportLayout(),baseline);
});
