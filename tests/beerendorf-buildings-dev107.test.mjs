import test from 'node:test';
import assert from 'node:assert/strict';
import {maps,objects,canMove} from '../src/maps.js';
test('Beerendorf Gebäude dev.107',()=>{for(const id of ['beerendorf_werkstatt','beerendorf_haus','beerendorf_haus2']){const entrance=maps.beerendorf.portals.find(p=>p.target===id);assert.ok(entrance);assert.ok(canMove(maps.beerendorf,entrance.x,entrance.y+1,entrance.x,entrance.y));const exit=maps[id].portals[0];assert.equal(exit.target,'beerendorf');assert.ok(canMove(maps[id],exit.x,exit.y-1,exit.x,exit.y));}});
