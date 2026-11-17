// Phase 12: save-independent, spoiler-light guidance for the canonical Mu prologue.
// Never writes flags or starts story events. The engine remains authoritative.
export const PROLOGUE_STAGES=Object.freeze([
 Object.freeze({id:'breeders',title:'Ein Geburtstag in Mu',flag:'birthday_wish_pending'}),
 Object.freeze({id:'egg',title:'Dein Geburtstagswunsch',flag:'egg_received'}),
 Object.freeze({id:'rift',title:'Risse über dem Dorf',flag:'rift_closed'}),
 Object.freeze({id:'absol',title:'Ein neuer Gefährte',flag:'rival_absol'}),
 Object.freeze({id:'professor',title:'Ein Ausflug mit dem Professor',flag:'professor_demo'}),
 Object.freeze({id:'route',title:'Der erste Schritt',flag:'route1_hatched'})
]);
export function prologueGuide(flags={},mapId='bedroom'){
 const f=flags&&typeof flags==='object'&&!Array.isArray(flags)?flags:{};
 const completed=PROLOGUE_STAGES.filter(stage=>!!f[stage.flag]).length;
 let title,tip;
 if(!f.birthday_wish_pending){title='Ein besonderer Geburtstag';tip=!f.spokenToBreederA||!f.spokenToBreederB?'Gehe ins Erdgeschoss und sprich mit beiden Züchtern.':'Sprich weiter mit deinen Adoptiveltern über deinen Geburtstagswunsch.';}
 else if(!f.egg_received){title='Ein Ei für deine Reise';tip='Wähle deinen Geburtstagswunsch. Das Ei schlüpft noch nicht.';}
 else if(!f.rift_closed){title='Erschütterung in Mu';tip='Das Dimensionsereignis läuft. Folge der Szene auf dem Dorfplatz.';}
 else if(!f.rival_absol){title='Dein Kindheitsfreund';tip='Beobachte die Begegnung deines Freundes mit Absol.';}
 else if(!f.parents_briefed){title='Zurück zu den Züchtern';tip='Kehre nach dem Ereignis zu deinen Adoptiveltern zurück.';}
 else if(!f.professor_demo){title='Besuch beim Professor';tip='Suche den Professor auf und begleite ihn zu seiner Fangvorführung.';}
 else if(!f.route1_hatched){title='Aufbruch nach Route 1';tip='Betritt Route 1, damit dein Starter-Ei schlüpfen kann.';}
 else {title='Der Prolog ist abgeschlossen';tip='Dein Starter ist geschlüpft. Erkunde Mu in deinem eigenen Tempo.';}
 return {title,tip,completed,total:PROLOGUE_STAGES.length,finished:!!f.route1_hatched,mapId,stages:PROLOGUE_STAGES.map(s=>({id:s.id,title:s.title,done:!!f[s.flag]}))};
}
export function prologueConsistency(flags={},starterEgg=null,team=[]){
 const f=flags&&typeof flags==='object'&&!Array.isArray(flags)?flags:{};
 const issues=[];
 for(let i=1;i<PROLOGUE_STAGES.length;i++)if(f[PROLOGUE_STAGES[i].flag]&&!f[PROLOGUE_STAGES[i-1].flag])issues.push(`Reihenfolge: ${PROLOGUE_STAGES[i].flag}`);
 if(f.parents_briefed&&!f.rival_absol)issues.push('Elternbericht vor Absol-Ereignis');
 if(f.route1_hatched&&starterEgg&&!starterEgg.hatched)issues.push('Route-1-Flag ohne geschlüpftes Ei');
 if(f.route1_hatched&&Array.isArray(team)&&team.length===0)issues.push('Starter nach Schlüpfen nicht im Team');
 return {ok:issues.length===0,issues};
}
