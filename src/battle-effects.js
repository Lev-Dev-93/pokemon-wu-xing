// dev.430–439: read-only attack feedback. The combat engine remains authoritative.
const SPECIAL=new Set([10,11,12,13,14,15,16,18]);
export function attackEffect(typeId,hit=true){
 if(!hit)return {effect:'miss',duration:200,flash:false};
 if(typeId===9)return {effect:'metal',duration:260,flash:true};
 if(typeId===8||typeId===17)return {effect:'shadow',duration:300,flash:false};
 if(SPECIAL.has(typeId))return {effect:'energy',duration:300,flash:true};
 return {effect:'impact',duration:200,flash:true};
}
export function battleAccessibilityText(actor,moveName,targetHp,targetMax){
 const who=actor==='player'?'Dein Pokémon':'Gegnerisches Pokémon';
 const hp=Number.isFinite(targetHp)&&Number.isFinite(targetMax)?` Verbleibende KP: ${Math.max(0,targetHp)} von ${targetMax}.`:'';
 return `${who} setzt ${String(moveName||'eine Attacke')} ein.${hp}`;
}
