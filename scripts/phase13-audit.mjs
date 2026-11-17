import {phase13ReleaseAudit} from '../src/phase13-release-audit.js';
import {HELD_BATTLE_ITEMS} from '../src/held-battle-items.js';
import {writeFileSync} from 'node:fs';
const audit=phase13ReleaseAudit();
const output={version:'dev.704',generatedAt:new Date().toISOString(),...audit,heldItems:Object.entries(HELD_BATTLE_ITEMS).map(([id,definition])=>({id,name:definition.name,mechanicFields:Object.keys(definition).filter(k=>k!=='name'),status:'requires-behavioral-verification'})),releaseDecision:audit.mechanicsComplete?'eligible-for-review':'not-ready'};
const json=JSON.stringify(output,null,2)+'\n';
if(process.argv.includes('--write'))writeFileSync('PHASE13_AUDIT_REPORT.json',json);
else process.stdout.write(json);
if(audit.invalidData.length)process.exitCode=1;
