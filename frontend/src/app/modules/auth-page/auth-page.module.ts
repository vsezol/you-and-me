import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

import { SharedModule } from '../shared/shared.module';
import { AuthPageRoutingModule } from './auth-page-routing.module';

import { AuthPageComponent } from './views/auth-page/auth-page.component';
import { ValidationErrorsService } from './validation-errors.service';

@NgModule({
  declarations: [AuthPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AuthPageRoutingModule,
    FlexLayoutModule,
    LayoutModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [ValidationErrorsService]
})
export class AuthPageModule {}
