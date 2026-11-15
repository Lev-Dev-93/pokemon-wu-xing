const room=(id,name,w,h,walls=[],portals=[],heights={},stairs=[])=>({id,name,w,h,walls:new Set(walls.map(p=>p.join(','))),portals,heights,stairs});
const p=(x,y,target,tx,ty,kind='door')=>({x,y,target,tx,ty,kind});
export const maps={
 bedroom:room('bedroom','Schlafzimmer',10,8,[[1,1],[2,1],[1,2],[7,1],[8,1]], [p(5,7,'ground',10,2,'stairs')]),
 ground:room('ground','Erdgeschoss',12,9,[[1,1],[2,1],[8,1],[9,1],[2,5],[3,5]], [p(10,1,'bedroom',5,6,'stairs'),p(5,8,'yard',7,2)]),
 yard:room('yard','Züchterhof',16,12,[[2,3],[3,3],[4,3],[11,4],[12,4],[13,4],[11,5],[12,5],[13,5]], [p(7,1,'ground',5,7)],{'8,8':1,'9,8':1,'10,8':1,'8,9':1,'9,9':1,'10,9':1},[[7,8],[7,9]])
};
export const npcs={ground:[{id:'breeder_a',x:6,y:2,name:'Züchterin',dialogue:['Guten Morgen! Schön, dass du da bist.','Heute ist ein besonderer Tag. Wir sprechen später in Ruhe darüber.']},{id:'breeder_b',x:3,y:3,name:'Züchter',dialogue:['Auf dem Hof gibt es immer etwas zu tun.','Sieh dich ruhig um.']} ]};
export const objects={bedroom:[{id:'bed',x:1,y:1,name:'Bett',dialogue:['Dein vertrautes Bett. Hier hast du viele Nächte verbracht.']}],ground:[{id:'kitchen',x:8,y:1,name:'Küche',dialogue:['Aus der Küche duftet es angenehm.']} ],yard:[{id:'yard_sign',x:7,y:0,name:'Hofschild',dialogue:['Züchterhof – ein Zuhause für Pokémon und Menschen.']}]};
export const start={mapId:'bedroom',x:5,y:5,facing:'down',elevation:0,returns:{},steps:0,flags:{introSeen:false,birthday_wish_pending:false,egg_received:false,rift_closed:false,rival_absol:false,professor_demo:false,route1_hatched:false,spokenToBreederA:false,spokenToBreederB:false,visitedYard:false},inventory:[],eventLog:[],starterWishSpeciesId:null,starterEgg:null,team:[],storage:[]};
export const tileHeight=(map,x,y)=>map.heights[`${x},${y}`]??0;
export const inside=(map,x,y)=>x>=0&&y>=0&&x<map.w&&y<map.h;
export function canMove(map,x,y,nx,ny){if(!inside(map,nx,ny)||map.walls.has(`${nx},${ny}`))return false;const a=tileHeight(map,x,y),b=tileHeight(map,nx,ny);return a===b||map.stairs.some(([sx,sy])=>(sx===x&&sy===y)||(sx===nx&&sy===ny));}
