import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserallComponent } from './userall/userall.component';
import { UserUpdateDeleteComponent } from './user-update-delete/user-update-delete.component';
import { MaterialModule } from 'src/app/share/material/material.module';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [UserallComponent, UserUpdateDeleteComponent],
  imports: [CommonModule, UsersRoutingModule, MaterialModule, MatSortModule],
})
export class UsersModule {}
