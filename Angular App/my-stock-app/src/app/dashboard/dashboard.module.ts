import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { TestComponent } from './test/test.component';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { HomeComponent } from './home/home.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        ChartsModule
    ],
    declarations: [
        TestComponent,
        DashboardLayoutComponent,
        HomeComponent,
        TestComponent
    ]
})
export class DashboardModule { }