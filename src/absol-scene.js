// Kanonischer Kern: Absol gelangt durch einen kurzlebigen Riss zum Rivalen und wird sofort sein Partner.
// Formulierungen und Bilddarstellung sind vorläufige Arbeitsfassungen.
export const ABSOL_SCENE=Object.freeze({id:'absol_scene',name:'Ein unerwarteter Partner',pages:Object.freeze([
 'Dein Kindheitsfreund betrachtet noch immer den Ort, an dem die Risse verschwunden sind.',
 'Für einen kurzen Augenblick öffnet sich in seiner Nähe ein neuer, schmaler Riss.',
 'Ein Absol tritt hindurch. Der Riss verschwindet sofort wieder.',
 'Dein Kindheitsfreund bleibt ruhig. Absol weicht nicht von seiner Seite.',
 'Die beiden finden zueinander. Absol ist von nun an sein Pokémon-Partner.',
 'Dein Kindheitsfreund beobachtet Absol aufmerksam. Vielleicht wurde Giratina falsch verstanden.'
 ])});
export function absolSceneReady(flags){return !!flags.rift_closed&&!flags.rival_absol}
export function absolVisualPhase(index){return index<1?'none':index<3?'arrival':index<5?'partner':'none'}
