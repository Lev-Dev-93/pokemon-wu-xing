// Lokale Tageszeit ohne Einfluss auf den gespeicherten Storyfortschritt.
export function timeOfDayAt(hour){
 if(!Number.isInteger(hour)||hour<0||hour>23)throw Error('Ungültige Stunde');
 return hour>=6&&hour<20?'day':'night';
}
export function currentTimeOfDay(now=new Date()){
 if(!(now instanceof Date)||Number.isNaN(now.getTime()))throw Error('Ungültiges Datum');
 return timeOfDayAt(now.getHours());
}
