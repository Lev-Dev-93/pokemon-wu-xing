// Regeln für den Übergang zwischen Erkundung und Kämpfen.
export function battleOutcome(kind,winner,remainingTeam=0,remainingOpponents=0){
 if(!['wild','trainer','test'].includes(kind))throw Error('Unbekannter Kampftyp');
 if(!['player','opponent','escape','caught',null].includes(winner))throw Error('Unbekanntes Kampfergebnis');
 if(!Number.isInteger(remainingTeam)||remainingTeam<0||!Number.isInteger(remainingOpponents)||remainingOpponents<0)throw Error('Ungültige Teamgröße');
 if(winner===null)return 'ongoing';
 if(winner==='player'&&kind==='trainer'&&remainingOpponents>0)return 'next-opponent';
 if(winner==='opponent'&&remainingTeam>0)return 'switch';
 if(winner==='opponent')return 'blackout';
 if(winner==='caught'&&kind!=='wild')throw Error('Nur wilde Pokémon können gefangen werden');
 return 'complete';
}
