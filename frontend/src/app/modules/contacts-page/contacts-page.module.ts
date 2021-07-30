import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { FlexLayoutModule } from '@angular/flex-layout';

import { UsersModule } from '../users/users.module';
import { MaterialModule } from '../material/material.module';
import { ContactsPageRoutingModule } from './contacts-page-routing.module';

import { ContactsPageComponent } from './contacts-page/contacts-page.component';
import { ContactCardComponent } from './contact-card/contact-card.component';
import { CallAlertComponent } from './call-alert/call-alert.component';
import { HttpClientModule } from '@angular/common/http';
import { CallAlertDialogDirective } from './call-alert-dialog.directive';
import { LoggerModule } from '../logger/logger.module';

@NgModule({
  declarations: [
    ContactsPageComponent,
    ContactCardComponent,
    CallAlertComponent,
    CallAlertDialogDirective,
  ],
  imports: [
    CommonModule,
    ClipboardModule,
    FlexLayoutModule,

    MaterialModule,
    ContactsPageRoutingModule,
    UsersModule,
    HttpClientModule,
    LoggerModule,
  ],
})
export class ContactsPageModule {}
