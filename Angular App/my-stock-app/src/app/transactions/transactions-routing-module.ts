import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionsLayoutComponent } from './transactions-layout/transactions-layout.component';
import { TransactionEditorComponent } from './transaction-editor/transaction-editor.component';


const routes: Routes = [
    {
        path: '', component: TransactionsLayoutComponent,
        children: [
            { path: '', component: TransactionEditorComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TransactionsRoutingModule {}