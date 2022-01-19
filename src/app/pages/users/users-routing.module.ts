import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { UserUpdateDeleteComponent } from './user-update-delete/user-update-delete.component';
import { UserallComponent } from './userall/userall.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'userall',
    pathMatch: 'full',
  },
  {
    path: 'userall',
    canActivate: [AuthGuard],
    component: UserallComponent,
  },
  {
    path: 'update/:userId',
    canActivate: [AuthGuard],
    component: UserUpdateDeleteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
