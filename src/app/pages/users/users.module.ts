import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserallComponent } from './userall/userall.component';
import { UserUpdateDeleteComponent } from './user-update-delete/user-update-delete.component';


@NgModule({
  declarations: [
    UserallComponent,
    UserUpdateDeleteComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
