import test from 'node:test';
import assert from 'node:assert/strict';
import {validatePortalSafety,validateActors,validatePortalDestinations} from '../src/world-validation.js';
import {maps,npcs} from '../src/maps.js';
import {reachableMaps} from '../src/world-integrity.js';

test('dev.707: doppelte Portalquellen werden erkannt',()=>{const w={a:{w:3,h:3,portals:[{x:1,y:1,target:'b',tx:0,ty:0},{x:1,y:1,target:'b',tx:1,ty:0}]},b:{w:3,h:3,portals:[]}};assert.equal(validatePortalSafety(w).length,1);});
test('dev.707: Ankunft auf NPC wird erkannt',()=>{const w={a:{w:3,h:3,portals:[{x:1,y:1,target:'b',tx:1,ty:1}]},b:{w:3,h:3,portals:[]}};assert.equal(validatePortalSafety(w,{b:[{x:1,y:1}]}).length,1);});
test('dev.707: NPC-Überlappungen werden erkannt',()=>{const w={a:{w:3,h:3,walls:new Set()}};assert.equal(validateActors(w,{a:[{x:1,y:1},{x:1,y:1}]}).length,1);});
test('dev.707: ungültige Zielkartengröße wird abgelehnt',()=>{const w={a:{w:3,h:3,portals:[{x:1,y:1,target:'b',tx:0,ty:0}]},b:{w:undefined,h:3,portals:[]}};assert.equal(validatePortalDestinations(w).length,1);});
test('dev.707: bestehende Karten ohne neue Portal-Sicherheitsprobleme',()=>assert.deepEqual(validatePortalSafety(maps,npcs),[]));
test('dev.707: Erreichbarkeitsanalyse enthält nur bekannte Karten',()=>assert.deepEqual([...reachableMaps()].sort(),Object.keys(maps).sort()));
