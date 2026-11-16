import test from 'node:test';
import assert from 'node:assert/strict';
import {tickWeather} from '../src/battle-weather-cycle.js';
test('336: Wetter ohne Effekt erzeugt kein falsches Ablaufereignis',()=>{const b={weather:null,weatherTurns:3};assert.equal(tickWeather(b),false);assert.equal(b.weatherTurns,0);});
