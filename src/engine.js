import {validateTeam,addToTeam,reorderTeam,removeFromTeam,healTeam,createPokemon} from './team.js';
import {findStarter} from './starter-data.js';
import {birthdayPreview,storyStage} from './prologue.js';
import {STORY_EVENT_IDS,eventStatus,validateStoryFlags,applyStoryEvent,nextStoryEvent} from './story-events.js';
import {maps,start,canMove,tileHeight,inside,npcs,objects} from './maps.js';
import {RIFT_SCENE,riftSceneReady} from './rift-scene.js';
import {ABSOL_SCENE,absolSceneReady} from './absol-scene.js';
import {PROFESSOR_SCENE,professorSceneReady} from './professor-scene.js';
const dirs={up:[0,-1],down:[0,1],left:[-1,0],right:[1,0]};
export class Engine{
 constructor(){this.state=structuredClone(start);this.mode='exploration';this.dialogue=null;this.message='';this.lastEvent=null;}
 get map(){return maps[this.state.mapId]}
 reset(){this.state=structuredClone(start);this.mode='exploration';this.dialogue=null;this.message='';this.lastEvent=null;}
 get characters(){return npcs[this.state.mapId]||[]}
 get items(){return objects[this.state.mapId]||[]}
 step(direction){if(this.mode!=='exploration'||!dirs[direction])return false;this.state.facing=direction;const [dx,dy]=dirs[direction],{x,y}=this.state,nx=x+dx,ny=y+dy;
 if(this.characters.some(n=>n.x===nx&&n.y===ny)||!canMove(this.map,x,y,nx,ny))return false;
 const destination=this.map.portals.find(q=>q.x===nx&&q.y===ny);if(destination?.target==='route1'&&!this.state.flags.professor_demo){this.message='Der Professor-Ausflug muss zuerst abgeschlossen werden.';return false;}
 this.state.x=nx;this.state.y=ny;this.state.elevation=tileHeight(this.map,nx,ny);this.state.steps++;this.lastEvent='step';
 const portal=this.map.portals.find(q=>q.x===nx&&q.y===ny);if(portal){if(portal.target==='route1'&&!this.state.flags.professor_demo){this.message='Der Professor-Ausflug muss zuerst abgeschlossen werden.';return false;}this.transition(portal);}else this.message='';return true;}
 transition(portal){const dest=maps[portal.target];if(!dest||!inside(dest,portal.tx,portal.ty)||dest.walls.has(`${portal.tx},${portal.ty}`)|| (npcs[dest.id]||[]).some(n=>n.x===portal.tx&&n.y===portal.ty))throw Error('Ungültiger Portal-Spawn');
 const source=this.state.mapId;this.state.returns[`${source}->${portal.target}`]={x:this.state.x,y:this.state.y};this.state.mapId=portal.target;this.state.x=portal.tx;this.state.y=portal.ty;this.state.elevation=tileHeight(dest,portal.tx,portal.ty);if(dest.id==='yard')this.setFlag('visitedYard',true);if(dest.id==='village')this.setFlag('visitedVillage',true);if(dest.id==='village_home')this.setFlag('visitedVillageHome',true);if(dest.id==='study')this.setFlag('visitedStudy',true);if(dest.id==='route1'){this.setFlag('visitedRoute1',true);this.beginHatchScene();}this.message=portal.kind==='stairs'?'Treppe benutzt':'Bereich gewechselt';this.lastEvent='transition';}
 interact(){if(this.mode==='dialogue')return this.advanceDialogue();const [dx,dy]=dirs[this.state.facing];const x=this.state.x+dx,y=this.state.y+dy;
 const target=[...this.characters,...this.items].find(n=>n.x===x&&n.y===y);if(!target){this.message='Hier gibt es nichts zu untersuchen.';return false;}
 if(target.id==='rival'&&this.beginAbsolScene())return true;
 if(target.id==='professor'&&this.beginProfessorScene())return true;
 const pages=this.dialogueFor(target);this.dialogue={id:target.id,name:target.name,pages,index:0};if(this.characters.includes(target))target.facing=({up:'down',down:'up',left:'right',right:'left'})[this.state.facing];this.mode='dialogue';this.message='';return true;}
 advanceDialogue(){if(!this.dialogue)return false;if(++this.dialogue.index<this.dialogue.pages.length)return true;
 const id=this.dialogue.id;if(id==='rift_scene'){if(!this.completeStoryEvent('rift_closed'))throw Error('Dimensionsereignis kann nicht abgeschlossen werden');this.lastEvent='riftSceneFinished';}if(id==='absol_scene'){if(!this.completeStoryEvent('rival_absol'))throw Error('Absol-Ereignis kann nicht abgeschlossen werden');this.lastEvent='absolSceneFinished';}if(id==='route1_hatch_scene'){if(!this.finishHatching())throw Error('Schlüpfen fehlgeschlagen');this.lastEvent='route1Hatched';}if(id==='professor_demo_scene'){if(!this.completeStoryEvent('professor_demo'))throw Error('Professor-Demonstration kann nicht abgeschlossen werden');this.lastEvent='professorDemoFinished';}if(id==='birthday_preview')this.lastEvent='birthdayPreviewFinished';if(id==='breeder_a')this.setFlag('spokenToBreederA',true);if(id==='breeder_b')this.setFlag('spokenToBreederB',true);if(id==='villager')this.setFlag('spokenToVillager',true);if(id==='rival')this.setFlag('spokenToRival',true);if(id==='professor')this.setFlag('spokenToProfessor',true);if(id==='resident')this.setFlag('spokenToResident',true);
 this.dialogue=null;this.mode='exploration';if(!['birthdayPreviewFinished','riftSceneFinished','absolSceneFinished','professorDemoFinished','route1Hatched'].includes(this.lastEvent))this.lastEvent='dialogueFinished';return true;}
 dialogueFor(target){if(target.id==='professor'&&this.state.flags.professor_demo)return ['Das schillernde Raupy ist wohlauf. Ich werde es für meine Forschung beobachten.','Dein Ei wird bald schlüpfen. Der Weg zur Route 1 wartet auf dich.'];if(target.id==='professor'&&this.state.flags.rival_absol)return ['Ich würde dich gern auf einen kurzen Forschungsausflug mitnehmen.','Sprich mich an, wenn du bereit bist.'];if(target.id==='rival'&&this.state.flags.rival_absol)return ['Absol ist jetzt an meiner Seite.','Ich werde weiter auf seine Reaktionen achten. Vielleicht haben wir Giratina missverstanden.'];if(target.id==='professor'&&this.state.flags.egg_received)return ['Du hast dein Ei erhalten. Bewahre es gut auf.','Wir sprechen über den Ausflug, wenn die Zeit gekommen ist.'];if(target.id==='rival'&&this.state.flags.egg_received)return ['Du hast also dein Ei bekommen!','Ich bin gespannt, was als Nächstes passiert.'];if(target.id==='breeder_a'&&this.state.flags.spokenToBreederA)return ['Wir haben vorhin schon gesprochen.','Du kannst dich jederzeit im Haus umsehen.'];if(target.id==='breeder_b'&&this.state.flags.visitedYard)return ['Du hast den Hof bereits erkundet.','Es gibt immer etwas Neues zu entdecken.'];return [...target.dialogue];}
 get nextStoryEvent(){return nextStoryEvent(this.state.flags)}
 get storyReadiness(){return eventStatus(this.state.flags,this.nextStoryEvent)}
 completeStoryEvent(id){if(!STORY_EVENT_IDS.includes(id))return false;return applyStoryEvent(this.state,id)}
 setFlag(key,value){if(STORY_EVENT_IDS.includes(key))return false;if(!Object.hasOwn(start.flags,key))throw Error('Unbekanntes Ereignis-Flag');if(this.state.flags[key]===value)return false;this.state.flags[key]=value;this.state.eventLog??=[];this.state.eventLog.push({type:'flag',key,value});return true;}
 addItem(id,quantity=1){if(typeof id!=='string'||!id||!Number.isSafeInteger(quantity)||quantity<=0)throw Error('Ungültiger Gegenstand');this.state.inventory??=[];const found=this.state.inventory.find(i=>i.id===id);if(found)found.quantity+=quantity;else this.state.inventory.push({id,quantity});return true;}
 removeItem(id,quantity=1){if(!Number.isSafeInteger(quantity)||quantity<=0)return false;const found=(this.state.inventory||[]).find(i=>i.id===id);if(!found||found.quantity<quantity)return false;found.quantity-=quantity;if(found.quantity===0)this.state.inventory=this.state.inventory.filter(i=>i!==found);return true;}
 get team(){return structuredClone(this.state.team||[])}
 get storage(){return structuredClone(this.state.storage||[])}
 addPokemon(p){this.state.team??=[];return addToTeam(this.state.team,p)}
 movePokemon(from,to){return reorderTeam(this.state.team,from,to)}
 depositPokemon(index){if(!validateTeam(this.state.team)||!Number.isInteger(index)||index<0||index>=this.state.team.length||this.state.storage.length>=500)return false;this.state.storage.push(this.state.team.splice(index,1)[0]);return true}
 withdrawPokemon(index){if(!Number.isInteger(index)||index<0||index>=this.state.storage.length||this.state.team.length>=6)return false;const pokemon=this.state.storage[index];if(!addToTeam(this.state.team,pokemon))return false;this.state.storage.splice(index,1);return true}
 healPokemon(){return healTeam(this.state.team)}
 get inventory(){return (this.state.inventory||[]).map(i=>({...i}));}
 get prologueStage(){return storyStage(this.state.flags)}
 beginBirthdayPreview(){if(this.mode!=='exploration'||this.state.mapId!=='ground'||this.state.flags.egg_received){this.message='Dein Starter-Ei wurde bereits vergeben.';return false;}if(!this.state.flags.spokenToBreederA||!this.state.flags.spokenToBreederB){this.message='Sprich zuerst mit beiden Züchtern.';return false;}const preview=birthdayPreview(this.state.flags);this.completeStoryEvent('birthday_wish_pending');this.dialogue={id:'birthday_preview',name:preview.title,pages:preview.pages,index:0};this.mode='dialogue';this.message='';return true;}
 beginRiftScene(){if(this.mode!=='exploration'||!riftSceneReady(this.state.flags))return false;this.dialogue={id:RIFT_SCENE.id,name:RIFT_SCENE.name,pages:[...RIFT_SCENE.pages],index:0};this.mode='dialogue';this.message='';this.lastEvent='riftSceneStarted';return true;}
 beginAbsolScene(){if(this.mode!=='exploration'||this.state.mapId!=='village'||!absolSceneReady(this.state.flags))return false;this.dialogue={id:ABSOL_SCENE.id,name:ABSOL_SCENE.name,pages:[...ABSOL_SCENE.pages],index:0};this.mode='dialogue';this.message='';this.lastEvent='absolSceneStarted';return true;}
 beginProfessorScene(){if(this.mode!=='exploration'||this.state.mapId!=='village'||!professorSceneReady(this.state.flags))return false;this.dialogue={id:PROFESSOR_SCENE.id,name:PROFESSOR_SCENE.name,pages:[...PROFESSOR_SCENE.pages],index:0};this.mode='dialogue';this.message='';this.lastEvent='professorDemoStarted';return true;}
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
  this.dialogue={id:'starter_wish',name:'Geburtstagswunsch – technische Vorschau',pages:[`Du wünschst dir ${species.name}.`, `Du erhältst ein Ei für ${species.name}. Es ist noch kein Teammitglied.`, 'Das unabhängige Dimensionsereignis folgt erst in einer späteren Version.'],index:0};
  this.mode='dialogue';this.message='';this.lastEvent='starterSelected';return true;
 }
 get journal(){const f=this.state.flags;return {heading:'Zuhause – Erkundung',description:'Technische Testaufgaben (noch keine kanonische Storymission).',tasks:[{label:'Mit der Züchterin sprechen',done:!!f.spokenToBreederA},{label:'Mit dem Züchter sprechen',done:!!f.spokenToBreederB},{label:'Den Züchterhof betreten',done:!!f.visitedYard},{label:'Geburtstagsvorschau ansehen',done:!!f.birthday_wish_pending},{label:'Das Startdorf besuchen',done:!!f.visitedVillage},{label:'Mit den Dorfbewohnern sprechen',done:!!f.spokenToVillager},{label:'Den Kindheitsfreund treffen',done:!!f.spokenToRival},{label:'Den Professor kennenlernen',done:!!f.spokenToProfessor},{label:'Ein Dorfhaus betreten',done:!!f.visitedVillageHome},{label:'Das Arbeitszimmer besichtigen',done:!!f.visitedStudy},{label:'Mit dem Hausbewohner sprechen',done:!!f.spokenToResident},{label:'Starter-Ei erhalten',done:!!f.egg_received},{label:'Dimensionsereignis erlebt',done:!!f.rift_closed},{label:'Absol ist Partner des Kindheitsfreundes',done:!!f.rival_absol},{label:'Professor-Ausflug und schillerndes Raupy',done:!!f.professor_demo},{label:'Route 1 erreicht',done:!!f.visitedRoute1},{label:'Starter-Ei geschlüpft',done:!!f.route1_hatched}]};}
 save(){return JSON.stringify({schema:6,state:this.state});}
 load(raw){const data=JSON.parse(raw);if(![1,2,3,4,5,6].includes(data.schema))throw Error('Unbekannte Speicherstand-Version');const s=structuredClone(data.state);
 if(s.mapId==='upper'){s.mapId='ground';s.x=10;s.y=2;s.elevation=0;}
 s.flags={...start.flags,...(s.flags||{})};if(!validateStoryFlags(s.flags))throw Error('Ungültige Story-Reihenfolge im Spielstand');s.inventory=Array.isArray(s.inventory)?s.inventory:[];s.eventLog=Array.isArray(s.eventLog)?s.eventLog:[];if(!s.inventory.every(i=>typeof i.id==='string'&&i.id.length>0&&Number.isSafeInteger(i.quantity)&&i.quantity>0))throw Error('Ungültiges Inventar');s.team=s.team??[];s.storage=s.storage??[];if(!validateTeam(s.team)||!Array.isArray(s.storage)||s.storage.length>500||!s.storage.every(p=>validateTeam([p])))throw Error('Ungültige Pokémon-Speicherdaten');s.starterWishSpeciesId=s.starterWishSpeciesId??null;s.starterEgg=s.starterEgg??null;
 if(s.starterWishSpeciesId!==null&&!findStarter(s.starterWishSpeciesId))throw Error('Ungültiger Starterwunsch');
 if(s.starterEgg!==null){if(!findStarter(s.starterEgg.speciesId)||s.starterEgg.speciesId!==s.starterWishSpeciesId||s.starterEgg.hatched!==!!s.flags.route1_hatched||s.starterEgg.received!==true||!s.flags.egg_received)throw Error('Ungültiges Starter-Ei');}
 if(s.flags.egg_received&&!s.starterEgg)throw Error('Ei-Flag ohne Ei');if(s.flags.route1_hatched&&!(s.team.concat(s.storage)).some(p=>p.speciesId===s.starterEgg.speciesId&&p.level>=5))throw Error('Geschlüpftes Starter-Pokémon fehlt');
 if(s.starterEgg&&s.team.some(p=>p.speciesId===s.starterEgg.speciesId)&&s.flags.route1_hatched===false){/* Species duplicates are legal; the egg is tracked separately. */}
 s.returns=s.returns&&typeof s.returns==='object'?s.returns:{};
 const m=maps[s.mapId];if(!m||!Number.isInteger(s.x)||!Number.isInteger(s.y)||!inside(m,s.x,s.y)||m.walls.has(`${s.x},${s.y}`)||tileHeight(m,s.x,s.y)!==s.elevation||(npcs[s.mapId]||[]).some(n=>n.x===s.x&&n.y===s.y))throw Error('Ungültige gespeicherte Position');
 if(!dirs[s.facing]||!Number.isSafeInteger(s.steps)||s.steps<0)throw Error('Ungültige Spieldaten');this.state=s;this.dialogue=null;this.mode='exploration';this.lastEvent=null;this.message='Spielstand geladen';if(s.mapId==='route1'&&!s.flags.route1_hatched)this.beginHatchScene();}
}
