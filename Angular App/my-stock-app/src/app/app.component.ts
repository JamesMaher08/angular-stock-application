import { Component } from '@angular/core';
import { User } from './shared/models/user';
import { AccountService } from './shared/services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Stocks App';
  user: User;

  searchText: string;

  constructor(private accountService: AccountService, private router: Router) {
    this.accountService.user.subscribe(x => this.user = x);
  }

  logout() {
    this.accountService.logout();
  }

  search(text) {
    console.log(text);
    // this.router.navigate(['/company', { id: this.searchText }]);
    this.router.navigate(['/symbol', text]);
    this.clearSearch();
  }

  clearSearch() {
    this.searchText = null;
  }


}
