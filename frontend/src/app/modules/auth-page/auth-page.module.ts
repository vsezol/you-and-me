import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { AuthPageRoutingModule } from './auth-page-routing.module';

import { AuthPageComponent } from './auth-page/auth-page.component';
import { ValidationErrorsService } from './validation-errors.service';
import { AuthSwitcherComponent } from './components/auth-switcher/auth-switcher.component';
import { AlertComponent } from './components/alert/alert.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [AuthPageComponent, AuthSwitcherComponent, AlertComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    LayoutModule,
    FlexLayoutModule,

    MaterialModule,

    AuthPageRoutingModule,
    SharedModule,
  ],
  providers: [ValidationErrorsService],
})
export class AuthPageModule {}
