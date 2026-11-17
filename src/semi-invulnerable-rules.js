// Gen-5-Ausnahmen für Angriffe gegen Pokémon in einer Zweirunden-Vorbereitung.
// Die Zuordnung benutzt PokeAPI-Attacken-IDs.
const EXCEPTIONS={
  19:new Set([16,87,239,542]), // Fliegen: Windstoß, Donner, Windhose, Orkan
  340:new Set([16,87,239,542]), // Sprungfeder
  91:new Set([89,222,90]), // Schaufler: Erdbeben, Intensität, Geofissur
  291:new Set([57,250]), // Taucher: Surfer, Whirlpool
};
const DOUBLE_DAMAGE={19:new Set([16,239]),340:new Set([16,239]),91:new Set([89,222]),291:new Set([57,250])};
export function preparationInteraction(targetMoveId,attackMoveId){
 if(!EXCEPTIONS[targetMoveId])return {canHit:true,multiplier:1};
 return {canHit:EXCEPTIONS[targetMoveId].has(attackMoveId),multiplier:DOUBLE_DAMAGE[targetMoveId]?.has(attackMoveId)?2:1};
}
