import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsRoutingModule } from './transactions-routing-module';
import { TransactionEditorComponent } from './transaction-editor/transaction-editor.component';
import { TransactionsLayoutComponent } from './transactions-layout/transactions-layout.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        TransactionsRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [
        TransactionsLayoutComponent,
        TransactionEditorComponent
    ]
})
export class TransactionsModule { }