import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, SingleDataSet } from 'ng2-charts';
import { PortfolioChartBuilder } from '../../shared/services/portfolio-chart-builder';
import { first } from 'rxjs/operators';
import { Transaction, TransactionType} from '../../shared/models/transaction';
import { PortfolioTransactionService } from '../../shared/services/portfolio-transaction.service';
import { AccountService } from '../../shared/services/account.service';
import { User } from '../../shared/models/user';
import { PortfolioService } from '../../shared/services/portfolio.service';
import { Portfolio, Holding } from '../../shared/models/portfolio';
import { MOCK_ALL_SYMBOL_NAMES } from '../../shared/mocks/mock-all-symbol-names-payload';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  labels: Label[] = [];
  data: SingleDataSet = [];
  type: ChartType = 'doughnut';

  tableHoldings: Holding[];
  portfolioName: String = "Default Portfolio";
  SYMBOL_NAME_MAP = MOCK_ALL_SYMBOL_NAMES;

  //Mock set of symbols for display/testing
  MOCK_SYMBOL_LIST=["AAPL", "AMZN", "MSFT", "DIS", "VOO", "NFLX", "SPOT", "KO", "T", "WMT", "JPM", "V", "VYM", "TSLA", "SPY", "SBUX", "GOOGL", "QQQ", "XOM", "NKE", "SHOP", "TGT", "CRM", "UBER", "GME", "VTI", "NVDA", "META", "COST"];

  
  hoveredHoldingSymbol: String;
  hoveredHoldingEquity: number;

  accountBalance: number;

  constructor(
    private accountService: AccountService,
    private transactionService: PortfolioTransactionService,
    private portfolioService: PortfolioService,
    private portfolioChartBuilder: PortfolioChartBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.initializePortfolio(); //Demo portfolio
    this.buildPortfolio();
  }

  initializePortfolio() {
    this.labels = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight'];
    this.data = [50, 200, 34, 130, 56, 298, 48, 123];
    this.accountBalance = this.data.reduce(this.add);
    console.log(this.accountBalance);
    // this.labels = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight','One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight','One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight','One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight'];
    // this.data = [50, 200, 34, 130, 56, 298, 48, 123,50, 200, 34, 130, 56, 298, 48, 123,50, 200, 34, 130, 56, 298, 48, 123,50, 200, 34, 130, 56, 298, 48, 123];
  }

  add(a,b) {
    return a + b;
  }

  buildPortfolio() {
    let userPortfolio: Portfolio = this.portfolioService.userPortfolio;
    console.log("can you see me?");
    this.buildPortfolioChart(userPortfolio);
    this.buildPortfolioTable(userPortfolio);
    this.accountBalance = this.calculateAccountBalance(userPortfolio);
  }

  buildPortfolioChart(userPortfolio: Portfolio) {
    let chartConfig = this.portfolioChartBuilder.buildUserPortfolioChart(userPortfolio);
    console.log("Chart config", chartConfig);
    this.labels = chartConfig.labels;
    this.data = chartConfig.data;
    this.portfolioName = userPortfolio.name;
  }

  buildPortfolioTable(userPortfolio: Portfolio) {
    let holdings = [...userPortfolio.holdingList];
    holdings.sort((a, b) => b.equity - a.equity);
    this.tableHoldings = holdings;
  }

  calculateAccountBalance(userPortfolio: Portfolio) {
    let holdings = [...userPortfolio.holdingList];
    let result = holdings.map(holding => holding.equity);
    return result.reduce(this.add);
  }

  public chartHovered(event: any): void {
    let index = event.active[0]._index;
    if (event.active[0]['_model'].label) {
      this.hoveredHoldingSymbol = event.active[0]['_model'].label;
    }
    if (event.active[0]._chart.config.data.datasets[0].data[index]) {
      this.hoveredHoldingEquity = event.active[0]._chart.config.data.datasets[0].data[index];
    }
  }

  clearHovered() {
    this.hoveredHoldingSymbol = null;
    this.hoveredHoldingEquity = null;
  }

  rowEnter(holding:Holding) {
    if (holding) {
      this.hoveredHoldingSymbol = holding.symbol;
      this.hoveredHoldingEquity = holding.equity;
    }
  }

  onRowClick(holding:Holding) {
    // this.router.navigate(['/symbol', { id: holding.symbol }]);
    console.log("Navigating");
    this.router.navigate(['/symbol', holding.symbol]);
  }


  createMockUserPortfolio() {
    console.log("Building Mock Portfolio")
    let port = this.portfolioService.userPortfolio;
    console.log("PORT", port);
    const user = this.accountService.userValue;
    this.portfolioService.registerTestPortfolio()
      .pipe(first())
      .subscribe(data => {
        console.log("Data", data);
      });

    console.log("After registering mock porfolio");

    for (let i = 0; i < 10; i++) {
      let order = new Transaction();
      order.type = TransactionType.MARKET_BUY;
      let index = this.generateRandomNumber(0,this.MOCK_SYMBOL_LIST.length);
      console.log("Index:", index);

      order.symbol = this.MOCK_SYMBOL_LIST[index];
      console.log("Random Symbol:", order.symbol);

      if (order.symbol === undefined) {
        console.log("OMG LOOK HERE");
      }

      order.numberOfShares = Number(this.generateRandomNumber(1,100));
      order.amountInDollars = Number(this.generateRandomNumber(1,100));
      order.marketPrice = Number(this.generateRandomNumber(1,100));
      order.date = this.getRandomDate();
  
      this.portfolioService.handlePurchase(order)
            .pipe(first())
            .subscribe(data => {
              console.log("Data", data);
            });
      console.log("Added entry to portfolio");
    }

    this.buildPortfolio();
  }

  generateRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max-1 - min + 1) + min)
  }

  getRandomDate() {
    const maxDate = Date.now();
    const timestamp = Math.floor(Math.random() * maxDate);
    return new Date(timestamp);
}

  deleteAllPortfolios() {
    this.portfolioService.deleteAllPortfolios()
      .pipe(first())
      .subscribe(data => {
        console.log("Data", data);
      });
  }

  getSymbolName(symbol: string) {
    console.log("Symbol Name:", symbol);
    if (this.SYMBOL_NAME_MAP) {
      let matchingSymbol = this.SYMBOL_NAME_MAP.find(x => x.symbol.toUpperCase() === symbol.toUpperCase());
      if (matchingSymbol) {
        return matchingSymbol.name;
      }
    }
    return null;
  }



  // this.transactionService.getAllUserTransactions()
  //   .pipe(first())
  //   .subscribe(data => {
  //     transactions = data;
  //     if (transactions) {
  //       this.portfolioChartBuilder.buildUserPortfolioChart(transactions);
  //     } else {
  //       console.log("Didn't get any transactions");
  //     }



  //   });


}
