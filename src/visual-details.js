// Pure canvas details: no game state mutation.
const rect=(c,x,y,w,h,color)=>{c.fillStyle=color;c.fillRect(Math.round(x),Math.round(y),w,h);};
export function heroShadow(c,x,y){rect(c,x+8,y+28,19,3,'#547052');rect(c,x+12,y+30,11,1,'#6d8b61');}
export function npcShadow(c,x,y){rect(c,x*32+8,y*32+28,18,3,'#536d51');}
export function waterGlint(c,x,y,phase=0){const shift=((phase%4)+4)%4;rect(c,x+5+shift*2,y+10,9,2,'#9bd6d7');rect(c,x+17-shift,y+23,7,1,'#c3e5db');}
export function objectHighlight(c,x,y,kind){if(kind==='pc')rect(c,x+9,y+8,9,2,'#e0ffff');if(kind==='box')rect(c,x+6,y+11,8,2,'#f6db9c');}
export function facingAccent(c,x,y,facing){if(facing==='left')rect(c,x+8,y+19,2,5,'#d5e2dc');else if(facing==='right')rect(c,x+26,y+19,2,5,'#d5e2dc');else if(facing==='up')rect(c,x+15,y+5,7,2,'#a17b62');else if(facing==='down')rect(c,x+14,y+20,9,2,'#8fb3c0');}
