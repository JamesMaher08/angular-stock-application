import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersLayoutComponent } from './users-layout/users-layout.component';
import { UsersListComponent } from './users-list/users-list.component';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';

const routes: Routes = [
    {
        path: '', component: UsersLayoutComponent,
        children: [
            { path: '', component: UsersListComponent },
            { path: 'addUser', component: AddEditUserComponent },
            { path: 'edit/:id', component: AddEditUserComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule { }