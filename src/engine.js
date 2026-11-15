import {maps,start,canMove,tileHeight,inside} from './maps.js';
export class Engine{
 constructor(){this.state=structuredClone(start);this.mode='exploration';this.cooldown=0;this.message='';}
 get map(){return maps[this.state.mapId]}
 reset(){this.state=structuredClone(start);this.cooldown=0;this.message='';}
 step(direction){if(this.mode!=='exploration')return false;const d={up:[0,-1],down:[0,1],left:[-1,0],right:[1,0]}[direction];if(!d)return false;this.state.facing=direction;const {x,y}=this.state;const nx=x+d[0],ny=y+d[1];if(!canMove(this.map,x,y,nx,ny))return false;this.state.x=nx;this.state.y=ny;this.state.elevation=tileHeight(this.map,nx,ny);this.state.steps++;
 this.cooldown=0;const portal=this.map.portals.find(q=>q.x===nx&&q.y===ny);if(portal)this.transition(portal);return true;}
 transition(portal){const dest=maps[portal.target];if(!dest||!inside(dest,portal.tx,portal.ty)||dest.walls.has(`${portal.tx},${portal.ty}`))throw Error('Ungültiger Portal-Spawn');const source=this.state.mapId;this.state.returns[`${source}->${portal.target}`]={x:this.state.x,y:this.state.y};this.state.mapId=portal.target;this.state.x=portal.tx;this.state.y=portal.ty;this.state.elevation=tileHeight(dest,portal.tx,portal.ty);this.cooldown=1;this.message=portal.kind==='stairs'?'Etage gewechselt':'Bereich gewechselt';}
 save(){return JSON.stringify({schema:1,state:this.state});}
 load(raw){const data=JSON.parse(raw);if(data.schema!==1)throw Error('Unbekannte Speicherstand-Version');const s=data.state,m=maps[s.mapId];if(!m||!inside(m,s.x,s.y)||m.walls.has(`${s.x},${s.y}`)||tileHeight(m,s.x,s.y)!==s.elevation)throw Error('Ungültige gespeicherte Position');this.state=structuredClone(s);this.cooldown=1;}
}
