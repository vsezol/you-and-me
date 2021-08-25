import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { VideoComponent } from './video/video.component';
import { GridComponent } from './grid/grid.component';
import { ChatModalInnerComponent } from './chat-modal-inner/chat-modal-inner.component';
import { ChatComponent } from './chat/chat.component';
import { ChatModalDirective } from './chat-modal.directive';
import { MaterialModule } from '@modules/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ChatModalInnerComponent,
    VideoComponent,
    GridComponent,
    ChatComponent,
    ChatModalDirective,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    ChatModalInnerComponent,
    VideoComponent,
    GridComponent,
    ChatComponent,
    ChatModalDirective,
  ],
})
export class ChatModule {}
