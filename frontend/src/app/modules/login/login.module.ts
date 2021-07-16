import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LoginRoutingModule } from './login-routing-module.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    SharedModule
  ],
})
export class LoginModule {}
