export class Transaction {
    id: string;
    userId: string;
    portfolioId: string;
    type: TransactionType;
    symbol: string;
    numberOfShares: number;
    amountInDollars: number;
    marketPrice: number;
    date: Date;

    constructor(init?:Partial<Transaction>) {
        Object.assign(this, init);
    }
}

export enum TransactionType {
    MARKET_BUY = "MARKET_BUY",
    MARKET_SELL = "MARKET_SELL",
    DIVIDEND_PAYMENT = "DIVIDEND_PAYMENT"
}