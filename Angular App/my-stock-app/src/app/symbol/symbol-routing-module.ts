import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SymbolLayoutComponent } from './symbol-layout/symbol-layout.component';
import { SymbolDetailComponent } from './symbol-detail/symbol-detail.component';


const routes: Routes = [
    {
        path: '', component: SymbolLayoutComponent,
        children: [
            { path: '', component: SymbolDetailComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SymbolRoutingModule {}