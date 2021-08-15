import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule, ChatModule, LoggerModule } from '@modules';
import { ContactsPageRoutingModule } from './contacts-page-routing.module';
import { ContactsPageComponent } from './contacts-page/contacts-page.component';
import { ContactCardComponent } from './contact-card/contact-card.component';
import { CallAlertComponent } from './call-alert/call-alert.component';
import { CallAlertDialogDirective } from './call-alert-dialog.directive';
import { VoidChatMessageComponent } from './void-chat-message/void-chat-message.component';

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

    MaterialModule,
    ContactsPageRoutingModule,
    HttpClientModule,
    LoggerModule,
    ChatModule,
  ],
})
export class ContactsPageModule {}
