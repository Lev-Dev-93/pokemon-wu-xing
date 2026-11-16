import test from 'node:test';
import assert from 'node:assert/strict';
import {typeBlocksStatus} from '../src/battle-status-rules.js';
test('338: manipulierte Typwerte bewirken keine Statusimmunität',()=>{assert.equal(typeBlocksStatus('burn',['10']),false);assert.equal(typeBlocksStatus('burn',[10]),true);});
