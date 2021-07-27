import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { UsersService } from './users.service';
import { AuthModule } from '../auth/auth.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, AuthModule],
  providers: [UsersService],
})
export class UsersModule {}
