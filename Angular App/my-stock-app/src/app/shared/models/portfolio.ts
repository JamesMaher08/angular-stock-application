export class Portfolio {
    id: string;
    userId: string;
    name: string;
    holdingList: Holding[];
    createdDate: Date;
    pieList?: AssetPie[];

    constructor(init?:Partial<Portfolio>) {
        Object.assign(this, init);
    }
}

export class Holding {
    symbol: string;
    numberOfShares: number;
    equity: number;
}

export class AssetPie {
    
}