// Technical quest layer: canon story flags remain the source of truth.
export const QUESTS=Object.freeze([
 {id:'birthday',title:'Ein besonderer Geburtstag',description:'Sprich mit den Züchtern und empfange dein Starter-Ei.',requires:[],objectives:[['spokenToBreederA','Mit der Züchterin sprechen'],['spokenToBreederB','Mit dem Züchter sprechen'],['egg_received','Starter-Ei erhalten']]},
 {id:'rift',title:'Das Dimensionsereignis',description:'Erlebe die Erschütterung und das Ereignis auf dem Dorfplatz.',requires:['egg_received'],objectives:[['rift_closed','Dimensionsereignis abschließen']]},
 {id:'companions',title:'Neue Weggefährten',description:'Begleite die Begegnungen mit Absol und dem Professor.',requires:['rift_closed'],objectives:[['rival_absol','Absol beim Kindheitsfreund'],['professor_demo','Fangvorführung des Professors']]},
 {id:'first_route',title:'Der Beginn der Reise',description:'Erreiche Route 1 und begleite das Schlüpfen deines Starters.',requires:['professor_demo'],objectives:[['visitedRoute1','Route 1 erreichen'],['route1_hatched','Starter-Ei schlüpfen lassen']]},
 {id:'mu_exploration',title:'Wege durch Mu',description:'Erkunde die neuen technischen Testgebiete.',requires:['route1_hatched'],objectives:[['visitedBrook','Bach und Brücke erreichen'],['visitedRoute2','Waldpfad Mu betreten']]},
 {id:'berry_journey',title:'Beerendorf und der Waldrand',description:'Folge dem Weg vom Bach nach Beerendorf und bis zum Waldrand.',requires:['route1_hatched'],objectives:[['visitedBeerendorf','Beerendorf besuchen'],['visitedWaldrand','Waldrand erreichen']]},
 {id:'route1_training',title:'Ein Übungskampf',description:'Bestreite den optionalen Trainerkampf auf Route 1.',requires:['route1_hatched'],objectives:[['route1TrainerDefeated','Jungen Trainer besiegen']]}
]);
export const QUEST_IDS=Object.freeze(QUESTS.map(q=>q.id));
export function questStatus(flags,quest){const completed=quest.objectives.every(([flag])=>!!flags[flag]);const unlocked=quest.requires.every(flag=>!!flags[flag]);return {id:quest.id,title:quest.title,description:quest.description,status:completed?'completed':unlocked?'active':'locked',objectives:quest.objectives.map(([flag,label])=>({flag,label,done:!!flags[flag]})),done:quest.objectives.filter(([flag])=>!!flags[flag]).length,total:quest.objectives.length};}
export function questJournal(flags){return QUESTS.map(q=>questStatus(flags,q));}
export function questSummary(flags){const all=questJournal(flags);return {active:all.filter(q=>q.status==='active'),completed:all.filter(q=>q.status==='completed'),locked:all.filter(q=>q.status==='locked')};}
export function reconcileQuestLog(state){const before=new Set(state.questLog||[]);const completed=questJournal(state.flags).filter(q=>q.status==='completed').map(q=>q.id);state.questLog=completed;state.eventLog??=[];for(const id of completed)if(!before.has(id))state.eventLog.push({type:'questCompleted',id});return completed.filter(id=>!before.has(id));}
export function validateQuestLog(log,flags){return Array.isArray(log)&&new Set(log).size===log.length&&log.every(id=>QUEST_IDS.includes(id)&&questJournal(flags).some(q=>q.id===id&&q.status==='completed'));}
