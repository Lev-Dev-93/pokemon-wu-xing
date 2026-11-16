import {test} from 'node:test';
import {strict as assert} from 'node:assert';
import {tickWeather} from '../src/battle-weather-cycle.js';
test('dev.332: Abgelaufenes Wetter wird auch bei einem inkonsistenten Wetterzähler bereinigt.',()=>{const b={weather:'rain',weatherTurns:0};assert.equal(tickWeather(b),true);assert.equal(b.weather,null);assert.equal(tickWeather(b),false)});
