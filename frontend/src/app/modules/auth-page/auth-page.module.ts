import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthPageRoutingModule } from './auth-page-routing.module';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { ValidationErrorsService } from './services/validation-errors.service';
import { AuthSwitcherComponent } from './components/auth-switcher/auth-switcher.component';
import { AlertComponent } from './components/alert/alert.component';
import { MaterialModule } from '@modules/material';
import { AuthFormComponent } from './components/auth-form/auth-form.component';

@NgModule({
  declarations: [AuthPageComponent, AuthSwitcherComponent, AlertComponent, AuthFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    FlexLayoutModule,

    MaterialModule,

    AuthPageRoutingModule,
  ],
  providers: [ValidationErrorsService],
})
export class AuthPageModule {}
