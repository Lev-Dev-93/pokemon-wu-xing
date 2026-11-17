import test from 'node:test';
import assert from 'node:assert/strict';
import {interactionTarget,auditInteractionTargets} from '../src/interaction-targets.js';
import {maps,npcs,objects} from '../src/maps.js';
test('NPC has priority over objects at same interaction coordinate',()=>{
 const npc={id:'person',x:2,y:3},object={id:'chest',x:2,y:3};
 assert.equal(interactionTarget([npc],[object],2,3),npc);
});
test('object is available without NPC',()=>assert.equal(interactionTarget([],[{id:'box',x:1,y:1}],1,1).id,'box'));
test('missing target and invalid coordinates are safe',()=>{
 assert.equal(interactionTarget(null,null,1,1),null);
 assert.equal(interactionTarget([{x:1,y:1}],[],NaN,1),null);
});
test('interaction resolver never changes actor order',()=>{
 const people=[{id:'a',x:1,y:1},{id:'b',x:2,y:2}];
 interactionTarget(people,[],2,2);assert.deepEqual(people.map(p=>p.id),['a','b']);
});
test('audit detects actor overlap',()=>assert.equal(auditInteractionTargets({w:5,h:5},[{id:'a',x:2,y:2}],[{id:'b',x:2,y:2}]).length,1));
test('audit detects off-map and malformed actors',()=>assert.equal(auditInteractionTargets({w:3,h:3},[{id:'a',x:3,y:0},null],[]).length,2));
test('existing maps interaction actors are checked',()=>{
 const report=Object.values(maps).flatMap(map=>auditInteractionTargets(map,npcs[map.id]||[],objects[map.id]||[]).map(issue=>`${map.id}: ${issue}`));
 // Existing overlapping objects are legacy map data, not automatically moved.
 assert.deepEqual(report,[]);
});
