import { Component, OnInit } from '@angular/core';
import { PortfolioTransactionService } from '../../shared/services/portfolio-transaction.service';
import { first } from 'rxjs/operators';
import { Transaction, TransactionType } from '../../shared/models/transaction';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PortfolioService } from '../../shared/services/portfolio.service';

@Component({
  selector: 'app-transaction-editor',
  templateUrl: './transaction-editor.component.html',
  styleUrls: ['./transaction-editor.component.scss']
})
export class TransactionEditorComponent implements OnInit {
  transactions: Transaction[];
  addTransactionForm: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;

  constructor(
    private transactionService: PortfolioTransactionService,
    private formBuilder: FormBuilder,
    private portfolioService: PortfolioService
  ) { }

  ngOnInit(): void {
    // Populate user transactions list on page load
    this.refreshTransactionTable();

    this.addTransactionForm = this.formBuilder.group({
      type: ['', Validators.required],
      symbol: ['', Validators.required],
      numberOfShares: ['', Validators.required],
      mktPrice: ['', Validators.required],
      dollarAmount: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  getAllTransactions() {
    this.transactionService.getAllTransactions()
      .pipe(first())
      .subscribe(data => {
        console.log("Data", data);
        this.transactions = data;
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.addTransactionForm.controls; }

  onSubmit() {
    console.log("Add transaction");
    this.submitted = true;

    if (this.addTransactionForm.invalid) {
      console.log("Invalid form");
      return;
    }

    this.loading = true;
    console.log("FORM", this.addTransactionForm.value);
    let formData = this.addTransactionForm.value;

    let order = new Transaction();
    order.type = this.determineOrderType(formData.type);
    order.symbol = formData.symbol;
    order.numberOfShares = Number(formData.numberOfShares);
    order.amountInDollars = Number(formData.dollarAmount);
    order.marketPrice = Number(formData.mktPrice);
    order.date = formData.date;

    if (order.type === TransactionType.MARKET_BUY) {
      this.transactionService.purchase(order)
        .pipe(first())
        .subscribe(data => {
          console.log("Data", data);
          this.loading = false;
          this.submitted = false;
          this.resetAddTransactionForm();
          this.refreshTransactionTable();
          console.log("Before the handle");
          this.portfolioService.handlePurchase(order)
          .pipe(first())
          .subscribe(data => {
            console.log("ALL Done");
            console.log("Data", data);
          })
        });
    } else if (order.type === TransactionType.MARKET_SELL) {
      this.transactionService.sell(order)
        .pipe(first())
        .subscribe(data => {
          console.log("Data", data);
          this.loading = false;
          this.submitted = false;
          this.resetAddTransactionForm();
          this.refreshTransactionTable();
        });
    } else if (order.type === TransactionType.DIVIDEND_PAYMENT) {
      this.transactionService.dividend(order)
        .pipe(first())
        .subscribe(data => {
          console.log("Data", data);
          this.loading = false;
          this.submitted = false;
          this.resetAddTransactionForm();
          this.refreshTransactionTable();
        });
    }

  }

  deleteTransaction(order: Transaction) {
    this.transactionService.deleteTransaction(order.id)
      .pipe(first())
      .subscribe(data => {
        console.log("Data", data);
        this.refreshTransactionTable();
      });
  }




  determineOrderType(orderType) {
    console.log("OrderType", orderType);
    console.log("Type", typeof orderType);

    switch (orderType) {
      case "1":
        console.log("Case 1");
        return TransactionType.MARKET_BUY;
      case "2":
        console.log("Case 2");
        return TransactionType.MARKET_SELL;
      case "3":
        console.log("Case 3");
        return TransactionType.DIVIDEND_PAYMENT;
      default:
        console.log("Default");
        return null;
    }
  }

  refreshTransactionTable() {
    this.transactionService.getAllUserTransactions()
      .pipe(first())
      .subscribe(data => {
        console.log("Data", data);
        this.transactions = data;
      });
  }

  resetAddTransactionForm() {
    console.log("Trying to reset");
    this.addTransactionForm.reset(
      {
        type: "",
        symbol: "",
        numberOfShares: "",
        mktPrice: "",
        dollarAmount: "",
        date: ""
      }
    )
  }



}
