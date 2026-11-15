// Prologszene nach der Ei-Übergabe. Die Dialoge sind Arbeitsfassungen,
// keine zusätzlich festgelegten kanonischen Aussagen.
export const RIFT_SCENE=Object.freeze({
 id:'rift_scene',name:'Dimensionsereignis',pages:Object.freeze([
 'Plötzlich bebt der Boden. Ein seltsames Flimmern durchzieht die Luft.',
 'Mehrere Risse erscheinen. Niemand im Dorf weiß, was gerade geschieht.',
 'Eine gewaltige Gestalt tritt hervor: Giratina.',
 'Giratina bewegt sich zwischen den Rissen. Einer nach dem anderen schließt sich.',
 'Dann zieht Giratina sich zurück. Die Menschen bleiben erschrocken und ratlos zurück.',
 'Das Pokémon-Ei ist unversehrt. Was Giratina wirklich wollte, versteht hier noch niemand.'
 ])
});
export function riftSceneReady(flags){return !!flags.egg_received&&!flags.rift_closed}
export function riftVisualPhase(index){return index<2?'distortion':index<4?'giratina':'aftermath'}
