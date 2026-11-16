import test from 'node:test';import assert from 'node:assert/strict';import {auditRiftItinerary} from '../src/story-itinerary.js';
test('Alle drei Einstiegskarten erlauben den Lauf zum Dorfplatz',()=>assert.ok(auditRiftItinerary().every(x=>x.valid)));
