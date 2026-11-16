// Original pixel-art battle figures. Selected early-game species receive hand-authored
// silhouettes and markings; remaining species retain the deterministic fallback.
// No external sprite sheets or copyrighted sprite pixels are used.
const PALETTES=[['#83ba72','#3e7855','#d9e4a5'],['#df945e','#9b544b','#f8d49c'],['#7bb8c6','#46758d','#d5edf0'],['#b8a3c9','#69577d','#e6d8ec'],['#c8b67e','#80754b','#f1e6b9'],['#a8adb7','#5c6976','#e6e8ec']];
// 24x24 original pixel masks; '.' transparent, letters palette indexes.
// Hand-designed simplified portraits, not reproductions of official sprites.
const ART={
  1:{palette:['#67a99a','#285e62','#a4d7b0','#478e53'],rows:['.......333333.......','......33333333......','.....3333333333.....','.....3333333333.....','......33333333......','.......333333.......','......11111111......','.....1000000001.....','....100000000001....','...10000000000001...','...10002000020001...','..1000000000000001..','..1000000000000001..','..1000000000000001..','...10000000000001...','....100000000001....','.....1111111111.....','....11..1111..11....','...11....11....11...','...11..........11...']},
  4:{palette:['#e89552','#994a39','#f9d79a','#f4ba52'],rows:['.......111111.......','......10000001......','.....1000000001.....','.....1000000001.....','.....1002002001.....','......10000001......','.......111111.......','.......100001.......','......10000001......','.....1000000001.....','....100000000001....','....100000000001....','.....1000000001.....','......10000001......','.....110000011......','....11.100001.11....','...11..100001..11...','...11...1111...11...','..............333...','.............33333..']},
  7:{palette:['#74b9c8','#3b6c8c','#d5e8df','#b9a77a'],rows:['.......111111.......','......10000001......','.....1000000001.....','.....1002002001.....','.....1000000001.....','......11111111......','.....1333333331.....','....133333333331....','...13333333333331...','...13333223333331...','...13333333333331...','....133333333331....','.....1333333331.....','......11111111......','.....11......11.....','....11........11....','...11..........11...']},
  10:{palette:['#81bc60','#3f783f','#e9d58c','#c94e57'],rows:['......3333..........','.....333333.........','......1111..........','.....100001.........','....10020001........','...1000000001.......','...10000000001......','....10000000001.....','.....10000000001....','......10000000001...','.......10000000001..','........1000000001..','.........11111111...','........11....11....','.......11......11...','......11........11..']},
  13:{palette:['#c9ad70','#84663e','#e4d39c','#cf668a'],rows:['.......3333.........','......333333........','.......1111.........','......100001........','.....10020001.......','....1000000001......','...100000000001.....','...1000000000001....','....100000000001....','.....1000000001.....','......10000001......','.......111111.......','......11....11......','.....11......11.....']},
  16:{palette:['#bfa37c','#67584f','#ead9b2','#d9a777'],rows:['........11..........','.......1001.........','......100001........','.....10000001.......','....1002002001......','.....10033001.......','......100001........','...1111000001111....','..100000000000001...','...1110000000111....','......10000001......','.......100001.......','......11....11......','.....11......11.....']},
  25:{palette:['#e7c858','#87653b','#f9e6a2','#ce735d'],rows:['....11........11....','...1001......1001...','...10001....10001...','....100011110001....','.....1000000001.....','....100000000001....','....100200002001....','....100030030001....','.....1000000001.....','......10000001......','.....1000000001.....','....100000000001....','....100000000001....','.....1000000001.....','......11....11......','.....11......11.....','...........3333.....','............333333..']},
  133:{palette:['#b88d68','#72513d','#f0d5a7','#e9cba3'],rows:['....11........11....','...1001......1001...','..100001....100001..','...10000111100001...','....100000000001....','....100200002001....','....100000000001....','.....1000330001.....','......10000001......','.....1000000001.....','....100000000001....','....100000000001....','.....1110000111.....','......11....11......','.....11......11.....']},
  359:{palette:['#e3e2d7','#555c6a','#faf9ec','#8b8eae'],rows:['........11..........','.......1001.........','......100001........','.....10000001.......','....1000000001......','...100000000001.....','...100200002001.....','....1000000001......','.....10000001.......','......100001........','....1110000111......','...100000000001.....','..10000000000001....','...111000000111.....','......11....11......','.....11......11.....']}
};
export const HANDCRAFTED_SPECIES=Object.freeze(Object.keys(ART).map(Number));
export function spriteDescriptor(speciesId,back=false){const id=Number(speciesId);if(!Number.isInteger(id)||id<1)return null;return {id,back,palette:ART[id]?.palette??PALETTES[id%PALETTES.length],shape:id%5,mark:id%7,handcrafted:!!ART[id]};}
export function drawBattleSprite(canvas,speciesId,back=false){const d=spriteDescriptor(speciesId,back);if(!d)return false;const c=canvas.getContext('2d');if(!c)return false;canvas.width=48;canvas.height=48;c.imageSmoothingEnabled=false;c.clearRect(0,0,48,48);const r=(x,y,w,h,color)=>{c.fillStyle=color;c.fillRect(x,y,w,h)};c.clearRect(0,0,48,48);r(8,43,33,2,'#3b594b55');const art=ART[d.id];if(art){const height=art.rows.length;const width=Math.max(...art.rows.map(s=>s.length));const x0=Math.floor((24-width)/2),y0=Math.max(0,Math.floor((22-height)/2));for(let y=0;y<height;y++){const row=art.rows[y];for(let x=0;x<row.length;x++){const n=Number(row[x]);if(row[x]==='.'||!Number.isInteger(n))continue;const xx=back?23-(x+x0):x+x0;r(xx*2,(y+y0)*2,2,2,art.palette[n]);}}// Phase 4: finer one-pixel edge accents and differentiated rear markings.
// The 24px silhouettes stay recognizable; 48px canvas now uses individual
// pixels for light/shadow accents instead of only 2x2 blocks.
const occupied=(x,y)=>y>=0&&y<height&&x>=0&&x<art.rows[y].length&&art.rows[y][x]!=='.';
for(let y=0;y<height;y++){for(let x=0;x<art.rows[y].length;x++){
if(!occupied(x,y))continue;
const ch=art.rows[y][x],n=Number(ch);if(!Number.isInteger(n))continue;
const px=(back?23-(x+x0):x+x0)*2,py=(y+y0)*2;
// Small directional rim lights make the forms readable at native scale.
if(!occupied(x,y-1)&&n===0)r(px,py,2,1,art.palette[2]);
if(!occupied(x-1,y)&&n===0)r(back?px+1:px,py+1,1,1,art.palette[2]);
if(!occupied(x,y+1)&&n===0)r(px,py+1,2,1,art.palette[1]);
}}
// Phase 4 polish: subtle form-specific texture, highlights and separation.
// All additions are inside the original 48x48 canvas and preserve silhouettes.
const accent=art.palette[3]||art.palette[2];
if(d.id===1){r(20,10,8,2,accent);r(16,13,2,5,art.palette[1]);r(30,13,2,5,art.palette[1]);}
if(d.id===4){r(30,38,3,3,art.palette[3]);r(32,35,2,3,art.palette[2]);}
if(d.id===7){r(16,24,16,2,art.palette[2]);r(18,29,12,2,art.palette[1]);}
if(d.id===25){r(15,7,2,5,art.palette[1]);r(32,7,2,5,art.palette[1]);}
if(d.id===133){r(12,13,3,3,art.palette[2]);r(33,13,3,3,art.palette[2]);}
if(d.id===359){r(14,22,3,5,art.palette[2]);r(31,22,3,5,art.palette[2]);}
if(back){
// Rear-facing artwork has no frontal eyes; a subtle species-colored
// shoulder/back pattern distinguishes it from the front view.
r(19,15,10,3,art.palette[1]);r(21,23,6,5,art.palette[2]);
r(23,20,2,2,art.palette[1]);
}else{
// Small eye glints are intentionally finer than the base silhouette.
for(let y=0;y<height;y++)for(let x=0;x<art.rows[y].length;x++){
if(art.rows[y][x]!=='2')continue;
const px=(x+x0)*2,py=(y+y0)*2;
r(px,py,1,1,'#fff6df');
}
}return true;}
const [main,shade,light]=d.palette;
if(d.shape===0){r(9,14,8,15,shade);r(31,14,8,15,shade)}
if(d.shape===1){r(12,7,8,16,main);r(29,7,8,16,main)}
if(d.shape===2){r(5,22,11,12,shade);r(33,22,11,12,shade)}
if(d.shape===3){r(11,10,6,14,shade);r(31,10,6,14,shade)}
if(d.shape===4){r(5,28,9,8,shade);r(34,28,9,8,shade)}
r(12,19,24,20,shade);r(15,14,18,23,main);r(18,11,12,9,main);r(19,17,10,4,light);r(14,33,7,8,shade);r(27,33,7,8,shade);
if(d.mark%2===0){r(20,25,8,8,light)}else{r(16,24,5,6,light);r(27,24,5,6,light)}
if(!back){r(19,20,3,3,'#26383c');r(28,20,3,3,'#26383c');r(23,29,4,2,shade)}else{r(18,15,12,4,shade);r(21,22,6,9,light)}return true;}
