import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

import { SharedModule } from '../shared/shared.module';
import { AuthPageRoutingModule } from './auth-page-routing.module';

import { AuthPageComponent } from './views/auth-page/auth-page.component';
import { ValidationErrorsService } from './validation-errors.service';
import { AuthModule } from '../auth/auth.module';
import { AuthSwitcherComponent } from './components/auth-switcher/auth-switcher.component';

@NgModule({
  declarations: [AuthPageComponent, AuthSwitcherComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    LayoutModule,

    FlexLayoutModule,

    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,

    AuthPageRoutingModule,
    SharedModule,
    AuthModule,
  ],
  providers: [ValidationErrorsService],
})
export class AuthPageModule {}
