import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Portfolio } from '../models/portfolio';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Transaction } from '../models/transaction';
import { AccountService } from '../services/account.service';
import { User } from '../models/user';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private portfolioSubject: BehaviorSubject<Portfolio>;
  public portfolio: Observable<Portfolio>;

  REGISTER_URL: string = `${environment.apiUrl}/portfolio/register`;
  DELETE_ALL_URL: string = `${environment.apiUrl}/portfolio/deleteAll`;

  constructor(private router: Router, private http: HttpClient, private accountService: AccountService) {
    this.portfolioSubject = new BehaviorSubject<Portfolio>(JSON.parse(localStorage.getItem('portfolio')));
    this.portfolio = this.portfolioSubject.asObservable();
  }

  public get userPortfolio(): Portfolio {
    return this.portfolioSubject.value;
  }

  registerTestPortfolio() {
    let portfolio = new Portfolio;
    console.log("Registering", portfolio);
    portfolio.name = "My Portfolio";
    portfolio.createdDate = new Date();
    portfolio.holdingList = [];
    portfolio.userId = this.accountService.userValue.id;
    console.log("Should register this", portfolio);
    return this.http.post<Portfolio>(`${this.REGISTER_URL}`, portfolio)
      .pipe(map(portfolio => {
        console.log("GOT", portfolio);
        localStorage.setItem('portfolio', JSON.stringify(portfolio));
        this.portfolioSubject.next(portfolio);
        return portfolio;
      }));
  }

  deleteAllPortfolios() {
    return this.http.delete(`${this.DELETE_ALL_URL}`)
      .pipe(map(x => {
        console.log("GOT", x);
        this.portfolioSubject.next(null);
        return x;
      }));
  }

  // register(portfolio: Portfolio) {
  //   console.log("Registering", portfolio);
  //   portfolio.name = "My Portfolio";
  //   portfolio.createdDate = new Date();
  //   portfolio.holdingList = [];
  //   portfolio.userId = this.accountService.userValue.id;
  //   console.log("Should register this", portfolio);
  //   return this.http.post(this.REGISTER_URL, portfolio);
  // }

  handlePurchase(order: Transaction) {
    console.log("handling purchase");
    console.log("ORDER:", order);
    const user = this.accountService.userValue;
    console.log("user", user);

    let portfolio = this.portfolioSubject.value;
    console.log("portfolio", portfolio);
    if (!portfolio) {
      console.log("Need to create");
      return;
    }

    console.log("Portfolio exists");
    return this.http.post(`${environment.apiUrl}/portfolio/update/${portfolio.id}`, order)
    .pipe(map(portfolio => {
      console.log("WHAT AM I", portfolio);
      // localStorage.setItem('portfolio', JSON.stringify(portfolio));
        // this.portfolioSubject.next(portfolio);
        return portfolio;
    }));



  }
}
