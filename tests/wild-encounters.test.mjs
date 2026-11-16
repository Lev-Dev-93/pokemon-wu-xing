import test from 'node:test';
import assert from 'node:assert/strict';
import {rollEncounter,chooseWildPokemon,isTallGrass,tryEscape,ROUTE1_ENCOUNTERS} from '../src/wild-encounters.js';
import {Engine} from '../src/engine.js';
import {createPokemon} from '../src/team.js';
test('Route 1: only grass after hatching with usable team',()=>{const base={mapId:'route1',x:3,y:5,hatched:true,hasUsablePokemon:true,rng:()=>0};assert.ok(isTallGrass(3,6));assert.equal(rollEncounter({...base,mapId:'village'}),null);assert.equal(rollEncounter({...base,hatched:false}),null);assert.equal(rollEncounter({...base,hasUsablePokemon:false}),null);assert.equal(rollEncounter({...base,x:7,y:6}),null);assert.equal(rollEncounter({...base,rng:()=>0.99}),null);assert.equal(rollEncounter(base).speciesId,ROUTE1_ENCOUNTERS[0].speciesId)});
test('wild pokemon are valid level 2-4 and randomized IVs',()=>{const p=chooseWildPokemon(()=>0);assert.equal(p.level,2);assert.equal(p.ivs.length,6);assert.ok(p.currentHp>0)});
test('escape chance rises with attempts',()=>{assert.equal(tryEscape(100,10,2,()=>0.9),true);assert.equal(tryEscape(1,100,0,()=>0.9),false)});
test('older save loads and pending encounter is not persisted',()=>{const e=new Engine();e.pendingWild=createPokemon(10);const raw=e.save();const f=new Engine();f.load(raw);assert.equal(f.pendingWild,null);assert.equal(JSON.parse(raw).schema,8)});
