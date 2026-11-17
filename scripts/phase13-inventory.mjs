// Konservative Bestandsaufnahme: Textreferenzen sind kein Funktionsnachweis.
import {readFileSync,writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {resolve,dirname} from 'node:path';
import {BATTLE_DATA} from '../src/battle-data.js';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const battle=readFileSync(resolve(root,'src/battle.js'),'utf8');
const ids=[...new Set(Object.values(BATTLE_DATA.learnsets).flatMap(list=>list.map(pair=>Number(pair[1]))))].filter(id=>BATTLE_DATA.moves[id]).sort((a,b)=>a-b);
const references=new Set([...battle.matchAll(/\b(?:move\.id|moveId)\s*===?\s*(\d+)\b/g)].map(x=>Number(x[1])));
const literals=new Set([...battle.matchAll(/\b\d+\b/g)].map(x=>Number(x[0])));
const status=ids.filter(id=>BATTLE_DATA.moves[id].category===1);
const damage=ids.filter(id=>BATTLE_DATA.moves[id].category!==1);
const suspected=status.filter(id=>!literals.has(id));
const report={version:'dev.678',method:'Statische, konservative Inventur – keine semantische Implementierungsbestätigung',totalCatalogMoves:Object.keys(BATTLE_DATA.moves).length,learnableUniqueMoves:ids.length,learnableStatusMoves:status.length,learnableDamageMoves:damage.length,statusIdsWithoutAnyNumericReferenceInBattleJs:suspected,explicitMoveIdComparisonReferences:[...references].filter(id=>ids.includes(id)).sort((a,b)=>a-b),warning:'Numerische Referenzen können Typ-IDs, Stufen, Chancen oder andere Werte sein; auch referenzierte Attacken können unvollständig sein. Schadensattacken können generischen Schaden verursachen, ohne ihren Spezialeffekt zu besitzen.'};
writeFileSync(resolve(root,'PHASE13_MOVE_INVENTORY_DEV678.json'),JSON.stringify(report,null,2)+'\n');
const lines=['# Phase 13 – Kataloginventur dev.678','','Diese Inventur ist **keine Vollständigkeitsbescheinigung**. Sie vergleicht den im Projekt enthaltenen Attackenkatalog und die Lernlisten mit statischen Referenzen im Kampfcode.','','| Kennzahl | Anzahl |','|---|---:|',`| Attacken im Katalog | ${report.totalCatalogMoves} |`,`| Eindeutige Attacken in Lernlisten | ${ids.length} |`,`| Davon Statusattacken | ${status.length} |`,`| Davon Schadensattacken | ${damage.length} |`,`| Statusattacken ohne irgendeine numerische ID-Referenz in battle.js | ${suspected.length} |`,'','## Verdachtsliste: nicht verifizierte Statusattacken','',...suspected.map(id=>`- ${id}: ${BATTLE_DATA.moves[id].de||BATTLE_DATA.moves[id].name}`),'','## Prüfmaßstab für die Freigabe','','1. Für jede erlernbare Attacke eine eindeutige Implementierungszuordnung oder bewusst dokumentierte Einschränkung.','2. Für jede im Spiel verfügbare Fähigkeit mindestens einen gezielten Funktionstest und Tests für Wechselwirkungen.','3. Mehrere komplette wilde und Trainerkämpfe im Browser einschließlich Pokémon-Wechsel, Sieg, Niederlage und Rückkehr in die Welt.','4. Keine stillen Platzhalter für erlernbare Statusattacken; fehlende Effekte werden sichtbar gemeldet.','5. Phase 12 bleibt unangetastet.','','**Achtung:** Die Verdachtsliste ist eine Priorisierung, keine bewiesene Liste defekter Attacken.'];
writeFileSync(resolve(root,'PHASE13_KATALOG_AUDIT_DEV678.md'),lines.join('\n')+'\n');
console.log(JSON.stringify({catalog:report.totalCatalogMoves,learnable:ids.length,status:status.length,unreferencedStatus:suspected.length}));
