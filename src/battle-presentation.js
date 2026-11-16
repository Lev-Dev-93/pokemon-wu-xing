// dev.385–389: presentation-only battle helpers; no combat state mutations.
export const TYPE_NAMES={1:'Normal',2:'Kampf',3:'Flug',4:'Gift',5:'Boden',6:'Gestein',7:'Käfer',8:'Geist',9:'Stahl',10:'Feuer',11:'Wasser',12:'Pflanze',13:'Elektro',14:'Psycho',15:'Eis',16:'Drache',17:'Unlicht',18:'Fee'};
export function hpBand(current,max){if(!Number.isFinite(current)||!Number.isFinite(max)||max<=0)return 'low';const ratio=Math.max(0,current)/max;return ratio<=0.2?'low':ratio<=0.5?'medium':'high'}
export function moveTypeLabel(typeId){return TYPE_NAMES[typeId]||'Unbekannt'}
export function attackVisual(actor){return actor==='player'?'enemy':actor==='opponent'?'player':null}
export function battleAnnouncement(kind){return kind==='wild'?'Wildbegegnung':kind==='trainer'?'Trainerkampf':'Übungskampf'}
