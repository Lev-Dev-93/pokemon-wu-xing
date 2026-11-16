// dev.380–384: Pure, save-neutral presentation metadata for existing canon scenes.
// No new characters, dialogue events or story flags are introduced.
const SCENES=Object.freeze({
 birthday_greeting:{label:'Geburtstag',tone:'warm',portrait:'family'},
 birthday_preview:{label:'Geburtstagswunsch',tone:'warm',portrait:'family'},
 starter_wish:{label:'Das Geschenk',tone:'warm',portrait:'family'},
 rift_scene:{label:'Dimensionsereignis',tone:'rift',portrait:'giratina'},
 absol_scene:{label:'Ein neuer Partner',tone:'mystery',portrait:'absol'},
 parents_report:{label:'Wieder zu Hause',tone:'warm',portrait:'family'},
 professor_demo_scene:{label:'Forschungsausflug',tone:'discovery',portrait:'professor'},
 route1_hatch_scene:{label:'Ein neues Abenteuer',tone:'discovery',portrait:'egg'}
});
export function scenePresentation(dialogue){
 if(!dialogue||!Array.isArray(dialogue.pages)||!dialogue.pages.length)return null;
 const meta=SCENES[dialogue.id]||{label:'Gespräch',tone:'neutral',portrait:'speaker'};
 const index=Math.max(0,Math.min(dialogue.pages.length-1,Number.isInteger(dialogue.index)?dialogue.index:0));
 const text=String(dialogue.pages[index]??'');
 const match=/^(Professor|Adoptivmutter|Adoptivvater):\s*/.exec(text);
 const voice=match?.[1]??dialogue.name??'Erzählung';
 const portrait=match?.[1]==='Professor'?'professor':match?.[1]==='Adoptivmutter'?'mother':match?.[1]==='Adoptivvater'?'father':meta.portrait;
 return {label:meta.label,tone:meta.tone,portrait,voice,text:match?text.slice(match[0].length):text,index,total:dialogue.pages.length,progress:`${index+1} / ${dialogue.pages.length}`};
}
const PAL={skin:'#e9bd8c',shadow:'#ac795e',hair:'#493c37',coat:'#e7e8d8',dark:'#243a38',gold:'#e7d17b',blue:'#8aabb6'};
function rect(c,x,y,w,h,color){c.fillStyle=color;c.fillRect(x,y,w,h)}
export function drawStoryPortrait(canvas,kind){
 const c=canvas.getContext('2d');if(!c)return;
 c.clearRect(0,0,48,48);c.imageSmoothingEnabled=false;
 rect(c,0,0,48,48,'#2a5149');rect(c,3,3,42,42,'#38645b');
 if(kind==='giratina'){
  rect(c,10,9,28,29,'#30343d');rect(c,15,6,18,8,PAL.gold);rect(c,9,16,7,13,PAL.gold);rect(c,32,16,7,13,PAL.gold);rect(c,16,22,16,10,'#b9b9a8');rect(c,18,23,4,4,'#dc6667');rect(c,27,23,4,4,'#dc6667');return;
 }
 if(kind==='absol'){
  rect(c,11,20,26,19,'#e6e8de');rect(c,14,15,22,12,'#e6e8de');rect(c,11,8,9,15,'#26383b');rect(c,19,5,12,7,'#26383b');rect(c,27,24,4,4,'#d95755');rect(c,14,32,20,5,'#c2d2d0');return;
 }
 if(kind==='egg'){
  rect(c,15,11,18,28,'#f2e6c9');rect(c,11,17,26,15,'#f2e6c9');rect(c,18,17,6,6,'#a3c2a1');rect(c,27,26,6,5,'#a3c2a1');return;
 }
 const hair=kind==='professor'?'#b7c3c5':kind==='mother'?'#7c5142':PAL.hair;
 const coat=kind==='professor'?PAL.coat:kind==='mother'?'#a36e78':kind==='father'?'#718a5c':PAL.blue;
 rect(c,9,31,30,14,coat);rect(c,14,13,20,22,PAL.skin);rect(c,12,10,24,9,hair);rect(c,12,17,4,9,hair);rect(c,32,17,4,9,hair);
 rect(c,18,25,3,3,PAL.dark);rect(c,27,25,3,3,PAL.dark);rect(c,21,32,7,2,PAL.shadow);
 if(kind==='professor'){rect(c,10,34,7,11,PAL.coat);rect(c,31,34,7,11,PAL.coat);rect(c,22,34,5,10,'#78a5ad');}
 if(kind==='family'){rect(c,5,34,9,10,'#a36e78');rect(c,34,34,9,10,'#718a5c');}
}
