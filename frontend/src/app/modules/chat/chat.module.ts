import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChatRoutingModule } from './chat-routing.module';
import { VideoComponent } from './components/video/video.component';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { MediaModule } from '../media/media.module';

@NgModule({
  declarations: [VideoComponent, ChatPageComponent],
  imports: [CommonModule, FormsModule, ChatRoutingModule, MediaModule],
  exports: [ChatRoutingModule],
})
export class ChatModule {}
