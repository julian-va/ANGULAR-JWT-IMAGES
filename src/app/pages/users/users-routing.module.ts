import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
