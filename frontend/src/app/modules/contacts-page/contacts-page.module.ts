import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsPageComponent } from './contacts-page/contacts-page.component';
import { ContactsPageRoutingModule } from './contacts-page-routing.module';
import { UsersModule } from '../users/users.module';
import { MaterialModule } from '../material/material.module';

import { ClipboardModule } from '@angular/cdk/clipboard';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [ContactsPageComponent],
  imports: [
    CommonModule,
    ContactsPageRoutingModule,
    UsersModule,
    MaterialModule,
    ClipboardModule,
    FlexLayoutModule,
  ],
})
export class ContactsPageModule {}
