import test from 'node:test';
import assert from 'node:assert/strict';
import {maps} from '../src/maps.js';
import {reachableTiles,auditPortalReachability} from '../src/world-access-audit.js';
test('Außenportale sind über reale Bewegung erreichbar',()=>assert.deepEqual(auditPortalReachability(),[]));
test('BFS respektiert Mauern',()=>{const map={w:3,h:1,walls:new Set(['1,0']),heights:{},stairs:[]};assert.deepEqual([...reachableTiles(map,{x:0,y:0})],['0,0']);});
