import test from 'node:test';
import assert from 'node:assert/strict';
import {Engine} from '../src/engine.js';
import {STORY_EVENT_IDS,eventStatus,nextStoryEvent,validateStoryFlags} from '../src/story-events.js';

test('Ereigniskette ist kanonisch und vollständig',()=>{
 assert.deepEqual(STORY_EVENT_IDS,['birthday_wish_pending','egg_received','rift_closed','rival_absol','professor_demo','route1_hatched']);
 const e=new Engine();assert.equal(nextStoryEvent(e.state.flags),'birthday_wish_pending');
 assert.deepEqual(eventStatus(e.state.flags,'birthday_wish_pending'),{status:'blocked',missing:['spokenToBreederA','spokenToBreederB']});
});
test('Events sind idempotent, protokolliert und strikt geordnet',()=>{
 const e=new Engine();assert.equal(e.completeStoryEvent('rift_closed'),false);
 e.setFlag('spokenToBreederA',true);e.setFlag('spokenToBreederB',true);
 assert.equal(e.completeStoryEvent('birthday_wish_pending'),true);
 assert.equal(e.completeStoryEvent('birthday_wish_pending'),false);
 assert.equal(e.completeStoryEvent('rift_closed'),false);
 assert.equal(e.completeStoryEvent('egg_received'),true);
 assert.equal(e.completeStoryEvent('rift_closed'),true);
 assert.equal(e.completeStoryEvent('rival_absol'),true);
 assert.equal(e.completeStoryEvent('professor_demo'),true);
 assert.equal(e.completeStoryEvent('route1_hatched'),true);
 assert.equal(e.nextStoryEvent,null);assert.equal(validateStoryFlags(e.state.flags),true);
 assert.equal(e.state.eventLog.filter(x=>x.type==='story').length,6);
});
test('Unbekannte Ereignisse und Umgehung per setFlag bleiben gesperrt',()=>{
 const e=new Engine();assert.equal(e.completeStoryEvent('nonsense'),false);
 assert.equal(e.setFlag('rift_closed',true),false);assert.equal(e.state.flags.rift_closed,false);
});
test('Inkonsistente Story-Flags werden beim Laden abgewiesen',()=>{
 const e=new Engine();const raw=JSON.parse(e.save());raw.state.flags.rival_absol=true;
 assert.throws(()=>new Engine().load(JSON.stringify(raw)),/Story-Reihenfolge/);
});
test('Starterwahl verwendet Ereignisfolge und löst keine späteren Szenen aus',()=>{
 const e=new Engine();e.state.mapId='ground';e.state.x=5;e.state.y=5;
 e.setFlag('spokenToBreederA',true);e.setFlag('spokenToBreederB',true);
 assert.equal(e.chooseStarter(1),true);
 assert.equal(e.state.flags.egg_received,true);assert.equal(e.nextStoryEvent,'rift_closed');
 for(const key of ['rift_closed','rival_absol','professor_demo','route1_hatched'])assert.equal(e.state.flags[key],false);
 assert.equal(new Engine().load(e.save()),undefined);
});
