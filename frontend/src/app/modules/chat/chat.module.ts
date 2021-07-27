import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChatRoutingModule } from './chat-routing.module';
import { VideoComponent } from './components/video/video.component';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { MediaService } from './services/media.service';

@NgModule({
  declarations: [VideoComponent, ChatPageComponent],
  imports: [CommonModule, FormsModule, ChatRoutingModule],
  exports: [ChatRoutingModule],
  providers: [MediaService],
})
export class ChatModule {}
