import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
const main=fs.readFileSync(new URL('../src/main.js',import.meta.url),'utf8');const html=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('team cards include canvas portrait',()=>assert.match(main,/li\.prepend\(createPokemonPortrait\(p\.speciesId/));
test('pokemon detail page includes portrait',()=>assert.match(main,/portrait\.append\(createPokemonPortrait\(p\.speciesId/));
test('battle render updates back view and has fallback',()=>{assert.match(main,/sprite\.dataset\.back/);assert.match(main,/if\(!rendered\)/)});
test('canvas visibility and image rendering are explicitly defined',()=>{assert.match(html,/pokemon-portrait-dev462/);assert.match(html,/visibility:visible!important/)});
