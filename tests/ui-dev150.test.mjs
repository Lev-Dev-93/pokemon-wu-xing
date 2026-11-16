import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
const js=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
test('UI dev.150',()=>{assert.ok(html.indexOf('id="journal"') < html.indexOf('id="notice"')); assert.match(js,/if\(!battlePanel\.hidden\|\|!starterPanel\.hidden\|\|menuOpen\)return/);});
