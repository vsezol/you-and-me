import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@modules/material';
import { ValidationErrorsService } from '@modules/auth-page/services';
import {
  AlertComponent,
  AuthFormComponent,
  AuthSwitcherComponent,
  AuthPageComponent,
} from '@modules/auth-page/components';
import { AuthPageRoutingModule } from './auth-page-routing.module';

@NgModule({
  declarations: [
    AuthPageComponent,
    AuthSwitcherComponent,
    AlertComponent,
    AuthFormComponent,
  ],
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
