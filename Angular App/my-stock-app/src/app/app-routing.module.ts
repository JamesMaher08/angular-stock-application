import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './dashboard/home/home.component';
import { CompanyProfileComponent } from './shared/components/company-profile/company-profile.component';
import { AuthGuard } from './shared/helpers/auth.guard';
import { DashboardLayoutComponent } from './dashboard/dashboard-layout/dashboard-layout.component';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);
const dashboardModule = () => import('./dashboard/dashboard.module').then(x => x.DashboardModule);
const transactionsModule = () => import('./transactions/transactions.module').then(x => x.TransactionsModule);
const symbolModule = () => import('./symbol/symbol.module').then(x => x.SymbolModule);

const routes: Routes = [
  { path: '', loadChildren: dashboardModule, canActivate: [AuthGuard] },
  { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard]},
  { path: 'account', loadChildren: accountModule},
  { path: 'transactions', loadChildren: transactionsModule },
  { path: 'symbol/:symbol', loadChildren: symbolModule },
  { path: 'company', component: CompanyProfileComponent }, // probably don't need this -> symbol component instead
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
