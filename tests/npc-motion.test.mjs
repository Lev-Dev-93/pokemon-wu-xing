import test from 'node:test';
import assert from 'node:assert/strict';
import {captureNpcMotions,npcVisualActors,npcMotionsActive} from '../src/npc-motion.js';
test('NPC walks interpolate without mutating logical coordinates',()=>{
 const old=[{id:'a',x:2,y:3}],now=[{id:'a',x:3,y:3}];
 const motions=captureNpcMotions(old,now,'yard',100);
 const visual=npcVisualActors(now,motions,'yard',160);
 assert.equal(visual[0].x,2.5);assert.equal(now[0].x,3);assert.equal(visual[0].moving,true);
});
test('static actors remain static and do not animate',()=>{
 const a=[{id:'a',x:2,y:3}];const motions=captureNpcMotions(a,a,'yard',100);
 assert.equal(motions.size,0);assert.equal(npcVisualActors(a,motions,'yard',120)[0].moving,false);
});
test('teleports do not interpolate',()=>{
 const motions=captureNpcMotions([{id:'a',x:0,y:0}],[{id:'a',x:5,y:5}],'yard',100);
 assert.equal(motions.size,0);
});
test('reduced motion and expired motion snap to grid',()=>{
 const a=[{id:'a',x:1,y:0}],motions=captureNpcMotions([{id:'a',x:0,y:0}],a,'yard',100);
 assert.equal(npcVisualActors(a,motions,'yard',120,true)[0].x,1);
 assert.equal(npcVisualActors(a,motions,'yard',300)[0].x,1);
 assert.equal(npcMotionsActive(motions,300,'yard'),false);
});
test('unrelated maps never animate actors',()=>{
 const a=[{id:'a',x:1,y:0}],motions=captureNpcMotions([{id:'a',x:0,y:0}],a,'yard',100);
 assert.equal(npcVisualActors(a,motions,'ground',120)[0].x,1);
 assert.equal(npcMotionsActive(motions,120,'ground'),false);
});
