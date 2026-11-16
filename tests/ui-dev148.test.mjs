import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
const js=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
test('UI dev.148',()=>{assert.match(html, /<section id="battle-panel"/); assert.ok(html.indexOf('id="battle-panel"') < html.indexOf('id="journal"')); assert.match(html,/game-frame>\.battle-panel/);});
