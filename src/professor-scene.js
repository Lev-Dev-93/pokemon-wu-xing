// Kanonischer Kern: freiwilliger Besuch beim Professor, Ausflug vor dem Schlüpfen,
// schillerndes Raupy, Erklärung, vorgeführter Kampf und Fang für die Forschung.
// Kampfschritte sind eine inszenierte Demonstration, kein regulärer Spieler-Kampf.
export const PROFESSOR_SCENE=Object.freeze({id:'professor_demo_scene',name:'Der Ausflug des Professors',pages:Object.freeze([
 'Du suchst den Professor auf. Er freut sich über deinen Besuch und lädt dich zu einem kurzen Ausflug ein.',
 'Gemeinsam verlasst ihr das Dorf und beobachtet Pokémon in der Natur. Dein Ei trägst du sicher bei dir.',
 'Plötzlich entdeckt ihr ein ungewöhnlich gefärbtes Raupy. Es ist schillernd!',
 'Der Professor erklärt: Schillernde Pokémon sind äußerst selten. Ihre Färbung unterscheidet sich von der gewöhnlicher Artgenossen.',
 'Der Professor zeigt dir, wie ein Pokémon-Kampf abläuft. Sein Pokémon tritt dem wilden Raupy gegenüber.',
 'Das Pokémon des Professors setzt eine Attacke ein. Raupy wird geschwächt, bleibt aber kampffähig.',
 'Der Professor wirft einen Pokéball. Der Ball öffnet sich, und Raupy verschwindet darin.',
 'Der Pokéball wackelt kurz – dann bleibt er still. Das schillernde Raupy wurde gefangen!',
 'Der Professor möchte Raupy zu Forschungszwecken beobachten. Ihr kehrt gemeinsam ins Dorf zurück.',
 'Dein Ei ist noch nicht geschlüpft. Der Weg zur Route 1 liegt weiterhin vor dir.'
])});
export function professorSceneReady(flags){return !!flags.rival_absol&&!flags.professor_demo}
export function professorVisualPhase(index){if(index<2)return 'none';if(index<5)return 'shiny';if(index<7)return 'battle';if(index<8)return 'capture';return 'none'}
