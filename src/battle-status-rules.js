export function typeBlocksStatus(status,types){
 if(!Array.isArray(types))return false;
 const validTypes=types.filter(t=>Number.isInteger(t)&&t>0);
 return status==='poison'&&(validTypes.includes(4)||validTypes.includes(9))||status==='burn'&&validTypes.includes(10)||status==='freeze'&&validTypes.includes(15)||status==='paralysis'&&validTypes.includes(13);
}