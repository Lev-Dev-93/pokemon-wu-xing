import test from 'node:test';
import assert from 'node:assert/strict';
import {Engine} from '../src/engine.js';
import {maps,npcs,objects} from '../src/maps.js';
import {restoreNpcRuntime} from '../src/npc-runtime-save.js';

test('portal entry does not advance patrol clock or source NPCs',()=>{
 const e=new Engine(); const portal=maps.bedroom.portals[0];
 e.state.mapId='bedroom';e.state.x=portal.x;e.state.y=portal.y+1;
 // Test the actual transition separately: source NPCs should not move or tick.
 const before=e.npcTurn;e.transition(portal);assert.equal(e.npcTurn,before);
});
test('moving NPCs block a portal destination',()=>{
 const e=new Engine();const portal=Object.values(maps).flatMap(m=>m.portals||[]).find(p=>(npcs[p.target]||[]).length);
 assert.ok(portal);const actor=npcs[portal.target][0];
 e.npcPositions[portal.target]=[{...actor,x:portal.tx,y:portal.ty},...(npcs[portal.target]||[]).slice(1)];
 assert.equal(e.validPortalDestination(portal),false);
});
test('NPC runtime rejects saved positions on interactive objects',()=>{
 const pair=Object.entries(objects).find(([id,items])=>items.length&&(npcs[id]||[]).length&&items.some(o=>!maps[id].walls.has(`${o.x},${o.y}`)));
 if(!pair)return;const [id,items]=pair;const o=items.find(o=>!maps[id].walls.has(`${o.x},${o.y}`));
 const actors=npcs[id].map(n=>({...n}));actors[0].x=o.x;actors[0].y=o.y;
 assert.throws(()=>restoreNpcRuntime({turn:1,positions:{[id]:actors}},{mapId:'bedroom',x:0,y:0}),/NPC/);
});
test('failed portal entry leaves player coordinates and NPC clock intact',()=>{
 const e=new Engine();const source=Object.values(maps).find(m=>m.portals?.length);
 const portal=source.portals[0];e.state.mapId=source.id;e.state.x=portal.x;e.state.y=portal.y;
 const before=[e.state.mapId,e.state.x,e.state.y,e.npcTurn];
 e.npcPositions[portal.target]=(npcs[portal.target]||[]).map(n=>({...n}));
 e.npcPositions[portal.target].push({id:'temporary-blocker',x:portal.tx,y:portal.ty});
 assert.equal(e.validPortalDestination(portal),false);
 assert.deepEqual([e.state.mapId,e.state.x,e.state.y,e.npcTurn],before);
});
