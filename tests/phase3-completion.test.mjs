import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {attackEffect,battleAccessibilityText} from '../src/battle-effects.js';
const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
test('Attackeneffekte sind in der aktiven Kampfschleife angeschlossen',()=>{
 assert.match(main,/import \{attackEffect,battleAccessibilityText\} from '\.\/battle-effects\.js'/);
 assert.match(main,/showAttackPresentation\(event,previous\)/);
 assert.match(main,/clearAttackPresentation\(\)/);
});
test('Kampfeffekte sind nach Typ verschieden und Fehlschläge bleiben neutral',()=>{
 assert.equal(attackEffect(10).effect,'energy');
 assert.equal(attackEffect(9).effect,'metal');
 assert.equal(attackEffect(8).effect,'shadow');
 assert.equal(attackEffect(1).effect,'impact');
 assert.equal(attackEffect(10,false).effect,'miss');
});
test('Assistive Ausgabe und reduzierte Animation sind eingebunden',()=>{
 assert.match(html,/id="battle-effect-announcement"[^>]*role="status"/);
 assert.match(html,/@media\(prefers-reduced-motion:reduce\)\{\.battle-mon\.battle-hit/);
 assert.match(battleAccessibilityText('player','Tackle',5,20),/5 von 20/);
});
