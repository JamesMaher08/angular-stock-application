import { Portfolio, Holding } from '../models/portfolio';
import { Transaction } from '../models/transaction';

export class PortfolioUtils {

    static containsSymbol(portfolio: Portfolio, symbol: string): boolean {
        var containsSymbol = portfolio.holdingList.filter(holding => (holding.symbol === symbol));
        return containsSymbol.length > 0;
    }

    static buildNewHolding(order: Transaction) {
        let holding: Holding = new Holding();
        holding.symbol = order.symbol;
        holding.numberOfShares = order.numberOfShares;
        holding.equity = order.amountInDollars;
        return holding;
    }
}