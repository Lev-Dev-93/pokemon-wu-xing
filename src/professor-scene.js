// Geskriptete Lehrvorführung: Der Spieler ist ausschließlich Zuschauer.
// Die konkrete Art des Professoren-Pokémon ist im verbindlichen Storykanon nicht benannt.
export const PROFESSOR_SCENE=Object.freeze({id:'professor_demo_scene',name:'Forschungsausflug: schillerndes Raupy',pages:Object.freeze([
 'Professor: Schau dort im hohen Gras! Ein Raupy – aber seine Farbe ist ungewöhnlich!',
 'Professor: Es ist schillernd! Solche Pokémon sind äußerst selten.',
 'Professor: Ich demonstriere dir einen Kampf. Du schaust zu, dein Ei bleibt sicher bei dir.',
 'Der Professor ruft sein eigenes Pokémon in den Kampf. Es folgt seinen Anweisungen.',
 'Professor: In Kämpfen setzt ein Pokémon Attacken ein. Wir müssen Raupy vorsichtig schwächen.',
 'Das Pokémon des Professors führt eine kontrollierte Attacke aus. Das wilde Raupy wird geschwächt.',
 'Professor: Jetzt ist der richtige Moment für einen Pokéball. Achte darauf!',
 'Der Professor wirft einen Pokéball. Das schillernde Raupy verschwindet darin.',
 'Der Ball wackelt … einmal … zweimal … dreimal. Klick! Raupy wurde gefangen!',
 'Professor: Wunderbar! Ich werde dieses Raupy behutsam für meine Forschung beobachten.',
 'Der Professor beendet die Vorführung. Du erhältst die Kontrolle zurück. Dein Ei ist noch nicht geschlüpft.'
])});
export function professorSceneReady(flags){return !!flags.rival_absol&&!flags.professor_demo}
export function professorVisualPhase(index){if(index<2)return 'shiny';if(index<4)return 'encounter';if(index<7)return 'battle';if(index<9)return 'capture';return 'none'}
