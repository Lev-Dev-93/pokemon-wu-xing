// Canonical ordering from Story-Masterfassung 2026-11-14, p. 3 (section 02).
// Preview only: no egg/species is created until validated starter selection exists.
export const PROLOGUE_STAGES=Object.freeze(['birthday_pending','wish_pending','egg_received','rift_closed','rival_absol','professor_demo','route1_hatched']);
export const STORY_ORDER=Object.freeze({
 egg_received:'wish_pending',rift_closed:'egg_received',rival_absol:'rift_closed',professor_demo:'rival_absol',route1_hatched:'professor_demo'
});
export function storyStage(flags){if(flags.route1_hatched)return 'route1_hatched';if(flags.professor_demo)return 'professor_demo';if(flags.rival_absol)return 'rival_absol';if(flags.rift_closed)return 'rift_closed';if(flags.egg_received)return 'egg_received';if(flags.birthday_wish_pending)return 'wish_pending';return 'birthday_pending'}
export function birthdayPreview(flags){return {
 stage:storyStage(flags),
 title:'Geburtstag – Story-Vorschau',
 pages:[
 'Heute ist dein Geburtstag. Die beiden älteren Züchter, die dich aufgenommen haben, möchten dir ein Pokémon-Ei schenken.',
 'Welches Pokémon du dir wünschst, muss erst über die geprüfte Starterauswahl festgelegt werden. Das Ei wird deshalb noch nicht vergeben.',
 'Danach folgt unabhängig von deinem Wunsch ein Dimensionsereignis. Giratina schließt die Risse. Diese Szene ist noch nicht spielbar.'
 ],
 note:'Vorbereitung – keine endgültigen Dialoge, keine Pokémon-Vergabe.'
}}
export function canAdvanceStory(flags,event){const prev=STORY_ORDER[event];return !!prev&&((prev==='wish_pending'&&flags.birthday_wish_pending)||!!flags[prev])&&!flags[event]}
