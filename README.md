README

## Setup
#To run stocks application:

1. Run the python backend 
	..\Stock Application>python app.py

In another terminal 
2. Install Node Modules
	....\Stock Application\Angular App\my-stock-app>npm install
	
3. Run the Angular front end
	..\Stock Application\Angular App\my-stock-app>ng serve


Access the stock application by navigating to localhost:4200


### Navigating the Stock Application

## Account Registration
The first thing you will see when accessing the application url is a login screen. You will need to register an account before you will be able to access the rest of the site.

NOTE: The application does not have any persistant storage backing the user account data (or any of the stock/transaction for that matter). When an account is registered it is saved in the browser Local Storage cache which means it will remain in that browser until you delete it. 
To delete the local storage data: (f12 -> Application Tab -> Local Storage -> http://localhost:4200 -> [transactions, portfolio, portfolios, user, users])

This also means that you user credentials are not secure so don't use any actual username/pw that you may use outside of this application.

## Login
Once you have registered an an account you can then login to the account with the credentials previously provided

## Dashboard
Once you've successfully logged in you will have reached the main dashboard page. This is where information about the stocks in your portfolio would be displayed including the name, number of shares, equity, and percentage of overal portfolio. 

By default as a new user you don't have a portfolio so nothing appears on the main dashboard. You can build a dashboard in two ways.
* At the bottom of the main dashboard you can find a button titled "Create Mock Portfolio". Clicking this button will generate a sample portfolio and assign randomized values to the number of shares and equity so that you can see what the dashboard might look like for an actual portfolio
* You can build a portfolio from scratch via the Transactions tab. In the Transactions tab you can manually enter buys and sells for your portfolio and the dashboard should update your portfolio to reflect the transaction history.



# IEX Cloud
Unfortunately IEX Cloud, who is the provider of the stock market data used in the application, discontinued support for their free sandbox testing API in 2019 and so some of the functionality of the application is no longer function such as the search function, as well as any additional company/symbol data that would have been returned from searching.




This project was way to explore my interest in Angular, Python, and the stock market all at the same time.
	
Ref Project -> https://jasonwatmore.com/post/2020/07/18/angular-10-user-registration-and-login-example-tutorial

check out Heroku as a possible cloud hosting option
heroku.com