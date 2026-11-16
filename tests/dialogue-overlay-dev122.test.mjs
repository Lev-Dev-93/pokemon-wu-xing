import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('Dialogbox ist innerhalb der Spielfenster-Umrandung',()=>{const frame=html.indexOf('id="game-frame"'),dialog=html.indexOf('id="dialogue"'),end=html.indexOf('</div>',frame);assert.ok(frame<dialog&&dialog<end)});
test('Dialogbox liegt über der Welt und bleibt im Vollbild sichtbar',()=>{assert.match(html,/\.game-frame>\.dialogue\{position:absolute/);assert.match(html,/z-index:5/)});
