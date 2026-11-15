import {drawScene} from './art.js';
import {Engine} from './engine.js';
const engine=new Engine();
const canvas=document.querySelector('#game');
const ctx=canvas.getContext('2d');
const info=document.querySelector('#info');
const notice=document.querySelector('#notice');
const details=document.querySelector('#debug');
const directions={ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right',w:'up',s:'down',a:'left',d:'right',W:'up',S:'down',A:'left',D:'right'};
const keys=new Set();let last=0;
function move(dir){engine.step(dir);draw();}
function draw(){const m=engine.map;canvas.width=m.w*32;canvas.height=m.h*32;ctx.imageSmoothingEnabled=false;drawScene(ctx,m,engine.state);document.querySelector('#area').textContent=m.name;info.textContent=`${m.name} · Position ${engine.state.x},${engine.state.y} · Höhe ${engine.state.elevation} · Schritte ${engine.state.steps}`;notice.textContent=engine.message||'Pfeiltasten oder WASD zum Bewegen';window.__pokemonWuXing=engine;}
window.addEventListener('keydown',e=>{const dir=directions[e.key];if(dir){e.preventDefault();keys.add(e.key);if(!e.repeat)move(dir)}if(e.key==='Escape'){keys.clear();details.open=false;}});
window.addEventListener('keyup',e=>keys.delete(e.key));window.addEventListener('blur',()=>keys.clear());
for(const b of document.querySelectorAll('[data-dir]'))b.addEventListener('click',()=>move(b.dataset.dir));
const saveKey='pokemon-wu-xing-dev';const legacyKey='monsterreise-dev1';
document.querySelector('#save').addEventListener('click',()=>{try{localStorage.setItem(saveKey,engine.save());notice.textContent='Spielstand gespeichert';}catch(e){notice.textContent=`Speichern fehlgeschlagen: ${e.message}`}});
document.querySelector('#load').addEventListener('click',()=>{try{const raw=localStorage.getItem(saveKey)||localStorage.getItem(legacyKey);if(!raw)throw Error('Noch kein Spielstand vorhanden');engine.load(raw);draw();notice.textContent='Spielstand geladen';}catch(e){notice.textContent=`Laden fehlgeschlagen: ${e.message}`}});
document.querySelector('#reset').addEventListener('click',()=>{engine.reset();draw();notice.textContent='Neues Spiel gestartet';});
function frame(t){if(t-last>=125){const key=[...keys].at(-1);if(key)move(directions[key]);last=t;}requestAnimationFrame(frame)}
draw();requestAnimationFrame(frame);
if(new URLSearchParams(location.search).has('selftest')){const e=new Engine();let ok=true;try{e.step('down');e.step('down');if(e.state.mapId!=='upper')throw Error('Portal');const s=e.save();e.load(s);}catch(err){ok=false;console.error(err)}document.body.dataset.selftest=ok?'pass':'fail'}
