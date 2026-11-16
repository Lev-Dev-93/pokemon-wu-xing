import {forestEncounterReadiness,forestBattleCanStart} from './forest-story-battle.js';
import {canLeaveFarm,canEnterRoute1,canExploreBeyondRoute1} from './story-guards.js';
import {questJournal,questSummary,reconcileQuestLog,validateQuestLog} from './quests.js';
import {stoneEvolutionOptions,evolveWithStone,friendshipEvolutionOptions,evolveWithFriendship} from './progression.js';
import {currentTimeOfDay} from './day-night.js';
import {ppItem,restorePp} from './pp-items.js';
import {canPurchase,shopItem} from './shop.js';
import {POTION_ITEM, usePotion, healPartyAtStation, useStatusRemedy, remedyFor, REVIVE_ITEM, FULL_RESTORE_ITEM, useRevive, useFullRestore} from './healing.js';
import {rollEncounter} from './wild-encounters.js';
import {POKEBALL_ITEM} from './capture.js';
import {validateTeam,addToTeam,reorderTeam,removeFromTeam,healTeam,createPokemon} from './team.js';
import {findStarter} from './starter-data.js';
import {birthdayPreview,storyStage} from './prologue.js';
import {STORY_EVENT_IDS,eventStatus,validateStoryFlags,applyStoryEvent,nextStoryEvent} from './story-events.js';
import {maps,start,canMove,tileHeight,inside,npcs,objects} from './maps.js';
import {RIFT_SCENE,riftSceneReady} from './rift-scene.js';
import {ABSOL_SCENE,absolSceneReady} from './absol-scene.js';
import {PROFESSOR_SCENE,professorSceneReady} from './professor-scene.js';
const dirs={up:[0,-1],down:[0,1],left:[-1,0],right:[1,0]};
export function migrateLegacyMap(data){const s=structuredClone(data.state);if(data.schema<=6&&s.mapId==='route2'){s.mapId='waldrand';s.flags={...(s.flags||{}),visitedWaldrand:true};}if(s.mapId==='market'){s.mapId='village';s.x=18;s.y=9;s.elevation=0;}return s;}
export class Engine{
 constructor({clock=()=>new Date(),rng=Math.random}={}){this.clock=clock;this.rng=rng;this.state=structuredClone(start);this.state.questLog=[];this.mode='exploration';this.dialogue=null;this.message='';this.lastEvent=null;this.pendingWild=null;this.pendingTrainer=null;}
 get map(){return maps[this.state.mapId]}
 get forestEncounterReadiness(){return forestEncounterReadiness(this.state)}
 canPrepareForestBattle(draft,approved=false){return this.mode==='exploration'&&forestBattleCanStart(this.state,draft,approved)}
 get quests(){return questJournal(this.state.flags)}
 get questSummary(){return questSummary(this.state.flags)}
 reset(){this.state=structuredClone(start);this.state.questLog=[];this.mode='exploration';this.dialogue=null;this.message='';this.lastEvent=null;this.pendingWild=null;this.pendingTrainer=null;}
 get characters(){return npcs[this.state.mapId]||[]}
 get items(){return objects[this.state.mapId]||[]}
 step(direction){if(this.mode!=='exploration'||!dirs[direction])return false;this.state.facing=direction;const [dx,dy]=dirs[direction],{x,y}=this.state,nx=x+dx,ny=y+dy;
 if(this.characters.some(n=>n.x===nx&&n.y===ny)||!canMove(this.map,x,y,nx,ny))return false;
 const destination=this.map.portals.find(q=>q.x===nx&&q.y===ny);if(this.state.mapId==='yard'&&destination?.target==='village'&&!canLeaveFarm(this.state.flags)){this.message='Du kannst den Züchterhof erst verlassen, wenn du dein Ei erhalten hast.';return false;}if(['route2','waldrand','beerendorf','brook'].includes(destination?.target)&&!canExploreBeyondRoute1(this.state.flags)){this.message='Erst muss dein Starter-Ei schlüpfen.';return false;}if(destination?.target==='route1'&&!canEnterRoute1(this.state.flags)){this.message='Der Professor-Ausflug muss zuerst abgeschlossen werden.';return false;}
 this.state.x=nx;this.state.y=ny;this.state.elevation=tileHeight(this.map,nx,ny);this.state.steps++;if(this.state.steps%128===0)for(const p of this.state.team){p.friendship=Math.min(255,(p.friendship??70)+1)}this.lastEvent='step';
 const portal=this.map.portals.find(q=>q.x===nx&&q.y===ny);if(portal){if(portal.target==='route1'&&!canEnterRoute1(this.state.flags)){this.message='Der Professor-Ausflug muss zuerst abgeschlossen werden.';return false;}this.transition(portal);}else{this.message='';this.pendingWild=rollEncounter({mapId:this.state.mapId,x:nx,y:ny,hatched:this.state.flags.route1_hatched,hasUsablePokemon:this.state.team.some(p=>p.currentHp>0),timeOfDay:currentTimeOfDay(this.clock()),rng:this.rng});if(this.pendingWild)this.lastEvent='wildEncounter';}return true;}
 transition(portal){const dest=maps[portal.target];if(!dest||!inside(dest,portal.tx,portal.ty)||dest.walls.has(`${portal.tx},${portal.ty}`)|| (npcs[dest.id]||[]).some(n=>n.x===portal.tx&&n.y===portal.ty))throw Error('Ungültiger Portal-Spawn');
 const source=this.state.mapId;this.state.returns[`${source}->${portal.target}`]={x:this.state.x,y:this.state.y};this.state.mapId=portal.target;this.state.x=portal.tx;this.state.y=portal.ty;this.state.elevation=tileHeight(dest,portal.tx,portal.ty);if(dest.id==='yard')this.setFlag('visitedYard',true);if(dest.id==='village')this.setFlag('visitedVillage',true);if(dest.id==='village_home')this.setFlag('visitedVillageHome',true);if(dest.id==='study')this.setFlag('visitedStudy',true);if(dest.id==='route2')this.setFlag('visitedRoute2',true);if(dest.id==='beerendorf')this.setFlag('visitedBeerendorf',true);if(['beerendorf_werkstatt','beerendorf_haus','beerendorf_haus2','beerendorf_wohnhaus'].includes(dest.id))this.setFlag('visitedBeerendorf',true);if(dest.id==='waldrand')this.setFlag('visitedWaldrand',true);if(dest.id==='brook')this.setFlag('visitedBrook',true);if(dest.id==='route1'){this.setFlag('visitedRoute1',true);this.beginHatchScene();}this.message=portal.kind==='stairs'?'Treppe benutzt':'Bereich gewechselt';this.lastEvent='transition';}
 interact(){if(this.mode==='dialogue')return this.advanceDialogue();const [dx,dy]=dirs[this.state.facing];const x=this.state.x+dx,y=this.state.y+dy;
 const target=[...this.characters,...this.items].find(n=>n.x===x&&n.y===y);if(!target){this.message='Hier gibt es nichts zu untersuchen.';return false;}
 if(target.id==='route1_trainer'&&this.beginTrainerChallenge())return true;
 if(target.id==='merchant'){if(!this.state.flags.route1_hatched){this.message='Der kleine Laden öffnet für dich nach dem Schlüpfen deines Starters.';return true;}this.lastEvent='shopOpened';this.message='Willkommen im Dorfladen!';return true;}
 if(target.id==='breeder_a'&&this.state.flags.route1_hatched){this.healAtStation();return true;}
 if(target.id==='herbal_witch'){if(!this.state.flags.route1_hatched){this.message='Komm mit deinem Pokémon-Team wieder.';return true;}const changed=healPartyAtStation(this.state.team);this.message=changed?'Die Kräuterhexe hat dein Pokémon-Team vollständig geheilt.':'Deine Pokémon sind bereits gesund.';this.lastEvent='stationHealed';return true;}
 if(target.id==='pokemon_pc'){if(!this.state.flags.route1_hatched){this.message='Der Pokémon-PC wird nach dem Schlüpfen deines Starters freigeschaltet.';return true;}this.lastEvent='storageOpened';this.message='Pokémon-PC geöffnet.';return true;}
 if(target.id==='supply_box'){this.collectSupplies();return true;}
 if(target.id==='rival'&&this.beginAbsolScene())return true;
 if(target.id==='professor'&&this.beginProfessorScene())return true;
 const pages=this.dialogueFor(target);this.dialogue={id:target.id,name:target.name,pages,index:0};if(this.characters.includes(target))target.facing=({up:'down',down:'up',left:'right',right:'left'})[this.state.facing];this.mode='dialogue';this.message='';return true;}
 advanceDialogue(){if(!this.dialogue)return false;if(++this.dialogue.index<this.dialogue.pages.length)return true;
 const id=this.dialogue.id;this.lastEvent=null;if(id==='rift_scene'){if(!this.completeStoryEvent('rift_closed'))throw Error('Dimensionsereignis kann nicht abgeschlossen werden');this.lastEvent='riftSceneFinished';}if(id==='absol_scene'){if(!this.completeStoryEvent('rival_absol'))throw Error('Absol-Ereignis kann nicht abgeschlossen werden');this.lastEvent='absolSceneFinished';}if(id==='route1_hatch_scene'){if(!this.finishHatching())throw Error('Schlüpfen fehlgeschlagen');this.lastEvent='route1Hatched';}if(id==='professor_demo_scene'){if(!this.completeStoryEvent('professor_demo'))throw Error('Professor-Demonstration kann nicht abgeschlossen werden');this.lastEvent='professorDemoFinished';}if(id==='parents_report'){this.setFlag('parents_briefed',true);this.lastEvent='parentsReportFinished';}if(id==='birthday_preview')this.lastEvent='birthdayPreviewFinished';if(id==='starter_wish')this.lastEvent='starterWishFinished';if(id==='breeder_a')this.setFlag('spokenToBreederA',true);if(id==='breeder_b')this.setFlag('spokenToBreederB',true);if(id==='villager')this.setFlag('spokenToVillager',true);if(id==='rival')this.setFlag('spokenToRival',true);if(id==='professor')this.setFlag('spokenToProfessor',true);if(id==='resident')this.setFlag('spokenToResident',true);
 this.dialogue=null;this.mode='exploration';if(!['birthdayPreviewFinished','starterWishFinished','riftSceneFinished','absolSceneFinished','parentsReportFinished','professorDemoFinished','route1Hatched'].includes(this.lastEvent))this.lastEvent='dialogueFinished';return true;}
 beginTrainerChallenge(){if(this.state.mapId!=='route1'||!this.state.flags.route1_hatched)return false;if(this.state.flags.route1TrainerDefeated){this.dialogue={id:'trainer_after',name:'Junger Trainer',pages:['Das war ein guter Kampf! Viel Erfolg auf deiner Reise.'],index:0};this.mode='dialogue';return true;}if(!this.state.team.some(p=>p.currentHp>0)){this.message='Du brauchst ein kampffähiges Pokémon für den Trainerkampf.';return true;}this.pendingTrainer={id:'route1_trainer',speciesId:10,level:4,team:[{speciesId:10,level:4},{speciesId:16,level:5}]};this.lastEvent='trainerChallenge';this.message='Ein junger Trainer fordert dich heraus!';return true;}
 finishTrainerBattle(won){if(this.state.mapId!=='route1'||!this.state.flags.route1_hatched)return false;if(won&&!this.state.flags.route1TrainerDefeated){this.setFlag('route1TrainerDefeated',true);this.state.money=(this.state.money??0)+80;this.state.eventLog.push({type:'trainerPrize',trainer:'route1_trainer',amount:80});this.message='Trainer besiegt! Du erhältst 80 Pokédollar.';this.lastEvent='trainerDefeated';return true;}this.message='Der Trainer wartet auf einen neuen Versuch.';return false;}
 dialogueFor(target){if(target.id==='professor'&&this.state.flags.professor_demo)return ['Das schillernde Raupy ist wohlauf. Ich werde es für meine Forschung beobachten.','Dein Ei wird bald schlüpfen. Der Weg zur Route 1 wartet auf dich.'];if(target.id==='professor'&&this.state.flags.rival_absol)return ['Ich würde dich gern auf einen kurzen Forschungsausflug mitnehmen.','Sprich mich an, wenn du bereit bist.'];if(target.id==='rival'&&this.state.flags.rival_absol)return ['Absol ist jetzt an meiner Seite.','Ich werde weiter auf seine Reaktionen achten. Vielleicht haben wir Giratina missverstanden.'];if(target.id==='professor'&&this.state.flags.egg_received)return ['Du hast dein Ei erhalten. Bewahre es gut auf.','Wir sprechen über den Ausflug, wenn die Zeit gekommen ist.'];if(target.id==='rival'&&this.state.flags.egg_received)return ['Du hast also dein Ei bekommen!','Ich bin gespannt, was als Nächstes passiert.'];if(target.id==='breeder_a'&&this.state.flags.spokenToBreederA)return ['Wir haben vorhin schon gesprochen.','Du kannst dich jederzeit im Haus umsehen.'];if(target.id==='breeder_b'&&this.state.flags.visitedYard)return ['Du hast den Hof bereits erkundet.','Es gibt immer etwas Neues zu entdecken.'];return [...target.dialogue];}
 get nextStoryEvent(){return nextStoryEvent(this.state.flags)}
 get storyReadiness(){return eventStatus(this.state.flags,this.nextStoryEvent)}
 completeStoryEvent(id){if(!STORY_EVENT_IDS.includes(id))return false;const applied=applyStoryEvent(this.state,id);if(applied)reconcileQuestLog(this.state);return applied}
 setFlag(key,value){if(STORY_EVENT_IDS.includes(key))return false;if(!Object.hasOwn(start.flags,key))throw Error('Unbekanntes Ereignis-Flag');if(this.state.flags[key]===value)return false;this.state.flags[key]=value;reconcileQuestLog(this.state);this.state.eventLog??=[];this.state.eventLog.push({type:'flag',key,value});return true;}
 addItem(id,quantity=1){if(typeof id!=='string'||!id||!Number.isSafeInteger(quantity)||quantity<=0)throw Error('Ungültiger Gegenstand');this.state.inventory??=[];const found=this.state.inventory.find(i=>i.id===id);if(found)found.quantity+=quantity;else this.state.inventory.push({id,quantity});return true;}
 removeItem(id,quantity=1){if(!Number.isSafeInteger(quantity)||quantity<=0)return false;const found=(this.state.inventory||[]).find(i=>i.id===id);if(!found||found.quantity<quantity)return false;found.quantity-=quantity;if(found.quantity===0)this.state.inventory=this.state.inventory.filter(i=>i!==found);return true;}
 buyItem(id,quantity=1){if(this.mode!=='exploration'||this.state.mapId!=='village'||!this.state.flags.route1_hatched)return false;if(!canPurchase(this.state,id,quantity))return false;const item=shopItem(id);const total=item.price*quantity;const existing=this.state.inventory.find(i=>i.id===id);if(existing&&existing.quantity>Number.MAX_SAFE_INTEGER-quantity)return false;this.state.money-=total;this.addItem(id,quantity);this.state.eventLog.push({type:'shopPurchase',item:id,quantity,total});this.message=`${quantity} × ${item.name} gekauft für ${total} Pokédollar.`;this.lastEvent='shopPurchase';return true;}
 get team(){return structuredClone(this.state.team||[])}
 get storage(){return structuredClone(this.state.storage||[])}
 addPokemon(p){this.state.team??=[];return addToTeam(this.state.team,p)}
 movePokemon(from,to){if(this.mode!=='exploration')return false;const changed=reorderTeam(this.state.team,from,to);if(changed){this.message='Die Teamreihenfolge wurde geändert.';this.lastEvent='teamReordered';}return changed}
 canAccessStorage(){return this.mode==='exploration'&&this.state.mapId==='ground'&&this.state.flags.route1_hatched}
 depositPokemon(index){if(!this.canAccessStorage()||!validateTeam(this.state.team)||!Number.isInteger(index)||index<0||index>=this.state.team.length||this.state.team.length<=1||this.state.storage.length>=500)return false;this.state.storage.push(this.state.team.splice(index,1)[0]);this.message='Pokémon im Lager abgelegt.';this.lastEvent='pokemonDeposited';return true}
 withdrawPokemon(index){if(!this.canAccessStorage()||!Number.isInteger(index)||index<0||index>=this.state.storage.length||this.state.team.length>=6)return false;const pokemon=this.state.storage[index];if(!addToTeam(this.state.team,pokemon))return false;this.state.storage.splice(index,1);this.message='Pokémon ins Team aufgenommen.';this.lastEvent='pokemonWithdrawn';return true}
 recoverFromBlackout(){
  if(!this.state.flags.route1_hatched||!Array.isArray(this.state.team)||this.state.team.some(p=>p.currentHp>0))return false;
  healPartyAtStation(this.state.team);
  this.state.mapId='ground';this.state.x=5;this.state.y=6;this.state.elevation=0;this.state.facing='down';
  this.state.eventLog.push({type:'blackout',destination:'ground'});
  this.message='Deine Pokémon wurden von deiner Adoptivmutter versorgt.';
  this.lastEvent='blackoutRecovered';return true;
 }
 healPokemon(){return healTeam(this.state.team)}
 healAtStation(){if(this.mode!=='exploration'||this.state.mapId!=='ground'||!this.state.flags.route1_hatched)return false;const changed=healPartyAtStation(this.state.team);this.message=changed?'Dein Pokémon-Team wurde vollständig versorgt.':'Dein Pokémon-Team ist bereits gesund.';this.lastEvent='stationHealed';return true;}
 collectSupplies(){if(this.mode!=='exploration'||this.state.mapId!=='ground'||!this.state.flags.route1_hatched){this.message='Die Vorräte werden erst nach dem Schlüpfen deines Starters ausgegeben.';return false;}if(this.state.flags.suppliesCollected){this.message='Du hast die Vorräte bereits abgeholt.';return false;}this.addItem(POTION_ITEM,3);this.setFlag('suppliesCollected',true);this.message='Du erhältst 3 Tränke für deine Reise.';this.lastEvent='suppliesCollected';return true;}
 usePotionOn(index){if(this.mode!=='exploration'||!Number.isInteger(index)||index<0||index>=this.state.team.length)return false;if(!this.inventory.some(i=>i.id===POTION_ITEM&&i.quantity>0))return false;if(!usePotion(this.state.team[index]))return false;this.removeItem(POTION_ITEM,1);this.message='Ein Trank wurde verwendet. 20 KP wurden maximal wiederhergestellt.';this.lastEvent='potionUsed';return true;}
 useRecoveryOn(id,index){
  if(this.mode!=='exploration'||!Number.isInteger(index)||index<0||index>=this.state.team.length||![REVIVE_ITEM,FULL_RESTORE_ITEM].includes(id))return false;
  if(!this.inventory.some(i=>i.id===id&&i.quantity>0))return false;
  const pokemon=this.state.team[index];const apply=id===REVIVE_ITEM?useRevive:useFullRestore;
  if(!apply(pokemon))return false;
  this.removeItem(id,1);this.message=id===REVIVE_ITEM?'Dein Pokémon wurde wiederbelebt.':'Dein Pokémon ist vollständig genesen.';this.lastEvent='recoveryUsed';return true;
 }
 usePpItemOn(id,index,moveIndex=0){if(this.mode!=='exploration'||!Number.isInteger(index)||index<0||index>=this.state.team.length||!ppItem(id)||!this.inventory.some(i=>i.id===id&&i.quantity>0))return false;if(!restorePp(this.state.team[index],id,moveIndex))return false;this.removeItem(id,1);this.message=`${ppItem(id).name} wurde verwendet.`;this.lastEvent='ppRestored';return true;}
 useRemedyOn(id,index){if(this.mode!=='exploration'||!Number.isInteger(index)||index<0||index>=this.state.team.length||!remedyFor(id))return false;if(!this.inventory.some(i=>i.id===id&&i.quantity>0))return false;if(!useStatusRemedy(this.state.team[index],id))return false;this.removeItem(id,1);this.message=`${remedyFor(id).name} wurde verwendet.`;this.lastEvent='remedyUsed';return true;}
 useEvolutionStoneOn(stoneId,index,target){
  if(this.mode!=='exploration'||!Number.isInteger(index)||index<0||index>=this.state.team.length)return false;
  if(!this.inventory.some(i=>i.id===stoneId&&i.quantity>0))return false;
  const pokemon=this.state.team[index];if(!stoneEvolutionOptions(pokemon,stoneId).some(e=>e.to===target))return false;
  evolveWithStone(pokemon,stoneId,target);this.removeItem(stoneId);this.lastEvent='stoneEvolution';this.message=`Pokémon entwickelt sich zu #${target}!`;return true;
 }
 friendshipOptions(index){if(!Number.isInteger(index)||index<0||index>=this.state.team.length)return [];return friendshipEvolutionOptions(this.state.team[index],currentTimeOfDay(this.clock()));}
 evolveFriendshipOn(index,target){
  if(this.mode!=='exploration'||!this.friendshipOptions(index).some(e=>e.to===target))return false;
  evolveWithFriendship(this.state.team[index],target,currentTimeOfDay(this.clock()));this.message=`Pokémon entwickelt sich zu #${target}!`;this.lastEvent='friendshipEvolution';return true;
 }
 get inventory(){return (this.state.inventory||[]).map(i=>({...i}));}
 catchPokemon(pokemon){if(!validateTeam([pokemon]))return false;if(this.state.team.length<6)return this.addPokemon(pokemon);if(this.state.storage.length>=500)return false;this.state.storage.push(structuredClone(pokemon));return true;}
 get prologueStage(){return storyStage(this.state.flags)}
 beginBirthdayPreview(){if(this.mode!=='exploration'||this.state.mapId!=='ground'||this.state.flags.egg_received){this.message='Dein Starter-Ei wurde bereits vergeben.';return false;}if(!this.state.flags.spokenToBreederA||!this.state.flags.spokenToBreederB){this.message='Sprich zuerst mit beiden Züchtern.';return false;}const preview=birthdayPreview(this.state.flags);this.completeStoryEvent('birthday_wish_pending');this.dialogue={id:'birthday_preview',name:preview.title,pages:preview.pages,index:0};this.mode='dialogue';this.message='';return true;}
 beginRiftScene(){if(this.mode!=='exploration'||!riftSceneReady(this.state.flags))return false;this.dialogue={id:RIFT_SCENE.id,name:RIFT_SCENE.name,pages:[...RIFT_SCENE.pages],index:0};this.mode='dialogue';this.message='';this.lastEvent='riftSceneStarted';return true;}
 beginParentsReport(){if(this.mode!=='exploration'||this.state.mapId!=='ground'||!this.state.flags.rival_absol||this.state.flags.parents_briefed)return false;this.dialogue={id:'parents_report',name:'Deine Adoptiveltern',pages:['Du erzählst deinen Eltern vom Erdbeben, Giratina und den verschwundenen Rissen.','Du berichtest auch von Absol, das nun deinen Kindheitsfreund begleitet.','Deine Eltern hören aufmerksam zu. Sie sind erleichtert, dass du wohlauf bist.','Adoptivmutter: Geh bitte zum Professor. Er kann dir vielleicht erklären, was heute geschehen ist.'],index:0};this.mode='dialogue';this.lastEvent='parentsReportStarted';return true;}
 beginAbsolScene(){if(this.mode!=='exploration'||this.state.mapId!=='village'||!absolSceneReady(this.state.flags))return false;this.dialogue={id:ABSOL_SCENE.id,name:ABSOL_SCENE.name,pages:[...ABSOL_SCENE.pages],index:0};this.mode='dialogue';this.message='';this.lastEvent='absolSceneStarted';return true;}
 beginProfessorScene(){if(this.mode!=='exploration'||!['village','study'].includes(this.state.mapId)||!professorSceneReady(this.state.flags))return false;this.dialogue={id:PROFESSOR_SCENE.id,name:PROFESSOR_SCENE.name,pages:[...PROFESSOR_SCENE.pages],index:0};this.mode='dialogue';this.message='';this.lastEvent='professorDemoStarted';return true;}
 beginHatchScene(){
  if(this.mode!=='exploration'||this.state.mapId!=='route1'||!this.state.flags.professor_demo||this.state.flags.route1_hatched||!this.state.starterEgg||this.state.starterEgg.hatched)return false;
  const name=this.starterWish?.name||'dein Pokémon';
  this.dialogue={id:'route1_hatch_scene',name:'Ein neues Abenteuer',pages:['Auf Route 1 beginnt das Ei in deinen Händen plötzlich zu wackeln.','Ein helles Licht dringt aus der Schale. Das Ei schlüpft!',`${name} ist geschlüpft! Es ist auf Level 5 und bereit, dich zu begleiten.`],index:0};
  this.mode='dialogue';this.lastEvent='route1HatchStarted';return true;
 }
 finishHatching(){
  if(this.state.flags.route1_hatched||!this.state.starterEgg||this.state.starterEgg.hatched||!this.state.flags.professor_demo)return false;
  const pokemon=createPokemon(this.state.starterEgg.speciesId,{level:5,ivs:[31,31,31,31,31,31]});
  if(this.state.team.length<6){if(!this.addPokemon(pokemon))return false;}
  else{if(this.state.storage.length>=500)return false;this.state.storage.push(pokemon);}
  if(!this.completeStoryEvent('route1_hatched'))throw Error('Storyfolge ungültig');
  this.state.starterEgg.hatched=true;
  this.addItem(POKEBALL_ITEM,5);
  this.state.eventLog.push({type:'hatch',speciesId:pokemon.speciesId,level:5});return true;
 }
 get starterWish(){return findStarter(this.state.starterWishSpeciesId)}
 chooseStarter(id){
  if(this.mode!=='exploration'||this.state.mapId!=='ground')return false;
  if(!this.state.flags.spokenToBreederA||!this.state.flags.spokenToBreederB)return false;
  if(this.state.flags.egg_received||this.state.starterEgg)return false;
  const species=findStarter(id);if(!species)return false;
  this.state.starterWishSpeciesId=species.id;
  this.state.starterEgg={speciesId:species.id,received:true,hatched:false};
  this.completeStoryEvent('birthday_wish_pending');
  if(!this.completeStoryEvent('egg_received'))throw Error('Ungültige Story-Reihenfolge');
  this.state.eventLog.push({type:'starterWish',speciesId:species.id});
  this.dialogue={id:'starter_wish',name:'Geburtstagswunsch – technische Vorschau',pages:[`Du wünschst dir ${species.name}.`, `Du erhältst ein Ei für ${species.name}. Es ist noch kein Teammitglied.`, 'Plötzlich beginnt der Boden zu beben! Du musst zum Dorfplatz!'],index:0};
  this.mode='dialogue';this.message='';this.lastEvent='starterSelected';return true;
 }
 get journal(){const f=this.state.flags;const quests=this.questSummary;return {heading:'Reisetagebuch · Mu',description:`${quests.active.length} aktive · ${quests.completed.length} abgeschlossene · ${quests.locked.length} gesperrte Aufgaben (technische Quests; keine neue kanonische Handlung).`,quests,tasks:[{label:'Mit der Züchterin sprechen',done:!!f.spokenToBreederA},{label:'Mit dem Züchter sprechen',done:!!f.spokenToBreederB},{label:'Den Züchterhof betreten',done:!!f.visitedYard},{label:'Geburtstagsvorschau ansehen',done:!!f.birthday_wish_pending},{label:'Das Startdorf besuchen',done:!!f.visitedVillage},{label:'Mit den Dorfbewohnern sprechen',done:!!f.spokenToVillager},{label:'Den Kindheitsfreund treffen',done:!!f.spokenToRival},{label:'Den Professor kennenlernen',done:!!f.spokenToProfessor},{label:'Ein Dorfhaus betreten',done:!!f.visitedVillageHome},{label:'Das Arbeitszimmer besichtigen',done:!!f.visitedStudy},{label:'Mit dem Hausbewohner sprechen',done:!!f.spokenToResident},{label:'Starter-Ei erhalten',done:!!f.egg_received},{label:'Dimensionsereignis erlebt',done:!!f.rift_closed},{label:'Absol ist Partner des Kindheitsfreundes',done:!!f.rival_absol},{label:'Professor-Ausflug und schillerndes Raupy',done:!!f.professor_demo},{label:'Route 1 erreicht',done:!!f.visitedRoute1},{label:'Bach und Brücke überquert',done:!!f.visitedBrook},{label:'Alter Wald erreicht',done:!!f.visitedRoute2},{label:'Starter-Ei geschlüpft',done:!!f.route1_hatched},{label:'Trainer auf Route 1 besiegt',done:!!f.route1TrainerDefeated}]};}
 save(){reconcileQuestLog(this.state);return JSON.stringify({schema:7,state:this.state});}
 load(raw){const data=JSON.parse(raw);if(![1,2,3,4,5,6,7].includes(data.schema))throw Error('Unbekannte Speicherstand-Version');const s=migrateLegacyMap(data);
 if(s.mapId==='upper'){s.mapId='ground';s.x=10;s.y=2;s.elevation=0;}
 s.flags={...start.flags,...(s.flags||{})};if(!validateStoryFlags(s.flags))throw Error('Ungültige Story-Reihenfolge im Spielstand');s.money=s.money??0;if(!Number.isSafeInteger(s.money)||s.money<0||s.money>999999999)throw Error('Ungültiges Guthaben');s.inventory=Array.isArray(s.inventory)?s.inventory:[];s.eventLog=Array.isArray(s.eventLog)?s.eventLog:[];if(s.questLog!==undefined&&!validateQuestLog(s.questLog,s.flags))throw Error('Ungültige Questdaten');reconcileQuestLog(s);if(!s.inventory.every(i=>typeof i.id==='string'&&i.id.length>0&&Number.isSafeInteger(i.quantity)&&i.quantity>0))throw Error('Ungültiges Inventar');s.team=s.team??[];s.storage=s.storage??[];if(!validateTeam(s.team)||!Array.isArray(s.storage)||s.storage.length>500||!s.storage.every(p=>validateTeam([p])))throw Error('Ungültige Pokémon-Speicherdaten');s.starterWishSpeciesId=s.starterWishSpeciesId??null;s.starterEgg=s.starterEgg??null;
 if(s.starterWishSpeciesId!==null&&!findStarter(s.starterWishSpeciesId))throw Error('Ungültiger Starterwunsch');
 if(s.starterEgg!==null){if(!findStarter(s.starterEgg.speciesId)||s.starterEgg.speciesId!==s.starterWishSpeciesId||s.starterEgg.hatched!==!!s.flags.route1_hatched||s.starterEgg.received!==true||!s.flags.egg_received)throw Error('Ungültiges Starter-Ei');}
 if(s.flags.egg_received&&!s.starterEgg)throw Error('Ei-Flag ohne Ei');if(s.flags.route1_hatched&&!(s.team.concat(s.storage)).some(p=>p.speciesId===s.starterEgg.speciesId&&p.level>=5))throw Error('Geschlüpftes Starter-Pokémon fehlt');
 if(s.starterEgg&&s.team.some(p=>p.speciesId===s.starterEgg.speciesId)&&s.flags.route1_hatched===false){/* Species duplicates are legal; the egg is tracked separately. */}
 // Return positions are untrusted save data: retain only valid, known portal pairs.
 if(s.returns===null||typeof s.returns!=='object'||Array.isArray(s.returns))s.returns={};
 for(const [key,position] of Object.entries(s.returns)){
  const [from,to,...extra]=key.split('->');
  const source=maps[from];
  if(extra.length||!source||!maps[to]||!source.portals.some(portal=>portal.target===to)||!position||!Number.isInteger(position.x)||!Number.isInteger(position.y)||!inside(source,position.x,position.y)||source.walls.has(`${position.x},${position.y}`))delete s.returns[key];
 }

 const m=maps[s.mapId];if(!m||!Number.isInteger(s.x)||!Number.isInteger(s.y)||!inside(m,s.x,s.y)||m.walls.has(`${s.x},${s.y}`)||tileHeight(m,s.x,s.y)!==s.elevation||(npcs[s.mapId]||[]).some(n=>n.x===s.x&&n.y===s.y))throw Error('Ungültige gespeicherte Position');
 if(s.mapId==='brook'&&!s.flags.visitedBrook)throw Error('Bachübergang ohne Besuchs-Flag');
 if(s.mapId==='route2'&&!s.flags.visitedRoute2)throw Error('Alter Wald ohne Besuchs-Flag');
 if(s.mapId==='beerendorf'&&!s.flags.visitedBeerendorf)throw Error('Beerendorf ohne Besuchs-Flag');if(s.mapId==='waldrand'&&!s.flags.visitedWaldrand)throw Error('Waldrand ohne Besuchs-Flag');if(s.mapId==='route1'&&!s.flags.visitedRoute1)throw Error('Route 1 ohne Besuchs-Flag');
 if(['brook','waldrand','beerendorf','beerendorf_werkstatt','beerendorf_haus','beerendorf_haus2','beerendorf_wohnhaus','route2','forest_elder_house'].includes(s.mapId)&&!s.flags.route1_hatched)throw Error('Gebiet vor dem Schlüpfen des Starter-Eis');
 if(['route1','route2','waldrand','beerendorf','beerendorf_werkstatt','beerendorf_haus','beerendorf_haus2','beerendorf_wohnhaus','forest_elder_house','brook'].includes(s.mapId)&&!s.flags.professor_demo)throw Error('Route vor Professor-Ausflug');
 if(!dirs[s.facing]||!Number.isSafeInteger(s.steps)||s.steps<0)throw Error('Ungültige Spieldaten');this.state=s;this.pendingWild=null;this.pendingTrainer=null;this.dialogue=null;this.mode='exploration';this.lastEvent=null;this.message='Spielstand geladen';if(s.mapId==='route1'&&!s.flags.route1_hatched)this.beginHatchScene();}
}
