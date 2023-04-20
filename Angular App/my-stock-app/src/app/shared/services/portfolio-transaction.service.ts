import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Transaction } from '../models/transaction';
import { AccountService } from '../services/account.service';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PortfolioTransactionService {

  // breaking these apart for now, eventually may want to combine to a
  // single url and let the backend handle by inspecting the types...
  TRANSACTION_BUY_URL: string = `${environment.apiUrl}/transaction/buy`;
  TRANSACTION_SELL_URL: string = `${environment.apiUrl}/transaction/sell`;
  TRANSACTION_DIVIDEND_URL: string = `${environment.apiUrl}/transaction/dividend`;
  TRANSACTION_GET_ALL_URL: string = `${environment.apiUrl}/transactions/all`;
  GET_USER_TRANSACTIONS: string = `${environment.apiUrl}/transactions/user`;
  DELETE_TRANSACTION_URL: string = `${environment.apiUrl}/transactions/delete`;

  REGISTER_URL: string = `${environment.apiUrl}/portfolio/register`;

  constructor(private accountService: AccountService, private http: HttpClient) { }

  build() {
    return this.http.get(`${this.REGISTER_URL}`)
    .pipe(map(x => {
      console.log("GOT", x);
      return x;
    }));
  }

  purchase(order: Transaction) {
    console.log("Purchase Order");
    const user = this.accountService.userValue;
    console.log("User", user);

    // set user id as a header
    const headers = new HttpHeaders()
      .set('user-id', user.id);

    // set user id as a field
    order.userId = user.id;


    return this.http.post<Transaction>(`${this.TRANSACTION_BUY_URL}`, order, { 'headers': headers })
      .pipe(map(x => {
        console.log("GOT x", x);
        return x;
      }

      ));
  }

  sell(order: Transaction) {
    console.log("Sell Order");
    const user = this.accountService.userValue;
    console.log("User", user);

    // set user id as a header
    const headers = new HttpHeaders()
      .set('user-id', user.id);

    // set user id as a field
    order.userId = user.id;
    return this.http.post<Transaction>(`${this.TRANSACTION_SELL_URL}`, order, { 'headers': headers })
      .pipe(map(x => {
        console.log("GOT x", x);
        return x;
      }

      ));
  }

  dividend(order: Transaction) {
    console.log("Dividend Payment");
    const user = this.accountService.userValue;
    console.log("User", user);

    // set user id as a header
    const headers = new HttpHeaders()
      .set('user-id', user.id);

    // set user id as a field
    order.userId = user.id;
    return this.http.post<Transaction>(`${this.TRANSACTION_DIVIDEND_URL}`, order, { 'headers': headers })
      .pipe(map(x => {
        console.log("GOT x", x);
        return x;
      }

      ));
  }

  deleteTransaction(id: String) {
    console.log("Deleting", id);
    return this.http.delete(`${this.DELETE_TRANSACTION_URL}/${id}`)
    .pipe(map(x => {
      console.log("Back from the delete intercept", x);
      return x;
    }));
  }

  getAllTransactions() {
    console.log("Get All Transactions");
    return this.http.get<Transaction[]>(`${this.TRANSACTION_GET_ALL_URL}`)
      .pipe(map(x => {
        console.log("GOT", x);
        return x;
      }));
  }

  getAllUserTransactions() {
    console.log("Get All User Transactions");
    const user = this.accountService.userValue;
    let id = user.id;
    return this.http.get<Transaction[]>(`${this.GET_USER_TRANSACTIONS}/${id}`)
      .pipe(map(x => {
        console.log("GOT", x);
        return x;
      }));
  }





}
