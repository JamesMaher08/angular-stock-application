import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { registerLocaleData } from '@angular/common';
import { Transaction } from '../models/transaction';
import { PortfolioUtils as pu } from '../helpers/portfolio.utils';

// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users')) || [];

// array in local storage for registered transactions
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// array in local storage for user portfolios
let portfolios = JSON.parse(localStorage.getItem('portfolios')) || [];


@Injectable()
export class FakeBackEndInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;
        console.log("Intercept Request", request);
        return of(null)
            .pipe(mergeMap(handleRoute));
        // .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        // .pipe(delay(500))
        // .pipe(dematerialize());

        function handleRoute() {
            console.log("URL", url);
            switch (true) {

                // User endpoints
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users/register') && method === 'POST':
                    return register();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                case url.match(/\/users\/\d+$/) && method === 'GET':
                    return getUserById();
                case url.match(/\/users\/\d+$/) && method === 'PUT':
                    return updateUser();
                case url.match(/\/users\/\d+$/) && method === 'DELETE':
                    return deleteUser();

                // Transaction endpoints
                case url.endsWith('transaction/buy') && method === 'POST':
                    return purchase();
                case url.endsWith('transaction/sell') && method === 'POST':
                    return sell();
                case url.endsWith('transaction/dividend') && method === 'POST':
                    return dividend();
                case url.endsWith('transactions/all') && method === 'GET':
                    return getAllTransactions();
                case url.match(/\/transactions\/user\/\d+$/) && method === 'GET':
                    return getUserTransactions();
                case url.match(/\/transactions\/delete\/\d+$/) && method === 'DELETE':
                    return deleteTransactionById();

                // Portfolio endpoints
                case url.endsWith('/portfolio/register') && method === 'POST':
                    return registerPortfolio();
                case url.endsWith('/portfolio/deleteAll') && method === 'DELETE':
                    return deleteAllPortfolios();
                case url.match(/\/portfolio\/update\/\d+$/) && method === 'POST':
                    return updatePortfolio();
                default:
                    // pass through any request not handled above
                    console.log("Damn no cases");
                    return next.handle(request);
            }
        }

        function authenticate() {
            const { username, password } = body;
            const user = users.find(x => x.username === username && x.password === password);
            if (!user) {
                console.log("the user did not exist");
                return error('Username or password is incorrect');
            }
            return ok({
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                token: 'fake-jwt-token'
            });
        }

        // USER FUNCTIONS

        function register() {
            const user = body;

            if (users.find(x => x.username === user.username)) {
                return error('Username "' + user.username + '"is already taken');
            }

            user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
            return ok();
        }

        function getUsers() {
            if (!isLoggedIn()) return unauthorized();
            return ok(users);
        }

        function getUserById() {
            if (!isLoggedIn()) return unauthorized();
            const user = users.find(x => x.id === idFromUrl());
            return ok(user);
        }

        function updateUser() {
            if (!isLoggedIn()) return unauthorized();

            let params = body;
            let user = users.find(x => x.id === idFromUrl());

            // only update password if entered
            if (!params.password) {
                delete params.password;
            }

            // update and save user
            Object.assign(user, params);
            localStorage.setItem('users', JSON.stringify(users));

            return ok();
        }

        function deleteUser() {
            if (!isLoggedIn()) return unauthorized();
            users = users.filter(x => x.id !== idFromUrl());
            localStorage.setItem('users', JSON.stringify(users));
            return ok();
        }

        // TRANSACTION FUNCTIONS

        function purchase() {
            console.log("FBE:Purchase");
            const transaction: Transaction = body;
            transaction.id = (transactions.length ? Math.max(...transactions.map(x => x.id)) + 1 : 1).toString();
            console.log(transaction);
            transactions.push(transaction);
            localStorage.setItem('transactions', JSON.stringify(transactions));
            return ok("ITS OK");
        }

        function sell() {
            console.log("FBE:Sell");
            const transaction: Transaction = body;
            transaction.id = (transactions.length ? Math.max(...transactions.map(x => x.id)) + 1 : 1).toString();
            console.log(transaction.id);
            transactions.push(transaction);
            localStorage.setItem('transactions', JSON.stringify(transactions));
            return ok("ITS OK");
        }

        function dividend() {
            console.log("FBE:Dividend");
            const transaction: Transaction = body;
            transaction.id = (transactions.length ? Math.max(...transactions.map(x => x.id)) + 1 : 1).toString();
            console.log(transaction.id);
            transactions.push(transaction);
            localStorage.setItem('transactions', JSON.stringify(transactions));
            return ok("ITS OK");
        }

        function getAllTransactions() {
            console.log("FBE:Get All");
            if (!isLoggedIn()) return unauthorized();
            return ok(transactions);
        }

        function getUserTransactions() {
            console.log("FBE: Get user transactions");
            if (!isLoggedIn()) return unauthorized();
            const userTransactions = transactions.filter(x =>
                x.userId === idFromUrl()
            );
            return ok(userTransactions);
        }

        function deleteTransactionById() {
            if (!isLoggedIn()) return unauthorized();
            transactions = transactions.filter(x => x.id !== idFromUrl().toString());
            localStorage.setItem('transactions', JSON.stringify(transactions));
            return ok();
        }

        // Portfolio Functions
        function registerPortfolio() {
            const portfolio = body;

            portfolio.id = portfolios.length ? Math.max(...portfolios.map(x => x.id)) + 1 : 1;
            portfolios.push(portfolio);
            localStorage.setItem('portfolios', JSON.stringify(portfolios));
            return ok(portfolio);
        }

        function deleteAllPortfolios() {
            localStorage.removeItem("portfolios");
            localStorage.removeItem("portfolio");
            return ok();
        }

        function updatePortfolio() {
            console.log("In Update Portfolio");
            let order: Transaction = body;
            let portfolio = portfolios.find(x => x.id === idFromUrl());
            console.log("Portfolio", portfolio);
            console.log("Params", order);

            let type = order.type;
            let symbol = order.symbol;
            let amount = order.amountInDollars;

            // If this is a new holding add it to the list
            if (!pu.containsSymbol(portfolio, symbol)) {
                console.log("Adding new holding");
                portfolio.holdingList.push(pu.buildNewHolding(order));
            } else {
                // else update exisisting holding
                console.log("Updating existing holding");
                let updatedHoldings = portfolio.holdingList.map(holding => {
                    console.log("holding", holding);
                    if (holding.symbol === symbol) {
                        console.log("found it");
                        holding.numberOfShares += order.numberOfShares;
                        holding.equity += order.marketPrice;
                    }
                    return holding;
                });

                console.log("Updated Holdings", updatedHoldings);
                portfolio.holdingList = updatedHoldings;

                // persons = persons.map(item => {
                //     item.salary += 1000;
                //     return item;
                //   });
            }

            console.log("portfolio after", portfolio);

            // update and save user
            Object.assign(portfolio, portfolio);

            localStorage.setItem('portfolios', JSON.stringify(portfolios));
            // update the portfolio
            localStorage.setItem('portfolio', JSON.stringify(portfolio));
            return ok(portfolio);
        }

        // helper functions

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message) {
            return throwError({ error: { message } });
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorized' } });
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }

    }

}

export const fakeBackendProvider = {
    // use fake backend in place of HTTP service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackEndInterceptor,
    multi: true
}