import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth/auth.component';
import { MaterialModule } from '../../share/material/material.module';
import { CreateUserComponent } from './create-user/create-user.component';

@NgModule({
  declarations: [AuthComponent, CreateUserComponent],
  imports: [CommonModule, AuthRoutingModule, MaterialModule],
})
export class AuthModule {}
