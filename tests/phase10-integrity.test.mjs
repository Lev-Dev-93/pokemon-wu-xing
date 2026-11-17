import test from 'node:test';
import assert from 'node:assert/strict';
import {maps} from '../src/maps.js';
import {currentLayout,exportLayout,inspectImportedLayout,editLayout,undoLayout,redoLayout,saveLayout,loadLayout,resetLayout,importLayout} from '../src/layout-runtime.js';

const snapshot=()=>JSON.parse(exportLayout());
const restore=()=>{const result=resetLayout();assert.equal(result.ok,true,JSON.stringify(result.errors))};
test('Phase 10: all supported layouts have map bounds and valid baseline',()=>{
 const data=snapshot();assert.equal(inspectImportedLayout(JSON.stringify(data)).ok,true);
 for(const [mapId,items] of Object.entries(data.layout)){
  assert.ok(maps[mapId],mapId);
  for(const o of items){assert.ok(o.x>=0&&o.y>=0&&o.x+o.w<=maps[mapId].w&&o.y+o.h<=maps[mapId].h,o.id)}
 }
});
test('Phase 10: reject door destination tampering',()=>{
 const data=snapshot();data.layout.village[0].door.target='chapel';
 assert.equal(inspectImportedLayout(JSON.stringify(data)).ok,false);
});
test('Phase 10: reject removal of story entrance',()=>{
 const data=snapshot();data.layout.village.splice(0,1);
 assert.equal(inspectImportedLayout(JSON.stringify(data)).ok,false);
});
test('Phase 10: reject deletion of story furniture',()=>{
 assert.equal(editLayout('remove','bedroom','player-bed').ok,false);
 assert.equal(editLayout('remove','ground','pokemon-pc').ok,false);
});
test('Phase 10: move entrance updates return portal and undo restores it',()=>{
 restore();const before=maps.village_home.portals.filter(p=>p.target==='village').map(p=>({...p}));
 const moved=editLayout('move','village','village-west-home',4,3);assert.equal(moved.ok,true,JSON.stringify(moved.errors));
 const exit=maps.village_home.portals.find(p=>p.target==='village');assert.ok(exit);assert.equal(exit.tx,5);assert.equal(exit.ty,6);
 assert.equal(undoLayout().ok,true);const restored=maps.village_home.portals.filter(p=>p.target==='village');assert.deepEqual(restored,before);
 assert.equal(redoLayout().ok,true);assert.equal(maps.village_home.portals.find(p=>p.target==='village').tx,5);
 restore();
});
test('Phase 10: saving and reloading preserves valid coordinates',()=>{
 restore();const values=new Map();const store={getItem:key=>values.get(key)??null,setItem:(key,val)=>values.set(key,val)};
 const moved=editLayout('move','bedroom','player-desk',6,1);assert.equal(moved.ok,true);
 assert.equal(saveLayout(store),true);assert.equal(resetLayout().ok,true);
 assert.equal(loadLayout(store).ok,true);
 assert.equal(currentLayout().bedroom.find(o=>o.id==='player-desk').x,6);
 restore();
});
test('Phase 10: player cannot be trapped by new furniture',()=>{
 restore();const result=editLayout('move','bedroom','player-desk',6,1,'desk',{mapId:'bedroom',x:6,y:1});
 assert.equal(result.ok,false);
 restore();
});
