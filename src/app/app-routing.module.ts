import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './views/users-list/user-list/users-list.component';
import { CreateUserComponent } from './views/users-list/create-user/create-user.component';

const routes: Routes = [
  {
    path : '',
    redirectTo : 'users-list',
    pathMatch : 'full'
  },
  {
    path : 'users-list',
    component : UsersListComponent
  },
  {
    path : 'create-user',
    component : CreateUserComponent
  },
  {
    path : 'create-user/:id',
    component : CreateUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
