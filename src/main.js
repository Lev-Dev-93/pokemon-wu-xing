import {prologuePhase} from './story-sequence.js';
import {findStoryWalk,STORY_WALK_TARGETS} from './story-autowalk.js';
import {pendingRiftRecovery} from './story-guards.js';
import {BAG_CATEGORIES,bagEntries,bagTargets,applyBagItem} from './bag.js';
import {battleOutcome} from './battle-flow.js';
import {developerModeEnabled,grantDevelopmentSupplies} from './developer-tools.js';
import {EVOLUTION_STONES,stoneEvolutionOptions} from './progression.js';
import {currentTimeOfDay} from './day-night.js';
import {PP_ITEMS,currentPp,maxPp} from './pp-items.js';
import {SHOP_STOCK} from './shop.js';
import {POTION_ITEM,STATUS_REMEDIES,REVIVE_ITEM,FULL_RESTORE_ITEM} from './healing.js';
import {useBattlePotion,useBattleRemedy,useBattleRecovery,useBattlePpItem} from './battle-items.js';
import {tryEscape} from './wild-encounters.js';
import {startBattle,playTurn,playEnemyOnlyTurn,availableMoves} from './battle.js';
import {switchTeamPokemon,availableSwitches} from './battle-switch.js';
import {POKEBALL_ITEM,tryCapture,captureProbability} from './capture.js';
import {grantTestExperience,acceptMove,acceptEvolution,describeMove,createRewardQueue} from './battle-rewards.js';
import {createPokemon} from './team.js';
import {levelProgress,availableLevelEvolutions} from './progression.js';
import {getMove,getEvolutions,speciesTypes,experienceForLevel} from './moves.js';
import {STARTERS} from './starter-data.js';
import {drawScene} from './art.js';
import {Engine} from './engine.js';
import {riftVisualPhase} from './rift-scene.js';
import {drawRiftOverlay} from './rift-art.js';
import {absolVisualPhase} from './absol-scene.js';
import {drawAbsolOverlay} from './absol-art.js';
import {professorVisualPhase} from './professor-scene.js';
import {drawProfessorOverlay} from './professor-art.js';
const engine=new Engine();const canvas=document.querySelector('#game'),ctx=canvas.getContext('2d');
const info=document.querySelector('#info'),notice=document.querySelector('#notice'),details=document.querySelector('#debug');
const dialogBox=document.querySelector('#dialogue'),speaker=document.querySelector('#speaker'),dialogText=document.querySelector('#dialogue-text');
const directions={ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right',w:'up',s:'down',a:'left',d:'right',W:'up',S:'down',A:'left',D:'right'};
const menu=document.querySelector('#game-menu'),menuContent=document.querySelector('#menu-content');let menuOpen=false;let battle=null;let rewardDone=false;let pendingRewards=[];let battleFlash=0;let battleBusy=false;let battleGeneration=0;let battleView=null;let battleKind='test';let wildTeamIndex=-1;let escapeAttempts=0;let battleFighters=new Map();const battlePanel=document.querySelector('#battle-panel');const keys=new Set();let last=0;let scriptedRun=false;let storyGeneration=0;const saveKey='pokemon-wu-xing-dev',autoKey='pokemon-wu-xing-autosave',legacyKey='monsterreise-dev1';const starterPanel=document.querySelector('#starter-panel'),starterSearch=document.querySelector('#starter-search'),starterList=document.querySelector('#starter-list'),starterStatus=document.querySelector('#starter-status');
const journal=document.querySelector('#journal'),journalButton=document.querySelector('#journal-toggle');
const devMode=developerModeEnabled(window.location.search);

function move(dir){if(scriptedRun||menuOpen||!starterPanel.hidden||!battlePanel.hidden)return;engine.step(dir);if(engine.lastEvent==='transition')autoSave();if(engine.lastEvent==='wildEncounter'){const wild=engine.pendingWild;engine.pendingWild=null;engine.lastEvent=null;startWildBattle(wild);return}engine.lastEvent=null;draw()}
function interact(){if(scriptedRun||menuOpen||!starterPanel.hidden||!battlePanel.hidden)return;keys.clear();const before=engine.mode;engine.interact();const event=engine.lastEvent;if(event==='storageOpened'){engine.lastEvent=null;toggleMenu(true);menuPanel('storage');draw();return}if(event==='shopOpened'){engine.lastEvent=null;toggleMenu(true);menuPanel('shop');draw();return}if(event==='trainerChallenge'){const trainer=engine.pendingTrainer;engine.pendingTrainer=null;engine.lastEvent=null;startTrainerBattle(trainer);return}if(['stationHealed','suppliesCollected','dialogueFinished','birthdayPreviewFinished','starterWishFinished','riftSceneFinished','absolSceneFinished','parentsReportFinished','professorDemoFinished','route1Hatched'].includes(event))autoSave();engine.lastEvent=null;
 if(before==='dialogue'&&engine.mode==='exploration'){
  if(event==='riftSceneFinished'){runToRival();return}
  if(event==='absolSceneFinished'){runToParents();return}
  if(event==='birthdayPreviewFinished'&&!engine.state.flags.egg_received){draw();openStarters();return}
  if(event==='starterWishFinished'&&engine.state.flags.egg_received&&!engine.state.flags.rift_closed){runToVillageSquare();return}
  if(!engine.state.flags.birthday_wish_pending&&!engine.state.flags.egg_received&&engine.state.mapId==='ground'&&engine.state.flags.spokenToBreederA&&engine.state.flags.spokenToBreederB){engine.beginBirthdayPreview();autoSave()}
 }
 draw()}
// Story-controlled run: earthquake at the breeders' house, then the player runs to the village square.
// Movement is locked until the rift scene begins; all intermediate maps are rendered.
function runToVillageSquare(){
 if(scriptedRun)return;scriptedRun=true;keys.clear();engine.message='Ein Erdbeben! Du rennst zum Dorfplatz!';draw();
 const route=[['ground',5,7],['yard',7,2],['yard',7,4],['yard',7,6],['yard',7,8],['yard',7,10],['village',10,1],['village',10,3],['village',10,5],['village',10,7],['village',11,7]];
 let i=0;if(engine.state.mapId==='yard')i=route.findIndex(step=>step[0]==='yard'&&step[2]>=engine.state.y);else if(engine.state.mapId==='village')i=route.findIndex(step=>step[0]==='village'&&step[2]>=engine.state.y);if(i<0)i=route.length;const generation=storyGeneration;
 function next(){if(generation!==storyGeneration)return;if(i>=route.length){scriptedRun=false;engine.state.facing='up';engine.setFlag('visitedYard',true);engine.setFlag('visitedVillage',true);engine.beginRiftScene();autoSave();draw();return}
 const [mapId,x,y]=route[i++];engine.state.mapId=mapId;engine.state.x=x;engine.state.y=y;engine.state.elevation=0;engine.state.steps++;engine.state.facing='down';autoSave();draw();setTimeout(next,130)}
 next();
}
// Automatischer Prolog: Giratina → Rivale/Absol → Eltern → Professor.
function walkStoryTo(mapId,target,done){
 const route=findStoryWalk(mapId,[engine.state.x,engine.state.y],target);
 if(!route){scriptedRun=false;engine.message='Der automatische Storyweg ist blockiert.';draw();return}
 let index=0;const generation=storyGeneration;
 function advance(){if(generation!==storyGeneration)return;if(index===route.length){done();return}
  const [x,y]=route[index++],oldX=engine.state.x,oldY=engine.state.y;engine.state.x=x;engine.state.y=y;engine.state.steps++;
  engine.state.elevation=0;engine.state.facing=x>oldX?'right':x<oldX?'left':y>oldY?'down':'up';
  autoSave();draw();setTimeout(advance,110);
 }
 advance();
}
function runToRival(){
 if(scriptedRun||engine.state.mapId!=='village'||engine.state.flags.rival_absol)return;
 scriptedRun=true;keys.clear();walkStoryTo('village',STORY_WALK_TARGETS.rival,()=>{
  scriptedRun=false;engine.state.facing='up';engine.beginAbsolScene();autoSave();draw();
 });
}
function runToParents(){
 if(scriptedRun||!['village','yard','ground'].includes(engine.state.mapId)||!engine.state.flags.rival_absol||engine.state.flags.parents_briefed)return;
 scriptedRun=true;keys.clear();
 function reachGround(){
  if(engine.state.mapId==='ground')return walkStoryTo('ground',STORY_WALK_TARGETS.parents,()=>{
   scriptedRun=false;engine.state.facing='up';engine.beginParentsReport();autoSave();draw();
  });
  walkStoryTo('yard',STORY_WALK_TARGETS.yardExit,()=>{
   engine.state.mapId='ground';engine.state.x=5;engine.state.y=7;engine.state.elevation=0;autoSave();draw();reachGround();
  });
 }
 if(engine.state.mapId==='village')walkStoryTo('village',STORY_WALK_TARGETS.villageExit,()=>{
  engine.state.mapId='yard';engine.state.x=7;engine.state.y=10;engine.state.elevation=0;autoSave();draw();reachGround();
 });else reachGround();
}
function resumePrologue(){
 if(engine.mode!=='exploration')return false;
 const phase=prologuePhase(engine.state.flags,engine.state.mapId);
 if(phase==='rift-scene'&&engine.state.mapId==='village'){engine.beginRiftScene();autoSave();draw();return true}
 if(phase==='rift-approach'&&['ground','yard'].includes(engine.state.mapId)){runToVillageSquare();return true}
 if(phase==='to-rival'&&engine.state.mapId==='village'){runToRival();return true}
 if(phase==='to-parents'&&['village','yard','ground'].includes(engine.state.mapId)){runToParents();return true}
 return false;
}
function autoSave(){try{localStorage.setItem(autoKey,engine.save())}catch(e){console.warn('Automatisches Speichern nicht möglich',e)}}
function renderStarters(){
 starterList.replaceChildren();const q=starterSearch.value.trim().toLocaleLowerCase('de');
 const results=STARTERS.filter(p=>p.name.toLocaleLowerCase('de').includes(q)||p.identifier.includes(q)||String(p.id).includes(q));
 starterStatus.textContent=`${results.length} von ${STARTERS.length} möglichen Arten · Auswahl einmalig`;
 for(const p of results){const b=document.createElement('button');b.type='button';b.textContent=`#${String(p.id).padStart(3,'0')} · ${p.name}`;b.addEventListener('click',()=>{
 if(!engine.chooseStarter(p.id)){notice.textContent='Auswahl derzeit nicht möglich.';return}
 starterPanel.hidden=true;keys.clear();autoSave();draw();});starterList.append(b)}
}
function openStarters(){
 if(engine.state.flags.egg_received){notice.textContent=`Dein Wunsch: ${engine.starterWish?.name||'unbekannt'} – das Ei ist bereits erhalten.`;return}
 if(engine.state.mapId!=='ground'||!engine.state.flags.spokenToBreederA||!engine.state.flags.spokenToBreederB||!engine.state.flags.birthday_wish_pending){notice.textContent='Schließe zuerst den Geburtstagsdialog mit beiden Züchtern ab.';return}
 toggleMenu(false);keys.clear();starterPanel.hidden=false;starterSearch.value='';renderStarters();starterSearch.focus();draw();
}
function renderJournal(){const data=engine.journal;document.querySelector('#journal-title').textContent=data.heading;document.querySelector('#journal-description').textContent=data.description;const ul=document.querySelector('#journal-tasks');ul.replaceChildren();for(const group of [{name:'Aktuelle Aufgaben',items:data.quests.active},{name:'Abgeschlossene Aufgaben',items:data.quests.completed},{name:'Noch gesperrt',items:data.quests.locked}]){if(!group.items.length)continue;const header=document.createElement('li');header.textContent=group.name;header.style.fontWeight='bold';ul.append(header);for(const quest of group.items){const li=document.createElement('li');li.className=quest.status==='completed'?'done':'pending';li.textContent=`${quest.status==='completed'?'✓':'○'} ${quest.title} (${quest.done}/${quest.total})`;ul.append(li);if(quest.status==='active'){const description=document.createElement('li');description.textContent=quest.description;description.className='quest-description';ul.append(description)}if(quest.status==='active')for(const objective of quest.objectives){const sub=document.createElement('li');sub.className=objective.done?'done':'pending';sub.textContent=`  ${objective.done?'✓':'○'} ${objective.label}`;ul.append(sub)}}}}
function toggleJournal(){if(!battlePanel.hidden||!starterPanel.hidden||menuOpen)return;journal.hidden=!journal.hidden;journalButton.setAttribute('aria-expanded',String(!journal.hidden));renderJournal()}
const VIEW_W=512,VIEW_H=384;
const worldCanvas=document.createElement('canvas');const worldCtx=worldCanvas.getContext('2d');
function cameraOffset(map,x,y){return {x:Math.max(0,Math.min(map.w*32-VIEW_W,Math.round(x*32+16-VIEW_W/2))),y:Math.max(0,Math.min(map.h*32-VIEW_H,Math.round(y*32+16-VIEW_H/2)))};}
function draw(){const m=engine.map;canvas.width=VIEW_W;canvas.height=VIEW_H;worldCanvas.width=m.w*32;worldCanvas.height=m.h*32;worldCtx.imageSmoothingEnabled=false;drawScene(worldCtx,m,engine.state);if(engine.dialogue?.id==='rift_scene')drawRiftOverlay(worldCtx,worldCanvas.width,worldCanvas.height,riftVisualPhase(engine.dialogue.index));if(engine.dialogue?.id==='absol_scene')drawAbsolOverlay(worldCtx,worldCanvas.width,worldCanvas.height,absolVisualPhase(engine.dialogue.index));if(engine.dialogue?.id==='professor_demo_scene')drawProfessorOverlay(worldCtx,worldCanvas.width,worldCanvas.height,professorVisualPhase(engine.dialogue.index));ctx.imageSmoothingEnabled=false;ctx.fillStyle='#182a22';ctx.fillRect(0,0,VIEW_W,VIEW_H);const camera=cameraOffset(m,engine.state.x,engine.state.y);const dx=Math.floor((VIEW_W-Math.min(VIEW_W,worldCanvas.width))/2),dy=Math.floor((VIEW_H-Math.min(VIEW_H,worldCanvas.height))/2);ctx.drawImage(worldCanvas,camera.x,camera.y,Math.min(VIEW_W,worldCanvas.width),Math.min(VIEW_H,worldCanvas.height),dx,dy,Math.min(VIEW_W,worldCanvas.width),Math.min(VIEW_H,worldCanvas.height));
 document.querySelector('#area').textContent=`${m.name} · ${currentTimeOfDay()==='day'?'Tag':'Nacht'}`;info.textContent=`${m.name} · Position ${engine.state.x},${engine.state.y} · Höhe ${engine.state.elevation} · Schritte ${engine.state.steps}`;
 dialogBox.hidden=engine.mode!=='dialogue';if(engine.dialogue){speaker.textContent=engine.dialogue.name;dialogText.textContent=engine.dialogue.pages[engine.dialogue.index]}
 renderJournal();notice.textContent=engine.message|| (engine.mode==='dialogue'?'':'WASD / Pfeiltasten · E / Leertaste: Untersuchen');window.__pokemonWuXing=engine;}

let bagTab='all';
function renderBag(heading,list,category=bagTab,selected=null){bagTab=BAG_CATEGORIES.some(c=>c.id===category)?category:'all';heading.textContent=`Beutel · ${engine.state.money??0} Pokédollar`;
 const tabs=document.createElement('li');tabs.className='bag-tabs';for(const tab of BAG_CATEGORIES){const b=document.createElement('button');b.type='button';b.textContent=tab.name+' ('+bagEntries(engine.inventory,tab.id).length+')';b.setAttribute('aria-pressed',String(tab.id===bagTab));b.addEventListener('click',()=>menuPanel('inventory:'+tab.id));tabs.append(b)}list.append(tabs);
 const entries=bagEntries(engine.inventory,bagTab);if(!entries.length){const empty=document.createElement('li');empty.textContent='In dieser Kategorie sind keine Gegenstände vorhanden.';list.append(empty);return;}
 for(const item of entries){const li=document.createElement('li');li.className='bag-entry';const button=document.createElement('button');button.type='button';button.textContent=`${item.name} × ${item.quantity}`;button.setAttribute('aria-expanded',String(selected===item.id));button.addEventListener('click',()=>menuPanel('inventory:'+bagTab+':'+item.id));li.append(button);
 if(selected===item.id){const targets=bagTargets(item.id,engine.team);if(!targets.length){const info=document.createElement('p');info.textContent=item.category==='balls'?'Pokébälle können nur in wilden Kämpfen verwendet werden.':'Der Gegenstand kann momentan bei keinem Team-Pokémon eingesetzt werden.';li.append(info)}else{const info=document.createElement('p');info.textContent='Ziel auswählen (Verbrauch: 1 Stück):';li.append(info);const back=document.createElement('button');back.type='button';back.textContent='← Zurück zur Übersicht';back.addEventListener('click',()=>menuPanel('inventory:'+bagTab));li.append(back);for(const target of targets){const b=document.createElement('button');b.type='button';b.className='bag-target';b.textContent=target.label;b.addEventListener('click',()=>{if(applyBagItem(engine,item.id,target)){autoSave();notice.textContent=engine.message;menuPanel('inventory:'+bagTab)}else{notice.textContent='Gegenstand kann nicht verwendet werden.';menuPanel('inventory:'+bagTab+':'+item.id)}draw()});li.append(b)}}}list.append(li)}
}

function toggleMenu(force){if(!starterPanel.hidden||!battlePanel.hidden)return;if(!journal.hidden){journal.hidden=true;journalButton.setAttribute('aria-expanded','false');}if(engine.mode==='dialogue'&&force!==false)return;menuOpen=typeof force==='boolean'?force:!menuOpen;menu.hidden=!menuOpen;document.querySelector('#menu-toggle').setAttribute('aria-expanded',String(menuOpen));keys.clear();if(!menuOpen){menuContent.replaceChildren();document.querySelector('#menu-toggle').focus();}else{menuPanel('team');menu.querySelector('#menu-close')?.focus();}}
function menuPanel(which){menuContent.replaceChildren();const heading=document.createElement('h3');const list=document.createElement('ul');if(which==='shop'){heading.textContent=`Dorfladen · ${engine.state.money} Pokédollar`;for(const item of SHOP_STOCK){const li=document.createElement('li');const button=document.createElement('button');button.type='button';button.textContent=`${item.name} – ${item.price} Pokédollar · Kaufen`;button.disabled=engine.state.money<item.price;button.addEventListener('click',()=>{if(engine.buyItem(item.id)){autoSave();menuPanel('shop');draw()}else{notice.textContent='Kauf nicht möglich.'}});li.append(button);const five=document.createElement('button');five.type='button';five.textContent='×5';five.disabled=engine.state.money<item.price*5;five.addEventListener('click',()=>{if(engine.buyItem(item.id,5)){autoSave();menuPanel('shop');draw()}else notice.textContent='Kauf nicht möglich.'});li.append(five);list.append(li)}const hint=document.createElement('li');hint.textContent='Vorläufige Testpreise. Einkäufe werden sofort gespeichert.';list.append(hint)}else if(which==='team'){heading.textContent='Pokémon-Team · '+engine.team.length+'/6';const members=engine.team;if(!members.length){const li=document.createElement('li');li.textContent='Noch kein Pokémon im Team. Das Starter-Ei gehört noch nicht dazu.';list.append(li)}members.forEach((p,index)=>{const li=document.createElement('li');li.className='pokemon-team-card';const b=document.createElement('button');b.type='button';const percent=Math.round(100*p.currentHp/p.stats.hp);b.textContent=`${index===0?'★ ':''}${index+1}. #${String(p.speciesId).padStart(3,'0')} · Lv. ${p.level} · ${p.currentHp}/${p.stats.hp} KP · ${p.status==='healthy'?'Gesund':p.status} · ${percent}%`;b.setAttribute('aria-label',`Pokémon ${index+1} Details öffnen`);b.addEventListener('click',()=>menuPanel('pokemon:'+index));li.append(b);for(const [label,to] of [['↑',index-1],['↓',index+1]]){if(to<0||to>=members.length)continue;const moveButton=document.createElement('button');moveButton.type='button';moveButton.textContent=label;moveButton.setAttribute('aria-label',`Pokémon ${index+1} ${label==='↑'?'nach oben':'nach unten'} verschieben`);moveButton.addEventListener('click',()=>{if(engine.movePokemon(index,to)){autoSave();menuPanel('team');draw()}});li.append(moveButton)}list.append(li)});if(members.length>1){const hint=document.createElement('li');hint.textContent='Teamreihenfolge:';list.append(hint);members.forEach((p,index)=>{if(index===0)return;const li=document.createElement('li');const b=document.createElement('button');b.type='button';b.textContent=`#${p.speciesId} an die Teamspitze`;b.addEventListener('click',()=>{if(engine.movePokemon(index,0)){autoSave();menuPanel('team');draw()}});li.append(b);list.append(li)})}const storageInfo=document.createElement('li');storageInfo.textContent=`Pokémon-Lager: ${engine.storage.length}/500 · Zugriff am PC im Erdgeschoss`;list.append(storageInfo);if(engine.canAccessStorage()){const li=document.createElement('li');const b=document.createElement('button');b.textContent='Pokémon-Lager öffnen';b.addEventListener('click',()=>menuPanel('storage'));li.append(b);list.append(li)}if(engine.state.starterEgg&&!engine.state.starterEgg.hatched){const li=document.createElement('li');li.textContent='Starter-Ei: Schlüpft auf Route 1.';list.append(li)}}else if(which.startsWith('pokemon:')){const index=Number(which.split(':')[1]);const p=engine.team[index];heading.textContent=p?`Pokémon #${String(p.speciesId).padStart(3,'0')} · Lv. ${p.level}`:'Pokémon nicht gefunden';const back=document.createElement('button');back.textContent='← Zum Team';back.addEventListener('click',()=>menuPanel('team'));list.append(back);if(p){for(const text of [`KP: ${p.currentHp}/${p.stats.hp} · Status: ${p.status}`,`Fähigkeit: #${p.abilityId}${p.hiddenAbility?' (versteckt)':''}`,`Wesen: ${p.nature??'nicht festgelegt'}`,`Shiny: ${p.shiny?'Ja':'Nein'}`,`Erfahrung: ${levelProgress(p).experience} · Nächste Stufe: ${levelProgress(p).nextLevelExperience??'Maximum'}`,`Typen: ${speciesTypes(p.speciesId).join(' / ')}`,`Freundschaft: ${p.friendship??70}/255`,`IVs: ${p.ivs.join(' / ')}`,`EVs: ${p.evs.join(' / ')}`,`Statuswerte: KP ${p.stats.hp} · Angriff ${p.stats.attack} · Verteidigung ${p.stats.defense} · Spezial-Angriff ${p.stats.specialAttack} · Spezial-Verteidigung ${p.stats.specialDefense} · Initiative ${p.stats.speed}`]){const li=document.createElement('li');li.textContent=text;list.append(li)}const pp=currentPp(p),maximum=maxPp(p);p.moves.forEach((id,i)=>{const li=document.createElement('li');li.textContent=`${getMove(id)?.de||getMove(id)?.name||'#'+id} · ${pp[i]}/${maximum[i]} AP`;list.append(li)});for(const option of engine.friendshipOptions(index)){const li=document.createElement('li');const b=document.createElement('button');b.textContent=`Freundschaftsentwicklung zu #${option.to}`;b.addEventListener('click',()=>{if(engine.evolveFriendshipOn(index,option.to)){autoSave();menuPanel('pokemon:'+index);draw()}});li.append(b);list.append(li)}}}else if(which==='storage'){heading.textContent=`Pokémon-Lager · Team ${engine.team.length}/6 · Box ${engine.storage.length}/500`;if(!engine.canAccessStorage()){const li=document.createElement('li');li.textContent='Lagerzugriff nur am PC im Erdgeschoss deines Hauses nach dem Schlüpfen des Starters.';list.append(li)}else{const back=document.createElement('li');const backButton=document.createElement('button');backButton.type='button';backButton.textContent='Zurück zum Team';backButton.addEventListener('click',()=>menuPanel('team'));back.append(backButton);list.append(back);const h=document.createElement('li');h.textContent=`Team (${engine.team.length}/6) – Pokémon ablegen:`;list.append(h);engine.team.forEach((p,i)=>{const li=document.createElement('li');const b=document.createElement('button');b.type='button';b.textContent=`${i+1}. #${p.speciesId} · Lv. ${p.level} · ${p.currentHp}/${p.stats.hp} KP → Ablegen`;b.disabled=engine.team.length<=1||engine.storage.length>=500;b.addEventListener('click',()=>{if(engine.depositPokemon(i)){autoSave();menuPanel('storage');draw()}});li.append(b);list.append(li)});const sh=document.createElement('li');sh.textContent=`Lager (${engine.storage.length}/500) – Pokémon ins Team nehmen:`;list.append(sh);engine.storage.forEach((p,i)=>{const li=document.createElement('li');const b=document.createElement('button');b.type='button';b.textContent=`${i+1}. #${p.speciesId} · Lv. ${p.level} · ${p.currentHp}/${p.stats.hp} KP → Ins Team`;b.disabled=engine.team.length>=6;b.addEventListener('click',()=>{if(engine.withdrawPokemon(i)){autoSave();menuPanel('storage');draw()}});li.append(b);list.append(li)})}}else if(which==='inventory'||which.startsWith('inventory:')){const parts=which.split(':');renderBag(heading,list,parts[1]||bagTab,parts[2]||null)}else if(which==='settings'){heading.textContent='Einstellungen';if(devMode){const dev=document.createElement('button');dev.type='button';dev.textContent='Entwicklertest: 5.000 Pokédollar und je 3 Entwicklungssteine';dev.addEventListener('click',()=>{grantDevelopmentSupplies(engine);autoSave();menuPanel('settings');draw()});list.append(dev)}for(const [label,cls] of [['Große Schrift','large-text'],['Hoher Kontrast','high-contrast']]){const button=document.createElement('button');button.textContent=label;button.setAttribute('aria-pressed',String(document.body.classList.contains(cls)));button.addEventListener('click',()=>{document.body.classList.toggle(cls);button.setAttribute('aria-pressed',String(document.body.classList.contains(cls)))});list.append(button)}}else if(which==='journal'){heading.textContent=engine.journal.heading;for(const group of [{title:'Aktiv',quests:engine.journal.quests.active},{title:'Erledigt',quests:engine.journal.quests.completed},{title:'Gesperrt',quests:engine.journal.quests.locked}]){const h=document.createElement('li');h.textContent=group.title;h.style.fontWeight='bold';list.append(h);for(const q of group.quests){const li=document.createElement('li');li.textContent=`${q.title} (${q.done}/${q.total}) – ${q.description}`;list.append(li)}}}menuContent.append(heading,list)}
document.querySelector('#starter-open').addEventListener('click',()=>{if(!engine.state.flags.birthday_wish_pending&&!engine.state.flags.egg_received&&engine.state.flags.spokenToBreederA&&engine.state.flags.spokenToBreederB){engine.beginBirthdayPreview();draw();return}openStarters()});document.querySelector('#starter-close').addEventListener('click',()=>{starterPanel.hidden=true;keys.clear();draw()});starterSearch.addEventListener('input',renderStarters);
document.querySelector('#birthday-preview').addEventListener('click',()=>{if(menuOpen)toggleMenu(false);keys.clear();if(engine.state.flags.birthday_wish_pending&&!engine.state.flags.egg_received){openStarters();return}engine.beginBirthdayPreview();if(engine.mode==='dialogue')autoSave();draw()});
document.querySelector('#menu-toggle').addEventListener('click',()=>toggleMenu());document.querySelector('#menu-close').addEventListener('click',()=>toggleMenu(false));document.querySelector('#menu-team').addEventListener('click',()=>menuPanel('team'));document.querySelector('#menu-inventory').addEventListener('click',()=>menuPanel('inventory'));document.querySelector('#menu-settings').addEventListener('click',()=>menuPanel('settings'));document.querySelector('#menu-journal').addEventListener('click',()=>menuPanel('journal'));document.querySelector('#menu-save').addEventListener('click',()=>document.querySelector('#save').click());
window.addEventListener('keydown',e=>{if(e.target instanceof HTMLElement&&['INPUT','TEXTAREA','SELECT'].includes(e.target.tagName))return;
 if(!battlePanel.hidden){return}
 if(!starterPanel.hidden){return}
 if(menuOpen&&(e.key==='e'||e.key==='E'||e.code==='Space'))return;
 if(e.key==='e'||e.key==='E'||e.code==='Space'){e.preventDefault();if(!e.repeat)interact();return}
 if(e.key==='m'||e.key==='M'){e.preventDefault();if(!e.repeat)toggleMenu();return}if(e.key==='Escape'){/* Escape bleibt dem Browser-Vollbild vorbehalten; das Menü schließt nur über M oder Schließen. */return}
 if(menuOpen){if(e.key==='Tab')return;return}if(e.key==='j'||e.key==='J'){e.preventDefault();if(!e.repeat)toggleJournal();return}
 const dir=directions[e.key];if(dir){e.preventDefault();if(engine.mode==='dialogue')return;keys.add(e.key);if(!e.repeat)move(dir)}});
window.addEventListener('keyup',e=>keys.delete(e.key));window.addEventListener('blur',()=>keys.clear());
for(const b of document.querySelectorAll('[data-dir]'))b.addEventListener('click',()=>move(b.dataset.dir));
document.querySelector('#interact').addEventListener('click',interact);dialogBox.addEventListener('click',interact);
journalButton.addEventListener('click',toggleJournal);document.querySelector('#continue').addEventListener('click',()=>{try{const raw=localStorage.getItem(autoKey)||localStorage.getItem(saveKey)||localStorage.getItem(legacyKey);if(!raw)throw Error('Noch kein Spielstand vorhanden');storyGeneration++;scriptedRun=false;engine.load(raw);if(pendingRiftRecovery(engine.state.flags,engine.state.mapId)!=='none'){if(pendingRiftRecovery(engine.state.flags,engine.state.mapId)==='scene'){engine.beginRiftScene();autoSave()}else runToVillageSquare();}else resumePrologue();keys.clear();draw();notice.textContent='Letzten Stand fortgesetzt'}catch(e){notice.textContent=`Fortsetzen fehlgeschlagen: ${e.message}`}});
document.querySelector('#save').addEventListener('click',()=>{try{localStorage.setItem(saveKey,engine.save());notice.textContent='Spielstand gespeichert'}catch(e){notice.textContent=`Speichern fehlgeschlagen: ${e.message}`}});
document.querySelector('#load').addEventListener('click',()=>{try{const raw=localStorage.getItem(saveKey)||localStorage.getItem(legacyKey);if(!raw)throw Error('Noch kein Spielstand vorhanden');storyGeneration++;scriptedRun=false;engine.load(raw);if(pendingRiftRecovery(engine.state.flags,engine.state.mapId)!=='none'){if(pendingRiftRecovery(engine.state.flags,engine.state.mapId)==='scene'){engine.beginRiftScene();autoSave()}else runToVillageSquare();}else resumePrologue();keys.clear();draw();notice.textContent='Spielstand geladen'}catch(e){notice.textContent=`Laden fehlgeschlagen: ${e.message}`}});
document.querySelector('#reset').addEventListener('click',()=>{keys.clear();starterPanel.hidden=true;storyGeneration++;scriptedRun=false;engine.reset();try{localStorage.removeItem(autoKey)}catch(e){}draw();notice.textContent='Neues Spiel gestartet'});
function frame(t){if(t-last>=125){if(engine.mode==='exploration'&&!menuOpen&&starterPanel.hidden&&battlePanel.hidden){const key=[...keys].at(-1);if(key)move(directions[key])}last=t}requestAnimationFrame(frame)}

// Abgeschlossene technische Testarena: keine Änderung an Engine-Team oder Story.
function rewardNotice(text){const el=document.querySelector('#battle-reward');const p=document.createElement('p');p.textContent=text;el.append(p)}
function nextReward(){const el=document.querySelector('#battle-choices');el.replaceChildren();const task=pendingRewards.shift();if(!task){if(['wild','trainer'].includes(battleKind))syncWildPokemon();return;}
 const prompt=document.createElement('p');prompt.textContent=task.kind==='move'?`Neue Attacke: ${describeMove(task.id)}. Lernen?`:`Entwicklung zu Pokémon #${task.id} durchführen?`;el.append(prompt);
 function option(label,fn){const b=document.createElement('button');b.textContent=label;b.addEventListener('click',()=>{try{fn();nextReward()}catch(err){rewardNotice(err.message)}});el.append(b)}
 if(task.kind==='move'){const p=battle.player.pokemon;if(p.moves.length<4)option('Attacke lernen',()=>{acceptMove(p,task.id);battle.player.pp=[...p.pp];rewardNotice(`${describeMove(task.id)} gelernt.`)});else p.moves.forEach((id,index)=>option(`${describeMove(id)} ersetzen`,()=>{acceptMove(p,task.id,index);battle.player.pp=[...p.pp];rewardNotice(`${describeMove(task.id)} gelernt.`)}));option('Nicht lernen',()=>rewardNotice('Attacke nicht gelernt.'))}
 else{option('Entwickeln',()=>{acceptEvolution(battle.player.pokemon,task.id);rewardNotice(`Entwicklung zu #${task.id} abgeschlossen.`)});option('Nicht entwickeln',()=>rewardNotice('Entwicklung abgebrochen.'))}}
function settleTestBattle(){if(!battle?.finished||rewardDone)return;rewardDone=true;if(['wild','trainer'].includes(battleKind)&&battle.winner!=='player'){syncWildPokemon();rewardNotice('Keine EP erhalten.');return}if(battle.winner!=='player'){rewardNotice('Keine Test-EP vergeben.');return}
 const result=grantTestExperience(battle.player.pokemon,battle.opponent.pokemon);rewardNotice(`${battleKind==='test'?'Testbelohnung':'Kampferfahrung'}: ${result.amount} EP · Level ${result.oldLevel} → ${result.newLevel}.`);
 pendingRewards=createRewardQueue(result);nextReward()}
function renderBattle(){if(!battle)return;for(const [id,f,key] of [['player-hp',battle.player,'playerHp'],['enemy-hp',battle.opponent,'opponentHp']]){const p=f.pokemon;const hp=battleView?.[key]??p.currentHp;const el=document.querySelector('#'+id);el.replaceChildren();const label=document.createElement('div');label.textContent=`#${String(p.speciesId).padStart(3,'0')} · Lv. ${p.level} · KP ${hp}/${p.stats.hp}`;const bar=document.createElement('progress');bar.max=p.stats.hp;bar.value=hp;el.append(label,bar)}
 const log=document.querySelector('#battle-log');log.replaceChildren();for(const line of (battleView?.log??battle.log)){const p=document.createElement('p');p.textContent=line;log.append(p)}
 const moves=document.querySelector('#battle-moves');moves.replaceChildren();for(const move of availableMoves(battle.player)){const b=document.createElement('button');const pp=battleView?.playerPp?.[move.index]??move.pp;b.textContent=`${move.name} · AP ${pp}/${move.maxPp}`;b.disabled=battleBusy||battle.finished||pp<=0;b.addEventListener('click',()=>void executeBattleTurn(move.index));moves.append(b)}
 const potionButton=document.querySelector('#battle-potion');potionButton.hidden=battleKind==='test';potionButton.disabled=battleBusy||battle.finished||!['wild','trainer'].includes(battleKind)||!engine.inventory.some(i=>i.id===POTION_ITEM&&i.quantity>0)||battle.player.pokemon.currentHp<=0||battle.player.pokemon.currentHp>=battle.player.pokemon.stats.hp;
 const remedyButton=document.querySelector('#battle-remedy');remedyButton.hidden=battleKind==='test';remedyButton.disabled=battleBusy||battle.finished||!['wild','trainer'].includes(battleKind)||battle.player.pokemon.currentHp<=0||!STATUS_REMEDIES.some(r=>r.status===battle.player.pokemon.status&&engine.inventory.some(i=>i.id===r.id&&i.quantity>0));
 const recoveryButton=document.querySelector('#battle-recovery');recoveryButton.hidden=battleKind==='test';recoveryButton.disabled=battleBusy||battle.finished||!['wild','trainer'].includes(battleKind)||!engine.inventory.some(i=>[REVIVE_ITEM,FULL_RESTORE_ITEM].includes(i.id)&&i.quantity>0);
 const ppButton=document.querySelector('#battle-pp');ppButton.hidden=battleKind==='test';ppButton.disabled=battleBusy||battle.finished||!['wild','trainer'].includes(battleKind)||!PP_ITEMS.some(item=>engine.inventory.some(i=>i.id===item.id&&i.quantity>0));
 const switchButton=document.querySelector('#battle-switch');switchButton.hidden=battleKind==='test';switchButton.disabled=battleBusy||!['wild','trainer'].includes(battleKind)||!availableSwitches(engine.state.team,wildTeamIndex).length||(battle.finished&&battle.winner!=='opponent');
 for(const id of ['battle-restart','battle-close'])document.querySelector('#'+id).disabled=battleBusy;document.querySelector('#battle-restart').hidden=battleKind!=='test';document.querySelector('#battle-escape').hidden=!['wild','trainer'].includes(battleKind);document.querySelector('#battle-escape').disabled=battleBusy||battle.finished;document.querySelector('#battle-catch').hidden=battleKind!=='wild';document.querySelector('#battle-catch').disabled=battleBusy||battle.finished||!engine.inventory.some(i=>i.id===POKEBALL_ITEM&&i.quantity>0);
 if(battle.finished&&!battleBusy){if(battleOutcome(battleKind,battle.winner,0,remainingTrainerPokemon.length)==='next-opponent'){const p=document.createElement('p');p.textContent=`Noch ${remainingTrainerPokemon.length} Pokémon des Trainers übrig.`;log.append(p);const next=document.createElement('button');next.textContent='Nächstes Trainer-Pokémon';next.addEventListener('click',advanceTrainerOpponent);log.append(next);return}if(['wild','trainer'].includes(battleKind)&&battleOutcome(battleKind,battle.winner,availableSwitches(engine.state.team,wildTeamIndex).length)==='switch'){const p=document.createElement('p');p.textContent='Dein Pokémon ist kampfunfähig. Wechsle ein anderes Pokémon ein!';log.append(p);return}settleTestBattle();const p=document.createElement('p');p.textContent=battle.winner==='player'?'Sieg!':battle.winner==='opponent'?'Niederlage.':battle.winner==='escape'?'Entkommen.':battle.winner==='caught'?'Gefangen!':'Unentschieden.';log.append(p)}}
const battleWait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
function chooseOpponentMove(){const choices=availableMoves(battle.opponent).filter(m=>m.pp>0);return choices.length?choices[Math.floor(Math.random()*choices.length)].index:null;}

async function executeBattleTurn(index){if(!battle||battleBusy||battle.finished)return;const enemy=availableMoves(battle.opponent).filter(m=>m.pp>0);if(!enemy.length){battle.log=['Der Gegner hat keine AP mehr. Der Kampf wird beendet.'];battle.finished=true;battle.winner='player';renderBattle();return}
 battleBusy=true;const generation=++battleGeneration;const before={playerHp:battle.player.pokemon.currentHp,opponentHp:battle.opponent.pokemon.currentHp,playerPp:[...battle.player.pp],opponentPp:[...battle.opponent.pp],log:[]};battleView=before;
 try{playTurn(battle,index,enemy[Math.floor(Math.random()*enemy.length)].index);const events=battle.turnEvents||[];renderBattle();for(const event of events){if(generation!==battleGeneration)return;await battleWait(350);if(generation!==battleGeneration)return;battleView=event;renderBattle();const target=document.querySelector(event.actor==='player'?'.battle-mon.enemy':'.battle-mon.player');if(event.actor!=='status'){target.classList.remove('battle-hit');void target.offsetWidth;target.classList.add('battle-hit')}await battleWait(550)}if(generation!==battleGeneration)return}
 catch(error){battle.log=[error.message]}
 finally{if(generation===battleGeneration){battleView=null;battleBusy=false;renderBattle()}}}
function startTestBattle(){if(engine.mode!=='exploration'||!starterPanel.hidden||battleBusy)return;toggleMenu(false);keys.clear();battleGeneration++;battleView=null;battleBusy=false;battleKind='test';battleFighters=new Map();battle=startBattle(createPokemon(4,{level:8}),createPokemon(1,{level:7}));rewardDone=false;pendingRewards=[];document.querySelector('#battle-reward').replaceChildren();document.querySelector('#battle-choices').replaceChildren();battlePanel.hidden=false;document.querySelector('#battle-title').textContent='Testarena – Einzelkampf';document.querySelector('#battle-note').textContent='Nur technische Probe: temporäre Pokémon. Team und Story bleiben unverändert.';renderBattle();document.querySelector('#battle-close').focus()}
function syncWildPokemon(){if(!['wild','trainer'].includes(battleKind)||wildTeamIndex<0||!battle)return;const p=battle.player.pokemon;const pp=Array.isArray(p.pp)&&p.pp.length===p.moves.length?p.pp:battle.player.pp;engine.state.team[wildTeamIndex]=structuredClone({...p,pp:[...pp]});autoSave()}
function startWildBattle(wild){if(!wild)return;wildTeamIndex=engine.state.team.findIndex(p=>p.currentHp>0);if(wildTeamIndex<0)return;toggleMenu(false);keys.clear();battleGeneration++;battleView=null;battleBusy=false;battleKind='wild';battleFighters=new Map();escapeAttempts=0;battle=startBattle(engine.state.team[wildTeamIndex],wild);battle.log=['Ein wildes Pokémon erscheint!'];rewardDone=false;pendingRewards=[];document.querySelector('#battle-reward').replaceChildren();document.querySelector('#battle-choices').replaceChildren();battlePanel.hidden=false;document.querySelector('#battle-title').textContent=`Wildes Pokémon – ${engine.map.name}`;document.querySelector('#battle-note').textContent=`${currentTimeOfDay()==='night'?'Nacht':'Tag'} · Dein echtes Team-Pokémon kämpft. KP und EP bleiben erhalten; Pokébälle sind einsetzbar.`;renderBattle()}
let remainingTrainerPokemon=[];
function startTrainerBattle(trainer){if(!trainer||engine.state.flags.route1TrainerDefeated)return;wildTeamIndex=engine.state.team.findIndex(p=>p.currentHp>0);if(wildTeamIndex<0)return;toggleMenu(false);keys.clear();battleGeneration++;battleView=null;battleBusy=false;battleKind='trainer';battleFighters=new Map();remainingTrainerPokemon=(trainer.team||[{speciesId:trainer.speciesId,level:trainer.level}]).slice(1);const first=(trainer.team||[trainer])[0];battle=startBattle(engine.state.team[wildTeamIndex],createPokemon(first.speciesId,{level:first.level}));battle.log=['Ein junger Trainer fordert dich zum Kampf heraus!'];rewardDone=false;pendingRewards=[];document.querySelector('#battle-reward').replaceChildren();document.querySelector('#battle-choices').replaceChildren();battlePanel.hidden=false;document.querySelector('#battle-title').textContent='Trainerkampf – Route 1';document.querySelector('#battle-note').textContent='Ein Übungskampf gegen einen Trainer. Fang ist nicht möglich; Flucht gilt als Aufgabe ohne Belohnung.';renderBattle()}
function advanceTrainerOpponent(){
 if(battleKind!=='trainer'||!battle?.finished||battle.winner!=='player'||battleBusy||!remainingTrainerPokemon.length)return false;
 const defeated=battle.opponent.pokemon;
 const result=grantTestExperience(battle.player.pokemon,defeated);
 syncWildPokemon();
 const next=remainingTrainerPokemon.shift();
 const player=engine.state.team[wildTeamIndex];
 battle=startBattle(player,createPokemon(next.speciesId,{level:next.level}));
 battle.log=[`Der Trainer schickt Pokémon #${next.speciesId} in den Kampf!`,`${result.amount} EP für das besiegte Pokémon erhalten.`];
 rewardDone=false;pendingRewards=[];battleView=null;
 document.querySelector('#battle-reward').replaceChildren();document.querySelector('#battle-choices').replaceChildren();renderBattle();return true;
}
function closeBattle(){if(battleBusy)return;if(battleKind==='wild'||battleKind==='trainer'){if(!battle.finished){notice.textContent='Du kannst den Kampf erst nach seinem Ende verlassen.';return}if(battle.winner==='opponent'&&availableSwitches(engine.state.team,wildTeamIndex).length){notice.textContent='Wechsle zuerst ein kampffähiges Pokémon ein.';return}if(pendingRewards.length||document.querySelector('#battle-choices').children.length){notice.textContent='Schließe zuerst die Level- und Entwicklungsentscheidungen ab.';return}syncWildPokemon();if(battle.winner==='opponent')engine.recoverFromBlackout();if(battleKind==='trainer'&&remainingTrainerPokemon.length===0)engine.finishTrainerBattle(battle.winner==='player');autoSave()}battleGeneration++;battlePanel.hidden=true;battle=null;battleView=null;keys.clear();draw()}
async function throwPokeball(){
 if(battleKind!=='wild'||!battle||battleBusy||battle.finished)return;
 if(!engine.inventory.some(i=>i.id===POKEBALL_ITEM&&i.quantity>0)){rewardNotice('Keine Pokébälle mehr.');return;}
 if(engine.state.team.length>=6&&engine.state.storage.length>=500){rewardNotice('Team und Lager sind voll.');return;}
 if(!engine.removeItem(POKEBALL_ITEM,1))return;
 const success=tryCapture(battle.opponent.pokemon);autoSave();
 if(success){const caught=structuredClone(battle.opponent.pokemon);caught.currentHp=Math.max(1,caught.currentHp);
  if(!engine.catchPokemon(caught)){engine.addItem(POKEBALL_ITEM,1);rewardNotice('Pokémon konnte nicht aufgenommen werden.');return;}
  battle.finished=true;battle.winner='caught';battle.log=['Klick! Das wilde Pokémon wurde gefangen!'];rewardDone=true;
  rewardNotice(`Pokémon #${caught.speciesId} gefangen und ${engine.state.team.length<=6&&engine.state.team.at(-1)?.speciesId===caught.speciesId?'ins Team':'ins Lager'} aufgenommen.`);
  syncWildPokemon();autoSave();renderBattle();return;
 }
 battle.log=['Oh nein! Das wilde Pokémon hat sich befreit!'];rewardNotice(`Fangversuch fehlgeschlagen. Noch ${engine.inventory.find(i=>i.id===POKEBALL_ITEM)?.quantity||0} Pokébälle.`);
 const enemy=availableMoves(battle.opponent).filter(m=>m.pp>0);
 if(!enemy.length){renderBattle();return;}
 battleBusy=true;const generation=++battleGeneration;const before={playerHp:battle.player.pokemon.currentHp,opponentHp:battle.opponent.pokemon.currentHp,playerPp:[...battle.player.pp],opponentPp:[...battle.opponent.pp],log:[...battle.log]};battleView=before;
 try{playEnemyOnlyTurn(battle,enemy[Math.floor(Math.random()*enemy.length)].index);renderBattle();for(const event of battle.turnEvents){await battleWait(350);if(generation!==battleGeneration)return;battleView=event;renderBattle();await battleWait(550)}}
 finally{if(generation===battleGeneration){battleBusy=false;battleView=null;syncWildPokemon();renderBattle()}}
}
async function chooseBattleSwitch(){
 if(!battle||battleBusy||!['wild','trainer'].includes(battleKind))return;
 syncWildPokemon();const choices=availableSwitches(engine.state.team,wildTeamIndex);
 const panel=document.querySelector('#battle-choices');panel.replaceChildren();
 for(const {index,pokemon} of choices){const button=document.createElement('button');button.textContent=`#${pokemon.speciesId} · Lv. ${pokemon.level} · KP ${pokemon.currentHp}/${pokemon.stats.hp}`;
 button.addEventListener('click',()=>void performBattleSwitch(index));panel.append(button)}
 const cancel=document.createElement('button');cancel.textContent='Abbrechen';cancel.addEventListener('click',()=>{panel.replaceChildren();renderBattle()});panel.append(cancel);
}
async function performBattleSwitch(index){
 if(!battle||battleBusy)return;
 const forced=battle.finished&&battle.winner==='opponent'&&battle.player.pokemon.currentHp===0;
 try{wildTeamIndex=switchTeamPokemon(battle,engine.state.team,wildTeamIndex,index,battleFighters)}catch(error){rewardNotice(error.message);return}
 document.querySelector('#battle-choices').replaceChildren();syncWildPokemon();renderBattle();
 if(forced)return;
 const enemy=availableMoves(battle.opponent).filter(m=>m.pp>0);if(!enemy.length)return;
 battleBusy=true;const generation=++battleGeneration;
 battleView={playerHp:battle.player.pokemon.currentHp,opponentHp:battle.opponent.pokemon.currentHp,playerPp:[...battle.player.pp],opponentPp:[...battle.opponent.pp],log:[...battle.log]};
 try{playEnemyOnlyTurn(battle,enemy[Math.floor(Math.random()*enemy.length)].index);renderBattle();for(const event of battle.turnEvents){await battleWait(350);if(generation!==battleGeneration)return;battleView=event;renderBattle();await battleWait(550)}}
 finally{if(generation===battleGeneration){battleBusy=false;battleView=null;syncWildPokemon();renderBattle()}}
}
async function usePotionInBattle(){
 if(!battle||battleBusy||battle.finished||!['wild','trainer'].includes(battleKind))return;
 const result=useBattlePotion(battle,engine.inventory,{removeItem:(id,quantity)=>engine.removeItem(id,quantity)});
 if(!result.ok){rewardNotice(result.reason);renderBattle();return;}
 // Persist the healed Pokémon immediately, even if the opposing attack knocks it out.
 syncWildPokemon();autoSave();
 const enemy=availableMoves(battle.opponent).filter(m=>m.pp>0);
 if(!enemy.length){renderBattle();return;}
 battleBusy=true;const generation=++battleGeneration;
 battleView={playerHp:battle.player.pokemon.currentHp,opponentHp:battle.opponent.pokemon.currentHp,playerPp:[...battle.player.pp],opponentPp:[...battle.opponent.pp],log:[...battle.log]};
 try{playEnemyOnlyTurn(battle,enemy[Math.floor(Math.random()*enemy.length)].index);renderBattle();for(const event of battle.turnEvents){await battleWait(350);if(generation!==battleGeneration)return;battleView=event;renderBattle();await battleWait(550)}}
 finally{if(generation===battleGeneration){battleBusy=false;battleView=null;syncWildPokemon();renderBattle()}}
}
async function useRemedyInBattle(id){
 if(!battle||battleBusy||battle.finished||!['wild','trainer'].includes(battleKind))return;
 const result=useBattleRemedy(battle,engine.inventory,id,{removeItem:(item,quantity)=>engine.removeItem(item,quantity)});
 if(!result.ok){rewardNotice(result.reason);renderBattle();return;}
 document.querySelector('#battle-choices').replaceChildren();
 syncWildPokemon();autoSave();
 const enemy=availableMoves(battle.opponent).filter(m=>m.pp>0);
 if(!enemy.length){renderBattle();return;}
 battleBusy=true;const generation=++battleGeneration;
 battleView={playerHp:battle.player.pokemon.currentHp,opponentHp:battle.opponent.pokemon.currentHp,playerPp:[...battle.player.pp],opponentPp:[...battle.opponent.pp],log:[...battle.log]};
 try{playEnemyOnlyTurn(battle,enemy[Math.floor(Math.random()*enemy.length)].index);renderBattle();for(const event of battle.turnEvents){await battleWait(350);if(generation!==battleGeneration)return;battleView=event;renderBattle();await battleWait(550)}}
 finally{if(generation===battleGeneration){battleBusy=false;battleView=null;syncWildPokemon();autoSave();renderBattle()}}
}
async function useRecoveryInBattle(id,index){
 if(!battle||battleBusy||battle.finished||!['wild','trainer'].includes(battleKind))return;
 const result=useBattleRecovery(battle,engine.state.team,wildTeamIndex,index,engine.inventory,id,{removeItem:(item,quantity)=>engine.removeItem(item,quantity),fighters:battleFighters});
 if(!result.ok){rewardNotice(result.reason);renderBattle();return;}
 document.querySelector('#battle-choices').replaceChildren();syncWildPokemon();autoSave();
 const enemy=availableMoves(battle.opponent).filter(m=>m.pp>0);if(!enemy.length){renderBattle();return;}
 battleBusy=true;const generation=++battleGeneration;
 battleView={playerHp:battle.player.pokemon.currentHp,opponentHp:battle.opponent.pokemon.currentHp,playerPp:[...battle.player.pp],opponentPp:[...battle.opponent.pp],log:[...battle.log]};
 try{playEnemyOnlyTurn(battle,enemy[Math.floor(Math.random()*enemy.length)].index);renderBattle();for(const event of battle.turnEvents){await battleWait(350);if(generation!==battleGeneration)return;battleView=event;renderBattle();await battleWait(550)}}
 finally{if(generation===battleGeneration){battleBusy=false;battleView=null;syncWildPokemon();autoSave();renderBattle()}}
}
async function usePpInBattle(id,targetIndex,moveIndex){
 if(!battle||battleBusy||battle.finished||!['wild','trainer'].includes(battleKind))return;
 const result=useBattlePpItem(battle,engine.state.team,wildTeamIndex,targetIndex,moveIndex,engine.inventory,id,{removeItem:(item,quantity)=>engine.removeItem(item,quantity),fighters:battleFighters});
 if(!result.ok){rewardNotice(result.reason);renderBattle();return}
 document.querySelector('#battle-choices').replaceChildren();syncWildPokemon();autoSave();
 const enemy=availableMoves(battle.opponent).filter(m=>m.pp>0);if(!enemy.length){renderBattle();return}
 battleBusy=true;const generation=++battleGeneration;
 battleView={playerHp:battle.player.pokemon.currentHp,opponentHp:battle.opponent.pokemon.currentHp,playerPp:[...battle.player.pp],opponentPp:[...battle.opponent.pp],log:[...battle.log]};
 try{playEnemyOnlyTurn(battle,enemy[Math.floor(Math.random()*enemy.length)].index);renderBattle();for(const event of battle.turnEvents){await battleWait(350);if(generation!==battleGeneration)return;battleView=event;renderBattle();await battleWait(550)}}
 finally{if(generation===battleGeneration){battleBusy=false;battleView=null;syncWildPokemon();autoSave();renderBattle()}}
}
document.querySelector('#battle-pp').addEventListener('click',()=>{
 if(!battle||battleBusy||battle.finished)return;
 const panel=document.querySelector('#battle-choices');panel.replaceChildren();
 const heading=document.createElement('p');heading.textContent='AP-Heilmittel, Pokémon und Attacke auswählen:';panel.append(heading);
 for(const item of PP_ITEMS){const count=engine.inventory.find(i=>i.id===item.id)?.quantity||0;if(!count)continue;
  engine.state.team.forEach((member,index)=>{const pokemon=index===wildTeamIndex?battle.player.pokemon:member;const pp=index===wildTeamIndex?battle.player.pp:currentPp(pokemon);const maximum=maxPp(pokemon);
   const indices=item.all?[0]:pokemon.moves.map((_,i)=>i);
   for(const moveIndex of indices){const eligible=pokemon.currentHp>0&&(item.all?pp.some((v,i)=>v<maximum[i]):pp[moveIndex]<maximum[moveIndex]);
    const button=document.createElement('button');button.type='button';button.textContent=`${item.name} × ${count} → #${pokemon.speciesId}${item.all?' (alle Attacken)':` · ${getMove(pokemon.moves[moveIndex])?.de||'Attacke'} ${pp[moveIndex]}/${maximum[moveIndex]} AP`}`;button.disabled=!eligible;button.addEventListener('click',()=>void usePpInBattle(item.id,index,moveIndex));panel.append(button)
   }
  });
 }
 const cancel=document.createElement('button');cancel.type='button';cancel.textContent='Abbrechen';cancel.addEventListener('click',()=>panel.replaceChildren());panel.append(cancel);
});
document.querySelector('#battle-recovery').addEventListener('click',()=>{
 if(!battle||battleBusy||battle.finished)return;
 const panel=document.querySelector('#battle-choices');panel.replaceChildren();
 const heading=document.createElement('p');heading.textContent='Heilmittel und Ziel auswählen:';panel.append(heading);
 for(const [id,label] of [[REVIVE_ITEM,'Beleber'],[FULL_RESTORE_ITEM,'Top-Genesung']]){
  const count=engine.inventory.find(i=>i.id===id)?.quantity||0;if(!count)continue;
  for(let i=0;i<engine.state.team.length;i++){const p=i===wildTeamIndex?battle.player.pokemon:engine.state.team[i];
   const usable=id===REVIVE_ITEM?p.currentHp===0:p.currentHp>0&&(p.currentHp<p.stats.hp||(p.status&&p.status!=='healthy'));
   const button=document.createElement('button');button.type='button';button.textContent=`${label} × ${count} → #${p.speciesId} (KP ${p.currentHp}/${p.stats.hp})`;button.disabled=!usable;button.addEventListener('click',()=>void useRecoveryInBattle(id,i));panel.append(button);
  }
 }
 const cancel=document.createElement('button');cancel.type='button';cancel.textContent='Abbrechen';cancel.addEventListener('click',()=>panel.replaceChildren());panel.append(cancel);
});
document.querySelector('#battle-remedy').addEventListener('click',()=>{
 if(!battle||battleBusy||battle.finished)return;
 const panel=document.querySelector('#battle-choices');panel.replaceChildren();
 const title=document.createElement('p');title.textContent='Statusheilmittel auswählen:';panel.append(title);
 for(const remedy of STATUS_REMEDIES){const count=engine.inventory.find(i=>i.id===remedy.id)?.quantity||0;if(!count)continue;const button=document.createElement('button');button.type='button';button.textContent=`${remedy.name} × ${count}`;button.disabled=battle.player.pokemon.status!==remedy.status;button.addEventListener('click',()=>void useRemedyInBattle(remedy.id));panel.append(button)}
 const cancel=document.createElement('button');cancel.type='button';cancel.textContent='Abbrechen';cancel.addEventListener('click',()=>panel.replaceChildren());panel.append(cancel);
});
document.querySelector('#battle-potion').addEventListener('click',()=>void usePotionInBattle());
document.querySelector('#battle-switch').addEventListener('click',()=>void chooseBattleSwitch());
document.querySelector('#battle-catch').addEventListener('click',()=>void throwPokeball());
document.querySelector('#battle-escape').addEventListener('click',()=>{if(!['wild','trainer'].includes(battleKind)||battleBusy||battle.finished)return;if(battleKind==='trainer'){battle.finished=true;battle.winner='escape';battle.log=['Du gibst den Trainerkampf auf. Keine Belohnung.'];rewardDone=true;syncWildPokemon();renderBattle();return}escapeAttempts++;if(tryEscape(battle.player.pokemon.stats.speed,battle.opponent.pokemon.stats.speed,escapeAttempts)){battle.finished=true;battle.winner='escape';battle.log=['Die Flucht ist gelungen.'];rewardDone=true;syncWildPokemon();renderBattle()}else{battle.log=['Flucht fehlgeschlagen! Der Gegner greift an.'];const choices=availableMoves(battle.player).filter(m=>m.pp>0);if(choices.length)void executeBattleTurn(choices[0].index);else renderBattle()}});
document.querySelector('#battle-open').addEventListener('click',startTestBattle);document.querySelector('#battle-restart').addEventListener('click',startTestBattle);document.querySelector('#battle-close').addEventListener('click',closeBattle);

draw();requestAnimationFrame(frame);
if(new URLSearchParams(location.search).has('selftest')){const e=new Engine();let ok=true;try{e.state.y=6;e.step('down');if(e.state.mapId!=='ground')throw Error('Treppe');e.load(e.save())}catch(err){ok=false;console.error(err)}document.body.dataset.selftest=ok?'pass':'fail'}

// Battle arena shares the same game frame instead of appearing below the map.
const sharedGameFrame=document.querySelector('#game-frame');
sharedGameFrame.append(battlePanel);
const fullscreenButton=document.querySelector('#fullscreen-toggle');
fullscreenButton.addEventListener('click',async()=>{
 try{
  if(document.fullscreenElement)await document.exitFullscreen();
  else await document.querySelector('main').requestFullscreen();
 }catch(error){notice.textContent='Vollbild wird von diesem Browser nicht unterstützt.';}
});
document.addEventListener('fullscreenchange',()=>{
 const active=Boolean(document.fullscreenElement);
 fullscreenButton.textContent=active?'⛶ Vollbild beenden':'⛶ Vollbild';
 fullscreenButton.setAttribute('aria-pressed',String(active));
});
