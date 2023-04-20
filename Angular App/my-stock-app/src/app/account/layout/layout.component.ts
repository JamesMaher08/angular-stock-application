import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../shared/services/account.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(private router: Router, private accountService: AccountService) { 
    // redirect to home if already logged in
    if (this.accountService.userValue) {
      console.log("User logged in");
      this.router.navigate(['/']);
    } else {
      console.log("User not logged in");
    }
   }

  ngOnInit(): void {
  }

}
