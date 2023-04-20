import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SymbolDetailComponent } from './symbol-detail/symbol-detail.component';
import { SymbolRoutingModule } from './symbol-routing-module';
import { SymbolLayoutComponent } from './symbol-layout/symbol-layout.component';

@NgModule({
    imports: [
        CommonModule,
        SymbolRoutingModule

    ],
    declarations: [
        SymbolLayoutComponent,
        SymbolDetailComponent
    ]
})
export class SymbolModule { }