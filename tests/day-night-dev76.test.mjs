import test from 'node:test';
import assert from 'node:assert/strict';
import {timeOfDayAt,currentTimeOfDay} from '../src/day-night.js';
import {Engine} from '../src/engine.js';
import {encounterTable} from '../src/wild-encounters.js';
test('day/night boundary is 06:00 to 19:59',()=>{for(const h of [0,5,20,23])assert.equal(timeOfDayAt(h),'night');for(const h of [6,12,19])assert.equal(timeOfDayAt(h),'day');assert.throws(()=>timeOfDayAt(24));});
test('clock is injectable and uses local hour',()=>{assert.equal(currentTimeOfDay(new Date(2026,0,1,21)),'night');const e=new Engine({clock:()=>new Date(2026,0,1,21),rng:()=>0});assert.equal(e.clock().getHours(),21);assert.notDeepEqual(encounterTable('route1','night'),encounterTable('route1','day'));});
