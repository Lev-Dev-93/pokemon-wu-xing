export function residualDamage(pokemon,denominator=8){
 if(!Number.isInteger(denominator)||denominator<=0)return 0;
 if(!pokemon?.stats||!Number.isFinite(pokemon.stats.hp)||pokemon.stats.hp<=0||!Number.isFinite(pokemon.currentHp)||pokemon.currentHp<=0)return 0;
 return Math.min(Math.floor(pokemon.currentHp),Math.max(1,Math.floor(pokemon.stats.hp/denominator)));
}