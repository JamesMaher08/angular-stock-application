import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction';
import { Portfolio, Holding } from '../models/portfolio';
import { MultiDataSet, Label, SingleDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';


import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PortfolioChartBuilder {

  transactions: Transaction[];

  constructor() { }

  //TODO - Build portfolio from scratch
  // this method will get all user transaction history and iterate through it based on the dates and manually 
  // build the portfolio

  // The other option is to update the portfolio everytime a transaction occurs

  buildUserPortfolioChart(portfolio: Portfolio) {
    console.log("In the service builder");
    console.log("Portfolio", portfolio);
    

    let lables = [];
    let data = [];

    let holdings = [...portfolio.holdingList];

    holdings.sort((a, b) => b.equity - a.equity);
    console.log(holdings);

    holdings.forEach(holding => {
      lables.push(holding.symbol);
      data.push(holding.equity);
    });

    return {
      labels: lables,
      data: data
    }
  }

  // getAssetSymbolSet(holdings: Holding[]) {
  //   let assetSymbolList = holdings.map(h => h.symbol);
  //   console.log(assetSymbolList);
  //   let assetSymbolSet = [... new Set(assetSymbolList)];
  //   console.log(assetSymbolSet);
  //   return assetSymbolSet;
  // }

  calculateAssetWeight() {
    //weight = (asset value/total portfolio value) x 100
  }

  getAssetSymbolSetFromTransactions(transactions: Transaction[]) {
    let assetSymbolList = transactions.map(t => t.symbol);
    console.log(assetSymbolList);
    let assetSymbolSet = [... new Set(assetSymbolList)];
    console.log(assetSymbolSet);

  }
}
