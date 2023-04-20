import { Component, OnInit } from '@angular/core';
import { PortfolioTransactionService } from '../../shared/services/portfolio-transaction.service';
import { Transaction, TransactionType } from '../../shared/models/transaction';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor(private transactionService: PortfolioTransactionService) { }

  ngOnInit(): void {
  }

  testBuy() {
    console.log("Test Buy");

    let order = new Transaction();
    order.type = TransactionType.MARKET_BUY;
    order.symbol = "AAPL";
    order.numberOfShares = 5;
    order.amountInDollars = 879;
    order.marketPrice = 495;
    order.date = new Date();



    this.transactionService.purchase(order)
      .pipe(first())
      .subscribe(data => {
        console.log("Data", data);
      });

  }

  testSell() {
    console.log("Test Sell");

    let order = new Transaction();
    order.type = TransactionType.MARKET_SELL;
    order.symbol = "NRZ";
    order.numberOfShares = 15;
    order.amountInDollars = 239.78;
    order.marketPrice = 15.49;
    order.date = new Date();

    this.transactionService.sell(order)
      .pipe(first())
      .subscribe(data => {
        console.log("Data", data);
      });

  }

  testDividend() {
    console.log("Test Dividend");

    let order = new Transaction();
    order.type = TransactionType.DIVIDEND_PAYMENT;
    order.symbol = "T";
    order.numberOfShares = .045;
    order.amountInDollars = 15.34;
    order.marketPrice = 29.89;
    order.date = new Date();

    this.transactionService.dividend(order)
      .pipe(first())
      .subscribe(data => {
        console.log("Data", data);
      });

  }

}
