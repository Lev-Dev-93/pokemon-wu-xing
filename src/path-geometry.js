// Canonical visible road geometry. Kept independent of map construction to avoid import cycles.
export function isVillageRoad(x,y){return (y===7&&x>=0&&x<=21)||(x===10&&y>=0&&y<=11)||(y===11&&x>=5&&x<=19)||(x===5&&y>=7&&y<=12)||(x===19&&y>=7&&y<=12)||(x===20&&y>=7&&y<=8);}
export function isResearchRoad(x,y){return (y===7&&x>=6&&x<=15)||(x===6&&y>=4&&y<=7)||(x===11&&y>=4&&y<=7)||(y===6&&x>=6&&x<=11);}
export function isBerryRoad(x,y){return (y===7&&x>=0&&x<=15)||(x===7&&y>=7&&y<=13)||(x===4&&y>=5&&y<=7)||(x===14&&y>=5&&y<=7)||(y===13&&x>=3&&x<=13)||(x===3&&y>=13&&y<=14)||(x===13&&y>=13&&y<=14);}
export function isSettlementRoad(id,x,y){return id==='village'?isVillageRoad(x,y):id==='professor_clearing'?isResearchRoad(x,y):id==='beerendorf'?isBerryRoad(x,y):false;}
