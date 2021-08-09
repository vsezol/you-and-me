import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MainLayoutComponent } from '../../core/components/main-layout/main-layout.component';
import { ContactsPageComponent } from './contacts-page/contacts-page.component';
import { ChatComponent } from '../chat/chat/chat.component';
import { VoidChatMessageComponent } from './void-chat-message/void-chat-message.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: ContactsPageComponent,
        children: [
          {
            path: '',
            component: VoidChatMessageComponent,
            data: {
              withChat: false,
            },
          },
          {
            path: ':username',
            component: ChatComponent,
            data: {
              withChat: true,
            },
          },
          {
            path: '**',
            redirectTo: '',
          },
        ],
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactsPageRoutingModule {}
