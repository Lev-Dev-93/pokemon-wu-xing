// Einheitlicher, orthogonaler Kartenplan: Hauptachsen und kurze Hauszufahrten.
export function isVillageRoad(x,y){return (y===7&&x>=0&&x<=21)||(x===10&&y>=0&&y<=13)||(y===6&&x>=4&&x<=17)||(y===13&&x>=4&&x<=17)||(x===4&&y>=6&&y<=7)||(x===17&&y>=6&&y<=7)||(x===4&&y>=12&&y<=13)||(x===17&&y>=12&&y<=13);}
export function isResearchRoad(x,y){return (y===7&&x>=4&&x<=15)||(x===4&&y>=4&&y<=7)||(x===12&&y>=4&&y<=7)||(y===5&&x>=4&&x<=12);}
export function isBerryRoad(x,y){return (y===7&&x>=0&&x<=15)||(x===7&&y>=5&&y<=14)||(y===6&&x>=3&&x<=12)||(y===13&&x>=3&&x<=12)||(x===3&&y>=5&&y<=7)||(x===12&&y>=5&&y<=7)||(x===3&&y>=13&&y<=14)||(x===12&&y>=13&&y<=14);}
export function isSettlementRoad(id,x,y){return id==='village'?isVillageRoad(x,y):id==='professor_clearing'?isResearchRoad(x,y):id==='beerendorf'?isBerryRoad(x,y):false;}
