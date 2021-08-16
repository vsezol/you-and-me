import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientModule } from '@angular/common/http';

import { ContactsPageRoutingModule } from './contacts-page-routing.module';
import { ContactsPageComponent } from './contacts-page/contacts-page.component';
import { ContactCardComponent } from './contact-card/contact-card.component';
import { CallAlertComponent } from './call-alert/call-alert.component';
import { CallAlertDialogDirective } from './call-alert-dialog.directive';
import { VoidChatMessageComponent } from './void-chat-message/void-chat-message.component';

import { MaterialModule } from '@modules/material';
import { LoggerModule } from '@modules/logger';
import { ChatModule } from '@modules/chat';
import { SoundModule } from '@modules/sound';

@NgModule({
  declarations: [
    ContactsPageComponent,
    ContactCardComponent,
    CallAlertComponent,
    CallAlertDialogDirective,
    VoidChatMessageComponent,
  ],
  imports: [
    CommonModule,
    ClipboardModule,
    FlexLayoutModule,
    ScrollingModule,
    SoundModule.forPath('../../../assets/sounds'),
    MaterialModule,
    ContactsPageRoutingModule,
    HttpClientModule,
    LoggerModule,
    ChatModule,
  ],
})
export class ContactsPageModule {}
