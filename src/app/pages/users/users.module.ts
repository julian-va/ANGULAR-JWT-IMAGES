import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserallComponent } from './userall/userall.component';
import { UserUpdateDeleteComponent } from './user-update-delete/user-update-delete.component';
import { MaterialModule } from 'src/app/share/material/material.module';

@NgModule({
  declarations: [UserallComponent, UserUpdateDeleteComponent],
  imports: [CommonModule, UsersRoutingModule, MaterialModule],
})
export class UsersModule {}
