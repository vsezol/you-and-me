import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoComponent } from './video/video.component';
import { GridComponent } from './grid/grid.component';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { VideoChatComponent } from './video-chat/video-chat.component';
import { ChatComponent } from './chat/chat.component';
import { ChatModalDirective } from './chat-modal.directive';

@NgModule({
  declarations: [
    VideoChatComponent,
    VideoComponent,
    GridComponent,
    ChatComponent,
    ChatModalDirective,
  ],
  imports: [CommonModule, MaterialModule, FlexLayoutModule],
  exports: [VideoChatComponent, VideoComponent, GridComponent, ChatComponent, ChatModalDirective],
})
export class ChatModule {}
