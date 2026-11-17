// Einheitliche, seiteneffektfreie Abfragen für bereits unterstützte Fähigkeiten.
export function abilityId(fighter){return fighter?.pokemon?.abilityId ?? null;}
export function effectiveWeather(battle){return [battle.player,battle.opponent].some(f=>f.pokemon.currentHp>0&&[13,76].includes(abilityId(f)))?null:battle.weather;}
export function preventsStatus(fighter,status,weather=null){const id=abilityId(fighter);return (weather==='sun'&&id===102)||({poison:[17],burn:[41],paralysis:[7],sleep:[15,72],freeze:[40]}[status]||[]).includes(id);}
export function preventsConfusion(fighter){return abilityId(fighter)===20;}
export function weatherSpeedMultiplier(fighter,weather){const id=abilityId(fighter);return (weather==='sun'&&id===34)||(weather==='rain'&&id===33)||(weather==='sand'&&id===146)?2:1;}
export function weatherEvasionMultiplier(fighter,weather){const id=abilityId(fighter);return (weather==='sand'&&id===8)||(weather==='hail'&&id===81)?0.8:1;}
export function weatherDamageImmune(fighter,weather,types){const id=abilityId(fighter);return [98,142].includes(id)||(weather==='sand'?[5,6,9].some(t=>types.includes(t)):weather==='hail'&&types.includes(15));}
export function statusCureAbility(fighter,weather,rng){if(!fighter.pokemon.status||fighter.pokemon.status==='healthy')return null;const id=abilityId(fighter);if(id===93&&weather==='rain')return 'Hydration';if(id===61&&rng()<1/3)return 'Expidermis';return null;}

// Entry ability metadata; side effects remain in the entry event handler.
export const ENTRY_WEATHER_ABILITIES=Object.freeze({2:['rain','Regen'],70:['sun','Sonnenschein'],45:['sand','Sandsturm'],117:['hail','Hagel']});
export function entryWeather(ability){return ENTRY_WEATHER_ABILITIES[ability]??null;}
export function intimidates(ability){return ability===22;}
export function curesOnSwitchOut(ability){return ability===30;}

// Only opponent-targeted moves can activate absorption.
export function absorptionEffect(ability,typeId,category){
 const effects={10:{type:13,heal:true,name:'Voltabsorber'},11:{type:11,heal:true,name:'H2O-Absorber'},18:{type:10,flashFire:true,name:'Feuerfänger'},31:{type:13,stat:'specialAttack',name:'Blitzfänger'},114:{type:11,stat:'specialAttack',name:'Sturmsog'},157:{type:12,stat:'attack',name:'Vegetarier'},78:{type:13,stat:'speed',name:'Starthilfe'},87:{type:11,heal:true,name:'Trockenheit'}};
 const effect=effects[ability];if(!effect||effect.type!==typeId)return null;
 if(category===1&&![31,114,157,78].includes(ability))return null;
 return effect;
}
export function absorbsGround(ability,typeId,category,power){return ability===26&&typeId===5&&category!==1&&power>0;}

// Zentralisierte Schadensmodifikatoren: die Kampfberechnung bleibt in battle.js.
export function offensiveAbilityMultiplier(fighter,move,weather){
 const id=abilityId(fighter),special=move.category===3;
 const status=fighter.pokemon.status;
 return (special&&weather==='sun'&&id===94?1.5:1)*(!special&&id===62&&status&&status!=='healthy'?1.5:1)*(move.typeId===10&&id===18&&fighter.volatile.flashFireBoost?1.5:1)*(weather==='sand'&&id===159&&[5,6,9].includes(move.typeId)?1.3:1);
}
export function defensiveAbilityMultiplier(fighter,move){const id=abilityId(fighter);return (id===85&&move.typeId===10?0.5:1)*(id===47&&[10,15].includes(move.typeId)?0.5:1);}
export function ignoresBurnAttackPenalty(fighter){return abilityId(fighter)===62;}

// Rückgabe positiver Heilanteile oder negativer Schadensanteile, jeweils bezogen auf maximale KP.
export function weatherAbilityHpFraction(fighter,weather){const id=abilityId(fighter);if(weather==='rain'&&id===44)return {fraction:1/16,name:'Regengenuss'};if(weather==='hail'&&id===115)return {fraction:1/16,name:'Eishaut'};if(id===87&&weather==='rain')return {fraction:1/8,name:'Trockenheit'};if(id===87&&weather==='sun')return {fraction:-1/8,name:'Trockenheit'};if(id===94&&weather==='sun')return {fraction:-1/8,name:'Solarkraft'};return null;}

export function ignoresIndirectDamage(fighter){return abilityId(fighter)===98;}

// Schadensfähigkeiten: typbasierte Boni und defensive Schutzmechaniken.
// Die ID-Zuordnung folgt der in Monsterreise verwendeten PokéAPI-ID-Systematik.
const PINCH_TYPE_BY_ABILITY=Object.freeze({65:12,66:10,67:11,68:7}); // Notdünger, Großbrand, Sturzbach, Hexaplaga
export function pinchAbilityMultiplier(fighter,move){
 const type=PINCH_TYPE_BY_ABILITY[abilityId(fighter)];
 const hp=fighter?.pokemon?.currentHp,max=fighter?.pokemon?.stats?.hp;
 return type===move.typeId&&Number.isFinite(hp)&&Number.isFinite(max)&&max>0&&hp>0&&hp*3<=max?1.5:1;
}
export function stabAbilityMultiplier(fighter,move,hasStab){return hasStab&&abilityId(fighter)===91?2:hasStab?1.5:1;}
export function effectivenessAbilityMultiplier(attacker,defender,effectiveness){
 if(effectiveness<=0)return 1; // Immunitäten werden nicht aufgehoben.
 const attackerBonus=abilityId(attacker)===110&&effectiveness<1?2:1; // Aufwertung
 const defenderReduction=[111,116].includes(abilityId(defender))&&effectiveness>1?0.75:1; // Filter, Felskern
 return attackerBonus*defenderReduction;
}
export function fullHpDefenseMultiplier(defender){
 return abilityId(defender)===136&&defender.pokemon.currentHp===defender.pokemon.stats.hp?0.5:1; // Multischuppe
}

// Schutzfähigkeiten bei direkten Treffern. Robustheit wirkt nur gegen einen
// einzelnen K.-o.-Treffer bei vollen KP, nicht gegen spätere Mehrfachtreffer.
export function wonderGuardBlocks(defender, effectiveness, move){
 return abilityId(defender)===25 && move?.power>0 && [2,3].includes(move.category) && effectiveness<=1;
}
export function sturdySurvivalHp(defender, incoming){
 const hp=defender?.pokemon?.currentHp,max=defender?.pokemon?.stats?.hp;
 return abilityId(defender)===5 && Number.isFinite(hp)&&hp>0&&hp===max&&incoming>=hp ? hp-1 : incoming;
}

// Fähigkeiten gegen sekundäre Effekte von Schadensattacken.
export function blocksSecondaryEffect(defender){return abilityId(defender)===19;} // Puderabwehr
export function blocksFlinch(defender){return abilityId(defender)===39;} // Konzentrator
export function secondaryEffectChance(attacker,chance){return Math.min(1,chance*(abilityId(attacker)===32?2:1));} // Edelmut
