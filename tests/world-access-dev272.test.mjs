import test from 'node:test';
import assert from 'node:assert/strict';
import {maps} from '../src/maps.js';
import {auditPortalArrivals} from '../src/world-access-audit.js';
test('Alle Außenankünfte sind frei und Rückwege existieren',()=>assert.deepEqual(auditPortalArrivals(),[]));
test('Blockierte Ankunft wird erkannt',()=>{const a={id:'a',w:2,h:2,walls:new Set(),portals:[{x:1,y:0,target:'b',tx:0,ty:0,kind:'path'}]},b={id:'b',w:2,h:2,walls:new Set(['0,0']),portals:[{x:0,y:1,target:'a',tx:1,ty:0,kind:'path'}]};assert.match(auditPortalArrivals({a,b},['a'])[0],/blockiert/);});
